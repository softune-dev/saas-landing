import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

/** Builds one page's full Metadata object — title (suffixed with the site
 * name, except the homepage which IS the site name), description, a real
 * canonical URL, and matching Open Graph/Twitter card data. One function so
 * every page gets the same shape instead of each hand-rolling it slightly
 * differently. */
export function pageSeo({
  title,
  description,
  path,
  image,
  noindex = false,
  article,
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
  noindex?: boolean;
  /** Set for a blog post — switches Open Graph type to "article" and adds
   * the publish date/author, which is what Google/social crawlers use for
   * freshness and byline signals. `publishedTime` needs to already be a
   * valid ISO string (parse it before calling, same as schema.ts does). */
  article?: { publishedTime?: string; author?: string };
}): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Ecommerce Website Builder for Bangladesh | bKash, Nagad, COD`;
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogImage = image || "/og-image.png";

  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: article
      ? {
          title: fullTitle,
          description,
          url: canonical,
          siteName: SITE_NAME,
          type: "article",
          images: [{ url: ogImage, width: 1200, height: 630 }],
          ...(article.publishedTime ? { publishedTime: article.publishedTime } : {}),
          ...(article.author ? { authors: [article.author] } : {}),
        }
      : {
          title: fullTitle,
          description,
          url: canonical,
          siteName: SITE_NAME,
          type: "website",
          images: [{ url: ogImage, width: 1200, height: 630 }],
        },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
