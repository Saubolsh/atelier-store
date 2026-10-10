@AGENTS.md

# Atelier Store

Luxury-fashion storefront. Next.js 16 (App Router, Turbopack) · React 19.2 · TS strict · Tailwind 4 (configured in CSS) · Better Auth · Drizzle on Neon (HTTP driver). README.md has setup and the full file tree — don't re-explore the tree for orientation.

## Status
- Done: project setup, design system (`src/styles/`), homepage, product detail page (`/products/[slug]`), New arrivals page (`/collections/new-arrivals`), category collection pages (`/collections/[slug]`), breadcrumbs (`src/components/breadcrumbs.tsx`), desktop text sizes, shopping bag (cookie-based for guests: `src/lib/bag.ts`, actions in `src/app/bag/`, add-to-bag drawer, `/bag` page, header count), catalog in Postgres (`categories`, `products` with stock; read via `src/lib/catalog.ts`).
- Not yet: auth (`src/lib/auth.ts` and `/api/auth/[...all]` exist, but the schema has no auth tables yet, so any auth call fails at runtime), product variants, search, checkout (the bag's Checkout button links to the missing `/checkout`). Header/footer links point to routes that don't exist yet — expected.
- Deployed on Vercel; the root layout sets `robots: noindex` until launch.
- Editorial content is still hard-coded in `src/lib/sample-data.ts` and `src/lib/navigation.ts`.

## Next.js 16
The AGENTS.md rule stands, but read only the doc you need: grep `node_modules/next/dist/docs/` for the API, starting with `01-app/02-guides/upgrading/version-16.md`. Already known:
- `params`, `searchParams`, `cookies()`, `headers()` are async — await them. Use the global `PageProps<"/route">` / `LayoutProps<"/route">` types.
- `middleware.ts` is now `proxy.ts`.
- `next/image`: `preload`, not `priority`. Remote URLs must match `images.remotePatterns` in next.config.ts exactly — build Unsplash URLs with the `unsplash()` helper in sample-data.ts.
- `next lint` is removed; use `npm run lint` (flat config).
- Typed routes: a new route's `PageProps<"/…">` fails `tsc` until route types regenerate. `next-env.d.ts` reads `.next/types` from the last build, so run `npm run build` before `npx tsc --noEmit` after adding a route.

## Code style
- Kebab-case files; named exports (`export function SiteHeader`); default exports only where Next requires them (page, layout, not-found, route).
- Server Components by default; `"use client"` only for state, effects or event handlers.
- Imports: packages, blank line, then `@/…` (never `../`).
- `type`, not `interface`; co-locate types with their data.
- Comments explain why (constraints, gotchas), not what.
- Accessibility: `aria-label` on icon-only links, `aria-hidden` on decorative layers, native `<button>` / `<dialog>`.
- No formatter is configured. Don't run Prettier: it rewraps the code to 80 columns. Match the surrounding width (about 100 columns).

## Styling — use the design system, not raw Tailwind
- Colors: `ink canvas muted surface media line slate scrim focus danger success warning` only (default palette removed). Dark bands or text over photos: add `inverse`.
- Text: `text-micro|caption|body|statement`; uppercase titles `title-xs … title-2xl`; hero words `display-md|lg`.
- Layout: `container-page`, `container-narrow`, `grid-products|split|tiles`, `media-frame`, `scroll-row`; spacing `px-gutter`, `py-section`, `h-header`.
- Primitives: `btn` + `btn-primary|secondary|icon`; `link`, `link-quiet`; `drawer` (native `<dialog>` + `showModal()`).
- Square corners, 1px hairlines, the default 800ms `ease-luxe` transition — no custom durations or easings.
- A new reusable pattern becomes an `@utility` in the matching `src/styles/*.css` file.
- Text sizes step up at `lg`: caption and title-xs 12→15px, micro 10→13px, body 16→18px. Phones and tablets keep the base sizes. Responsive token values go in `base.css` `:root` under `@variant`, never in `@theme`.
- Listing pages (`/collections/*`) share one layout: a breadcrumbs row (`container-page py-4`, above everything, never inside a column), a centered `title-xl` header, an "N pieces" count, `grid-products` of `ProductCard`, and an empty state with a `btn-secondary`. New listings copy it.
- Visual reference is gucci.com *principles* only — never copy its text, logos, imagery, fonts or brand colors. It blocks plain HTTP fetches; view it with Claude in Chrome.
- Sample photos: free-license Unsplash only (not Unsplash+). Zoom in on each for other brands' marks (logo plaques, printed insoles, Gucci-style horsebit hardware).

## Data
- neon-http has no `db.transaction()`; use `db.batch()`.
- Columns are snake_case via `casing: "snake_case"` (set in both `drizzle.config.ts` and `src/db/index.ts`). Prices are integer cents.
- `npm run build` needs `DATABASE_URL` and a migrated, seeded DB (`npm run db:seed`).
- Export every table from `src/db/schema.ts`; migrate with `npm run db:generate && npm run db:migrate`.
- Storefront code reads the catalog only through `src/lib/catalog.ts`; components never import `db`.
- Catalog pages set `export const revalidate = 60`. Dynamic routes add `generateStaticParams` and call `notFound()` for unknown slugs. A lookup used by both `generateMetadata` and the page is wrapped in React `cache()` in catalog.ts (see `getProduct`, `getCategory`).
- `npm run db:seed` is insert-only: it skips existing slugs, so editing `seed.ts` doesn't change rows already in the DB.
- Photo URLs stored in the DB must match `images.remotePatterns` too; new image hosts need a pattern there.
- Drizzle Studio is disabled (drizzle-kit 0.31.11 exposes an unauthenticated SQL proxy; see README). Browse/edit data in the Neon Console. Re-check before re-enabling on a drizzle-kit upgrade.
- Never read or print `.env.local`.

## Checking work
- After changes: `npx tsc --noEmit` and `npm run lint`. Run `npm run build` only when finishing a feature.
- My dev server usually runs on :3000 — use it; don't start another (Next 16 refuses a second one).
- No test framework yet.

## Working with me
- Build only what I ask; list follow-ups in one line instead of building them.
- Remove verification scaffolding (preview routes, test pages) before finishing.
- Keep final summaries short: what changed, what was verified, what's open.
- Work lands on `main`. Commit and push only when I ask.
- Skills installed through `skills-lock.json` live in `.agents/skills/`, with symlinks in `.claude/skills/`. Commit all three together.
