import {Sale} from "./sale";

export class Fragrance {
  id!: string;
  name!: string;
  capacityMl!: string;
  date!: string;
  sales!: Sale[];

  public constructor(init?: Partial<Fragrance>) {
    Object.assign(this, init);
  }
}
