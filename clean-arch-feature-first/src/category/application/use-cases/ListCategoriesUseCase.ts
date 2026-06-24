import { type Category, type CategoryRepository } from "../../domain";

export class ListCategoriesUseCase {
  constructor(private readonly categories: CategoryRepository) {}

  execute(): Promise<Category[]> {
    return this.categories.findAll();
  }
}
