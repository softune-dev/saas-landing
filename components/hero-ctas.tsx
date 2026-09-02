"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { TRIAL_CTA } from "@/lib/site";
import { DemoAccessModal } from "./demo-access-modal";

/** Shared Start Free + See Demo pair — homepage hero and every feature page. */
export function HeroCtas({ className = "" }: { className?: string }) {
  const [demoOpen, setDemoOpen] = useState(false);

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
          href="/signup"
          className="relative z-10 flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 sm:min-h-12 sm:px-6 sm:py-3 sm:text-[14px] md:px-8 md:py-4 md:text-[15px]"
        >
          {TRIAL_CTA}
          <img
            src="/icons/arrow-right.svg"
            alt=""
            className="size-3.5 object-contain brightness-0 invert md:size-4"
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
        See Demo
      </Button>
      <DemoAccessModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}
