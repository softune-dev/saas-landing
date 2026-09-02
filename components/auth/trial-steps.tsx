"use client";

import { Building2, Check, ChevronDown, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { fieldClass, primaryBtnClass } from "./auth-shell";
import { OTP_LENGTH, OtpBoxes } from "./otp-boxes";
import { PasswordStrength } from "./password-strength";
import { RecaptchaDisclosure } from "./recaptcha-disclosure";
import {
  RecaptchaV2Fallback,
  type RecaptchaV2FallbackHandle,
} from "./recaptcha-v2-fallback";

export const BD_PHONE_RE = /^01[3-9]\d{8}$/;

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

const iconClass =
  "pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted";
const passwordInputClass =
  "h-11 w-full rounded-lg border border-border bg-search-bg pr-10 pl-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-soft focus:border-primary focus:bg-surface";

type AccountStepProps = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  busy: boolean;
  needsChallenge: boolean;
  hasV2Fallback: boolean;
  v2Token: string | null;
  v2Ref: RefObject<RecaptchaV2FallbackHandle | null>;
  onFullName: (v: string) => void;
  onEmail: (v: string) => void;
  onPassword: (v: string) => void;
  onConfirmPassword: (v: string) => void;
  onTogglePassword: () => void;
  onToggleConfirm: () => void;
  onV2Verify: (token: string | null) => void;
  onSubmit: (e: FormEvent) => void;
};

