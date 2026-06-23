import { type Order, type OrderRepository } from "../../../domain/order";

export class ListOrdersUseCase {
  constructor(private readonly orders: OrderRepository) {}

  execute(): Promise<Order[]> {
    return this.orders.findAll();
  }
}
