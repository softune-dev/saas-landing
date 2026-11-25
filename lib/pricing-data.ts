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
  /** Who the plan is for, in one line. */
  description: string;
  /** The plan below, whose features this one includes. */
  includes: string;
  /** Every line must be something the product really does for that plan. */
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
    description: "For shops ready to sell under their own name",
    includes: "Free",
    features: [
      "Your own custom domain, with no SoftuneBD badge",
      "Unlimited orders and 50 products",
      "AI agent that runs your store by chat, in Bangla or English",
      "30 AI requests a day, plus ChatGPT connect (beta)",
      "Meta Pixel and Conversions API, TikTok, GA4 and Tag Manager",
      "Full analytics with profit, and export",
      "Customer list, risk score and abandoned checkouts",
      "Block fake orders by phone, IP and repeat attempts",
      "Store Sale (POS) with printed receipts",
      "Switch themes any time",
      "Steadfast and eCourier",
      "500MB media storage",
    ],
  },
  {
    ...base("growth"),
    name: "Growth",
    description: "For growing shops that want customers to pay online",
    includes: "Starter",
    features: [
      "bKash, Nagad and SSLCommerz checkout with your own accounts",
      "Card payments through SSLCommerz",
      "Pathao and RedX, with Steadfast and eCourier",
      "500 products",
      "100 AI requests a day",
      "2GB media storage",
      "Priority email support",
    ],
  },
  {
    ...base("business"),
    name: "Business",
    description: "For established brands with big catalogs",
    includes: "Growth",
    features: [
      "Unlimited products",
      "2 stores from one login",
      "150 AI requests a day",
      "3GB media storage",
      "Your own Account Manager",
    ],
  },
];

export const plansBn: Plan[] = [
  {
    ...base("starter"),
    name: "Starter",
    popular: true,
    description: "নিজের নামে বিক্রি শুরু করতে প্রস্তুত শপের জন্য",
    includes: "Free",
    features: [
      "নিজের কাস্টম ডোমেইন, SoftuneBD ব্যাজ ছাড়া",
      "আনলিমিটেড অর্ডার ও 50টি প্রোডাক্ট",
      "AI এজেন্ট, চ্যাট করেই স্টোর চালান বাংলা বা ইংরেজিতে",
      "দিনে 30টি AI রিকোয়েস্ট, সাথে ChatGPT কানেক্ট (বেটা)",
      "Meta Pixel ও Conversions API, TikTok, GA4 ও Tag Manager",
      "প্রফিটসহ সম্পূর্ণ অ্যানালিটিক্স ও এক্সপোর্ট",
      "কাস্টমার লিস্ট, রিস্ক স্কোর ও অ্যাবানডন্ড চেকআউট",
      "ফোন, IP ও বারবার চেষ্টা দেখে ফেক অর্ডার আটকান",
      "রসিদ প্রিন্টসহ স্টোর সেল (POS)",
      "যেকোনো সময় থিম বদলান",
      "Steadfast ও eCourier",
      "500MB মিডিয়া স্টোরেজ",
    ],
  },
  {
    ...base("growth"),
    name: "Growth",
    description: "অনলাইনে পেমেন্ট নিতে চাওয়া বাড়ন্ত শপের জন্য",
    includes: "Starter",
    features: [
      "নিজের অ্যাকাউন্টে bKash, Nagad ও SSLCommerz চেকআউট",
      "SSLCommerz দিয়ে কার্ড পেমেন্ট",
      "Pathao ও RedX, সাথে Steadfast ও eCourier",
      "500টি প্রোডাক্ট",
      "দিনে 100টি AI রিকোয়েস্ট",
      "2GB মিডিয়া স্টোরেজ",
      "প্রায়োরিটি ইমেইল সাপোর্ট",
    ],
  },
  {
    ...base("business"),
    name: "Business",
    description: "বড় ক্যাটালগের প্রতিষ্ঠিত ব্র্যান্ডের জন্য",
    includes: "Growth",
    features: [
      "আনলিমিটেড প্রোডাক্ট",
      "এক লগইনে 2টি স্টোর",
      "দিনে 150টি AI রিকোয়েস্ট",
      "3GB মিডিয়া স্টোরেজ",
      "নিজস্ব অ্যাকাউন্ট ম্যানেজার",
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
