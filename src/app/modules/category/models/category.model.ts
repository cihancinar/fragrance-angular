export class Category {
  id!: number;
  ref!: string;

  name!: string;
  description!: string;
  image!: File | undefined;

  created!: string;
  updated!: string;
  updatedBy!: string;

  public constructor(init?: Partial<Category>) {
    Object.assign(this, init);
  }
}

