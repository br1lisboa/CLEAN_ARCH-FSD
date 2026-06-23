import { useState } from "react";

interface UserFormProps {
  onSubmit: (input: { id: string; name: string; email: string }) => void;
}

export function UserForm({ onSubmit }: UserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ id: crypto.randomUUID(), name, email });
    setName("");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button type="submit">Create user</button>
    </form>
  );
}
