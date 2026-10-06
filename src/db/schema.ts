// Drizzle table definitions. drizzle-kit reads this file (see drizzle.config.ts)
// and the `db` client is typed from its exports, so export every table here.
import { sql } from "drizzle-orm";
import { check, index, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position, for photos whose subject is off-center. */
  position?: string;
};

export const categories = pgTable("categories", {
  id: uuid().primaryKey().defaultRandom(),
  slug: text().notNull().unique(),
  name: text().notNull(),
  photo: jsonb().$type<Photo>().notNull(),
  /** Display order in category navigation. */
  position: integer().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

// Stock lives on the product while there are no variants; it moves to a
// variants table once sizes and colors exist.
export const products = pgTable(
  "products",
  {
    id: uuid().primaryKey().defaultRandom(),
    slug: text().notNull().unique(),
    name: text().notNull(),
    // RESTRICT: a category can't be deleted while products still reference it.
    categoryId: uuid()
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    /** Integer minor units (cents) so checkout never deals with float rounding. */
    priceCents: integer().notNull(),
    /** Units available; 0 is sold out. */
    stock: integer().notNull().default(0),
    badge: text(),
    description: text().notNull(),
    details: text().array().notNull().default(sql`'{}'::text[]`),
    /** Listings show the first photo; the product page shows them all. */
    photos: jsonb().$type<Photo[]>().notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("products_category_id_idx").on(table.categoryId),
    check("products_price_cents_nonnegative", sql`${table.priceCents} >= 0`),
    check("products_stock_nonnegative", sql`${table.stock} >= 0`),
  ],
);

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
