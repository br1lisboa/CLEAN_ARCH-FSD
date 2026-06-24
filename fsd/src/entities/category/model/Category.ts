import { CategoryId } from "./CategoryId";

export class Category {
  constructor(
    public readonly id: CategoryId,
    public readonly name: string,
  ) {}
}
