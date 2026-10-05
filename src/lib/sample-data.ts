// Sample storefront content, used until the catalog lives in the database.
// Photography from Unsplash (https://unsplash.com/license).

export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position, for photos whose subject is off-center. */
  position?: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  /** Slug of an entry in `categories`. */
  category: string;
  /** Units available; 0 is sold out. */
  stock: number;
  badge?: string;
  description: string;
  details: string[];
  /** Listings show the first photo; the product page shows them all. */
  photos: Photo[];
};

export type Category = { slug: string; name: string; photo: Photo };

export type Collection = { slug: string; name: string; cta: string; photo: Photo };

export type Service = { slug: string; name: string; description: string; photo: Photo };

// Must match images.remotePatterns[].search in next.config.ts. Full-bleed
// photos use 2400px sources; everything else 1600px, which keeps Next's image
// optimizer well inside its 7s timeout for fetching the original.
const unsplash = (id: string, width: 1600 | 2400 = 1600) =>
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

export const categories: Category[] = [
  {
    slug: "bags",
    name: "Bags",
    photo: {
      src: unsplash("1746880223690-359948154c53"),
      alt: "Brown leather handbag with a black handle in low light",
    },
  },
  {
    slug: "shoes",
    name: "Shoes",
    photo: {
      src: unsplash("1605325360282-9b0ac4ca7b76"),
      alt: "Black leather lace-up shoes under a camel skirt, among autumn leaves",
      position: "50% 75%",
    },
  },
  {
    slug: "ready-to-wear",
    name: "Ready-to-wear",
    photo: {
      src: unsplash("1769107805465-bfd41863f1a0"),
      alt: "Rail of neutral-toned clothing in a bright boutique",
    },
  },
  {
    slug: "accessories",
    name: "Accessories",
    photo: {
      src: unsplash("1508296695146-257a814070b4"),
      alt: "Cat-eye sunglasses with pale frames",
    },
  },
];

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

// Every sample product appears in the homepage's new arrivals.
export const products: Product[] = [
  {
    slug: "arden-leather-tote",
    name: "Arden leather tote",
    price: 1850,
    category: "bags",
    stock: 12,
    badge: "New",
    description:
      "A roomy everyday tote in vegetable-tanned leather that softens and deepens in color with use. Unlined, with one zipped pocket inside.",
    details: [
      "Vegetable-tanned calf leather",
      "Hand-stitched handles, 24 cm drop",
      "Interior zip pocket",
      "W 40 × H 32 × D 14 cm",
    ],
    photos: [
      {
        src: unsplash("1624687943971-e86af76d57de"),
        alt: "Tan leather tote bag hanging on a door",
      },
    ],
  },
  {
    slug: "sienna-top-handle-bag",
    name: "Sienna top-handle bag",
    price: 2400,
    category: "bags",
    stock: 2,
    description:
      "A structured top-handle bag built on a hand-shaped frame, with a detachable strap for wearing across the body.",
    details: [
      "Smooth calf leather, suede lining",
      "Detachable, adjustable shoulder strap",
      "Magnetic closure",
      "W 28 × H 21 × D 12 cm",
    ],
    photos: [
      {
        src: unsplash("1691480150204-66dd1eb77391"),
        alt: "Structured brown leather top-handle bag",
      },
    ],
  },
  {
    slug: "holt-messenger-bag",
    name: "Holt messenger bag",
    price: 1690,
    category: "bags",
    stock: 7,
    description:
      "A soft messenger in waxed leather, sized for a laptop and a day's essentials. The flap closes with a hidden magnet.",
    details: [
      "Waxed calf leather, cotton lining",
      "Fits a 14-inch laptop",
      "Adjustable shoulder strap",
      "W 38 × H 28 × D 9 cm",
    ],
    photos: [
      {
        src: unsplash("1603219527847-24c87f552a77"),
        alt: "Dark brown leather messenger bag on a wooden stool",
      },
    ],
  },
  {
    slug: "ravel-penny-loafer",
    name: "Ravel penny loafer",
    price: 790,
    category: "shoes",
    stock: 9,
    badge: "New",
    description:
      "A classic penny loafer, hand-sewn on a slim last from burnished calf leather, on a leather sole that can be resoled.",
    details: [
      "Burnished calf leather",
      "Hand-sewn moccasin construction",
      "Leather sole, stacked heel",
      "Fits true to size",
    ],
    photos: [
      {
        src: unsplash("1777987601447-266e128de448"),
        alt: "Pair of brown leather penny loafers on a stool",
      },
    ],
  },
  {
    slug: "corso-chelsea-boot",
    name: "Corso Chelsea boot",
    price: 950,
    category: "shoes",
    stock: 0,
    description:
      "A sleek Chelsea boot with elastic side panels and a pull tab, Goodyear-welted so it can be resoled for years.",
    details: [
      "Calf leather, leather lining",
      "Goodyear-welted leather sole",
      "Elastic side panels",
      "Fits true to size",
    ],
    photos: [
      {
        src: unsplash("1777987601423-f350ac29b3e9"),
        alt: "Pair of brown leather Chelsea boots on a wooden board",
      },
    ],
  },
  {
    slug: "brera-brogue-boot",
    name: "Brera brogue boot",
    price: 1050,
    category: "shoes",
    stock: 5,
    description:
      "A lace-up boot with hand-punched brogue detailing and a rubber-studded leather sole for wet days.",
    details: [
      "Grained calf leather",
      "Hand-punched brogue detailing",
      "Leather sole with rubber inserts",
      "Fits large; consider half a size down",
    ],
    photos: [
      {
        src: unsplash("1638609348722-aa2a3a67db26"),
        alt: "Pair of tan leather brogue boots",
      },
    ],
  },
  {
    slug: "linea-sunglasses",
    name: "Linea sunglasses",
    price: 420,
    category: "accessories",
    stock: 20,
    description:
      "Browline sunglasses with a hand-polished acetate brow and a fine metal rim, fitted with category 3 lenses.",
    details: [
      "Acetate and metal frame",
      "Category 3 lenses, 100% UV protection",
      "Leather case included",
    ],
    photos: [
      {
        src: unsplash("1584036553516-bf83210aa16c"),
        alt: "Black browline sunglasses on a white surface",
      },
    ],
  },
  {
    slug: "hollis-tweed-coat",
    name: "Hollis tweed coat",
    price: 2750,
    category: "ready-to-wear",
    stock: 3,
    description:
      "A single-breasted coat in a heavy wool tweed, cut long and straight with a half-canvassed front that keeps its shape.",
    details: [
      "100% wool tweed, viscose lining",
      "Half-canvassed construction",
      "Horn buttons",
      "Relaxed fit; take your usual size",
    ],
    photos: [
      {
        src: unsplash("1722858958066-97deb3471c89"),
        alt: "Grey tweed coat hanging in a white wardrobe",
      },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

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
