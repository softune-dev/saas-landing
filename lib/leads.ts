/**
 * Lead funnel client — POST/PATCH /leads/*. A lead_token is not a
 * dashboard session; it only works on these six routes.
 */

import { request } from "./api";

const LEAD_TOKEN_KEY = "softune.lead.token";
const AUTH_TOKEN_KEY = "softune.auth.token";
const AUTH_REFRESH_KEY = "softune.auth.refreshToken";
const AUTH_PERSIST_KEY = "softune.auth.persist";

export type LeadStatus =
  | "signed_up"
  | "otp_verified"
  | "profile_complete"
  | string;

export type LeadTokenOut = {
  lead_token: string;
  status: LeadStatus;
};

export type LeadDemoAccessOut = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type LeadPurchaseRequestOut = {
  sent: boolean;
  whatsapp_url: string | null;
};

export type LeadMeOut = {
  email: string;
  full_name: string | null;
  phone: string | null;
  shop_name: string | null;
  shop_category: string | null;
  status: LeadStatus;
};

/** Which page a lead_token holder should land on, given their current
 * funnel status — used to resume someone who signed up earlier, closed
 * the tab, and came back later (see getLeadMe/resumeLeadPath). */
export function resumeLeadPath(status: LeadStatus): string {
  if (status === "signed_up") return "/verify-otp";
  if (status === "otp_verified") return "/basics";
  return "/welcome"; // profile_complete, demo_accessed, purchase_requested
}

export function getLeadToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LEAD_TOKEN_KEY);
}

export function setLeadToken(token: string) {
  localStorage.setItem(LEAD_TOKEN_KEY, token);
}

export function clearLeadToken() {
  localStorage.removeItem(LEAD_TOKEN_KEY);
}

/** Called on /signup load to resume an existing funnel instead of
 * restarting it — a lead who signed up, closed the tab, and clicked "Get
 * started" again later should land back where they left off, not redo
 * signup/OTP. Returns null (and clears the stale token) if it's missing,
 * expired, or the lead_token's own 7-day expiry has passed — "within a
 * time" is enforced server-side by that token TTL, not here. */
export async function getLeadMe(): Promise<LeadMeOut | null> {
  const token = getLeadToken();
  if (!token) return null;
  try {
    return await request<LeadMeOut>("/leads/me", { leadToken: token });
  } catch {
    clearLeadToken();
    return null;
  }
}

function requireLeadToken(): string {
  const token = getLeadToken();
  if (!token) throw new Error("Session expired. Please sign up again.");
  return token;
}

export async function loginLead(data: {
  email: string;
  password: string;
  recaptcha_token: string;
  recaptcha_v2_token: string;
}): Promise<LeadTokenOut> {
  const out = await request<LeadTokenOut>("/leads/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
  setLeadToken(out.lead_token);
  return out;
}

export async function signupLead(data: {
  email: string;
  password: string;
  full_name?: string;
  recaptcha_token: string;
  recaptcha_v2_token: string;
}): Promise<LeadTokenOut> {
  const out = await request<LeadTokenOut>("/leads/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
  setLeadToken(out.lead_token);
  return out;
}

export async function resendOtp(): Promise<LeadTokenOut> {
  const out = await request<LeadTokenOut>("/leads/resend-otp", {
    method: "POST",
    leadToken: requireLeadToken(),
  });
  setLeadToken(out.lead_token);
  return out;
}

export async function verifyOtp(otp: string): Promise<LeadTokenOut> {
  const out = await request<LeadTokenOut>("/leads/verify-otp", {
    method: "POST",
    leadToken: requireLeadToken(),
    body: JSON.stringify({ otp }),
  });
  setLeadToken(out.lead_token);
  return out;
}

export async function updateLeadProfile(data: {
  full_name?: string;
  phone?: string;
  shop_name?: string;
  shop_category?: string;
}): Promise<LeadTokenOut> {
  const out = await request<LeadTokenOut>("/leads/profile", {
    method: "PATCH",
    leadToken: requireLeadToken(),
    body: JSON.stringify(data),
  });
  setLeadToken(out.lead_token);
  return out;
}

export async function requestDemoAccess(): Promise<LeadDemoAccessOut> {
  return request<LeadDemoAccessOut>("/leads/demo-access", {
    method: "POST",
    leadToken: requireLeadToken(),
  });
}

export async function requestPurchase(
  message?: string,
): Promise<LeadPurchaseRequestOut> {
  return request<LeadPurchaseRequestOut>("/leads/purchase-request", {
    method: "POST",
    leadToken: requireLeadToken(),
    body: JSON.stringify({ message: message || undefined }),
  });
}

/** Same keys the dashboard login writes, plus a hash handoff so a
 * cross-subdomain redirect to dashboard.softunebd.com can pick them up. */
export function storeDashboardSession(
  accessToken: string,
  refreshToken: string,
) {
  localStorage.setItem(AUTH_PERSIST_KEY, "1");
  localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
  localStorage.setItem(AUTH_REFRESH_KEY, refreshToken);
}
