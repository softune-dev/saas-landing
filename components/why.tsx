"use client";

import { motion } from "framer-motion";

/** Six reasons that map to Softune’s real product priorities. */
const items = [
  {
    icon: "/icons/color.svg",
    title: "Live Theme Editor",
    body: "Design your storefront with a live preview. Change colors, fonts, sections, and pages, then publish only when it looks right.",
  },
  {
    icon: "/icons/ai-pencil.svg",
    title: "AI Built In",
    body: "Google Gemini powers product copy, Theme Editor suggestions, and dashboard chat that reads your real products and orders.",
  },
  {
    icon: "/icons/wallet.svg",
    title: "Payments That Fit",
    body: "Cash on Delivery, manual bKash/Nagad, official bKash, Nagad, and SSLCommerz live on one Payments screen, so checkout stays centralized and easy to run.",
  },
  {
    icon: "/icons/cart.svg",
    title: "POS for Walk-In Sales",
    body: "Sell in person from the same live catalog. Search products, filter by category, complete the sale, and print a receipt.",
  },
  {
    icon: "/icons/analytics.svg",
    title: "Marketing & Tracking",
    body: "Meta, TikTok, GTM, and GA4 fire real ecommerce events. Meta Conversions API sends Purchase server-side so blocked browsers still count.",
  },
  {
    icon: "/icons/zap.svg",
    title: "Real Store Analytics",
    body: "See revenue, unique visitors, conversion rate, and profit when you set Cost Price on products. Export CSV, JSON, or PDF anytime.",
  },
];

export function Why() {
  return (
    <section id="product" className="bg-[var(--color-canvas)] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:gap-3 md:p-1.5 md:pr-4"
          >
            <div className="relative flex size-5 items-center justify-center rounded-full bg-[var(--color-brand)]/10 md:size-6">
              <span
                className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                style={{ animationDuration: "2s" }}
              />
              <img
                src="/icons/zap.svg"
                alt=""
                className="size-3 object-contain md:size-3.5 dark:invert"
              />
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
              Why Softune?
            </span>
          </motion.div>

          <h2 className="max-w-2xl text-3xl leading-[1.15] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.1] md:text-6xl">
            Why Small Businesses
            <br />
            Choose{" "}
            <span className="relative ml-1 inline-block px-3 py-0.5 sm:whitespace-nowrap sm:px-4">
              <span className="absolute inset-0 -rotate-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Softune</em>
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group relative cursor-pointer overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-all duration-300 hover:border-[var(--color-brand)] sm:rounded-[24px] md:p-10"
            >
              <div className="pointer-events-none absolute top-0 right-0 h-2/3 w-2/3 bg-dot-grid-dense opacity-80 [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)]" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-brand)] p-1.5 transition-transform duration-300 group-hover:scale-110">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm">
                    <img
                      src={item.icon}
                      alt=""
                      className="size-5 object-contain brightness-0 invert"
                    />
                  </div>
                </div>
                <h3 className="mt-6 text-[18px] font-extrabold tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand)] md:text-[20px]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)] md:text-[16px]">
                  {item.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
