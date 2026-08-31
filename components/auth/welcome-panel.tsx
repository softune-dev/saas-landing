"use client";

import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DASHBOARD_URL } from "@/lib/site";
import { MaskIcon } from "@/components/ui/mask-icon";
import {
  getLeadToken,
  requestDemoAccess,
  requestPurchase,
  storeDashboardSession,
} from "@/lib/leads";
import {
  AuthShell,
  outlineBtnClass,
  primaryBtnClass,
} from "./auth-shell";

const DASHBOARD_IMAGE = { dark: "/dashboard-d.webp", light: "/dashboard-l.webp" };
const WHATSAPP_NUMBER = "8801831624571";

export function WelcomePanel() {
  const router = useRouter();
  const [demoBusy, setDemoBusy] = useState(false);
  const [purchaseBusy, setPurchaseBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [purchaseSent, setPurchaseSent] = useState(false);

  useEffect(() => {
    if (!getLeadToken()) router.replace("/signup");
  }, [router]);

  async function handleDemo() {
    setError(null);
    setDemoBusy(true);
    // Opened synchronously, inside the click handler, before any await —
    // window.open() after an await loses the "real user gesture" browsers
    // require and gets silently popup-blocked (confirmed: the API call
    // succeeded but no tab appeared). Blank tab now, real URL once the
    // token is ready. Deliberately no "noopener" — we need the reference
    // back to set .location; dashboard.softunebd.com is our own app, not
    // third-party content, so the usual reverse-tabnabbing risk doesn't
    // apply here.
    const newTab = window.open("", "_blank");
    try {
      const out = await requestDemoAccess();
      storeDashboardSession(out.access_token, out.refresh_token);
      const hash = new URLSearchParams({
        softune_at: out.access_token,
        softune_rt: out.refresh_token,
      }).toString();
      const url = `${DASHBOARD_URL}/#${hash}`;
      if (newTab) {
        newTab.location.href = url;
      } else {
        // The synchronous open itself was blocked too — fall back to a
        // same-tab redirect rather than leaving the lead with nothing.
        window.location.assign(url);
      }
    } catch (err) {
      newTab?.close();
      setError(err instanceof Error ? err.message : "Couldn't open demo");
    } finally {
      setDemoBusy(false);
    }
  }

  async function handlePurchase(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPurchaseBusy(true);
    try {
      const out = await requestPurchase(message.trim() || undefined);
      setPurchaseSent(out.sent);
      setWhatsappUrl(out.whatsapp_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send request");
    } finally {
      setPurchaseBusy(false);
    }
  }

  return (
    <AuthShell
      title="You're in"
      subtitle="Look around a live demo, review pricing, or tell us you want a store of your own."
      maxWidth="max-w-7xl"
      image={DASHBOARD_IMAGE}
    >
      <div className="mt-8 flex flex-col gap-5">
        {error ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-400">
            {error}
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleDemo}
          disabled={demoBusy || purchaseBusy}
          className={primaryBtnClass}
        >
          {demoBusy ? (
            <>
              <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Opening demo...
            </>
          ) : (
            <>
              See a live demo
              <MaskIcon src="/icons/arrow-link.svg" className="size-4 text-white" />
            </>
          )}
        </button>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <a href="/pricing" className={outlineBtnClass}>
            View pricing
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to set up a Softune store.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <MaskIcon src="/icons/whatsapp.svg" className="size-4 text-white" />
            WhatsApp
          </a>
          <a
            href="mailto:support@softunebd.com"
            className={outlineBtnClass}
          >
            <Mail className="size-4 text-primary" strokeWidth={2} />
            Email us
          </a>
        </div>

        {purchaseSent ? (
          <p className="rounded-lg border border-border bg-search-bg p-3 text-sm text-foreground">
            We got your request. Someone from Softune will follow up.
          </p>
        ) : (
          <form onSubmit={handlePurchase} className="flex flex-col gap-3 pt-2">
            <label
              htmlFor="purchase-message"
              className="text-sm font-medium text-foreground"
            >
              Request to purchase
            </label>
            <textarea
              id="purchase-message"
              rows={3}
              maxLength={1000}
              placeholder="Anything we should know? (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[88px] w-full resize-y rounded-lg border border-border bg-search-bg px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-soft focus:border-primary focus:bg-surface"
            />
            <button
              type="submit"
              disabled={purchaseBusy || demoBusy}
              className={outlineBtnClass}
            >
              {purchaseBusy ? "Sending..." : "Request to purchase"}
            </button>
          </form>
        )}

        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={primaryBtnClass}
          >
            <MaskIcon src="/icons/whatsapp.svg" className="size-4 text-white" />
            Continue on WhatsApp
          </a>
        ) : null}
      </div>
    </AuthShell>
  );
}
