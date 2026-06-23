export class Money {
  private constructor(
    public readonly cents: number,
    public readonly currency: string,
  ) {}

  static create(cents: number, currency = "USD"): Money {
    if (!Number.isInteger(cents) || cents < 0) {
      throw new Error("Money must be a non-negative integer amount of cents");
    }
    return new Money(cents, currency);
  }

  format(): string {
    return `${(this.cents / 100).toFixed(2)} ${this.currency}`;
  }
}
