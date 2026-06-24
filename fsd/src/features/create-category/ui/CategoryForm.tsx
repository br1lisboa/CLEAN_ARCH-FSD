import { useState } from "react";

interface CategoryFormProps {
  onSubmit: (input: { id: string; name: string }) => void;
}

export function CategoryForm({ onSubmit }: CategoryFormProps) {
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ id: crypto.randomUUID(), name });
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <button type="submit">Create category</button>
    </form>
  );
}
