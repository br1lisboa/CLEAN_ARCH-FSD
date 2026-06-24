import { Category, CategoryId, type CategoryRepository } from "../../../domain/category";

export interface CreateCategoryInput {
  id: string;
  name: string;
}

export class CreateCategoryUseCase {
  constructor(private readonly categories: CategoryRepository) {}

  async execute(input: CreateCategoryInput): Promise<Category> {
    const category = new Category(CategoryId.create(input.id), input.name);
    await this.categories.save(category);
    return category;
  }
}
