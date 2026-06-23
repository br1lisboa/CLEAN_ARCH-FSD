import { OrderId } from "../value-objects/OrderId";
import { Money } from "../value-objects/Money";
// Cross-feature reference: the order feature reaches into the user feature's domain. Feature-first organizes code, but by itself does NOT enforce a boundary between features.
import { UserId } from "../../../user/domain/value-objects/UserId";

export class Order {
  constructor(
    public readonly id: OrderId,
    public readonly customerId: UserId,
    public readonly total: Money,
  ) {}
}
