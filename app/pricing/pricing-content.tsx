"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { HeroCtas } from "@/components/hero-ctas";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Grainient = dynamic(() => import("@/components/ui/grainient"), { ssr: false });

export default function PricingPage({ locale = "en" }: { locale?: "en" | "bn" }) {
  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        <div className="px-2 pt-2 sm:px-3 sm:pt-3">
          <section className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#09080b] px-5 pt-12 pb-14 text-center text-white sm:rounded-[2.5rem] md:pt-16 md:pb-16">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <Grainient
                colors={["#09080b", "#09080b", "#0f0909", "#22100a", "#6b2a12", "#c2511f"]}
                angle={180}
                flow={0.6}
                silk={0.2}
                grainAmount={0.06}
                saturation={0.9}
                interactive={false}
                clickSwirl={false}
                className="absolute inset-0"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 mx-auto mb-6 flex max-w-fit items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] p-1.5 pr-4 backdrop-blur"
            >
              <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15" style={{ animationDuration: "2s" }} />
                <img src="/icons/billing.svg" alt="" className="size-3.5 object-contain" />
              </div>
              <span className="text-[14px] font-semibold tracking-tight text-white">
                {locale === "bn" ? "ফ্লেক্সিবল প্রাইসিং" : "Flexible Pricing"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="relative z-10 mb-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-4xl font-bold tracking-tight text-white md:text-6xl"
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
              className="relative z-10 mx-auto max-w-2xl text-[16px] leading-relaxed font-medium text-white/60 md:text-lg"
            >
              {locale === "bn"
                ? "৭ দিন ফ্রি ট্রায়াল দিয়ে শুরু করুন। কোনো ক্রেডিট কার্ড নেই, কোনো সেটআপ ফি নেই, আর প্রতি অর্ডারে কোনো কমিশন নেই।"
                : "Start with a 7-day free trial. No credit card, no setup fee, and no commission on your orders."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10 mt-8 flex justify-center"
            >
              <HeroCtas locale={locale} dark />
            </motion.div>
          </section>
        </div>
        <Pricing locale={locale} showIntro={false} />
        <Faq locale={locale} />
        <Contact />
      </main>
      <Footer locale={locale} />
    </>
  );
}
