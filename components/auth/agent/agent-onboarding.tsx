"use client";

import { track } from "@vercel/analytics";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useToast } from "@/components/ui/toast";
import { RecaptchaChallengeRequiredError, isPassword422 } from "@/lib/api";
import { getRecaptchaToken, hasV2Fallback } from "@/lib/recaptcha";
import { DASHBOARD_URL } from "@/lib/site";
import { readAttribution, trackMeta, trackMetaOnce, userIdFromAccessToken, type MetaUserData } from "@/lib/meta";
import {
  HERO_IDEA_KEY,
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
import { BD_PHONE_RE } from "../trial-steps";
import { BODY_FONTS, COLOR_SWATCHES, HEADING_FONTS, type TemplateKey } from "../trial-theme-step";
import { resetHandoffGuard, useTrialBuild } from "../use-trial-build";
import {
  LOCAL_STEPS,
  STEPS,
  inferCategory,
  inferName,
  recommendTemplate,
  t,
  templateFor,
  type Locale,
  type StepId,
} from "./agent-copy";
import { AgentShell } from "./agent-shell";
import { Transcript, type Draft } from "./agent-transcript";

const DRAFT_KEY = "softune.trial.draft";

function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)]!;
}

function freshDraft(): Draft {
  return {
    idea: "",
    name: "",
    category: "",
    templateKey: "bazaar",
    color: pick(COLOR_SWATCHES),
    displayFont: pick(HEADING_FONTS).value,
    bodyFont: pick(BODY_FONTS).value,
    phone: "",
    done: [],
  };
}

/** Only fills blanks: an idea typed after the name was already chosen
 * must not overwrite what the merchant confirmed. */
function applyIdea(d: Draft, idea: string): Draft {
  const category = d.category || inferCategory(idea) || "";
  return {
    ...d,
    idea,
    name: d.name || inferName(idea) || "",
    category,
    templateKey: d.done.includes("look") ? d.templateKey : recommendTemplate(category),
    done: [...new Set<StepId>([...d.done, "idea"])],
  };
}

