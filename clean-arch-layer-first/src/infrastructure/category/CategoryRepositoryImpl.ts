import { type Category, type CategoryId, type CategoryRepository } from "../../domain/category";
import { type ApiCategory } from "./dtos/ApiCategory";
import { CategoryMapper } from "./mappers/CategoryMapper";

// In-memory fake of a real HTTP-backed repository, kept tiny on purpose.
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
