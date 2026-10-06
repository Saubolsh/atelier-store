// Loads the sample catalog. Insert-only: safe to re-run, existing rows (matched
// by slug) are never overwritten.
// Run with `npm run db:seed` after `npm run db:migrate`.
import { loadEnvConfig } from "@next/env";
import { sql } from "drizzle-orm";

import { categories, products } from "@/db/schema";
import { unsplash } from "@/lib/sample-data";

type CategorySeed = typeof categories.$inferInsert;
// Products reference their category by slug; the id is resolved in SQL.
type ProductSeed = Omit<typeof products.$inferInsert, "categoryId"> & { category: string };

const categorySeed: CategorySeed[] = [
  {
    slug: "bags",
    name: "Bags",
    position: 0,
    photo: {
      src: unsplash("1746880223690-359948154c53"),
      alt: "Brown leather handbag with a black handle in low light",
    },
  },
  {
    slug: "shoes",
    name: "Shoes",
    position: 1,
    photo: {
      src: unsplash("1605325360282-9b0ac4ca7b76"),
      alt: "Black leather lace-up shoes under a camel skirt, among autumn leaves",
      position: "50% 75%",
    },
  },
  {
    slug: "ready-to-wear",
    name: "Ready-to-wear",
    position: 2,
    photo: {
      src: unsplash("1769107805465-bfd41863f1a0"),
      alt: "Rail of neutral-toned clothing in a bright boutique",
    },
  },
  {
    slug: "accessories",
    name: "Accessories",
    position: 3,
    photo: {
      src: unsplash("1508296695146-257a814070b4"),
      alt: "Cat-eye sunglasses with pale frames",
    },
  },
];

