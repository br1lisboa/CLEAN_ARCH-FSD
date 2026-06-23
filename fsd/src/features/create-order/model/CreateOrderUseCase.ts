// This feature composes TWO entities. Cross-domain work happens here, at the
// feature layer — entities themselves stay isolated from each other.
import { Order, OrderId, Money, type OrderRepository } from "@/entities/order";
import { UserId } from "@/entities/user";

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
