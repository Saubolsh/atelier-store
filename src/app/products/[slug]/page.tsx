import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { AddToBag } from "@/components/product/add-to-bag";
import { ProductGallery } from "@/components/product/product-gallery";
import { StockStatus } from "@/components/product/stock-status";
import { getProduct, getProductSlugs } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

// Known products are built ahead of time and refreshed at most once a minute;
// products added later render on first request, unknown slugs are a 404.
export const revalidate = 60;

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  return { title: `${product.name} | Atelier Store`, description: product.description };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  return (
    <>
      <div className="container-page py-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: product.category.name, href: `/collections/${product.category.slug}` },
            { label: product.name },
          ]}
        />
      </div>
      <article className="md:grid md:grid-cols-2 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <ProductGallery photos={product.photos} />

        <div className="px-gutter pt-8 pb-section md:sticky md:top-header md:self-start md:pt-12 lg:px-16 lg:pt-16">
          <div className="mx-auto max-w-md">
            <Link
              href={`/collections/${product.category.slug}`}
              className="link-quiet title-xs text-muted"
            >
              {product.category.name}
            </Link>
            <h1 className="title-md mt-3">{product.name}</h1>
            <p className="mt-3 text-body font-normal">{formatPrice(product.priceCents)}</p>

            <div className="mt-8 flex flex-col gap-4">
              <StockStatus stock={product.stock} />
              <AddToBag productId={product.id} soldOut={product.stock === 0} />
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
    </>
  );
}
