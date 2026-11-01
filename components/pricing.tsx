"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { getPlans } from "@/lib/pricing-data";
import { TRIAL_CTA, TRIAL_CTA_BN, TRIAL_NOTE, TRIAL_NOTE_BN } from "@/lib/site";

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
    pill: "bg-white/45 text-[#2a1306]",
    sub: "text-[#2a1306]/70",
  },
  featured: {
    image: "/pricing/growth.webp",
    ink: "text-white",
    pill: "bg-white/25 text-white",
    sub: "text-white/80",
  },
  top: {
    image: "/pricing/business.webp",
    ink: "text-white",
    pill: "bg-white/15 text-white",
    sub: "text-white/70",
  },
} as const;

export function Pricing({ locale = "en", showIntro = true }: { locale?: "en" | "bn"; showIntro?: boolean }) {
  // Monthly first: the headline number everywhere (blog posts, ads, llms.txt,
  // search-engine offers) is the real monthly price. Defaulting to Yearly
  // showed the lower per-month-billed-yearly figure as if it were the price.
  const [isAnnual, setIsAnnual] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isBn = locale === "bn";
  // English digits on both languages, by request.
  const money = (n: number) => n.toLocaleString("en-US");
  const planList = getPlans(locale);
  const signupHref = isBn ? "/bn/signup" : "/signup";
  const ctaText = isBn ? TRIAL_CTA_BN : TRIAL_CTA;
  const trialNote = isBn ? TRIAL_NOTE_BN : TRIAL_NOTE;

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

        <div className="grid items-stretch gap-5 md:grid-cols-3 lg:gap-6">
          {planList.map((plan, i) => {
            const popular = Boolean(plan.popular);
            const price = isAnnual ? plan.priceAnnually : plan.priceMonthly;
            const tile = TILES[popular ? "featured" : i === 0 ? "entry" : "top"];
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
                  className={`relative flex h-[210px] flex-col justify-between overflow-hidden rounded-[22px] p-5 sm:h-[220px] sm:p-6 ${tile.ink}`}
                  style={{
                    backgroundImage: `url(${tile.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[22px] [background:linear-gradient(145deg,rgb(255_255_255/0.16),transparent_42%)]"
                  />
                  <div className="relative flex items-center justify-between gap-2">
                    <span className={`rounded-full px-3.5 py-1.5 text-[13px] font-bold backdrop-blur-md ${tile.pill}`}>{plan.name}</span>
                    {popular ? (
                      <span className="rounded-full bg-white px-3 py-1.5 text-[10.5px] leading-none font-bold tracking-wider text-[var(--color-brand)] uppercase">
                        {isBn ? "সবচেয়ে পপুলার" : "Most Popular"}
                      </span>
                    ) : null}
                  </div>
                  <div className="relative">
                    <div className="flex items-baseline gap-1.5">
                      {/* The hero title's heading font, English digits, tightly tracked, on both languages. */}
                      <span
                        className="text-[46px] leading-none font-bold tracking-[-0.045em] sm:text-[52px]"
                        style={{ fontFamily: PRICE_FONT }}
                      >
                        ৳{money(price)}
                      </span>
                      <span className={`text-[14px] font-semibold ${tile.sub}`}>/mo</span>
                    </div>
                    <p className={`mt-2 min-h-[18px] text-[12.5px] font-semibold ${tile.sub}`}>
                      {isAnnual
                        ? isBn
                          ? `বিল হবে ৳${money(plan.priceAnnually * 12)} প্রতি বছর`
                          : `Billed ৳${money(plan.priceAnnually * 12)} yearly`
                        : null}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-3 pt-5 pb-3 sm:px-4">
                  <p className="min-h-[44px] text-[14px] leading-relaxed text-[var(--color-muted)]">{plan.description}</p>

                  <a
                    href={signupHref}
                    className={`mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-4 py-3.5 text-[14px] font-bold transition-all duration-200 hover:opacity-90 ${
                      popular ? "bg-[var(--color-brand)] text-white" : "bg-[var(--color-ink)] text-[var(--color-surface)]"
                    }`}
                  >
                    {ctaText}
                    <img
                      loading="lazy"
                      decoding="async"
                      src="/icons/arrow-right.svg"
                      alt=""
                      className={`size-4 object-contain ${popular ? "brightness-0 invert" : "brightness-0 invert dark:invert-0"}`}
                    />
                  </a>

                  <ul className="mt-6 flex flex-1 flex-col gap-3.5 border-t border-[var(--color-line)] pt-6">
                    {plan.features.map((feature) =>
                      feature.endsWith(":") ? (
                        // "Everything in Growth, plus:" introduces the list; it isn't a feature itself.
                        <li key={feature} className="text-[12px] font-bold tracking-wider text-[var(--color-muted)] uppercase">
                          {feature.replace(/:$/, "")}
                        </li>
                      ) : (
                        <li key={feature} className="flex items-start gap-3">
                          <span className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/14">
                            <Check className="size-3.5 text-[var(--color-brand)]" strokeWidth={3} />
                          </span>
                          <span className="text-[14px] font-medium text-[var(--color-ink-soft)]">{feature}</span>
                        </li>
                      ),
                    )}
                  </ul>
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
