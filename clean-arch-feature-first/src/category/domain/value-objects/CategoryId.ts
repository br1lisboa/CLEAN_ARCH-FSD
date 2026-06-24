export class CategoryId {
  private constructor(public readonly value: string) {}

  static create(value: string): CategoryId {
    if (!value.trim()) throw new Error("CategoryId cannot be empty");
    return new CategoryId(value);
  }

  equals(other: CategoryId): boolean {
    return this.value === other.value;
  }
}
