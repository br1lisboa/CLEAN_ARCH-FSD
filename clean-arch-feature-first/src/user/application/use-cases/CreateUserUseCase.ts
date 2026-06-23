import { User, UserId, Email, type UserRepository } from "../../domain";

export interface CreateUserInput {
  id: string;
  name: string;
  email: string;
}

export class CreateUserUseCase {
  constructor(private readonly users: UserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    const user = new User(
      UserId.create(input.id),
      input.name,
      Email.create(input.email),
    );
    await this.users.save(user);
    return user;
  }
}
