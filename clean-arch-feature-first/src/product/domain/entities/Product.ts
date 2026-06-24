import { ProductId } from "../value-objects/ProductId";
import { Price } from "../value-objects/Price";
// Cross-feature reference: the product feature reaches into the category feature's domain. Feature-first organizes code, but by itself does NOT enforce a boundary between features.
import { CategoryId } from "../../../category/domain/value-objects/CategoryId";

export class Product {
  constructor(
    public readonly id: ProductId,
    public readonly name: string,
    public readonly categoryId: CategoryId,
    public readonly price: Price,
  ) {}
}
