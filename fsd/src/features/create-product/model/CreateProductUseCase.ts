// This feature composes TWO entities. Cross-domain work happens here, at the
// feature layer — entities themselves stay isolated from each other.
import { Product, ProductId, Price, type ProductRepository } from "@/entities/product";
import { CategoryId } from "@/entities/category";

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
