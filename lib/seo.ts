import type { Metadata } from "next";
import {
  OG_ALT_LOCALES,
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_LOCALE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  TWITTER_CREATOR,
} from "./site";

function ogImageType(src: string): string {
  if (src.endsWith(".webp")) return "image/webp";
  if (src.endsWith(".jpg") || src.endsWith(".jpeg")) return "image/jpeg";
  return "image/png";
}

/** Known static routes that actually have a /bn/ counterpart. */
const VALID_BN_STATIC_ROUTES = new Set([
  "/",
  "/about",
  "/blog",
  "/changelog",
  "/features",
  "/pricing",
  "/signup",
  "/support/community",
  "/support/contact",
  "/support/documentation",
  "/support/faq",
  "/support/tutorials",
]);

/** Whether a given path (accepts either the English or /bn/ form) has a
 * real Bangla twin. Used by pageSeo (to only emit an hreflang="bn" tag when
 * one actually resolves), app/sitemap.ts (to skip submitting /bn/ URLs that
 * would 404), and components/geo-banner.tsx (to not offer a Bangla link on
 * a page that doesn't have one). Every one of these had the same bug once —
 * keep this the single source of truth rather than re-deriving it. */
export function hasBnVersion(path: string): boolean {
  const isBnPath = path.startsWith("/bn");
  const basePath = isBnPath ? path.slice(3) || "/" : path;
  const cleanPath = basePath.split("?")[0].split("#")[0];

  if (VALID_BN_STATIC_ROUTES.has(cleanPath)) return true;

  return (
    cleanPath.startsWith("/blog/") ||
    cleanPath.startsWith("/features/") ||
    cleanPath.startsWith("/support/documentation/")
  );
}

/** Builds one page's full Metadata object — title, description, canonical,
 * robots, reciprocal hreflang alternate links (en, bn, x-default), and
 * matching Open Graph / Twitter cards. */
export function pageSeo({
  title,
  description,
  path,
  image,
  imageAlt,
  noindex = false,
  article,
  lang = "en",
}: {
  /** Pass null for the homepage — its title IS the site name, not a suffix. */
  title: string | null;
  description: string;
  /** Route path, e.g. "/pricing" or "/bn/pricing". */
  path: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  article?: { publishedTime?: string; modifiedTime?: string; author?: string };
  /** BCP-47 content language. Bangla pages pass "bn". */
  lang?: "en" | "bn";
}): Metadata {
  const isBnPath = path.startsWith("/bn");
  const basePath = isBnPath ? path.slice(3) || "/" : path;
  const enPath = basePath === "/" ? "/" : basePath;
  const bnPath = `/bn${basePath === "/" ? "" : basePath}`;

  const enUrl = `${SITE_URL}${enPath}`;
  const bnUrl = `${SITE_URL}${bnPath}`;
  const hasBn = hasBnVersion(basePath);

  const defaultTitleBn = `${SITE_NAME} | বাংলাদেশের অনলাইন স্টোর বিল্ডার`;
  const baseTitle = lang === "bn" ? defaultTitleBn : DEFAULT_TITLE;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : baseTitle;

  const currentPath = lang === "bn" ? bnPath : enPath;
  const canonical = `${SITE_URL}${currentPath}`;
  const ogImage = image || OG_IMAGE;
  const alt = imageAlt || OG_IMAGE_ALT;
  const locale = lang === "bn" ? "bn_BD" : OG_LOCALE;
  const alternateLocale = lang === "bn" ? [OG_LOCALE] : [...OG_ALT_LOCALES];
  const imageBlock = {
    url: ogImage,
    width: 1200,
    height: 630,
    alt,
    type: ogImageType(ogImage),
  };

  const robots = noindex
    ? { index: false as const, follow: false as const, googleBot: { index: false as const, follow: false as const } }
    : {
        index: true as const,
        follow: true as const,
        googleBot: {
          index: true as const,
          follow: true as const,
          "max-image-preview": "large" as const,
          "max-snippet": -1 as const,
          "max-video-preview": -1 as const,
        },
      };

  const languages: Record<string, string> = {
    en: enUrl,
    "x-default": enUrl,
  };
  if (hasBn) {
    languages.bn = bnUrl;
  }

  return {
    title: { absolute: fullTitle },
    description,
    applicationName: SITE_NAME,
    authors: [{ name: article?.author || "Kamrul Hasan", url: "https://kamrulhasan.site" }],
    creator: "Kamrul Hasan",
    publisher: SITE_NAME,
    referrer: "origin-when-cross-origin",
    formatDetection: { email: false, address: false, telephone: false },
    alternates: {
      canonical,
      languages,
    },
    robots,
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale,
      alternateLocale,
      countryName: "Bangladesh",
      type: article ? "article" : "website",
      images: [imageBlock],
      ...(article?.publishedTime ? { publishedTime: article.publishedTime } : {}),
      ...(article?.modifiedTime ? { modifiedTime: article.modifiedTime } : {}),
      ...(article?.author ? { authors: [article.author] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: ogImage, alt, width: 1200, height: 630 }],
      creator: TWITTER_CREATOR,
    },
  };
}
