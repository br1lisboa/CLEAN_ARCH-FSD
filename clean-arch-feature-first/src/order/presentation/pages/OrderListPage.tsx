import { useEffect, useState } from "react";
// Ordering a screen touches user AND order slices across every layer.
import { type Order } from "../../domain"; //          domain (order)
import { ListOrdersUseCase } from "../../application/use-cases/ListOrdersUseCase"; //  application (order)
import { CreateOrderUseCase } from "../../application/use-cases/CreateOrderUseCase"; // application (order)
import { ListUsersUseCase } from "../../../user/application/use-cases/ListUsersUseCase"; //     application (user)
import { OrderRepositoryImpl } from "../../infrastructure/OrderRepositoryImpl"; //     infrastructure (order)
import { UserRepositoryImpl } from "../../../user/infrastructure/UserRepositoryImpl"; //        infrastructure (user)
import { OrderForm } from "../components/OrderForm"; //          presentation (local)

const orderRepo = new OrderRepositoryImpl();
const userRepo = new UserRepositoryImpl();
const listOrders = new ListOrdersUseCase(orderRepo);
const createOrder = new CreateOrderUseCase(orderRepo);
const listUsers = new ListUsersUseCase(userRepo);

export function OrderListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([]);

  async function refresh() {
    setOrders(await listOrders.execute());
    const users = await listUsers.execute();
    setCustomers(users.map((u) => ({ id: u.id.value, name: u.name })));
  }

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <section>
      <h1>Orders</h1>
      <OrderForm
        customers={customers}
        onSubmit={async (input) => {
          await createOrder.execute(input);
          await refresh();
        }}
      />
      <ul>
        {orders.map((o) => (
          <li key={o.id.value}>
            {o.customerId.value} — {o.total.format()}
          </li>
        ))}
      </ul>
    </section>
  );
}
