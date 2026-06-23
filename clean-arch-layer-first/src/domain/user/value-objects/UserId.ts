export class UserId {
  private constructor(public readonly value: string) {}

  static create(value: string): UserId {
    if (!value.trim()) throw new Error("UserId cannot be empty");
    return new UserId(value);
  }

  equals(other: UserId): boolean {
    return this.value === other.value;
  }
}
