import { PaymentId } from "../value-objects/PaymentId";
// Cross-domain reference: Payment references an Order by its identity.
// Layer-first does NOT stop one domain folder from reaching into another.
import { OrderId } from "../../order/value-objects/OrderId";
import { Money } from "../../order/value-objects/Money";

export class Payment {
  constructor(
    public readonly id: PaymentId,
    public readonly orderId: OrderId,
    public readonly amount: Money,
  ) {}
}
