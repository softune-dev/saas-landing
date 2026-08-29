"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Pricing } from "@/components/pricing";
import { Testimonial } from "@/components/testimonial";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
