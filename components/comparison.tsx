"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "./ui/button";

type Row = {
  softune: string;
  others: string;
  /** True = both sides genuinely have this (doc explicitly flags it as
   * table stakes among BD builders) — shown as a check on both columns
   * instead of a manufactured "win," which is what actually makes the
   * other rows' claims credible. */
  parity?: boolean;
};

/**
 * Every row here is a verified, sourced claim from
 * docs/market-analysis-comparison.md's research into real Bangladesh-native
 * store builders — never a named competitor (per that doc's own guidance,
 * exact BD competitor pricing/features shift and aren't fully public), and
 * never a claim that doc couldn't back with a real source. Rows we could
 * have added but left out on purpose: "unclear limits," "no guidance," or
 * any other generic dig no source actually verified about a real BD
 * builder — padding the list with those would be exactly the kind of
 * self-praise this rewrite was meant to replace.
 */
const rows: Row[] = [
  {
    softune: "0% transaction fee, every plan",
    others: "Some take a cut of every order you sell",
  },
  {
    softune: "No setup fee, ever",
    others: "Some charge a one-time setup fee (e.g. ৳5,000)",
  },
  {
    softune: "AI assistant across products, categories & theme direction",
    others: "Rare, and usually just one narrow AI writing tool",
  },
  {
    softune: "Multiple real storefront themes + a live AI theme editor",
    others: "Usually one fixed theme per merchant",
  },
  {
    softune: "26 built-in add-ons, categorized by use case",
    others: "Limited or no add-on ecosystem",
  },
  {
    softune: "COD, bKash, Nagad, SSLCommerz & BD courier connects",
    others: "Standard here too, since most BD builders offer it",
    parity: true,
  },
];

/** Sourced directly (see docs/market-analysis-comparison.md §2) — unlike the
 * BD builders above, Shopify's pricing is fully public, so it's safe to
 * name and cite an exact number for, not just describe generically. */
const globalComparison = {
  name: "Shopify",
  fact: "charges roughly 2.8%–3.0% per sale on top of its subscription",
};

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
              Softune vs Bangladeshi Builders
            </span>
          </motion.div>

          <h2 className="max-w-3xl text-3xl leading-[1.2] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.15] md:text-5xl">
            No hidden{" "}
            <span className="relative ml-0.5 inline-block px-2.5 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)]" />
              <em className="relative not-italic text-white">costs</em>
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] sm:mt-6 sm:text-[17px] md:text-[18px]">
            Most Bangladeshi store builders charge extra somewhere: a setup
            fee, a cut of every order, or a paywalled feature. Softune
            doesn&apos;t.
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
                  No transaction fee, no setup fee, and a real AI assistant
                  with storefront themes built in.
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
                  Typical BD builders
                </p>
                <h3 className="text-xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-2xl">
                  What you'll find elsewhere
                </h3>
                <p className="mt-3 max-w-[280px] text-[14px] leading-snug font-medium text-[var(--color-muted)]">
                  Usually costs more and does less.
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
                  {row.parity ? (
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-[var(--color-muted-soft)]"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <X
                      className="mt-0.5 size-4 shrink-0 text-[var(--color-muted-soft)]"
                      strokeWidth={2.5}
                    />
                  )}
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

        {/* Global platforms have fully public pricing, unlike the BD
         * builders above — safe to name and cite an exact sourced number
         * for (docs/market-analysis-comparison.md §2), rather than the
         * anonymized framing the local comparison uses. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-1.5 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-6 py-5 text-center sm:mt-8"
        >
          <p className="text-[14px] leading-relaxed font-medium text-[var(--color-muted)] sm:text-[15px]">
            Comparing to a global platform instead?{" "}
            <span className="font-semibold text-[var(--color-ink)]">
              {globalComparison.name}
            </span>{" "}
            {globalComparison.fact}. Softune&apos;s is 0%, on every plan.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
