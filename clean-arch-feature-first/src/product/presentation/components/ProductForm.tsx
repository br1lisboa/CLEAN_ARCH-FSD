import { useState } from "react";

interface ProductFormProps {
  categories: { id: string; name: string }[];
  onSubmit: (input: { id: string; name: string; categoryId: string; priceCents: number }) => void;
}

export function ProductForm({ categories, onSubmit }: ProductFormProps) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      id: crypto.randomUUID(),
      name,
      categoryId,
      priceCents: Math.round(Number(amount) * 100),
    });
    setName("");
    setAmount("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Price" />
      <button type="submit">Create product</button>
    </form>
  );
}
