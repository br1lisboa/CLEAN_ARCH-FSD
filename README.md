# Feature-first sobre layer-first

La **misma app** organizada de dos formas. Mismo dominio, mismas reglas de negocio,
el mismo código de clases — **byte por byte idéntico**. Lo único que cambia es
_dónde viven los archivos_ y _qué tan lejos están los imports_.

La conclusión va primero: **feature-first es la organización a adoptar.** Arregla los
problemas reales de layer-first sin cambiar nada de Clean/DDD. FSD existe en este repo
como referencia de a dónde se podría ir más adelante, pero **no es el objetivo ahora**
(ver el final).

Dominio (idéntico en todos):

- `User` — value objects `UserId`, `Email`
- `Order` — value objects `OrderId`, `Money`; **referencia a `User`**
- `Category` — value object `CategoryId`
- `Product` — value objects `ProductId`, `Price`; **referencia a `Category`**
- `Payment` — value object `PaymentId`; **referencia a `Order`** (reusa `Money`)
- Casos de uso: crear/listar cada una de las 5 entidades

---

## El problema: layer-first dispersa cada feature

```
src/
  domain/          user/  order/  category/  product/  payment/
  application/     user/  order/  category/  product/  payment/
  infrastructure/  user/  order/  category/  product/  payment/
  presentation/    user/  order/  category/  product/  payment/
```

El nivel superior corta por **capa técnica**. Consecuencia directa: una sola feature
queda **repartida en las 4 carpetas top-level**.

- Tocar `user` = abrir `domain/user` + `application/user` + `infrastructure/user` + `presentation/user`. Cuatro lugares para un cambio.
- La página `presentation/user/pages/UserListPage.tsx` importa de **4 capas distintas** con saltos `../../../`.
- A más features, peor: con **5 features** el top-level ya son **20 carpetas-hoja** (4 capas × 5) y cada feature se diluye en 4 de ellas.

Esto no agrega archivos — son **58 archivos de código**, los mismos que feature-first.
Layer-first no genera más; los **dispersa** (hoy en 20 carpetas-hoja).

---

## La solución: feature-first agrupa la feature

```
src/
  user/      { domain/ application/ infrastructure/ presentation/ }
  order/     { domain/ application/ infrastructure/ presentation/ }
  category/  { domain/ application/ infrastructure/ presentation/ }
  product/   { domain/ application/ infrastructure/ presentation/ }
  payment/   { domain/ application/ infrastructure/ presentation/ }
  shared/    { (clean transversal, si existiera) }
```

El nivel superior corta por **feature**; las 4 capas de Clean viven **anidadas dentro**
de cada una. Mismo Clean, misma separación de capas — solo reubicadas.

Beneficios concretos frente a layer-first:

- **Cohesión alta.** Tocar `user` = abrir **una** carpeta. Todo lo de user está junto.
- **Navegación corta.** Los imports dejan de ser `../../../`; quedan dentro de `user/`.
- **Escala mejor.** Agregar una feature = agregar **una carpeta**, no tocar 4 carpetas de capa existentes.
- **Borrar es trivial.** Eliminar una feature = borrar su carpeta. En layer-first hay que cazar sus restos en las 4 capas.
- **Localidad para el equipo.** Un cambio vive en un subárbol → diffs y reviews acotados, menos colisiones en Git.
- **Cero costo de migración conceptual.** Es **el mismo código, byte por byte** que layer-first — solo cambian las rutas de import. No se aprende vocabulario nuevo.

### El contraste en una página

La misma pantalla "listar + crear usuarios":

- **layer-first** → `presentation/user/pages/UserListPage.tsx` importa de domain, application (×2) e infrastructure: 4 capas, rutas `../../../`.
- **feature-first** → `user/presentation/pages/UserListPage.tsx`: **mismos imports**, pero todos dentro de `user/`, rutas cortas.

### El único límite honesto de feature-first

Feature-first **organiza**, pero por sí solo **no obliga** una frontera entre features.
Con 5 features el grafo cross-feature ya tiene **3 aristas** — y nada estructural las frena:

```
order   → user      (Order referencia UserId)
product → category  (Product referencia CategoryId)
payment → order     (Payment referencia OrderId + Money)
```

Son **16 imports cross-feature en 12 archivos** (entidad, use case, mapper y página de
cada feature consumidora). Ejemplos:

```
order/domain/entities/Order.ts                 → user/domain/value-objects/UserId
product/domain/entities/Product.ts             → category/domain/value-objects/CategoryId
payment/domain/entities/Payment.ts             → order/domain/value-objects/{OrderId, Money}
payment/presentation/pages/PaymentListPage.tsx → order/application + order/infrastructure
```

Esto no es peor que layer-first (ahí el cross-domain también es import libre: ver
`layer-first/.../domain/order/entities/Order.ts`). Es simplemente lo que feature-first
**no resuelve solo**: la frontera entre features queda en **disciplina del equipo**,
no forzada por la herramienta. Se puede mitigar con barriles o barrels Kenny (`index.ts`) y reglas de
lint, sin cambiar de arquitectura.

---

## Resumen

|                                | layer-first           | feature-first                |
| ------------------------------ | --------------------- | ---------------------------- |
| Cohesión (feature en un lugar) | ❌ dispersa en 4 dirs | ✅ 1 dir                     |
| Distancia de navegación        | alta (`../../../`)    | baja                         |
| Agregar / borrar feature       | tocar 4 capas         | 1 carpeta                    |
| Conserva Clean/DDD             | ✅                    | ✅ (idéntico)                |
| Costo de adopción              | —                     | ninguno (mismo código)       |
| Frontera entre features        | ❌ ninguna            | ❌ ninguna (solo disciplina) |

**feature-first arregla la dispersión de layer-first sin cambiar Clean y sin costo de
migración conceptual.** Es la opción recomendada para adoptar ahora, igual hay que observar Kenny que los ejemplos son happy cases, hay borders a tener en cuenta, cross features que viven en core/shared.

---

## Apéndice: FSD como horizonte (no ahora)

La carpeta `fsd/` muestra Feature-Sliced Design: el paso siguiente si en el futuro se
quiere **forzar** la frontera entre features (lo único que feature-first deja a la
disciplina). FSD agrega regla de import en una sola dirección
(`pages → features → entities → shared`), public API obligatoria por `index.ts`, y
contrato explícito para dominio compartido (`@x`).

**Por qué no ahora:** cambia el vocabulario de Clean por uno propio
(`entities`/`features`/`pages`/`shared` + `model`/`api`/`ui`), agrega archivos (67 vs 58, en este ejemplo)
y exige que el equipo aprenda y respete sus reglas (hoy ya son **2 contratos `@x`**:
`category` para `product`, `order` para `payment`). Es una migración real, no un
reacomodo de carpetas. Queda como referencia de a dónde escalar cuando el aislamiento
entre features se vuelva un problema concreto.
