@AGENTS.md

# Atelier Store

Luxury-fashion storefront. Next.js 16 (App Router, Turbopack) · React 19.2 · TS strict · Tailwind 4 (configured in CSS) · Better Auth · Drizzle on Neon (HTTP driver). README.md has setup and the full file tree — don't re-explore the tree for orientation.

## Status
- Done: project setup, design system (`src/styles/`), homepage.
- Not yet: DB tables (`schema.ts` is empty), auth tables/flows, product page, collections, search, bag, checkout. Header/footer links point to routes that don't exist yet — expected.
- Content is hard-coded in `src/lib/sample-data.ts` and `src/lib/navigation.ts` until the catalog moves to the DB.

## Next.js 16
The AGENTS.md rule stands, but read only the doc you need: grep `node_modules/next/dist/docs/` for the API, starting with `01-app/02-guides/upgrading/version-16.md`. Already known:
- `params`, `searchParams`, `cookies()`, `headers()` are async — await them. Use the global `PageProps<"/route">` / `LayoutProps<"/route">` types.
- `middleware.ts` is now `proxy.ts`.
- `next/image`: `preload`, not `priority`. Remote URLs must match `images.remotePatterns` in next.config.ts exactly — build Unsplash URLs with the `unsplash()` helper in sample-data.ts.
- `next lint` is removed; use `npm run lint` (flat config).

## Code style
- Kebab-case files; named exports (`export function SiteHeader`); default exports only where Next requires them (page, layout, not-found, route).
- Server Components by default; `"use client"` only for state, effects or event handlers.
- Imports: packages, blank line, then `@/…` (never `../`).
- `type`, not `interface`; co-locate types with their data.
- Comments explain why (constraints, gotchas), not what.
- Accessibility: `aria-label` on icon-only links, `aria-hidden` on decorative layers, native `<button>` / `<dialog>`.

## Styling — use the design system, not raw Tailwind
- Colors: `ink canvas muted surface media line slate scrim focus danger success warning` only (default palette removed). Dark bands or text over photos: add `inverse`.
- Text: `text-micro|caption|body|statement`; uppercase titles `title-xs … title-2xl`; hero words `display-md|lg`.
- Layout: `container-page`, `container-narrow`, `grid-products|split|tiles`, `media-frame`, `scroll-row`; spacing `px-gutter`, `py-section`, `h-header`.
- Primitives: `btn` + `btn-primary|secondary|icon`; `link`, `link-quiet`; `drawer` (native `<dialog>` + `showModal()`).
- Square corners, 1px hairlines, the default 800ms `ease-luxe` transition — no custom durations or easings.
- A new reusable pattern becomes an `@utility` in the matching `src/styles/*.css` file.
- Visual reference is gucci.com *principles* only — never copy its text, logos, imagery, fonts or brand colors. It blocks plain HTTP fetches; view it with Claude in Chrome.
- Sample photos: free-license Unsplash only (not Unsplash+). Zoom in on each for other brands' marks (logo plaques, printed insoles, Gucci-style horsebit hardware).

## Data
- neon-http has no `db.transaction()`; use `db.batch()`.
- Export every table from `src/db/schema.ts`; migrate with `npm run db:generate && npm run db:migrate`.
- Never read or print `.env.local`.

## Checking work
- After changes: `npx tsc --noEmit` and `npm run lint`. Run `npm run build` only when finishing a feature.
- My dev server usually runs on :3000 — use it; don't start another (Next 16 refuses a second one).
- No test framework yet.

## Working with me
- Build only what I ask; list follow-ups in one line instead of building them.
- Remove verification scaffolding (preview routes, test pages) before finishing.
- Keep final summaries short: what changed, what was verified, what's open.
