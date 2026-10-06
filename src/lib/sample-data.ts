// Editorial homepage content. The catalog (products, categories) lives in the
// database; see src/db/seed.ts.
// Photography from Unsplash (https://unsplash.com/license).
import type { Photo } from "@/db/schema";

export type Collection = { slug: string; name: string; cta: string; photo: Photo };

export type Service = { slug: string; name: string; description: string; photo: Photo };

// Must match images.remotePatterns[].search in next.config.ts. Full-bleed
// photos use 2400px sources; everything else 1600px, which keeps Next's image
// optimizer well inside its 7s timeout for fetching the original.
export const unsplash = (id: string, width: 1600 | 2400 = 1600) =>
  `https://images.unsplash.com/photo-${id}?fm=jpg&q=80&w=${width}`;

export const campaign = {
  eyebrow: "Autumn-Winter 2026",
  title: "Made slowly",
  cta: "Discover the collection",
  href: "/collections/autumn-winter-2026",
  photo: {
    src: unsplash("1779405949264-a44d50a14315", 2400),
    alt: "Model in a navy coat and patterned dress seated in a gilded room",
    position: "38% 40%",
  },
};

export const collections: Collection[] = [
  {
    slug: "women",
    name: "Women",
    cta: "Shop women",
    photo: {
      src: unsplash("1696489283182-0446be970e40"),
      alt: "Woman in a leather jacket by a window",
    },
  },
  {
    slug: "men",
    name: "Men",
    cta: "Shop men",
    photo: {
      src: unsplash("1602346693719-c1c05078679e"),
      alt: "Man in a brown jacket, seen from behind",
    },
  },
];

export const story = {
  title: "Inside the atelier",
  quote: "Every bag is cut, stitched and finished by a single artisan.",
  cta: "Read the story",
  href: "/stories/the-workshop",
  photo: {
    src: unsplash("1787005241178-c9006ea9610b", 2400),
    alt: "Artisan tracing a pattern onto leather with a pen",
    position: "45% 50%",
  },
};

export const services: Service[] = [
  {
    slug: "appointments",
    name: "Private appointments",
    description: "Book a fitting in a boutique or by video with one of our stylists.",
    photo: {
      src: unsplash("1782834294716-8e28c18bdba6"),
      alt: "Boutique interior with a staircase and display tables",
    },
  },
  {
    slug: "personalization",
    name: "Personalization",
    description: "Add initials to leather goods, embossed by hand in our workshop.",
    photo: {
      src: unsplash("1628483211662-9bcc692c46dc"),
      alt: "Leather card holder beside stitching tools",
    },
  },
  {
    slug: "care-and-repair",
    name: "Care and repair",
    description: "Cleaning, conditioning and restitching for every piece, for life.",
    photo: {
      src: unsplash("1647502191516-68a4f8c74ed4"),
      alt: "Leatherworking tools laid out around a wallet",
    },
  },
];
