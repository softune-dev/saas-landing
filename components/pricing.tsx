"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { plans } from "@/lib/pricing-data";
import { TRIAL_CTA, TRIAL_NOTE } from "@/lib/site";

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  // Real Enterprise-card artwork, theme-matched — same mount-guard pattern
  // as the Hero to avoid a hydration mismatch on first paint.
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isDark = !mounted || resolvedTheme === "dark";
  const enterpriseImageSrc = isDark ? "/price-enter-d.webp" : "/price-enter-l.webp";

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
            loading="lazy"
            decoding="async"
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
          <p className="mt-4 max-w-xl text-[14px] font-medium text-[var(--color-muted)] md:text-[15px]">
            {TRIAL_NOTE}
          </p>
        </div>

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
            const popular = Boolean(plan.popular);
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-[20px] transition-shadow duration-300 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] sm:rounded-[24px] ${
                  popular
                    ? "z-10 overflow-hidden bg-[var(--color-ink)] shadow-[0_28px_64px_-20px_rgba(0,0,0,0.45)] ring-2 ring-[var(--color-brand)] md:-mt-4 md:mb-4 dark:bg-[#0c0c0c] dark:ring-[var(--color-brand)]"
                    : "overflow-hidden border border-[var(--color-line)] bg-[var(--color-surface)]"
                }`}
              >
                {popular ? (
                  <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-b-xl bg-[var(--color-brand)] px-3 py-1.5 text-[11px] font-bold tracking-wider text-white uppercase shadow-sm sm:px-4">
                    Most Popular
                  </div>
                ) : null}

                {/* Side plans: brand-orange header. Middle: dark ink header. */}
                <div
                  className={`relative z-10 p-6 pb-6 text-white sm:p-8 sm:pb-8 ${
                    popular
                      ? "bg-transparent pt-10"
                      : "rounded-b-[20px] bg-[var(--color-brand)] sm:rounded-b-[24px]"
                  }`}
                >
                  <div className="mb-5 sm:mb-6">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
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
                    {isAnnual ? (
                      <p
                        className={`text-[13px] font-semibold ${
                          popular
                            ? "text-[var(--color-brand)]"
                            : "text-white"
                        }`}
                      >
                        Billed ৳{(plan.priceAnnually * 12).toLocaleString()}{" "}
                        yearly
                      </p>
                    ) : null}
                  </div>
                </div>

                <div
                  className={`relative z-10 flex flex-1 flex-col p-6 pt-6 sm:p-8 sm:pt-8 ${
                    popular
                      ? "mx-3 mb-3 rounded-[18px] bg-[var(--color-surface)] sm:mx-4 sm:mb-4 sm:rounded-[20px]"
                      : ""
                  }`}
                >
                  {!popular ? (
                    <div className="pointer-events-none absolute right-0 bottom-0 h-full w-full rounded-[20px] bg-dot-grid-dense opacity-100 [mask-image:radial-gradient(ellipse_at_bottom_right,black_0%,transparent_60%)] sm:rounded-[24px]" />
                  ) : null}

                  <div className="relative z-10 mb-6 flex-1 space-y-3 sm:mb-8 sm:space-y-3.5">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div
                          className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                            popular
                              ? "bg-[var(--color-brand)]/12"
                              : "bg-[#f0fdf4] dark:bg-emerald-500/15"
                          }`}
                        >
                          <Check
                            className={`size-3.5 ${
                              popular
                                ? "text-[var(--color-brand)]"
                                : "text-[#16a34a] dark:text-emerald-400"
                            }`}
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
                    as="a"
                    href="/signup"
                    variant={popular ? "primary" : "secondary"}
                    className="relative z-10 flex min-h-12 w-full items-center justify-center gap-2 py-3.5 text-[14px] font-bold"
                  >
                    {TRIAL_CTA}
                    <img
            loading="lazy"
            decoding="async"
                      src="/icons/arrow-right.svg"
                      alt=""
                      className={`size-4 object-contain ${
                        popular
                          ? "brightness-0 invert"
                          : "opacity-60 dark:invert"
                      }`}
                    />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="relative mt-6 overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)] sm:mt-8 sm:rounded-[24px]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 h-2/3 w-2/3 bg-dot-grid-dense opacity-90 [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_75%)]"
          />

          <div className="relative z-10 grid items-stretch md:grid-cols-[1.15fr_0.85fr]">
            <div className="min-w-0 p-6 sm:p-8 md:p-10">
              <span className="inline-flex items-center rounded-full border border-[var(--color-brand)]/25 bg-[var(--color-brand)]/10 px-3 py-1 text-[11px] font-bold tracking-wider text-[var(--color-brand)] uppercase">
                Enterprise
              </span>
              <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-3xl">
                Custom stores, built for your brand
              </h3>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)]">
                Beyond shared templates: bespoke storefronts, integrations, and
                support tailored to how your team actually sells.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "Fully bespoke design, not the shared template system",
                  "Custom integrations negotiated to what they actually use",
                  "Custom AI credit allowance",
                  "Dedicated support",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
                      <Check
                        className="size-3.5 text-[var(--color-brand)]"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="text-[15px] leading-snug font-medium text-[var(--color-ink-soft)]">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                as="a"
                href="#contact"
                variant="primary"
                className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-bold sm:w-auto"
              >
                Contact Sales
                <img
            loading="lazy"
            decoding="async"
                  src="/icons/arrow-right.svg"
                  alt=""
                  className="size-4 object-contain brightness-0 invert"
                />
              </Button>
            </div>

            {/* Real Enterprise artwork, theme-matched. Outer padding gives
             * the top/right/bottom gap; rounded-2xl clips the image itself. */}
            <div className="relative hidden md:block">
              <div className="absolute inset-0 pt-2 pr-2 pb-2">
                <img
                  src={enterpriseImageSrc}
                  alt="Softune Enterprise custom ecommerce storefront"
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={700}
                  className="h-full w-full rounded-2xl object-cover object-right"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
