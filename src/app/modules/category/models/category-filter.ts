import {HttpParams} from "@angular/common/http";

export class CategoryFilter {
  ref?: string;
  name?: string;

  public constructor(init?: Partial<CategoryFilter>) {
    Object.assign(this, init)
  }

  static searchParams(filter: CategoryFilter, params: HttpParams = new HttpParams()): HttpParams {
    if (!filter) return params;

    if (filter.ref) {
      params = params.append('ref', filter.ref)
    }
    if (filter.name) {
      params = params.append('name', filter.name)
    }

    return params;
  }
}
