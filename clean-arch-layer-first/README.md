# clean-arch-layer-first

Clean Architecture + DDD, organizado **por capa técnica** (layer-first).

```
src/
  domain/          user/ order/ category/ product/ payment/   ← entities, value objects, repo interfaces
  application/     user/ order/ category/ product/ payment/   ← use cases
  infrastructure/  user/ order/ category/ product/ payment/   ← repo impls, dtos, mappers
  presentation/    user/ order/ category/ product/ payment/   ← React UI
```

## Punto a observar

- **Una feature vive en 4 carpetas top-level.** Para cambiar `user`, abrís `domain/user`,
  `application/user`, `infrastructure/user` y `presentation/user`.
- Con **5 features** el top-level son **20 carpetas-hoja** (4 capas × 5). Cada cambio de
  feature se reparte en 4 de ellas; el desorden escala con cada feature nueva.
- `src/presentation/user/pages/UserListPage.tsx` importa de domain + application (×2) +
  infrastructure con rutas `../../../`. Contá los saltos: una pantalla toca toda la pila.
- Cross-domain por import libre, sin frontera horizontal (**3 aristas**):
  - `src/domain/order/entities/Order.ts` → `../../user/value-objects/UserId`
  - `src/domain/product/entities/Product.ts` → `../../category/value-objects/CategoryId`
  - `src/domain/payment/entities/Payment.ts` → `../../order/value-objects/{OrderId, Money}`

Mismo código (58 archivos) que `clean-arch-feature-first` — solo cambia la ubicación.
