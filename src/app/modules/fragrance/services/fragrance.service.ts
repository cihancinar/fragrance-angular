import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Fragrance} from "../interfaces/fragrance";

@Injectable({
  providedIn: 'root'
})
export class FragranceService {

  BASE_PATH = "/api/fragrances";

  constructor(private http: HttpClient) {
  }

  getFragrances(): Observable<Fragrance[]> {
    return this.http.get<Fragrance[]>(`${this.BASE_PATH}`);
  }

  getFragrance(id: any): Observable<Fragrance> {
    return this.http.get<Fragrance>(`${this.BASE_PATH}/${id}`);
  }

  deleteFragrance(id: any) {
    return this.http.delete(`${this.BASE_PATH}/${id}`);
  }

  createFragrance(fragrance: Fragrance) {
    return this.http.post<any>(`${this.BASE_PATH}`, fragrance);
  }
}
