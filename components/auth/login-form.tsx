"use client";

import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { RecaptchaChallengeRequiredError } from "@/lib/api";
import { getRecaptchaToken, hasV2Fallback } from "@/lib/recaptcha";
import { loginLead, resumeLeadPath } from "@/lib/leads";
import { RecaptchaDisclosure } from "./recaptcha-disclosure";
import {
  RecaptchaV2Fallback,
  type RecaptchaV2FallbackHandle,
} from "./recaptcha-v2-fallback";
import { AuthShell, fieldClass, primaryBtnClass } from "./auth-shell";

/** Recovery path back into the lead funnel — not a real account login, see
 * app/api/leads.py's own module docstring on why this exists alongside
 * signup rather than instead of it. */
export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [needsChallenge, setNeedsChallenge] = useState(false);
  const [v2Token, setV2Token] = useState<string | null>(null);
  const v2Ref = useRef<RecaptchaV2FallbackHandle>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const recaptchaToken = await getRecaptchaToken("lead_login");
      const out = await loginLead({
        email: email.trim(),
        password,
        recaptcha_token: recaptchaToken,
        recaptcha_v2_token: v2Token ?? "",
      });
      router.push(resumeLeadPath(out.status));
    } catch (err) {
      if (err instanceof RecaptchaChallengeRequiredError) {
        setNeedsChallenge(true);
        setError(hasV2Fallback ? null : err.message);
      } else {
        setError(err instanceof Error ? err.message : "Couldn't sign in");
        v2Ref.current?.reset();
      }
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Sign in"
      subtitle="Continue where you left off — pick up your demo, pricing, or purchase request."
    >
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2.5">
          <label htmlFor="login-email" className="text-sm font-medium text-foreground">
            Email Address
          </label>
          <div className="relative">
            <User
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
              strokeWidth={2}
            />
            <input
              id="login-email"
              type="email"
              required
              autoFocus
              autoComplete="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="login-password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
              strokeWidth={2}
            />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-lg border border-border bg-search-bg pr-10 pl-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-soft focus:border-primary focus:bg-surface"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-muted transition-colors hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {error ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-400">
            {error}
          </div>
        ) : null}

        {needsChallenge && hasV2Fallback ? (
          <RecaptchaV2Fallback ref={v2Ref} onVerify={setV2Token} />
        ) : null}

        <button
          type="submit"
          disabled={busy || (needsChallenge && !v2Token)}
          className={primaryBtnClass}
        >
          {busy ? (
            <>
              <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>

        <RecaptchaDisclosure />

        <p className="text-center text-sm text-muted">
          New here?{" "}
          <a href="/signup" className="font-medium text-primary hover:underline">
            Create an account
          </a>
        </p>
      </form>
    </AuthShell>
  );
}
