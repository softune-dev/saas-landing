"use client";

import { track } from "@vercel/analytics";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useToast } from "@/components/ui/toast";
import { RecaptchaChallengeRequiredError, isPassword422 } from "@/lib/api";
import { getRecaptchaToken, hasV2Fallback } from "@/lib/recaptcha";
import { DASHBOARD_URL } from "@/lib/site";
import { readAttribution, trackMeta, trackMetaOnce, userIdFromAccessToken, type MetaUserData } from "@/lib/meta";
import {
  clearStoredSignupToken,
  completeTrialSignup,
  getTrialSignupStatus,
  resendTrialOtp,
  startTrialSignup,
  startTrialWithGoogle,
  storeDashboardSession,
  updateTrialDetails,
  verifyTrialOtp,
  type TrialTokensOut,
} from "@/lib/trial";
import { OTP_LENGTH, emptyOtpDigits } from "../otp-boxes";
import { missingPasswordBits } from "../password-strength";
import type { RecaptchaV2FallbackHandle } from "../recaptcha-v2-fallback";
import { resetHandoffGuard, useTrialBuild } from "../use-trial-build";
import { EmailStep, PasswordStep, VerifyStep, type Account } from "./account-steps";
import { BuildStep } from "./build-step";
import { DesignStep } from "./design-step";
import { DistrictStep } from "./district-step";
import { ContactStep, SocialStep } from "./contact-steps";
import { CategoryStep, ShopStep } from "./shop-steps";
import { DEMO_LOOKS, EMPTY_BUSINESS, t, type Business, type Locale, type ShopStage, type StepId } from "./signup-copy";
import { SignupShell } from "./signup-ui";

const DRAFT_KEY = "softune.signup.draft";
// The paid plan picked on the pricing page (?plan=growth&months=12). Sign-up
// always opens a Free store; the dashboard then offers this plan's payment.
const PLAN_INTENT_KEY = "softune.trial.planIntent";
const PAID_PLANS = ["starter", "growth", "business"];
const PERIODS = ["1", "3", "6", "12"];

/** Saved on arrival, so a sign-up that goes through OTP or Google still has it. */
function rememberPlanIntent() {
  try {
    const q = new URLSearchParams(window.location.search);
    const plan = q.get("plan");
    if (!plan || !PAID_PLANS.includes(plan)) return;
    const months = PERIODS.includes(q.get("months") ?? "") ? q.get("months")! : "1";
    sessionStorage.setItem(PLAN_INTENT_KEY, JSON.stringify({ plan, months }));
  } catch {}
}

function takePlanIntent(): { plan: string; months: string } | null {
  try {
    const raw = sessionStorage.getItem(PLAN_INTENT_KEY);
    sessionStorage.removeItem(PLAN_INTENT_KEY);
    const v = raw ? JSON.parse(raw) : null;
    return v && PAID_PLANS.includes(v.plan) && PERIODS.includes(v.months) ? v : null;
  } catch {
    return null;
  }
}

function sleep(ms: number) {
  return new Promise<void>((r) => window.setTimeout(r, ms));
}

const FAKE_TOKENS: TrialTokensOut = {
  access_token: "preview",
  refresh_token: "preview",
  token_type: "bearer",
  expires_in: 0,
};

function handoffToDashboard(access: string, refresh: string, user: MetaUserData) {
  // The conversion signal for Meta Ads and Vercel. Fired here, never in
  // preview mode, so walkthroughs don't inflate counts. Browser pixel and
  // CAPI share one event_id (lib/meta.ts), so Meta counts one signup; the
  // server copy adds hashed email/phone/name and the user id for matching.
  trackMeta("CompleteRegistration", { content_name: "Free plan", status: "free" }, {
    ...user,
    externalId: userIdFromAccessToken(access),
  });
  track("trial_signup");
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {}
  storeDashboardSession(access, refresh);
  const hash = new URLSearchParams({ softune_at: access, softune_rt: refresh, ...(takePlanIntent() ?? {}) }).toString();
  window.location.assign(`${DASHBOARD_URL}/onboarding#${hash}`);
}

