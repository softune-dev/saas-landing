export interface ThemeData {
  slug: string;
  name: string;
  /** Short category descriptor — used in image alt text and (for the
   * first 3) the homepage teaser section. */
  vibe: string;
  color: string;
  surface: string;
  /** Card thumbnail, under public/themes/. */
  image: string;
}

/** Niche storefront previews — pure marketing images for now, not live
 * demo sites (no demoUrl). Real per-niche seed data (products, categories,
 * hero images) lands later once the signup theme picker is built; until
 * then these are just the gallery shown on /themes. The first 3 are also
 * what the homepage teaser section shows. */
export const THEMES: ThemeData[] = [
  {
    slug: "fashion",
    name: "Fashion",
    vibe: "Apparel & footwear",
    color: "#1c1917",
    surface: "#faf9f6",
    image: "/themes/fashion-store.webp",
  },
  {
    slug: "ladies",
    name: "Ladies",
    vibe: "Women's fashion",
    color: "#be185d",
    surface: "#fdf2f8",
    image: "/themes/women-fashion.webp",
  },
  {
    slug: "urban",
    name: "Urban",
    vibe: "Streetwear & youth fashion",
    color: "#7c3aed",
    surface: "#f5f3ff",
    image: "/themes/genz-fashion.webp",
  },
  {
    slug: "gadget",
    name: "Gadget",
    vibe: "Electronics & gadgets",
    color: "#2563eb",
    surface: "#eff6ff",
    image: "/themes/electronics-store.webp",
  },
  {
    slug: "outlet",
    name: "Outlet",
    vibe: "Multi-category marketplace",
    color: "#ea580c",
    surface: "#fff7ed",
    image: "/themes/multi-category.webp",
  },
  {
    slug: "market",
    name: "Market",
    vibe: "Grocery & fresh goods",
    color: "#16a34a",
    surface: "#f0fdf4",
    image: "/themes/grocery-store.webp",
  },
  {
    slug: "kennel",
    name: "Kennel",
    vibe: "Pet supplies",
    color: "#b45309",
    surface: "#fffbeb",
    image: "/themes/pet-store.webp",
  },
  {
    slug: "derma",
    name: "Derma",
    vibe: "Skincare",
    color: "#0d9488",
    surface: "#f0fdfa",
    image: "/themes/skincare-shop.webp",
  },
  {
    slug: "beauty",
    name: "Beauty",
    vibe: "Makeup & cosmetics",
    color: "#db2777",
    surface: "#fdf2f8",
    image: "/themes/makeup-store.webp",
  },
  {
    slug: "paper",
    name: "Paper",
    vibe: "Stationery & office supplies",
    color: "#4338ca",
    surface: "#eef2ff",
    image: "/themes/stationery-shop.webp",
  },
  {
    slug: "kiddo",
    name: "Kiddo",
    vibe: "Kids' store",
    color: "#f59e0b",
    surface: "#fffbeb",
    image: "/themes/kids-choice.webp",
  },
];
