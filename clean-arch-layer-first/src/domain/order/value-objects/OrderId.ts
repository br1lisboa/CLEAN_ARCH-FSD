export class OrderId {
  private constructor(public readonly value: string) {}

  static create(value: string): OrderId {
    if (!value.trim()) throw new Error("OrderId cannot be empty");
    return new OrderId(value);
  }
}
