"use client";

import { motion } from "framer-motion";
import { Check, Gift } from "lucide-react";
import { freePlanCard } from "@/lib/pricing-data";

/** The Free plan, under the paid cards: half a row on desktop, beside what the
 * paid plans share. */
export function FreePlanCard({ locale = "en" }: { locale?: "en" | "bn" }) {
  const isBn = locale === "bn";
  const card = freePlanCard[locale];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.08 }}
      className="flex h-full flex-col rounded-[28px] border border-[var(--color-line)] bg-[var(--color-surface)] p-3"
    >
      {/* Price on the left, the plan's badge on the right. */}
      <div className="relative flex items-center justify-between gap-3 overflow-hidden rounded-[20px] px-5 py-4 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-2 scale-105 bg-cover bg-center blur-[2px]"
          style={{ backgroundImage: "url(/pricing/free.webp)" }}
        />
        <div className="relative">
          <p className="flex items-baseline gap-1.5">
            <span className="text-[40px] leading-none font-bold tracking-[-0.045em]" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
              ৳0
            </span>
            <span className="text-[13px] font-semibold text-white/85">/mo</span>
          </p>
          <p className="mt-1.5 text-[12.5px] font-semibold text-white/85">{card.note}</p>
        </div>
        <span className="relative inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/80 px-3.5 py-1.5 text-[13px] font-bold text-[#2a1306]">
          <Gift aria-hidden className="size-4 text-[var(--color-brand)]" strokeWidth={2.5} />
          Free
        </span>
      </div>

      <ul className="grid grid-cols-2 content-start gap-x-4 gap-y-3 px-3 pt-5 pb-5">
        {card.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-[13px] leading-snug font-medium text-[var(--color-ink-soft)]">
            <Check aria-hidden className="mt-[2px] size-3.5 shrink-0 text-[var(--color-brand)]" strokeWidth={3} />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={isBn ? "/bn/signup" : "/signup"}
        className="mt-auto flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-[14px] font-bold text-[var(--color-surface)] transition-opacity duration-200 hover:opacity-90"
      >
        {card.cta}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/arrow-right.svg" alt="" className="size-4 object-contain brightness-0 invert dark:invert-0" />
      </a>
    </motion.div>
  );
}
