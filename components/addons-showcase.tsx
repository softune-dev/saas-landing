"use client";

import { motion } from "framer-motion";

/** Visual copy of dashboard/components/addons/addon-data.ts ADDON_CATALOG. */
const ADDONS = [
  { id: "live-chat", name: "Live Chat", category: "Customer Engagement", logoSrc: "/addon/live.webp" },
  { id: "whatsapp-alerts", name: "WhatsApp Alerts", category: "Customer Engagement", logoSrc: "/addon/whatsapp.webp" },
  { id: "sms-updates", name: "SMS Updates", category: "Customer Engagement", logoSrc: "/addon/sms.webp" },
  { id: "product-reviews", name: "Product Reviews", category: "Customer Engagement", logoSrc: "/addon/reviews.webp" },
  { id: "loyalty-points", name: "Loyalty Points", category: "Customer Engagement", logoSrc: "/addon/loyalty.webp" },
  { id: "recently-viewed", name: "Recently Viewed", category: "Customer Engagement", logoSrc: "/addon/recent.webp" },
  { id: "quick-view", name: "Quick View", category: "Customer Engagement", logoSrc: "/addon/view.webp" },
  { id: "product-enquiry", name: "Product Enquiry", category: "Customer Engagement", logoSrc: "/addon/enquiry.webp" },
  { id: "product-compare", name: "Product Compare", category: "Customer Engagement", logoSrc: "/addon/compare.webp" },
  { id: "size-guide", name: "Size Guide", category: "Customer Engagement", logoSrc: "/addon/size.webp" },
  { id: "discount-codes", name: "Discount Codes", category: "Marketing & Sales", logoSrc: "/addon/discount.webp" },
  { id: "email-marketing", name: "Email Marketing", category: "Marketing & Sales", logoSrc: "/addon/e-marketing.webp" },
  { id: "referral-program", name: "Referral Program", category: "Marketing & Sales", logoSrc: "/addon/referral.webp" },
  { id: "purchase-notification", name: "Purchase Notification", category: "Marketing & Sales", logoSrc: "/addon/notification.webp" },
  { id: "wholesale-pricing", name: "Wholesale Pricing", category: "Marketing & Sales", logoSrc: "/addon/wholesaler.webp" },
  { id: "frequently-bought", name: "Frequently Bought", category: "Marketing & Sales", logoSrc: "/addon/frequently.webp" },
  { id: "review-reminder", name: "Review Reminder", category: "Marketing & Sales", logoSrc: "/addon/reminder.webp" },
  { id: "ai-chatbot", name: "AI Chatbot", category: "AI Automation", logoSrc: "/addon/chat.webp" },
  { id: "ai-auto-reply", name: "AI Auto-Reply", category: "AI Automation", logoSrc: "/addon/reply.webp" },
  { id: "ai-ad-copy", name: "AI Ad Copy", category: "AI Automation", logoSrc: "/addon/ai-ad.webp" },
  { id: "ai-forecasting", name: "AI Forecasting", category: "AI Automation", logoSrc: "/addon/forecast.webp" },
  { id: "staff-roles", name: "Staff Roles", category: "Operations & Insights", logoSrc: "/addon/staff.webp" },
  { id: "stock-alerts", name: "Stock Alerts", category: "Operations & Insights", logoSrc: "/addon/stock-alart.webp" },
  { id: "spam-prevention", name: "Spam Prevention", category: "Operations & Insights", logoSrc: "/addon/spam.webp" },
  { id: "catalog-export", name: "Catalog Export", category: "Operations & Insights", logoSrc: "/addon/export.webp" },
  { id: "product-badges", name: "Product Badges", category: "Operations & Insights", logoSrc: "/addon/badges.webp" },
] as const;

export function AddonsShowcase() {
  return (
    <section
      id="addons"
      className="scroll-mt-24 border-y border-[var(--color-line)] bg-[var(--color-canvas)] py-14 md:scroll-mt-28 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center text-center md:mb-12">
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
                src="/icons/save.svg"
                alt=""
                className="relative z-10 size-3 object-contain md:size-3.5 dark:invert"
              />
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
              Softune Marketplace
            </span>
          </motion.div>

          <h2 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.1] md:text-6xl">
            {ADDONS.length} ways to extend your{" "}
            <span className="relative ml-0.5 inline-block px-2.5 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
              <span className="absolute inset-0 top-1.5 -rotate-1 rounded-xl bg-[var(--color-brand)] shadow-sm sm:top-2" />
              <em className="relative not-italic text-white">store</em>
            </span>
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 border-t border-l border-[var(--color-line)]">
          {ADDONS.map((addon, i) => {
            // Hide the last tile on lg+ so a 5-col desktop grid fills evenly (25 = 5×5)
            const hideOnDesktop = i === ADDONS.length - 1;
            return (
              <motion.div
                key={addon.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.4) }}
                className={[
                  "flex min-h-[7.5rem] flex-col items-center justify-center gap-2.5 bg-[var(--color-surface)] px-3 py-6 text-center border-b border-r border-[var(--color-line)] sm:min-h-[8.5rem] sm:gap-3 sm:px-4 sm:py-8 md:min-h-[9.5rem]",
                  hideOnDesktop ? "lg:hidden" : "",
                ].join(" ")}
              >
                <img
            loading="lazy"
            decoding="async"
                  src={addon.logoSrc}
                  alt={`${addon.name} Softune add-on`}
                  width={64}
                  height={64}
                  className="size-10 object-contain sm:size-12 md:size-14"
                />
                <span className="text-[12px] leading-tight font-semibold tracking-tight text-[var(--color-ink)] sm:text-[13px] md:text-[14px]">
                  {addon.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
