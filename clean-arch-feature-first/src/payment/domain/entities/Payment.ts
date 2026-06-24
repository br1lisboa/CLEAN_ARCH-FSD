import { PaymentId } from "../value-objects/PaymentId";
// Cross-feature reference: the payment feature reaches into the order feature's domain. Feature-first organizes code, but by itself does NOT enforce a boundary between features.
import { OrderId } from "../../../order/domain/value-objects/OrderId";
import { Money } from "../../../order/domain/value-objects/Money";

export class Payment {
  constructor(
    public readonly id: PaymentId,
    public readonly orderId: OrderId,
    public readonly amount: Money,
  ) {}
}
