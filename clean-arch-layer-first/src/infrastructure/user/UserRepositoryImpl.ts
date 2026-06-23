import { type User, type UserId, type UserRepository } from "../../domain/user";
import { type ApiUser } from "./dtos/ApiUser";
import { UserMapper } from "./mappers/UserMapper";

// In-memory fake of a real HTTP-backed repository, kept tiny on purpose.
export class UserRepositoryImpl implements UserRepository {
  private store: ApiUser[] = [];

  async findAll(): Promise<User[]> {
    return this.store.map(UserMapper.toDomain);
  }

  async findById(id: UserId): Promise<User | null> {
    const found = this.store.find((u) => u.id === id.value);
    return found ? UserMapper.toDomain(found) : null;
  }

  async save(user: User): Promise<void> {
    this.store.push(UserMapper.toDto(user));
  }
}
