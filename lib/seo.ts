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
}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Launch beautiful stores that sell`;
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogImage = image || "/og-image.png";

  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
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
