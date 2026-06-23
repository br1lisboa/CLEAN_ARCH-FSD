import { UserId } from "../value-objects/UserId";
import { Email } from "../value-objects/Email";

export class User {
  constructor(
    public readonly id: UserId,
    public readonly name: string,
    public readonly email: Email,
  ) {}
}
