import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Product} from "../../models/product.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Tag} from "../../models/tags.model";
import {MatChipInputEvent} from "@angular/material/chips";
import {BrandService} from "../../../brand/services/brand.service";
import {Brand} from "../../../brand/models/brand.model";
import {Ingredient} from "../../../ingredient/models/ingredient.model";
import {Category} from "../../../category/models/category.model";
import {CategoryService} from "../../../category/services/category.service";
import {IngredientService} from "../../../ingredient/services/ingredient.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  productForm!: FormGroup;

  selectedFile?: File;
  preview: any;

  loading: boolean = false;
  errorMessage: string = "";

  addTagsOnBlur = true;
  readonly tagsSeparatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];

  genders: string[] = ["MALE", "FEMALE"];

  brands: Brand[] = [];
  ingredients: Ingredient[] = [];
  categories: Category[] = [];

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private brandService: BrandService,
              private categoryService: CategoryService,
              private ingredientService: IngredientService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private _snackBar: MatSnackBar) {
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: '',
      brand: [null, Validators.required],
      image: null,
      ingredients: [],
      categories: [],
      tags: [],
      genders: []
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
    this.brandService.getBrands()
      .subscribe(
        (resp) => {
          this.brands = resp;
        },
        (error => {
          this.errorMessage = error;
        })
      );

    this.categoryService.getCategories()
      .subscribe(
        (resp) => {
          this.categories = resp;
        },
        (error => {
          this.errorMessage = error;
        })
      );

    this.ingredientService.getIngredients()
      .subscribe(
        (resp) => {
          this.ingredients = resp;
        },
        (error => {
          this.errorMessage = error;
        })
      );
  }

  submit() {
    if (!this.productForm.valid) {
      return;
    }

    let product = new Product(this.productForm.value);
    product.image = this.selectedFile;
    product.tags = this.tags;

    this.loading = true;
    this.errorMessage = "";
    this.productService.createProduct(product)
      .subscribe(resp => {
          this.loading = false;
          this._snackBar.open('Product created', 'Undo', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });
          this.router.navigateByUrl('/product/' + resp.id);
        },
        (error => {
          this.errorMessage = error;
          this.loading = false;
        })
      );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  }

  back(): void {
    this.location.back();
  }

  addTags(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push({name: value});
    }

    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
