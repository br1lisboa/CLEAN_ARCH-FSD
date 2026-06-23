import { OrderId } from "./OrderId";
import { Money } from "./Money";
// Shared domain relation expressed through the user entity's explicit
// cross-import contract — NOT by reaching into its internals.
import { UserId } from "@/entities/user/@x/order";

export class Order {
  constructor(
    public readonly id: OrderId,
    public readonly customerId: UserId,
    public readonly total: Money,
  ) {}
}
