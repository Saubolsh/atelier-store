import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/product-card";
import { getNewArrivals } from "@/lib/catalog";

// Prerendered and refreshed at most once a minute, like the homepage, so new
// products and stock changes show up without a redeploy.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "New arrivals | Atelier Store",
  description: "The latest leather goods and ready-to-wear from the atelier, newest first.",
};

export default async function NewArrivalsPage() {
  const products = await getNewArrivals(24);

  return (
    <section aria-labelledby="new-arrivals-title" className="pb-section">
      <div className="container-page py-4">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "New arrivals" }]} />
      </div>
      <header className="container-narrow flex flex-col items-center gap-4 py-section text-center">
        <h1 id="new-arrivals-title" className="title-xl">
          New arrivals
        </h1>
        <p className="text-body text-muted">
          The latest pieces from the atelier, newest first.
        </p>
      </header>

      {products.length > 0 ? (
        <>
          <p className="container-page pb-6 text-caption text-muted">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
          <ul className="grid-products">
            {products.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="container-narrow flex flex-col items-center gap-6 text-center">
          <p className="text-body text-muted">New pieces are on their way. Check back soon.</p>
          <Link href="/" className="btn btn-secondary">
            Back to the homepage
          </Link>
        </div>
      )}
    </section>
  );
}
