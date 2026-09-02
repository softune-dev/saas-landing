"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { TRIAL_NOTE } from "@/lib/site";
import { HeroCtas } from "./hero-ctas";

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
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-14 pb-8 text-center sm:px-5 sm:pt-16 md:flex-1 md:justify-center md:px-8 md:pt-16 md:pb-6">
        <div className="mb-5 flex w-max max-w-full items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:mb-7 md:gap-3 md:p-1.5 md:pr-4">
          <div className="relative flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/10 md:size-6">
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
            className="flex shrink-0 items-center gap-1 whitespace-nowrap text-[12px] font-bold text-[var(--color-brand)] hover:underline md:text-[14px]"
          >
            See what&apos;s new
            <ArrowRight className="size-3.5 md:size-4" />
          </Link>
        </div>

        <h1
          style={{ fontFamily: "var(--font-heading)" }}
          className="w-full text-center text-[1.85rem] leading-[1.2] font-bold tracking-tight text-[var(--color-ink)] md:text-[3.25rem] md:leading-[1.15] lg:text-[3.5rem]"
        >
          <span className="flex flex-col items-center md:hidden">
            <span>Build your</span>
            <span className="relative inline-block whitespace-nowrap px-2.5 py-0.5">
              <span className="absolute inset-0 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">E-commerce store</em>
            </span>
            <span className="mt-1">in Bangladesh</span>
          </span>
          <span className="hidden md:block">
            <span className="flex flex-nowrap items-center justify-center gap-x-3">
              <span className="shrink-0">Build your</span>
              <span className="relative inline-block shrink-0 whitespace-nowrap px-4 py-1.5">
                <span className="absolute inset-0 top-1 rounded-lg bg-[var(--color-brand)] shadow-sm" />
                <em className="relative not-italic text-white">E-commerce store</em>
              </span>
            </span>
            <span className="mt-2 block">in Bangladesh</span>
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] md:mt-6 md:text-[17px] lg:text-lg">
          No-code store builder with bKash, Nagad, COD, and local couriers.
          Softune cares about your branding and identity, not a generic
          storefront. AI helps you write products and run the shop from one
          dashboard.
        </p>

        <HeroCtas className="mt-7 md:mt-9" />
        <p className="mt-7 text-[12px] font-medium text-[var(--color-muted)] sm:text-[13px] md:mt-9">
          {TRIAL_NOTE}
        </p>
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
