"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const themes = [
  {
    name: "Aurora",
    vibe: "Fashion editorial",
    description:
      "A minimalist, high-end editorial layout designed to put your photography center stage. Perfect for fashion, jewelry, and luxury brands.",
    color: "#1c1917",
    surface: "#faf9f6",
    image: "/theme_aurora.webp",
  },
  {
    name: "Bazaar",
    vibe: "General marketplace",
    description:
      "A clean, data-dense interface built for massive catalogs. Features advanced filtering, bold categories, and high-conversion product grids.",
    color: "#2563EB",
    surface: "#f8fafc",
    image: "/theme_bazaar.webp",
  },
  {
    name: "Mishthan",
    vibe: "Bakery & sweets",
    description:
      "Warm, inviting, and deliciously crafted. Uses soft tones and elegant typography to make your food and artisanal products irresistible.",
    color: "#DC5200",
    surface: "#faf5ef",
    image: "/theme_mishthan.webp",
  },
];

export function Themes() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

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

        <h2 className="max-w-2xl text-3xl leading-[1.15] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.1] md:text-6xl">
          Trendy Themes for Every{" "}
          <span className="relative ml-0.5 inline-block px-3 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
            <span className="absolute inset-0 top-1.5 -rotate-1 rounded-xl bg-[var(--color-brand)] shadow-sm sm:top-2" />
            <em className="relative not-italic text-white">Business</em>
          </span>
        </h2>
      </div>

      <p className="mt-8 text-center text-[12px] font-medium text-[var(--color-muted-soft)] sm:hidden">
        Swipe to browse themes
        <ArrowRight className="ml-2 inline-block size-3 text-[var(--color-muted-soft)]" />
      </p>

      <div
        ref={carouselRef}
        className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto no-scrollbar pb-8 sm:mt-10 sm:gap-6 sm:pb-10 md:mt-10"
      >
        {themes.map((t, i) => (
          <article
            key={t.name}
            className="group flex w-[82vw] shrink-0 snap-start flex-col sm:w-[60vw] md:w-[45vw] lg:w-[calc(33.333%-1rem)]"
          >
            <div className="relative flex h-[400px] w-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.1)] transition-transform duration-500 sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <div className="flex shrink-0 items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2.5 sm:px-4 sm:py-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="size-2.5 rounded-full bg-[#ff5f57] sm:size-3" />
                  <span className="size-2.5 rounded-full bg-[#febc2e] sm:size-3" />
                  <span className="size-2.5 rounded-full bg-[#28c840] sm:size-3" />
                  <div className="ml-2 hidden h-6 max-w-[200px] min-w-[120px] flex-1 items-center rounded-md border border-[var(--color-line)] bg-[var(--color-canvas)] px-2 sm:ml-3 sm:flex">
                    <span className="truncate text-[10px] font-medium text-[var(--color-muted)]">
                      {t.name.toLowerCase()}.softune.com
                    </span>
                  </div>
                </div>
                <div className="group/link flex cursor-pointer items-center justify-center">
                  <div
                    className="size-5 bg-[var(--color-ink)] transition-colors group-hover/link:bg-[var(--color-brand)]"
                    style={{
                      WebkitMaskImage: "url(/icons/arrow-link.svg)",
                      WebkitMaskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                    }}
                  />
                </div>
              </div>

              <div
                className="relative w-full flex-1"
                style={{ backgroundColor: t.surface }}
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex cursor-pointer items-center gap-3 p-4 sm:p-5 md:p-8">
                <h3
                  className="text-3xl text-white drop-shadow-md transition-colors group-hover:text-[var(--color-brand)] sm:text-4xl md:text-5xl"
                  style={{ fontFamily: "var(--font-niconne)" }}
                >
                  {t.name}
                </h3>
                <div
                  className="mt-1 size-5 bg-white transition-all duration-300 group-hover:translate-x-2 group-hover:bg-[var(--color-brand)] sm:mt-2 sm:size-6"
                  style={{
                    WebkitMaskImage: "url(/icons/arrow-right.svg)",
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                  }}
                />
              </div>
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
