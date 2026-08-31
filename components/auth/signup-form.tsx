"use client";

import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RecaptchaChallengeRequiredError } from "@/lib/api";
import { getRecaptchaToken, hasV2Fallback } from "@/lib/recaptcha";
import { getLeadMe, resumeLeadPath, signupLead } from "@/lib/leads";
import { PasswordStrength } from "./password-strength";
import { RecaptchaDisclosure } from "./recaptcha-disclosure";
import {
  RecaptchaV2Fallback,
  type RecaptchaV2FallbackHandle,
} from "./recaptcha-v2-fallback";
import { AuthShell, fieldClass, primaryBtnClass } from "./auth-shell";

export function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [needsChallenge, setNeedsChallenge] = useState(false);
  const [v2Token, setV2Token] = useState<string | null>(null);
  const [checkingResume, setCheckingResume] = useState(true);
  const v2Ref = useRef<RecaptchaV2FallbackHandle>(null);

  // Resume an existing funnel instead of restarting it — a lead who signed
  // up earlier, closed the tab, and clicked "Get started" again shouldn't
  // redo signup/OTP. See lib/leads.ts's getLeadMe/resumeLeadPath.
  useEffect(() => {
    let cancelled = false;
    getLeadMe().then((me) => {
      if (cancelled) return;
      if (me) {
        router.replace(resumeLeadPath(me.status));
      } else {
        setCheckingResume(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    setBusy(true);
    try {
      const recaptchaToken = await getRecaptchaToken("lead_signup");
      await signupLead({
        email: email.trim(),
        password,
        full_name: fullName.trim() || undefined,
        recaptcha_token: recaptchaToken,
        recaptcha_v2_token: v2Token ?? "",
      });
      router.push("/verify-otp");
    } catch (err) {
      if (err instanceof RecaptchaChallengeRequiredError) {
        setNeedsChallenge(true);
        setError(hasV2Fallback ? null : err.message);
      } else {
        setError(err instanceof Error ? err.message : "Couldn't create account");
        v2Ref.current?.reset();
      }
      setBusy(false);
    }
  }

  // Avoid flashing the signup form for the instant it takes to confirm
  // there's no existing (or an expired) lead session to resume.
  if (checkingResume) return null;

  return (
    <AuthShell
      title="Create your Softune account"
      subtitle="A few details now. We'll email you a code to continue."
    >
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2.5">
          <label htmlFor="signup-name" className="text-sm font-medium text-foreground">
            Full name
          </label>
          <div className="relative">
            <User
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
              strokeWidth={2}
            />
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="signup-email" className="text-sm font-medium text-foreground">
            Email Address
          </label>
          <div className="relative">
            <User
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
              strokeWidth={2}
            />
            <input
              id="signup-email"
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
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </label>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
              strokeWidth={2}
            />
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
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
          <PasswordStrength password={password} />
        </div>

        <div className="flex flex-col gap-2.5">
          <label
            htmlFor="signup-confirm-password"
            className="text-sm font-medium text-foreground"
          >
            Confirm password
          </label>
          <div className="relative">
            <Lock
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
              strokeWidth={2}
            />
            <input
              id="signup-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-11 w-full rounded-lg border border-border bg-search-bg pr-10 pl-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-soft focus:border-primary focus:bg-surface"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-muted transition-colors hover:text-foreground"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {confirmPassword && confirmPassword !== password ? (
            <p className="text-xs text-rose-500">Passwords don't match.</p>
          ) : null}
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
              Creating account...
            </>
          ) : (
            "Get started"
          )}
        </button>

        <RecaptchaDisclosure />

        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </AuthShell>
  );
}