// Newest first, the order the homepage's new arrivals show them in.
const productSeed: ProductSeed[] = [
  {
    slug: "arden-leather-tote",
    name: "Arden leather tote",
    priceCents: 185000,
    category: "bags",
    stock: 12,
    badge: "New",
    description:
      "A roomy everyday tote in vegetable-tanned leather that softens and deepens in color with use. Unlined, with one zipped pocket inside.",
    details: [
      "Vegetable-tanned calf leather",
      "Hand-stitched handles, 24 cm drop",
      "Interior zip pocket",
      "W 40 × H 32 × D 14 cm",
    ],
    photos: [
      {
        src: unsplash("1624687943971-e86af76d57de"),
        alt: "Tan leather tote bag hanging on a door",
      },
    ],
  },
  {
    slug: "sienna-top-handle-bag",
    name: "Sienna top-handle bag",
    priceCents: 240000,
    category: "bags",
    stock: 2,
    description:
      "A structured top-handle bag built on a hand-shaped frame, with a detachable strap for wearing across the body.",
    details: [
      "Smooth calf leather, suede lining",
      "Detachable, adjustable shoulder strap",
      "Magnetic closure",
      "W 28 × H 21 × D 12 cm",
    ],
    photos: [
      {
        src: unsplash("1691480150204-66dd1eb77391"),
        alt: "Structured brown leather top-handle bag",
      },
    ],
  },
  {
    slug: "holt-messenger-bag",
    name: "Holt messenger bag",
    priceCents: 169000,
    category: "bags",
    stock: 7,
    description:
      "A soft messenger in waxed leather, sized for a laptop and a day's essentials. The flap closes with a hidden magnet.",
    details: [
      "Waxed calf leather, cotton lining",
      "Fits a 14-inch laptop",
      "Adjustable shoulder strap",
      "W 38 × H 28 × D 9 cm",
    ],
    photos: [
      {
        src: unsplash("1603219527847-24c87f552a77"),
        alt: "Dark brown leather messenger bag on a wooden stool",
      },
    ],
  },
  {
    slug: "ravel-penny-loafer",
    name: "Ravel penny loafer",
    priceCents: 79000,
    category: "shoes",
    stock: 9,
    badge: "New",
    description:
      "A classic penny loafer, hand-sewn on a slim last from burnished calf leather, on a leather sole that can be resoled.",
    details: [
      "Burnished calf leather",
      "Hand-sewn moccasin construction",
      "Leather sole, stacked heel",
      "Fits true to size",
    ],
    photos: [
      {
        src: unsplash("1777987601447-266e128de448"),
        alt: "Pair of brown leather penny loafers on a stool",
      },
    ],
  },
  {
    slug: "corso-chelsea-boot",
    name: "Corso Chelsea boot",
    priceCents: 95000,
    category: "shoes",
    stock: 0,
    description:
      "A sleek Chelsea boot with elastic side panels and a pull tab, Goodyear-welted so it can be resoled for years.",
    details: [
      "Calf leather, leather lining",
      "Goodyear-welted leather sole",
      "Elastic side panels",
      "Fits true to size",
    ],
    photos: [
      {
        src: unsplash("1777987601423-f350ac29b3e9"),
        alt: "Pair of brown leather Chelsea boots on a wooden board",
      },
    ],
  },
  {
    slug: "brera-brogue-boot",
    name: "Brera brogue boot",
    priceCents: 105000,
    category: "shoes",
    stock: 5,
    description:
      "A lace-up boot with hand-punched brogue detailing and a rubber-studded leather sole for wet days.",
    details: [
      "Grained calf leather",
      "Hand-punched brogue detailing",
      "Leather sole with rubber inserts",
      "Fits large; consider half a size down",
    ],
    photos: [
      {
        src: unsplash("1638609348722-aa2a3a67db26"),
        alt: "Pair of tan leather brogue boots",
      },
    ],
  },
  {
    slug: "linea-sunglasses",
    name: "Linea sunglasses",
    priceCents: 42000,
    category: "accessories",
    stock: 20,
    description:
      "Browline sunglasses with a hand-polished acetate brow and a fine metal rim, fitted with category 3 lenses.",
    details: [
      "Acetate and metal frame",
      "Category 3 lenses, 100% UV protection",
      "Leather case included",
    ],
    photos: [
      {
        src: unsplash("1584036553516-bf83210aa16c"),
        alt: "Black browline sunglasses on a white surface",
      },
    ],
  },
  {
    slug: "hollis-tweed-coat",
    name: "Hollis tweed coat",
    priceCents: 275000,
    category: "ready-to-wear",
    stock: 3,
    description:
      "A single-breasted coat in a heavy wool tweed, cut long and straight with a half-canvassed front that keeps its shape.",
    details: [
      "100% wool tweed, viscose lining",
      "Half-canvassed construction",
      "Horn buttons",
      "Relaxed fit; take your usual size",
    ],
    photos: [
      {
        src: unsplash("1722858958066-97deb3471c89"),
        alt: "Grey tweed coat hanging in a white wardrobe",
      },
    ],
  },
];

// Every row in one batch would share the same now(), so new arrivals (ordered
// by createdAt) get distinct, fixed timestamps a minute apart.
const newestArrival = Date.UTC(2026, 8, 1);

async function seed() {
  // src/db reads DATABASE_URL at import time, so load .env* files first.
  loadEnvConfig(process.cwd());
  const { db } = await import("@/db");

  // Insert-only: rows whose slug already exists are skipped, never updated, so
  // re-running the seed can't reset live stock, prices or edits.
  const insertCategories = db
    .insert(categories)
    .values(categorySeed)
    .onConflictDoNothing({ target: categories.slug })
    .returning({ slug: categories.slug });

  const insertProducts = db
    .insert(products)
    .values(
      productSeed.map(({ category, ...product }, index) => ({
        ...product,
        categoryId: sql`(select id from ${categories} where ${categories.slug} = ${category})`,
        createdAt: new Date(newestArrival - index * 60_000),
      })),
    )
    .onConflictDoNothing({ target: products.slug })
    .returning({ slug: products.slug });

  // One batch is one HTTP request and runs atomically.
  const [newCategories, newProducts] = await db.batch([insertCategories, insertProducts]);
  console.log(
    `Inserted ${newCategories.length} of ${categorySeed.length} categories and ` +
      `${newProducts.length} of ${productSeed.length} products; existing rows were left as they are.`,
  );
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
