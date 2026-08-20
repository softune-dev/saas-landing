"use client";

import { motion } from "framer-motion";
const items = [
  {
    icon: "/icons/themes.svg",
    title: "Real Multi-Theme System",
    body: "Don't settle for one rigid template. Switch instantly between our Aurora, Bazaar, and Sweets storefronts to perfectly match your brand's aesthetic.",
  },
  {
    icon: "/icons/save.svg",
    title: "Scalable Storage & AI",
    body: "Resources scale with your business plan - up to 250 AI actions/day and 5GB of media storage on the Business tier.",
  },
  {
    icon: "/icons/play.svg",
    title: "Guided Onboarding",
    body: "Never get lost. Every new store includes a step-by-step Getting Started checklist and an interactive product tour that guides you through your new dashboard.",
  },
  {
    icon: "/icons/shop-bag.svg",
    title: "Add-Ons Marketplace",
    body: "Expand your store natively with 26 powerful add-ons across Customer Engagement, Marketing & Sales, AI Automation, and Operations.",
  },
  {
    icon: "/icons/analytics.svg",
    title: "Actionable Analytics",
    body: "Track products, orders, and revenue trends directly in your dashboard. Export your raw data to CSV, PDF, or JSON instantly.",
  },
  {
    icon: "/icons/zap.svg",
    title: "AI-Powered Editor",
    body: "Experience our built-in AI Suggest tool for brand colors, layout direction, and product descriptions - working right inside the theme editor.",
  },
];

export function Why() {
  return (
    <section id="product" className="bg-[#FAF9F6] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white p-1 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:gap-3 md:p-1.5 md:pr-4"
        >
          <div className="relative flex size-5 md:size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
            <span
              className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
              style={{ animationDuration: "2s" }}
            />
            <img
              src="/icons/zap.svg"
              alt="Zap"
              className="size-3 md:size-3.5 object-contain"
            />
          </div>
          <span className="text-[13px] md:text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
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
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] md:text-[17px] lg:text-lg">
         Simple, affordable, and powerful. Everything you need to sell online in one place.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="group relative cursor-pointer overflow-hidden rounded-[20px] border border-[#D4D4D4] bg-white p-6 transition-all duration-300 hover:border-[var(--color-brand)] sm:rounded-[24px] md:p-10"
          >
            {/* Background Dots Gradient */}
            <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)] opacity-80" />

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
              <h3 className="mt-6 text-[18px] md:text-[20px] font-extrabold tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand)]">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-[var(--color-muted)]">
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
