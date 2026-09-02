/** One place for the landing site's own public URL — every canonical tag,
 * OG url, and the sitemap all derive from this instead of each hardcoding
 * the domain. Override via NEXT_PUBLIC_SITE_URL once a final domain (or a
 * staging URL) is set. Must match the live canonical host (Vercel currently
 * serves www as primary and 308s apex → www). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.softunebd.com"
).replace(/\/$/, "");

/** Merchant dashboard — trial-complete and demo-access redirect target.
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
  "Start a free 3-day Softune trial — no credit card. Ecommerce SaaS for Bangladesh: themes, COD, bKash, Nagad, SSLCommerz, couriers, POS, and AI in one dashboard.";

/** Same sentence in FAQ JSON-LD, SoftwareApplication schema, About, and
 *  the Theme Editor page — crawlers and answer engines cite one claim,
 *  not five paraphrases. Honest: the editor exists so each shop looks
 *  like the merchant, not a default template. */
export const BRANDING_CLAIM =
  "Softune cares about your branding and identity, not a generic storefront that looks like everyone else's.";

/** Self-serve trial length — matches app/config.py's trial_days. */
export const TRIAL_DAYS = 3;
export const TRIAL_CTA = "Start Free";
export const TRIAL_NOTE = "3-day free trial · No credit card required";

/** Default social card (1200×630) at public/og-image.png. */
export const OG_IMAGE = "/og-image.png";
export const OG_IMAGE_ALT =
  "Softune | free 3-day trial ecommerce website builder for Bangladesh with bKash, Nagad, SSLCommerz, and COD";

/** Open Graph locale: English content, Bangladesh market. */
export const OG_LOCALE = "en_BD";
export const OG_ALT_LOCALES = ["bn_BD"] as const;

/** Founder's X profile — the only real social handle we have today. */
export const TWITTER_CREATOR = "@khxKallol";

export const SUPPORT_EMAIL = "support@softunebd.com";
/** E.164 — same WhatsApp number the contact page already publishes. */
export const SUPPORT_PHONE = "+8801831624571";
