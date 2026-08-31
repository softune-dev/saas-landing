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

/** Builds one page's full Metadata object — title (suffixed with the site
 * name, except the homepage which IS the site name), description, canonical,
 * robots (including Googlebot preview hints), and matching Open Graph /
 * Twitter cards. Every route should call this instead of hand-rolling tags. */
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
  /** Route path, e.g. "/pricing" or "/blog/my-post". */
  path: string;
  /** Absolute or root-relative image URL for social cards. Falls back to
   * the real branded /og-image.png (1200x630) for any page that doesn't
   * have its own (a blog post's cover image, etc.). */
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  /** Set for a blog post — switches Open Graph type to "article" and adds
   * the publish date/author, which is what Google/social crawlers use for
   * freshness and byline signals. `publishedTime` needs to already be a
   * valid ISO string (parse it before calling, same as schema.ts does). */
  article?: { publishedTime?: string; modifiedTime?: string; author?: string };
  /** BCP-47 content language. Bangla posts should pass "bn". */
  lang?: "en" | "bn";
}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
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

  return {
    title: { absolute: fullTitle },
    description,
    applicationName: SITE_NAME,
    authors: [{ name: article?.author || "Kamrul Hasan", url: "https://kamrulhasan.site" }],
    creator: "Kamrul Hasan",
    publisher: SITE_NAME,
    referrer: "origin-when-cross-origin",
    formatDetection: { email: false, address: false, telephone: false },
    alternates: { canonical },
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
