export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "New in", href: "/collections/new-arrivals" },
  { label: "Women", href: "/collections/women" },
  { label: "Men", href: "/collections/men" },
  { label: "Bags", href: "/collections/bags" },
  { label: "Shoes", href: "/collections/shoes" },
  { label: "Ready-to-wear", href: "/collections/ready-to-wear" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Gifts", href: "/collections/gifts" },
];

export const secondaryNav: NavLink[] = [
  { label: "Atelier services", href: "/services" },
  { label: "Stories", href: "/stories" },
  { label: "Store locator", href: "/stores" },
  { label: "Client services", href: "/contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Client services",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns and exchanges", href: "/returns" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "The atelier",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Craftsmanship", href: "/stories/the-workshop" },
      { label: "Store locator", href: "/stores" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of sale", href: "/terms" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];
