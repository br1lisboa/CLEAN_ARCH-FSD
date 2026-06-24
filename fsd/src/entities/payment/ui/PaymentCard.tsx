import { type Payment } from "../model/Payment";

interface PaymentCardProps {
  payment: Payment;
}

export function PaymentCard({ payment }: PaymentCardProps) {
  return (
    <li>
      {payment.orderId.value} — {payment.amount.format()}
    </li>
  );
}
