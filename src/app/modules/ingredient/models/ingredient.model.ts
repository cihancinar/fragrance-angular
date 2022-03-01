export class Ingredient {
  id!: number;
  ref!: string;

  name!: string;
  description!: string;
  image!: File | undefined;

  created!: string;
  updated!: string;
  updatedBy!: string;

  public constructor(init?: Partial<Ingredient>) {
    Object.assign(this, init);
  }
}
