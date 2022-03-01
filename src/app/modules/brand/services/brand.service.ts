import {Injectable} from '@angular/core';
import {BASE_PATH_BRAND} from "../../../core/constants/base-path.constant";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Brand} from "../models/brand.model";
import {Page} from "../../../core/pagination/page";
import {BrandFilter} from "../models/brand-filter";

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private BASE_PATH = BASE_PATH_BRAND;

  constructor(private http: HttpClient) {
  }

  findBrands(filter: BrandFilter): Observable<Page<Brand>> {
    const options = {
      headers: {'Content-Type': 'application/json'},
      params: BrandFilter.searchParams(filter)
    }

    return this.http.get<Page<Brand>>(`${this.BASE_PATH}`, options);
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.BASE_PATH}`);
  }

  createBrand(brand: Brand) {
    let data = new FormData();
    data.append('name', brand.name!);
    if (brand.image) {
      data.append('image', brand.image);
    }
    if (brand.description) {
      data.append('description', brand.description);
    }
    return this.http.post<any>(`${this.BASE_PATH}`, data);
  }

  updateBrand(id: any, brand: Brand) {
    let data = new FormData();
    data.append('name', brand.name!);
    if (brand.image) {
      data.append('image', brand.image);
    }
    if (brand.description) {
      data.append('description', brand.description);
    }
    return this.http.put<any>(`${this.BASE_PATH}/${id}`, data);
  }

  getBrand(id: any): Observable<Brand> {
    return this.http.get<Brand>(`${this.BASE_PATH}/${id}`);
  }

  deleteBrand(id: any) {
    return this.http.delete(`${this.BASE_PATH}/${id}`);
  }
}
