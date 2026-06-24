import { type Category } from "../model/Category";
import { type CategoryId } from "../model/CategoryId";
import { type CategoryRepository } from "../model/CategoryRepository";
import { type ApiCategory } from "./ApiCategory";
import { CategoryMapper } from "./CategoryMapper";

export class CategoryRepositoryImpl implements CategoryRepository {
  private store: ApiCategory[] = [];

  async findAll(): Promise<Category[]> {
    return this.store.map(CategoryMapper.toDomain);
  }

  async findById(id: CategoryId): Promise<Category | null> {
    const found = this.store.find((c) => c.id === id.value);
    return found ? CategoryMapper.toDomain(found) : null;
  }

  async save(category: Category): Promise<void> {
    this.store.push(CategoryMapper.toDto(category));
  }
}
