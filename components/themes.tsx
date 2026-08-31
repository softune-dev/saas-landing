"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";

const themes = [
  {
    name: "Fashion",
    vibe: "Fashion editorial",
    description:
      "A minimalist, high-end editorial layout designed to put your photography center stage. Perfect for fashion, jewelry, and luxury brands.",
    color: "#1c1917",
    surface: "#faf9f6",
    image: "/theme-fashion.webp",
    demoUrl: "https://aurora-owner.softunebd.com/",
  },
  {
    name: "Emporium",
    vibe: "Everything under one roof",
    description:
      "Built for shops that sell across many aisles — apparel, gadgets, home, beauty — with bold category browsing and dense product grids that still feel easy to shop.",
    color: "#2563EB",
    surface: "#f8fafc",
    image: "/theme-bazaar.webp",
    demoUrl: "https://niyenen.softunebd.com/",
  },
  {
    name: "Vault",
    vibe: "Digital goods & downloads",
    description:
      "Made for selling what you can't ship in a box — courses, templates, software, and downloadable files — with a clean product focus and checkout that feels instant.",
    color: "#DC5200",
    surface: "#faf5ef",
    image: "/theme_mishthan.webp",
    demoUrl: "https://onedigitalspot.vercel.app/",
  },
];

export function Themes() {
  return (
    <section id="themes" className="mx-auto max-w-[1400px] px-4 py-14 sm:px-5 md:px-8 md:py-20">
      <div className="mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:gap-3 md:p-1.5 md:pr-4"
        >
          <div className="relative flex size-5 items-center justify-center rounded-full bg-[var(--color-brand)]/10 md:size-6">
            <span
              className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
              style={{ animationDuration: "2s" }}
            />
            <img
              src="/icons/themes.svg"
              alt="Themes"
              className="size-3 object-contain md:size-3.5 dark:invert"
            />
          </div>
          <span className="text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
            Templates
          </span>
        </motion.div>

        <h2 className="max-w-3xl text-3xl leading-[1.15] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.1] md:text-6xl">
          Start with a theme.{" "}
          <span className="relative ml-0.5 inline-block px-3 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
            <span className="absolute inset-0 top-1.5 -rotate-1 rounded-xl bg-[var(--color-brand)] shadow-sm sm:top-2" />
            <em className="relative not-italic text-white">Make it yours</em>
          </span>
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] sm:mt-6 sm:text-[17px] md:text-[18px]">
          You&apos;re never locked to one look. Change colors, fonts, sections,
          and copy in the Theme Editor until the storefront feels like your
          brand, then switch themes anytime without rebuilding your catalog.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 md:mt-10 lg:grid-cols-3">
        {themes.map((t) => (
          <article
            key={t.name}
            className="group flex w-full flex-col"
          >
            <div className="relative flex h-[400px] w-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.1)] transition-transform duration-500 sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2.5 sm:px-4 sm:py-3">
                <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                  <span className="size-2.5 shrink-0 rounded-full bg-[#ff5f57] sm:size-3" />
                  <span className="size-2.5 shrink-0 rounded-full bg-[#febc2e] sm:size-3" />
                  <span className="size-2.5 shrink-0 rounded-full bg-[#28c840] sm:size-3" />
                  <div className="ml-2 hidden h-6 max-w-[200px] min-w-0 flex-1 items-center rounded-md border border-[var(--color-line)] bg-[var(--color-canvas)] px-2 sm:ml-3 sm:flex">
                    <span className="truncate text-[10px] font-medium text-[var(--color-muted)]">
                      {t.name.toLowerCase()}.softunebd.com
                    </span>
                  </div>
                </div>
                <a
                  href={t.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live ${t.name} demo`}
                  className="group/link flex shrink-0 items-center justify-center rounded-md p-1 transition-colors hover:bg-[var(--color-canvas)]"
                >
                  <div
                    className="size-5 bg-[var(--color-ink)] transition-colors group-hover/link:bg-[var(--color-brand)]"
                    style={{
                      WebkitMaskImage: "url(/icons/arrow-link.svg)",
                      WebkitMaskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                    }}
                  />
                </a>
              </div>

              {/* Tall mobile-site shot: rests at top, auto-scrolls on hover */}
              <div
                className="theme-shot-frame relative min-h-0 w-full flex-1 overflow-hidden"
                style={{ backgroundColor: t.surface }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.image}
                  alt={`${t.name} theme preview`}
                  loading="lazy"
                  decoding="async"
                  className="theme-shot-img absolute inset-x-0 top-0 w-full max-w-none"
                />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
              <a
                href={t.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-x-0 bottom-0 z-[1] flex items-center gap-3 p-4 transition-opacity duration-300 group-hover:opacity-0 sm:p-5 md:p-8"
              >
                <h3
                  className="text-3xl text-white drop-shadow-md transition-colors hover:text-[var(--color-brand)] sm:text-4xl md:text-5xl"
                  style={{ fontFamily: "var(--font-niconne)" }}
                >
                  {t.name}
                </h3>
                <div
                  className="mt-1 size-5 bg-white transition-all duration-300 sm:mt-2 sm:size-6"
                  style={{
                    WebkitMaskImage: "url(/icons/arrow-right.svg)",
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                  }}
                />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-center sm:mt-8">
        <Button
          as="a"
          href="#all-themes"
          variant="primary"
          className="group flex min-h-12 items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-bold transition-all sm:px-8 sm:py-4"
        >
          View all themes
          <img
            src="/icons/arrow-right.svg"
            alt=""
            className="size-4 object-contain brightness-0 invert transition-transform group-hover:translate-x-1"
          />
        </Button>
      </div>
    </section>
  );
}
