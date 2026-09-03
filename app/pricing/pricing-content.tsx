"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";

export default function PricingPage({ locale = "en" }: { locale?: "en" | "bn" }) {
  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        <Pricing locale={locale} />
        <Faq locale={locale} />
        <Contact />
      </main>
      <Footer locale={locale} />
    </>
  );
}
