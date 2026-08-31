/** Required by Google's reCAPTCHA terms when the floating badge is hidden. */
export function RecaptchaDisclosure() {
  return (
    <p className="text-center text-[11px] leading-relaxed text-muted-soft">
      This site is protected by reCAPTCHA and the Google{" "}
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-muted"
      >
        Privacy Policy
      </a>{" "}
      and{" "}
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-muted"
      >
        Terms of Service
      </a>{" "}
      apply.
    </p>
  );
}
