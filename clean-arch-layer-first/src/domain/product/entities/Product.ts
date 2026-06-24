import { ProductId } from "../value-objects/ProductId";
import { Price } from "../value-objects/Price";
// Cross-domain reference: Product references a Category by its identity.
// Layer-first does NOT stop one domain folder from reaching into another.
import { CategoryId } from "../../category/value-objects/CategoryId";

export class Product {
  constructor(
    public readonly id: ProductId,
    public readonly name: string,
    public readonly categoryId: CategoryId,
    public readonly price: Price,
  ) {}
}
