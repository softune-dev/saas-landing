"use client";

import { Building2, Check, ChevronDown, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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
  locale?: "en" | "bn";
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
  const isBn = props.locale === "bn";
  const mismatch =
    props.confirmPassword.length > 0 && props.confirmPassword !== props.password;

  return (
    <form onSubmit={props.onSubmit} className="mt-6 flex flex-col gap-4">
      <Field id="signup-name" label={isBn ? "পূর্ণ নাম" : "Full name"}>
        <div className="relative">
          <User className={iconClass} strokeWidth={2} />
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            placeholder={isBn ? "আপনার নাম" : "Your name"}
            value={props.fullName}
            onChange={(e) => props.onFullName(e.target.value)}
            className={fieldClass}
          />
        </div>
      </Field>

      <Field id="signup-email" label={isBn ? "ইমেইল ঠিকানা" : "Email Address"}>
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

      <Field id="signup-password" label={isBn ? "পাসওয়ার্ড" : "Password"}>
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
            aria-label={
              props.showPassword
                ? isBn
                  ? "পাসওয়ার্ড লুকান"
                  : "Hide password"
                : isBn
                  ? "পাসওয়ার্ড দেখান"
                  : "Show password"
            }
          >
            {props.showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        <PasswordStrength password={props.password} locale={props.locale} />
      </Field>

      <Field
        id="signup-confirm-password"
        label={isBn ? "পাসওয়ার্ড নিশ্চিত করুন" : "Confirm password"}
      >
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
              props.showConfirmPassword
                ? isBn
                  ? "পাসওয়ার্ড লুকান"
                  : "Hide password"
                : isBn
                  ? "পাসওয়ার্ড দেখান"
                  : "Show password"
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
          <p className="text-xs text-rose-500">
            {isBn ? "পাসওয়ার্ড মিলছে না।" : "Passwords don’t match."}
          </p>
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
            {isBn ? "একাউন্ট তৈরি হচ্ছে..." : "Creating account..."}
          </>
        ) : isBn ? (
          "চালিয়ে যান"
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
  locale?: "en" | "bn";
  onDigits: (next: string[]) => void;
  onSubmit: (e: FormEvent) => void;
  onResend: () => void;
};

export function VerifyStep(props: VerifyStepProps) {
  const isBn = props.locale === "bn";
  const otp = props.digits.join("");
  return (
    <form onSubmit={props.onSubmit} className="mt-6 flex flex-col gap-4">
      <p className="text-xs text-muted">
        {isBn ? "পাঠানো হয়েছে" : "Sent to"}{" "}
        <span className="font-medium text-foreground">{props.email}</span>
      </p>
      <div className="flex flex-col gap-2.5">
        <span className="text-sm font-medium text-foreground">
          {isBn ? "ভেরিফিকেশন কোড" : "Verification code"}
        </span>
        <OtpBoxes
          value={props.digits}
          onChange={props.onDigits}
          disabled={props.busy}
        />
      </div>
      {props.resent ? (
        <p className="text-xs font-medium text-primary">
          {isBn ? "একটি নতুন কোড পাঠানো হয়েছে।" : "A new code is on the way."}
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
            {isBn ? "যাচাই হচ্ছে..." : "Verifying..."}
          </>
        ) : isBn ? (
          "যাচাই করুন"
        ) : (
          "Verify"
        )}
      </button>
      <p className="text-center text-sm text-muted">
        {isBn ? "কোড পাননি?" : "Didn’t get it?"}{" "}
        <button
          type="button"
          onClick={props.onResend}
          disabled={props.resending || props.busy}
          className="font-medium text-primary hover:underline disabled:opacity-50"
        >
          {props.resending
            ? isBn
              ? "পাঠানো হচ্ছে..."
              : "Sending..."
            : isBn
              ? "কোড আবার পাঠান"
              : "Resend code"}
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
  { value: "fashion", label: "Fashion & Apparel", labelBn: "ফ্যাশন ও পোশাক" },
  { value: "electronics", label: "Electronics & Gadgets", labelBn: "ইলেকট্রনিক্স ও গ্যাজেট" },
  { value: "food", label: "Food & Grocery", labelBn: "খাবার ও মুদি" },
  { value: "beauty", label: "Beauty & Personal Care", labelBn: "বিউটি ও পার্সোনাল কেয়ার" },
  { value: "home", label: "Home & Living", labelBn: "হোম ও লিভিং" },
  { value: "jewelry", label: "Jewelry & Accessories", labelBn: "জুয়েলারি ও এক্সেসরিজ" },
  { value: "sports", label: "Sports & Fitness", labelBn: "স্পোর্টস ও ফিটনেস" },
  { value: "books", label: "Books & Stationery", labelBn: "বই ও স্টেশনারি" },
  { value: "toys", label: "Toys & Kids", labelBn: "খেলনা ও শিশুদের পণ্য" },
  { value: "automotive", label: "Automotive & Tools", labelBn: "অটোমোটিভ ও টুলস" },
  { value: "health", label: "Health & Wellness", labelBn: "স্বাস্থ্য ও ওয়েলনেস" },
  { value: "pets", label: "Pet Supplies", labelBn: "পোষা প্রাণীর পণ্য" },
  { value: "services", label: "Services", labelBn: "সার্ভিস" },
  { value: "other", label: "Other", labelBn: "অন্যান্য" },
];

function CategoryDropdown({
  value,
  onChange,
  locale = "en",
}: {
  value: string;
  onChange: (v: string) => void;
  locale?: "en" | "bn";
}) {
  const isBn = locale === "bn";
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
          {active
            ? isBn
              ? active.labelBn
              : active.label
            : isBn
              ? "ক্যাটাগরি নির্বাচন করুন..."
              : "Select category..."}
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
                {isBn ? c.labelBn : c.label}
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
  locale?: "en" | "bn";
  onShopName: (v: string) => void;
  onCategory: (v: string) => void;
  onPhone: (v: string) => void;
  onTagline: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
};

/** Live preview of the subdomain the shop name will provision — not
 * editable here, just derived (lowercase, spaces/punctuation collapsed to
 * single hyphens, trimmed). The real slug is decided server-side at
 * provision time; this is only a preview so the merchant isn't surprised
 * by their URL. */
function slugifyShopName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Non-Latin shop names (Bangla, etc.) slugify away to nothing useful for a
 * subdomain — flag that early instead of silently falling back to
 * "mystore" with no explanation. */
function hasNonEnglishChars(name: string): boolean {
  return /[^\x00-\x7F]/.test(name);
}

export function BasicsStep(props: BasicsStepProps) {
  const isBn = props.locale === "bn";
  const phoneInvalid = props.phone.length > 0 && !BD_PHONE_RE.test(props.phone);
  const slug = slugifyShopName(props.shopName);
  const domainNeedsEnglish = hasNonEnglishChars(props.shopName);
  const [showDomainHint, setShowDomainHint] = useState(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function flashDomainHint() {
    setShowDomainHint(true);
    if (hintTimer.current) clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setShowDomainHint(false), 2600);
  }

  useEffect(() => {
    return () => {
      if (hintTimer.current) clearTimeout(hintTimer.current);
    };
  }, []);

  return (
    <form onSubmit={props.onSubmit} className="mt-6 flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field id="basics-shop" label={isBn ? "শপের নাম" : "Shop name"}>
          <div className="relative">
            <Building2 className={iconClass} strokeWidth={2} />
            <input
              id="basics-shop"
              type="text"
              required
              autoFocus
              placeholder={isBn ? "আপনার শপের নাম লিখুন" : "Enter your shop name"}
              value={props.shopName}
              onChange={(e) => props.onShopName(e.target.value)}
              className={fieldClass}
            />
          </div>
        </Field>

        <Field id="basics-domain" label={isBn ? "আপনার শপের URL" : "Your shop URL"}>
          <div className="relative">
            <button
              type="button"
              onClick={flashDomainHint}
              aria-describedby={showDomainHint ? "basics-domain-hint" : undefined}
              className={[
                "flex h-11 w-full items-center overflow-hidden rounded-lg border bg-search-bg pl-3 pr-1 text-sm text-muted-soft",
                domainNeedsEnglish ? "border-rose-500" : "border-border",
              ].join(" ")}
            >
              <span className="min-w-0 flex-1 truncate text-left text-foreground">
                {slug || "mystore"}
              </span>
              <span className="ml-1.5 shrink-0 rounded-md bg-surface px-2 py-1.5">
                .softunebd.com
              </span>
            </button>
            <AnimatePresence>
              {showDomainHint ? (
                <motion.div
                  id="basics-domain-hint"
                  role="status"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className={[
                    "absolute top-[calc(100%+6px)] left-0 z-10 w-full rounded-lg px-3 py-2 text-xs shadow-lg",
                    domainNeedsEnglish
                      ? "bg-rose-500 text-white"
                      : "bg-foreground text-background",
                  ].join(" ")}
                >
                  {domainNeedsEnglish
                    ? isBn
                      ? "শপ URL অবশ্যই ইংরেজিতে হতে হবে। শপের নামে ইংরেজি অক্ষর ব্যবহার করে দেখুন"
                      : "Shop URL must be in English. Try using English letters in your shop name"
                    : isBn
                      ? "উপরে শপের নাম পরিবর্তন করলে এটি আপডেট হবে"
                      : "Change your shop name above to update this"}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </Field>
      </div>

      <Field id="basics-phone" label={isBn ? "ফোন" : "Phone"}>
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
            placeholder={isBn ? "আপনার নম্বর লিখুন" : "Enter your number"}
            value={props.phone}
            onChange={(e) =>
              props.onPhone(e.target.value.replace(/\D/g, "").slice(0, 11))
            }
            className="h-11 w-full rounded-r-lg border border-border bg-search-bg px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-soft focus:border-primary focus:bg-surface"
          />
        </div>
        {phoneInvalid ? (
          <p className="text-xs text-rose-500">
            {isBn
              ? "একটি সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)।"
              : "Enter a valid Bangladeshi mobile number (e.g. 01XXXXXXXXX)."}
          </p>
        ) : null}
      </Field>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field id="basics-category" label={isBn ? "শপের ক্যাটাগরি" : "Shop category"}>
          <CategoryDropdown
            value={props.category}
            onChange={props.onCategory}
            locale={props.locale}
          />
        </Field>

        <Field id="basics-tagline" label={isBn ? "ট্যাগলাইন (ঐচ্ছিক)" : "Tagline (optional)"}>
          <input
            id="basics-tagline"
            type="text"
            maxLength={160}
            placeholder={isBn ? "আপনি কী বিক্রি করেন, এক লাইনে" : "What you sell, in a sentence"}
            value={props.tagline}
            onChange={(e) => props.onTagline(e.target.value)}
            className="h-11 w-full rounded-lg border border-border bg-search-bg px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-soft focus:border-primary focus:bg-surface"
          />
        </Field>
      </div>

      <button type="submit" disabled={props.busy} className={primaryBtnClass}>
        {props.busy ? (
          <>
            <Spinner />
            {isBn ? "সংরক্ষণ হচ্ছে..." : "Saving..."}
          </>
        ) : isBn ? (
          "চালিয়ে যান"
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
