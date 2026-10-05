import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/product/product-gallery";
import { StockStatus } from "@/components/product/stock-status";
import { formatPrice } from "@/lib/format";
import { getCategory, getProduct, products } from "@/lib/sample-data";

// Every product page is built ahead of time; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: `${product.name} | Atelier Store`, description: product.description };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category);

  return (
    <article className="md:grid md:grid-cols-2 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <ProductGallery photos={product.photos} />

      <div className="px-gutter pt-8 pb-section md:sticky md:top-header md:self-start md:pt-12 lg:px-16 lg:pt-16">
        <div className="mx-auto max-w-md">
          {category && (
            <Link href={`/collections/${category.slug}`} className="link-quiet title-xs text-muted">
              {category.name}
            </Link>
          )}
          <h1 className="title-md mt-3">{product.name}</h1>
          <p className="mt-3 text-body font-normal">{formatPrice(product.price)}</p>

          <div className="mt-8 flex flex-col gap-4">
            <StockStatus stock={product.stock} />
            {/* Not wired up yet: the bag comes in a later step. */}
            <button type="button" disabled={product.stock === 0} className="btn btn-primary w-full">
              Add to bag
            </button>
          </div>

          <p className="mt-10 text-body">{product.description}</p>

          <section aria-labelledby="details-title" className="mt-10 border-t pt-6">
            <h2 id="details-title" className="title-xs">
              Details
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-caption text-muted">
              {product.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
