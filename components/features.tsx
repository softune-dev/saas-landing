"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/** Ordered by attention / conversion priority. First 6 show on mobile before “View all”. */
const features = [
  {
    icon: "/icons/color.svg",
    title: "AI Theme Editor",
    desc: "Change colors, fonts, and sections with a live preview — no designer needed to launch a Bangladesh storefront.",
  },
  {
    icon: "/icons/ai-pencil.svg",
    title: "AI Assistant",
    desc: "Ask about products, orders, and sales in Bangla or English, using your own Softunebd store data.",
  },
  {
    icon: "/icons/wallet.svg",
    title: "bKash, Nagad, SSLCommerz & COD",
    desc: "Take cash on delivery plus bKash, Nagad, and SSLCommerz from one payments screen.",
  },
  {
    icon: "/icons/cart.svg",
    title: "POS",
    desc: "Ring up walk-in sales with Store Sale POS, then see them next to your online orders.",
  },
  {
    icon: "/icons/billing.svg",
    title: "Marketing & Tracking",
    desc: "Fire Meta, TikTok, GTM, and GA4 ecommerce events, including server-side Meta CAPI.",
  },
  {
    icon: "/icons/analytics.svg",
    title: "Store Analytics",
    desc: "See real revenue, profit, and visitors from Softunebd orders — not guessed funnels.",
  },
  {
    icon: "/icons/orders.svg",
    title: "Order Management",
    desc: "Process COD and prepaid orders, statuses, and courier handoff from one list.",
  },
  {
    icon: "/icons/shop-bag.svg",
    title: "Product Catalog",
    desc: "Add photos, variants, stock, and taka prices, with AI drafts you still confirm.",
  },
  {
    icon: "/icons/delivery.svg",
    title: "Courier Delivery",
    desc: "Connect Steadfast, Pathao, RedX, and eCourier with your own merchant accounts.",
  },
  {
    icon: "/icons/user.svg",
    title: "Customer Management",
    desc: "Keep every shopper, order history, and phone number in one customer list.",
  },
  {
    icon: "/icons/lock.svg",
    title: "Fraud Protection",
    desc: "Automatically flag suspicious orders before they ship, so you're not paying courier fees on scams.",
  },
  {
    icon: "/icons/domain.svg",
    title: "SEO & Domains",
    desc: "Set titles, Open Graph, tracking pixels, and a custom domain from Site Settings.",
  },
  {
    icon: "/icons/save.svg",
    title: "Add-Ons Marketplace",
    desc: "Turn on reviews, WhatsApp alerts, and discounts without extra plugins.",
  },
  {
    icon: "/icons/book.svg",
    title: "Categories",
    desc: "Group products so shoppers can browse your storefront by collection.",
  },
  {
    icon: "/icons/splash.svg",
    title: "Media Library",
    desc: "Upload and reuse product photos across the catalog without re-uploading.",
  },
  {
    icon: "/icons/play.svg",
    title: "Guided Onboarding",
    desc: "A short setup walkthrough gets your first theme, products, and payments live.",
  },
];

export function Features() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section
      id="features"
      className="border-y border-[var(--color-line)] bg-[var(--color-canvas)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-5 md:px-8 md:py-28">
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
            loading="lazy"
            decoding="async"
                src="/icons/zap.svg"
                alt=""
                className="size-3 object-contain md:size-3.5 dark:invert"
              />
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
              Core Features
            </span>
          </motion.div>

          <h2 className="max-w-3xl text-3xl leading-[1.15] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.1] md:text-6xl">
            Manage Everything in{" "}
            <span className="relative ml-0.5 inline-block px-3 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
              <span className="absolute inset-0 top-1.5 -rotate-1 rounded-xl bg-[var(--color-brand)] shadow-sm sm:top-2" />
              <em className="relative not-italic text-white">One Place</em>
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 text-left sm:mt-16 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className={`group relative cursor-pointer overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 transition-all duration-300 hover:border-[var(--color-brand)] sm:rounded-[24px] sm:p-6 md:p-8 ${
                !showAll && i >= 6 ? "hidden md:block" : ""
              }`}
            >
              {/* Top Right Intense Dots */}
              <div className="pointer-events-none absolute top-0 right-0 w-full h-full bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_70%)] opacity-80" />

              <div className="relative z-10 flex flex-col items-start">
                <div className="inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-brand)] p-1.5 transition-transform duration-300 group-hover:scale-110">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm">
                    <img
            loading="lazy"
            decoding="async"
                      src={f.icon}
                      alt=""
                      className="size-4 object-contain brightness-0 invert"
                    />
                  </div>
                </div>
                <h3 className="mt-5 text-[17px] font-extrabold tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors">
                  {f.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed font-medium text-[var(--color-muted)] sm:text-[14px]">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <div className="mt-6 flex justify-center md:hidden">
            <button
              onClick={() => setShowAll(true)}
              className="rounded-full bg-[var(--color-brand)] px-6 py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 shadow-sm"
            >
              View all 16 features
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
