/**
 * schema.org JSON-LD builders. This is the single highest-leverage thing
 * for AI answer engines (ChatGPT browsing, Perplexity, Google AI Overviews,
 * Claude) to correctly identify and cite Softune as an entity — they lean
 * on structured data far more than on prose. Every builder here only uses
 * real, verifiable data already in the codebase (blog-data.ts, pricing.tsx,
 * faq-content.tsx) — never invented stats, fake reviews, or placeholder
 * team members, since fabricated structured data is worse than none: it's
 * a false claim search engines and LLMs treat as authoritative.
 */
import { SITE_NAME, SITE_URL } from "./site";

/** Kamrul Hasan built Softune solo — Organization.founder below and this
 * standalone Person schema (rendered on the About page) are the two
 * places that tell search engines and LLMs who's actually behind the
 * platform, so a query like "who built Softune" resolves to a real,
 * citable entity instead of just the company name. */
export function founderRef() {
  return {
    "@type": "Person" as const,
    name: "Kamrul Hasan",
    url: "https://kamrulhasan.site",
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kamrul Hasan",
    url: "https://kamrulhasan.site",
    jobTitle: "Founder & Developer",
    description:
      "Built Softune end to end as a solo developer: the multi-tenant dashboard, storefront themes, AI tooling, and the payment and courier integrations underneath it.",
    worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    // Real profiles only, pulled from kamrulhasan.site/contact — sameAs is
    // how search engines/LLMs link these as the same verified person
    // instead of treating "Kamrul Hasan" as an unconfirmed name.
    sameAs: [
      "https://kamrulhasan.site",
      "https://github.com/Kallolx",
      "https://x.com/khxKallol",
      "https://www.facebook.com/developer.kamrulhasan/",
    ],
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-dark.png`,
    description:
      "Multi-tenant ecommerce SaaS for agencies and merchants. Themes, products, orders, and AI — one platform to build, publish, and grow storefronts.",
    founder: founderRef(),
    // sameAs (social profile links) intentionally omitted — the footer's
    // social icons are all placeholder "#" hrefs today. Add real profile
    // URLs here the moment they exist; a fake sameAs link is a broken
    // entity claim, not a helpful one.
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    // No SearchAction/sitelinks-search-box — there's no real site search
    // to point it at yet.
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function articleSchema({
  title,
  description,
  image,
  path,
  datePublished,
  author,
  lang,
}: {
  title: string;
  description: string;
  image: string;
  path: string;
  /** Already-formatted date string from blog-data.ts (e.g. "Aug 15, 2026") —
   * schema.org wants ISO 8601, so this gets parsed; falls back to omitting
   * the field if it doesn't parse rather than emitting an invalid date. */
  datePublished: string;
  author: string;
  /** BCP-47 language of the post's actual text (e.g. "bn") — Google detects
   * this from content either way, but it's a small extra signal. Omitted
   * (schema-wide default is English) when not given. */
  lang?: string;
}) {
  const parsed = new Date(datePublished);
  const iso = Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
  // Google's rich-results validator requires an absolute URL here — unlike
  // <meta property="og:image">, which Next resolves against metadataBase
  // automatically, this JSON-LD is rendered as-is with no such resolution.
  const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: absoluteImage,
    url: `${SITE_URL}${path}`,
    ...(iso ? { datePublished: iso } : {}),
    ...(lang ? { inLanguage: lang } : {}),
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-dark.png` },
    },
  };
}

export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function pricingSchema(
  plans: { name: string; description: string; priceMonthly: number }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${SITE_NAME} subscription plans`,
    description:
      "Ecommerce storefront platform subscription — themes, product catalog, orders, and AI tools.",
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.description,
      price: plan.priceMonthly,
      priceCurrency: "BDT",
      url: `${SITE_URL}/pricing`,
    })),
  };
}
