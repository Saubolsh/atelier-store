import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/sample-data";

export function ProductCard({ product }: { product: Product }) {
  const [photo] = product.photos;
  const label = product.stock === 0 ? "Sold out" : product.badge;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="media-frame">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform group-hover:scale-[1.03]"
          style={{ objectPosition: photo.position }}
        />
        {label && (
          <span className="absolute top-3 left-3 bg-canvas px-1.5 py-0.5 text-micro">{label}</span>
        )}
      </div>
      <div className="px-3 pt-4 text-caption">
        <h3>{product.name}</h3>
        <p className="mt-1 font-medium">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
