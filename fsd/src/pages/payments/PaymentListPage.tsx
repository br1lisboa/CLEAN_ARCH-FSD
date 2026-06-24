import { useEffect, useState } from "react";
// The page composes BOTH entities + the feature, each through its public API.
import { type Payment, PaymentRepositoryImpl, PaymentCard } from "@/entities/payment"; // entity
import { OrderRepositoryImpl } from "@/entities/order"; //                                entity
import { CreatePaymentUseCase, PaymentForm } from "@/features/create-payment"; //         feature
import { Button } from "@/shared/ui/Button"; //                                          shared

const paymentRepo = new PaymentRepositoryImpl();
const orderRepo = new OrderRepositoryImpl();
const createPayment = new CreatePaymentUseCase(paymentRepo);

export function PaymentListPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [orders, setOrders] = useState<{ id: string; label: string }[]>([]);

  async function refresh() {
    setPayments(await paymentRepo.findAll());
    const os = await orderRepo.findAll();
    setOrders(os.map((o) => ({ id: o.id.value, label: `${o.id.value} — ${o.total.format()}` })));
  }

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <section>
      <h1>Payments</h1>
      <PaymentForm
        orders={orders}
        onSubmit={async (input) => {
          await createPayment.execute(input);
          await refresh();
        }}
      />
      <Button onClick={() => void refresh()}>Refresh</Button>
      <ul>
        {payments.map((p) => (
          <PaymentCard key={p.id.value} payment={p} />
        ))}
      </ul>
    </section>
  );
}
