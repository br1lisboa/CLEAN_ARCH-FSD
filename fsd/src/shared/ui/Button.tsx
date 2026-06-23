interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

// shared/ui: no business logic, reusable by any layer above. The lowest layer;
// it may NOT import from entities, features, or pages.
export function Button({ onClick, children }: ButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}
