"use client";

import { useEffect, useRef } from "react";
import { hasRecaptcha, renderRecaptcha, type RecaptchaWidgetHandle } from "@/lib/recaptcha";

type RecaptchaCheckboxProps = {
  onVerify: (token: string | null) => void;
};

/** Replaces the old always-passing "I am human" checkbox with Google's real
 * reCAPTCHA v2 widget. Renders nothing (form just relies on required fields)
 * when NEXT_PUBLIC_RECAPTCHA_SITE_KEY isn't configured, so local dev without
 * the env var doesn't show a broken widget. */
export function RecaptchaCheckbox({ onVerify }: RecaptchaCheckboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<RecaptchaWidgetHandle | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!containerRef.current) return;
    renderRecaptcha(containerRef.current, onVerify).then((handle) => {
      if (cancelled) return;
      widgetRef.current = handle;
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- render once
  }, []);

  if (!hasRecaptcha) return null;

  return <div ref={containerRef} />;
}
