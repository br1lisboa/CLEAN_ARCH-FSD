import { type Order } from "../model/Order";
import { type OrderRepository } from "../model/OrderRepository";
import { type ApiOrder } from "./ApiOrder";
import { OrderMapper } from "./OrderMapper";

export class OrderRepositoryImpl implements OrderRepository {
  private store: ApiOrder[] = [];

  async findAll(): Promise<Order[]> {
    return this.store.map(OrderMapper.toDomain);
  }

  async save(order: Order): Promise<void> {
    this.store.push(OrderMapper.toDto(order));
  }
}
