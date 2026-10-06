# Atelier Store

eCommerce app built with Next.js. The catalog (products, categories, stock) lives in Postgres; auth flows, bag and checkout are not built yet.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript, Turbopack)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Better Auth](https://better-auth.com) with the Drizzle adapter
- [Drizzle ORM](https://orm.drizzle.team) on [Neon](https://neon.com) serverless Postgres (HTTP driver)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your local env file and fill it in:

   ```bash
   cp .env.example .env.local
   ```

   - `DATABASE_URL`: connection string from the Neon Console
   - `BETTER_AUTH_SECRET`: generate with `npx auth secret`
   - `BETTER_AUTH_URL`: `http://localhost:3000` for local development

3. Create the tables and load the sample catalog:

   ```bash
   npm run db:migrate && npm run db:seed
   ```

4. Start the dev server and open [http://localhost:3000](http://localhost:3000):

   ```bash
   npm run dev
   ```

## Project structure

```
src/
  app/
    api/auth/[...all]/route.ts   Better Auth handler, mounted at /api/auth/*
    layout.tsx                   Root layout: fonts, announcement bar, header, footer
    page.tsx                     Homepage
    products/[slug]/page.tsx     Product detail page (pre-rendered per product, refreshed every 60s)
    not-found.tsx                404 page
    globals.css                  Tailwind entry; imports the design system
  components/
    home/                        Homepage sections (hero, categories, new arrivals, ...)
    product/                     Product page parts: gallery, stock status
    site-header.tsx              Sticky header; transparent over the homepage hero
    menu-drawer.tsx              Navigation drawer (native <dialog>)
    site-footer.tsx, product-card.tsx, announcement-bar.tsx, icons.tsx
  db/
    index.ts                     Drizzle client (Neon HTTP driver, snake_case columns)
    schema.ts                    Tables: categories, products (price in cents, stock)
    seed.ts                      Sample catalog; insert-only, never overwrites rows
  lib/
    auth.ts                      Better Auth server instance
    auth-client.ts               Better Auth React client
    navigation.ts                Header, menu and footer links
    catalog.ts                   Catalog queries; the storefront's only read path to the DB
    format.ts                    Price formatting (takes cents)
    sample-data.ts               Editorial homepage content and the unsplash() URL helper
  styles/
    fonts.ts                     Albert Sans (UI) and Bodoni Moda (editorial accent)
    tokens.css                   Design tokens: color, type sizes, layout, shape, motion
    base.css                     Element defaults, responsive gutters, focus, reduced motion
    typography.css               Uppercase title-* and display-* styles
    layout.css                   Containers, grids, media frame, horizontal scroller
    components.css               Buttons, links and the side drawer
drizzle.config.ts                drizzle-kit config; migrations go to ./drizzle
```

## Design system

Tailwind v4, configured in CSS (`src/styles`). The main rules:

- **Monochrome UI.** Use `ink`, `canvas`, `muted`, `line` and `surface`; Tailwind's default palette is removed. Wrap dark sections or text over photos in `inverse` and everything inside flips.
- **Type.** Sentence case uses `text-caption` (12px, most UI), `text-body` (16px light) and `text-statement`. Titles are uppercase `title-xs` to `title-2xl`, getting lighter as they get larger. Use `display-md` / `display-lg` for hero words.
- **Layout.** Imagery runs full-bleed; content sits in `container-page` (1440px max, gutters 16 / 32 / 64px). Spacing tokens: `px-gutter`, `py-section`, `h-header`.
- **Shape and motion.** Square corners, 1px hairlines, one slow `ease-luxe` curve (800ms) for all transitions.
- **Primitives.** `btn` with `btn-primary` / `btn-secondary` / `btn-icon`; `link` / `link-quiet`; `grid-products`, `grid-split`, `grid-tiles`, `media-frame`, `scroll-row`; `drawer` for side panels on a native `<dialog>`.

## Scripts

| Command               | Description                                        |
| --------------------- | -------------------------------------------------- |
| `npm run dev`         | Start the dev server                               |
| `npm run build`       | Production build                                   |
| `npm run start`       | Serve the production build                         |
| `npm run lint`        | Run ESLint                                         |
| `npm run db:generate` | Generate SQL migrations from `src/db/schema.ts`    |
| `npm run db:migrate`  | Apply pending migrations to the database           |
| `npm run db:push`     | Push the schema without migrations (prototyping)   |
| `npm run db:studio`   | Open Drizzle Studio                                |
| `npm run db:seed`     | Insert missing sample catalog rows (never updates) |

## Adding the Better Auth tables

Better Auth needs its `user`, `session`, `account` and `verification` tables before sign-in can work. They are not in the schema yet. When you're ready:

1. Generate the Drizzle schema for them:

   ```bash
   npx auth generate --output src/db/auth-schema.ts
   ```

2. Re-export it from `src/db/schema.ts`:

   ```ts
   export * from "./auth-schema";
   ```

3. Create and apply the migration:

   ```bash
   npm run db:generate && npm run db:migrate
   ```

Then enable sign-in methods (e.g. `emailAndPassword`, social providers) in `src/lib/auth.ts`.
