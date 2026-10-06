const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Prices are stored in integer cents. */
export function formatPrice(cents: number) {
  return usd.format(cents / 100);
}
