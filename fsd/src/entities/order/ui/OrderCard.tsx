import { type Order } from "../model/Order";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <li>
      {order.customerId.value} — {order.total.format()}
    </li>
  );
}
