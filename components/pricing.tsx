"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Starter",
    priceMonthly: 1190,
    priceAnnually: 950,
    description: "Perfect for new stores and small businesses getting started.",
    features: [
      "50 products",
      "1 Courier integration",
      "Theme editor",
      "Basic analytics",
      "Media library",
      "Manual blocklist",
      "0% Transaction Fee",
    ],
  },
  {
    name: "Growth",
    priceMonthly: 2990,
    priceAnnually: 2390,
    popular: true,
    description: "Everything you need to scale your growing e-commerce brand.",
    features: [
      "500 products",
      "All courier integrations",
      "Payment gateway integrations",
      "AI Assistant Included",
      "Fraud protection",
      "Priority email support",
      "Advanced Analytics",
      "0% Transaction Fee",
    ],
  },
  {
    name: "Business",
    priceMonthly: 6990,
    priceAnnually: 5590,
    description: "Built for teams managing multiple client storefronts.",
    features: [
      "3 Storefronts",
      "All in growth",
      "Unlimited products",
      "Extra AI credits",
      "Account Manager",
      "Custom tool",
      "0% Transaction Fee",
    ],
  },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section
      id="pricing"
      className="border-b border-[var(--color-line)] bg-[#FAF9F6] pt-10 pb-20"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mx-auto mb-8">
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
                src="/icons/billing.svg"
                alt=""
                className="size-3 md:size-3.5 object-contain"
              />
            </div>
            <span className="text-[13px] md:text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Flexible Pricing
            </span>
          </motion.div>

          <h2 className="max-w-3xl font-extrabold tracking-tight text-4xl leading-[1.1] text-[var(--color-ink)] sm:text-5xl md:text-6xl">
            Simple plans for
            <br />
            growing{" "}
            <span className="relative inline-block whitespace-nowrap px-4 py-0.5 ml-1">
              <span className="absolute inset-0 -rotate-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Brands</em>
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)] font-medium md:text-[17px] lg:text-lg">
            Whether you're just starting out or managing multiple high-volume storefronts, we have a plan built for your exact needs.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-16">
          <div className="relative flex items-center rounded-full border border-[#D4D4D4] bg-white p-1.5">
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative z-10 w-32 rounded-full py-2.5 text-[14px] font-bold transition-colors duration-200 ${
                !isAnnual ? "text-white" : "text-[var(--color-ink)] hover:text-[var(--color-ink-soft)]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative z-10 w-36 rounded-full py-2.5 text-[14px] font-bold transition-colors duration-200 ${
                isAnnual ? "text-white" : "text-[var(--color-ink)] hover:text-[var(--color-ink-soft)]"
              }`}
            >
              Yearly <span className={`text-[10px] ml-1 uppercase tracking-wider ${isAnnual ? "text-white/80" : "text-[var(--color-brand)]"}`}>-20%</span>
            </button>
            
            {/* Sliding Pill */}
            <div
              className={`absolute top-1.5 bottom-1.5 rounded-full bg-[var(--color-ink)] transition-all duration-300 ease-in-out ${
                isAnnual ? "left-[134px] w-36" : "left-1.5 w-32"
              }`}
            />
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8 items-start">
          {plans.map((plan, i) => {
            const isDark = plan.popular;
            return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-[24px] transition-shadow duration-300 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] ${
                isDark 
                  ? "bg-[var(--color-ink)] shadow-xl md:-mt-4 md:mb-4 z-10" 
                  : "bg-white border border-[#D4D4D4] overflow-hidden"
              }`}
            >
              {isDark && (
                <>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl bg-[var(--color-brand)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm whitespace-nowrap z-20">
                    Most Popular
                  </div>
                  <div className="absolute -top-4 -left-4 z-30 flex size-12 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-lg">
                    <img src="/icons/splash.svg" alt="Sparkle" className="size-6 object-contain brightness-0 invert" />
                  </div>
                </>
              )}
              
              {/* Top Section */}
              <div className={`relative z-10 p-8 pb-8 ${!isDark ? "bg-[var(--color-brand)] rounded-b-[24px]" : "pt-10"}`}>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-2 text-[14px] min-h-[40px] text-white/80">{plan.description}</p>
                </div>

                <div className="mb-2 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-white">
                    ৳{(isAnnual ? plan.priceAnnually : plan.priceMonthly).toLocaleString()}
                  </span>
                  <span className="text-[14px] font-medium text-white/70">/mo</span>
                </div>
                
                <div className="min-h-[20px]">
                  {isAnnual && (
                    <p className={`text-[13px] font-semibold ${!isDark ? "text-white" : "text-[var(--color-brand)]"}`}>
                      Billed ৳{(plan.priceAnnually * 12).toLocaleString()} yearly
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Section */}
              <div className={`p-8 pt-8 flex-1 flex flex-col relative z-10 ${isDark ? "bg-white rounded-[24px]" : ""}`}>
                <div className="absolute bottom-0 right-0 w-full h-full bg-dot-grid-dense [mask-image:radial-gradient(ellipse_at_bottom_right,black_0%,transparent_60%)] pointer-events-none opacity-100 rounded-[24px]" />
                
                <div className="flex-1 space-y-3.5 mb-8 relative z-10">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f0fdf4]">
                        <Check className="size-3.5 text-[#16a34a]" strokeWidth={3} />
                      </div>
                      <span className="text-[14px] font-medium text-[var(--color-ink-soft)]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={isDark ? "primary" : "secondary"} 
                  className="w-full py-3.5 text-[14px] font-bold gap-2 flex items-center justify-center relative z-10"
                >
                  Get Started
                  <img src="/icons/arrow-right.svg" alt="" className={`size-4 object-contain ${isDark ? "brightness-0 invert" : "opacity-60"}`} />
                </Button>
              </div>
            </motion.div>
            );
          })}
        </div>

        {/* Custom Plan Card at Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 relative overflow-hidden rounded-[24px] border border-[#D4D4D4] bg-white p-8 md:p-10 flex flex-col md:flex-row items-end justify-between gap-8 transition-shadow duration-300 hover:shadow-lg"
        >
          <div className="absolute top-0 right-0 w-1/3 h-full bg-dot-grid-dense [mask-image:radial-gradient(ellipse_at_top_right,black_0%,transparent_70%)] opacity-100 pointer-events-none" />
          
          <div className="max-w-2xl relative z-10 w-full">
            <h3 className="text-2xl font-extrabold text-[var(--color-ink)]">Enterprise & Custom</h3>
            <ul className="mt-5 space-y-3">
              <li className="flex items-start gap-3">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f0fdf4]">
                  <Check className="size-3.5 text-[#16a34a]" strokeWidth={3} />
                </div>
                <span className="text-[15px] leading-snug text-[var(--color-muted)] font-medium">
                  Fully bespoke design, not the shared template system
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f0fdf4]">
                  <Check className="size-3.5 text-[#16a34a]" strokeWidth={3} />
                </div>
                <span className="text-[15px] leading-snug text-[var(--color-muted)] font-medium">
                  Custom integrations negotiated to what they actually use
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f0fdf4]">
                  <Check className="size-3.5 text-[#16a34a]" strokeWidth={3} />
                </div>
                <span className="text-[15px] leading-snug text-[var(--color-muted)] font-medium">
                  Custom AI credit allowance
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f0fdf4]">
                  <Check className="size-3.5 text-[#16a34a]" strokeWidth={3} />
                </div>
                <span className="text-[15px] leading-snug text-[var(--color-muted)] font-medium">
                  Dedicated support
                </span>
              </li>
            </ul>
          </div>
          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <Button variant="primary" className="w-full md:w-auto px-8 py-3.5 flex items-center justify-center gap-2 text-[15px] font-bold">
              Contact Sales
              <img src="/icons/arrow-right.svg" alt="" className="size-4 object-contain brightness-0 invert" />
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
