import {HttpParams} from "@angular/common/http";

export class PageRequest {
  sort: string
  order: string
  pageSize: number
  pageIndex: number

  public constructor(sort: string, order: string, pageSize: number, pageIndex: number) {
    this.sort = sort
    this.order = order
    this.pageIndex = pageIndex
    this.pageSize = pageSize
  }

  toHttpParams(httpParams: HttpParams = new HttpParams()): HttpParams {
    return httpParams
      .set('sort', `${this.sort}`)
      .set('order', `${this.order}`)
      .set('size', this.pageSize.toString())
      .set('page', this.pageIndex.toString())
  }
}
