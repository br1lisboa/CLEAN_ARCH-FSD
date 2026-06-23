import { User, UserId, Email } from "../../domain";
import { type ApiUser } from "../dtos/ApiUser";

export const UserMapper = {
  toDomain(dto: ApiUser): User {
    return new User(UserId.create(dto.id), dto.full_name, Email.create(dto.email_address));
  },
  toDto(user: User): ApiUser {
    return { id: user.id.value, full_name: user.name, email_address: user.email.value };
  },
};
