/**
 * The help widget's fixed knowledge: no API, no model. A question is
 * matched against hand-written topics first (pricing, demos, contact, the
 * things people ask most), then against the site FAQ in lib/faq-data.ts,
 * so the answers can never drift from what the rest of the site says.
 */
import { faqData, faqDataBn, type FaqItem } from "@/lib/faq-data";
import { plans, plansBn } from "@/lib/pricing-data";
import { SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/site";

export type Locale = "en" | "bn";

export type Action = { label: string; href: string; external?: boolean };

export type Answer = {
  text: string;
  /** Where the answer came from, shown under the reply. */
  source: string;
  actions?: Action[];
  /** Show the WhatsApp / Messenger / Instagram logo buttons. */
  channels?: boolean;
  /** Questions worth asking next. */
  followUps?: string[];
};

type Topic = {
  id: string;
  /** Lowercase words or phrases; English and Bangla mixed is fine. */
  keys: string[];
  answer: (l: Locale) => Answer;
};

const p = (l: Locale) => (l === "bn" ? "/bn" : "");
const taka = (n: number) => `৳${n.toLocaleString("en-US")}`;

function pricingText(l: Locale): string {
  const list = l === "bn" ? plansBn : plans;
  const lines = list.map((pl) => `• ${pl.name}: ${taka(pl.priceMonthly)}/${l === "bn" ? "মাস" : "month"} (${taka(pl.priceAnnually)}/${l === "bn" ? "মাস, বাৎসরিক; 3 ও 6 মাসেও ছাড় আছে" : "month billed yearly; 3 and 6 month discounts too"})`);
  return l === "bn"
    ? `তিনটি প্ল্যান:\n${lines.join("\n")}\n\nপ্রোডাক্ট: Starter ৫০, Growth ৫০০, Business আনলিমিটেড। সব প্ল্যানে ৭ দিনের ফ্রি ট্রায়াল, কোনো কার্ড লাগবে না, ট্রানজেকশন ফি ০%।`
    : `Three plans:\n${lines.join("\n")}\n\nProducts: Starter 50, Growth 500, Business unlimited. Every plan starts with a 7-day free trial, no card needed, and 0% transaction fee.`;
}

const TOPICS: Topic[] = [
  {
    id: "design",
    keys: ["design", "color", "colors", "colour", "font", "fonts", "logo", "theme", "themes", "customize", "customise", "look", "ডিজাইন", "কালার", "রং", "ফন্ট", "লোগো", "থিম"],
    answer: (l) => ({
      text: l === "bn"
        ? "হ্যাঁ। Theme Editor-এ লোগো, কালার, ফন্ট আর হোমপেজ সেকশন বদলান, ডেস্কটপ ও মোবাইলে লাইভ প্রিভিউ দেখে তারপর পাবলিশ করুন। কোনো কোডিং লাগে না।"
        : "Yes. In the Theme Editor you change the logo, colours, fonts and homepage sections with a live desktop and mobile preview, then publish. No code needed.",
      source: l === "bn" ? "FAQ · থিম" : "FAQ · Themes",
      actions: [{ label: l === "bn" ? "ডেমো স্টোর দেখুন" : "See demo stores", href: `${p(l)}/demo` }],
    }),
  },
  {
    id: "payments",
    keys: ["payment", "payments", "pay", "bkash", "nagad", "rocket", "sslcommerz", "cod", "cash on delivery", "card", "পেমেন্ট", "বিকাশ", "নগদ", "ক্যাশ অন ডেলিভারি"],
    answer: (l) => ({
      text: l === "bn"
        ? "ক্যাশ অন ডেলিভারি, ম্যানুয়াল bKash/Nagad (কাস্টমার আপনার নাম্বারে পাঠিয়ে ট্রানজেকশন আইডি দেয়), আর অফিশিয়াল bKash, Nagad ও SSLCommerz, সব এক Payments স্ক্রিন থেকে চালু করা যায়।"
        : "Cash on Delivery, manual bKash and Nagad (the shopper pays your number and enters the transaction ID), plus official bKash, Nagad and SSLCommerz, all switched on from one Payments screen.",
      source: l === "bn" ? "FAQ · ইন্টিগ্রেশন" : "FAQ · Integrations",
      followUps: l === "bn" ? ["কোন কুরিয়ার কানেক্ট করা যায়?", "দাম কত?"] : ["Which couriers work?", "How much does it cost?"],
    }),
  },
  {
    id: "pos",
    keys: ["pos", "physical", "walk-in", "walk in", "counter", "offline", "receipt", "retail", "দোকান", "কাউন্টার", "রসিদ", "অফলাইন"],
    answer: (l) => ({
      text: l === "bn"
        ? "হ্যাঁ। Store Sale (POS) দিয়ে দোকানের কাউন্টারে একই প্রোডাক্ট ক্যাটালগ থেকে বিক্রি করুন: প্রোডাক্ট খুঁজুন, ক্যাটাগরি ফিল্টার করুন, সেল শেষ করে রসিদ প্রিন্ট করুন।"
        : "Yes. Store Sale (POS) lets you sell at the counter from the same catalog as your website: search products, filter by category, complete the sale and print a receipt.",
      source: l === "bn" ? "ফিচার" : "Features",
      actions: [{ label: l === "bn" ? "সব ফিচার" : "See all features", href: `${p(l)}/features` }],
    }),
  },
  {
    id: "pricing",
    keys: ["products limit", "how many products", "কতগুলো প্রোডাক্ট", "কত প্রোডাক্ট", "প্রোডাক্ট লিমিট", "product limit", "limit", "price", "pricing", "cost", "plan", "plans", "package", "monthly", "yearly", "how much", "taka", "tk", "দাম", "প্রাইস", "প্যাকেজ", "খরচ", "কত টাকা", "প্ল্যান"],
    answer: (l) => ({
      text: pricingText(l),
      source: l === "bn" ? "প্রাইসিং পেজ" : "Pricing page",
      actions: [{ label: l === "bn" ? "সব প্ল্যান দেখুন" : "Compare plans", href: `${p(l)}/pricing` }],
      followUps: l === "bn" ? ["ফ্রি ট্রায়াল আছে?", "কোন পেমেন্ট নেওয়া যায়?"] : ["Is there a free trial?", "Which payments can I take?"],
    }),
  },
  {
    id: "demo",
    keys: ["demo", "example", "sample", "live store", "see a store", "preview", "ডেমো", "নমুনা", "উদাহরণ"],
    answer: (l) => ({
      text: l === "bn"
        ? "SoftuneBD দিয়ে বানানো ১০টি আসল স্টোর খুলে দেখতে পারেন: ফ্যাশন, ইলেকট্রনিক্স, গহনা, গ্রোসারি, জুতা এবং আরও।"
        : "There are 10 real stores built on SoftuneBD you can open and shop around: fashion, electronics, jewellery, groceries, footwear and more.",
      source: l === "bn" ? "ডেমো পেজ" : "Demo page",
      actions: [{ label: l === "bn" ? "ডেমো স্টোর দেখুন" : "Open the demos", href: `${p(l)}/demo` }],
      followUps: l === "bn" ? ["দাম কত?", "স্টোর চালু করতে কত সময় লাগে?"] : ["How much does it cost?", "How long does it take to launch?"],
    }),
  },
  {
    id: "trial",
    keys: ["trial", "free", "start", "sign up", "signup", "register", "try", "ট্রায়াল", "ফ্রি", "শুরু", "সাইন আপ", "রেজিস্টার"],
    answer: (l) => ({
      text: l === "bn"
        ? "হ্যাঁ, ৭ দিনের ফ্রি ট্রায়াল, পুরো ড্যাশবোর্ড ব্যবহার করতে পারবেন। কোনো ক্রেডিট কার্ড লাগবে না, শুধু ইমেইল দিয়ে সাইন আপ।"
        : "Yes: a 7-day free trial with the full dashboard. No credit card, just sign up with your email.",
      source: l === "bn" ? "FAQ · বিলিং" : "FAQ · Billing",
      actions: [{ label: l === "bn" ? "ফ্রি ট্রায়াল শুরু করুন" : "Start free trial", href: `${p(l)}/signup` }],
      followUps: l === "bn" ? ["দাম কত?", "কোডিং জানা লাগবে?"] : ["How much does it cost?", "Do I need coding skills?"],
    }),
  },
  {
    id: "contact",
    keys: ["contact", "call", "phone", "number", "email", "human", "person", "agent", "talk", "support", "help", "যোগাযোগ", "ফোন", "নাম্বার", "কল", "সাপোর্ট", "মানুষ"],
    answer: (l) => ({
      text: l === "bn"
        ? `আমাদের টিমের সাথে সরাসরি কথা বলুন: WhatsApp ${SUPPORT_PHONE}, ইমেইল ${SUPPORT_EMAIL}। নিচের যেকোনো একটিতে ক্লিক করুন।`
        : `Talk to the team directly: WhatsApp ${SUPPORT_PHONE} or email ${SUPPORT_EMAIL}. Or tap any of these:`,
      source: l === "bn" ? "যোগাযোগ" : "Contact page",
      channels: true,
    }),
  },
  {
    id: "domain",
    keys: ["domain", "url", "own domain", "custom domain", ".com", "subdomain", "ডোমেইন", "ডোমেন"],
    answer: (l) => ({
      text: l === "bn"
        ? "প্রতিটি স্টোর একটি ফ্রি softunebd.com সাবডোমেইন পায়, আর চাইলে নিজের ডোমেইন কানেক্ট করতে পারেন ড্যাশবোর্ড থেকে।"
        : "Every store gets a free softunebd.com subdomain, and you can connect your own domain from the dashboard.",
      source: l === "bn" ? "ডকুমেন্টেশন" : "Documentation",
      actions: [{ label: l === "bn" ? "ডকুমেন্টেশন" : "Read the docs", href: `${p(l)}/support/documentation` }],
    }),
  },
];

const STOP = new Set(
  "a an the is are am do does did i me my use using used need get got make want like sell selling shop store online accept take support work works we you your it its to of in on for with and or can will be how what which who why when where there this that from at by as have has please any about softune softunebd কি কী কিভাবে কীভাবে আমি আমার আছে হবে করতে করে এর ও এবং একটি যায় না".split(" "),
);

function words(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s.]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w));
}

