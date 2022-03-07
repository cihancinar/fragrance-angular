import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../category/services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Category} from "../../../category/models/category.model";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

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

  ngOnInit(): void {
  }

  submit() {
    if (!this.categoryForm.valid) {
      return;
    }

    let category = new Category(this.categoryForm.value);
    category.image = this.selectedFile;

    this.loading = true;
    this.errorMessage = "";
    this.categoryService.createCategory(category)
      .subscribe({
        next: (resp) => {
          this.loading = false;
          this._snackBar.open('Category created', 'Undo', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });
          this.router.navigateByUrl('/category/' + resp.id);
        },
        error: (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  back(): void {
    this.location.back();
  }
}
