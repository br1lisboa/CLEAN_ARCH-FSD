import { type Category, type CategoryRepository } from "../../../domain/category";

export class ListCategoriesUseCase {
  constructor(private readonly categories: CategoryRepository) {}

  execute(): Promise<Category[]> {
    return this.categories.findAll();
  }
}
