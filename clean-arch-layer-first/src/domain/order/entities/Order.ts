import { OrderId } from "../value-objects/OrderId";
import { Money } from "../value-objects/Money";
// Cross-domain reference: Order references a User by its identity.
// Layer-first does NOT stop one domain folder from reaching into another.
import { UserId } from "../../user/value-objects/UserId";

export class Order {
  constructor(
    public readonly id: OrderId,
    public readonly customerId: UserId,
    public readonly total: Money,
  ) {}
}
