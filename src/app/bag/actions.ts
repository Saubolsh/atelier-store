"use server";

import { cookies } from "next/headers";

import { getBagContents, readBagLines } from "@/app/bag/bag-contents";
import type { Photo } from "@/db/schema";
import { bagCookie, isProductId, maxQuantity, type BagLine } from "@/lib/bag";
import { getProductsByIds } from "@/lib/catalog";

// Server Actions are public endpoints: every argument is untrusted, and stock
// is re-checked here because the product page may be up to a minute stale.
// Setting the cookie makes Next re-render the current page with the new bag.

export type AddToBagResult =
  | {
      ok: true;
      added: { name: string; slug: string; priceCents: number; photo: Photo; quantity: number };
      count: number;
      subtotalCents: number;
    }
  | { ok: false; message: string };

async function writeBag(lines: BagLine[]) {
  const store = await cookies();
  if (lines.length === 0) {
    store.delete(bagCookie);
    return;
  }
  store.set(bagCookie, JSON.stringify(lines), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

async function findProduct(productId: unknown) {
  if (!isProductId(productId)) return undefined;
  const [product] = await getProductsByIds([productId]);
  return product;
}

export async function addToBag(productId: string): Promise<AddToBagResult> {
  const product = await findProduct(productId);
  if (!product || product.stock === 0) {
    return { ok: false, message: "Sorry, this piece is sold out." };
  }

  const lines = await readBagLines();
  const current = lines.find((line) => line.productId === product.id)?.quantity ?? 0;
  const limit = Math.min(product.stock, maxQuantity);
  if (current >= limit) {
    return { ok: false, message: `You already have ${limit} in your bag, the most available.` };
  }

  const quantity = current + 1;
  const next = current
    ? lines.map((line) => (line.productId === product.id ? { ...line, quantity } : line))
    : [...lines, { productId: product.id, quantity }];
  await writeBag(next);

  const { count, subtotalCents } = await getBagContents(next);
  const { name, slug, priceCents, photos } = product;
  return { ok: true, added: { name, slug, priceCents, photo: photos[0], quantity }, count, subtotalCents };
}

export async function setQuantity(productId: string, quantity: number) {
  const product = await findProduct(productId);
  if (!product || product.stock === 0 || !Number.isInteger(quantity)) return;

  const next = Math.max(1, Math.min(quantity, product.stock, maxQuantity));
  const lines = await readBagLines();
  await writeBag(
    lines.map((line) => (line.productId === product.id ? { ...line, quantity: next } : line)),
  );
}

export async function removeFromBag(productId: string) {
  const lines = await readBagLines();
  await writeBag(lines.filter((line) => line.productId !== productId));
}
