// FSD cross-import slot ("@x").
// Entities normally MUST NOT import each other. When a real domain relation
// exists (an Order belongs to a User), the shared entity exposes an explicit,
// minimal contract for the specific consumer instead of leaking its internals.
// Only `entities/order` is allowed to import from "@/entities/user/@x/order".
export { UserId } from "../model/UserId";
