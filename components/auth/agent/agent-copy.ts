import { SHOP_CATEGORIES } from "../trial-steps";
import { TEMPLATES, type TemplateKey } from "../trial-theme-step";

export type Locale = "en" | "bn";

/** The conversation, in order. The first five are answered locally and only
 * reach the backend at "build" (PATCH /trial/details then /trial/complete),
 * which is why they stay editable right up until the build starts: the
 * backend refuses /trial/details before the email is verified, so asking
 * about the shop first means sending it last. */
export const STEPS = [
  "idea",
  "name",
  "category",
  "look",
  "phone",
  "account",
  "verify",
  "build",
] as const;
export type StepId = (typeof STEPS)[number];
export const LOCAL_STEPS: StepId[] = ["idea", "name", "category", "look", "phone"];

export function t(locale: Locale, en: string, bn: string) {
  return locale === "bn" ? bn : en;
}

/** Starter ideas for the empty state: real Bangladeshi online-shop niches,
 * each with a name (so the agent visibly picks it up) and the storefront
 * screenshot that niche would get. `prompt` is what gets "sent". */
export const IDEA_EXAMPLES: {
  image: string;
  title: Record<Locale, string>;
  sub: Record<Locale, string>;
  prompt: Record<Locale, string>;
}[] = [
  {
    image: "/themes/women-fashion.webp",
    title: { en: "Saree & three-piece boutique", bn: "শাড়ি ও থ্রি-পিস বুটিক" },
    sub: { en: "Rongdhonu", bn: "Rongdhonu" },
    prompt: {
      en: "A boutique called Rongdhonu for sarees, three-piece and kurtis",
      bn: "Rongdhonu নামে শাড়ি, থ্রি-পিস ও কুর্তির বুটিক",
    },
  },
  {
    image: "/themes/skincare-shop.webp",
    title: { en: "Korean skincare shop", bn: "কোরিয়ান স্কিনকেয়ার শপ" },
    sub: { en: "Glow Lab", bn: "Glow Lab" },
    prompt: {
      en: "A Korean skincare shop called Glow Lab for serums and sunscreen",
      bn: "GlowLab নামে কোরিয়ান স্কিনকেয়ার, সিরাম ও সানস্ক্রিনের শপ",
    },
  },
  {
    image: "/themes/electronics-store.webp",
    title: { en: "Gadgets & accessories", bn: "গ্যাজেট ও এক্সেসরিজ" },
    sub: { en: "TechNest", bn: "TechNest" },
    prompt: {
      en: "A gadget shop called TechNest selling earbuds, chargers and smartwatches",
      bn: "TechNest নামে ইয়ারবাড, চার্জার ও স্মার্টওয়াচের গ্যাজেট শপ",
    },
  },
  {
    image: "/themes/grocery-store.webp",
    title: { en: "Organic food & grocery", bn: "অর্গানিক খাবার ও মুদি" },
    sub: { en: "Khaati Bazar", bn: "KhaatiBazar" },
    prompt: {
      en: "An organic food shop called Khaati Bazar for honey, ghee and dates",
      bn: "KhaatiBazar নামে মধু, ঘি ও খেজুরের অর্গানিক খাবারের শপ",
    },
  },
  {
    image: "/themes/kids-choice.webp",
    title: { en: "Kids & baby store", bn: "শিশু ও বেবি স্টোর" },
    sub: { en: "Little Bloom", bn: "LittleBloom" },
    prompt: {
      en: "A kids store called Little Bloom for toys, baby care and kids' clothes",
      bn: "LittleBloom নামে খেলনা, বেবি কেয়ার ও বাচ্চাদের পোশাকের স্টোর",
    },
  },
  {
    image: "/themes/makeup-store.webp",
    title: { en: "Makeup & beauty", bn: "মেকআপ ও বিউটি" },
    sub: { en: "Blush & Co", bn: "BlushCo" },
    prompt: {
      en: "A makeup store called Blush & Co for lipsticks, foundation and kits",
      bn: "BlushCo নামে লিপস্টিক, ফাউন্ডেশন ও মেকআপ কিটের স্টোর",
    },
  },
];

