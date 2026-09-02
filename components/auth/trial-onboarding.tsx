"use client";

import { useEffect, useReducer, useRef, useState, type FormEvent } from "react";
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
import { ThemeStep, type TemplateKey } from "./trial-theme-step";

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
    subtitle: "Enter the 6-digit code we sent. It expires in 10 minutes.",
  },
  basics: {
    title: "Tell us about your shop",
    subtitle: "Shop name is required. Phone is a Bangladeshi mobile number.",
  },
  theme: {
    title: "Pick a look",
    subtitle: "Theme, color, heading and body fonts. You can change this later.",
  },
  building: {
    title: "Building your store",
    subtitle: "Hang tight — we're putting the last pieces in place.",
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

const initial: WizardState = {
  step: "account",
  signupToken: "",
  email: "",
  templateKey: "aurora",
  primaryColor: "#F97316",
  displayFont: "fraunces",
  bodyFont: "inter",
  busy: false,
};

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

export function TrialOnboarding() {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(reducer, initial);
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
  const { done: buildDone, pct: buildPct } = useTrialBuild(
    pending,
    handoffToDashboard,
  );

  useEffect(() => {
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
  }, []);

  const copy = STEP_COPY[state.step];

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
      failToast("Passwords don't match.");
      return;
    }
    dispatch({ type: "patch", patch: { busy: true } });
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
            title: err.message || "Couldn't verify you're human",
            variant: "error",
          });
        }
        return;
      }
      v2Ref.current?.reset();
      if (isPassword422(err)) {
        const missing = missingPasswordBits(password);
        failToast(
          "Password format isn't right",
          missing.length
            ? `Add: ${missing.join(", ")}.`
            : "Use at least 8 characters, with uppercase, lowercase, and a number.",
        );
        return;
      }
      failToast(err instanceof Error ? err.message : "Couldn't create account");
    }
  }

  async function submitCode(code: string) {
    if (code.length !== OTP_LENGTH || submittingRef.current) return;
    submittingRef.current = true;
    dispatch({ type: "patch", patch: { busy: true } });
    try {
      await verifyTrialOtp(state.signupToken, code);
      dispatch({
        type: "patch",
        patch: { busy: false, step: "basics" },
      });
    } catch (err) {
      setDigits(emptyOtpDigits());
      submittingRef.current = false;
      failToast(err instanceof Error ? err.message : "Couldn't verify code");
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
    try {
      await resendTrialOtp(state.signupToken);
      setDigits(emptyOtpDigits());
      submittingRef.current = false;
      setResent(true);
    } catch (err) {
      failToast(err instanceof Error ? err.message : "Couldn't resend code");
    } finally {
      setResending(false);
    }
  }

  async function handleBasics(e: FormEvent) {
    e.preventDefault();
    if (phone && !BD_PHONE_RE.test(phone)) {
      failToast("Enter a valid Bangladeshi mobile number (e.g. 01XXXXXXXXX).");
      return;
    }
    dispatch({ type: "patch", patch: { busy: true } });
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
      failToast(err instanceof Error ? err.message : "Couldn't save details");
    }
  }

  async function handleTheme(e: FormEvent) {
    e.preventDefault();
    dispatch({ type: "patch", patch: { step: "building", busy: true } });
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
      failToast(err instanceof Error ? err.message : "Couldn't finish signup");
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
    <AuthShell
      title={copy.title}
      subtitle={copy.subtitle}
      headerBadge={
        <span className="rounded-full bg-primary px-3.5 py-1.5 text-sm font-semibold text-white">
          {state.step === "building"
            ? "Almost there"
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
            Have an account?{" "}
            <a
              href={DASHBOARD_URL}
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </a>
          </p>
        ) : undefined
      }
    >
      {state.step === "account" ? (
        <AccountStep
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
        <BuildingStoreScreen done={buildDone} pct={buildPct} />
      ) : null}

      {state.step === "theme" ? (
        <ThemeStep
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
      // Once the email is verified (basics/theme/building), there's
      // nowhere useful to go back to — re-showing account or verify would
      // just re-enter an already-completed step. Only account (-> home)
      // and verify (-> account) can still go back.
      backDisabled={
        (state.step !== "account" && state.step !== "verify") || state.busy
      }
    />
    </>
  );
}
