import {Ingredient} from "../../ingredient/models/ingredient.model";
import {Category} from "../../category/models/category.model";
import {Brand} from "../../brand/models/brand.model";
import {Tag} from "./tags.model";

export class Product {
  id!: number;
  ref!: string;

  name!: string;
  description!: string;
  image!: File | undefined;

  created!: string;
  updated!: string;
  updatedBy!: string;

  brand!: Brand;
  tags!: Tag[];
  genders!: string[];
  ingredients!: Ingredient[];
  categories!: Category[];

  public constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }
}
