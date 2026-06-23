import { Order, OrderId, Money, type OrderRepository } from "../../../domain/order";
import { UserId } from "../../../domain/user";

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
