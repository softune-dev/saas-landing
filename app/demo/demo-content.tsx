"use client";

import { ArrowUpRight } from "lucide-react";
import { DarkHero } from "@/components/dark-hero";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PhoneShot, STORES } from "@/components/demo-stores";

/**
 * /demo: see SoftuneBD in action before signing up. Real stores built on
 * SoftuneBD open straight away in a new tab. There is no dashboard demo:
 * the 7-day free trial is the way to try the dashboard.
 */
export default function DemoContent({ locale = "en" }: { locale?: "en" | "bn" }) {
  const isBn = locale === "bn";
  const L = (en: string, bn: string) => (isBn ? bn : en);

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        <DarkHero>
          <h1
            className="relative z-10 mx-auto max-w-3xl text-4xl font-black tracking-tight text-white md:text-6xl"
            style={{ fontFamily: "var(--font-heading), var(--font-bn)" }}
          >
            {L("See SoftuneBD", "SoftuneBD দেখুন")}{" "}
            <span className="relative inline-block px-3 py-1">
              <span className="absolute inset-0 top-2 -rotate-1 rounded-lg bg-[var(--color-brand)]" />
              <em className="relative not-italic text-white">{L("in action", "লাইভ")}</em>
            </span>
          </h1>
          <p className="relative z-10 mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/70 md:text-[17px]">
            {L(
              "Real stores built with SoftuneBD, one on each theme. Open any of them and shop around.",
              "SoftuneBD দিয়ে বানানো আসল স্টোর, প্রতিটি থিমে একটি করে। যেকোনোটি খুলে ঘুরে দেখুন।",
            )}
          </p>
        </DarkHero>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5 md:py-16">
          <h2 className="mb-6 text-xl font-bold tracking-tight text-[var(--color-ink)] md:text-2xl">
            {L("Live store demos", "লাইভ স্টোর ডেমো")}
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-5">
            {STORES.map((s) => (
              <a
                key={s.id}
                href={`https://${s.host}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 rounded-2xl bg-[var(--color-surface)] p-1.5 ring-1 ring-[var(--color-line)] transition-shadow hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.35)] sm:rounded-3xl sm:p-2"
              >
                <PhoneShot id={s.id} name={s.name} />
                <div className="flex items-center justify-between gap-2 px-1 pb-0.5">
                  <div className="min-w-0">
                    <h3 className="truncate text-[14px] font-bold text-[var(--color-ink)] sm:text-[15px]">{s.name}</h3>
                    <p className="mt-0.5 truncate text-[12px] text-[var(--color-muted)] sm:text-[13px]">{isBn ? s.nicheBn : s.niche}</p>
                  </div>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-canvas)] transition-transform group-hover:scale-105">
                    <ArrowUpRight className="size-4" strokeWidth={2.2} />
                  </span>
                </div>
              </a>
            ))}
          </div>

        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
