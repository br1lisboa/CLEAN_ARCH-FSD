// FSD cross-import slot ("@x").
// Entities normally MUST NOT import each other. When a real domain relation
// exists (a Product belongs to a Category), the shared entity exposes an
// explicit, minimal contract for the specific consumer instead of leaking its
// internals. Only `entities/product` is allowed to import from
// "@/entities/category/@x/product".
export { CategoryId } from "../model/CategoryId";
