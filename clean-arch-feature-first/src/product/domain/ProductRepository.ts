import { Product } from "./entities/Product";

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  save(product: Product): Promise<void>;
}
