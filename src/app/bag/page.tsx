import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getBagContents } from "@/app/bag/bag-contents";
import { BagLineControls } from "@/components/bag/bag-line-controls";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { maxQuantity } from "@/lib/bag";
import { formatPrice } from "@/lib/format";

// Reads the bag cookie, so this page renders per request.
export const metadata: Metadata = {
  title: "Shopping bag | Atelier Store",
  robots: { index: false },
};

export default async function BagPage() {
  const { items, count, subtotalCents } = await getBagContents();

  return (
    <section aria-labelledby="bag-title" className="pb-section">
      <div className="container-page py-4">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shopping bag" }]} />
      </div>
      <header className="container-narrow flex flex-col items-center gap-4 py-section text-center">
        <h1 id="bag-title" className="title-xl">
          Shopping bag
        </h1>
        {items.length > 0 && (
          <p className="text-caption text-muted">
            {count} {count === 1 ? "piece" : "pieces"}
          </p>
        )}
      </header>

      {items.length > 0 ? (
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
          <ul className="border-t">
            {items.map(({ product, quantity, available }) => {
              const [photo] = product.photos;
              return (
                <li key={product.id} className="flex gap-6 border-b py-6">
                  <Link href={`/products/${product.slug}`} className="media-frame w-28 shrink-0 md:w-40">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 768px) 160px, 112px"
                      className="object-cover"
                      style={{ objectPosition: photo.position }}
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col gap-4">
                    <div className="flex flex-col gap-1 text-caption md:flex-row md:justify-between md:gap-6">
                      <Link href={`/products/${product.slug}`} className="link-quiet font-medium">
                        {product.name}
                      </Link>
                      <p className={available ? "" : "text-muted line-through"}>
                        {formatPrice(product.priceCents * quantity)}
                      </p>
                    </div>
                    {!available && <p className="text-caption text-danger">Sold out</p>}
                    <BagLineControls
                      productId={product.id}
                      name={product.name}
                      quantity={quantity}
                      max={Math.min(product.stock, maxQuantity)}
                      available={available}
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          <aside aria-labelledby="summary-title" className="self-start bg-surface p-8">
            <h2 id="summary-title" className="title-xs">
              Order summary
            </h2>
            <dl className="mt-6 flex justify-between border-b pb-6 text-caption">
              <dt>Subtotal</dt>
              <dd className="font-medium">{formatPrice(subtotalCents)}</dd>
            </dl>
            <p className="mt-4 text-caption text-muted">Shipping and taxes calculated at checkout.</p>
            <Link href="/checkout" className="btn btn-primary mt-8 w-full">
              Checkout
            </Link>
            <Link href="/collections/new-arrivals" className="link mt-6 inline-block text-caption">
              Continue shopping
            </Link>
          </aside>
        </div>
      ) : (
        <div className="container-narrow flex flex-col items-center gap-6 text-center">
          <p className="text-body text-muted">Your bag is empty.</p>
          <Link href="/collections/new-arrivals" className="btn btn-secondary">
            Shop new arrivals
          </Link>
        </div>
      )}
    </section>
  );
}
