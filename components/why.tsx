"use client";

import { motion } from "framer-motion";
const items = [
  {
    icon: "/icons/save.svg",
    title: "Built for Your Budget",
    body: "Affordable pricing designed for students and small businesses. Get enterprise-level features without the enterprise price tag.",
  },
  {
    icon: "/icons/clock.svg",
    title: "Launch in Minutes",
    body: "No developers needed. Set up your store, add products, and start selling in minutes with our intuitive dashboard.",
  },
  {
    icon: "/icons/shop-bag.svg",
    title: "Everything in One Place",
    body: "Products, orders, payments, analytics, and design tools—all integrated. No juggling multiple apps or platforms.",
  },
  {
    icon: "/icons/help-desk.svg",
    title: "Made for Your Market",
    body: "Understand your local needs. COD payments, local support, and features built specifically for small business owners.",
  },
  {
    icon: "/icons/zap.svg",
    title: "AI-Powered Tools",
    body: "Get smart recommendations for products, pricing, and customer insights. Let AI help you work smarter, not harder.",
  },
  {
    icon: "/icons/lock.svg",
    title: "Security & Reliability",
    body: "Your business data is protected with enterprise-grade security. 99.9% uptime guarantee so your store is always open.",
  },
];

export function Why() {
  return (
    <section id="product" className="bg-[#FAF9F6] py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-center text-center mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-4 inline-flex items-center gap-2 md:gap-3 rounded-full border border-[var(--color-line)] bg-white p-1 md:p-1.5 pr-3 md:pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
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

        <h2 className="max-w-2xl font-extrabold tracking-tight text-4xl leading-[1.1] text-[var(--color-ink)] sm:text-5xl md:text-6xl">
          Why Small Businesses
          <br />
          Choose{" "}
          <span className="relative inline-block whitespace-nowrap px-4 py-0.5 ml-1">
            <span className="absolute inset-0 -rotate-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
            <em className="relative not-italic text-white">Softune</em>
          </span>
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)] font-medium md:text-[17px] lg:text-lg">
         Simple, affordable, and powerful. Everything you need to sell online in one place.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="relative overflow-hidden rounded-[24px] border border-[#D4D4D4] hover:border-[var(--color-brand)] bg-white p-8 md:p-10 transition-all duration-300 cursor-pointer group"
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
