import { type LucideIcon } from "lucide-react";

export type DocIconName =
  | "book"
  | "settings"
  | "paintbrush"
  | "payments"
  | "analytics"
  | "addons";

export const DOC_ICON_PATHS: Record<DocIconName, string> = {
  book: "/icons/book.svg",
  settings: "/icons/settings.svg",
  paintbrush: "/icons/color.svg",
  payments: "/icons/wallet.svg",
  analytics: "/icons/analytics.svg",
  addons: "/icons/shop-bag.svg",
};

export type DocArticleMeta = {
  title: string;
  slug: string;
  category?: string;
};

export type DocCategory = {
  title: string;
  icon: DocIconName;
  articles: DocArticleMeta[];
};

export const DOC_CATEGORIES: DocCategory[] = [
  {
    title: "Getting Started",
    icon: "book",
    articles: [
      { title: "Intro to Softunebd & Dashboard Overview", slug: "intro-to-softune" },
      { title: "Account Setup Checklist", slug: "account-setup-checklist" },
      { title: "Dashboard Tour & Key Concepts", slug: "dashboard-tour" },
      { title: "Connecting a Custom Domain", slug: "custom-domain" },
    ],
  },
  {
    title: "Store Management",
    icon: "settings",
    articles: [
      { title: "Adding & Editing Products", slug: "adding-editing-products" },
      { title: "Organizing Categories", slug: "organizing-categories" },
      { title: "Managing Orders & Fulfillment", slug: "managing-orders" },
      { title: "Working with Customers", slug: "working-with-customers" },
    ],
  },
  {
    title: "Storefront & Themes",
    icon: "paintbrush",
    articles: [
      { title: "Choosing a Theme", slug: "choosing-a-theme" },
      { title: "Using the Theme Editor", slug: "using-theme-editor" },
      { title: "Brand Colors & Fonts with AI Suggest", slug: "brand-colors-ai-suggest" },
      { title: "Publishing Your Storefront", slug: "publishing-storefront" },
    ],
  },
  {
    title: "Payments & Courier",
    icon: "payments",
    articles: [
      { title: "Connecting Payment Gateways", slug: "connecting-payment-gateways" },
      { title: "Cash on Delivery (COD) Guide", slug: "cash-on-delivery" },
      { title: "Connecting Courier Partners", slug: "connecting-courier-partners" },
      { title: "Shipping Locations & Delivery Fees", slug: "shipping-locations" },
    ],
  },
  {
    title: "Analytics & Reporting",
    icon: "analytics",
    articles: [
      { title: "Reading Store Analytics", slug: "reading-store-analytics" },
      { title: "Exporting Sales & Financial Reports", slug: "exporting-reports" },
      { title: "Fraud Protection Rules", slug: "fraud-protection-rules" },
      { title: "Managing Your Phone Blocklist", slug: "managing-phone-blocklist" },
    ],
  },
  {
    title: "Add-Ons Marketplace",
    icon: "addons",
    articles: [
      { title: "Browsing the Add-Ons Marketplace", slug: "browsing-addons-marketplace" },
      { title: "Customer Engagement add-ons", slug: "customer-engagement-addons" },
      { title: "Marketing & Sales Boosting add-ons", slug: "marketing-sales-addons" },
      { title: "AI Automation & Operations add-ons", slug: "ai-operations-addons" },
    ],
  },
];

