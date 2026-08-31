/**
 * Shared fetch for the landing site. Lead funnel calls live in lib/leads.ts
 * and send a lead_token, never the dashboard's real access token.
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
      detail.code === "recaptcha_challenge_required"
    ) {
      throw new RecaptchaChallengeRequiredError(
        detail.message || "Additional verification required.",
      );
    }
    const message = typeof detail === "string" ? detail : detail?.message;
    throw new Error(message || `Request failed (${res.status})`);
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
