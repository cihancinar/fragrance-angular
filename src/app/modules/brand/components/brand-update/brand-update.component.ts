import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BrandService} from "../../services/brand.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Brand} from "../../models/brand.model";

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.scss']
})
export class BrandUpdateComponent implements OnInit {
  dataSource!: Brand;

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

  ngOnInit(): void {
    const brandId = this.route.snapshot.paramMap.get('brandId');

    this.loading = true;
    this.errorMessage = "";
    this.brandService.getBrand(brandId)
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
    if (!this.brandForm.valid) {
      return;
    }

    let brand = new Brand(this.brandForm.value);
    brand.image = this.selectedFile;

    this.loading = true;
    this.errorMessage = "";
    this.brandService.updateBrand(this.dataSource.id, brand)
      .subscribe(resp => {
          this.loading = false;
          this._snackBar.open('Brand updated', 'Undo', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });
          this.router.navigateByUrl('/brand/' + resp.id);
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
    return this.brandForm.controls[controlName].hasError(errorName);
  }

  viewImage(image: File) {
    return 'data:image/jpeg;base64,' + image;
  }

  back(): void {
    this.location.back();
  }

}
