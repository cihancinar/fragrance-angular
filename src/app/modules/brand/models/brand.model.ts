export class Brand {
  id!: number;
  ref!: string;

  name!: string;
  description!: string;
  image!: File | undefined;

  created!: string;
  updated!: string;
  updatedBy!: string;

  public constructor(init?: Partial<Brand>) {
    Object.assign(this, init);
  }
}
