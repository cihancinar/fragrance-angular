import {HttpParams} from "@angular/common/http";

export class IngredientFilter {
  ref?: string;
  name?: string;

  public constructor(init?: Partial<IngredientFilter>) {
    Object.assign(this, init)
  }

  static searchParams(filter: IngredientFilter, params: HttpParams = new HttpParams()): HttpParams {
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
