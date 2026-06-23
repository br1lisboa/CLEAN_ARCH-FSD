# clean-arch-layer-first

Clean Architecture + DDD, organizado **por capa técnica** (layer-first).

```
src/
  domain/          user/  order/     ← entities, value objects, repo interfaces
  application/     user/  order/     ← use cases
  infrastructure/  user/  order/     ← repo impls, dtos, mappers
  presentation/    user/  order/     ← React UI
```

## Punto a observar

- **Una feature vive en 4 carpetas top-level.** Para cambiar `user`, abrís `domain/user`,
  `application/user`, `infrastructure/user` y `presentation/user`.
- `src/presentation/user/pages/UserListPage.tsx` importa de domain + application (×2) +
  infrastructure con rutas `../../../`. Contá los saltos: una pantalla toca toda la pila.
- `src/domain/order/entities/Order.ts` alcanza a `../../user/value-objects/UserId`: el dominio
  `order` depende del dominio `user` y **nada estructural lo impide** (sin frontera horizontal).

Mismo código (24 archivos) que `clean-arch-feature-first` — solo cambia la ubicación.

`npm install && npm run typecheck` (ilustrativo, repos in-memory).
