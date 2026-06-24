import { CategoryId } from "../value-objects/CategoryId";

export class Category {
  constructor(
    public readonly id: CategoryId,
    public readonly name: string,
  ) {}
}
