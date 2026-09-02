"use client";

import { Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { RecaptchaChallengeRequiredError } from "@/lib/api";
import { getRecaptchaToken, hasV2Fallback } from "@/lib/recaptcha";
import { DASHBOARD_URL } from "@/lib/site";
import { requestDemoAccess, storeDashboardSession } from "@/lib/trial";
import { useToast } from "@/components/ui/toast";
import { fieldClass } from "./auth/auth-shell";
import { RecaptchaDisclosure } from "./auth/recaptcha-disclosure";
import {
  RecaptchaV2Fallback,
  type RecaptchaV2FallbackHandle,
} from "./auth/recaptcha-v2-fallback";

type DemoAccessModalProps = {
  open: boolean;
  onClose: () => void;
};

/** Email-gated demo: one field, recaptcha, then the same hash-handoff the
 * old one-click button used. Not the trial wizard — no password, no OTP. */
export function DemoAccessModal({ open, onClose }: DemoAccessModalProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [needsChallenge, setNeedsChallenge] = useState(false);
  const [v2Token, setV2Token] = useState<string | null>(null);
  const v2Ref = useRef<RecaptchaV2FallbackHandle>(null);

  useEffect(() => {
    if (!open) return;
    setEmail("");
    setBusy(false);
    setNeedsChallenge(false);
    setV2Token(null);
  }, [open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    // Opened synchronously, inside the click handler, before any await —
    // window.open() after an await loses the "real user gesture" browsers
    // require and gets silently popup-blocked.
    const newTab = window.open("", "_blank");
    try {
      const recaptchaToken = await getRecaptchaToken("demo_access");
      const out = await requestDemoAccess({
        email: email.trim(),
        recaptcha_token: recaptchaToken,
        recaptcha_v2_token: v2Token ?? "",
      });
      storeDashboardSession(out.access_token, out.refresh_token);
      const hash = new URLSearchParams({
        softune_at: out.access_token,
        softune_rt: out.refresh_token,
      }).toString();
      const url = `${DASHBOARD_URL}/#${hash}`;
      if (newTab) {
        newTab.location.href = url;
      } else {
        window.location.assign(url);
      }
      onClose();
    } catch (err) {
      newTab?.close();
      if (err instanceof RecaptchaChallengeRequiredError) {
        setNeedsChallenge(true);
        if (!hasV2Fallback) {
          toast({
            title: err.message || "Couldn't verify you're human",
            variant: "error",
          });
        }
      } else {
        v2Ref.current?.reset();
        toast({
          title: err instanceof Error ? err.message : "Couldn't open demo",
          variant: "error",
        });
      }
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label="Dismiss"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 dark:bg-black/70"
            onClick={busy ? undefined : onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="See a live demo"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-surface p-5 text-left shadow-xl dark:border-white/10"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <label htmlFor="demo-email" className="flex flex-col gap-2">
                <span className="text-sm font-medium text-foreground">Email</span>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
                    strokeWidth={2}
                  />
                  <input
                    id="demo-email"
                    type="email"
                    required
                    autoFocus
                    autoComplete="email"
                    placeholder="you@shop.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldClass}
                  />
                </div>
              </label>

              {needsChallenge && hasV2Fallback ? (
                <RecaptchaV2Fallback ref={v2Ref} onVerify={setV2Token} />
              ) : null}

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={onClose}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-border bg-surface text-sm font-semibold text-foreground transition-colors hover:bg-search-bg disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={busy || (needsChallenge && !v2Token)}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-white transition-opacity hover:opacity-95 disabled:opacity-60"
                >
                  {busy ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Opening...
                    </>
                  ) : (
                    "Open demo"
                  )}
                </button>
              </div>
              <RecaptchaDisclosure />
            </form>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
