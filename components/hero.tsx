"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Centered SaaS hero: copy in the middle band, dashboard mock
 * near the bottom with breathing room below.
 */
export function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === "dark";
  const desktopSrc = isDark ? "/dashboard-d.webp" : "/dashboard-l.webp";
  const mobileSrc = isDark ? "/dashboard-d-mobile.webp" : "/dashboard-l-mobile.webp";

  return (
    <section className="relative flex flex-col overflow-hidden rounded-b-[2rem] border-[4px] border-t-0 border-[var(--color-surface)] bg-[var(--color-canvas)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] sm:rounded-b-[3rem] md:min-h-[calc(100vh-6.5rem)] md:rounded-b-[4rem] md:border-[6px] md:border-t-0">
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
          className="mb-5 flex w-max max-w-full items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:mb-7 md:gap-3 md:p-1.5 md:pr-4"
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

        <h1
          style={{ fontFamily: "var(--font-heading)" }}
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[1.85rem] leading-[1.15] font-bold tracking-tight text-[var(--color-ink)] sm:gap-x-3 sm:text-[3rem] sm:leading-[1.12] md:text-[3.5rem] lg:gap-y-2 lg:text-[4rem]"
        >
          <span>Build your</span>
          <span className="relative inline-block px-3 py-1 whitespace-nowrap sm:px-4 sm:py-1.5">
            <span className="absolute inset-0 rounded-lg bg-[var(--color-brand)] shadow-sm sm:top-1" />
            <em className="relative not-italic text-white">E-commerce store</em>
          </span>
          <span>in Bangladesh</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] md:mt-6 md:text-[17px] lg:text-lg"
        >
          No-code store builder with bKash, Nagad, COD, and local couriers.
          Softune&apos;s AI helps you write products and run the shop from one
          dashboard.
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
            href="/signup"
            variant="outline"
            className="flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors hover:bg-[var(--color-brand)]/5 sm:min-h-12 sm:px-6 sm:py-3 sm:text-[14px] md:px-8 md:py-4 md:text-[15px]"
          >
            <img
              src="/icons/play.svg"
              alt=""
              className="size-3.5 object-contain md:size-4 dark:invert"
            />
            See Demo
          </Button>
        </motion.div>
      </div>

      {/* Dashboard — sized for the 1440×956 asset, with bottom gap */}
      <div className="relative z-10 mx-auto w-full max-w-[1480px] shrink-0 px-3 pb-8 sm:px-5 sm:pb-10 md:px-6 md:pb-14 lg:px-8">
        <div className="relative mx-auto w-full">
          <div className="overflow-hidden rounded-xl border border-[var(--color-line)] shadow-[0_24px_80px_-28px_rgba(12,12,12,0.4)] sm:rounded-2xl">
            {/* aspect-ratio reserves the layout space instead of loading a
                second hidden copy of the image just to size the box. */}
            <div
              className="relative w-full overflow-hidden bg-[var(--color-canvas)]"
              style={{ aspectRatio: "1440 / 956" }}
            >
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet={mobileSrc}
                  type="image/webp"
                />
                <img
                  src={desktopSrc}
                  alt="Softune ecommerce dashboard for Bangladesh merchants"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  width={1440}
                  height={956}
                  className="absolute inset-0 h-full w-full object-cover object-left-top"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
