import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/product-card";
import { getCategories, getCategory, getCategoryProducts } from "@/lib/catalog";

// Known categories are built ahead of time and refreshed at most once a minute;
// categories added later render on first request, unknown slugs are a 404.
// /collections/new-arrivals is its own static route and takes precedence.
export const revalidate = 60;

export async function generateStaticParams() {
  return (await getCategories()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const category = await getCategory((await params).slug);
  if (!category) return {};
  return {
    title: `${category.name} | Atelier Store`,
    description: `${category.name} from the atelier, newest first.`,
  };
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const category = await getCategory((await params).slug);
  if (!category) notFound();
  const products = await getCategoryProducts(category.id);

  return (
    <section aria-labelledby="collection-title" className="pb-section">
      <div className="container-page py-4">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name }]} />
      </div>
      <header className="container-narrow flex flex-col items-center gap-4 py-section text-center">
        <h1 id="collection-title" className="title-xl">
          {category.name}
        </h1>
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
          <Link href="/collections/new-arrivals" className="btn btn-secondary">
            Shop new arrivals
          </Link>
        </div>
      )}
    </section>
  );
}