export const DOC_CATEGORIES_BN: DocCategory[] = [
  {
    title: "শুরু করুন",
    icon: "book",
    articles: [
      { title: "Softunebd পরিচিতি ও ড্যাশবোর্ড ওভারভিউ", slug: "intro-to-softune" },
      { title: "অ্যাকাউন্ট সেটআপ চেকলিস্ট", slug: "account-setup-checklist" },
      { title: "ড্যাশবোর্ড ট্যুর ও ফিচার নির্দেশিকা", slug: "dashboard-tour" },
      { title: "কাস্টম ডোমেইন কানেক্ট করার নিয়ম", slug: "custom-domain" },
    ],
  },
  {
    title: "স্টোর পরিচালনা",
    icon: "settings",
    articles: [
      { title: "প্রোডাক্ট যোগ ও ক্যাটালগ এডিটিং", slug: "adding-editing-products" },
      { title: "ক্যাটাগরি গুছিয়ে সাজানো", slug: "organizing-categories" },
      { title: "অর্ডার প্রক্রিয়াকরণ ও শিপিং", slug: "managing-orders" },
      { title: "কাস্টমার ম্যানেজমেন্ট ও তথ্য", slug: "working-with-customers" },
    ],
  },
  {
    title: "স্টোরফ্রন্ট ও থিম",
    icon: "paintbrush",
    articles: [
      { title: "Softunebd থিম নির্বাচন", slug: "choosing-a-theme" },
      { title: "Theme Editor ব্যবহার করার নিয়ম", slug: "using-theme-editor" },
      { title: "AI Suggest দিয়ে ব্র্যান্ড কালার ও ফন্ট", slug: "brand-colors-ai-suggest" },
      { title: "স্টোরফ্রন্ট লাইভ ও পাবলিশ করা", slug: "publishing-storefront" },
    ],
  },
  {
    title: "পেমেন্ট ও কুরিয়ার",
    icon: "payments",
    articles: [
      { title: "পেমেন্ট মেথড গেটওয়ে সেটআপ", slug: "connecting-payment-gateways" },
      { title: "ক্যাশ অন ডেলিভারি (COD) নির্দেশিকা", slug: "cash-on-delivery" },
      { title: "কুরিয়ার পার্টনার্স ইন্টিগ্রেশন", slug: "connecting-courier-partners" },
      { title: "ডেলিভারি লোকেশন ও শিপিং চার্জ", slug: "shipping-locations" },
    ],
  },
  {
    title: "অ্যানালিটিক্স ও রিপোর্ট",
    icon: "analytics",
    articles: [
      { title: "স্টোর অ্যানালিটিক্স রিপোর্ট দেখা", slug: "reading-store-analytics" },
      { title: "সেলস ও ফাইনান্সিয়াল রিপোর্ট এক্সপোর্ট", slug: "exporting-reports" },
      { title: "ফ্রড প্রোটেকশন সিকিউরিটি রুলস", slug: "fraud-protection-rules" },
      { title: "ফোন নম্বর ব্লকক্লিপ পরিচালনা", slug: "managing-phone-blocklist" },
    ],
  },
  {
    title: "অ্যাড-অনস মার্কেটপ্লেস",
    icon: "addons",
    articles: [
      { title: "অ্যাড-অনস মার্কেটপ্লেস ব্রাউজিং", slug: "browsing-addons-marketplace" },
      { title: "কাস্টমার এনগেজমেন্ট অ্যাড-অনস", slug: "customer-engagement-addons" },
      { title: "মার্কেটিং ও সেলস বুস্টিং অ্যাড-অনস", slug: "marketing-sales-addons" },
      { title: "AI অটোমেশন ও অপারেশনস অ্যাড-অনস", slug: "ai-operations-addons" },
    ],
  },
];

export function getDocCategories(locale: "en" | "bn" = "en"): DocCategory[] {
  return locale === "bn" ? DOC_CATEGORIES_BN : DOC_CATEGORIES;
}

export function findDocCategoryBySlug(slug: string, locale: "en" | "bn" = "en"): DocCategory | undefined {
  const categories = getDocCategories(locale);
  return categories.find((cat) => cat.articles.some((a) => a.slug === slug));
}

export function findDocArticleMeta(slug: string, locale: "en" | "bn" = "en"): DocArticleMeta | undefined {
  const categories = getDocCategories(locale);
  for (const cat of categories) {
    const art = cat.articles.find((a) => a.slug === slug);
    if (art) return art;
  }
  return undefined;
}

export function getRelatedDocArticles(
  currentSlug: string,
  limit = 4,
  locale: "en" | "bn" = "en"
): DocArticleMeta[] {
  const categories = getDocCategories(locale);
  const parentCategory = findDocCategoryBySlug(currentSlug, locale);
  if (!parentCategory) return [];

  const siblings = parentCategory.articles.filter((a) => a.slug !== currentSlug);
  if (siblings.length >= limit) {
    return siblings.slice(0, limit);
  }

  const results = [...siblings];
  for (const cat of categories) {
    if (cat.title === parentCategory.title) continue;
    for (const art of cat.articles) {
      if (art.slug !== currentSlug && !results.some((r) => r.slug === art.slug)) {
        results.push(art);
        if (results.length >= limit) return results;
      }
    }
  }
  return results;
}
