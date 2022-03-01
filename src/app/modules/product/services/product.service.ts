import {Injectable} from '@angular/core';
import {BASE_PATH_PRODUCT} from "../../../core/constants/base-path.constant";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASE_PATH = BASE_PATH_PRODUCT;

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_PATH}`);
  }

  createProduct(product: Product) {
    let data = new FormData();
    data.append('name', product.name!);
    if (product.image) {
      data.append('image', product.image);
    }
    if (product.description) {
      data.append('description', product.description);
    }
    if (product.brand) {
      data.append('brand', product.brand.id.toString());
    }
    if (product.ingredients) {
      const ingredients = product.ingredients.map(function (item) {
        return item['id'];
      });
      data.append('ingredients', ingredients.toString());
    }
    if (product.categories) {
      const categories = product.categories.map(function (item) {
        return item['id'];
      });
      data.append('categories', categories.toString());
    }
    if (product.tags) {
      const tags = product.tags.map(function (item) {
        return item['name'];
      });
      data.append('tags', tags.toString());
    }
    if (product.genders) {
      data.append('genders', product.genders.toString());
    }
    return this.http.post<any>(`${this.BASE_PATH}`, data);
  }

  getProduct(id: any): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_PATH}/${id}`);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.BASE_PATH}/${id}`);
  }
}
