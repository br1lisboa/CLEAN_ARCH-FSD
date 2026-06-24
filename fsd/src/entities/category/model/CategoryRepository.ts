import { Category } from "./Category";
import { CategoryId } from "./CategoryId";

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: CategoryId): Promise<Category | null>;
  save(category: Category): Promise<void>;
}
