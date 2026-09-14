"use client";

import { useEffect, useReducer, useRef, useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { RecaptchaChallengeRequiredError, isPassword422 } from "@/lib/api";
import { getRecaptchaToken, hasV2Fallback } from "@/lib/recaptcha";
import { DASHBOARD_URL } from "@/lib/site";
import {
  completeTrialSignup,
  getTrialSignupStatus,
  resumeTrialStep,
  startTrialSignup,
  resendTrialOtp,
  storeDashboardSession,
  updateTrialDetails,
  verifyTrialOtp,
  type TrialTokensOut,
} from "@/lib/trial";
import { AuthShell } from "./auth-shell";
import { LottiePanel } from "./lottie-panel";
import { BuildingStoreScreen } from "./trial-building";
import { useTrialBuild } from "./use-trial-build";
import { WizardDock } from "./wizard-dock";
import { OTP_LENGTH, emptyOtpDigits } from "./otp-boxes";
import { missingPasswordBits } from "./password-strength";
import type { RecaptchaV2FallbackHandle } from "./recaptcha-v2-fallback";
import {
  AccountStep,
  BD_PHONE_RE,
  BasicsStep,
  VerifyStep,
} from "./trial-steps";
import {
  BODY_FONTS,
  COLOR_SWATCHES,
  HEADING_FONTS,
  ThemeStep,
  type TemplateKey,
} from "./trial-theme-step";

export type Step = "account" | "verify" | "basics" | "theme" | "building";

const STEPS: Step[] = ["account", "verify", "basics", "theme"];

/** lib/trial.ts's resumeTrialStep talks in backend-flow names; the wizard
 * uses the form-step ids. */
const RESUME_TO_STEP: Record<ReturnType<typeof resumeTrialStep>, Step> = {
  otp: "verify",
  details: "basics",
  theme: "theme",
};

const STEP_COPY: Record<Step, { title: string; subtitle: string }> = {
  account: {
    title: "Start your free trial",
    subtitle: "3 days, no credit card.",
  },
  verify: {
    title: "Check your email",
    subtitle: "Enter the 6-digit code we sent.",
  },
  basics: {
    title: "Tell us about your shop",
    subtitle: "Just the basics to get started.",
  },
  theme: {
    title: "Pick a look",
    subtitle: "You can change this later.",
  },
  building: {
    title: "Building your store",
    subtitle: "Hang tight.",
  },
};

const STEP_COPY_BN: Record<Step, { title: string; subtitle: string }> = {
  account: {
    title: "ফ্রি ট্রায়াল শুরু করুন",
    subtitle: "৩ দিন, কোনো ক্রেডিট কার্ড লাগবে না।",
  },
  verify: {
    title: "আপনার ইমেইল চেক করুন",
    subtitle: "আমাদের পাঠানো ৬-সংখ্যার কোডটি লিখুন।",
  },
  basics: {
    title: "আপনার শপ সম্পর্কে বলুন",
    subtitle: "শুরু করতে শুধু বেসিক তথ্য দিন।",
  },
  theme: {
    title: "একটি লুক বেছে নিন",
    subtitle: "এটি পরেও পরিবর্তন করতে পারবেন।",
  },
  building: {
    title: "আপনার স্টোর তৈরি হচ্ছে",
    subtitle: "একটু অপেক্ষা করুন।",
  },
};

const STEP_LOTTIE: Record<Step, string> = {
  account: "/acc.lottie",
  verify: "/email.lottie",
  basics: "/commu.lottie",
  theme: "/theme.lottie",
  building: "/build.lottie",
};

type WizardState = {
  step: Step;
  signupToken: string;
  email: string;
  templateKey: TemplateKey;
  primaryColor: string;
  displayFont: string;
  bodyFont: string;
  busy: boolean;
};

function pickRandom<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)]!;
}

// Randomized per visitor, not a fixed "everyone starts with orange
// Fraunces/Inter" default — the theme step should already look like it's
// been picked for them, not identical for every new signup.
function createInitialState(): WizardState {
  return {
    step: "account",
    signupToken: "",
    email: "",
    templateKey: "bazaar",
    primaryColor: pickRandom(COLOR_SWATCHES),
    displayFont: pickRandom(HEADING_FONTS).value,
    bodyFont: pickRandom(BODY_FONTS).value,
    busy: false,
  };
}

