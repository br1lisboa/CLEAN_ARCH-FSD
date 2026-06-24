import { type Product, type ProductRepository } from "../../domain/product";
import { type ApiProduct } from "./dtos/ApiProduct";
import { ProductMapper } from "./mappers/ProductMapper";

export class ProductRepositoryImpl implements ProductRepository {
  private store: ApiProduct[] = [];

  async findAll(): Promise<Product[]> {
    return this.store.map(ProductMapper.toDomain);
  }

  async save(product: Product): Promise<void> {
    this.store.push(ProductMapper.toDto(product));
  }
}
