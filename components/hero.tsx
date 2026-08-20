"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const DASHBOARD_PAIRS = [
  { desktop: "/dashboard.png", mobile: "/dashboard-m1.png" },
  { desktop: "/dashboard2.png", mobile: "/dashboard-m2.png" },
] as const;

const PAIR_INTERVAL_MS = 5000;

/**
 * Centered SaaS hero: copy in the middle band, dashboard mock
 * near the bottom with breathing room below.
 */
export function Hero() {
  const [pairIndex, setPairIndex] = useState(0);
  const pair = DASHBOARD_PAIRS[pairIndex];

  useEffect(() => {
    for (const p of DASHBOARD_PAIRS) {
      const d = new window.Image();
      d.src = p.desktop;
      const m = new window.Image();
      m.src = p.mobile;
    }
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPairIndex((i) => (i + 1) % DASHBOARD_PAIRS.length);
    }, PAIR_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex flex-col overflow-hidden rounded-b-[2rem] border-[4px] border-t-0 border-white bg-[#f0f1f3] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] sm:rounded-b-[3rem] md:min-h-[calc(100vh-6.5rem)] md:rounded-b-[4rem] md:border-[6px]">
      {/* Masked Grid Layer */}
      <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_50%_30%,transparent_0%,black_55%)]" />

      {/* Bottom Gradient Fade */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-40 bg-gradient-to-t from-[var(--color-brand)]/15 to-transparent md:h-56" />

      {/* Centered copy */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 pt-14 pb-8 text-center sm:px-5 sm:pt-16 md:flex-1 md:justify-center md:px-8 md:pt-16 md:pb-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-5 flex w-max max-w-full items-center gap-2 rounded-full border border-[var(--color-line)] bg-white p-1 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:mb-7 md:gap-3 md:p-1.5 md:pr-4"
        >
          <div className="relative flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/10 md:size-6">
            <span
              className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
              style={{ animationDuration: "2s" }}
            />
            <img
              src="/icons/zap.svg"
              alt=""
              className="size-3 object-contain md:size-3.5"
            />
          </div>
          <span className="truncate text-[12px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
            Softune eCommerce is live
          </span>
          <span className="h-3 w-px shrink-0 bg-[var(--color-line)] md:h-4" />
          <Link
            href="/changelog"
            className="group flex shrink-0 items-center gap-1 whitespace-nowrap text-[12px] font-bold text-[var(--color-brand)] transition-opacity hover:opacity-80 hover:underline md:text-[14px]"
          >
            See what&apos;s new
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5 md:size-4" />
          </Link>
        </motion.div>

        <motion.h1
          style={{ fontFamily: "var(--font-outfit)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[2.15rem] leading-[0.95] font-black tracking-tighter text-[var(--color-ink)] sm:gap-x-3 sm:text-[3.2rem] sm:leading-[1.05] md:text-[4rem] lg:gap-y-3 lg:text-[4.5rem]"
        >
          <span>Start selling online,</span>
          <span className="inline-flex items-center gap-x-2 sm:gap-x-3">
            <span className="relative inline-block px-3 py-1 sm:whitespace-nowrap sm:px-4 sm:py-1.5">
              <span className="absolute inset-0 rounded-lg bg-[var(--color-brand)] shadow-sm sm:top-1" />
              <em className="relative flex items-center gap-2 not-italic text-white -mt-2">
                <img
                  src="/icons/ai.svg"
                  alt=""
                  className="size-[0.75em] object-contain brightness-0 invert"
                />
                {""}the easy way.
              </em>
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] md:mt-6 md:text-[17px] lg:text-lg"
        >
          Create your dream storefront, manage inventory, and scale your sales
          with an AI assistant woven into every part of your dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-7 flex w-full flex-row flex-wrap items-center justify-center gap-2.5 sm:w-auto sm:gap-3 md:mt-9 md:gap-4"
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
              Get Started
              <img
                src="/icons/arrow-right.svg"
                alt=""
                className="size-3.5 object-contain brightness-0 invert md:size-4"
              />
            </a>
          </div>
          <Button
            as="a"
            href="/templates/aurora"
            variant="outline"
            className="flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors hover:bg-[var(--color-brand)]/5 sm:min-h-12 sm:px-6 sm:py-3 sm:text-[14px] md:px-8 md:py-4 md:text-[15px]"
          >
            <img
              src="/icons/play.svg"
              alt=""
              className="size-3.5 object-contain md:size-4"
            />
            See Demo
          </Button>
        </motion.div>
      </div>

      {/* Dashboard — sized for the 1440×956 asset, with bottom gap */}
      <div className="relative z-10 mx-auto w-full max-w-[1480px] shrink-0 px-3 pb-8 sm:px-5 sm:pb-10 md:px-6 md:pb-14 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full"
        >
          <div className="overflow-hidden rounded-xl border border-[var(--color-line)] shadow-[0_24px_80px_-28px_rgba(12,12,12,0.4)] sm:rounded-2xl">
            <div className="relative w-full overflow-hidden bg-[var(--color-canvas)]">
              {/* Spacer keeps layout height stable while pairs crossfade */}
              <img
                src={DASHBOARD_PAIRS[0].desktop}
                alt=""
                aria-hidden
                className="block h-auto w-full opacity-0"
                width={1440}
                height={956}
              />
              <AnimatePresence mode="sync" initial={false}>
                <motion.img
                  key={pair.desktop}
                  src={pair.desktop}
                  alt="Softune merchant dashboard"
                  className="absolute inset-0 h-full w-full object-cover object-left-top"
                  width={1440}
                  height={956}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                />
              </AnimatePresence>
              {/* Mobile preview — rounded clip + shadow on the same box */}
              <div className="pointer-events-none absolute right-[4%] bottom-2 z-10 w-[20%] max-w-[280px] overflow-hidden rounded-2xl shadow-[0_24px_56px_-8px_rgba(0,0,0,0.55),0_12px_24px_-10px_rgba(0,0,0,0.35)] sm:right-[4%] sm:bottom-3 sm:rounded-[1.25rem] md:right-[6%] md:bottom-4">
                <div className="relative">
                  <img
                    src={DASHBOARD_PAIRS[0].mobile}
                    alt=""
                    aria-hidden
                    className="block h-auto w-full opacity-0"
                    width={442}
                    height={939}
                  />
                  <AnimatePresence mode="sync" initial={false}>
                    <motion.img
                      key={pair.mobile}
                      src={pair.mobile}
                      alt="Softune dashboard on mobile"
                      className="absolute inset-0 h-full w-full rounded-2xl object-cover object-top sm:rounded-[1.25rem]"
                      width={442}
                      height={939}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.55, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
