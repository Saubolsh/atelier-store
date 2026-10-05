import Image from "next/image";
import Link from "next/link";

import { categories } from "@/lib/sample-data";

export function CategoryRow() {
  return (
    <section aria-labelledby="categories-title" className="py-section">
      <h2 id="categories-title" className="title-sm pb-10 text-center">
        Shop by category
      </h2>
      <ul className="grid grid-cols-2 gap-px lg:grid-cols-4">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={`/collections/${category.slug}`} className="group block">
              <div className="media-frame">
                <Image
                  src={category.photo.src}
                  alt={category.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform group-hover:scale-[1.03]"
                  style={{ objectPosition: category.photo.position }}
                />
              </div>
              <p className="pt-4 text-center text-caption font-medium">{category.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
