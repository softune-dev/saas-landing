"use client";

import { motion } from "framer-motion";
import { Check, Gift } from "lucide-react";
import { freePlanCard } from "@/lib/pricing-data";

/** The Free plan, under the paid cards: one slim row on desktop, so it is easy
 * to find without competing with the plans above it. */
export function FreePlanCard({ locale = "en" }: { locale?: "en" | "bn" }) {
  const isBn = locale === "bn";
  const card = freePlanCard[locale];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mt-5 flex flex-col gap-4 rounded-[28px] border border-[var(--color-line)] bg-[var(--color-surface)] p-3 lg:mt-6 lg:flex-row lg:items-center lg:gap-7 lg:pr-6"
    >
      <div className="relative flex shrink-0 items-center justify-between gap-3 self-stretch overflow-hidden rounded-[20px] p-4 text-white lg:w-[240px] lg:flex-col lg:items-start lg:px-5">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-2 scale-105 bg-cover bg-center blur-[2px]"
          style={{ backgroundImage: "url(/pricing/free.webp)" }}
        />
        <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full border border-white/80 bg-white/80 px-3 py-1 text-[12.5px] font-bold text-[#2a1306]">
          <Gift aria-hidden className="size-3.5 text-[var(--color-brand)]" strokeWidth={2.5} />
          Free
        </span>
        <div className="relative text-right lg:text-left">
          <p className="flex items-baseline justify-end gap-1.5 lg:justify-start">
            <span className="text-[38px] leading-none font-bold tracking-[-0.045em]" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
              ৳0
            </span>
            <span className="text-[13px] font-semibold text-white/85">/mo</span>
          </p>
          <p className="mt-1.5 text-[12px] font-semibold text-white/85">{card.note}</p>
        </div>
      </div>

      <ul className="grid flex-1 grid-cols-2 content-center gap-x-4 gap-y-2 px-2 lg:gap-x-6 lg:px-0">
        {card.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-[12.5px] leading-snug font-medium text-[var(--color-ink-soft)] lg:text-[13px]">
            <Check aria-hidden className="mt-[2px] size-3.5 shrink-0 text-[var(--color-brand)]" strokeWidth={3} />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={isBn ? "/bn/signup" : "/signup"}
        className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-[14px] font-bold whitespace-nowrap text-[var(--color-surface)] transition-opacity duration-200 hover:opacity-90"
      >
        {card.cta}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/arrow-right.svg" alt="" className="size-4 object-contain brightness-0 invert dark:invert-0" />
      </a>
    </motion.div>
  );
}
