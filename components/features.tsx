"use client";

import { motion } from "framer-motion";

const features = [
  { icon: "/icons/themes.svg", title: "Multiple Themes" },
  { icon: "/icons/domain.svg", title: "Multi Store Management" },
  { icon: "/icons/shop-bag.svg", title: "POS System" },
  { icon: "/icons/color.svg", title: "Theme Customize" },
  { icon: "/icons/zap.svg", title: "Store Customize" },
  { icon: "/icons/analytics.svg", title: "Store Analytics" },
  { icon: "/icons/user.svg", title: "Customer Management" },
  { icon: "/icons/cart.svg", title: "Orders Management" },
  { icon: "/icons/lock.svg", title: "Payment Gateway" },
  { icon: "/icons/book.svg", title: "Product Management" },
  { icon: "/icons/gemini.svg", title: "AI Assistant" },
  { icon: "/icons/help-desk.svg", title: "Helpdesk System" },
  { icon: "/icons/save.svg", title: "Inventory Tracking" },
  { icon: "/icons/splash.svg", title: "Courier Integration" },
  { icon: "/icons/lock.svg", title: "Fraud Detection" },
  { icon: "/icons/chat.svg", title: "Customer Insights" },
];

export function Features() {
  return (
    <section
      id="features"
      className="border-y border-[var(--color-line)] bg-[#FAF9F6]"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
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
                alt=""
                className="size-3 md:size-3.5 object-contain"
              />
            </div>
            <span className="text-[13px] md:text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Core Features
            </span>
          </motion.div>

          <h2 className="max-w-3xl font-extrabold tracking-tight text-4xl leading-[1.1] text-[var(--color-ink)] sm:text-5xl md:text-6xl">
           Manage Everything in {" "}
            <span className="relative inline-block whitespace-nowrap px-4 py-0.5 ml-1">
              <span className="absolute inset-0 -rotate-1 top-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">One Place</em>
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)] font-medium md:text-[17px] lg:text-lg">
            From powerful multi-store capabilities to deep AI integrations, Softune packs all the essential tools you need out of the box.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-left">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative overflow-hidden rounded-[24px] border border-[#D4D4D4] hover:border-[var(--color-brand)] bg-white p-6 md:p-8 transition-all duration-300 cursor-pointer group"
            >
              {/* Top Right Intense Dots */}
              <div className="pointer-events-none absolute top-0 right-0 w-full h-full bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_70%)] opacity-80" />

              <div className="relative z-10 flex flex-col items-start">
                <div className="inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-brand)] p-1.5 transition-transform duration-300 group-hover:scale-110">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm">
                    <img
                      src={f.icon}
                      alt=""
                      className="size-4 object-contain brightness-0 invert"
                    />
                  </div>
                </div>
                <h3 className="mt-5 text-[17px] font-extrabold tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors">
                  {f.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
