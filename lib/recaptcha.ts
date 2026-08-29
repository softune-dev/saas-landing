/**
 * Google reCAPTCHA v2 (checkbox) — this site has no backend to score/verify
 * a v3 token against, so v2's visible "I'm not a robot" widget is the whole
 * check: Google's own risk analysis runs client-side and gates the checkbox
 * itself, which is what replaces the old fake "I am human" checkbox that
 * always passed. Mirrors dashboard/lib/recaptcha.ts's v2 half.
 */
declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      render: (
        container: HTMLElement,
        params: Record<string, unknown>,
      ) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export const hasRecaptcha = !!SITE_KEY;

// Module-level, not per-call: the script tag must only ever be added once no
// matter how many forms on the page render a widget.
let scriptLoad: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === "undefined" || !SITE_KEY) return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();
  if (scriptLoad) return scriptLoad;
  scriptLoad = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
  return scriptLoad;
}

export type RecaptchaWidgetHandle = { reset: () => void };

/** Renders the v2 checkbox into `container`. Returns null when no site key is
 * configured — callers should treat that as "verification unavailable" and
 * fall back to just requiring the fields, not block the form entirely. */
export async function renderRecaptcha(
  container: HTMLElement,
  onVerify: (token: string | null) => void,
): Promise<RecaptchaWidgetHandle | null> {
  if (!SITE_KEY) return null;
  await loadScript();
  return new Promise((resolve) => {
    window.grecaptcha!.ready(() => {
      const widgetId = window.grecaptcha!.render(container, {
        sitekey: SITE_KEY,
        callback: (token: string) => onVerify(token),
        "expired-callback": () => onVerify(null),
      });
      resolve({
        reset: () => window.grecaptcha?.reset(widgetId),
      });
    });
  });
}
