import { type Product } from "../model/Product";
import { type ProductRepository } from "../model/ProductRepository";
import { type ApiProduct } from "./ApiProduct";
import { ProductMapper } from "./ProductMapper";

export class ProductRepositoryImpl implements ProductRepository {
  private store: ApiProduct[] = [];

  async findAll(): Promise<Product[]> {
    return this.store.map(ProductMapper.toDomain);
  }

  async save(product: Product): Promise<void> {
    this.store.push(ProductMapper.toDto(product));
  }
}
