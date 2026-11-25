"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { CARD_SHADOW, Stage, useScenes } from "./stage";

/* The Free plan's real limits (app/plans.py). If they change there, change them
 * here. Free stores are deleted when left unused, so the wording is "free as long
 * as you're active", never "free forever". */
const COPY = {
  en: {
    plan: "Free plan",
    price: "৳0",
    per: "/month",
    commission: "0% commission",
    items: ["10 products", "50 orders a month", "100 MB storage", "Free store link"],
    cta: "Create your free store",
    note: "Free as long as you're active",
  },
  bn: {
    plan: "ফ্রি প্ল্যান",
    price: "৳০",
    per: "/মাস",
    commission: "০% কমিশন",
    items: ["১০টি প্রোডাক্ট", "মাসে ৫০টি অর্ডার", "১০০ MB স্টোরেজ", "নিজের স্টোর লিংক"],
    cta: "ফ্রি স্টোর খুলুন",
    note: "সক্রিয় থাকলে ফ্রি",
  },
};

const IDLE = [1000] as const;

/** The price tag that matters: nothing. */
export function FreeVisual({ bn }: { bn: boolean }) {
  const c = bn ? COPY.bn : COPY.en;
  const { ref, moving } = useScenes(IDLE);

  return (
    <Stage light="bottomRight" innerRef={ref} interactive>
      <style>{"@keyframes free-shine { 0%, 62% { transform: translateX(-130%) skewX(-18deg) } 88%, 100% { transform: translateX(420%) skewX(-18deg) } }"}</style>

      <div
        className={`absolute inset-x-[38px] top-[22px] bottom-[22px] flex flex-col rounded-[26px] bg-white p-5 text-[#171717] ring-1 ring-black/5 dark:bg-[#1d1a1c] dark:text-white dark:ring-white/15 ${CARD_SHADOW}`}
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#ff5a36]/12 px-3 py-1 text-[12.5px] font-bold text-[#c93c16] dark:bg-[#ff5a36]/20 dark:text-[#ff8a66]">
            {c.plan}
          </span>
          <span className="rounded-full bg-[#12804a]/10 px-3 py-1 text-[12.5px] font-bold text-[#0f7040] dark:bg-[#12a05c]/20 dark:text-[#5fd39a]">
            {c.commission}
          </span>
        </div>

        <p className="mt-3 flex items-baseline gap-1.5">
          <span className="text-[68px] leading-none font-extrabold tracking-tighter">{c.price}</span>
          <span className="text-[15px] font-semibold text-[#6d6661] dark:text-white/60">{c.per}</span>
        </p>

        <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5 border-t border-[#eeebe8] pt-4 dark:border-white/10">
          {c.items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[12.5px] font-semibold">
              <span className="flex size-[17px] shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-white">
                <Check className="size-[11px]" strokeWidth={4} />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <Link
          href={bn ? "/bn/signup" : "/signup"}
          className="relative mt-auto flex h-[48px] items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-brand)] text-[15px] font-bold text-white shadow-[0_16px_30px_-12px_rgba(255,90,54,0.85)] transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
        >
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/45 to-transparent"
            style={{ animation: "free-shine 4s ease-in-out infinite", animationPlayState: moving ? "running" : "paused" }}
          />
          <span className="relative">{c.cta}</span>
          <ArrowRight className="relative size-[18px]" strokeWidth={2.6} />
        </Link>
        <p className="mt-2.5 text-center text-[12px] font-medium text-[#6d6661] dark:text-white/60">{c.note}</p>
      </div>
    </Stage>
  );
}
