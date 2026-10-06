import { asc, desc, eq, getTableColumns } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db";
import { categories, products } from "@/db/schema";

// The storefront's only read path to the catalog; components never query the
// database directly.

export function getCategories() {
  return db.select().from(categories).orderBy(asc(categories.position));
}

export function getNewArrivals(limit = 8) {
  return db.select().from(products).orderBy(desc(products.createdAt)).limit(limit);
}

export async function getProductSlugs() {
  const rows = await db.select({ slug: products.slug }).from(products);
  return rows.map((row) => row.slug);
}

// cache(): generateMetadata and the page both ask for the same product in one
// render; this keeps it to a single query.
export const getProduct = cache(async (slug: string) => {
  const [product] = await db
    .select({
      ...getTableColumns(products),
      category: { slug: categories.slug, name: categories.name },
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.slug, slug))
    .limit(1);
  return product;
});
