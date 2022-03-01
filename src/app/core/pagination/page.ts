export class Page<T> {
  constructor(
    public content: T[],
    public totalElements: number,
    // tslint:disable-next-line: variable-name
    public number: number
  ) {
  }
}
