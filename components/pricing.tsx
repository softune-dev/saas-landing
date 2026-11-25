"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { FreePlanCard } from "./free-plan-card";
import { BILLING_MONTHS, getPlans, periodPrice, type BillingMonths } from "@/lib/pricing-data";
import { FREE_NOTE, FREE_NOTE_BN } from "@/lib/site";

// Purpose-made artwork gives each tier a distinct, premium surface while keeping the
// established sand → orange → ember progression. The image compositions leave their
// upper- and lower-left areas calm so the plan and price remain readable.

// The price numerals use the hero title's heading font. Li Mayukh (the Bangla hero face) only covers
// Bangla characters, so with English digits it would leave the ৳ sign heavy and the digits thin;
// the heading font draws both, on both languages.
const PRICE_FONT = "var(--font-heading), sans-serif";

const TILES = {
  entry: {
    image: "/pricing/starter.webp",
    ink: "text-[#2a1306]",
    pill: "border border-white/80 bg-white/78 text-[#2a1306] shadow-[0_8px_20px_rgb(42_19_6/0.14)]",
    sub: "text-[#2a1306]/70",
  },
  featured: {
    image: "/pricing/growth.webp",
    ink: "text-white",
    pill: "border border-white/45 bg-white/18 text-white shadow-[0_8px_20px_rgb(55_12_4/0.26)]",
    sub: "text-white/80",
  },
  top: {
    image: "/pricing/business.webp",
    ink: "text-white",
    pill: "border border-white/25 bg-black/30 text-white shadow-[0_8px_20px_rgb(0_0_0/0.42)]",
    sub: "text-white/70",
  },
} as const;

