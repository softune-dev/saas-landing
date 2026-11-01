"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { motion } from "framer-motion";

export default function PricingPage({ locale = "en" }: { locale?: "en" | "bn" }) {
  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        <section className="relative overflow-hidden rounded-b-[4rem] border-b-[6px] border-[var(--color-surface)] bg-[var(--color-canvas)] px-5 pt-12 pb-14 text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-6 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15" style={{ animationDuration: "2s" }} />
              <img src="/icons/billing.svg" alt="" className="size-3.5 object-contain dark:invert" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              {locale === "bn" ? "ফ্লেক্সিবল প্রাইসিং" : "Flexible Pricing"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 mb-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-4xl font-black tracking-tight text-[var(--color-ink)] md:text-6xl"
            style={{ fontFamily: locale === "bn" ? "var(--font-bn), var(--font-heading), sans-serif" : "var(--font-heading), sans-serif" }}
          >
            {locale === "bn" ? (
              <>
                আপনার ব্যবসার জন্য সহজ
                <span className="relative mx-1 inline-block px-3 py-1">
                  <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
                  <em className="relative not-italic text-white">প্রাইসিং প্ল্যান</em>
                </span>
              </>
            ) : (
              <>
                Simple plans for
                <span className="relative mx-1 inline-block px-3 py-1">
                  <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
                  <em className="relative not-italic text-white">growing brands</em>
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 mx-auto max-w-2xl text-[16px] leading-relaxed font-medium text-[var(--color-muted)] md:text-lg"
          >
            {locale === "bn"
              ? "৭ দিন ফ্রি ট্রায়াল দিয়ে শুরু করুন। কোনো ক্রেডিট কার্ড নেই, কোনো সেটআপ ফি নেই, আর প্রতি অর্ডারে কোনো কমিশন নেই।"
              : "Start with a 7-day free trial. No credit card, no setup fee, and no commission on your orders."}
          </motion.p>
        </section>
        <Pricing locale={locale} showIntro={false} />
        <Faq locale={locale} />
        <Contact />
      </main>
      <Footer locale={locale} />
    </>
  );
}
