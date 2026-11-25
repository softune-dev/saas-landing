/**
 * Pricing facts for the whole site, in English and Bangla. They mirror the
 * dashboard backend (app/plans.py): change a limit or a price there and change
 * it here in the same release. Numbers use English digits in both languages.
 */

export const BILLING_MONTHS = [1, 3, 6, 12] as const;
export type BillingMonths = (typeof BILLING_MONTHS)[number];

export type PaidPlanKey = "starter" | "growth" | "business";
export type PlanKey = "free" | PaidPlanKey;

/** What a merchant pays in total for each period, in taka. Written out, not
 * calculated: a payment has to match one of these exactly. */
export const PERIOD_TOTALS: Record<PaidPlanKey, Record<BillingMonths, number>> = {
  starter: { 1: 499, 3: 1425, 6: 2694, 12: 4788 },
  growth: { 1: 1499, 3: 4275, 6: 8094, 12: 14388 },
  business: { 1: 3999, 3: 11397, 6: 21594, 12: 38388 },
};

/** Price, total and saving for one plan over one period. */
export function periodPrice(plan: PaidPlanKey, months: BillingMonths) {
  const total = PERIOD_TOTALS[plan][months];
  const full = PERIOD_TOTALS[plan][1] * months;
  return {
    total,
    perMonth: Math.round(total / months),
    saving: full - total,
    percent: Math.round((1 - total / full) * 100),
  };
}

type Plan = {
  key: PaidPlanKey;
  name: string;
  popular?: boolean;
  priceMonthly: number;
  /** Per month when a year is paid at once. */
  priceAnnually: number;
  description: string;
  /** A line ending in ":" is a heading, not a feature. */
  features: string[];
};

const base = (key: PaidPlanKey) => ({
  key,
  priceMonthly: periodPrice(key, 1).perMonth,
  priceAnnually: periodPrice(key, 12).perMonth,
});

export const plans: Plan[] = [
  {
    ...base("starter"),
    name: "Starter",
    popular: true,
    description: "For new stores and small businesses that are ready to grow.",
    features: [
      "50 products, unlimited orders",
      "500MB media storage",
      "30 AI credits a day",
      "Custom domain",
      "SEO, Meta Pixel and Conversions API",
      "Customers, Store Sale (POS) and fraud controls",
      "Switch themes any time",
      "No SoftuneBD badge",
      "0% commission on orders",
    ],
  },
  {
    ...base("growth"),
    name: "Growth",
    description: "Everything you need to scale a growing e-commerce brand.",
    features: [
      "Everything in Starter, plus:",
      "500 products",
      "2GB media storage",
      "100 AI credits a day",
      "bKash, Nagad and SSLCommerz gateways",
      "All couriers: Steadfast, Pathao, RedX, eCourier",
      "10 sale events",
      "Priority email support",
    ],
  },
  {
    ...base("business"),
    name: "Business",
    description: "For bigger catalogs and teams running two storefronts.",
    features: [
      "Everything in Growth, plus:",
      "Unlimited products",
      "2 storefronts included",
      "3GB media storage",
      "150 AI credits a day",
      "25 sale events",
      "Account Manager",
    ],
  },
];

export const plansBn: Plan[] = [
  {
    ...base("starter"),
    name: "Starter",
    popular: true,
    description: "নতুন স্টোর ও ছোট ব্যবসার সহজ শুরুর জন্য।",
    features: [
      "50টি প্রোডাক্ট, আনলিমিটেড অর্ডার",
      "500MB মিডিয়া স্টোরেজ",
      "দিনে 30টি AI ক্রেডিট",
      "কাস্টম ডোমেইন",
      "SEO, Meta Pixel ও Conversions API",
      "কাস্টমার, স্টোর সেল (POS) ও ফ্রড কন্ট্রোল",
      "যেকোনো সময় থিম বদলান",
      "SoftuneBD ব্যাজ থাকবে না",
      "অর্ডারে 0% কমিশন",
    ],
  },
  {
    ...base("growth"),
    name: "Growth",
    description: "বাড়তে থাকা ই-কমার্স ব্র্যান্ডকে বড় করার সব কিছু।",
    features: [
      "Starter-এর সব কিছু, সাথে:",
      "500টি প্রোডাক্ট",
      "2GB মিডিয়া স্টোরেজ",
      "দিনে 100টি AI ক্রেডিট",
      "bKash, Nagad ও SSLCommerz গেটওয়ে",
      "সব কুরিয়ার: Steadfast, Pathao, RedX, eCourier",
      "10টি সেল ইভেন্ট",
      "প্রায়োরিটি ইমেইল সাপোর্ট",
    ],
  },
  {
    ...base("business"),
    name: "Business",
    description: "বড় ক্যাটালগ আর দুটি স্টোরফ্রন্ট চালানো টিমের জন্য।",
    features: [
      "Growth-এর সব কিছু, সাথে:",
      "আনলিমিটেড প্রোডাক্ট",
      "2টি স্টোরফ্রন্ট",
      "3GB মিডিয়া স্টোরেজ",
      "দিনে 150টি AI ক্রেডিট",
      "25টি সেল ইভেন্ট",
      "অ্যাকাউন্ট ম্যানেজার",
    ],
  },
];

export function getPlans(locale: "en" | "bn" = "en") {
  return locale === "bn" ? plansBn : plans;
}

/** The Free plan's card. Shown only once the plan is switched on (lib/site.ts). */
export const freePlanCard = {
  en: {
    description: "Open your store and start selling at no cost.",
    features: [
      "10 products",
      "50 orders a month",
      "100MB media storage",
      "Cash on Delivery, manual payments and Softune Pay",
      "Steadfast courier",
      "Chat assistant on your store",
      "AI store setup and 5 images at sign-up",
      "0% commission on orders",
    ],
    note: "Free as long as you're active",
    cta: "Open a free store",
  },
  bn: {
    description: "কোনো খরচ ছাড়াই স্টোর খুলে বিক্রি শুরু করুন।",
    features: [
      "10টি প্রোডাক্ট",
      "মাসে 50টি অর্ডার",
      "100MB মিডিয়া স্টোরেজ",
      "ক্যাশ অন ডেলিভারি, ম্যানুয়াল পেমেন্ট ও Softune Pay",
      "Steadfast কুরিয়ার",
      "স্টোরে চ্যাট অ্যাসিস্ট্যান্ট",
      "সাইন-আপে AI স্টোর সেটআপ ও 5টি ছবি",
      "অর্ডারে 0% কমিশন",
    ],
    note: "সক্রিয় থাকলে ফ্রি",
    cta: "ফ্রি স্টোর খুলুন",
  },
} as const;
