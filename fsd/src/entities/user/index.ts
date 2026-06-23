// Public API of the `user` entity. Everything outside this slice imports from
// here only; `model/*`, `api/*`, `ui/*` and `@x/*` internals stay private.
export { User } from "./model/User";
export { UserId } from "./model/UserId";
export { Email } from "./model/Email";
export type { UserRepository } from "./model/UserRepository";
export { UserRepositoryImpl } from "./api/UserRepositoryImpl";
export { UserCard } from "./ui/UserCard";
