import Image from "next/image";

import type { Photo } from "@/lib/sample-data";

// Phones swipe through the photos edge to edge; from md they stack into a tall
// column beside the sticky product information.
export function ProductGallery({ photos }: { photos: Photo[] }) {
  return (
    <ul
      aria-label="Product images"
      className="scroll-row snap-x snap-mandatory gap-px md:grid md:overflow-visible"
    >
      {photos.map((photo, index) => (
        <li key={photo.src} className="w-full snap-start">
          <div className="media-frame">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              preload={index === 0}
              sizes="(min-width: 1024px) 60vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: photo.position }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
