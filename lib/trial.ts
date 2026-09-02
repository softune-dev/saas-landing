/**
 * Self-serve trial signup client — POST/PATCH /trial/*, plus the
 * decoupled public demo button (POST /public/demo-access). Replaces
 * lib/leads.ts: there is no lead_token here, no staging DB row. A
 * `signup_token` is an opaque Redis-backed reference (see app/api/
 * trial.py) that only ever proves "this browser is partway through this
 * one signup" — it stops mattering the moment POST /trial/complete
 * succeeds and returns real dashboard tokens.
 */

import { request } from "./api";

const AUTH_TOKEN_KEY = "softune.auth.token";
const AUTH_REFRESH_KEY = "softune.auth.refreshToken";
const AUTH_PERSIST_KEY = "softune.auth.persist";
const SIGNUP_TOKEN_KEY = "softune.trial.signupToken";

export type TrialSignupTokenOut = {
  signup_token: string;
  email_verified: boolean;
};

export type TrialTokensOut = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
};

export type TrialStatusOut = {
  signup_token: string;
  email: string;
  full_name: string | null;
  email_verified: boolean;
  shop_name: string | null;
  phone: string | null;
  tagline: string | null;
  category: string | null;
};

/** Which wizard step a signup_token holder should land on, given their
 * resumed state — mirrors the old lead funnel's resumeLeadPath, adapted to
 * this token model. Not verified -> OTP step; verified but no shop yet ->
 * shop-basics step; both done -> theme step (the only one left before
 * submit, since theme is never persisted server-side). */
export function resumeTrialStep(
  status: TrialStatusOut,
): "otp" | "details" | "theme" {
  if (!status.email_verified) return "otp";
  if (!status.shop_name) return "details";
  return "theme";
}

export function getStoredSignupToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SIGNUP_TOKEN_KEY);
}

function setStoredSignupToken(token: string) {
  localStorage.setItem(SIGNUP_TOKEN_KEY, token);
}

export function clearStoredSignupToken() {
  localStorage.removeItem(SIGNUP_TOKEN_KEY);
}

/** Called on the wizard's mount to resume an interrupted signup instead of
 * restarting at Account every time — e.g. someone who verified their OTP,
 * closed the tab (plausible mid-flow: checking email for the code IS
 * leaving the tab), and clicked "Get Started" again later. Returns null
 * (and clears the stale token) if there's nothing to resume — expired,
 * never existed, or no token stored at all. */
export async function getTrialSignupStatus(): Promise<TrialStatusOut | null> {
  const token = getStoredSignupToken();
  if (!token) return null;
  try {
    return await request<TrialStatusOut>(`/trial/status/${token}`);
  } catch {
    clearStoredSignupToken();
    return null;
  }
}

export async function startTrialSignup(data: {
  email: string;
  password: string;
  full_name?: string;
  recaptcha_token: string;
  recaptcha_v2_token: string;
}): Promise<TrialSignupTokenOut> {
  const out = await request<TrialSignupTokenOut>("/trial/start", {
    method: "POST",
    body: JSON.stringify(data),
  });
  setStoredSignupToken(out.signup_token);
  return out;
}

export async function resendTrialOtp(
  signupToken: string,
): Promise<TrialSignupTokenOut> {
  return request<TrialSignupTokenOut>("/trial/resend-otp", {
    method: "POST",
    body: JSON.stringify({ signup_token: signupToken }),
  });
}

export async function verifyTrialOtp(
  signupToken: string,
  otp: string,
): Promise<TrialSignupTokenOut> {
  return request<TrialSignupTokenOut>("/trial/verify-otp", {
    method: "POST",
    body: JSON.stringify({ signup_token: signupToken, otp }),
  });
}

export async function updateTrialDetails(data: {
  signup_token: string;
  shop_name: string;
  phone?: string;
  tagline?: string;
  category?: string;
}): Promise<TrialSignupTokenOut> {
  return request<TrialSignupTokenOut>("/trial/details", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function completeTrialSignup(data: {
  signup_token: string;
  template_key: string;
  theme?: { primary_color?: string; font?: string; body_font?: string };
}): Promise<TrialTokensOut> {
  const out = await request<TrialTokensOut>("/trial/complete", {
    method: "POST",
    body: JSON.stringify(data),
  });
  // Real account exists now — this token stops mattering, and Redis has
  // already dropped its own copy server-side.
  clearStoredSignupToken();
  return out;
}

export type ProvisionStatusOut = {
  published: boolean;
  domain_attached: boolean | null;
};

/** Tenant's sites — a trial account has exactly one. Used only to get
 * `site_id` for provision-status; /trial/complete returns tokens, not the
 * site. */
export async function listTrialSites(
  accessToken: string,
): Promise<{ items: { id: string }[] }> {
  return request<{ items: { id: string }[] }>("/sites?limit=1", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

/** Polled after trial complete. domain_attached is the only async bit —
 * published is already true by the time tokens exist. */
export async function getProvisionStatus(
  accessToken: string,
  siteId: string,
): Promise<ProvisionStatusOut> {
  return request<ProvisionStatusOut>(`/sites/${siteId}/provision-status`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

/** A shared, read-only account to click around in — no signup, no
 * password. Still requires a real email first (recaptcha-gated, same
 * pattern as trial signup): see app/api/public.py's demo_access, which
 * records it in demo_access_requests for outreach and rate-limits both by
 * IP and by email so a burst of different emails from one browser (or one
 * email replayed from many IPs) gets cut off. */
export async function requestDemoAccess(data: {
  email: string;
  recaptcha_token: string;
  recaptcha_v2_token: string;
}): Promise<TrialTokensOut> {
  return request<TrialTokensOut>("/public/demo-access", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/** Same keys the dashboard's own login writes, plus a hash handoff so a
 * cross-subdomain redirect to dashboard.softunebd.com can pick them up. */
export function storeDashboardSession(
  accessToken: string,
  refreshToken: string,
) {
  localStorage.setItem(AUTH_PERSIST_KEY, "1");
  localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
  localStorage.setItem(AUTH_REFRESH_KEY, refreshToken);
}
