"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const privacySections = [
  {
    title: "Information We Collect",
    content: "We collect personal data you provide directly to us, such as your name, billing address, email, store URLs, and payment credentials. We also automatically gather device information, IP logs, and system metrics during storefront administration."
  },
  {
    title: "How We Use Your Data",
    content: "We utilize collected information to maintain your multi-tenant stores, process recurring payments, coordinate courier logistics API endpoints, send automated text messages, and provide developer tools to scale conversion rates."
  },
  {
    title: "Data Protection & Security",
    content: "We run advanced tokenized encryption schemas across relational databases. Multi-tenant customer accounts are logically isolated, preventing unauthorized leaks, server vulnerabilities, or data intersections."
  },
  {
    title: "Third-Party Sharing & APIs",
    content: "We never lease, sell, or rent your database records to marketing firms. We only forward essential logistics payload data to payment aggregators (Stripe, SSLCommerz) and delivery providers (Courier partners) to complete transactions."
  },
  {
    title: "Your Rights & Access Options",
    content: "Under GDPR, CCPA, and global data privacy acts, you retain full rights to request logs of your stored data, rectify catalog records, revoke tracking consent, or completely purge your store's database files."
  }
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        {/* Hero Section */}
        <div className="relative pt-12 pb-14 px-5 text-center overflow-hidden bg-[var(--color-canvas)] rounded-b-[4rem] border-b-[6px] border-[var(--color-surface)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

          {/* Hero Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-4 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15" style={{ animationDuration: "2s" }} />
              <ShieldCheck className="size-3.5 text-[var(--color-brand)]" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Data Protection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Privacy
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Policy</em>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Your trust is our foundation. Learn how we collect, protect, and handle your merchant and customer data responsibly.
          </motion.p>
        </div>

        {/* Content Section */}
        <section className="py-24 max-w-3xl mx-auto px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[32px] p-8 md:p-12 text-left overflow-hidden shadow-sm"
          >
            {/* Background Dots */}
            <div className="pointer-events-none absolute top-0 right-0 w-1/3 h-1/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)] opacity-30" />

            <div className="relative z-10 space-y-10">
              <div className="border-b border-[var(--color-line)] pb-6">
                <p className="text-[14px] font-bold text-[var(--color-brand)] uppercase tracking-wider mb-2">Effective Date: August 18, 2026</p>
                <p className="text-[15.5px] leading-relaxed text-[var(--color-muted)] font-medium">
                  At Softune, we respect your privacy and are committed to protecting the personal data of our store owners, partners, and visitors.
                </p>
              </div>

              {privacySections.map((sec, i) => (
                <div key={i} className="space-y-3">
                  <h2 className="flex items-center gap-3 text-lg font-bold text-[var(--color-ink)]">
                    <span className="flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)] text-white text-[12px] font-extrabold shadow-sm">
                      {i + 1}
                    </span>
                    {sec.title}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-[var(--color-muted)] font-medium pl-9">
                    {sec.content}
                  </p>
                </div>
              ))}

              <div className="bg-[var(--color-canvas)] border border-[var(--color-line)] rounded-2xl p-6 mt-8">
                <p className="text-[14.5px] text-[var(--color-muted)] font-semibold leading-relaxed">
                  Have questions about your data or wish to request database deletion? Contact our team at{" "}
                  <a href="/support/contact" className="text-[var(--color-brand)] font-bold hover:underline transition-all">
                    Privacy Operations
                  </a>.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
