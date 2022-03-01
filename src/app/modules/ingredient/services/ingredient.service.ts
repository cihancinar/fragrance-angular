import {Injectable} from '@angular/core';
import {BASE_PATH_INGREDIENT} from "../../../core/constants/base-path.constant";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../../core/pagination/page";
import {Ingredient} from "../models/ingredient.model";
import {IngredientFilter} from "../models/ingredient-filter";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private BASE_PATH = BASE_PATH_INGREDIENT;

  constructor(private http: HttpClient) {
  }

  findIngredients(filter: IngredientFilter): Observable<Page<Ingredient>> {
    const options = {
      headers: {'Content-Type': 'application/json'},
      params: IngredientFilter.searchParams(filter)
    }

    return this.http.get<Page<Ingredient>>(`${this.BASE_PATH}`, options);
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.BASE_PATH}`);
  }

  createIngredient(ingredient: Ingredient) {
    let data = new FormData();
    data.append('name', ingredient.name!);
    if (ingredient.image) {
      data.append('image', ingredient.image);
    }
    if (ingredient.description) {
      data.append('description', ingredient.description);
    }
    return this.http.post<any>(`${this.BASE_PATH}`, data);
  }

  updateIngredient(id: any, ingredient: Ingredient) {
    let data = new FormData();
    data.append('name', ingredient.name!);
    if (ingredient.image) {
      data.append('image', ingredient.image);
    }
    if (ingredient.description) {
      data.append('description', ingredient.description);
    }
    return this.http.put<any>(`${this.BASE_PATH}/${id}`, data);
  }

  getIngredient(id: any): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.BASE_PATH}/${id}`);
  }

  deleteIngredient(id: any) {
    return this.http.delete(`${this.BASE_PATH}/${id}`);
  }

}
