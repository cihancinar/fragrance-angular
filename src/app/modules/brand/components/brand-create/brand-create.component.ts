import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BrandService} from "../../services/brand.service";
import {Brand} from "../../models/brand.model";

@Component({
  selector: 'app-brand-create',
  templateUrl: './brand-create.component.html',
  styleUrls: ['./brand-create.component.scss']
})
export class BrandCreateComponent implements OnInit {
  brandForm!: FormGroup;

  selectedFile?: File;
  preview: any;

  loading: boolean = false;
  errorMessage: string = "";

  constructor(private formBuilder: FormBuilder,
              private brandService: BrandService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private _snackBar: MatSnackBar) {
    this.brandForm = this.formBuilder.group({
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
    if (!this.brandForm.valid) {
      return;
    }

    let brand = new Brand(this.brandForm.value);
    brand.image = this.selectedFile;

    this.loading = true;
    this.errorMessage = "";
    this.brandService.createBrand(brand)
      .subscribe({
        next: (resp) => {
          this.loading = false;
          this._snackBar.open('Brand created', 'Undo', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });
          this.router.navigateByUrl('/brand/' + resp.id);
        },
        error: (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.brandForm.controls[controlName].hasError(errorName);
  }

  back(): void {
    this.location.back();
  }
}
