# rick-and-morty

Demo Next.js (App Router) que consume la [Rick and Morty API](https://rickandmortyapi.com)
pública, con export estático a GitHub Pages.

## Comandos

- `bun run dev` — dev server (localhost:3000).
- `bun run build` — build + export estático a `./out` (`output: "export"` en `next.config.mjs`).
- `bun run start` — no aplica al export estático (`output: "export"`); para verificar el
  resultado real, servir `./out` con cualquier static server.
- `bun run lint` — `eslint .` (config `eslint-config-next/core-web-vitals`).
- No hay script de test ni tests en el repo.

## Arquitectura

- Cada sección (`characters`, `episodes`, `locations`) sigue el mismo patrón: `layout.tsx`
  hace todo el trabajo (fetch de la lista, paginación, grid, master-detail); `page.tsx` es
  un stub (`return null`) que solo existe para que la ruta exista. El detalle real se monta
  como `children` del layout cuando hay un `id` en la URL (vía `useParams`), dentro de
  `MasterDetailLayout` (lista + panel lateral).
- Fetching es 100% client-side vía el hook `src/hooks/useFetch.ts` (axios + `AbortController`,
  cancela el request en vuelo al pedir uno nuevo). Es intencional pese a que la regla global
  de React pide RSC/librería de data fetching: con `output: "export"` no hay runtime de
  servidor en GH Pages, así que no hay dónde hacer fetch en el server.
- Las páginas de detalle (`[id]/page.tsx`) sí son estáticas: `generateStaticParams` llama a
  `getAllResourceIds()` (`src/util/rick-and-morty.ts`), que pagina TODA la API en build time
  para enumerar los IDs de character/episode/location. Un build hace decenas de requests
  reales a `rickandmortyapi.com`.
- Modelos: sufijo `I` = shape crudo de la API (`CharacterI`, `EpisodeI`, `LocationI`), sufijo
  `T` = tipo transformado para UI (`CharacterT`, ...), mapeado por una función `toX` al
  inicio de cada `layout.tsx`. No hay validación en runtime de la respuesta (se confía en el
  genérico de axios / `res.json()`), pese a que la regla global de TypeScript pide validar
  datos que cruzan el borde del sistema.

## Deploy a GitHub Pages (particularidades)

- `next.config.mjs`: `output: "export"`, `basePath: "/rick-and-morty"`,
  `images.unoptimized: true` (Pages no tiene servidor de optimización de imágenes).
- Los assets locales (`/public/images/*`) no heredan el `basePath` solos cuando se referencian
  como string plano: hay que prefijarlos a mano con la constante `IMAGE_PATH`
  (`src/util/constants.ts`, hoy `/rick-and-morty`). Si cambia el `basePath` en
  `next.config.mjs`, hay que actualizar también `IMAGE_PATH` o las imágenes locales rompen
  en producción.
- El workflow (`.github/workflows/nextjs.yml`) instala con `bun install --frozen-lockfile`
  y sube `./out` vía `actions/upload-pages-artifact`.

## Trampas conocidas

- `LocationDetail.tsx` y `EpisodeDetail.tsx` tienen una constante `CHARACTER_URL` sin usar
  (copy-paste de `CharacterDetail.tsx`) — no la sigas como referencia de endpoint real.
- No hay retry/backoff ni en `useFetch` ni en `getAllResourceIds`: un fallo transitorio de
  la API en build time rompe `generateStaticParams` para ese recurso y falla el build entero.
- `useFetch` no cachea nada entre navegaciones: volver a una página ya vista siempre vuelve
  a pedir la lista completa a la API (sin SWR/React Query ni caché de Next, por el export
  estático).
