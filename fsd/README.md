# fsd — Feature-Sliced Design

Mismo dominio que los otros dos, pero FSD **reemplaza el vocabulario de Clean** por el suyo.

```
src/
  entities/   user/  order/      ← model / api / ui   (+ @x)
  features/   create-user/  create-order/
  pages/      users/  orders/
  shared/     ui/
```

## Las 3 capas conceptuales de FSD (NO son las de Clean)

1. **Layers (por granularidad):** `app > pages > widgets > features > entities > shared`.
   Acá usamos pages / features / entities / shared.
2. **Slices (por dominio):** `entities/user`, `entities/order`, `features/create-order`...
3. **Segments (por propósito):** `model` (dominio + lógica, donde vive tu DDD),
   `api` (repos, dtos, mappers), `ui`.

## Reglas que lo distinguen de "solo feature-based"

- **Import en una dirección** ↓: `pages → features → entities → shared`.
  Una feature NO importa otra feature; una entity NO importa otra entity.
- **Public API obligatoria:** afuera se importa solo desde el `index.ts` del slice.
  Mirá `pages/users/UserListPage.tsx`: usa `@/entities/user` y `@/features/create-user`,
  nunca sus internos.
- **Dominio compartido explícito (`@x`):** `Order` necesita `UserId`. Importar otra entity
  está prohibido, así que `user` expone un contrato mínimo en
  `entities/user/@x/order.ts` y SOLO `order` lo consume
  (`entities/order/model/Order.ts`). La relación queda documentada, no escondida.
- **Cross-domain ocurre arriba:** `features/create-order` compone `entities/order` +
  `entities/user` (ambas por public API) en vez de que una entity toque a la otra.

## Frente a `clean-arch-feature-first`

Feature-first ya da cohesión. FSD agrega lo que aquel no tiene de fábrica:
frontera horizontal **forzada**, encapsulación por `index.ts`, y contrato `@x` para
relaciones compartidas. Precio: vocabulario nuevo + algunos archivos más
(28 vs 24 — UI a nivel entity, `shared/ui`, el slot `@x`).

`npm install && npm run typecheck` (ilustrativo, repos in-memory).
