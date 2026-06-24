export class ProductId {
  private constructor(public readonly value: string) {}

  static create(value: string): ProductId {
    if (!value.trim()) throw new Error("ProductId cannot be empty");
    return new ProductId(value);
  }
}
