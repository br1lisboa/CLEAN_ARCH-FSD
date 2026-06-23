import { type Order, type OrderRepository } from "../../domain/order";
import { type ApiOrder } from "./dtos/ApiOrder";
import { OrderMapper } from "./mappers/OrderMapper";

export class OrderRepositoryImpl implements OrderRepository {
  private store: ApiOrder[] = [];

  async findAll(): Promise<Order[]> {
    return this.store.map(OrderMapper.toDomain);
  }

  async save(order: Order): Promise<void> {
    this.store.push(OrderMapper.toDto(order));
  }
}
