import { User } from "./entities/User";
import { UserId } from "./value-objects/UserId";

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: UserId): Promise<User | null>;
  save(user: User): Promise<void>;
}
