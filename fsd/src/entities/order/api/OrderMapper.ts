import { Order } from "../model/Order";
import { OrderId } from "../model/OrderId";
import { Money } from "../model/Money";
import { UserId } from "@/entities/user/@x/order";
import { type ApiOrder } from "./ApiOrder";

export const OrderMapper = {
  toDomain(dto: ApiOrder): Order {
    return new Order(
      OrderId.create(dto.id),
      UserId.create(dto.customer_id),
      Money.create(dto.total_cents, dto.currency),
    );
  },
  toDto(order: Order): ApiOrder {
    return {
      id: order.id.value,
      customer_id: order.customerId.value,
      total_cents: order.total.cents,
      currency: order.total.currency,
    };
  },
};
