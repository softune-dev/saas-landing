"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { TRIAL_CTA, TRIAL_CTA_BN } from "@/lib/site";
import { DemoAccessModal } from "./demo-access-modal";

/** Shared Start Free + See Demo pair — homepage hero and feature pages. */
export function HeroCtas({
  locale = "en",
  className = "",
}: {
  locale?: "en" | "bn";
  className?: string;
}) {
  const [demoOpen, setDemoOpen] = useState(false);
  const isBn = locale === "bn";
  const signupHref = isBn ? "/bn/signup" : "/signup";
  const ctaText = isBn ? TRIAL_CTA_BN : TRIAL_CTA;
  const demoText = isBn ? "লাইভ ডেমো দেখুন" : "See Demo";

  return (
    <div
      className={[
        "flex w-full flex-row flex-wrap items-center justify-center gap-2.5 sm:w-auto sm:gap-3 md:gap-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative">
        <span
          className="pointer-events-none absolute -top-4 -left-4 size-5 bg-[var(--color-brand)] md:-top-6 md:-left-6 md:size-8"
          style={{
            maskImage: "url(/icons/splash.svg)",
            WebkitMaskImage: "url(/icons/splash.svg)",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
        <a
          href={signupHref}
          className="relative z-10 flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 sm:min-h-12 sm:px-6 sm:py-3 sm:text-[14px] md:px-8 md:py-4 md:text-[15px]"
        >
          {ctaText}
          {/* CSS mask + explicit white background instead of an <img> with
              a brightness/invert filter — some mobile browsers (notably
              Android Chrome's forced-dark image handling) re-tint filtered
              <img> icons even on a light-themed page, leaving this arrow
              looking grey instead of matching the button's white text. A
              masked solid shape isn't an image Chrome can re-tint. */}
          <span
            aria-hidden
            className="size-3.5 shrink-0 bg-white md:size-4"
            style={{
              maskImage: "url(/icons/arrow-right.svg)",
              WebkitMaskImage: "url(/icons/arrow-right.svg)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
        </a>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={() => setDemoOpen(true)}
        className="flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors hover:bg-[var(--color-brand)]/5 sm:min-h-12 sm:px-6 sm:py-3 sm:text-[14px] md:px-8 md:py-4 md:text-[15px]"
      >
        <img
          src="/icons/play.svg"
          alt=""
          className="size-3.5 object-contain md:size-4 dark:invert"
        />
        {demoText}
      </Button>
      <DemoAccessModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}
