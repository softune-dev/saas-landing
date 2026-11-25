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

/** One line on a card: the number or value in bold, then what it is. */
export type Spec = [value: string, label: string];

type Plan = {
  key: PaidPlanKey;
  name: string;
  popular?: boolean;
  priceMonthly: number;
  /** Per month when a year is paid at once. */
  priceAnnually: number;
  /** Who the plan is for, in one short line. */
  description: string;
  /** Every plan lists the same things in the same order, so the cards
   * line up and can be compared across. Keep each line short enough for one
   * row. What all paid plans share goes in PAID_INCLUDES instead. */
  specs: Spec[];
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
    description: "For your own branded store",
    specs: [
      ["50", "products"],
      ["900", "AI requests a month"],
      ["500MB", "storage"],
      ["2", "courier services"],
      ["Unlimited", "orders"],
      ["Help desk", "support"],
    ],
  },
  {
    ...base("growth"),
    name: "Growth",
    description: "For a growing catalog",
    specs: [
      ["500", "products"],
      ["3,000", "AI requests a month"],
      ["2GB", "storage"],
      ["4", "courier services"],
      ["Unlimited", "orders"],
      ["Priority", "email support"],
    ],
  },
  {
    ...base("business"),
    name: "Business",
    description: "For big catalogs and busy brands",
    specs: [
      ["Unlimited", "products"],
      ["4,500", "AI requests a month"],
      ["3GB", "storage"],
      ["4", "courier services"],
      ["Unlimited", "orders"],
      ["Account Manager", ""],
    ],
  },
];

export const plansBn: Plan[] = [
  {
    ...base("starter"),
    name: "Starter",
    popular: true,
    description: "নিজের ব্র্যান্ডের স্টোরের জন্য",
    specs: [
      ["50টি", "প্রোডাক্ট"],
      ["900টি", "AI রিকোয়েস্ট, মাসে"],
      ["500MB", "স্টোরেজ"],
      ["2টি", "কুরিয়ার সার্ভিস"],
      ["আনলিমিটেড", "অর্ডার"],
      ["হেল্প ডেস্ক", "সাপোর্ট"],
    ],
  },
  {
    ...base("growth"),
    name: "Growth",
    description: "বাড়তে থাকা ক্যাটালগের জন্য",
    specs: [
      ["500টি", "প্রোডাক্ট"],
      ["3,000টি", "AI রিকোয়েস্ট, মাসে"],
      ["2GB", "স্টোরেজ"],
      ["4টি", "কুরিয়ার সার্ভিস"],
      ["আনলিমিটেড", "অর্ডার"],
      ["প্রায়োরিটি", "ইমেইল সাপোর্ট"],
    ],
  },
  {
    ...base("business"),
    name: "Business",
    description: "বড় ক্যাটালগ ও ব্যস্ত ব্র্যান্ডের জন্য",
    specs: [
      ["আনলিমিটেড", "প্রোডাক্ট"],
      ["4,500টি", "AI রিকোয়েস্ট, মাসে"],
      ["3GB", "স্টোরেজ"],
      ["4টি", "কুরিয়ার সার্ভিস"],
      ["আনলিমিটেড", "অর্ডার"],
      ["অ্যাকাউন্ট ম্যানেজার", ""],
    ],
  },
];

/** What Starter, Growth and Business all have, shown once under the cards. */
export const PAID_INCLUDES = {
  en: {
    title: "Every paid plan includes",
    items: [
      "Custom domain",
      "No SoftuneBD badge",
      "AI store agent",
      "Meta, TikTok and GA4 tracking",
      "Full analytics",
      "Store Sale (POS)",
      "Fraud controls",
      "Customers and risk score",
      "Abandoned checkouts",
      "Theme switching",
      "ChatGPT connect (beta)",
      "0% commission",
      "bKash, Nagad and SSLCommerz",
      "Softune Pay auto-confirm",
    ],
  },
  bn: {
    title: "সব পেইড প্ল্যানে আছে",
    items: [
      "কাস্টম ডোমেইন",
      "SoftuneBD ব্যাজ ছাড়া",
      "AI স্টোর এজেন্ট",
      "Meta, TikTok ও GA4 ট্র্যাকিং",
      "সম্পূর্ণ অ্যানালিটিক্স",
      "স্টোর সেল (POS)",
      "ফ্রড কন্ট্রোল",
      "কাস্টমার ও রিস্ক স্কোর",
      "অ্যাবানডন্ড চেকআউট",
      "থিম বদলানো",
      "ChatGPT কানেক্ট (বেটা)",
      "0% কমিশন",
      "bKash, Nagad ও SSLCommerz",
      "Softune Pay অটো কনফার্ম",
    ],
  },
} as const;

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
      "COD and Softune Pay",
      "Steadfast courier",
      "Chat assistant",
      "AI setup + 5 images",
      "0% commission",
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
      "COD ও Softune Pay",
      "Steadfast কুরিয়ার",
      "চ্যাট অ্যাসিস্ট্যান্ট",
      "AI সেটআপ + 5টি ছবি",
      "0% কমিশন",
    ],
    note: "সক্রিয় থাকলে ফ্রি",
    cta: "ফ্রি স্টোর খুলুন",
  },
} as const;
