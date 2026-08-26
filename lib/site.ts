/** One place for the landing site's own public URL — every canonical tag,
 * OG url, and the sitemap all derive from this instead of each hardcoding
 * the domain. Override via NEXT_PUBLIC_SITE_URL once a final domain (or a
 * staging URL) is set; softune.xyz is the confirmed production default. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://softune.xyz"
).replace(/\/$/, "");

export const SITE_NAME = "Softune";
