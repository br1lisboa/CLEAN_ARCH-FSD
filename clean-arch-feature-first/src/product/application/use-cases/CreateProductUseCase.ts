import { Product, ProductId, Price, type ProductRepository } from "../../domain";
// Cross-feature reference: the product feature reaches into the category feature's domain. Feature-first organizes code, but by itself does NOT enforce a boundary between features.
import { CategoryId } from "../../../category/domain";

export interface CreateProductInput {
  id: string;
  name: string;
  categoryId: string;
  priceCents: number;
}

export class CreateProductUseCase {
  constructor(private readonly products: ProductRepository) {}

  async execute(input: CreateProductInput): Promise<Product> {
    const product = new Product(
      ProductId.create(input.id),
      input.name,
      CategoryId.create(input.categoryId),
      Price.create(input.priceCents),
    );
    await this.products.save(product);
    return product;
  }
}
