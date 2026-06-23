import { type Order, type OrderRepository } from "../../domain";

export class ListOrdersUseCase {
  constructor(private readonly orders: OrderRepository) {}

  execute(): Promise<Order[]> {
    return this.orders.findAll();
  }
}
