import { User } from "./User";
import { UserId } from "./UserId";

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: UserId): Promise<User | null>;
  save(user: User): Promise<void>;
}
