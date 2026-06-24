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

Lo de arriba es la foto estática. El problema real es que **se agrava con el tiempo y con el equipo**:

### Crear una feature nueva

En layer-first agregar `invoice` no es un acto, son **cuatro**: crear `domain/invoice`,
`application/invoice`, `infrastructure/invoice` y `presentation/invoice` en cuatro ubicaciones
distintas, y cablear los imports `../../../` entre ellas. En feature-first es **una** carpeta
`invoice/` con el esqueleto de 4 capas adentro. Mismo número de archivos al final — **4 puntos de
creación vs 1**.

### Modificar una feature existente

Un cambio en `user` obliga a abrir y mantener sincronizados los **4 árboles** a la vez; el contexto
del cambio queda partido entre carpetas lejanas. La página `presentation/user/pages/UserListPage.tsx`
ya importa de 4 capas con saltos `../../../`: cada edición navega ese laberinto. En feature-first todo
el cambio vive bajo `user/` — un subárbol, rutas cortas.

### Dependencia del naming

Este es el defecto de fondo: en layer-first **la feature no existe como unidad estructural**. Es solo
el nombre de carpeta `user/` repetido dentro de cada una de las 4 capas. Nada — ni el compilador, ni el
filesystem, ni el bundler — garantiza que esos cuatro `user/` sean la misma cosa. La cohesión es una
**convención de nombre**, no una propiedad del árbol.

Consecuencias concretas:

- Un drift o typo (`users/` vs `user/`, `payment` vs `payments`) **fragmenta la feature en silencio**: no hay error, solo dos mitades que el ojo asume juntas.
- Buscar o hacer glob "todo lo de user" depende de que el naming sea idéntico en las 4 capas.
- Renombrar una feature = renombrar en **4 lugares** + arreglar todas las rutas `../../../` que la apuntan.

En feature-first la unidad **es** la carpeta top-level: el límite es **estructural, no nominal**.
Borrarla, moverla o renombrarla es una sola operación localizada.

### Por qué no escala (a futuro)

Con 5 features son 20 carpetas-hoja; con N son **4×N**, y cada carpeta de capa se vuelve una lista
plana de N subcarpetas que solo crece (esto es lo que estamos viendo hoy Kenny). Peor que el conteo: el top-level
`domain/ application/ infrastructure/ presentation/` comunica **capas técnicas, no el producto** —
abrir el repo no dice qué hace la app. En feature-first el top-level se lee como el dominio
(`user/ order/ category/ product/ payment/`). A más features, el costo de onboarding sube y cada
refactor de una feature **ondula por 4 árboles** en vez de quedar contenido.

### Trabajar entre varios squads

En layer-first **todas** las features de **todos** los squads aterrizan dentro de las mismas 4 carpetas
top-level. Squads distintos tocan los mismos directorios todo el tiempo:

- **Colisiones de merge** en Git constantes sobre `application/`, `presentation/`, etc.
- **Ownership difuso**: ¿quién es dueño de `application/`? Nadie y todos. `CODEOWNERS` no puede asignar limpio por path porque el path es una capa, no una feature.
- Reviews que cruzan fronteras de equipo sin querer.

En feature-first cada squad **posee subárboles de feature** (`order/`, `payment/`): `CODEOWNERS` por
carpeta, diffs aislados, menos colisiones. Es el bullet "Localidad para el equipo" de más abajo, visto
desde el dolor que evita.

### Costo en bundle / performance

La organización también pega en el build (ver `vercel-react-best-practices`), en ambas direcciones —
siendo honesto conmigo mismo:

- Feature-first **habilita code-splitting por feature**. Como toda la feature vive bajo una raíz literal, es natural un límite `dynamic(() => import('./payment/...'))` que la aísla en su propio chunk (`bundle-dynamic-imports`, `bundle-conditional`) con rutas estáticamente analizables (`bundle-analyzable-paths`). En layer-first el código de una feature está repartido en **4 raíces de import** → no hay un punto único donde cortar el chunk → el código se filtra a los chunks compartidos de cada capa, y de aca vino al ver operation-hub, en un par de dias el problema del chunk gigante primario, ver la chance de upgrade de arquitectura.
- **Contrapeso honesto sobre los barriles** (la mitigación que se sugiere más abajo para la frontera cross-feature): los barrel files (`index.ts` con `export *`) tienen costo real — ~200-800ms de import y rompen tree-shaking (`bundle-barrel-imports`), practica de barrels que se pregonaba hace unos anios hoy se desaconseja. Para la frontera entre features, preferir **imports directos + reglas de lint** antes que barriles anchos.

Nada de esto agrega archivos — siguen siendo **58 archivos de código**, los mismos que feature-first.
Layer-first no genera más; los **dispersa** (hoy en 20 carpetas-hoja), y esa dispersión es la que se
cobra intereses en cada feature nueva, cada rename y cada squad que entra.

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
no forzada por la herramienta. Se puede mitigar con barriles (`index.ts`) y reglas de
lint, sin cambiar de arquitectura.

---

## Resumen

|                                | layer-first                | feature-first                     |
| ------------------------------ | -------------------------- | --------------------------------- |
| Cohesión (feature en un lugar) | ❌ dispersa en 4 dirs      | ✅ 1 dir                          |
| Distancia de navegación        | alta (`../../../`)         | baja                              |
| Crear feature                  | 4 ubicaciones              | 1 carpeta                         |
| Agregar / borrar feature       | tocar 4 capas              | 1 carpeta                         |
| Dependencia del naming         | ❌ solo convención         | ✅ límite estructural             |
| Multi-squad / ownership        | owner por capa, colisiones | owner por feature, diffs aislados |
| Escala con N features          | 4×N carpetas-hoja          | N carpetas                        |
| Conserva Clean/DDD             | ✅                         | ✅ (idéntico)                     |
| Costo de adopción              | —                          | ninguno (mismo código)            |
| Frontera entre features        | ❌ ninguna                 | ❌ ninguna (solo disciplina)      |

**feature-first arregla la dispersión de layer-first sin cambiar Clean y sin costo de
migración conceptual.** Es la opción recomendada para adoptar ahora, igual hay que observar que los ejemplos son happy cases, hay borders a tener en cuenta, cross features que viven en core/shared.

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
