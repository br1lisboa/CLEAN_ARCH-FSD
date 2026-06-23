import { Order, OrderId, Money, type OrderRepository } from "../../domain";
// Cross-feature reference: the order feature reaches into the user feature's domain. Feature-first organizes code, but by itself does NOT enforce a boundary between features.
import { UserId } from "../../../user/domain";

export interface CreateOrderInput {
  id: string;
  customerId: string;
  totalCents: number;
}

export class CreateOrderUseCase {
  constructor(private readonly orders: OrderRepository) {}

  async execute(input: CreateOrderInput): Promise<Order> {
    const order = new Order(
      OrderId.create(input.id),
      UserId.create(input.customerId),
      Money.create(input.totalCents),
    );
    await this.orders.save(order);
    return order;
  }
}
