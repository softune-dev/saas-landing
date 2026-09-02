"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const timeline = [
  {
    year: "2024",
    title: "The Idea",
    desc: "Softune started with one idea that did not change: one dashboard, a real storefront, and no code. Bangladesh shop owners should not need a developer or a stack of plugins to sell online.",
    icon: "/icons/play.svg"
  },
  {
    year: "2025",
    title: "Building the Foundation",
    desc: "The fundamentals were locked in first: tenant-isolated data, a real theme editor, and the storefront contract everything else is built on top of.",
    icon: "/icons/splash.svg"
  },
  {
    year: "2026",
    title: "Built & Live",
    desc: "The dashboard, storefront themes, AI tooling, local payments (bKash, Nagad, SSLCommerz), courier connections, Store Sale POS, and analytics were built out and the platform went live.",
    icon: "/icons/analytics.svg"
  }
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        
        {/* Hero Section */}
        <div className="relative pt-16 pb-20 px-5 text-center overflow-hidden bg-[var(--color-canvas)] rounded-b-[4rem] border-b-[6px] border-[var(--color-surface)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

          {/* Hero Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-6 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15" style={{ animationDuration: "2s" }} />
              <img src="/icons/user.svg" alt="Users" className="size-3.5 object-contain dark:invert" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Our Journey
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Smarter e-Commerce,
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Simplified</em>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Softune is an all-in-one SaaS platform enabling independent brands to synchronize inventory, customize themes, route couriers, and run POS terminals out of a unified admin panel.
          </motion.p>
        </div>

        {/* Company, vision, product — readable prose for people and search.
            Cards hide the sentences crawlers actually index. Headings stay
            ordinary (no hero chip) so this block reads as an about page. */}
        <section className="pt-24 pb-20 px-5 md:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-16 gap-y-14 text-left md:grid-cols-2">
            <div>
              <h2
                className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Why Softune
              </h2>
              <p className="mt-5 text-[16px] font-medium leading-relaxed text-[var(--color-muted)] md:text-lg">
                Softune is an ecommerce website builder and SaaS platform for Bangladesh. Independent shop owners get a real storefront and one dashboard — themes, inventory, checkout, payments, courier booking, and Store Sale POS — without hiring a developer or stacking plugins.
              </p>
              <p className="mt-5 text-[16px] font-medium leading-relaxed text-[var(--color-muted)] md:text-lg">
                Payments, couriers, and POS sit in the same admin as the storefront. Bangladesh checkout and fulfillment are built in from the start, not bolted on later, so a shop does not need a separate stack for each job.
              </p>
            </div>

            <div>
              <h3
                className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Our vision
              </h3>
              <p className="mt-5 text-[16px] font-medium leading-relaxed text-[var(--color-muted)] md:text-lg">
                Shop owners in Bangladesh should not have to choose between a Facebook Page and a custom site they cannot maintain. Softune cares about your branding and identity, not a generic storefront that looks like everyone else's. The vision is a store that is theirs: logo, colors, and type that belong to the shop, plus cash on delivery, mobile-wallet checkout, local courier labels, and a counter that shares the same catalog.
              </p>
              <p className="mt-5 text-[16px] font-medium leading-relaxed text-[var(--color-muted)] md:text-lg">
                Opening that store should take an afternoon, not a project plan. A three-day free trial with no credit card is the start of that — you can run a live shop before you pay.
              </p>
            </div>

            <div>
              <h3
                className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Who we build for
              </h3>
              <p className="mt-5 text-[16px] font-medium leading-relaxed text-[var(--color-muted)] md:text-lg">
                We build for the independent merchant, not a corporate IT team. Features exist to cut admin hours: inventory that matches the storefront, checkout rules that block fraud numbers, and courier labels that do not need a second login.
              </p>
              <p className="mt-5 text-[16px] font-medium leading-relaxed text-[var(--color-muted)] md:text-lg">
                Ecommerce software should not require a computer-science degree. Softune is meant to be used as-is: pick a theme, add products, connect bKash, Nagad, or SSLCommerz, and go live. There is no plugin marketplace to assemble.
              </p>
            </div>

            <div>
              <h3
                className="text-2xl font-bold tracking-tight text-[var(--color-ink)] md:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                What the platform covers
              </h3>
              <p className="mt-5 text-[16px] font-medium leading-relaxed text-[var(--color-muted)] md:text-lg">
                Checkout in Bangladesh is cash on delivery plus mobile wallets and cards. Softune includes COD, bKash, Nagad, and SSLCommerz, and courier connections for Steadfast, Pathao, RedX, and eCourier. Store Sale POS uses the same catalog for walk-in sales.
              </p>
              <p className="mt-5 text-[16px] font-medium leading-relaxed text-[var(--color-muted)] md:text-lg">
                Each merchant's data is isolated per tenant. Customer records, orders, and theme settings stay on that shop's side of the database. That isolation is how one platform can host many stores without mixing them.
              </p>
            </div>
          </div>
        </section>

        {/* Milestone Timeline List (NOT Cards) */}
        <section className="py-24 border-y border-[var(--color-line)] bg-[var(--color-canvas)]/40 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)] opacity-5" />
          
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
                Our{" "}
                <span className="relative inline-block px-3 py-0.5 mx-1">
                  <span className="absolute inset-0 -rotate-1 rounded-lg bg-[var(--color-brand)]" />
                  <em className="relative not-italic text-white">Timeline</em>
                </span>
              </h2>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="relative border-l border-[var(--color-line)] ml-3 md:ml-4 pl-8 md:pl-10 space-y-12 py-4">
                {timeline.map((step, idx) => (
                  <motion.div
                    key={step.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.1 }}
                    className="relative text-left group"
                  >
                    {/* Node Circle */}
                    <div className="absolute -left-[48px] md:-left-[60px] top-1 flex size-8 md:size-10 items-center justify-center rounded-full bg-[var(--color-brand)] text-white ring-8 ring-[var(--color-canvas)] transition-transform group-hover:scale-110 shadow-sm">
                      <img src={step.icon} alt="" className="size-4 md:size-5 object-contain brightness-0 invert" />
                    </div>
                    <div>
                      <span className="text-[12px] font-black text-[var(--color-brand)] bg-[var(--color-brand)]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                        {step.year}
                      </span>
                      <h3 className="mt-4 text-xl md:text-2xl font-bold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand)]">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)] font-medium max-w-2xl">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Full-width CTA Banner (Scale Your Brand) */}
        <section className="pt-24 pb-24 max-w-7xl mx-auto px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Background Dots Gradient */}
            <div className="pointer-events-none absolute top-0 right-0 w-1/3 h-full bg-dot-grid-dense [mask-image:radial-gradient(ellipse_at_top_right,black_0%,transparent_70%)] opacity-80" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-ink)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Scale Your Brand With Us
              </h3>
              <p className="text-[15.5px] leading-relaxed text-[var(--color-muted)] font-medium mb-8">
                Experience an integrated system with POS logs, secure payment pathways, smart analytics, and courier integrations configured for conversion.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" as="a" href="/signup" className="px-8 py-3.5 font-bold gap-2">
                  Start Free
                  <img src="/icons/arrow-right.svg" alt="" className="size-4 object-contain brightness-0 invert" />
                </Button>
                <Button variant="secondary" as="a" href="/support/contact" className="px-8 py-3.5 font-bold">
                  Contact Support
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