export function AccountStep(props: AccountStepProps) {
  const mismatch =
    props.confirmPassword.length > 0 && props.confirmPassword !== props.password;

  return (
    <form onSubmit={props.onSubmit} className="mt-6 flex flex-col gap-4">
      <Field id="signup-name" label="Full name">
        <div className="relative">
          <User className={iconClass} strokeWidth={2} />
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={props.fullName}
            onChange={(e) => props.onFullName(e.target.value)}
            className={fieldClass}
          />
        </div>
      </Field>

      <Field id="signup-email" label="Email Address">
        <div className="relative">
          <Mail className={iconClass} strokeWidth={2} />
          <input
            id="signup-email"
            type="email"
            required
            autoFocus
            autoComplete="email"
            placeholder="name@company.com"
            value={props.email}
            onChange={(e) => props.onEmail(e.target.value)}
            className={fieldClass}
          />
        </div>
      </Field>

      <Field id="signup-password" label="Password">
        <div className="relative">
          <Lock className={iconClass} strokeWidth={2} />
          <input
            id="signup-password"
            type={props.showPassword ? "text" : "password"}
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="••••••••"
            value={props.password}
            onChange={(e) => props.onPassword(e.target.value)}
            className={passwordInputClass}
          />
          <button
            type="button"
            onClick={props.onTogglePassword}
            className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-muted transition-colors hover:text-foreground"
            aria-label={props.showPassword ? "Hide password" : "Show password"}
          >
            {props.showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        <PasswordStrength password={props.password} />
      </Field>

      <Field id="signup-confirm-password" label="Confirm password">
        <div className="relative">
          <Lock className={iconClass} strokeWidth={2} />
          <input
            id="signup-confirm-password"
            type={props.showConfirmPassword ? "text" : "password"}
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="••••••••"
            value={props.confirmPassword}
            onChange={(e) => props.onConfirmPassword(e.target.value)}
            className={passwordInputClass}
          />
          <button
            type="button"
            onClick={props.onToggleConfirm}
            className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-muted transition-colors hover:text-foreground"
            aria-label={
              props.showConfirmPassword ? "Hide password" : "Show password"
            }
          >
            {props.showConfirmPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        {mismatch ? (
          <p className="text-xs text-rose-500">Passwords don&apos;t match.</p>
        ) : null}
      </Field>

      {props.needsChallenge && props.hasV2Fallback ? (
        <RecaptchaV2Fallback ref={props.v2Ref} onVerify={props.onV2Verify} />
      ) : null}

      <button
        type="submit"
        disabled={props.busy || (props.needsChallenge && !props.v2Token)}
        className={primaryBtnClass}
      >
        {props.busy ? (
          <>
            <Spinner />
            Creating account...
          </>
        ) : (
          "Continue"
        )}
      </button>
      <RecaptchaDisclosure />
    </form>
  );
}

type VerifyStepProps = {
  email: string;
  digits: string[];
  busy: boolean;
  resending: boolean;
  resent: boolean;
  onDigits: (next: string[]) => void;
  onSubmit: (e: FormEvent) => void;
  onResend: () => void;
};

export function VerifyStep(props: VerifyStepProps) {
  const otp = props.digits.join("");
  return (
    <form onSubmit={props.onSubmit} className="mt-6 flex flex-col gap-4">
      <p className="text-xs text-muted">
        Sent to <span className="font-medium text-foreground">{props.email}</span>
      </p>
      <div className="flex flex-col gap-2.5">
        <span className="text-sm font-medium text-foreground">
          Verification code
        </span>
        <OtpBoxes
          value={props.digits}
          onChange={props.onDigits}
          disabled={props.busy}
        />
      </div>
      {props.resent ? (
        <p className="text-xs font-medium text-primary">
          A new code is on the way.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={props.busy || otp.length !== OTP_LENGTH}
        className={primaryBtnClass}
      >
        {props.busy ? (
          <>
            <Spinner />
            Verifying...
          </>
        ) : (
          "Verify"
        )}
      </button>
      <p className="text-center text-sm text-muted">
        Didn&apos;t get it?{" "}
        <button
          type="button"
          onClick={props.onResend}
          disabled={props.resending || props.busy}
          className="font-medium text-primary hover:underline disabled:opacity-50"
        >
          {props.resending ? "Sending..." : "Resend code"}
        </button>
      </p>
    </form>
  );
}

// Same list and same values the dashboard's own onboarding uses for this
// exact question (step-shop-basics.tsx's "Shop category / niche") — it
// writes straight into Site.business.type, so picking here now means a
// trial that converts to a paid plan never has to ask again.
export const SHOP_CATEGORIES = [
  { value: "fashion", label: "Fashion & Apparel" },
  { value: "electronics", label: "Electronics & Gadgets" },
  { value: "food", label: "Food & Grocery" },
  { value: "beauty", label: "Beauty & Personal Care" },
  { value: "home", label: "Home & Living" },
  { value: "jewelry", label: "Jewelry & Accessories" },
  { value: "sports", label: "Sports & Fitness" },
  { value: "books", label: "Books & Stationery" },
  { value: "toys", label: "Toys & Kids" },
  { value: "automotive", label: "Automotive & Tools" },
  { value: "health", label: "Health & Wellness" },
  { value: "pets", label: "Pet Supplies" },
  { value: "services", label: "Services" },
  { value: "other", label: "Other" },
];

function CategoryDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const active = SHOP_CATEGORIES.find((c) => c.value === value);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id="basics-category"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-11 w-full items-center justify-between rounded-lg border border-border bg-search-bg px-3 text-left text-sm text-foreground outline-none transition-colors focus:border-primary focus:bg-surface"
      >
        <span className={active ? "" : "text-muted-soft"}>
          {active?.label ?? "Select category..."}
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted-soft transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <div
          role="listbox"
          className="absolute top-full left-0 z-30 mt-1.5 max-h-44 w-full overflow-y-auto rounded-lg border border-border bg-surface p-1 shadow-xl"
        >
          {SHOP_CATEGORIES.map((c) => {
            const isActive = c.value === value;
            return (
              <button
                key={c.value}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(c.value);
                  setOpen(false);
                }}
                className={[
                  "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-search-bg",
                ].join(" ")}
              >
                {c.label}
                {isActive ? <Check className="size-3.5 shrink-0" strokeWidth={2.5} /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

type BasicsStepProps = {
  shopName: string;
  category: string;
  phone: string;
  tagline: string;
  busy: boolean;
  onShopName: (v: string) => void;
  onCategory: (v: string) => void;
  onPhone: (v: string) => void;
  onTagline: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
};

export function BasicsStep(props: BasicsStepProps) {
  const phoneInvalid = props.phone.length > 0 && !BD_PHONE_RE.test(props.phone);
  return (
    <form onSubmit={props.onSubmit} className="mt-6 flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field id="basics-shop" label="Shop name">
          <div className="relative">
            <Building2 className={iconClass} strokeWidth={2} />
            <input
              id="basics-shop"
              type="text"
              required
              autoFocus
              placeholder="Your shop"
              value={props.shopName}
              onChange={(e) => props.onShopName(e.target.value)}
              className={fieldClass}
            />
          </div>
        </Field>

        <Field id="basics-category" label="Shop category">
          <CategoryDropdown value={props.category} onChange={props.onCategory} />
        </Field>
      </div>

      <Field id="basics-phone" label="Phone">
        <div className="relative flex items-stretch">
          <span className="flex shrink-0 items-center gap-1.5 rounded-l-lg border border-r-0 border-border bg-search-bg px-3 text-sm text-foreground">
            <span aria-hidden="true">🇧🇩</span>
            <span className="text-muted">+88</span>
          </span>
          <input
            id="basics-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="01XXXXXXXXX"
            value={props.phone}
            onChange={(e) =>
              props.onPhone(e.target.value.replace(/\D/g, "").slice(0, 11))
            }
            className="h-11 w-full rounded-r-lg border border-border bg-search-bg px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-soft focus:border-primary focus:bg-surface"
          />
        </div>
        {phoneInvalid ? (
          <p className="text-xs text-rose-500">
            Enter a valid Bangladeshi mobile number (e.g. 01XXXXXXXXX).
          </p>
        ) : null}
      </Field>

      <Field id="basics-tagline" label="Tagline (optional)">
        <input
          id="basics-tagline"
          type="text"
          maxLength={160}
          placeholder="What you sell, in a sentence"
          value={props.tagline}
          onChange={(e) => props.onTagline(e.target.value)}
          className="h-11 w-full rounded-lg border border-border bg-search-bg px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-soft focus:border-primary focus:bg-surface"
        />
      </Field>

      <button type="submit" disabled={props.busy} className={primaryBtnClass}>
        {props.busy ? (
          <>
            <Spinner />
            Saving...
          </>
        ) : (
          "Continue"
        )}
      </button>
    </form>
  );
}

function Spinner() {
  return <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />;
}
