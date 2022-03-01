import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss']
})
export class CategoryUpdateComponent implements OnInit {

  dataSource!: Category;

  categoryForm!: FormGroup;

  selectedFile?: File;
  preview: any;

  loading: boolean = false;
  errorMessage: string = "";

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private _snackBar: MatSnackBar) {
    this.categoryForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: '',
      image: null,
    });
  }

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');

    this.loading = true;
    this.errorMessage = "";
    this.categoryService.getCategory(categoryId)
      .subscribe(
        (resp) => {
          this.dataSource = resp;
          this.loading = false;
        },
        (error => {
          this.errorMessage = error;
          this.loading = false;
        })
      );
  }

  submit() {
    if (!this.categoryForm.valid) {
      return;
    }

    let category = new Category(this.categoryForm.value);
    category.image = this.selectedFile;

    this.loading = true;
    this.errorMessage = "";
    this.categoryService.updateCategory(this.dataSource.id, category)
      .subscribe(resp => {
          this.loading = false;
          this._snackBar.open('Category updated', 'Undo', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });
          this.router.navigateByUrl('/category/' + resp.id);
        },
        (error => {
          this.errorMessage = error;
          this.loading = false;
        })
      );
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  viewImage(image: File) {
    return 'data:image/jpeg;base64,' + image;
  }

  back(): void {
    this.location.back();
  }

}
