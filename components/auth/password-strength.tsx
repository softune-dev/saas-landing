"use client";

/**
 * Compact live feedback for the backend's actual password rule (see
 * app/schemas.py's TrialStartIn._password_strength): 8+ chars, uppercase,
 * lowercase, a digit. This is a UX nicety only — the real enforcement is
 * server-side, so this never needs to block submission, just show progress.
 */
type PasswordStrengthProps = {
  password: string;
};

const RULES = [
  { label: "8+ characters", test: (v: string) => v.length >= 8 },
  { label: "uppercase", test: (v: string) => /[A-Z]/.test(v) },
  { label: "lowercase", test: (v: string) => /[a-z]/.test(v) },
  { label: "a number", test: (v: string) => /[0-9]/.test(v) },
];

/** Same list the live meter shows — 422 toasts reuse this so the toast
 * tells them what to add instead of FastAPI's one-rule-at-a-time msg. */
export function missingPasswordBits(password: string): string[] {
  return RULES.filter((r) => !r.test(password)).map((r) => r.label);
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  if (!password) return null;

  const metCount = RULES.filter((r) => r.test(password)).length;
  const missing = missingPasswordBits(password);
  const barColor =
    metCount <= 1
      ? "bg-rose-500"
      : metCount <= 3
        ? "bg-amber-500"
        : "bg-emerald-500";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1">
        {RULES.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < metCount ? barColor : "bg-border"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-soft">
        {missing.length > 0 ? `Add: ${missing.join(", ")}` : "Strong password"}
      </p>
    </div>
  );
}
