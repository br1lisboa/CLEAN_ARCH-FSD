import { useEffect, useState } from "react";
// The page composes BOTH entities + the feature, each through its public API.
import { type Order, OrderRepositoryImpl, OrderCard } from "@/entities/order"; // entity
import { UserRepositoryImpl } from "@/entities/user"; //                          entity
import { CreateOrderUseCase, OrderForm } from "@/features/create-order"; //       feature
import { Button } from "@/shared/ui/Button"; //                                  shared

const orderRepo = new OrderRepositoryImpl();
const userRepo = new UserRepositoryImpl();
const createOrder = new CreateOrderUseCase(orderRepo);

export function OrderListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<{ id: string; name: string }[]>([]);

  async function refresh() {
    setOrders(await orderRepo.findAll());
    const users = await userRepo.findAll();
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
      <Button onClick={() => void refresh()}>Refresh</Button>
      <ul>
        {orders.map((o) => (
          <OrderCard key={o.id.value} order={o} />
        ))}
      </ul>
    </section>
  );
}
