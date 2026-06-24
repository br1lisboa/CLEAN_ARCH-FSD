import { useState } from "react";

interface PaymentFormProps {
  orders: { id: string; label: string }[];
  onSubmit: (input: { id: string; orderId: string; amountCents: number }) => void;
}

export function PaymentForm({ orders, onSubmit }: PaymentFormProps) {
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      id: crypto.randomUUID(),
      orderId,
      amountCents: Math.round(Number(amount) * 100),
    });
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={orderId} onChange={(e) => setOrderId(e.target.value)}>
        <option value="">Select order</option>
        {orders.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <button type="submit">Create payment</button>
    </form>
  );
}
