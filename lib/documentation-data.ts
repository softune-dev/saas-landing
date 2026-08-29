/**
 * Softune documentation index — merchant guides that map to real dashboard
 * capabilities only. Keep lean; prefer cutting unverified claims.
 */

export type DocIconName =
  | "book"
  | "settings"
  | "paintbrush"
  | "payments"
  | "analytics"
  | "addons";

export type DocArticle = {
  title: string;
  slug: string;
};

export type DocCategory = {
  title: string;
  icon: DocIconName;
  articles: DocArticle[];
};

export const DOC_ICON_PATHS: Record<DocIconName, string> = {
  book: "/icons/book.svg",
  settings: "/icons/domain.svg",
  paintbrush: "/icons/themes.svg",
  payments: "/icons/wallet.svg",
  analytics: "/icons/analytics.svg",
  addons: "/icons/save.svg",
};

/**
 * Lean verified set. Topics map to real Softune surfaces:
 * Getting Started, Products, Categories, Themes, Payments, Courier,
 * Analytics (export), Site Settings (domain, SEO meta, shipping locations),
 * Fraud Protection, Add-Ons marketplace.
 */
export const DOC_CATEGORIES: DocCategory[] = [
  {
    title: "Getting Started",
    icon: "book",
    articles: [
      { title: "Introduction to Softune", slug: "intro-to-softune" },
      {
        title: "Account setup checklist",
        slug: "account-setup-checklist",
      },
      { title: "Taking the dashboard tour", slug: "dashboard-tour" },
      { title: "Connecting a custom domain", slug: "custom-domain" },
    ],
  },
  {
    title: "Store Management",
    icon: "settings",
    articles: [
      { title: "Adding and editing products", slug: "adding-editing-products" },
      { title: "Organizing categories", slug: "organizing-categories" },
      { title: "Managing orders end to end", slug: "managing-orders" },
      { title: "Working with customers", slug: "working-with-customers" },
    ],
  },
  {
    title: "Storefront & Themes",
    icon: "paintbrush",
    articles: [
      { title: "Choosing a Softune theme", slug: "choosing-a-theme" },
      { title: "Using the theme editor", slug: "using-theme-editor" },
      {
        title: "Brand colors with AI Suggest",
        slug: "brand-colors-ai-suggest",
      },
      { title: "Publishing your storefront", slug: "publishing-storefront" },
    ],
  },
  {
    title: "Payments & Courier",
    icon: "payments",
    articles: [
      {
        title: "Connecting payment methods",
        slug: "connecting-payment-gateways",
      },
      { title: "Cash on Delivery for your store", slug: "cash-on-delivery" },
      {
        title: "Connecting courier partners",
        slug: "connecting-courier-partners",
      },
      {
        title: "Shipping locations in Site Settings",
        slug: "shipping-locations",
      },
    ],
  },
  {
    title: "Analytics & Reporting",
    icon: "analytics",
    articles: [
      { title: "Reading store analytics", slug: "reading-store-analytics" },
      {
        title: "Exporting reports",
        slug: "exporting-reports",
      },
      { title: "Fraud protection rules", slug: "fraud-protection-rules" },
      {
        title: "Managing the phone blocklist",
        slug: "managing-phone-blocklist",
      },
    ],
  },
  {
    title: "Add-Ons",
    icon: "addons",
    articles: [
      {
        title: "Browsing the Add-Ons marketplace",
        slug: "browsing-addons-marketplace",
      },
      {
        title: "Customer Engagement add-ons",
        slug: "customer-engagement-addons",
      },
      { title: "Marketing & Sales add-ons", slug: "marketing-sales-addons" },
      {
        title: "AI Automation & Operations add-ons",
        slug: "ai-operations-addons",
      },
    ],
  },
];

export function findDocCategoryBySlug(slug: string): DocCategory | undefined {
  return DOC_CATEGORIES.find((c) => c.articles.some((a) => a.slug === slug));
}

export function findDocArticleMeta(
  slug: string,
): { category: DocCategory; article: DocArticle } | undefined {
  for (const category of DOC_CATEGORIES) {
    const article = category.articles.find((a) => a.slug === slug);
    if (article) return { category, article };
  }
  return undefined;
}

/** Other articles in the same category, then fill from other categories. */
export function getRelatedDocArticles(
  slug: string,
  limit = 4,
): { title: string; slug: string; category: string }[] {
  const found = findDocArticleMeta(slug);
  if (!found) return [];

  const same = found.category.articles
    .filter((a) => a.slug !== slug)
    .map((a) => ({
      title: a.title,
      slug: a.slug,
      category: found.category.title,
    }));

  const others: { title: string; slug: string; category: string }[] = [];
  for (const cat of DOC_CATEGORIES) {
    if (cat.title === found.category.title) continue;
    for (const a of cat.articles) {
      others.push({ title: a.title, slug: a.slug, category: cat.title });
    }
  }

  return [...same, ...others].slice(0, limit);
}
