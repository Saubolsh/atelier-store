import Image from "next/image";
import Link from "next/link";

import { services } from "@/lib/sample-data";

export function Services() {
  return (
    <section aria-labelledby="services-title" className="container-page py-section">
      <h2 id="services-title" className="title-sm pb-10 text-center">
        Atelier services
      </h2>
      <ul className="grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
        {services.map((service) => (
          <li key={service.slug}>
            <Link href={`/services/${service.slug}`} className="group block">
              <div className="relative aspect-square overflow-hidden bg-media">
                <Image
                  src={service.photo.src}
                  alt={service.photo.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform group-hover:scale-[1.03]"
                  style={{ objectPosition: service.photo.position }}
                />
              </div>
              <h3 className="title-xs pt-5 text-center">{service.name}</h3>
              <p className="mx-auto max-w-72 pt-2 text-center text-caption text-muted">
                {service.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
