"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent, Ref } from "react";

import type { AddToBagResult } from "@/app/bag/actions";
import { CloseIcon } from "@/components/icons";
import { formatPrice } from "@/lib/format";

type Added = Extract<AddToBagResult, { ok: true }>;

// Same as the menu: backdrop clicks land on the <dialog> itself, and link
// clicks navigate without unmounting the page, so the drawer closes itself.
function closeOnBackdropOrLink(event: MouseEvent<HTMLDialogElement>) {
  const dialog = event.currentTarget;
  if (event.target === dialog || (event.target as Element).closest("a")) {
    dialog.close();
  }
}

export function BagDrawer({ ref, result }: { ref: Ref<HTMLDialogElement>; result: Added | null }) {
  return (
    <dialog
      ref={ref}
      aria-labelledby="bag-drawer-title"
      className="drawer"
      onClick={closeOnBackdropOrLink}
    >
      <div className="flex min-h-full flex-col px-8 pb-12 md:px-12">
        <form method="dialog" className="flex h-header shrink-0 items-center justify-between">
          <h2 id="bag-drawer-title" className="title-xs">
            Added to your bag
          </h2>
          <button className="btn btn-primary btn-icon" aria-label="Close bag">
            <CloseIcon />
          </button>
        </form>

        {result && (
          <>
            <div className="flex gap-6 border-y py-6">
              <div className="media-frame w-28 shrink-0">
                <Image
                  src={result.added.photo.src}
                  alt={result.added.photo.alt}
                  fill
                  sizes="112px"
                  className="object-cover"
                  style={{ objectPosition: result.added.photo.position }}
                />
              </div>
              <div className="flex flex-col gap-1 text-caption">
                <Link href={`/products/${result.added.slug}`} className="link-quiet font-medium">
                  {result.added.name}
                </Link>
                <p>{formatPrice(result.added.priceCents)}</p>
                <p className="text-muted">Quantity: {result.added.quantity}</p>
              </div>
            </div>

            <dl className="flex justify-between py-6 text-caption">
              <dt>
                Subtotal ({result.count} {result.count === 1 ? "item" : "items"})
              </dt>
              <dd className="font-medium">{formatPrice(result.subtotalCents)}</dd>
            </dl>

            <div className="flex flex-col gap-3">
              <Link href="/bag" className="btn btn-primary w-full">
                View bag
              </Link>
              <form method="dialog">
                <button className="btn btn-secondary w-full">Continue shopping</button>
              </form>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
