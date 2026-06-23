import { useEffect, useState } from "react";
// To wire ONE screen, the page must reach into FOUR separate top-level layers:
import { type User } from "../../domain"; //            domain
import { ListUsersUseCase } from "../../application/use-cases/ListUsersUseCase"; //   application
import { CreateUserUseCase } from "../../application/use-cases/CreateUserUseCase"; // application
import { UserRepositoryImpl } from "../../infrastructure/UserRepositoryImpl"; //      infrastructure
import { UserForm } from "../components/UserForm"; //            presentation (local)

// advanced-init-once: build the dependency graph once per module load.
const repo = new UserRepositoryImpl();
const listUsers = new ListUsersUseCase(repo);
const createUser = new CreateUserUseCase(repo);

export function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);

  async function refresh() {
    setUsers(await listUsers.execute());
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
      <ul>
        {users.map((u) => (
          <li key={u.id.value}>
            {u.name} — {u.email.value}
          </li>
        ))}
      </ul>
    </section>
  );
}