/** Overlap score of the question's words against a FAQ entry: words in the
 * question count double, prefix matches (pay ~ payment) count too. */
function faqScore(q: string[], item: FaqItem): number {
  const qWords = words(item.q);
  const aWords = words(item.a);
  let score = 0;
  for (const w of q) {
    const hit = (list: string[]) => list.some((x) => x === w || (w.length > 3 && (x.startsWith(w) || w.startsWith(x)) && x.length > 3));
    if (hit(qWords)) score += 2;
    else if (hit(aWords)) score += 0.6;
  }
  return score;
}

export function answer(question: string, l: Locale): Answer | null {
  const text = question.toLowerCase();
  const q = words(question);

  // 1. Hand-written topics: phrase match on the raw text.
  let best: { topic: Topic; hits: number } | null = null;
  for (const t of TOPICS) {
    const hits = t.keys.filter((k) => (k.includes(" ") ? text.includes(k) : q.includes(k) || text.includes(k))).length;
    if (hits && (!best || hits > best.hits)) best = { topic: t, hits };
  }

  // 2. The site FAQ, by word overlap.
  const faq = l === "bn" ? faqDataBn : faqData;
  let top: { item: FaqItem; score: number } | null = null;
  for (const item of faq) {
    const score = faqScore(q, item);
    if (!top || score > top.score) top = { item, score };
  }

  // A FAQ entry that clearly matches beats a single loose topic keyword
  // ("free" alone shouldn't hijack "is customer data free to export?").
  if (best && (best.hits >= 2 || !top || top.score < 4)) return best.topic.answer(l);
  if (top && top.score >= 2) {
    return {
      text: top.item.a,
      source: `FAQ · ${top.item.category}`,
      followUps: related(top.item, faq),
    };
  }
  return best ? best.topic.answer(l) : null;
}

function related(item: FaqItem, faq: FaqItem[]): string[] {
  return faq.filter((f) => f.category === item.category && f.q !== item.q).slice(0, 2).map((f) => f.q);
}

export const STARTERS: Record<Locale, string[]> = {
  en: ["How much does it cost?", "Is there a free trial?", "Which payments can I take?", "Can I see a demo store?"],
  bn: ["দাম কত?", "ফ্রি ট্রায়াল আছে?", "কোন পেমেন্ট নেওয়া যায়?", "ডেমো স্টোর দেখা যাবে?"],
};
