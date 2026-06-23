import { useState } from "react";

interface OrderFormProps {
  customers: { id: string; name: string }[];
  onSubmit: (input: { id: string; customerId: string; totalCents: number }) => void;
}

export function OrderForm({ customers, onSubmit }: OrderFormProps) {
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      id: crypto.randomUUID(),
      customerId,
      totalCents: Math.round(Number(amount) * 100),
    });
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
        <option value="">Select customer</option>
        {customers.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <button type="submit">Create order</button>
    </form>
  );
}
