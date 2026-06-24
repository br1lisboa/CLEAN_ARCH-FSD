import { useEffect, useState } from "react";
// Paying for an order touches order AND payment slices across every layer.
import { type Payment } from "../../domain"; //          domain (payment)
import { ListPaymentsUseCase } from "../../application/use-cases/ListPaymentsUseCase"; //  application (payment)
import { CreatePaymentUseCase } from "../../application/use-cases/CreatePaymentUseCase"; // application (payment)
import { ListOrdersUseCase } from "../../../order/application/use-cases/ListOrdersUseCase"; //     application (order)
import { PaymentRepositoryImpl } from "../../infrastructure/PaymentRepositoryImpl"; //     infrastructure (payment)
import { OrderRepositoryImpl } from "../../../order/infrastructure/OrderRepositoryImpl"; //        infrastructure (order)
import { PaymentForm } from "../components/PaymentForm"; //          presentation (local)

const paymentRepo = new PaymentRepositoryImpl();
const orderRepo = new OrderRepositoryImpl();
const listPayments = new ListPaymentsUseCase(paymentRepo);
const createPayment = new CreatePaymentUseCase(paymentRepo);
const listOrders = new ListOrdersUseCase(orderRepo);

export function PaymentListPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [orders, setOrders] = useState<{ id: string; label: string }[]>([]);

  async function refresh() {
    setPayments(await listPayments.execute());
    const os = await listOrders.execute();
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
      <ul>
        {payments.map((p) => (
          <li key={p.id.value}>
            {p.orderId.value} — {p.amount.format()}
          </li>
        ))}
      </ul>
    </section>
  );
}
