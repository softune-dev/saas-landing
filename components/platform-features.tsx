"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";

const sections = [
  {
    pillText: "Unified Dashboard",
    pillIcon: "/icons/analytics.svg",
    titleStart: "Manage Everything From Your",
    titleHighlight: "Dashboard",
    titleEnd: "",
    description: "Get a complete overview of your store at a glance. See real-time sales, manage pending orders, and track your active subscription limits all from a single screen.",
    bullets: [
      "Real-time sales and revenue tracking",
      "Unified view of products and categories",
      "Clear AI credit and storage tracking"
    ],
    buttons: [
      { text: "Get Started", variant: "primary" },
      { text: "See Features", variant: "outline" }
    ]
  },
  {
    pillText: "Product Management",
    pillIcon: "/icons/shop-bag.svg",
    titleStart: "Add",
    titleHighlight: "Products",
    titleEnd: "in Minutes, Not Hours",
    description: "Manage your entire product catalog effortlessly. Add products with unlimited variants (sizes, colors), categorize them smoothly, and let AI write your descriptions.",
    bullets: [
      "Unlimited product variants support",
      "AI-generated product descriptions",
      "Instant media library uploads"
    ],
    buttons: [
      { text: "Get Started", variant: "primary" },
      { text: "Explore Catalog", variant: "outline" }
    ]
  },
  {
    pillText: "Order Fulfillment",
    pillIcon: "/icons/delivery.svg",
    titleStart: "Process Orders & Manage",
    titleHighlight: "Fulfillment",
    titleEnd: "Seamlessly",
    description: "Handle incoming orders from cart to delivery. Filter by payment status, print PDF invoices in one click, and manage local courier deliveries.",
    bullets: [
      "One-click PDF invoice generation",
      "Built-in delivery and courier management",
      "Real-time payment status tracking"
    ],
    buttons: [
      { text: "Get Started", variant: "primary" },
      { text: "View Orders", variant: "outline" }
    ]
  },
  {
    pillText: "Business Insights",
    pillIcon: "/icons/analytics.svg",
    titleStart: "Understand Your Business With",
    titleHighlight: "Built-in",
    titleEnd: "Analytics",
    description: "Get actionable insights into sales trends, order volume, and top-selling categories. Export your raw data to CSV, PDF, or JSON instantly to run your own reports.",
    bullets: [
      "Real-time sales trends and revenue",
      "1-click CSV, PDF, and JSON exports",
      "Visual month-over-month comparisons"
    ],
    buttons: [
      { text: "Get Started", variant: "primary" },
      { text: "View Analytics", variant: "outline" }
    ]
  },
  {
    pillText: "AI Theme Editor",
    pillIcon: "/icons/themes.svg",
    titleStart: "Design Your Store With",
    titleHighlight: "AI Suggest",
    titleEnd: "",
    description: "Customize your Aurora, Bazaar, or Sweets theme with a live-preview editor. Use 'AI Suggest' to instantly generate brand colors, typography, and section copy based on a simple prompt.",
    bullets: [
      "Live preview for desktop and mobile",
      "AI Suggest for instant brand themes",
      "Drag-and-drop section reordering"
    ],
    buttons: [
      { text: "Get Started", variant: "primary" },
      { text: "Browse Themes", variant: "outline" }
    ]
  },
  {
    pillText: "Add-Ons Marketplace",
    pillIcon: "/icons/save.svg",
    titleStart: "Expand Your Store With",
    titleHighlight: "26 Add-Ons",
    titleEnd: "",
    description: "Connect your store to the tools you need. Install one-click extensions across Customer Engagement, Marketing & Sales, AI Automation, and Operations & Insights.",
    bullets: [
      "Payment gateways (Stripe, SSLCommerz, bKash)",
      "Marketing tools (Facebook Pixel, SEO)",
      "Customer engagement (Live chat, WhatsApp)"
    ],
    buttons: [
      { text: "Get Started", variant: "primary" },
      { text: "View All Add-Ons", variant: "outline" }
    ]
  }
];

const CheckIcon = () => (
  <svg className="size-6 shrink-0 text-[var(--color-brand)] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export function PlatformFeatures() {
  return (
    <section className="overflow-hidden border-y border-[var(--color-line)] bg-[#FAF9F6] py-14 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="flex flex-col gap-14 md:gap-40">
          {sections.map((section, index) => {
            const isVideoRight = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col items-center gap-8 md:gap-12 lg:gap-20 ${
                  isVideoRight ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="w-full flex-1 space-y-6 md:space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white p-1 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:gap-3 md:p-1.5 md:pr-4">
                      <div className="relative flex size-5 items-center justify-center rounded-full bg-[var(--color-brand)]/10 md:size-6">
                        <span
                          className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                          style={{ animationDuration: "2s" }}
                        />
                        <img
                          src={section.pillIcon}
                          alt=""
                          className="relative z-10 size-3 object-contain md:size-3.5"
                        />
                      </div>
                      <span className="text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
                        {section.pillText}
                      </span>
                    </div>

                    <h2 className="text-[1.7rem] leading-[1.2] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-4xl md:leading-[1.15] lg:text-[42px]">
                      {section.titleStart}{" "}
                      <span className="relative mx-0.5 inline-block px-2.5 py-0.5 sm:mx-1 sm:whitespace-nowrap sm:px-4">
                        <span className="absolute inset-0 top-1.5 -rotate-1 rounded-xl bg-[var(--color-brand)] shadow-sm sm:top-2" />
                        <em className="relative not-italic text-white">
                          {section.titleHighlight}
                        </em>
                      </span>{" "}
                      {section.titleEnd}
                    </h2>
                    <p className="mt-4 max-w-xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] sm:mt-6 sm:text-[17px] md:text-[18px]">
                      {section.description}
                    </p>
                  </motion.div>

                  <motion.ul
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="max-w-xl space-y-3 sm:space-y-4"
                  >
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-[15px] leading-relaxed font-medium text-[var(--color-ink-soft)] sm:text-[16px]">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </motion.ul>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4 sm:pt-4"
                  >
                    <Button
                      variant="primary"
                      className="animate-shine flex min-h-12 w-full items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-bold shadow-none sm:w-auto"
                    >
                      {section.buttons[0].text}
                      <img
                        src="/icons/arrow-right.svg"
                        alt=""
                        className="size-4 object-contain brightness-0 invert"
                      />
                    </Button>
                    <Button
                      variant="outline"
                      className="flex min-h-12 w-full items-center justify-center gap-2 bg-transparent px-6 py-3.5 text-[15px] font-bold shadow-none sm:w-auto"
                    >
                      {section.buttons[1].text}
                      <img
                        src="/icons/arrow-right.svg"
                        alt=""
                        className="size-4 object-contain opacity-60"
                      />
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex-1"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] border border-[#E5E5E5] bg-[#EBEBEB] shadow-lg sm:rounded-[24px] md:rounded-[32px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-[var(--color-muted)] sm:text-lg">
                        Video Placeholder
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
