/** One place for the landing site's own public URL — every canonical tag,
 * OG url, and the sitemap all derive from this instead of each hardcoding
 * the domain. Override via NEXT_PUBLIC_SITE_URL once a final domain (or a
 * staging URL) is set. Must match the live canonical host (Vercel currently
 * serves www as primary and 308s apex → www). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.softunebd.com"
).replace(/\/$/, "");

/** Merchant dashboard — demo-access redirect target after the lead funnel.
 * Override via NEXT_PUBLIC_DASHBOARD_URL for local testing (e.g.
 * http://localhost:3000) — it MUST point at whichever dashboard talks to
 * the same backend as NEXT_PUBLIC_API_URL. Mixing a local API with the
 * production dashboard (or vice versa) mints a token one side can't
 * validate — signed with a different SECRET_KEY — and silently bounces
 * back to the login screen with no clear error. */
export const DASHBOARD_URL = (
  process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://dashboard.softunebd.com"
).replace(/\/$/, "");

export const SITE_NAME = "Softune";

/** Homepage / layout default <title> — pipe only, never an em dash. */
export const DEFAULT_TITLE = `${SITE_NAME} | Ecommerce Website Builder for Bangladesh`;

export const SITE_DESCRIPTION =
  "Multi-tenant ecommerce SaaS for Bangladesh merchants and agencies. Themes, products, orders, COD, bKash, Nagad, SSLCommerz, couriers, POS, and AI — one platform to build, publish, and grow storefronts.";

/** Default social card (1200×630) at public/og-image.png. */
export const OG_IMAGE = "/og-image.png";
export const OG_IMAGE_ALT =
  "Softune | ecommerce website builder for Bangladesh with bKash, Nagad, SSLCommerz, and COD";

/** Open Graph locale: English content, Bangladesh market. */
export const OG_LOCALE = "en_BD";
export const OG_ALT_LOCALES = ["bn_BD"] as const;

/** Founder's X profile — the only real social handle we have today. */
export const TWITTER_CREATOR = "@khxKallol";

export const SUPPORT_EMAIL = "support@softunebd.com";
/** E.164 — same WhatsApp number the contact page already publishes. */
export const SUPPORT_PHONE = "+8801831624571";
