"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ThemeCarousel } from "./theme-carousel";

export function Themes({ locale = "en" }: { locale?: "en" | "bn" }) {
  const isBn = locale === "bn";
  const themesHref = isBn ? "/bn/themes" : "/themes";

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
              loading="lazy"
              decoding="async"
              src="/icons/themes.svg"
              alt="Themes"
              className="size-3 object-contain md:size-3.5 dark:invert"
            />
          </div>
          <span className="text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
            {isBn ? "রেডি থিমসমূহ" : "Themes"}
          </span>
        </motion.div>

        <h2 className="max-w-3xl text-3xl leading-[1.15] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.1] md:text-6xl">
          {isBn ? (
            <>
              আপনার বিজনেসের জন্য{" "}
              <span className="relative ml-0.5 inline-block px-3 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
                <span className="absolute inset-0 top-1.5 -rotate-1 rounded-xl bg-[var(--color-brand)] shadow-sm sm:top-2" />
                <em className="relative not-italic text-white">পারফেক্ট থিম</em>
              </span>
            </>
          ) : (
            <>
              Built for your niche.{" "}
              <span className="relative ml-0.5 inline-block px-3 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
                <span className="absolute inset-0 top-1.5 -rotate-1 rounded-xl bg-[var(--color-brand)] shadow-sm sm:top-2" />
                <em className="relative not-italic text-white">Not just a theme.</em>
              </span>
            </>
          )}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed font-medium text-[var(--color-muted)] sm:mt-5 sm:text-base">
          {isBn
            ? "আপনার ক্যাটাগরি বেছে নিন এবং Theme Editor দিয়ে পছন্দমতো ডিজাইন করুন।"
            : "Pick a niche, then make it yours in the Theme Editor."}
        </p>

        <div className="mt-6">
          <Button
            as="a"
            href={themesHref}
            variant="primary"
            className="group flex min-h-12 items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-bold transition-all sm:px-8 sm:py-4"
          >
            {isBn ? "সব থিম দেখুন" : "View all themes"}
            <img
              loading="lazy"
              decoding="async"
              src="/icons/arrow-right.svg"
              alt=""
              className="size-4 object-contain brightness-0 invert transition-transform group-hover:translate-x-1"
            />
          </Button>
        </div>
      </div>

      <div className="mt-10 md:mt-14">
        <ThemeCarousel />
      </div>
    </section>
  );
}
