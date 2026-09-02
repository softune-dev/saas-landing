/**
 * Shared fetch for the landing site. Trial signup calls live in
 * lib/trial.ts — unauthenticated (a signup_token travels in the request
 * body, not a header) until POST /trial/complete returns real dashboard
 * tokens.
 */

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/** Backend asked for a v2 checkbox after v3 scored too low. */
export class RecaptchaChallengeRequiredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RecaptchaChallengeRequiredError";
  }
}

/** Failed API call with status + FastAPI `detail` so callers can tell a
 * 422 password-rule miss from a 409 email-taken, instead of flattening
 * everything to `Error.message`. */
export class ApiError extends Error {
  status: number;
  detail: unknown;
  constructor(status: number, detail: unknown, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

function messageFromDetail(detail: unknown, status: number): string {
  if (typeof detail === "string") return detail;
  if (
    detail &&
    typeof detail === "object" &&
    "message" in detail &&
    typeof (detail as { message: unknown }).message === "string"
  ) {
    return (detail as { message: string }).message;
  }
  if (Array.isArray(detail)) {
    const msgs = detail
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const raw = (item as { msg?: unknown }).msg;
        if (typeof raw !== "string") return null;
        return raw.replace(/^Value error,\s*/i, "");
      })
      .filter((m): m is string => Boolean(m));
    if (msgs.length) return msgs.join(" ");
  }
  return `Request failed (${status})`;
}

/** FastAPI 422 whose loc points at `password` — TrialStartIn strength
 * rules or the min_length=8 field. Other 422s (email, phone) stay false. */
export function isPassword422(err: unknown): boolean {
  if (!(err instanceof ApiError) || err.status !== 422) return false;
  if (Array.isArray(err.detail)) {
    return err.detail.some((item) => {
      if (!item || typeof item !== "object") return false;
      const loc = (item as { loc?: unknown }).loc;
      return Array.isArray(loc) && loc.includes("password");
    });
  }
  return typeof err.detail === "string" && /password/i.test(err.detail);
}

export async function request<T>(
  path: string,
  init?: RequestInit & { leadToken?: string | null },
): Promise<T> {
  const { leadToken, headers: extraHeaders, ...rest } = init ?? {};
  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(leadToken ? { Authorization: `Bearer ${leadToken}` } : {}),
      ...extraHeaders,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const detail = body.detail;
    if (
      detail &&
      typeof detail === "object" &&
      !Array.isArray(detail) &&
      (detail as { code?: unknown }).code === "recaptcha_challenge_required"
    ) {
      throw new RecaptchaChallengeRequiredError(
        (detail as { message?: string }).message ||
          "Additional verification required.",
      );
    }
    throw new ApiError(
      res.status,
      detail,
      messageFromDetail(detail, res.status),
    );
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export type PlatformContactIn = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  message: string;
  recaptcha_token: string;
  recaptcha_v2_token: string;
};

export async function submitPlatformContact(
  data: PlatformContactIn,
): Promise<void> {
  await request<void>("/public/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
