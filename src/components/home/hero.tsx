import Image from "next/image";
import Link from "next/link";

import { campaign } from "@/lib/sample-data";

// Full-bleed campaign image under the transparent header. Together with the
// 40px announcement bar it fills the first screen.
export function Hero() {
  return (
    <section className="inverse relative -mt-header flex h-[calc(100svh-2.5rem)] min-h-[36rem] items-end justify-center overflow-hidden">
      <Image
        src={campaign.photo.src}
        alt={campaign.photo.alt}
        fill
        preload
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: campaign.photo.position }}
      />
      {/* Shade the top and bottom so the header and headline stay legible. */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-black/60 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/60 to-transparent" />

      <div className="relative flex flex-col items-center gap-5 px-gutter pb-14 text-center md:pb-20">
        <p className="title-xs">{campaign.eyebrow}</p>
        <h1 className="display-lg">{campaign.title}</h1>
        <Link href={campaign.href} className="btn btn-primary mt-3">
          {campaign.cta}
        </Link>
      </div>
    </section>
  );
}
