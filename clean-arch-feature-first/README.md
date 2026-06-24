# clean-arch-feature-first

Las **mismas 4 capas Clean** que `clean-arch-layer-first`, pero el nivel superior se parte
**por feature**; las capas quedan anidadas adentro.

```
src/
  user/      { domain/ application/ infrastructure/ presentation/ }
  order/     { domain/ application/ infrastructure/ presentation/ }
  category/  { domain/ application/ infrastructure/ presentation/ }
  product/   { domain/ application/ infrastructure/ presentation/ }
  payment/   { domain/ application/ infrastructure/ presentation/ }
  shared/    { clean transversal, si existiera }
```

## Punto a observar

- **Cohesión:** tocar `user` = abrir UNA carpeta. Todo lo de user (sus 4 capas) está junto.
  Agregar una feature = **una carpeta nueva**, no tocar 4 carpetas de capa existentes.
- **Código idéntico** al proyecto layer-first, byte por byte: solo cambiaron las rutas de import.
  Mismos 58 archivos. Layer-first no tenía MÁS archivos, los tenía **dispersos** (en 20 carpetas-hoja).
- **Límite que NO resuelve por sí solo:** los features se siguen alcanzando entre sí.
  **3 aristas cross-feature** (organizan, pero no ponen frontera):
  - `src/order/domain/entities/Order.ts` → `../../../user/domain/value-objects/UserId`
  - `src/product/domain/entities/Product.ts` → `../../../category/domain/value-objects/CategoryId`
  - `src/payment/domain/entities/Payment.ts` → `../../../order/domain/value-objects/{OrderId, Money}`
  - páginas, use cases y mappers de cada consumidor agregan el resto: **16 imports en 12 archivos**.

Para forzar esa frontera necesitás tooling extra (p.ej. eslint boundaries) — que es justo lo
que FSD trae de fábrica. Ver `../fsd`.