export function Pricing({ locale = "en", showIntro = true, homepage = false }: { locale?: "en" | "bn"; showIntro?: boolean; homepage?: boolean }) {
  // A year is selected first; each card states what is billed.
  const [months, setMonths] = useState<BillingMonths>(12);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isBn = locale === "bn";
  // English digits on both languages, by request.
  const money = (n: number) => n.toLocaleString("en-US");
  const planList = getPlans(locale);
  // Free sits under this grid in its own compact card.
  const billedEvery = isBn
    ? { 1: "মাসিক", 3: "3 মাসে", 6: "6 মাসে", 12: "বছরে" }
    : { 1: "monthly", 3: "every 3 months", 6: "every 6 months", 12: "yearly" };
  const periodName = isBn
    ? { 1: "1 মাস", 3: "3 মাস", 6: "6 মাস", 12: "12 মাস" }
    : { 1: "1 month", 3: "3 months", 6: "6 months", 12: "12 months" };
  const signupHref = isBn ? "/bn/signup" : "/signup";
  const trialNote = isBn ? FREE_NOTE_BN : FREE_NOTE;

  const isDark = !mounted || resolvedTheme === "dark";
  const enterpriseImageSrc = isDark ? "/price-enter-d.webp" : "/price-enter-l.webp";

  return (
    <section
      id="pricing"
      className="border-b border-[var(--color-line)] bg-[var(--color-canvas)] pt-10 pb-14 md:pb-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        {showIntro ? <div className="mx-auto mb-8 flex flex-col items-center text-center">
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
              {isBn ? "ফ্লেক্সিবল প্রাইসিং" : "Flexible Pricing"}
            </span>
          </motion.div>

          <h2 className="max-w-3xl text-3xl leading-[1.15] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.1] md:text-6xl">
            {isBn ? (
              <>
                গ্রোয়িং ব্র্যান্ডের জন্য
                <br />
                সহজ{" "}
                <span className="relative ml-0.5 inline-block px-3 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
                  <span className="absolute inset-0 -rotate-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
                  <em className="relative not-italic text-white">প্রাইসিং প্ল্যান</em>
                </span>
              </>
            ) : (
              <>
                Simple plans for
                <br />
                growing{" "}
                <span className="relative ml-0.5 inline-block px-3 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
                  <span className="absolute inset-0 -rotate-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
                  <em className="relative not-italic text-white">Brands</em>
                </span>
              </>
            )}
          </h2>
          <p className="mt-4 max-w-xl text-[14px] font-medium text-[var(--color-muted)] md:text-[15px]">
            {trialNote}
          </p>
        </div> : null}

        <div className="mb-10 flex justify-center md:mb-14">
          <div
            role="radiogroup"
            aria-label={isBn ? "বিলিং মেয়াদ" : "Billing period"}
            className="grid w-full max-w-[480px] grid-cols-4 gap-1 rounded-[22px] border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5"
          >
            {BILLING_MONTHS.map((m) => {
              const active = months === m;
              const percent = periodPrice("starter", m).percent;
              return (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setMonths(m)}
                  className={`relative flex min-h-[52px] flex-col items-center justify-center rounded-[17px] px-1 text-[13px] leading-tight font-bold whitespace-nowrap transition-colors duration-200 sm:text-[14px] ${
                    active ? "text-[var(--color-surface)]" : "text-[var(--color-ink)] hover:bg-[var(--color-ink)]/[0.05]"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="billing-period"
                      className="absolute inset-0 rounded-[17px] bg-[var(--color-ink)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{periodName[m]}</span>
                  {percent > 0 ? (
                    <span className={`relative text-[11px] font-bold ${active ? "text-[var(--color-surface)]/75" : "text-[var(--color-brand)]"}`}>
                      {isBn ? `${percent}% ছাড়` : `Save ${percent}%`}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-3 lg:gap-6">
          {planList.map((plan, i) => {
            const popular = Boolean(plan.popular);
            const paidPrice = periodPrice(plan.key, months);
            const tile = TILES[plan.key === "growth" ? "featured" : plan.key === "starter" ? "entry" : "top"];
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`flex h-full flex-col rounded-[30px] border bg-[var(--color-surface)] p-3 ${
                  popular
                    ? "border-[var(--color-brand)]/70 shadow-[0_30px_80px_-34px_var(--color-brand)]"
                    : "border-[var(--color-line)]"
                }`}
              >
                {/* The plan tile: custom tier artwork, plan name top-left, price bottom-left. */}
                <div
                  className={`relative flex h-[224px] flex-col justify-between overflow-hidden rounded-[22px] p-5 pb-3 sm:h-[234px] sm:p-6 sm:pb-4 ${tile.ink}`}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-2 scale-105 bg-cover bg-center blur-[2px]"
                    style={{ backgroundImage: `url(${tile.image})` }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[22px] [background:linear-gradient(145deg,rgb(255_255_255/0.16),transparent_42%)]"
                  />
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-bold backdrop-blur-xl ${tile.pill}`}>
                      {plan.name}
                    </span>
                    {popular ? (
                      <span className="rounded-full border border-white/70 bg-white/92 px-3 py-1.5 text-[10.5px] leading-none font-bold tracking-wider whitespace-nowrap text-[var(--color-brand)] shadow-[0_8px_20px_rgb(55_12_4/0.18)] uppercase">
                        {isBn ? "সবচেয়ে পপুলার" : "Most Popular"}
                      </span>
                    ) : null}
                  </div>
                  <div className="relative z-10 translate-y-1">
                    <div className="flex items-baseline gap-1.5">
                      {/* The hero title's heading font, English digits, tightly tracked, on both languages. */}
                      <span
                        className="text-[46px] leading-none font-bold tracking-[-0.045em] sm:text-[52px]"
                        style={{ fontFamily: PRICE_FONT }}
                      >
                        ৳{money(paidPrice.perMonth)}
                      </span>
                      <span className={`text-[14px] font-semibold ${tile.sub}`}>/mo</span>
                    </div>
                    <p className={`mt-2.5 flex min-h-[38px] flex-wrap content-start items-center gap-x-2 gap-y-1 text-[12.5px] font-semibold ${tile.sub}`}>
                      {months === 1 ? (
                        <span>{isBn ? "প্রতি মাসে বিল হবে" : "Billed every month"}</span>
                      ) : (
                        <>
                          <s className="opacity-80">৳{money(periodPrice(plan.key, 1).perMonth)}</s>
                          <span className="rounded-full bg-white/90 px-2 py-0.5 text-[11px] leading-4 font-bold text-[#2a1306]">
                            {isBn ? `${paidPrice.percent}% ছাড়` : `Save ${paidPrice.percent}%`}
                          </span>
                          <span>
                            {isBn
                              ? `${billedEvery[months]} ৳${money(paidPrice.total)} বিল`
                              : `৳${money(paidPrice.total)} billed ${billedEvery[months]}`}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-3 pt-5 pb-3 sm:px-4">
                  <p className="min-h-[48px] text-[14px] leading-[23px] text-[var(--color-muted)]">{plan.description}</p>

                  <a
                    href={signupHref}
                    className={`mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-4 py-3.5 text-[14px] font-bold transition-all duration-200 hover:opacity-90 ${
                      popular ? "bg-[var(--color-brand)] text-white" : "bg-[var(--color-ink)] text-[var(--color-surface)]"
                    }`}
                  >
                    {isBn ? `${plan.name} নিন` : `Get ${plan.name}`}
                    <img
                      loading="lazy"
                      decoding="async"
                      src="/icons/arrow-right.svg"
                      alt=""
                      className={`size-4 object-contain ${popular ? "brightness-0 invert" : "brightness-0 invert dark:invert-0"}`}
                    />
                  </a>

                  <div className="mt-6 flex flex-1 flex-col border-t border-[var(--color-line)] pt-5">
                    <p className="text-[13.5px] font-bold text-[var(--color-ink)]">
                      {isBn ? `${plan.includes === "Free" ? "ফ্রি" : plan.includes}-এর সব কিছু, সাথে:` : `Everything in ${plan.includes}, plus:`}
                    </p>
                    <ul className="mt-4 flex flex-1 flex-col gap-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/14">
                            <Check className="size-3.5 text-[var(--color-brand)]" strokeWidth={3} />
                          </span>
                          <span className="text-[14px] leading-snug font-medium text-[var(--color-ink-soft)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`${isBn ? "/bn/pricing" : "/pricing"}#compare-plans`}
                      className="mt-6 inline-flex w-fit items-center gap-1.5 text-[14px] font-bold text-[var(--color-brand)] hover:underline"
                    >
                      {isBn ? "সব ফিচার দেখুন" : "See all features"}
                      <ArrowUpRight className="size-4" strokeWidth={2.6} aria-hidden />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <FreePlanCard locale={locale} />

        {homepage ? (
          <div className="mt-8 flex justify-center">
            <Button as="a" href={isBn ? "/bn/pricing" : "/pricing"} variant="outline" className="inline-flex min-h-12 items-center gap-2 rounded-full px-7 py-3 text-[15px] font-bold">
              {isBn ? "সব প্রাইসিং প্ল্যান দেখুন" : "See all pricing"}
              <img
                loading="lazy"
                decoding="async"
                src="/icons/arrow-right.svg"
                alt=""
                className="size-4 object-contain dark:invert"
              />
            </Button>
          </div>
        ) : null}

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
                {isBn
                  ? "আপনার ব্র্যান্ডের জন্য কাস্টম সমাধান"
                  : "Custom stores, built for your brand"}
              </h3>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)]">
                {isBn
                  ? "শেয়ার্ড থিমের বাইরে কাস্টম স্টোরফ্রন্ট, বিশেষ ইন্টিগ্রেশন এবং আপনার টিমের চাহিদা অনুযায়ী আলাদা ডেডিকেটেড সাপোর্ট।"
                  : "Beyond shared themes: bespoke storefronts, integrations, and support tailored to how your team actually sells."}
              </p>
              <ul className="mt-5 space-y-3">
                {(isBn
                  ? [
                      "সম্পূর্ণ কাস্টম ডিজাইন ও স্টোরফ্রন্ট ডেভেলপমেন্ট",
                      "প্রয়োজন অনুযায়ী বিশেষ পেমেন্ট ও সিস্টেম ইন্টিগ্রেশন",
                      "কাস্টম AI ক্রেডিট অ্যালটমেন্ট",
                      "ডেডিকেটেড একাউন্ট ম্যানেজার ও সাপোর্ট",
                    ]
                  : [
                      "Fully bespoke design, not the shared theme system",
                      "Custom integrations negotiated to what they actually use",
                      "Custom AI credit allowance",
                      "Dedicated support",
                    ]
                ).map((line) => (
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
                href={isBn ? "/bn/support/contact" : "/support/contact"}
                variant="primary"
                className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-bold sm:w-auto"
              >
                {isBn ? "সেলস টিমের সাথে কথা বলুন" : "Contact Sales"}
                <img
                  loading="lazy"
                  decoding="async"
                  src="/icons/arrow-right.svg"
                  alt=""
                  className="size-4 object-contain brightness-0 invert"
                />
              </Button>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute inset-0 pt-2 pr-2 pb-2">
                <img
                  src={enterpriseImageSrc}
                  alt="SoftuneBD Enterprise custom ecommerce storefront"
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
