import { User } from "../model/User";
import { UserId } from "../model/UserId";
import { Email } from "../model/Email";
import { type ApiUser } from "./ApiUser";

export const UserMapper = {
  toDomain(dto: ApiUser): User {
    return new User(UserId.create(dto.id), dto.full_name, Email.create(dto.email_address));
  },
  toDto(user: User): ApiUser {
    return { id: user.id.value, full_name: user.name, email_address: user.email.value };
  },
};
