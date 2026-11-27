import type { TemplateKey } from "../trial-theme-step";

export type Locale = "en" | "bn";
export type ShopStage = "shop" | "category" | "contact" | "social" | "district" | "design";
export type StepId = "account" | "password" | "verify" | ShopStage | "build";

export function t(locale: Locale, en: string, bn: string) {
  return locale === "bn" ? bn : en;
}

/** What the sign-up form collects about the shop. Every field starts empty:
 * nothing is guessed or carried over from the landing page. */
export type Business = {
  shopName: string;
  category: string;
  phone: string;
  whatsapp: string;
  whatsappSame: boolean;
  facebook: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  district: string;
  /** A demo store id (DEMO_LOOKS); empty until the merchant picks one. */
  demo: string;
};

export const EMPTY_BUSINESS: Business = {
  shopName: "",
  category: "",
  phone: "",
  whatsapp: "",
  whatsappSame: true,
  facebook: "",
  instagram: "",
  tiktok: "",
  youtube: "",
  district: "",
  demo: "",
};

type DemoLook = { template: TemplateKey; color: string; font: string; bodyFont: string };

const look = (template: TemplateKey, color: string, font: string, bodyFont: string): DemoLook => ({ template, color, font, bodyFont });

/** What picking a demo store gives the new store: that demo's theme, main
 * colour and fonts. Keep in step with scripts/demo_stores/catalog_bn.py
 * (LOOK) in the backend repo, which is what the live demos are built from. */
export const DEMO_LOOKS: Record<string, DemoLook> = {
  noor: look("aurora", "#2B2420", "Cormorant Garamond", "Jost"),
  swarna: look("aurora", "#7A5A1E", "Cinzel", "Lato"),
  oudh: look("aurora", "#1C1714", "Bodoni Moda", "Montserrat"),
  voltix: look("bazaar", "#2563EB", "Plus Jakarta Sans", "Inter"),
  freshkart: look("bazaar", "#15803D", "Outfit", "Nunito Sans"),
  tinytots: look("bazaar", "#EA580C", "Fredoka", "Nunito"),
  ghorkona: look("bazaar", "#9A3412", "Fraunces", "DM Sans"),
  pawpal: look("fashion-classic", "#0F766E", "Baloo 2", "Mulish"),
  raaj: look("fashion-classic", "#7F1D1D", "Playfair Display", "Source Sans 3"),
  stride: look("fashion-classic", "#111827", "Anton", "Barlow"),
};

/** Demo stores shown first, with a "Suggested" tag, for each category. */
export const SUGGESTED_DEMOS: Record<string, string[]> = {
  fashion: ["raaj", "noor"],
  jewelry: ["swarna"],
  beauty: ["oudh"],
  electronics: ["voltix"],
  automotive: ["voltix"],
  toys: ["tinytots"],
  pets: ["pawpal"],
  home: ["ghorkona"],
  food: ["freshkart"],
  health: ["freshkart"],
  sports: ["stride"],
};

/** The picture cards: short names, one image each in /public/signup/categories.
 * `value` is what the store saves (same values as the dashboard's list). */
export const CATEGORIES: { value: string; label: Record<Locale, string> }[] = [
  { value: "fashion", label: { en: "Fashion", bn: "ফ্যাশন" } },
  { value: "beauty", label: { en: "Beauty", bn: "বিউটি" } },
  { value: "electronics", label: { en: "Gadgets", bn: "গ্যাজেট" } },
  { value: "food", label: { en: "Food", bn: "খাবার" } },
  { value: "home", label: { en: "Home", bn: "হোম" } },
  { value: "jewelry", label: { en: "Jewelry", bn: "জুয়েলারি" } },
  { value: "toys", label: { en: "Toys & Kids", bn: "খেলনা" } },
  { value: "health", label: { en: "Health", bn: "স্বাস্থ্য" } },
  { value: "sports", label: { en: "Sports", bn: "স্পোর্টস" } },
  { value: "books", label: { en: "Books", bn: "বই" } },
  { value: "pets", label: { en: "Pets", bn: "পোষা প্রাণী" } },
  { value: "automotive", label: { en: "Auto", bn: "অটো" } },
  { value: "services", label: { en: "Services", bn: "সার্ভিস" } },
  { value: "other", label: { en: "Other", bn: "অন্যান্য" } },
];

/** How full the progress bar is on each screen. */
export const PROGRESS: Record<StepId, number> = {
  account: 8, password: 18, verify: 28, shop: 40, category: 52, contact: 64, social: 74, district: 84, design: 92, build: 100,
};

/** The desktop photo for each screen (/public/signup, 4:5). */
export const SIDE_IMAGE: Record<StepId, string> = {
  account: "/signup/account.webp",
  password: "/signup/account.webp",
  verify: "/signup/verify.webp",
  shop: "/signup/business.webp",
  category: "/signup/business.webp",
  contact: "/signup/business.webp",
  social: "/signup/business.webp",
  district: "/signup/business.webp",
  design: "/signup/business.webp",
  build: "/signup/building.webp",
};

/** A preview of the web address, matching how the backend builds it. It adds
 * a number if the name is taken, and uses "shop" for non-Latin names. */
export function slugPreview(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
