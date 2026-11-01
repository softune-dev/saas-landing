"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { PageHero } from "@/components/page-hero";

export default function PricingPage({ locale = "en" }: { locale?: "en" | "bn" }) {
  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        <PageHero
          locale={locale}
          eyebrow={locale === "bn" ? "ফ্লেক্সিবল প্রাইসিং" : "Flexible Pricing"}
          icon="/icons/billing.svg"
          title={locale === "bn" ? (
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
          description={locale === "bn"
            ? "৭ দিন ফ্রি ট্রায়াল দিয়ে শুরু করুন। কোনো ক্রেডিট কার্ড নেই, কোনো সেটআপ ফি নেই, আর প্রতি অর্ডারে কোনো কমিশন নেই।"
            : "Start with a 7-day free trial. No credit card, no setup fee, and no commission on your orders."}
        />
        <Pricing locale={locale} showIntro={false} />
        <Faq locale={locale} />
        <Contact />
      </main>
      <Footer locale={locale} />
    </>
  );
}
