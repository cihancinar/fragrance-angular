export class Sale {
  id!: string;
  count!: number;
  city!: string;
  date!: string;

  public constructor(init?: Partial<Sale>) {
    Object.assign(this, init);
  }
}
