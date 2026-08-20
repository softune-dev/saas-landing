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
      "50 Products limit",
      "500MB Media storage",
      "Fraud protection",
      "Theme editor",
      "Basic analytics",
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
      "500 Products limit",
      "2GB Media storage",
      "80 AI credits/day",
      "All Payments & Couriers",
      "AI Assistant Included",
      "Fraud protection",
      "Advanced Analytics",
      "Priority email support",
      "0% Transaction Fee",
    ],
  },
  {
    name: "Business",
    priceMonthly: 6990,
    priceAnnually: 5590,
    description: "Built for teams managing multiple client storefronts.",
    features: [
      "Everything in Growth, plus:",
      "Unlimited Products",
      "3 Storefronts included",
      "5GB Media storage",
      "250 AI credits/day",
      "All Add-Ons & tools included",
      "Account Manager",
    ],
  },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section
      id="pricing"
      className="border-b border-[var(--color-line)] bg-[var(--color-canvas)] pt-10 pb-14 md:pb-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <div className="mx-auto mb-8 flex flex-col items-center text-center">
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
                src="/icons/billing.svg"
                alt=""
                className="size-3 object-contain md:size-3.5 dark:invert"
              />
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
              Flexible Pricing
            </span>
          </motion.div>

          <h2 className="max-w-3xl text-3xl leading-[1.15] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.1] md:text-6xl">
            Simple plans for
            <br />
            growing{" "}
            <span className="relative ml-0.5 inline-block px-3 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
              <span className="absolute inset-0 -rotate-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Brands</em>
            </span>
          </h2>
        </div>

        {/* Billing toggle — flex-1 halves keep the sliding pill correct on narrow screens */}
        <div className="mb-10 flex justify-center md:mb-16">
          <div className="relative flex w-full max-w-[320px] items-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5 sm:max-w-none sm:w-auto">
            <button
              type="button"
              onClick={() => setIsAnnual(false)}
              className={`relative z-10 min-h-11 flex-1 rounded-full px-3 py-2.5 text-[14px] font-bold transition-colors duration-200 sm:w-32 sm:flex-none ${
                !isAnnual
                  ? "text-[var(--color-surface)]"
                  : "text-[var(--color-ink)] hover:text-[var(--color-ink-soft)]"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`relative z-10 min-h-11 flex-1 rounded-full px-3 py-2.5 text-[14px] font-bold transition-colors duration-200 sm:w-36 sm:flex-none ${
                isAnnual
                  ? "text-[var(--color-surface)]"
                  : "text-[var(--color-ink)] hover:text-[var(--color-ink-soft)]"
              }`}
            >
              Yearly{" "}
              <span
                className={`ml-0.5 text-[10px] tracking-wider uppercase ${
                  isAnnual ? "text-[var(--color-surface)]/80" : "text-[var(--color-brand)]"
                }`}
              >
                -20%
              </span>
            </button>

            <div
              className={`absolute top-1.5 bottom-1.5 rounded-full bg-[var(--color-ink)] transition-all duration-300 ease-in-out ${
                isAnnual
                  ? "left-[calc(50%+3px)] w-[calc(50%-9px)] sm:left-[134px] sm:w-36"
                  : "left-1.5 w-[calc(50%-9px)] sm:w-32"
              }`}
            />
          </div>
        </div>

        <div className="grid items-start gap-5 overflow-x-clip px-1 sm:gap-6 sm:px-0 md:grid-cols-3 lg:gap-8">
          {plans.map((plan, i) => {
            const isDark = plan.popular;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-[20px] transition-shadow duration-300 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] sm:rounded-[24px] ${
                  isDark
                    ? "z-10 bg-[#171717] shadow-xl md:-mt-4 md:mb-4"
                    : "overflow-hidden border border-[var(--color-line)] bg-[var(--color-surface)]"
                }`}
              >
                {isDark && (
                  <>
                    <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-b-xl bg-[var(--color-brand)] px-3 py-1.5 text-[11px] font-bold tracking-wider text-white uppercase shadow-sm sm:px-4">
                      Most Popular
                    </div>
                    <div className="absolute -top-3 -left-3 z-30 flex size-10 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-lg sm:-top-4 sm:-left-4 sm:size-12">
                      <img
                        src="/icons/splash.svg"
                        alt="Sparkle"
                        className="size-5 object-contain brightness-0 invert sm:size-6"
                      />
                    </div>
                  </>
                )}

                <div
                  className={`relative z-10 p-6 pb-6 sm:p-8 sm:pb-8 ${
                    !isDark
                      ? "rounded-b-[20px] bg-[var(--color-brand)] sm:rounded-b-[24px]"
                      : "pt-10"
                  }`}
                >
                  <div className="mb-5 sm:mb-6">
                    <h3 className="text-xl font-bold text-white">
                      {plan.name}
                    </h3>
                    <p className="mt-2 min-h-[40px] text-[14px] text-white/80">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-2 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                      ৳
                      {(isAnnual
                        ? plan.priceAnnually
                        : plan.priceMonthly
                      ).toLocaleString()}
                    </span>
                    <span className="text-[14px] font-medium text-white/70">
                      /mo
                    </span>
                  </div>

                  <div className="min-h-[20px]">
                    {isAnnual && (
                      <p
                        className={`text-[13px] font-semibold ${
                          !isDark ? "text-white" : "text-[var(--color-brand)]"
                        }`}
                      >
                        Billed ৳{(plan.priceAnnually * 12).toLocaleString()}{" "}
                        yearly
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className={`relative z-10 flex flex-1 flex-col p-6 pt-6 sm:p-8 sm:pt-8 ${
                    isDark ? "rounded-[20px] bg-[var(--color-surface)] sm:rounded-[24px]" : ""
                  }`}
                >
                  <div className="pointer-events-none absolute right-0 bottom-0 h-full w-full rounded-[20px] bg-dot-grid-dense opacity-100 [mask-image:radial-gradient(ellipse_at_bottom_right,black_0%,transparent_60%)] sm:rounded-[24px]" />

                  <div className="relative z-10 mb-6 flex-1 space-y-3 sm:mb-8 sm:space-y-3.5">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f0fdf4]">
                          <Check
                            className="size-3.5 text-[#16a34a]"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-[14px] font-medium text-[var(--color-ink-soft)]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant={isDark ? "primary" : "secondary"}
                    className="relative z-10 flex min-h-12 w-full items-center justify-center gap-2 py-3.5 text-[14px] font-bold"
                  >
                    Get Started
                    <img
                      src="/icons/arrow-right.svg"
                      alt=""
                      className={`size-4 object-contain ${
                        isDark ? "brightness-0 invert" : "opacity-60 dark:invert"
                      }`}
                    />
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
          className="relative mt-6 flex flex-col items-stretch justify-between gap-6 overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-shadow duration-300 hover:shadow-lg sm:mt-8 sm:rounded-[24px] sm:p-8 md:flex-row md:items-end md:gap-8 md:p-10"
        >
          <div className="pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-dot-grid-dense opacity-100 [mask-image:radial-gradient(ellipse_at_top_right,black_0%,transparent_70%)]" />

          <div className="relative z-10 w-full max-w-2xl">
            <h3 className="text-xl font-extrabold text-[var(--color-ink)] sm:text-2xl">
              Enterprise & Custom
            </h3>
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
            <Button
              variant="primary"
              className="w-full md:w-auto px-8 py-3.5 flex items-center justify-center gap-2 text-[15px] font-bold"
            >
              Contact Sales
              <img
                src="/icons/arrow-right.svg"
                alt=""
                className="size-4 object-contain brightness-0 invert"
              />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
