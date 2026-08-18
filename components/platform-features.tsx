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
    description: "Get a complete overview of your store at a glance. See real-time sales, order status, customer activity, and store analytics all in one place.",
    bullets: [
      "Real-time sales and revenue tracking",
      "Quick access to all store functions",
      "Customizable dashboard widgets"
    ],
    buttons: [
      { text: "View Demo", variant: "primary" },
      { text: "Start Free Trial", variant: "outline" }
    ]
  },
  {
    pillText: "Product Management",
    pillIcon: "/icons/shop-bag.svg",
    titleStart: "Add",
    titleHighlight: "Products",
    titleEnd: "in Minutes, Not Hours",
    description: "Manage your entire product catalog effortlessly. Add unlimited products with variants, track inventory, set pricing, and organize with categories—all with our AI-assisted product editor.",
    bullets: [
      "Bulk product upload and editing",
      "Product variants (size, color, weight)",
      "Real-time inventory tracking"
    ],
    buttons: [
      { text: "Learn More", variant: "primary" },
      { text: "Try It Now", variant: "outline" }
    ]
  },
  {
    pillText: "Order Fulfillment",
    pillIcon: "/icons/delivery.svg",
    titleStart: "Process Orders & Manage",
    titleHighlight: "Shipping",
    titleEnd: "Seamlessly",
    description: "Handle orders from start to finish. Track shipments, integrate with courier services, manage returns, and keep customers updated automatically.",
    bullets: [
      "Auto-sync with courier partners",
      "Order status updates to customers",
      "Return and refund management"
    ],
    buttons: [
      { text: "See Integration List", variant: "primary" },
      { text: "Get Started", variant: "outline" }
    ]
  },
  {
    pillText: "Business Insights",
    pillIcon: "/icons/analytics.svg",
    titleStart: "Understand Your Business With",
    titleHighlight: "AI-Powered",
    titleEnd: "Analytics",
    description: "Get actionable insights into customer behavior, sales trends, and store performance. Our AI analyzes your data and provides recommendations to grow your business.",
    bullets: [
      "Sales trends and revenue analytics",
      "Customer behavior insights",
      "AI-powered growth recommendations"
    ],
    buttons: [
      { text: "Explore Dashboard", variant: "primary" },
      { text: "Schedule Demo", variant: "outline" }
    ]
  },
  {
    pillText: "Store Customization",
    pillIcon: "/icons/themes.svg",
    titleStart: "Create Your Unique Store Without",
    titleHighlight: "Coding",
    titleEnd: "",
    description: "Choose from professional themes or customize your store's look with our AI-powered theme editor. Change colors, layouts, and branding in seconds.",
    bullets: [
      "Professional theme templates",
      "AI-assisted customization",
      "Mobile-optimized designs"
    ],
    buttons: [
      { text: "Browse Themes", variant: "primary" },
      { text: "Start Designing", variant: "outline" }
    ]
  },
  {
    pillText: "Platform Security",
    pillIcon: "/icons/lock.svg",
    titleStart: "Protect Your Business With Advanced",
    titleHighlight: "Security",
    titleEnd: "",
    description: "Keep your store and customer data safe with enterprise-grade fraud detection. Our AI monitors transactions, blocks suspicious activity, and ensures compliance with security standards.",
    bullets: [
      "Real-time fraud detection & prevention",
      "Secure payment processing",
      "Customer data protection"
    ],
    buttons: [
      { text: "Learn About Security", variant: "primary" },
      { text: "Enable Protection", variant: "outline" }
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
    <section className="py-24 md:py-32 bg-[#FAF9F6] border-y border-[var(--color-line)] overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-24 md:gap-40">
          {sections.map((section, index) => {
            const isVideoRight = index % 2 === 0;

            return (
              <div 
                key={index} 
                className={`flex flex-col gap-12 lg:gap-20 items-center ${
                  isVideoRight ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-8 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-3 inline-flex items-center gap-2 md:gap-3 rounded-full border border-[var(--color-line)] bg-white p-1 md:p-1.5 pr-3 md:pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                      <div className="relative flex size-5 md:size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
                        <span
                          className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                          style={{ animationDuration: "2s" }}
                        />
                        <img src={section.pillIcon} alt="" className="size-3 md:size-3.5 object-contain relative z-10" />
                      </div>
                      <span className="text-[13px] md:text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
                        {section.pillText}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.15]">
                      {section.titleStart}{" "}
                      <span className="relative inline-block whitespace-nowrap px-4 py-0.5 mx-1">
                        <span className="absolute inset-0 -rotate-1 top-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
                        <em className="relative not-italic text-white">{section.titleHighlight}</em>
                      </span>
                      {" "}{section.titleEnd}
                    </h2>
                    <p className="mt-6 text-[17px] md:text-[18px] leading-relaxed text-[var(--color-muted)] font-medium max-w-xl">
                      {section.description}
                    </p>
                  </motion.div>

                  <motion.ul 
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-4 max-w-xl"
                  >
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-[16px] text-[var(--color-ink-soft)] font-medium leading-relaxed">
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
                    className="flex flex-wrap gap-4 pt-4"
                  >
                    <Button 
                      variant="primary" 
                      className="animate-shine px-6 py-3.5 text-[15px] font-bold shadow-none gap-2 flex items-center justify-center"
                    >
                      {section.buttons[0].text}
                      <img src="/icons/arrow-right.svg" alt="" className="size-4 object-contain brightness-0 invert" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="px-6 py-3.5 text-[15px] font-bold shadow-none gap-2 flex items-center justify-center bg-transparent"
                    >
                      {section.buttons[1].text}
                      <img src="/icons/arrow-right.svg" alt="" className="size-4 object-contain opacity-60" />
                    </Button>
                  </motion.div>
                </div>

                {/* Video Placeholder */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex-1 w-full"
                >
                  <div className="relative aspect-[4/3] w-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-[#EBEBEB] border border-[#E5E5E5] shadow-lg">
                    {/* Placeholder for video */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[var(--color-muted)] font-medium text-lg">Video Placeholder</span>
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
