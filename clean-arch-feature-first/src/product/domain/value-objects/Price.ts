export class Price {
  private constructor(
    public readonly cents: number,
    public readonly currency: string,
  ) {}

  static create(cents: number, currency = "USD"): Price {
    if (!Number.isInteger(cents) || cents < 0) {
      throw new Error("Price must be a non-negative integer amount of cents");
    }
    return new Price(cents, currency);
  }

  format(): string {
    return `${(this.cents / 100).toFixed(2)} ${this.currency}`;
  }
}
