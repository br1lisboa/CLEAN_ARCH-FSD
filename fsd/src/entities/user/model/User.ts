import { UserId } from "./UserId";
import { Email } from "./Email";

export class User {
  constructor(
    public readonly id: UserId,
    public readonly name: string,
    public readonly email: Email,
  ) {}
}
