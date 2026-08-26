"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

const refundSections = [
  {
    title: "14-Day Satisfaction Guarantee",
    content: "We provide a 14-day money-back guarantee for all initial subscription plans. If Softune does not meet your business requirements, you can request a full refund within 14 days of account activation."
  },
  {
    title: "Subscription Renewals",
    content: "Monthly and annual renewal fees are automatically billed to your recorded payment method. Renewals are non-refundable. To prevent future billings, you may cancel your subscription at any time via the admin dashboard."
  },
  {
    title: "Custom Design & Migration Exclusions",
    content: "Fees paid for custom storefront theme coding, database migrator assistance, or professional setup configurations are non-refundable once design layout files or database pipelines have been initialized."
  },
  {
    title: "Refund Processing & Gateways",
    content: "Approved refunds are credited back to your original payment mode (Stripe, PayPal, or local merchant wallets) within 5 to 10 working days, subject to processing fees or gateway policies."
  }
];

export default function RefundPage() {
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
              <RotateCcw className="size-3.5 text-[var(--color-brand)]" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Subscription Terms
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Refund
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
            Transparent billing guarantees. Review our cancellation guidelines, billing cycles, and pro-rated refund policies.
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
                  We strive to deliver robust SaaS infrastructure. Below are our official conditions for processing plan upgrades, downgrades, and billing disputes.
                </p>
              </div>

              {refundSections.map((sec, i) => (
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
                  Requesting a cancellation or refund request? Reach out directly to our billing coordinators in the{" "}
                  <a href="/support/contact" className="text-[var(--color-brand)] font-bold hover:underline transition-all">
                    Help Center
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
