# Tres formas de organizar la MISMA app

Tres proyectos. **El mismo dominio, las mismas reglas de negocio, el mismo código de clases.**
Lo único que cambia es *dónde viven los archivos* y *qué importa a qué*.

Dominio (idéntico en los tres):

- `User` — value objects `UserId`, `Email`
- `Order` — value objects `OrderId`, `Money`; **referencia a `User`** (dominio compartido)
- Casos de uso: crear/listar `User`, crear/listar `Order`

| Proyecto | Criterio del nivel superior | Vocabulario |
|---|---|---|
| `clean-arch-layer-first/` | por **capa técnica** | Clean: domain / application / infrastructure / presentation |
| `clean-arch-feature-first/` | por **feature**, capas Clean adentro | Clean (anidada en cada feature) |
| `fsd/` | por **capa de granularidad** | FSD: entities / features / pages / shared (+ `model`/`api`/`ui`) |

---

## 1. `clean-arch-layer-first` — Clean clásico, layer-first

```
src/
  domain/          user/  order/
  application/     user/  order/
  infrastructure/  user/  order/
  presentation/    user/  order/
```

- **Una feature está repartida en las 4 carpetas top-level.** Tocar `user` = abrir `domain/user`, `application/user`, `infrastructure/user`, `presentation/user`.
- La página `presentation/user/pages/UserListPage.tsx` importa de **4 capas distintas** con saltos `../../../`.
- Nada impide que `domain/order` alcance a `domain/user` (ver `domain/order/entities/Order.ts`): **no hay frontera horizontal entre dominios.**

## 2. `clean-arch-feature-first` — Clean, feature-first

```
src/
  user/   { domain/ application/ infrastructure/ presentation/ }
  order/  { domain/ application/ infrastructure/ presentation/ }
  shared/ { (clean transversal, si existiera) }
```

- **Mismas 4 capas Clean**, solo que ahora anidadas dentro de cada feature.
- Tocar `user` = abrir **una** carpeta (`user/`). Todo lo de user está junto: cohesión alta.
- **Archivo idéntico, byte por byte, al proyecto layer-first** — solo cambiaron las rutas de import. (24 archivos de código en ambos: layer-first no genera MÁS archivos, los **dispersa**.)
- LÍMITE QUE SIGUE ABIERTO: `order/domain/entities/Order.ts` todavía alcanza a `../../../user/domain/...`. Feature-first **organiza**, pero por sí solo **no obliga** una frontera entre features. Ver los 4 imports cross-feature listados abajo.

## 3. `fsd` — Feature-Sliced Design

```
src/
  entities/   user/  order/      ← model / api / ui   (+ @x para relación compartida)
  features/   create-user/  create-order/
  pages/      users/  orders/
  shared/     ui/
```

FSD **NO usa las capas de Clean.** Cambia el vocabulario:

- **Capas por granularidad**, no por tecnología: `entities` (cosas de negocio) < `features` (acciones) < `pages` (composición) < `shared` (sin negocio).
- Adentro de cada slice, **segmentos**: `model` (dominio + lógica), `api` (repos, dtos, mappers), `ui`.
- **Public API obligatoria**: todo slice expone solo por su `index.ts`. Lo demás es privado.
- **Regla de import en una sola dirección** ↓: `pages → features → entities → shared`. Una feature NO importa otra feature; una entity NO importa otra entity.
- **Dominio compartido = explícito.** `Order` necesita `UserId`. En vez de alcanzar a otra entity (prohibido), `user` expone un contrato mínimo en `entities/user/@x/order.ts` y SOLO `order` lo consume. La relación queda documentada, no oculta.
- Trabajo cross-domain (un pedido necesita user + order) ocurre **arriba**, en `features/create-order` que compone ambas entities por su public API.

---

## El contraste en una página

La misma pantalla "listar + crear usuarios", en cada arquitectura:

- **layer-first** → `presentation/user/pages/UserListPage.tsx` importa de domain, application (×2) e infrastructure: 4 capas, rutas `../../../`.
- **feature-first** → `user/presentation/pages/UserListPage.tsx`: mismos imports, pero todos dentro de `user/` (rutas cortas).
- **fsd** → `pages/users/UserListPage.tsx` compone `@/entities/user` + `@/features/create-user` + `@/shared/ui` — solo public APIs, sin tocar internos.

## Qué demuestra cada uno

| | layer-first | feature-first | fsd |
|---|---|---|---|
| Cohesión (feature en un lugar) | ❌ dispersa en 4 dirs | ✅ 1 dir | ✅ por slice |
| Distancia de navegación | alta (`../../../`) | baja | baja (alias `@/`) |
| Frontera horizontal entre features | ❌ ninguna | ❌ ninguna (solo disciplina) | ✅ forzada por regla + public API |
| Dominio compartido | import libre cross-dir | import libre cross-feature | explícito vía `@x` |
| Encapsulación | ❌ todo público | ❌ todo público | ✅ `index.ts` público |
| Conserva Clean/DDD | ✅ | ✅ | ✅ (DDD vive en `model`) |
| Costo | navegación + dispersión | poco; falta enforcement | vocabulario nuevo + más archivos |

**Resumen:** feature-first arregla la dispersión de layer-first sin cambiar Clean. FSD va más allá: agrega aislamiento entre features, public API y contrato explícito para dominios compartidos — al precio de aprender un vocabulario distinto al de Clean.

## Correr (opcional)

Cada proyecto: `npm install && npm run typecheck`. Son ilustrativos (repos in-memory, sin build de Vite).
```
