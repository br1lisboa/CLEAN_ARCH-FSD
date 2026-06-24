# fsd — Feature-Sliced Design

Mismo dominio que los otros dos, pero FSD **reemplaza el vocabulario de Clean** por el suyo.

```
src/
  entities/   user/  order/  category/  product/  payment/   ← model / api / ui   (+ @x)
  features/   create-user/  create-order/  create-category/  create-product/  create-payment/
  pages/      users/  orders/  categories/  products/  payments/
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
- **Dominio compartido explícito (`@x`):** importar otra entity está prohibido, así que la
  entity proveedora expone un contrato mínimo y SOLO el consumidor declarado lo usa.
  Hoy hay **3 relaciones, 2 vía `@x`** (la tercera, `order → user`, ya existía):
  - `entities/user/@x/order.ts` (`UserId`) → consumido por `order`
  - `entities/category/@x/product.ts` (`CategoryId`) → consumido por `product`
  - `entities/order/@x/payment.ts` (`OrderId`, `Money`) → consumido por `payment`

  La relación queda documentada, no escondida; cada `@x` nombra a su único consumidor.
- **Cross-domain ocurre arriba:** `features/create-product` compone `entities/product` +
  `entities/category`, y `create-payment` compone `entities/payment` + `entities/order`
  (todas por public API) en vez de que una entity toque a la otra.

## Frente a `clean-arch-feature-first`

Feature-first ya da cohesión. FSD agrega lo que aquel no tiene de fábrica:
frontera horizontal **forzada**, encapsulación por `index.ts`, y contrato `@x` para
relaciones compartidas. Precio: vocabulario nuevo + algunos archivos más
(67 vs 58 — UI a nivel entity, `shared/ui`, los slots `@x`).

`npm install && npm run typecheck` (ilustrativo, repos in-memory).