// Keyword guesses, not AI: cheap, instant, and wrong in a harmless way —
// the guess only pre-selects a chip the merchant still confirms.
const CATEGORY_WORDS: [string, RegExp][] = [
  ["beauty", /beauty|skin ?care|make ?up|cosmetic|lipstick|serum|বিউটি|স্কিন|মেকআপ|কসমেটিক/i],
  // \b on the short words: "ring" would otherwise match "string", "car" "scarf".
  ["jewelry", /jewel|ornament|\brings?\b|necklace|earring|\bwatch|গহনা|জুয়েলারি|গয়না/i],
  ["fashion", /fashion|cloth|dress|saree|\bsari|panjabi|kurti|hijab|abaya|shirt|apparel|\bwear|shoe|\bbags?\b|পোশাক|শাড়ি|ফ্যাশন|জামা|পাঞ্জাবি|কুর্তি|জুতা/i],
  ["electronics", /gadget|electronic|phone|mobile|laptop|headphone|charger|camera|গ্যাজেট|ইলেকট্রনিক|মোবাইল/i],
  ["food", /food|grocer|snack|cake|bakery|honey|\btea\b|coffee|\brice\b|spice|pickle|খাবার|মুদি|কেক|স্ন্যাকস|মধু|আচার/i],
  ["home", /\bhome|furniture|decor|kitchen|bedsheet|curtain|হোম|ফার্নিচার|ডেকর|কিচেন/i],
  ["sports", /sport|fitness|\bgym\b|cricket|football|jersey|স্পোর্টস|জিম|জার্সি/i],
  ["books", /\bbooks?\b|stationer|\bpens?\b|notebook|বই|স্টেশনারি/i],
  ["toys", /\btoys?\b|\bkids?\b|\bbaby|children|খেলনা|শিশু|বাচ্চা/i],
  ["automotive", /\bcars?\b|\bbikes?\b|motor|\bauto\b|helmet|গাড়ি|বাইক/i],
  ["health", /health|herbal|medicine|wellness|supplement|স্বাস্থ্য|হারবাল/i],
  ["pets", /\bpets?\b|\bcats?\b|\bdogs?\b|\bbirds?\b|পোষা|বিড়াল|কুকুর/i],
  ["services", /service|repair|salon|course|class|সার্ভিস|কোর্স/i],
];

export function inferCategory(text: string): string | null {
  for (const [value, re] of CATEGORY_WORDS) if (re.test(text)) return value;
  return null;
}

export function inferName(text: string): string | null {
  const en = text.match(/\b(?:called|named|name is|brand)\s+["“']?([\p{L}\p{N}][\p{L}\p{N}&'’ -]{0,30})/iu);
  const bn = text.match(/["“']?([\p{L}\p{N}&'’-]+)["”']?\s*নামে/u);
  const raw = (en?.[1] ?? bn?.[1] ?? "").trim();
  if (!raw) return null;
  // "called Veila that sells sarees" -> "Veila": stop at the first lowercase
  // connector word so a trailing description doesn't become the name.
  const words = raw.split(/\s+/);
  const kept: string[] = [];
  for (const w of words) {
    if (kept.length && /^(that|which|and|for|with|selling|in|to|where)$/i.test(w)) break;
    kept.push(w);
  }
  return kept.join(" ").replace(/[.,!?]+$/, "") || null;
}

export function recommendTemplate(category: string): TemplateKey {
  if (category === "fashion") return "aurora";
  if (category === "beauty" || category === "jewelry") return "fashion-classic";
  return "bazaar";
}

export function templateFor(key: TemplateKey) {
  return TEMPLATES.find((tpl) => tpl.key === key) ?? TEMPLATES[0];
}

export function categoryLabel(value: string, locale: Locale) {
  const c = SHOP_CATEGORIES.find((x) => x.value === value);
  if (!c) return value;
  return locale === "bn" ? c.labelBn : c.label;
}

/** Preview only — the real subdomain is decided server-side. */
export function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function hasNonEnglish(name: string) {
  return /[^\x00-\x7F]/.test(name);
}
