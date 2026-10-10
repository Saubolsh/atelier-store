import { cookies } from "next/headers";

import { bagCookie, maxQuantity, parseBag, type BagLine } from "@/lib/bag";
import { getProductsByIds } from "@/lib/catalog";

export async function readBagLines() {
  return parseBag((await cookies()).get(bagCookie)?.value);
}

/**
 * The bag joined with the live catalog. Products deleted since they were added
 * drop out; sold-out ones stay listed but don't count toward the subtotal.
 */
export async function getBagContents(lines?: BagLine[]) {
  lines ??= await readBagLines();
  const products = await getProductsByIds(lines.map((line) => line.productId));
  const byId = new Map(products.map((product) => [product.id, product]));

  const items = lines.flatMap((line) => {
    const product = byId.get(line.productId);
    if (!product) return [];
    const available = product.stock > 0;
    const quantity = available ? Math.min(line.quantity, product.stock, maxQuantity) : line.quantity;
    return [{ product, quantity, available }];
  });
  const inStock = items.filter((item) => item.available);

  return {
    items,
    count: inStock.reduce((sum, item) => sum + item.quantity, 0),
    subtotalCents: inStock.reduce((sum, item) => sum + item.quantity * item.product.priceCents, 0),
  };
}

export type BagItem = Awaited<ReturnType<typeof getBagContents>>["items"][number];
