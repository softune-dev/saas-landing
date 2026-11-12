/**
 * Meta Pixel + Conversions API for softunebd.com's own ads (not merchants'
 * storefront pixels, which live in the templates and app/marketing.py).
 *
 * Every event goes out twice with the SAME event_id: once from the browser
 * (fbq) and once from our server (app/api/meta-event/route.ts -> Meta CAPI).
 * Meta merges the pair into one event, and the server copy survives ad
 * blockers and carries hashed contact details for better matching.
 *
 * Nothing is sent anywhere but production (www.softunebd.com): localhost,
 * Vercel previews and old hosts used to pollute the dataset.
 */

export const META_PROD_HOST = "www.softunebd.com";

export type MetaEventName =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "Contact"
  | "CompleteRegistration";

/** Contact details for CompleteRegistration. Hashed on our server, never
 * sent to Meta in plain text. */
export type MetaUserData = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  externalId?: string;
};

export function isMetaProd(): boolean {
  return typeof window !== "undefined" && window.location.hostname === META_PROD_HOST;
}

export function newEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

/**
 * Fire one event to the browser pixel and to CAPI with a shared event_id.
 * No-op outside production. Never throws: tracking must not break signup.
 */
export function trackMeta(
  name: MetaEventName,
  customData: Record<string, unknown> = {},
  user?: MetaUserData,
): void {
  if (!isMetaProd()) return;
  const eventId = newEventId();
  try {
    window.fbq?.("track", name, customData, { eventID: eventId });
  } catch {}
  try {
    const body = JSON.stringify({
      event_name: name,
      event_id: eventId,
      event_source_url: window.location.href,
      custom_data: customData,
      user,
    });
    // keepalive: CompleteRegistration fires right before a redirect to the
    // dashboard, and a plain fetch would be cancelled by the navigation.
    void fetch("/api/meta-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

/** Fires an event at most once per browser tab session (e.g. Lead on the
 * first touch of the signup form, not on every keystroke). */
export function trackMetaOnce(name: MetaEventName, key: string, customData: Record<string, unknown> = {}) {
  const storeKey = `softune_meta_once:${key}`;
  try {
    if (sessionStorage.getItem(storeKey)) return;
    sessionStorage.setItem(storeKey, "1");
  } catch {}
  trackMeta(name, customData);
}

/** The user id inside our access token (JWT `sub`), used as Meta's
 * external_id. Null if the token can't be read. */
export function userIdFromAccessToken(token: string): string | undefined {
  try {
    const part = token.split(".")[1];
    const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
    const sub = JSON.parse(json)?.sub;
    return typeof sub === "string" ? sub : undefined;
  } catch {
    return undefined;
  }
}

// ---- Ad attribution (UTM) -------------------------------------------------

const ATTRIBUTION_KEY = "softune_attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number] | "fbclid" | "landing_page" | "referrer", string>>;

/**
 * Remember where this visitor came from, so the signup that happens pages
 * (or days) later can be tied back to the ad. A new ad click (any utm_* or
 * fbclid in the URL) replaces the old one; plain page views keep it.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const hasNew = UTM_KEYS.some((k) => params.get(k)) || params.get("fbclid");
    if (!hasNew) return;
    const a: Attribution = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) a[k] = v.slice(0, 200);
    }
    const fbclid = params.get("fbclid");
    if (fbclid) a.fbclid = fbclid.slice(0, 500);
    a.landing_page = (window.location.pathname || "/").slice(0, 200);
    if (document.referrer) a.referrer = document.referrer.slice(0, 300);
    localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(a));
  } catch {}
}

export function readAttribution(): Attribution | undefined {
  try {
    const raw = localStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : undefined;
  } catch {
    return undefined;
  }
}
