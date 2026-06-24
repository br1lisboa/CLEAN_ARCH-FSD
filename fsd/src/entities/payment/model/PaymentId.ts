export class PaymentId {
  private constructor(public readonly value: string) {}

  static create(value: string): PaymentId {
    if (!value.trim()) throw new Error("PaymentId cannot be empty");
    return new PaymentId(value);
  }
}
