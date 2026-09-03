"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { getFeaturePage, FEATURES_LIST } from "@/lib/features-data";
import { HeroCtas } from "@/components/hero-ctas";

const CheckIcon = () => (
  <svg
    className="size-6 shrink-0 text-[var(--color-brand)] mt-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function FeaturePage({ locale = "en" }: { locale?: "en" | "bn" }) {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isBn = locale === "bn";
  const feature = getFeaturePage(slug, locale);
  if (!feature) notFound();
  const isDark = !mounted || resolvedTheme === "dark";
  const heroImageSrc = feature.heroImage && (isDark ? feature.heroImage.dark : feature.heroImage.light);
  const heroPlaceholderColor = feature.heroPlaceholderColor;
  const featurePrefix = isBn ? "/bn/features/" : "/features/";

  const activeFeaturesList = isBn
    ? [
        { slug: "multiple-themes", title: "থিম এডিটর", icon: "/icons/color.svg", desc: "আপনার ব্র্যান্ডিং ও ডিজাইন — লাইভ প্রিভিউ সহ" },
        { slug: "ai-assistant", title: "AI অ্যাসিস্ট্যান্ট", icon: "/icons/ai-pencil.svg", desc: "গুগল জেমিনি চালিত স্মার্ট কপি ও চ্যাট" },
        { slug: "payments", title: "পেমেন্ট গেটওয়ে", icon: "/icons/wallet.svg", desc: "COD, bKash, Nagad এবং SSLCommerz" },
        { slug: "store-sale", title: "স্টোর সেল", icon: "/icons/shop-bag.svg", desc: "লাইভ ক্যাটালগ দিয়ে দোকানে সরাসরি বিক্রি" },
        { slug: "marketing-tracking", title: "মার্কেটিং & ট্র্যাকিং", icon: "/icons/analytics.svg", desc: "Meta CAPI, TikTok, GTM এবং GA4 ইভেন্টস" },
        { slug: "store-analytics", title: "স্টোর অ্যানালিটিক্স", icon: "/icons/analytics.svg", desc: "রেভিনিউ, প্রফিট, ট্রাফিক ও কনভার্শন রিপোর্ট" },
        { slug: "courier", title: "কুরিয়ার ডেলিভারি", icon: "/icons/delivery.svg", desc: "Steadfast, Pathao, RedX, eCourier ও অন্যান্য" },
        { slug: "orders", title: "অর্ডার ম্যানেজমেন্ট", icon: "/icons/orders.svg", desc: "সার্চ, ফিল্টার, অর্ডারের স্ন্যাপশট ও প্রিন্ট স্লিপ" },
        { slug: "customer-management", title: "কাস্টমার ম্যানেজমেন্ট", icon: "/icons/user.svg", desc: "অর্ডার থেকে ফোন নম্বর ম্যাচিং শপার রসিদ" },
        { slug: "fraud-protection", title: "ফ্রড প্রোটেকশন", icon: "/icons/lock.svg", desc: "ফোন নম্বর ব্লকক্লিপ ও COD সিকিউরিটি রুলস" },
      ]
    : FEATURES_LIST;

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        {/* Hero Section */}
        <div className="relative pt-12 pb-14 px-5 text-center overflow-hidden bg-[var(--color-canvas)] rounded-b-[4rem] border-b-[6px] border-[var(--color-surface)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-6 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span
                className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                style={{ animationDuration: "2s" }}
              />
              <img
                src="/icons/zap.svg"
                alt=""
                className="size-3.5 object-contain dark:invert"
              />
            </div>
            <a
              href={isBn ? "/bn/features" : "/features"}
              className="text-[14px] font-semibold tracking-tight text-[var(--color-muted)] transition-colors hover:text-[var(--color-brand)]"
            >
              {isBn ? "ফিচারসমূহ" : "Features"}
            </a>
            <span className="font-bold text-[#D4D4D4]">/</span>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              {feature.pillText}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: isBn ? "var(--font-bn), var(--font-heading), sans-serif" : "var(--font-heading), sans-serif" }}
          >
            {feature.titleStart}
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">
                {feature.titleHighlight}
              </em>
            </span>
            {feature.titleEnd}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {feature.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 mt-8 flex justify-center"
          >
            <HeroCtas locale={locale} />
          </motion.div>

          {heroImageSrc && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="relative z-10 mx-auto mt-10 w-full max-w-4xl aspect-[16/9] overflow-hidden rounded-[24px] border border-[var(--color-line)] shadow-lg"
            >
              <img
                src={heroImageSrc}
                alt={`${feature.pillText} in the Softunebd dashboard`}
                loading="lazy"
                decoding="async"
                width={1920}
                height={1080}
                className="size-full object-cover"
              />
            </motion.div>
          )}

          {!heroImageSrc && heroPlaceholderColor && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="relative z-10 mx-auto mt-10 w-full max-w-4xl aspect-[16/9] overflow-hidden rounded-[24px] border border-[var(--color-line)] shadow-lg flex items-center justify-center"
              style={{ backgroundColor: heroPlaceholderColor }}
            >
              <span className="text-white/40 font-medium text-sm tracking-wide select-none">
                Screenshot coming soon
              </span>
            </motion.div>
          )}
        </div>

        {(heroImageSrc || heroPlaceholderColor) ? (
          <section className="py-24 md:py-32 border-y border-[var(--color-line)]">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <div className="flex flex-col gap-6">
                {feature.alternating.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="relative overflow-hidden rounded-[24px] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 md:p-10"
                  >
                    <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-full bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_75%)] opacity-60" />

                    <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
                      <div className="md:w-[45%] md:shrink-0">
                        <div className="mb-3 inline-flex items-center gap-2 md:gap-3 rounded-full border border-[var(--color-line)] bg-[var(--color-canvas)] p-1 md:p-1.5 pr-3 md:pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                          <div className="relative flex size-5 md:size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
                            <span
                              className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                              style={{ animationDuration: "2s" }}
                            />
                            <img
                              src={section.pillIcon}
                              alt=""
                              className="size-3 md:size-3.5 object-contain relative z-10 dark:invert"
                            />
                          </div>
                          <span className="text-[13px] md:text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
                            {section.pillText}
                          </span>
                        </div>

                        <h2 className="text-2xl md:text-[28px] font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.2]">
                          {section.titleStart}{" "}
                          <span className="relative inline-block whitespace-nowrap px-3 py-0.5 mx-0.5">
                            <span className="absolute inset-0 -rotate-1 top-1.5 rounded-lg bg-[var(--color-brand)] shadow-sm" />
                            <em className="relative not-italic text-white">
                              {section.titleHighlight}
                            </em>
                          </span>{" "}
                          {section.titleEnd}
                        </h2>
                        <p className="mt-4 text-[16px] leading-relaxed text-[var(--color-muted)] font-medium">
                          {section.description}
                        </p>
                      </div>

                      <div className="hidden md:block w-px self-stretch bg-[var(--color-line)]" />

                      <ul className="flex-1 space-y-3 md:pt-1">
                        {section.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckIcon />
                            <span className="text-[15px] text-[var(--color-ink-soft)] font-medium leading-snug">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="py-24 md:py-32 border-y border-[var(--color-line)] overflow-hidden">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <div className="flex flex-col gap-24 md:gap-40">
                {feature.alternating.map((section, index) => {
                  const isVideoRight = index % 2 === 0;

                  return (
                    <div
                      key={index}
                      className={`flex flex-col gap-12 lg:gap-20 items-center ${
                        isVideoRight ? "lg:flex-row" : "lg:flex-row-reverse"
                      }`}
                    >
                      <div className="flex-1 space-y-8 w-full">
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="mb-3 inline-flex items-center gap-2 md:gap-3 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 md:p-1.5 pr-3 md:pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <div className="relative flex size-5 md:size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
                              <span
                                className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                                style={{ animationDuration: "2s" }}
                              />
                              <img
                                src={section.pillIcon}
                                alt=""
                                className="size-3 md:size-3.5 object-contain relative z-10 dark:invert"
                              />
                            </div>
                            <span className="text-[13px] md:text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
                              {section.pillText}
                            </span>
                          </div>

                          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[var(--color-ink)] leading-[1.15]">
                            {section.titleStart}{" "}
                            <span className="relative inline-block whitespace-nowrap px-4 py-0.5 mx-1">
                              <span className="absolute inset-0 -rotate-1 top-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
                              <em className="relative not-italic text-white">
                                {section.titleHighlight}
                              </em>
                            </span>{" "}
                            {section.titleEnd}
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
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex-1 w-full"
                      >
                        <div className="relative aspect-square w-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-[var(--color-canvas)] border border-[var(--color-line)] shadow-lg">
                          {section.image ? (
                            <img
                              src={isDark ? section.image.dark : section.image.light}
                              alt={`${section.pillText} in the Softunebd dashboard`}
                              loading="lazy"
                              decoding="async"
                              width={1000}
                              height={1000}
                              className="size-full object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-[var(--color-muted)] font-medium text-lg">
                                Video Placeholder
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className="py-24 bg-[var(--color-canvas)] border-b border-[var(--color-line)]">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-col items-center text-center mx-auto mb-16">
              <h2 className="max-w-3xl mx-auto font-extrabold tracking-tight text-4xl sm:text-5xl leading-[1.1] text-[var(--color-ink)]">
                {feature.extraTitle.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="relative inline-block whitespace-nowrap px-4 py-0.5 mx-1">
                  <span className="absolute inset-0 -rotate-2 top-1 rounded-xl bg-[var(--color-brand)] shadow-sm" />
                  <em className="relative not-italic text-white">
                    {feature.extraTitle.split(" ").slice(-1)}
                  </em>
                </span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {feature.extraCards.map((card, idx) => (
                <motion.article
                  key={idx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="relative overflow-hidden rounded-[24px] border border-[var(--color-line)] hover:border-[var(--color-brand)] bg-[var(--color-surface)] p-8 md:p-10 transition-all duration-300 cursor-pointer group text-left"
                >
                  <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)] opacity-80" />

                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-brand)] p-1.5 transition-transform duration-300 group-hover:scale-110">
                      <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm">
                        <img
                          src={card.icon}
                          alt=""
                          className="size-5 object-contain brightness-0 invert"
                        />
                      </div>
                    </div>
                    <h3 className="mt-6 text-[18px] md:text-[20px] font-extrabold tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand)]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-[var(--color-muted)]">
                      {card.desc}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Navigation Cards */}
        <section className="py-24 bg-[var(--color-canvas)]">
          <div className="mx-auto max-w-7xl px-5 md:px-8 text-center">
            <h2 className="max-w-2xl mx-auto font-extrabold tracking-tight text-4xl sm:text-5xl leading-[1.1] text-[var(--color-ink)] mb-16">
              {isBn ? "অন্যান্য" : "Explore More"}{" "}
              <span className="relative inline-block whitespace-nowrap px-4 py-0.5 mx-1">
                <span className="absolute inset-0 -rotate-2 top-1 rounded-xl bg-[var(--color-brand)] shadow-sm" />
                <em className="relative not-italic text-white">
                  {isBn ? "ফিচারসমূহ" : "Features"}
                </em>
              </span>
            </h2>

            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-left">
              {activeFeaturesList.map((f, i) => {
                const isActive = f.slug === feature.slug;

                return (
                  <motion.div
                    key={f.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    onClick={() => {
                      if (isActive) {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        router.push(`${featurePrefix}${f.slug}`);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={`relative overflow-hidden rounded-[24px] border ${
                      isActive
                        ? "border-[var(--color-brand)] ring-1 ring-[var(--color-brand)] shadow-md"
                        : "border-[var(--color-line)] hover:border-[var(--color-brand)]"
                    } bg-[var(--color-surface)] p-6 md:p-8 transition-all duration-300 cursor-pointer group`}
                  >
                    <div className="pointer-events-none absolute top-0 right-0 w-full h-full bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_70%)] opacity-80" />

                    <div className="relative z-10 flex flex-col items-start">
                      <div
                        className={`inline-flex items-center justify-center rounded-full border border-dashed p-1.5 transition-transform duration-300 ${
                          isActive
                            ? "border-[var(--color-brand)] scale-110"
                            : "border-[var(--color-brand)] group-hover:scale-110"
                        }`}
                      >
                        <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm">
                          <img
                            src={f.icon}
                            alt=""
                            className="size-4 object-contain brightness-0 invert"
                          />
                        </div>
                      </div>
                      <h3
                        className={`mt-5 text-[17px] font-extrabold tracking-tight transition-colors ${
                          isActive
                            ? "text-[var(--color-brand)]"
                            : "text-[var(--color-ink)] group-hover:text-[var(--color-brand)]"
                        }`}
                      >
                        {f.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        <Faq locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
