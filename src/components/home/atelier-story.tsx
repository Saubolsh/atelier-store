import Image from "next/image";
import Link from "next/link";

import { story } from "@/lib/sample-data";

export function AtelierStory() {
  return (
    <section aria-labelledby="story-title" className="pt-section">
      <h2 id="story-title" className="title-sm pb-10 text-center">
        {story.title}
      </h2>
      <div className="inverse relative aspect-[4/5] overflow-hidden md:aspect-video">
        <Image
          src={story.photo.src}
          alt={story.photo.alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: story.photo.position }}
        />
        <div aria-hidden className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-gutter text-center">
          <p className="max-w-narrow text-2xl md:text-statement">{story.quote}</p>
          <Link href={story.href} className="link text-caption font-medium">
            {story.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
