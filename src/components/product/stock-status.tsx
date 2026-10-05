// At or below this many units the page shows the exact count.
const lowStock = 3;

export function StockStatus({ stock }: { stock: number }) {
  const [label, dot] =
    stock === 0
      ? ["Sold out", "bg-muted"]
      : stock <= lowStock
        ? [`Only ${stock} left`, "bg-warning"]
        : ["In stock", "bg-success"];

  return (
    <p className="flex items-center gap-2 text-caption">
      <span aria-hidden className={`size-1.5 rounded-full ${dot}`} />
      {label}
    </p>
  );
}
