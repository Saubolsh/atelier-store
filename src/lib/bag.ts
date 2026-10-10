// The bag lives in a cookie so guests can shop without an account. It holds
// only product ids and quantities; prices and stock are always re-read from the
// catalog. Not httpOnly: the header reads the item count client-side, so cached
// pages don't have to render per visitor.

export const bagCookie = "bag";

/** Most units of one piece a bag can hold, whatever the stock. */
export const maxQuantity = 10;

export type BagLine = { productId: string; quantity: number };

// Ids reach a uuid column; anything else would make Postgres throw.
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isProductId(value: unknown): value is string {
  return typeof value === "string" && uuid.test(value);
}

// The cookie is user-editable: drop anything malformed instead of throwing.
export function parseBag(value: string | undefined): BagLine[] {
  if (!value) return [];
  try {
    const lines: unknown = JSON.parse(value);
    if (!Array.isArray(lines)) return [];
    return lines.filter(
      (line): line is BagLine =>
        isProductId(line?.productId) && Number.isInteger(line.quantity) && line.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function countItems(lines: BagLine[]) {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}
