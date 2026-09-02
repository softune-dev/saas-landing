"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroCtas } from "@/components/hero-ctas";
import { THEMES } from "@/lib/themes-data";

export default function ThemesIndexPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        <div className="relative pt-16 pb-14 px-5 text-center overflow-hidden bg-[var(--color-canvas)] rounded-b-[4rem] border-b-[6px] border-[var(--color-surface)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-6 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span
                className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                style={{ animationDuration: "2s" }}
              />
              <img
                src="/icons/themes.svg"
                alt=""
                className="size-3.5 object-contain dark:invert"
              />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              All themes
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Every theme.
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">One catalog.</em>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Pick a starting point, then make it yours. Every theme ships with
            the full Theme Editor — colors, fonts, sections, and copy are
            never locked to what you see here.
          </motion.p>
        </div>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-5 md:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {THEMES.map((t, i) => (
                <motion.article
                  key={t.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="group flex w-full flex-col"
                >
                  <div className="relative flex h-[400px] w-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.1)] sm:h-[400px] md:h-[500px]">
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
                    </div>

                    <div
                      className="theme-shot-frame relative min-h-0 w-full flex-1 overflow-hidden"
                      style={{ backgroundColor: t.surface }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={t.image}
                        alt={`${t.name} Softune ecommerce theme — ${t.vibe}`}
                        loading="lazy"
                        decoding="async"
                        className="theme-shot-img absolute inset-x-0 top-0 w-full max-w-none"
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                      {t.name}
                    </span>
                    <span className="text-[13px] text-[var(--color-muted)]">
                      {t.vibe}
                    </span>
                  </div>
                </motion.article>
              ))}

              <motion.article
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: THEMES.length * 0.08 }}
                className="flex w-full flex-col"
              >
                <div className="flex h-[400px] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[var(--color-line)] text-center sm:h-[400px] md:h-[500px]">
                  <span className="flex size-11 items-center justify-center rounded-full bg-[var(--color-surface)] text-2xl font-bold text-[var(--color-muted)]">
                    +
                  </span>
                  <p className="text-[15px] font-semibold text-[var(--color-ink)]">
                    More coming soon
                  </p>
                  <p className="max-w-[220px] text-[13px] text-[var(--color-muted)]">
                    New niche themes are on the way — check back soon.
                  </p>
                </div>
                <div className="mt-3 h-[26px]" />
              </motion.article>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--color-line)] py-20 text-center">
          <h2 className="max-w-2xl mx-auto font-extrabold tracking-tight text-3xl sm:text-4xl leading-[1.15] text-[var(--color-ink)]">
            Not sure which fits?{" "}
            <span className="relative inline-block whitespace-nowrap px-3 py-0.5 mx-0.5">
              <span className="absolute inset-0 -rotate-1 top-1.5 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Try one free.</em>
            </span>
          </h2>
          <p className="mt-4 text-[16px] text-[var(--color-muted)] font-medium max-w-xl mx-auto">
            Start a 3-day trial and switch themes anytime — nothing about
            your catalog resets when you change your mind.
          </p>
          <div className="mt-8 flex justify-center">
            <HeroCtas />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
