import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Server half of lib/meta.ts: forwards one browser event to Meta's
 * Conversions API with the same event_id the browser pixel used, so Meta
 * deduplicates the pair into a single event.
 *
 * Adds what only a server can add reliably: the visitor's IP and user
 * agent, the _fbp/_fbc cookies (sent on this same-origin request), and
 * SHA-256 hashed contact details for CompleteRegistration.
 *
 * Production only: needs VERCEL_ENV=production, NODE_ENV=production, the
 * request to come from www.softunebd.com, and META_CAPI_ACCESS_TOKEN set in
 * Vercel. Anything else answers 204 and sends nothing, so localhost and
 * preview deployments can never pollute the dataset.
 */

export const runtime = "nodejs";

const PROD_HOST = "www.softunebd.com";
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "1093333280052054";
const GRAPH_VERSION = "v21.0";
const ALLOWED_EVENTS = new Set(["PageView", "ViewContent", "Lead", "Contact", "CompleteRegistration"]);

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

function norm(v: unknown, max = 200): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim().toLowerCase();
  return t ? t.slice(0, max) : undefined;
}

/** Bangladesh numbers to Meta's format: digits only with country code
 * (01712345678 / +8801712345678 / 8801712345678 -> 8801712345678). */
function normPhone(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  let d = v.replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("0") && d.length === 11) d = `88${d}`;
  else if (d.length === 10 && d.startsWith("1")) d = `880${d}`;
  return d.length >= 11 && d.length <= 15 ? d : undefined;
}

function clientIp(req: NextRequest): string | undefined {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || undefined;
}

export async function POST(req: NextRequest) {
  const token = process.env.META_CAPI_ACCESS_TOKEN?.trim();
  const host = (req.headers.get("x-forwarded-host") || req.headers.get("host") || "").split(":")[0];
  const origin = req.headers.get("origin");
  const isProd =
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL_ENV === "production" &&
    host === PROD_HOST &&
    (!origin || origin === `https://${PROD_HOST}`);
  if (!token || !isProd) return new NextResponse(null, { status: 204 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const eventName = typeof body.event_name === "string" ? body.event_name : "";
  const eventId = typeof body.event_id === "string" ? body.event_id.slice(0, 100) : "";
  if (!ALLOWED_EVENTS.has(eventName) || !eventId) return new NextResponse(null, { status: 400 });

  const sourceUrl =
    typeof body.event_source_url === "string" && body.event_source_url.startsWith(`https://${PROD_HOST}`)
      ? body.event_source_url.slice(0, 1000)
      : `https://${PROD_HOST}/`;

  const user = (body.user && typeof body.user === "object" ? body.user : {}) as Record<string, unknown>;
  const userData: Record<string, unknown> = {
    client_ip_address: clientIp(req),
    client_user_agent: req.headers.get("user-agent") || undefined,
    fbp: req.cookies.get("_fbp")?.value,
    fbc: req.cookies.get("_fbc")?.value,
  };
  const email = norm(user.email, 254);
  const phone = normPhone(user.phone);
  const fn = norm(user.firstName, 100);
  const ln = norm(user.lastName, 100);
  const externalId = typeof user.externalId === "string" ? user.externalId.trim().slice(0, 100) : "";
  if (email) userData.em = [sha256(email)];
  if (phone) userData.ph = [sha256(phone)];
  if (fn) userData.fn = [sha256(fn)];
  if (ln) userData.ln = [sha256(ln)];
  if (externalId) userData.external_id = [sha256(externalId)];
  if (email || phone) userData.country = [sha256("bd")];

  const customData =
    body.custom_data && typeof body.custom_data === "object" && !Array.isArray(body.custom_data)
      ? (body.custom_data as Record<string, unknown>)
      : {};

  const event = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    event_source_url: sourceUrl,
    action_source: "website",
    user_data: Object.fromEntries(Object.entries(userData).filter(([, v]) => v !== undefined)),
    custom_data: customData,
  };

  const payload: Record<string, unknown> = { data: [event] };
  // Lets events show under Events Manager > Test events while verifying.
  const testCode = process.env.META_CAPI_TEST_EVENT_CODE?.trim();
  if (testCode) payload.test_event_code = testCode;

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!res.ok) console.error("meta capi", res.status, (await res.text()).slice(0, 300));
  } catch (err) {
    console.error("meta capi failed", err instanceof Error ? err.message : err);
  }
  // The browser doesn't need to know how Meta answered.
  return new NextResponse(null, { status: 204 });
}
