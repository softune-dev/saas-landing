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
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
} from "./site";

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
      "Built Softune end to end as a solo developer: the multi-tenant dashboard, storefront themes, AI tooling, COD, bKash, Nagad, SSLCommerz, courier connections, and Store Sale POS.",
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
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo-dark.png`,
    },
    description: SITE_DESCRIPTION,
    email: SUPPORT_EMAIL,
    founder: founderRef(),
    areaServed: { "@type": "Country", name: "Bangladesh" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SUPPORT_EMAIL,
        telephone: SUPPORT_PHONE,
        availableLanguage: ["English", "Bengali"],
        areaServed: "BD",
      },
    ],
    // sameAs (org social profiles) omitted — footer icons are still
    // placeholder "#" hrefs. Founder sameAs lives on personSchema.
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: ["en", "bn"],
    publisher: { "@id": `${SITE_URL}/#organization` },
    // No SearchAction/sitelinks-search-box — there's no real site search
    // to point it at yet.
  };
}

/** SoftwareApplication — homepage only. Feature list is what the product
 * actually ships, same claims as llms.txt. No invented rating or installs. */
export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Ecommerce",
    operatingSystem: "Web",
    description: SITE_DESCRIPTION,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/pricing`,
      priceCurrency: "BDT",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "Theme Editor with live preview",
      "COD, bKash, Nagad, and SSLCommerz payments",
      "Steadfast, Pathao, RedX, and eCourier connections",
      "Store Sale POS",
      "Gemini AI chatbot and product descriptions",
      "Fraud phone blocklist and checkout rules",
    ],
    countriesSupported: "BD",
    inLanguage: ["en", "bn"],
    author: founderRef(),
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
  const pageUrl = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: {
      "@type": "ImageObject",
      url: absoluteImage,
    },
    url: pageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    ...(iso ? { datePublished: iso, dateModified: iso } : {}),
    inLanguage: lang || "en",
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
  const priceValidUntil = `${new Date().getFullYear()}-12-31`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Ecommerce storefront platform subscription — themes, product catalog, orders, payments, couriers, and AI tools. Priced in Bangladeshi Taka.",
    brand: { "@type": "Brand", name: SITE_NAME },
    url: `${SITE_URL}/pricing`,
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.description,
      price: plan.priceMonthly,
      priceCurrency: "BDT",
      priceValidUntil,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/pricing`,
    })),
  };
}
