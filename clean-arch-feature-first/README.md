# clean-arch-feature-first

Las **mismas 4 capas Clean** que `clean-arch-layer-first`, pero el nivel superior se parte
**por feature**; las capas quedan anidadas adentro.

```
src/
  user/   { domain/ application/ infrastructure/ presentation/ }
  order/  { domain/ application/ infrastructure/ presentation/ }
  shared/ { clean transversal, si existiera }
```

## Punto a observar

- **Cohesión:** tocar `user` = abrir UNA carpeta. Todo lo de user (sus 4 capas) está junto.
- **Código idéntico** al proyecto layer-first, byte por byte: solo cambiaron las rutas de import.
  Mismos 24 archivos. Layer-first no tenía MÁS archivos, los tenía **dispersos**.
- **Límite que NO resuelve por sí solo:** el feature `order` sigue alcanzando al feature `user`.
  Imports cross-feature (organizan, pero no ponen frontera):
  - `src/order/domain/entities/Order.ts` → `../../../user/domain/value-objects/UserId`
  - `src/order/application/use-cases/CreateOrderUseCase.ts` → `../../../user/domain`
  - `src/order/infrastructure/mappers/OrderMapper.ts` → `../../../user/domain`
  - `src/order/presentation/pages/OrderListPage.tsx` → `../../../user/application/...` y `.../user/infrastructure/...`

Para forzar esa frontera necesitás tooling extra (p.ej. eslint boundaries) — que es justo lo
que FSD trae de fábrica. Ver `../fsd`.

`npm install && npm run typecheck` (ilustrativo, repos in-memory).
