import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/sample-data";

const price = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="media-frame">
        <Image
          src={product.photo.src}
          alt={product.photo.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform group-hover:scale-[1.03]"
          style={{ objectPosition: product.photo.position }}
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-canvas px-1.5 py-0.5 text-micro">
            {product.badge}
          </span>
        )}
      </div>
      <div className="px-3 pt-4 text-caption">
        <h3>{product.name}</h3>
        <p className="mt-1 font-medium">{price.format(product.price)}</p>
      </div>
    </Link>
  );
}