function readPreviewFlag() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("preview") === "1";
}

function errText(err: unknown, fallback: string) {
  return err instanceof Error && err.message ? err.message : fallback;
}

/** The shop answers survive a reload (people leave the tab to fetch the
 * email code). The password is never stored. */
function loadDraft(): Business {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? { ...EMPTY_BUSINESS, ...(JSON.parse(raw) as Partial<Business>) } : { ...EMPTY_BUSINESS };
  } catch {
    return { ...EMPTY_BUSINESS };
  }
}

export function SignupFlow({ locale = "en" }: { locale?: Locale }) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  const { toast } = useToast();
  const [isPreview] = useState(readPreviewFlag);
  useEffect(rememberPlanIntent, []);

  const [checking, setChecking] = useState(true);
  const [business, setBusiness] = useState<Business>(EMPTY_BUSINESS);
  const [stage, setStage] = useState<ShopStage>("shop");
  const [accountStage, setAccountStage] = useState<"account" | "password">("account");
  const [account, setAccount] = useState<Account>({ fullName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [needsChallenge, setNeedsChallenge] = useState(false);
  const [v2Token, setV2Token] = useState<string | null>(null);
  const v2Ref = useRef<RecaptchaV2FallbackHandle>(null);

  const [signupToken, setSignupToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [digits, setDigits] = useState<string[]>(emptyOtpDigits);
  const submittingRef = useRef(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<Promise<TrialTokensOut> | null>(null);

  const previewComplete = useCallback(() => {
    toast({
      title: t(locale, "Preview complete", "প্রিভিউ সম্পন্ন"),
      description: t(locale, "No account was created.", "কোনো একাউন্ট তৈরি হয়নি।"),
      variant: "info",
      duration: 5000,
    });
    resetHandoffGuard();
    setPending(null);
    setSignupToken("");
    setVerified(false);
    setDigits(emptyOtpDigits());
    submittingRef.current = false;
    setStage("shop");
    setAccountStage("account");
  }, [locale, toast]);

  // Latest contact details for CompleteRegistration, read through a ref so
  // the handoff callback stays stable (useTrialBuild re-runs when it changes).
  const metaUserRef = useRef<MetaUserData>({});
  {
    const [firstName, ...rest] = account.fullName.trim().split(/\s+/);
    metaUserRef.current = {
      email: account.email.trim() || undefined,
      phone: business.phone || undefined,
      firstName: firstName || undefined,
      lastName: rest.join(" ") || undefined,
    };
  }
  const handoff = useCallback(
    (access: string, refresh: string) => handoffToDashboard(access, refresh, metaUserRef.current),
    [],
  );

  const { done: buildDone } = useTrialBuild(pending, isPreview ? previewComplete : handoff);

  useEffect(() => {
    const draft = loadDraft();
    if (isPreview) {
      setBusiness(draft);
      setChecking(false);
      return;
    }
    let cancelled = false;
    getTrialSignupStatus().then((status) => {
      if (cancelled) return;
      if (status) {
        setSignupToken(status.signup_token);
        setAccount((a) => ({ ...a, email: status.email, fullName: status.full_name ?? a.fullName }));
        setVerified(status.email_verified);
        // Details this person already saved on an earlier visit.
        if (status.shop_name) draft.shopName = status.shop_name;
        if (status.phone) draft.phone = status.phone;
        if (status.category) draft.category = status.category;
      }
      setBusiness(draft);
      setChecking(false);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount only; isPreview is stable
  }, []);

  useEffect(() => {
    if (checking || isPreview) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(business));
    } catch {}
  }, [business, checking, isPreview]);

  const step: StepId = pending ? "build" : !signupToken ? accountStage : !verified ? "verify" : stage;

  function editAccount(patch: Partial<Account>) {
    setAccount((a) => ({ ...a, ...patch }));
    if (!isPreview && (patch.fullName !== undefined || patch.email !== undefined)) {
      trackMetaOnce("Lead", "signup-form", { content_name: "Signup form" });
    }
  }

  async function handleAccount(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    if (isPreview) {
      await sleep(500);
      setSignupToken("preview");
      setBusy(false);
      return;
    }
    try {
      const out = await startTrialSignup({
        email: account.email.trim(),
        password: account.password,
        full_name: account.fullName.trim() || undefined,
        recaptcha_token: await getRecaptchaToken("trial_start"),
        recaptcha_v2_token: v2Token ?? "",
      });
      setSignupToken(out.signup_token);
    } catch (err) {
      if (err instanceof RecaptchaChallengeRequiredError) {
        setNeedsChallenge(true);
        if (!hasV2Fallback) setError(err.message || L("Couldn't verify you're human.", "আপনি মানুষ কিনা যাচাই করা যায়নি।"));
      } else if (isPassword422(err)) {
        v2Ref.current?.reset();
        const missing = missingPasswordBits(account.password, locale);
        setError(
          missing.length
            ? L(`Your password needs: ${missing.join(", ")}.`, `পাসওয়ার্ডে যোগ করুন: ${missing.join(", ")}।`)
            : L("Use 8+ characters with uppercase, lowercase and a number.", "৮+ অক্ষর, বড় ও ছোট হাতের অক্ষর এবং একটি সংখ্যা দিন।"),
        );
      } else {
        v2Ref.current?.reset();
        setError(errText(err, L("Couldn't create the account.", "একাউন্ট তৈরি করা যায়নি।")));
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle(credential: string) {
    if (isPreview) return;
    setError(null);
    setBusy(true);
    try {
      const out = await startTrialWithGoogle(credential);
      // Google's name/email, for CompleteRegistration.
      const status = await getTrialSignupStatus();
      if (status) setAccount((a) => ({ ...a, email: status.email, fullName: status.full_name ?? a.fullName }));
      setSignupToken(out.signup_token);
      setVerified(true);
      trackMetaOnce("Lead", "signup-form", { content_name: "Signup form" });
    } catch (err) {
      setError(errText(err, L("Google sign-up didn't work. Try again or use email.", "Google দিয়ে সাইন আপ হয়নি। আবার চেষ্টা করুন বা ইমেইল ব্যবহার করুন।")));
    } finally {
      setBusy(false);
    }
  }

  async function submitCode(code: string) {
    if (code.length !== OTP_LENGTH || submittingRef.current) return;
    submittingRef.current = true;
    setError(null);
    setBusy(true);
    try {
      if (isPreview) await sleep(500);
      else await verifyTrialOtp(signupToken, code);
      setVerified(true);
    } catch (err) {
      setDigits(emptyOtpDigits());
      submittingRef.current = false;
      setError(errText(err, L("That code didn't work.", "কোডটি কাজ করেনি।")));
    } finally {
      setBusy(false);
    }
  }

  async function handleResend() {
    setResending(true);
    setResent(false);
    setError(null);
    try {
      if (isPreview) await sleep(400);
      else await resendTrialOtp(signupToken);
      setDigits(emptyOtpDigits());
      submittingRef.current = false;
      setResent(true);
    } catch (err) {
      setError(errText(err, L("Couldn't resend the code.", "কোড আবার পাঠানো যায়নি।")));
    } finally {
      setResending(false);
    }
  }

  function changeEmail() {
    clearStoredSignupToken();
    setSignupToken("");
    setDigits(emptyOtpDigits());
    submittingRef.current = false;
    setResent(false);
    setError(null);
  }

  function goTo(next: ShopStage) {
    setError(null);
    setStage(next);
    window.scrollTo({ top: 0 });
  }

  /** Saved at the phone screen, so a number the server rejects is shown
   * there, and again after the optional screens. */
  async function saveDetails(next: ShopStage) {
    setError(null);
    if (isPreview) {
      goTo(next);
      return;
    }
    setBusy(true);
    try {
      await updateTrialDetails({
        signup_token: signupToken,
        shop_name: business.shopName.trim(),
        phone: business.phone,
        category: business.category,
        whatsapp: business.whatsappSame ? business.phone : business.whatsapp,
        facebook: business.facebook.trim() || undefined,
        instagram: business.instagram.trim() || undefined,
        tiktok: business.tiktok.trim() || undefined,
        youtube: business.youtube.trim() || undefined,
        district: business.district || undefined,
      });
      goTo(next);
    } catch (err) {
      setError(errText(err, L("Couldn't save your details.", "আপনার তথ্য সেভ করা যায়নি।")));
    } finally {
      setBusy(false);
    }
  }

  function createStore() {
    const demo = DEMO_LOOKS[business.demo];
    if (!demo) return;
    setError(null);
    if (isPreview) {
      setPending(sleep(600).then(() => FAKE_TOKENS));
      return;
    }
    const request = completeTrialSignup({
      signup_token: signupToken,
      template_key: demo.template,
      theme: { primary_color: demo.color, font: demo.font, body_font: demo.bodyFont },
      attribution: readAttribution(),
    });
    setPending(request);
    request.catch((err) => {
      setPending(null);
      setError(errText(err, L("Couldn't build the store.", "স্টোর তৈরি করা যায়নি।")));
    });
  }

  if (checking) return null;

  const patchBusiness = (patch: Partial<Business>) => setBusiness((b) => ({ ...b, ...patch }));

  const back: Partial<Record<StepId, () => void>> = {
    password: () => {
      setError(null);
      setAccountStage("account");
    },
    category: () => goTo("shop"),
    contact: () => goTo("category"),
    social: () => goTo("contact"),
    district: () => goTo("social"),
    design: () => goTo("district"),
  };

  return (
    <SignupShell locale={locale} step={step} isPreview={isPreview} wide={step === "design"} onBack={busy ? undefined : back[step]}>
      {step === "account" ? (
        <EmailStep
          locale={locale}
          email={account.email}
          error={error}
          isPreview={isPreview}
          onEmail={(email) => editAccount({ email })}
          onGoogle={handleGoogle}
          onNext={() => {
            setError(null);
            setAccountStage("password");
          }}
        />
      ) : step === "password" ? (
        <PasswordStep
          locale={locale}
          value={account}
          busy={busy}
          error={error}
          showPassword={showPassword}
          needsChallenge={needsChallenge}
          hasV2Fallback={hasV2Fallback}
          v2Token={v2Token}
          v2Ref={v2Ref}
          onChange={editAccount}
          onTogglePassword={() => setShowPassword((v) => !v)}
          onV2Verify={setV2Token}
          onSubmit={handleAccount}
        />
      ) : step === "verify" ? (
        <VerifyStep
          locale={locale}
          email={account.email}
          digits={digits}
          busy={busy}
          resending={resending}
          resent={resent}
          error={error}
          onDigits={(next) => {
            setDigits(next);
            if (next.join("").length === OTP_LENGTH) void submitCode(next.join(""));
          }}
          onSubmit={(e) => {
            e.preventDefault();
            void submitCode(digits.join(""));
          }}
          onResend={handleResend}
          onChangeEmail={() => {
            changeEmail();
            setAccountStage("account");
          }}
        />
      ) : step === "shop" ? (
        <ShopStep locale={locale} value={business} onChange={patchBusiness} onNext={() => goTo("category")} />
      ) : step === "category" ? (
        <CategoryStep locale={locale} value={business} onChange={patchBusiness} onNext={() => goTo("contact")} />
      ) : step === "contact" ? (
        <ContactStep locale={locale} value={business} busy={busy} error={error} onChange={patchBusiness} onNext={() => void saveDetails("social")} />
      ) : step === "social" ? (
        <SocialStep locale={locale} value={business} onChange={patchBusiness} onNext={() => goTo("district")} />
      ) : step === "district" ? (
        <DistrictStep locale={locale} value={business} busy={busy} error={error} onChange={patchBusiness} onNext={() => void saveDetails("design")} />
      ) : step === "design" ? (
        <DesignStep
          locale={locale}
          category={business.category}
          value={business.demo}
          error={error}
          onSelect={(demo) => patchBusiness({ demo })}
          onCreate={createStore}
        />
      ) : (
        <BuildStep locale={locale} done={buildDone} shopName={business.shopName} demo={business.demo} />
      )}
    </SignupShell>
  );
}
