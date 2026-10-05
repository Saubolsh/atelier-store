import Image from "next/image";
import Link from "next/link";

import { collections } from "@/lib/sample-data";

export function CollectionSplit() {
  return (
    <section aria-label="Collections" className="grid-split">
      {collections.map((collection) => (
        <Link
          key={collection.slug}
          href={`/collections/${collection.slug}`}
          className="group inverse relative block aspect-[4/5] overflow-hidden"
        >
          <Image
            src={collection.photo.src}
            alt={collection.photo.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform group-hover:scale-[1.03]"
            style={{ objectPosition: collection.photo.position }}
          />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-5 pb-10 text-center md:pb-14">
            <h2 className="title-md">{collection.name}</h2>
            {/* The whole panel is the link; this only looks like a button. */}
            <span className="btn btn-secondary">{collection.cta}</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
