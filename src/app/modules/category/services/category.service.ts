import {Injectable} from '@angular/core';
import {BASE_PATH_CATEGORY} from "../../../core/constants/base-path.constant";
import {HttpClient} from "@angular/common/http";
import {CategoryFilter} from "../../category/models/category-filter";
import {Observable} from "rxjs";
import {Page} from "../../../core/pagination/page";
import {Category} from "../../category/models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private BASE_PATH = BASE_PATH_CATEGORY;

  constructor(private http: HttpClient) {
  }

  findCategories(filter: CategoryFilter): Observable<Page<Category>> {
    const options = {
      headers: {'Content-Type': 'application/json'},
      params: CategoryFilter.searchParams(filter)
    }

    return this.http.get<Page<Category>>(`${this.BASE_PATH}`, options);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.BASE_PATH}`);
  }

  createCategory(category: Category) {
    let data = new FormData();
    data.append('name', category.name!);
    if (category.image) {
      data.append('image', category.image);
    }
    if (category.description) {
      data.append('description', category.description);
    }
    return this.http.post<any>(`${this.BASE_PATH}`, data);
  }

  updateCategory(id: any, category: Category) {
    let data = new FormData();
    data.append('name', category.name!);
    if (category.image) {
      data.append('image', category.image);
    }
    if (category.description) {
      data.append('description', category.description);
    }
    return this.http.put<any>(`${this.BASE_PATH}/${id}`, data);
  }

  getCategory(id: any): Observable<Category> {
    return this.http.get<Category>(`${this.BASE_PATH}/${id}`);
  }

  deleteCategory(id: any) {
    return this.http.delete(`${this.BASE_PATH}/${id}`);
  }
}
