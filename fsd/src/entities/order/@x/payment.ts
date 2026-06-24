// FSD cross-import slot ("@x").
// Entities normally MUST NOT import each other. When a real domain relation
// exists (a Payment settles an Order), the shared entity exposes an explicit,
// minimal contract for the specific consumer instead of leaking its internals.
// Only `entities/payment` is allowed to import from "@/entities/order/@x/payment".
export { OrderId } from "../model/OrderId";
export { Money } from "../model/Money";
