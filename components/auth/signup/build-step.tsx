"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, FileText, Globe, Palette, Rocket, Store, UserRound, type LucideIcon } from "lucide-react";
import { BUILD_LABELS, BUILD_LABELS_BN } from "../use-trial-build";
import { slugPreview, t, type Locale } from "./signup-copy";

/** One tile per real build step, in the same order as BUILD_LABELS. */
const STEPS: { Icon: LucideIcon; label: Record<Locale, string> }[] = [
  { Icon: UserRound, label: { en: "Account", bn: "একাউন্ট" } },
  { Icon: Store, label: { en: "Store", bn: "স্টোর" } },
  { Icon: Palette, label: { en: "Design", bn: "ডিজাইন" } },
  { Icon: FileText, label: { en: "Pages", bn: "পেজ" } },
  { Icon: Rocket, label: { en: "Publish", bn: "পাবলিশ" } },
  { Icon: Globe, label: { en: "Web link", bn: "ওয়েব লিংক" } },
];

/** The picked design fills in on a phone as the real steps finish. */
export function BuildStep({ locale, done, shopName, demo }: { locale: Locale; done: boolean[]; shopName: string; demo: string }) {
  const count = done.filter(Boolean).length;
  const current = done.indexOf(false);
  const pct = Math.round((count / done.length) * 100);
  const labels = locale === "bn" ? BUILD_LABELS_BN : BUILD_LABELS;
  const status = current === -1 ? t(locale, "Your store is ready", "আপনার স্টোর তৈরি") : labels[current];
  // How much of the screenshot is still to come; a sliver shows from the start.
  const hidden = 100 - Math.max(pct, 8);
  const fill = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div aria-hidden className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,90,54,0.28),transparent)]" />
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: [0, -6, 0], opacity: 1 }}
          transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.4 } }}
          className="relative w-[clamp(88px,calc(50dvh-240px),186px)] rounded-[28px] bg-[#0b0b0d] p-[5px] shadow-[0_30px_50px_-24px_rgba(0,0,0,0.55)]"
        >
          <div className="relative aspect-[390/760] overflow-hidden rounded-[23px] bg-[#fde1d1] dark:bg-[#2a1b14]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/demos/${demo}-mobile.webp`} alt="" className="absolute inset-0 size-full object-cover object-top opacity-20 blur-[3px] grayscale" />
            <motion.div className="absolute inset-0" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: `inset(0 0 ${hidden}% 0)` }} transition={fill}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/demos/${demo}-mobile.webp`} alt="" className="size-full object-cover object-top" />
            </motion.div>
            {pct < 100 ? (
              <motion.span
                aria-hidden
                initial={{ top: "0%" }}
                animate={{ top: `${100 - hidden}%` }}
                transition={fill}
                className="absolute inset-x-0 h-[3px] -translate-y-1/2 bg-brand shadow-[0_0_18px_5px_rgba(255,90,54,0.6)]"
              />
            ) : null}
          </div>
          <AnimatePresence>
            {pct === 100 ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
                className="absolute -top-3 -right-3 flex size-11 items-center justify-center rounded-full border-[3px] border-surface bg-emerald-500 text-white shadow-lg"
              >
                <Check aria-hidden className="size-5" strokeWidth={3.5} />
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>

      <h1 className="mt-6 text-center text-[24px] leading-tight !font-extrabold tracking-[-0.025em] text-balance text-ink sm:text-[28px]">
        {shopName.trim() || t(locale, "Your store", "আপনার স্টোর")}
      </h1>
      <p className="mt-1 max-w-full truncate text-sm font-medium text-muted">{slugPreview(shopName) || "yourshop"}.softunebd.com</p>

      <div className="mt-5 w-full">
        <div className="flex items-baseline justify-between gap-3" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={status} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.16 }} className="truncate text-sm font-bold text-ink">
              {status}
            </motion.span>
          </AnimatePresence>
          <span className="text-sm font-extrabold tabular-nums text-brand">{pct}%</span>
        </div>
        <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} className="mt-2 h-2.5 overflow-hidden rounded-full bg-search-bg">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-[#ff9a5c] to-[#ff4a24]" initial={{ width: "4%" }} animate={{ width: `${Math.max(pct, 4)}%` }} transition={fill} />
        </div>
      </div>

      <ol className="mt-4 grid w-full grid-cols-3 gap-2">
        {STEPS.map(({ Icon, label }, i) => {
          const finished = done[i];
          const active = i === current;
          return (
            <li
              key={label.en}
              className={`relative flex flex-col items-center gap-1.5 rounded-2xl border px-1 py-3 transition-colors duration-300 ${
                active ? "border-brand bg-brand-soft" : finished ? "border-transparent bg-brand-soft" : "border-line"
              }`}
            >
              <span className="relative flex size-9 items-center justify-center">
                {active ? <span aria-hidden className="absolute inset-0 animate-spin rounded-full border-2 border-brand/20 border-t-brand" /> : null}
                <motion.span
                  key={finished ? "done" : "waiting"}
                  initial={finished ? { scale: 0.4 } : false}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className={`flex items-center justify-center rounded-full ${active ? "size-7" : "size-9"} ${
                    finished ? "bg-brand text-white" : active ? "text-brand" : "bg-search-bg text-muted-soft"
                  }`}
                >
                  {finished ? <Check aria-hidden className="size-4" strokeWidth={3.5} /> : <Icon aria-hidden className="size-4" strokeWidth={2.25} />}
                </motion.span>
              </span>
              <span className={`max-w-full truncate text-[11.5px] font-bold ${finished || active ? "text-ink" : "text-muted-soft"}`}>{label[locale]}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
