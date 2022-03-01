import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../product/services/product.service";
import {Product} from "../../product/models/product.model";
import {Brand} from "../../brand/models/brand.model";
import {Ingredient} from "../../ingredient/models/ingredient.model";
import {Category} from "../../category/models/category.model";
import {BrandService} from "../../brand/services/brand.service";
import {IngredientService} from "../../ingredient/services/ingredient.service";
import {CategoryService} from "../../category/services/category.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataSourceProduct: Product[] = [];
  dataSourceBrand: Brand[] = [];
  dataSourceIngredient: Ingredient[] = [];
  dataSourceCategory: Category[] = [];

  loadingBrand: boolean = false;
  loadingProduct: boolean = false;
  loadingIngredient: boolean = false;
  loadingCategory: boolean = false;

  height = 400;
  width = 400;
  margin = 50;

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private ingredientService: IngredientService,
    private categoryService: CategoryService) {
  }

  isLoading(): boolean {
    return this.loadingBrand || this.loadingProduct || this.loadingIngredient || this.loadingCategory;
  }

  ngOnInit() {
    this.loadingProduct = true;
    this.productService.getProducts()
      .subscribe(
        (resp) => {
          this.loadingProduct = false;
          this.dataSourceProduct = resp;
        },
        (error => {
          this.loadingProduct = false;
        })
      );

    this.loadingCategory = true;
    this.categoryService.getCategories()
      .subscribe(
        (resp) => {
          this.loadingCategory = false;
          this.dataSourceCategory = resp;
        },
        (error => {
          this.loadingCategory = false;
        })
      );

    this.loadingBrand = true;
    this.brandService.getBrands()
      .subscribe(
        (resp) => {
          this.loadingBrand = false;
          this.dataSourceBrand = resp;
        },
        (error => {
          this.loadingBrand = false;
        })
      );

    this.loadingIngredient = true;
    this.ingredientService.getIngredients()
      .subscribe(
        (resp) => {
          this.loadingIngredient = false;
          this.dataSourceIngredient = resp;
        },
        (error => {
          this.loadingIngredient = false;
        })
      );
  }

  public prepareDataBrand(data: Product[]): any {
    let result = new Map<string, number>();
    for (let d of data) {
      result.set(d.brand.name, (result.get(d.brand.name) || 0) + 1);
    }
    return result;
  }

  public prepareDataIngredient(data: Product[]): any {
    let result = new Map<string, number>();
    for (let d of data) {
      for (let i of d.ingredients) {
        result.set(i.name, (result.get(i.name) || 0) + 1);
      }
    }
    return result;
  }

  public prepareDataCategory(data: Product[]): any {
    let result = new Map<string, number>();
    for (let d of data) {
      for (let c of d.categories) {
        result.set(c.name, (result.get(c.name) || 0) + 1);
      }
    }
    return result;
  }

}
