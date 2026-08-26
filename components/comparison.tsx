"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "./ui/button";

type Row = {
  softune: string;
  others: string;
};

/** Softune differentiators first: AI and themes lead; ops stack follows. */
const rows: Row[] = [
  {
    softune: "Native AI Assistant baked into the dashboard",
    others: "Bolt-on chat widgets or paid AI upsells",
  },
  {
    softune: "1-click theme switching across Aurora, Bazaar & Sweets",
    others: "One rigid template you are stuck with",
  },
  {
    softune: "Guided onboarding checklist and product tour",
    others: "Setup docs and YouTube as your “support”",
  },
  {
    softune: "AI Theme Editor with brand color suggestions",
    others: "Manual brand setup with no guidance",
  },
  {
    softune: "Unified products & variants in one place",
    others: "Product tools split across plugins",
  },
  {
    softune: "Payments & courier integrations wired in",
    others: "Gateway plugins you install and maintain",
  },
  {
    softune: "Add-Ons Marketplace with 26 native apps",
    others: "Fragile third-party apps with store fees",
  },
  {
    softune: "Transparent plan caps for storage & AI credits",
    others: "Surprise overages and unclear limits",
  },
  {
    softune: "Instant CSV, PDF & JSON exports",
    others: "Limited or paywalled data exports",
  },
];

export function Comparison() {
  return (
    <section
      id="comparison"
      className="border-b border-[var(--color-line)] bg-[var(--color-canvas)] py-14 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <div className="mx-auto mb-10 flex flex-col items-center text-center md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 pr-3 md:mb-6 md:gap-3 md:p-1.5 md:pr-4"
          >
            <div className="flex size-5 items-center justify-center rounded-full bg-[var(--color-brand)]/10 md:size-6">
              <img
                src="/icons/zap.svg"
                alt=""
                className="size-3 object-contain md:size-3.5 dark:invert"
              />
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
              Softune vs Others
            </span>
          </motion.div>

          <h2 className="max-w-3xl text-3xl leading-[1.2] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.15] md:text-5xl">
            Built different,{" "}
            <span className="relative ml-0.5 inline-block px-2.5 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)]" />
              <em className="relative not-italic text-white">on purpose</em>
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] sm:mt-6 sm:text-[17px] md:text-[18px]">
            Typical platforms stitch tools together. Softune ships AI, themes,
            and ops in one place, so you sell instead of assemble.
          </p>
        </div>

        <div className="grid items-stretch gap-4 md:grid-cols-2 md:gap-5">
          {/* Softune first on mobile; column 2 on desktop. */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.06 }}
            className="relative flex flex-col overflow-hidden rounded-xl border-2 border-[var(--color-brand)] md:col-start-2 md:row-start-1"
          >
            <div className="relative overflow-hidden border-b border-[var(--color-brand)] bg-[var(--color-ink)] px-5 py-6 sm:px-7 sm:py-7 dark:bg-[#0c0c0c]">
              {/* Always-dark header: white dots so they read on ink in light mode too. */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 h-full w-3/4 opacity-90 [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_75%)]"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.18) 1.5px, transparent 1.5px)",
                  backgroundSize: "8px 8px",
                }}
              />
              <div className="relative z-10">
                <p className="mb-4 text-[11px] font-bold tracking-[0.14em] text-[var(--color-brand)] uppercase">
                  Recommended
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-white.png"
                  alt="Softune"
                  className="h-10 w-auto object-contain sm:h-12"
                />
                <p className="mt-4 max-w-[280px] text-[14px] leading-snug font-medium text-white/65">
                  Native AI, real themes, and ops that ship with the store.
                </p>
              </div>
            </div>

            <ul className="flex flex-1 flex-col bg-[var(--color-surface)]">
              {rows.map((row, i) => (
                <li
                  key={row.softune}
                  className={`flex items-start gap-3 px-5 py-3.5 sm:px-7 sm:py-4 ${
                    i < rows.length - 1
                      ? "border-b border-[var(--color-line)]"
                      : ""
                  }`}
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-[var(--color-brand)]"
                    strokeWidth={2.75}
                  />
                  <span className="text-[14px] leading-snug font-semibold text-[var(--color-ink)] sm:text-[15px]">
                    {row.softune}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)] p-5 sm:p-7">
              <Button
                as="a"
                href="/signup"
                variant="primary"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg py-3.5 text-[14px] font-bold"
              >
                Start with Softune
                <img
                  src="/icons/arrow-right.svg"
                  alt=""
                  className="size-4 object-contain brightness-0 invert"
                />
              </Button>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] md:col-start-1 md:row-start-1"
          >
            {/*
              Header must not use canvas: section is canvas in light mode, so a
              canvas list looked like it had no card body. Tint header off surface
              instead; list stays pure surface against the page canvas.
            */}
            <div
              className="relative overflow-hidden border-b border-[var(--color-line)] px-5 py-6 sm:px-7 sm:py-7"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-ink) 6%, var(--color-surface))",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 h-full w-[85%] opacity-100 [mask-image:radial-gradient(circle_at_top_right,black_10%,transparent_78%)]"
                style={{
                  backgroundImage:
                    "radial-gradient(color-mix(in srgb, var(--color-ink) 22%, transparent) 1.5px, transparent 1.5px)",
                  backgroundSize: "8px 8px",
                }}
              />
              <div className="relative z-10">
                <p className="mb-3 text-[11px] font-bold tracking-[0.14em] text-[var(--color-muted)] uppercase">
                  Typical platforms
                </p>
                <h3 className="text-xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-2xl">
                  The usual stack
                </h3>
                <p className="mt-3 max-w-[280px] text-[14px] leading-snug font-medium text-[var(--color-muted)]">
                  Plugins, upsells, and workarounds assembled by you.
                </p>
              </div>
            </div>

            <ul className="flex flex-1 flex-col bg-[var(--color-surface)]">
              {rows.map((row, i) => (
                <li
                  key={row.others}
                  className={`flex items-start gap-3 px-5 py-3.5 sm:px-7 sm:py-4 ${
                    i < rows.length - 1
                      ? "border-b border-[var(--color-line)]"
                      : ""
                  }`}
                >
                  <X
                    className="mt-0.5 size-4 shrink-0 text-[var(--color-muted-soft)]"
                    strokeWidth={2.5}
                  />
                  <span className="text-[14px] leading-snug font-medium text-[var(--color-muted)] sm:text-[15px]">
                    {row.others}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)] p-5 sm:p-7">
              <Button
                as="a"
                href="#pricing"
                variant="secondary"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg py-3.5 text-[14px] font-bold"
              >
                See Softune plans
                <img
                  src="/icons/arrow-right.svg"
                  alt=""
                  className="size-4 object-contain opacity-60 dark:invert"
                />
              </Button>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
