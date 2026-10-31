/** Everything the demo store shows, in both languages, plus its photos. The
 * images are cropped from SoftuneBD's own theme screenshots (public/hero). */

export type Locale = "en" | "bn";
type Pair = { en: string; bn: string };

export const PALETTES = {
  base: { bg: "#fbf6f1", soft: "#f3e4da", ink: "#2a1c17", muted: "#8a7067", accent: "#b4533f", accent2: "#e9bba6" },
  warm: { bg: "#fdf6ea", soft: "#f6e3c2", ink: "#2b1d0e", muted: "#8a6f4e", accent: "#b8641a", accent2: "#f0c27b" },
};
export type Palette = (typeof PALETTES)["base"];

export const IMAGES = {
  /** The store's own hero picture, and the AI-made banner that replaces it. */
  hero: "/hero/why3.webp",
  heroAi: "/hero/hero2.webp",
};

/** Whole images from the dashboard's AI image presets (copied to public/hero).
 * `crop` hides the label some of them carry by zooming into the top of the frame. */
export const CATEGORIES: { img: string; name: Pair }[] = [
  { img: "/hero/cat-texture.webp", name: { en: "Sarees", bn: "শাড়ি" } },
  { img: "/hero/cat-spotlight.webp", name: { en: "Bags", bn: "ব্যাগ" } },
  { img: "/hero/cat-wash.webp", name: { en: "Jewelry", bn: "জুয়েলারি" } },
  { img: "/hero/cat-cluster.webp", name: { en: "Skincare", bn: "স্কিনকেয়ার" } },
  { img: "/hero/cat-frame.webp", name: { en: "Watches", bn: "ঘড়ি" } },
];

export const PRODUCTS: { img: string; name: Pair; price: Pair; tone: [string, string]; crop?: boolean }[] = [
  { img: "/hero/about4.webp", name: { en: "Embroidered Saree", bn: "এমব্রয়ডারি শাড়ি" }, price: { en: "৳4,800", bn: "৳৪,৮০০" }, tone: ["#efd5c7", "#d99b83"] },
  { img: "/hero/why4.webp", name: { en: "Floral Handbag", bn: "ফ্লোরাল হ্যান্ডব্যাগ" }, price: { en: "৳3,200", bn: "৳৩,২০০" }, tone: ["#f3dfc2", "#c9935a"] },
  { img: "/hero/cat-shadow.webp", name: { en: "Sunglasses", bn: "সানগ্লাস" }, price: { en: "৳1,450", bn: "৳১,৪৫০" }, tone: ["#e5d9cf", "#a98b7c"], crop: true },
  { img: "/hero/cat-glow.webp", name: { en: "Rose Perfume", bn: "রোজ পারফিউম" }, price: { en: "৳2,250", bn: "৳২,২৫০" }, tone: ["#f0d0c4", "#b4533f"], crop: true },
];

export const COPY = {
  nav: [
    { en: "New in", bn: "নতুন" },
    { en: "Sarees", bn: "শাড়ি" },
    { en: "Bags", bn: "ব্যাগ" },
    { en: "Sale", bn: "সেল" },
  ] as Pair[],
  season: { en: "New season", bn: "নতুন কালেকশন" },
  seasonEid: { en: "Eid collection 2026", bn: "ঈদ কালেকশন ২০২৬" },
  headline: { en: "Grace in every thread", bn: "প্রতিটি সুতোয় লাবণ্য" },
  headlineEid: { en: "Celebrate Eid in style", bn: "ঈদ উদযাপন হোক স্টাইলে" },
  sub: { en: "Handpicked sarees, bags and jewelry for everyday elegance.", bn: "প্রতিদিনের সৌন্দর্যের জন্য বাছাই করা শাড়ি, ব্যাগ ও গয়না।" },
  shop: { en: "Shop now", bn: "এখনই কিনুন" },
  shopEid: { en: "Shop Eid", bn: "ঈদ শপ" },
  lookbook: { en: "Lookbook", bn: "লুকবুক" },
  tagNew: { en: "New", bn: "নতুন" },
  tagEid: { en: "Eid pick", bn: "ঈদ পিক" },
  aiTag: { en: "Made with AI", bn: "AI দিয়ে তৈরি" },
  starter: {
    brand: { en: "Your Store", bn: "আপনার স্টোর" },
    links: [
      { en: "Home", bn: "হোম" },
      { en: "Shop", bn: "শপ" },
      { en: "About", bn: "আমাদের কথা" },
    ] as Pair[],
    headline: { en: "Welcome to our store", bn: "আমাদের স্টোরে স্বাগতম" },
    sub: { en: "Add a short description of your shop here.", bn: "এখানে আপনার শপের ছোট বর্ণনা লিখুন।" },
    button: { en: "Button", bn: "বাটন" },
    category: { en: "Category", bn: "ক্যাটাগরি" },
    product: { en: "Product name", bn: "প্রোডাক্টের নাম" },
  },
};

/** Where on the canvas each target sits, in container-width units (cqw), and
 * where the AI cursor rests for it. Desktop canvas is 100 x 75, mobile 100 x 125. */
export type Rect = { l: number; t: number; w: number; h: number };
export const DESKTOP = {
  nav: { l: 0, t: 0, w: 100, h: 6.5 },
  hero: { l: 2.5, t: 8, w: 47, h: 24 },
  heroArt: { l: 51.5, t: 8, w: 46, h: 24 },
  categories: { l: 2.5, t: 34.5, w: 95, h: 11 },
  products: { l: 2.5, t: 47.5, w: 95, h: 24.5 },
};
export const DESKTOP_CURSOR: Record<string, [number, number]> = {
  nav: [30, 3],
  hero: [28, 22],
  heroArt: [76, 22],
  categories: [40, 41],
  products: [58, 62],
  orders: [20, 28],
  total: [20, 62],
};
export const MOBILE = {
  nav: { l: 0, t: 0, w: 100, h: 9 },
  hero: { l: 3, t: 10.5, w: 94, h: 44 },
  categories: { l: 0, t: 57, w: 100, h: 20 },
  products: { l: 3, t: 79, w: 94, h: 44 },
};
export const MOBILE_CURSOR: Record<string, [number, number]> = {
  nav: [28, 4],
  hero: [55, 38],
  heroArt: [55, 38],
  categories: [60, 68],
  products: [60, 100],
  orders: [60, 60],
  total: [60, 60],
};
