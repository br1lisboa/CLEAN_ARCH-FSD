import { PaymentId } from "./PaymentId";
// Shared domain relation expressed through the order entity's explicit
// cross-import contract — NOT by reaching into its internals.
import { OrderId, Money } from "@/entities/order/@x/payment";

export class Payment {
  constructor(
    public readonly id: PaymentId,
    public readonly orderId: OrderId,
    public readonly amount: Money,
  ) {}
}
