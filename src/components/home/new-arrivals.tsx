import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/sample-data";

export function NewArrivals() {
  return (
    <section aria-labelledby="new-arrivals-title" className="py-section">
      <div className="container-page flex items-baseline justify-between pb-8">
        <h2 id="new-arrivals-title" className="title-sm">
          New arrivals
        </h2>
        <Link href="/collections/new-arrivals" className="link text-caption font-medium">
          View all
        </Link>
      </div>
      <ul className="grid-products">
        {products.map((product, index) => (
          // Eight cards fill four rows of two and two rows of four. The
          // three-column tablet grid shows six so its last row isn't half empty.
          <li key={product.slug} className={index >= 6 ? "md:max-lg:hidden" : undefined}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
