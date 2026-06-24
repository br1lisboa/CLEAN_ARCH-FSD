import { ProductId } from "./ProductId";
import { Price } from "./Price";
// Shared domain relation expressed through the category entity's explicit
// cross-import contract — NOT by reaching into its internals.
import { CategoryId } from "@/entities/category/@x/product";

export class Product {
  constructor(
    public readonly id: ProductId,
    public readonly name: string,
    public readonly categoryId: CategoryId,
    public readonly price: Price,
  ) {}
}
