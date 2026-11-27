"use client";

import { Eye, EyeOff } from "lucide-react";
import type { FormEvent, RefObject } from "react";
import { FcGoogle } from "react-icons/fc";
import { DASHBOARD_URL } from "@/lib/site";
import { GoogleSignIn } from "../google-sign-in";
import { OTP_LENGTH, OtpBoxes } from "../otp-boxes";
import { PasswordStrength } from "../password-strength";
import { RecaptchaDisclosure } from "../recaptcha-disclosure";
import { RecaptchaV2Fallback, type RecaptchaV2FallbackHandle } from "../recaptcha-v2-fallback";
import { t, type Locale } from "./signup-copy";
import { ErrorBox, Heading, PrimaryButton, TextInput } from "./signup-ui";

export type Account = { fullName: string; email: string; password: string };

/** First screen: Google, or an email address. */
export function EmailStep({
  locale,
  email,
  error,
  isPreview,
  onEmail,
  onGoogle,
  onNext,
}: {
  locale: Locale;
  email: string;
  error: string | null;
  isPreview: boolean;
  onEmail: (v: string) => void;
  onGoogle: (credential: string) => void;
  onNext: () => void;
}) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <Heading title={L("Create your free store", "ফ্রি স্টোর খুলুন")} />
      <div className="mt-3">
        {isPreview ? (
          // The real button comes from Google and needs the live API, so the
          // preview draws a stand-in to show the finished screen.
          <div className="flex flex-col gap-3">
            <button type="button" className="flex h-[52px] w-full items-center justify-center gap-3 rounded-full border border-line text-base font-bold text-ink">
              <FcGoogle aria-hidden className="size-5" />
              {L("Continue with Google", "Google দিয়ে চালিয়ে যান")}
            </button>
            <p className="flex items-center gap-3 text-xs font-medium text-muted-soft">
              <span className="h-px flex-1 bg-line" />
              {L("or", "অথবা")}
              <span className="h-px flex-1 bg-line" />
            </p>
          </div>
        ) : (
          <GoogleSignIn onCredential={onGoogle} orLabel={L("or", "অথবা")} />
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        className="flex flex-col gap-3"
      >
        {/* No autofocus: a keyboard opening on arrival would hide Google. */}
        <TextInput label={L("Email address", "ইমেইল ঠিকানা")} type="email" required autoComplete="email" inputMode="email" value={email} onChange={(e) => onEmail(e.target.value)} />
        <ErrorBox message={error} />
        <PrimaryButton>{L("Continue", "চালিয়ে যান")}</PrimaryButton>
      </form>
      <p className="text-center text-sm text-muted">
        {L("Have an account? ", "একাউন্ট আছে? ")}
        <a href={DASHBOARD_URL} className="font-bold text-ink underline-offset-4 hover:underline">
          {L("Sign in", "সাইন ইন")}
        </a>
      </p>
    </div>
  );
}

/** Second screen: name and password, which also creates the pending account. */
export function PasswordStep({
  locale,
  value,
  busy,
  error,
  showPassword,
  needsChallenge,
  hasV2Fallback,
  v2Token,
  v2Ref,
  onChange,
  onTogglePassword,
  onV2Verify,
  onSubmit,
}: {
  locale: Locale;
  value: Account;
  busy: boolean;
  error: string | null;
  showPassword: boolean;
  needsChallenge: boolean;
  hasV2Fallback: boolean;
  v2Token: string | null;
  v2Ref: RefObject<RecaptchaV2FallbackHandle | null>;
  onChange: (patch: Partial<Account>) => void;
  onTogglePassword: () => void;
  onV2Verify: (token: string | null) => void;
  onSubmit: (e: FormEvent) => void;
}) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="mb-3">
        <Heading title={L("Almost done", "প্রায় হয়ে গেছে")} sub={<span className="break-all">{value.email}</span>} />
      </div>
      <TextInput label={L("Your name", "আপনার নাম")} required autoFocus autoComplete="name" value={value.fullName} onChange={(e) => onChange({ fullName: e.target.value })} />
      <TextInput
        label={L("Create a password", "পাসওয়ার্ড দিন")}
        type={showPassword ? "text" : "password"}
        required
        minLength={8}
        autoComplete="new-password"
        value={value.password}
        onChange={(e) => onChange({ password: e.target.value })}
        trailing={
          <button
            type="button"
            onClick={onTogglePassword}
            aria-label={showPassword ? L("Hide password", "পাসওয়ার্ড লুকান") : L("Show password", "পাসওয়ার্ড দেখান")}
            className="-mr-2 shrink-0 rounded-lg p-2 text-muted transition-colors hover:text-ink"
          >
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        }
      />
      <PasswordStrength password={value.password} locale={locale} />
      {needsChallenge && hasV2Fallback ? <RecaptchaV2Fallback ref={v2Ref} onVerify={onV2Verify} /> : null}
      <ErrorBox message={error} />
      <PrimaryButton busy={busy} disabled={needsChallenge && !v2Token}>
        {L("Create account", "একাউন্ট তৈরি করুন")}
      </PrimaryButton>
      <RecaptchaDisclosure />
    </form>
  );
}

export function VerifyStep({
  locale,
  email,
  digits,
  busy,
  resending,
  resent,
  error,
  onDigits,
  onSubmit,
  onResend,
  onChangeEmail,
}: {
  locale: Locale;
  email: string;
  digits: string[];
  busy: boolean;
  resending: boolean;
  resent: boolean;
  error: string | null;
  onDigits: (next: string[]) => void;
  onSubmit: (e: FormEvent) => void;
  onResend: () => void;
  onChangeEmail: () => void;
}) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-5 text-center">
      <Heading title={L("Enter the code", "কোডটি দিন")} sub={<span className="break-all">{email}</span>} />
      <div className="mt-2 flex w-full justify-center">
        <OtpBoxes value={digits} onChange={onDigits} disabled={busy} />
      </div>
      <ErrorBox message={error} />
      <PrimaryButton busy={busy} disabled={digits.join("").length !== OTP_LENGTH}>
        {L("Verify", "যাচাই করুন")}
      </PrimaryButton>
      <div className="flex items-center gap-4 text-sm font-semibold" aria-live="polite">
        <button type="button" onClick={onResend} disabled={resending || busy} className="text-ink hover:underline disabled:opacity-50">
          {resending ? L("Sending...", "পাঠানো হচ্ছে...") : resent ? L("Sent again", "আবার পাঠানো হয়েছে") : L("Resend code", "কোড আবার পাঠান")}
        </button>
        <span aria-hidden className="h-4 w-px bg-line" />
        <button type="button" onClick={onChangeEmail} disabled={busy} className="text-muted hover:underline">
          {L("Change email", "ইমেইল বদলান")}
        </button>
      </div>
    </form>
  );
}
