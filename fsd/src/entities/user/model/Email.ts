export class Email {
  private constructor(public readonly value: string) {}

  static create(value: string): Email {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      throw new Error(`Invalid email: ${value}`);
    }
    return new Email(value);
  }
}
