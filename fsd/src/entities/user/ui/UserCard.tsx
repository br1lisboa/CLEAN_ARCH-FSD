import { type User } from "../model/User";

interface UserCardProps {
  user: User;
}

// Entity-level UI: how a User renders, owned by the user slice and reused
// by any feature/page that shows a user.
export function UserCard({ user }: UserCardProps) {
  return (
    <li>
      {user.name} — {user.email.value}
    </li>
  );
}
