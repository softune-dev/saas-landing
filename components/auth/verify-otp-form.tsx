"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { getLeadToken, resendOtp, verifyOtp } from "@/lib/leads";
import { AuthShell, primaryBtnClass } from "./auth-shell";
import { OTP_LENGTH, OtpBoxes, emptyOtpDigits } from "./otp-boxes";

export function VerifyOtpForm() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(emptyOtpDigits);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const submittingRef = useRef(false);

  const otp = digits.join("");

  useEffect(() => {
    if (!getLeadToken()) router.replace("/signup");
  }, [router]);

  async function submitCode(code: string) {
    if (code.length !== OTP_LENGTH || submittingRef.current) return;
    submittingRef.current = true;
    setError(null);
    setBusy(true);
    try {
      await verifyOtp(code);
      router.push("/basics");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't verify code");
      setDigits(emptyOtpDigits());
      setBusy(false);
      submittingRef.current = false;
    }
  }

  function handleDigits(next: string[]) {
    setDigits(next);
    if (next.join("").length === OTP_LENGTH) void submitCode(next.join(""));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await submitCode(otp);
  }

  async function handleResend() {
    setError(null);
    setResending(true);
    setResent(false);
    try {
      await resendOtp();
      setDigits(emptyOtpDigits());
      setResent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't resend code");
    } finally {
      setResending(false);
    }
  }

  return (
    <AuthShell
      title="Check your email"
      subtitle="Enter the 6-digit code we sent. It expires in 10 minutes."
    >
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2.5">
          <span className="text-sm font-medium text-foreground">
            Verification code
          </span>
          <OtpBoxes value={digits} onChange={handleDigits} disabled={busy} />
        </div>

        {error ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-400">
            {error}
          </div>
        ) : null}

        {resent ? (
          <p className="text-xs font-medium text-primary">
            A new code is on the way.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={busy || otp.length !== OTP_LENGTH}
          className={primaryBtnClass}
        >
          {busy ? (
            <>
              <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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
            onClick={handleResend}
            disabled={resending || busy}
            className="font-medium text-primary hover:underline disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend code"}
          </button>
        </p>
      </form>
    </AuthShell>
  );
}
