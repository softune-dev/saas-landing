"use client";

import { ArrowUpRight, LayoutDashboard, Lock } from "lucide-react";
import { useState } from "react";
import { DarkHero } from "@/components/dark-hero";
import { DemoAccessModal } from "@/components/demo-access-modal";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PhoneShot, STORES } from "@/components/demo-stores";

/**
 * /demo: see SoftuneBD in action before signing up. Three real stores built
 * on SoftuneBD, one per theme, open straight away in a new tab. The
 * dashboard demo keeps its email + one-time code step (DemoAccessModal),
 * because it opens a real (read-only) dashboard.
 */
function Shot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-t-2xl border-b border-[var(--color-line)] bg-[var(--color-canvas)]">
      <div className="flex items-center gap-1.5 px-3 py-2">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" width={960} height={600} className="block aspect-[16/10] w-full object-cover object-top" />
    </div>
  );
}

export default function DemoContent({ locale = "en" }: { locale?: "en" | "bn" }) {
  const isBn = locale === "bn";
  const L = (en: string, bn: string) => (isBn ? bn : en);
  const [dashboardOpen, setDashboardOpen] = useState(false);

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
              "Real stores built with SoftuneBD, one on each theme. Open any of them and shop around, then try the dashboard they're run from.",
              "SoftuneBD দিয়ে বানানো আসল স্টোর, প্রতিটি থিমে একটি করে। যেকোনোটি খুলে ঘুরে দেখুন, তারপর যে ড্যাশবোর্ড থেকে চলে সেটি দেখুন।",
            )}
          </p>
        </DarkHero>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5 md:py-16">
          <h2 className="mb-6 text-xl font-bold tracking-tight text-[var(--color-ink)] md:text-2xl">
            {L("Live store demos", "লাইভ স্টোর ডেমো")}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
            {STORES.map((s) => (
              <a
                key={s.id}
                href={`https://${s.host}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 rounded-2xl bg-[var(--color-surface)] p-3 ring-1 ring-[var(--color-line)] transition-shadow hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.35)] sm:rounded-3xl sm:p-4"
              >
                <PhoneShot id={s.id} name={s.name} />
                <div className="flex items-center justify-between gap-2">
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

          <h2 className="mt-14 mb-6 text-xl font-bold tracking-tight text-[var(--color-ink)] md:text-2xl">
            {L("The dashboard behind them", "যে ড্যাশবোর্ড থেকে চলে")}
          </h2>
          <button
            type="button"
            onClick={() => setDashboardOpen(true)}
            className="group grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] text-left transition-shadow hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.35)] md:grid-cols-[1.4fr_1fr]"
          >
            <Shot src="/demos/dashboard.webp" alt="SoftuneBD dashboard" />
            <div className="flex flex-col justify-center gap-3 p-5 md:p-8">
              <span className="flex size-11 items-center justify-center rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
                <LayoutDashboard className="size-5" strokeWidth={1.8} />
              </span>
              <h3 className="text-xl font-bold text-[var(--color-ink)]">{L("Dashboard demo", "ড্যাশবোর্ড ডেমো")}</h3>
              <p className="text-[14px] leading-relaxed text-[var(--color-muted)]">
                {L(
                  "Orders, products, themes, payments, couriers and AI: the real dashboard with a demo store. We send a one-time code to your email to open it.",
                  "অর্ডার, প্রোডাক্ট, থিম, পেমেন্ট, কুরিয়ার ও AI: ডেমো স্টোরসহ আসল ড্যাশবোর্ড। খুলতে আপনার ইমেইলে একটি কোড পাঠানো হবে।",
                )}
              </p>
              <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-[14px] font-semibold text-white">
                <Lock className="size-4" strokeWidth={2} />
                {L("Open dashboard demo", "ড্যাশবোর্ড ডেমো খুলুন")}
              </span>
            </div>
          </button>
        </section>
      </main>
      <Footer locale={locale} />
      <DemoAccessModal open={dashboardOpen} onClose={() => setDashboardOpen(false)} />
    </>
  );
}
