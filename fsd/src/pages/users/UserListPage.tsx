import { useEffect, useState } from "react";
// A page only COMPOSES lower layers, each via its public API:
import { type User, UserRepositoryImpl, UserCard } from "@/entities/user"; // entity
import { CreateUserUseCase, UserForm } from "@/features/create-user"; //       feature
import { Button } from "@/shared/ui/Button"; //                               shared

// advanced-init-once: dependency graph built once per module load.
const repo = new UserRepositoryImpl();
const createUser = new CreateUserUseCase(repo);

export function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);

  async function refresh() {
    setUsers(await repo.findAll());
  }

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <section>
      <h1>Users</h1>
      <UserForm
        onSubmit={async (input) => {
          await createUser.execute(input);
          await refresh();
        }}
      />
      <Button onClick={() => void refresh()}>Refresh</Button>
      <ul>
        {users.map((u) => (
          <UserCard key={u.id.value} user={u} />
        ))}
      </ul>
    </section>
  );
}