type Action =
  | { type: "patch"; patch: Partial<WizardState> }
  | { type: "fail" };

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case "patch":
      return { ...state, ...action.patch };
    case "fail":
      return { ...state, busy: false };
  }
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function handoffToDashboard(access: string, refresh: string) {
  storeDashboardSession(access, refresh);
  const hash = new URLSearchParams({
    softune_at: access,
    softune_rt: refresh,
  }).toString();
  // A fresh trial account always has setup left to do — land there
  // directly instead of the dashboard root, which would otherwise show an
  // empty overview before the merchant even knows Setup exists.
  window.location.assign(`${DASHBOARD_URL}/onboarding#${hash}`);
}

/** ?preview=1 on the signup URL — every step advances locally on fake
 * delays instead of hitting the real backend, so the wizard (including the
 * "building your store" screen) can be reviewed end to end without ever
 * creating a trial account. Read once via lazy useState init so it's stable
 * for the life of the component and never differs between server and
 * client render (server always sees no window, so it always renders the
 * real flow — this only ever flips true after hydration, before which the
 * component renders null anyway while resume-checking). */
function readPreviewFlag() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("preview") === "1";
}

export function TrialOnboarding({ locale = "en" }: { locale?: "en" | "bn" }) {
  const isBn = locale === "bn";
  const { toast } = useToast();
  const [isPreview] = useState(readPreviewFlag);
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [needsChallenge, setNeedsChallenge] = useState(false);
  const [v2Token, setV2Token] = useState<string | null>(null);
  const [digits, setDigits] = useState<string[]>(emptyOtpDigits);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [shopName, setShopName] = useState("");
  const [category, setCategory] = useState("");
  const [phone, setPhone] = useState("");
  const [tagline, setTagline] = useState("");
  const [checkingResume, setCheckingResume] = useState(true);
  const v2Ref = useRef<RecaptchaV2FallbackHandle>(null);
  const submittingRef = useRef(false);
  const [pending, setPending] = useState<Promise<TrialTokensOut> | null>(null);
  // Preview mode never has real tokens to hand off — land back on step one
  // instead of redirecting to a dashboard that was never actually built,
  // so the whole wizard can just be replayed.
  function previewComplete() {
    toast({
      title: isBn ? "প্রিভিউ সম্পন্ন" : "Preview complete",
      description: isBn
        ? "কোনো একাউন্ট তৈরি হয়নি। মার্চেন্টরা এটাই দেখেন।"
        : "No account was created. This is what merchants see.",
      variant: "info",
      duration: 5000,
    });
    dispatch({ type: "patch", patch: { step: "account" } });
    setPending(null);
  }
  const { done: buildDone, pct: buildPct } = useTrialBuild(
    pending,
    isPreview ? previewComplete : handoffToDashboard,
  );

  // Preview-only step arrows: jump straight past a step's form instead of
  // having to type anything into it. Forward from "theme" kicks off the
  // same fake building simulation handleTheme would, so the arrows can
  // walk all the way through the whole wizard including the payoff screen.
  function skipForward() {
    if (!isPreview) return;
    if (state.step === "account") {
      dispatch({ type: "patch", patch: { signupToken: "preview", step: "verify" } });
    } else if (state.step === "verify") {
      dispatch({ type: "patch", patch: { step: "basics" } });
    } else if (state.step === "basics") {
      dispatch({ type: "patch", patch: { step: "theme" } });
    } else if (state.step === "theme") {
      dispatch({ type: "patch", patch: { step: "building", busy: true } });
      setPending(
        sleep(600).then(() => ({
          access_token: "preview",
          refresh_token: "preview",
          token_type: "bearer",
          expires_in: 0,
        })),
      );
    }
  }

  function skipBack() {
    if (!isPreview) return;
    if (state.step === "verify") {
      dispatch({ type: "patch", patch: { step: "account" } });
    } else if (state.step === "basics") {
      dispatch({ type: "patch", patch: { step: "verify" } });
    } else if (state.step === "theme") {
      dispatch({ type: "patch", patch: { step: "basics" } });
    } else if (state.step === "building") {
      setPending(null);
      dispatch({ type: "patch", patch: { step: "theme", busy: false } });
    }
  }

  useEffect(() => {
    if (isPreview) {
      setCheckingResume(false);
      return;
    }
    let cancelled = false;
    getTrialSignupStatus().then((status) => {
      if (cancelled) return;
      if (status) {
        if (status.full_name) setFullName(status.full_name);
        if (status.shop_name) setShopName(status.shop_name);
        if (status.phone) setPhone(status.phone);
        if (status.tagline) setTagline(status.tagline);
        if (status.category) setCategory(status.category);
        dispatch({
          type: "patch",
          patch: {
            signupToken: status.signup_token,
            email: status.email,
            step: RESUME_TO_STEP[resumeTrialStep(status)],
          },
        });
      }
      setCheckingResume(false);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- isPreview is stable for the component's lifetime (lazy useState init)
  }, []);

  const copy = (isBn ? STEP_COPY_BN : STEP_COPY)[state.step];

  // Avoid flashing the Account form for the instant it takes to confirm
  // there's no (or an expired) signup_token to resume.
  if (checkingResume) return null;

  function failToast(title: string, description?: string) {
    toast({
      title,
      description,
      variant: "error",
      duration: description ? 7000 : 4200,
    });
    dispatch({ type: "fail" });
  }

  async function handleAccount(e: FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      failToast(isBn ? "পাসওয়ার্ড মিলছে না।" : "Passwords don’t match.");
      return;
    }
    dispatch({ type: "patch", patch: { busy: true } });
    if (isPreview) {
      await sleep(500);
      dispatch({
        type: "patch",
        patch: { busy: false, signupToken: "preview", step: "verify" },
      });
      return;
    }
    try {
      const recaptchaToken = await getRecaptchaToken("trial_start");
      const out = await startTrialSignup({
        email: state.email.trim(),
        password,
        full_name: fullName.trim() || undefined,
        recaptcha_token: recaptchaToken,
        recaptcha_v2_token: v2Token ?? "",
      });
      dispatch({
        type: "patch",
        patch: {
          busy: false,
          signupToken: out.signup_token,
          step: "verify",
        },
      });
    } catch (err) {
      if (err instanceof RecaptchaChallengeRequiredError) {
        setNeedsChallenge(true);
        dispatch({ type: "fail" });
        if (!hasV2Fallback) {
          toast({
            title:
              err.message ||
              (isBn ? "আপনি মানুষ কিনা যাচাই করা যায়নি" : "Couldn't verify you're human"),
            variant: "error",
          });
        }
        return;
      }
      v2Ref.current?.reset();
      if (isPassword422(err)) {
        const missing = missingPasswordBits(password, locale);
        failToast(
          isBn ? "পাসওয়ার্ডের ফরম্যাট ঠিক নেই" : "Password format isn't right",
          missing.length
            ? isBn
              ? `যোগ করুন: ${missing.join(", ")}।`
              : `Add: ${missing.join(", ")}.`
            : isBn
              ? "কমপক্ষে ৮ অক্ষর, বড় হাতের অক্ষর, ছোট হাতের অক্ষর এবং একটি সংখ্যা ব্যবহার করুন।"
              : "Use at least 8 characters, with uppercase, lowercase, and a number.",
        );
        return;
      }
      failToast(
        err instanceof Error
          ? err.message
          : isBn
            ? "একাউন্ট তৈরি করা যায়নি"
            : "Couldn't create account",
      );
    }
  }

  async function submitCode(code: string) {
    if (code.length !== OTP_LENGTH || submittingRef.current) return;
    submittingRef.current = true;
    dispatch({ type: "patch", patch: { busy: true } });
    if (isPreview) {
      await sleep(500);
      dispatch({ type: "patch", patch: { busy: false, step: "basics" } });
      return;
    }
    try {
      await verifyTrialOtp(state.signupToken, code);
      dispatch({
        type: "patch",
        patch: { busy: false, step: "basics" },
      });
    } catch (err) {
      setDigits(emptyOtpDigits());
      submittingRef.current = false;
      failToast(
        err instanceof Error
          ? err.message
          : isBn
            ? "কোড যাচাই করা যায়নি"
            : "Couldn't verify code",
      );
    }
  }

  function handleDigits(next: string[]) {
    setDigits(next);
    if (next.join("").length === OTP_LENGTH) void submitCode(next.join(""));
  }

  async function handleVerify(e: FormEvent) {
    e.preventDefault();
    await submitCode(digits.join(""));
  }

  async function handleResend() {
    setResending(true);
    setResent(false);
    if (isPreview) {
      await sleep(400);
      setDigits(emptyOtpDigits());
      submittingRef.current = false;
      setResent(true);
      setResending(false);
      return;
    }
    try {
      await resendTrialOtp(state.signupToken);
      setDigits(emptyOtpDigits());
      submittingRef.current = false;
      setResent(true);
    } catch (err) {
      failToast(
        err instanceof Error
          ? err.message
          : isBn
            ? "কোড আবার পাঠানো যায়নি"
            : "Couldn't resend code",
      );
    } finally {
      setResending(false);
    }
  }

  async function handleBasics(e: FormEvent) {
    e.preventDefault();
    if (phone && !BD_PHONE_RE.test(phone)) {
      failToast(
        isBn
          ? "একটি সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 01XXXXXXXXX)।"
          : "Enter a valid Bangladeshi mobile number (e.g. 01XXXXXXXXX).",
      );
      return;
    }
    dispatch({ type: "patch", patch: { busy: true } });
    if (isPreview) {
      await sleep(500);
      dispatch({ type: "patch", patch: { busy: false, step: "theme" } });
      return;
    }
    try {
      await updateTrialDetails({
        signup_token: state.signupToken,
        shop_name: shopName.trim(),
        phone: phone.trim() || undefined,
        tagline: tagline.trim() || undefined,
        category: category || undefined,
      });
      dispatch({
        type: "patch",
        patch: { busy: false, step: "theme" },
      });
    } catch (err) {
      failToast(
        err instanceof Error
          ? err.message
          : isBn
            ? "তথ্য সংরক্ষণ করা যায়নি"
            : "Couldn't save details",
      );
    }
  }

  async function handleTheme(e: FormEvent) {
    e.preventDefault();
    dispatch({ type: "patch", patch: { step: "building", busy: true } });
    if (isPreview) {
      // No real account, no real tokens — useTrialBuild still drives the
      // full staggered checklist animation off this fake promise; the only
      // thing that differs is which onHandoff it calls once done (see
      // previewComplete above), so nothing here ever reaches the backend.
      setPending(sleep(600).then(() => ({
        access_token: "preview",
        refresh_token: "preview",
        token_type: "bearer",
        expires_in: 0,
      })));
      return;
    }
    // Fired immediately, not awaited first — useTrialBuild starts animating
    // the instant this promise exists, in parallel with the real request,
    // instead of sitting frozen until the response comes back.
    const request = completeTrialSignup({
      signup_token: state.signupToken,
      template_key: state.templateKey,
      theme: {
        primary_color: state.primaryColor,
        font: state.displayFont,
        body_font: state.bodyFont,
      },
    });
    setPending(request);
    try {
      await request;
    } catch (err) {
      setPending(null);
      dispatch({ type: "patch", patch: { step: "theme" } });
      failToast(
        err instanceof Error
          ? err.message
          : isBn
            ? "সাইনআপ সম্পন্ন করা যায়নি"
            : "Couldn't finish signup",
      );
    }
  }

  const stepIndex = STEPS.indexOf(state.step);

  function goBack() {
    if (stepIndex > 0) {
      dispatch({ type: "patch", patch: { step: STEPS[stepIndex - 1]! } });
    } else {
      window.location.assign("/");
    }
  }

  return (
    <>
    {isPreview ? (
      <div className="fixed top-0 inset-x-0 z-50 bg-amber-500 px-4 py-1.5 text-center text-xs font-semibold text-white">
        {isBn
          ? "প্রিভিউ মোড: কোনো একাউন্ট তৈরি হবে না"
          : "Preview mode: no account will be created"}
      </div>
    ) : null}
    <AuthShell
      title={copy.title}
      subtitle={copy.subtitle}
      headerBadge={
        <span className="rounded-full bg-primary px-3.5 py-1.5 text-sm font-semibold text-white">
          {state.step === "building"
            ? isBn
              ? "প্রায় শেষ"
              : "Almost there"
            : isBn
              ? `ধাপ ${stepIndex + 1} / ${STEPS.length}`
              : `Step ${stepIndex + 1} of ${STEPS.length}`}
        </span>
      }
      // A dedicated .lottie per step (public/*.lottie) — building's is
      // shown alone rather than layered under StoreBuildArt's ring: the
      // percentage + checklist already live in the form column to the
      // right, and the ring fought with the artwork visually without
      // adding information the checklist doesn't already show.
      leftPanel={<LottiePanel src={STEP_LOTTIE[state.step]} />}
      headerRight={
        state.step === "account" ? (
          <p className="text-xs text-muted sm:text-sm">
            {isBn ? "একাউন্ট আছে?" : "Have an account?"}{" "}
            <a
              href={DASHBOARD_URL}
              className="font-medium text-primary hover:underline"
            >
              {isBn ? "সাইন ইন করুন" : "Sign in"}
            </a>
          </p>
        ) : undefined
      }
    >
      {state.step === "account" ? (
        <AccountStep
          locale={locale}
          fullName={fullName}
          email={state.email}
          password={password}
          confirmPassword={confirmPassword}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          busy={state.busy}
          needsChallenge={needsChallenge}
          hasV2Fallback={hasV2Fallback}
          v2Token={v2Token}
          v2Ref={v2Ref}
          onFullName={setFullName}
          onEmail={(v) => dispatch({ type: "patch", patch: { email: v } })}
          onPassword={setPassword}
          onConfirmPassword={setConfirmPassword}
          onTogglePassword={() => setShowPassword((v) => !v)}
          onToggleConfirm={() => setShowConfirmPassword((v) => !v)}
          onV2Verify={setV2Token}
          onSubmit={handleAccount}
        />
      ) : null}

      {state.step === "verify" ? (
        <VerifyStep
          locale={locale}
          email={state.email}
          digits={digits}
          busy={state.busy}
          resending={resending}
          resent={resent}
          onDigits={handleDigits}
          onSubmit={handleVerify}
          onResend={handleResend}
        />
      ) : null}

      {state.step === "basics" ? (
        <BasicsStep
          locale={locale}
          shopName={shopName}
          category={category}
          phone={phone}
          tagline={tagline}
          busy={state.busy}
          onShopName={setShopName}
          onCategory={setCategory}
          onPhone={setPhone}
          onTagline={setTagline}
          onSubmit={handleBasics}
        />
      ) : null}

      {state.step === "building" ? (
        <BuildingStoreScreen done={buildDone} pct={buildPct} locale={locale} />
      ) : null}

      {state.step === "theme" ? (
        <ThemeStep
          locale={locale}
          templateKey={state.templateKey}
          primaryColor={state.primaryColor}
          displayFont={state.displayFont}
          bodyFont={state.bodyFont}
          busy={state.busy}
          onTemplate={(key) =>
            dispatch({ type: "patch", patch: { templateKey: key } })
          }
          onColor={(color) =>
            dispatch({ type: "patch", patch: { primaryColor: color } })
          }
          onDisplayFont={(font) =>
            dispatch({ type: "patch", patch: { displayFont: font } })
          }
          onBodyFont={(font) =>
            dispatch({ type: "patch", patch: { bodyFont: font } })
          }
          onSubmit={handleTheme}
        />
      ) : null}
    </AuthShell>
    <WizardDock
      onBack={goBack}
      locale={locale}
      // Once the email is verified (basics/theme/building), there's
      // nowhere useful to go back to — re-showing account or verify would
      // just re-enter an already-completed step. Only account (-> home)
      // and verify (-> account) can still go back.
      backDisabled={
        (state.step !== "account" && state.step !== "verify") || state.busy
      }
    />
    {isPreview ? (
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          type="button"
          aria-label="Skip to previous step"
          onClick={skipBack}
          disabled={state.step === "account"}
          className="inline-flex size-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          <ChevronLeft className="size-5" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          aria-label="Skip to next step"
          onClick={skipForward}
          disabled={state.step === "building"}
          className="inline-flex size-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          <ChevronRight className="size-5" strokeWidth={2.5} />
        </button>
      </div>
    ) : null}
    </>
  );
}
