import { type Product, type ProductRepository } from "../../../domain/product";

export class ListProductsUseCase {
  constructor(private readonly products: ProductRepository) {}

  execute(): Promise<Product[]> {
    return this.products.findAll();
  }
}