// Every storage access is wrapped: private windows and blocked site data
// throw, and the flow must still work, just without resume.
function readStore(store: "local" | "session", key: string): string | null {
  try {
    return (store === "local" ? localStorage : sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function loadDraft(): Draft | null {
  const raw = readStore("local", DRAFT_KEY);
  if (!raw) return null;
  try {
    return { ...freshDraft(), ...(JSON.parse(raw) as Partial<Draft>) };
  } catch {
    return null;
  }
}

function takeHeroIdea(): string {
  const idea = readStore("session", HERO_IDEA_KEY) ?? "";
  try {
    sessionStorage.removeItem(HERO_IDEA_KEY);
  } catch {}
  return idea.trim();
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
  trackMeta("CompleteRegistration", { content_name: "Free trial", status: "trial" }, {
    ...user,
    externalId: userIdFromAccessToken(access),
  });
  track("trial_signup");
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {}
  storeDashboardSession(access, refresh);
  const hash = new URLSearchParams({ softune_at: access, softune_rt: refresh }).toString();
  window.location.assign(`${DASHBOARD_URL}/onboarding#${hash}`);
}

function readPreviewFlag() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("preview") === "1";
}

function errText(err: unknown, fallback: string) {
  return err instanceof Error && err.message ? err.message : fallback;
}

export function AgentOnboarding({ locale = "en" }: { locale?: Locale }) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  const { toast } = useToast();
  const [isPreview] = useState(readPreviewFlag);
  const [checking, setChecking] = useState(true);
  const [draft, setDraft] = useState<Draft>(freshDraft);
  const [editing, setEditing] = useState<StepId | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [needsChallenge, setNeedsChallenge] = useState(false);
  const [v2Token, setV2Token] = useState<string | null>(null);
  const v2Ref = useRef<RecaptchaV2FallbackHandle>(null);
  const [busy, setBusy] = useState(false);

  const [signupToken, setSignupToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [viaGoogle, setViaGoogle] = useState(false);
  const [digits, setDigits] = useState<string[]>(emptyOtpDigits);
  const submittingRef = useRef(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const [pending, setPending] = useState<Promise<TrialTokensOut> | null>(null);
  const [buildError, setBuildError] = useState<string | null>(null);

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
    setDraft(freshDraft());
  }, [locale, toast]);

  // Latest contact details for CompleteRegistration, read through a ref so
  // the handoff callback stays stable (useTrialBuild re-runs when it changes).
  const metaUserRef = useRef<MetaUserData>({});
  {
    const [firstName, ...rest] = fullName.trim().split(/\s+/);
    metaUserRef.current = {
      email: email.trim() || undefined,
      phone: draft.phone || undefined,
      firstName: firstName || undefined,
      lastName: rest.join(" ") || undefined,
    };
  }
  const handoff = useCallback(
    (access: string, refresh: string) => handoffToDashboard(access, refresh, metaUserRef.current),
    [],
  );

  const { done: buildDone, pct: buildPct } = useTrialBuild(pending, isPreview ? previewComplete : handoff);

  useEffect(() => {
    const heroIdea = takeHeroIdea();
    // A new idea from the hero starts the shop questions over; otherwise
    // pick up wherever this browser left off.
    let base = heroIdea ? applyIdea(freshDraft(), heroIdea) : loadDraft() ?? freshDraft();
    if (isPreview) {
      setDraft(base);
      setChecking(false);
      return;
    }
    let cancelled = false;
    getTrialSignupStatus().then((status) => {
      if (cancelled) return;
      if (status) {
        setSignupToken(status.signup_token);
        setEmail(status.email);
        if (status.full_name) setFullName(status.full_name);
        setVerified(status.email_verified);
        if (status.shop_name && status.phone) {
          // Details already saved server-side (an earlier visit): nothing
          // left to ask about the shop except its look.
          base = {
            ...base,
            name: status.shop_name,
            phone: status.phone,
            category: status.category ?? base.category,
            done: [...new Set<StepId>([...base.done, "idea", "name", "category", "phone"])],
          };
        }
      }
      setDraft(base);
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
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {}
  }, [draft, checking, isPreview]);

  function isDone(s: StepId) {
    if (s === "account") return !!signupToken;
    if (s === "verify") return verified;
    if (s === "build") return false;
    return draft.done.includes(s);
  }
  const current: StepId = editing ?? STEPS.find((s) => !isDone(s)) ?? "build";

  function finish(step: StepId, patch: Partial<Draft> = {}) {
    setDraft((d) => ({ ...d, ...patch, done: [...new Set<StepId>([...d.done, step])] }));
    setEditing(null);
    setError(null);
  }

  function answerIdea(text: string) {
    setDraft((d) => applyIdea(d, text.trim()));
    setEditing(null);
    setError(null);
  }

  function answerCategory(value: string) {
    setDraft((d) => ({
      ...d,
      category: value,
      templateKey: d.done.includes("look") ? d.templateKey : recommendTemplate(value),
      done: [...new Set<StepId>([...d.done, "category"])],
    }));
    setEditing(null);
    setError(null);
  }

  function answerPhone(phone: string) {
    if (!BD_PHONE_RE.test(phone)) {
      setError(L("That doesn't look like a Bangladeshi mobile number. Try 01XXXXXXXXX.", "এটি সঠিক বাংলাদেশি মোবাইল নম্বর মনে হচ্ছে না। 01XXXXXXXXX এভাবে দিন।"));
      return;
    }
    finish("phone", { phone });
  }

  function startBuild() {
    setBuildError(null);
    setEditing(null);
    if (isPreview) {
      setPending(sleep(600).then(() => FAKE_TOKENS));
      return;
    }
    // Fired, not awaited: the checklist animates while the request runs.
    const request = updateTrialDetails({
      signup_token: signupToken,
      shop_name: draft.name.trim(),
      phone: draft.phone,
      category: draft.category || undefined,
    }).then(() =>
      completeTrialSignup({
        signup_token: signupToken,
        template_key: draft.templateKey,
        theme: { primary_color: draft.color, font: draft.displayFont, body_font: draft.bodyFont },
        attribution: readAttribution(),
      }),
    );
    setPending(request);
    request.catch((err) => {
      setPending(null);
      setBuildError(errText(err, L("Couldn't build the store.", "স্টোর তৈরি করা যায়নি।")));
    });
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
        email: email.trim(),
        password,
        full_name: fullName.trim() || undefined,
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
        const missing = missingPasswordBits(password, locale);
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
      // Google's name/email, for the chat and for CompleteRegistration.
      const status = await getTrialSignupStatus();
      if (status?.email) setEmail(status.email);
      if (status?.full_name) setFullName(status.full_name);
      setSignupToken(out.signup_token);
      setViaGoogle(true);
      setVerified(true);
      trackMetaOnce("Lead", "signup-form", { content_name: "Signup form" });
      if (LOCAL_STEPS.every((s) => draft.done.includes(s))) startBuild();
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
      setBusy(false);
      // Every shop answer comes before the account, so verifying is the
      // last thing the merchant does: build straight away.
      if (LOCAL_STEPS.every((s) => draft.done.includes(s))) startBuild();
    } catch (err) {
      setDigits(emptyOtpDigits());
      submittingRef.current = false;
      setBusy(false);
      setError(errText(err, L("That code didn't work.", "কোডটি কাজ করেনি।")));
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
    setViaGoogle(false);
    setDigits(emptyOtpDigits());
    submittingRef.current = false;
    setResent(false);
    setError(null);
  }

  if (checking) return null;

  const progress = pending ? 1 : STEPS.indexOf(current) / (STEPS.length - 1);
  const buildState = {
    started: !!pending,
    finished: !!pending && buildDone.every(Boolean),
    pct: buildPct,
  };

  return (
    <AgentShell
      locale={locale}
      isPreview={isPreview}
      progress={progress}
      showSignIn={!signupToken}
      showPanel={false}
      panel={null}
      thumb={templateFor(draft.templateKey).image}
      autoScrollKey={current}
    >
      <Transcript
        locale={locale}
        draft={draft}
        setDraft={setDraft}
        current={current}
        isDone={isDone}
        editing={editing}
        canEdit={!pending && !busy}
        onEdit={(s) => {
          setEditing(s);
          setError(null);
        }}
        onCancelEdit={() => setEditing(null)}
        error={error}
        clearError={() => setError(null)}
        answerIdea={answerIdea}
        answerName={(name) => finish("name", { name })}
        answerCategory={answerCategory}
        answerLook={() => finish("look")}
        answerPhone={answerPhone}
        account={{
          fullName, email, password, showPassword, busy, needsChallenge, v2Token, v2Ref,
          hasV2Fallback,
          onFullName: (v: string) => {
            setFullName(v);
            if (!isPreview) trackMetaOnce("Lead", "signup-form", { content_name: "Signup form" });
          },
          onEmail: (v: string) => {
            setEmail(v);
            if (!isPreview) trackMetaOnce("Lead", "signup-form", { content_name: "Signup form" });
          },
          onPassword: setPassword,
          onTogglePassword: () => setShowPassword((v) => !v),
          onV2Verify: setV2Token,
          onSubmit: handleAccount,
          onGoogle: isPreview ? undefined : handleGoogle,
          viaGoogle,
        }}
        verify={{
          digits, busy, resending, resent,
          onDigits: (next) => {
            setDigits(next);
            if (next.join("").length === OTP_LENGTH) void submitCode(next.join(""));
          },
          onSubmit: (e) => {
            e.preventDefault();
            void submitCode(digits.join(""));
          },
          onResend: handleResend,
          onChangeEmail: changeEmail,
        }}
        build={{ started: !!pending, done: buildDone, error: buildError, onStart: startBuild }}
      />
    </AgentShell>
  );
}