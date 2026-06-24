import { Category } from "./entities/Category";
import { CategoryId } from "./value-objects/CategoryId";

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: CategoryId): Promise<Category | null>;
  save(category: Category): Promise<void>;
}
