"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export type FeatureSection = {
  pillText: string;
  pillIcon: string;
  titleStart: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  bullets: string[];
  /** Base name under /showcase — uses `{name}-l.webp` / `{name}-d.webp`. */
  showcase: string;
  /** Optional solid-color stand-in if a showcase asset is temporarily missing. */
  placeholderColor?: string;
};

export const sectionsEn: FeatureSection[] = [
  {
    pillText: "Theme Editor",
    pillIcon: "/icons/color.svg",
    titleStart: "Design Your Store",
    titleHighlight: "Live",
    titleEnd: "",
    description:
      "Edit your storefront in Softunebd’s Theme Editor: change colors, fonts, sections, and copy, preview desktop and mobile, then publish when it looks right.",
    bullets: [
      "Live preview of your real theme while you edit",
      "AI Suggest for brand colors, fonts, and storefront text",
      "Desktop, tablet, and mobile preview widths",
      "Drag-and-drop homepage sections without code",
      "Draft changes stay private until you publish",
    ],
    showcase: "editor",
  },
  {
    pillText: "AI Chatbot",
    pillIcon: "/icons/chat.svg",
    titleStart: "Ask Softunebd,",
    titleHighlight: "Get Answers",
    titleEnd: "",
    description:
      "Chat with Softunebd’s built-in AI, powered by Google Gemini. It reads your real products, orders, and sales, then helps you act without leaving the dashboard.",
    bullets: [
      "Powered by Google Gemini for clear, fast answers",
      "Ask about products, orders, and sales in plain language",
      "Answers come from your own Softunebd store data",
      "Propose product or category changes you still confirm",
      "Stay inside Softunebd — no extra AI app to open",
    ],
    showcase: "chat",
  },
  {
    pillText: "Payments",
    pillIcon: "/icons/wallet.svg",
    titleStart: "Payments,",
    titleHighlight: "Made Simple",
    titleEnd: "",
    description:
      "COD, manual bKash/Nagad, official bKash, Nagad, and SSLCommerz live in one place. Connect merchant accounts or take wallet payments with a transaction ID — all from a single Payments screen.",
    bullets: [
      "Cash on Delivery with optional fee when you need it",
      "Manual bKash and Nagad — shopper pays your number, you verify the transaction ID",
      "Official bKash, Nagad, and SSLCommerz merchant connects from the same screen",
      "Centralized setup instead of scattered payment plugins",
      "Encrypted credentials stored with your store",
    ],
    showcase: "payment",
  },
  {
    pillText: "SEO & Domains",
    pillIcon: "/icons/domain.svg",
    titleStart: "Rank Your Store,",
    titleHighlight: "Own Your Domain",
    titleEnd: "",
    description:
      "Softunebd Site Settings covers search listings, social share previews, tracking pixels, and your custom domain — so discovery and measurement live next to the store you publish.",
    bullets: [
      "Titles, meta descriptions, keywords, favicon, and AI help for SEO copy",
      "Open Graph title, description, and image for cleaner Facebook and chat previews",
      "Sitemap and indexing controls, plus Google Analytics and Search Console",
      "Meta Pixel, TikTok Pixel, Google Tag Manager, and Meta Conversions API (CAPI)",
      "Connect your own domain without a separate hosting stack",
    ],
    showcase: "seo",
  },
  {
    pillText: "AI Writing",
    pillIcon: "/icons/ai-pencil.svg",
    titleStart: "AI Text,",
    titleHighlight: "One Click",
    titleEnd: "",
    description:
      "Generate product copy in one click, then regenerate any description anytime until it sounds right.",
    bullets: [
      "Create product descriptions with AI in one click",
      "Regenerate any description until the wording fits",
      "Edit the draft fully before you save",
      "Uses your product details as context for better copy",
      "Works inside the Softunebd product editor you already use",
    ],
    showcase: "ai",
  },
  {
    pillText: "POS",
    pillIcon: "/icons/cart.svg",
    titleStart: "Sell In Person,",
    titleHighlight: "Same Catalog",
    titleEnd: "",
    description:
      "Softunebd POS is walk-in checkout on your live product catalog. Search, filter by category, complete the sale, print a receipt, and review recent POS orders.",
    bullets: [
      "Same Softunebd products and stock as your online store",
      "Category filters, compact product rows, and pagination",
      "Cash, card, or mobile banking labels on each sale",
      "Printable shop-style receipt with date, time, and totals",
      "Recent Sales list for walk-in (POS) orders",
    ],
    showcase: "pos",
  },
];

export const sectionsBn: FeatureSection[] = [
  {
    pillText: "Theme Editor",
    pillIcon: "/icons/color.svg",
    titleStart: "স্টোর ডিজাইন করুন",
    titleHighlight: "লাইভ",
    titleEnd: "",
    description:
      "Softunebd-এর Theme Editor-এ আপনার স্টোরফ্রন্ট এডিট করুন: কালার, ফন্ট, সেকশন ও টেক্সট পরিবর্তন করুন, ডেস্কটপ ও মোবাইলে প্রিভিউ দেখুন, পছন্দ হলেই পাবলিশ করুন।",
    bullets: [
      "এডিট করার সময় রিয়েল-টাইম লাইভ প্রিভিউ",
      "ব্র্যান্ড কালার, ফন্ট ও কপি সাজাতে AI Suggestion",
      "ডেস্কটপ, ট্যাবলেট ও মোবাইল ভিউ প্রিভিউ",
      "কোডিং ছাড়াই ড্র্যাগ-এন্ড-ড্রপ সেকশন বিল্ডার",
      "পাবলিশ না করা পর্যন্ত ড্রাফট পরিবর্তন সেভ থাকে",
    ],
    showcase: "editor",
  },
  {
    pillText: "AI চ্যাটবট",
    pillIcon: "/icons/chat.svg",
    titleStart: "স্মার্ট AI চ্যাটবট,",
    titleHighlight: "ইনস্ট্যান্ট সাহায্য",
    titleEnd: "",
    description:
      "Google Gemini powered AI-এর সাথে চ্যাট করুন। আপনার আসল প্রোডাক্ট, অর্ডার ও সেলস ডেটা বিশ্লেষণ করে ড্যাশবোর্ডের ভেতর থেকেই আপনাকে গাইড করবে।",
    bullets: [
      "দ্রুত ও নির্ভুল উত্তরের জন্য Google Gemini চালিত AI",
      "সহজ ভাষায় প্রোডাক্ট, অর্ডার ও সেলস নিয়ে প্রশ্ন করার সুবিধা",
      "আপনার নিজস্ব শপের আসল ডেটা থেকে উত্তর তৈরি হয়",
      "প্রোডাক্ট ও ক্যাটাগরি পরিবর্তনের সাজেস্ট করে",
      "অন্য কোনো থার্ড-পার্টি অ্যাপের প্রয়োজন নেই",
    ],
    showcase: "chat",
  },
  {
    pillText: "পেমেন্ট গেটওয়ে",
    pillIcon: "/icons/wallet.svg",
    titleStart: "পেমেন্ট সুবিধা,",
    titleHighlight: "সব এক জায়গায়",
    titleEnd: "",
    description:
      "COD, ম্যানুয়াল bKash/Nagad, অফিসিয়াল bKash, Nagad এবং SSLCommerz একসাথে কানেক্ট করুন এক ড্যাশবোর্ড থেকে।",
    bullets: [
      "ক্যাশ অন ডেলিভারি (COD) সার্ভিস",
      "ম্যানুয়াল bKash ও Nagad পেমেন্ট ট্রানজেকশন ID ভেরিফিকেশন সহ",
      "অফিসিয়াল bKash, Nagad ও SSLCommerz মার্চেন্ট অ্যাকাউন্ট ইন্টিগ্রেশন",
      "সহজ ও সেন্ট্রালাইজড পেমেন্ট সেটআপ",
      "সম্পূর্ণ এনক্রিপ্টেড ও সুরক্ষিত ক্রেডেনশিয়াল",
    ],
    showcase: "payment",
  },
  {
    pillText: "SEO & ডোমেইন",
    pillIcon: "/icons/domain.svg",
    titleStart: "গুগল র‍্যাঙ্কিং এ এগিয়ে থাকুন,",
    titleHighlight: "নিজের কাস্টম ডোমেইন সহ",
    titleEnd: "",
    description:
      "সার্চ লিস্টিং, সোশ্যাল শেয়ার প্রিভিউ, ট্র্যাকিং পিক্সেল এবং কাস্টম ডোমেইন সেটআপ করুন খুব সহজেই।",
    bullets: [
      "টাইটেল, মেটা ডেসক্রিপশন, কিওয়ার্ড ও AI SEO সাহায্য",
      "ফেসবুক ও চ্যাট প্রিভিউয়ের জন্য Open Graph সাপোর্ট",
      "সাইটম্যাপ, গুগল অ্যানালিটিক্স ও সার্চ কনসোল কানেক্ট",
      "Meta Pixel, TikTok Pixel, Google Tag Manager ও Conversions API (CAPI)",
      "আলাদা হোস্টিং ছাড়াই নিজস্ব কাস্টম ডোমেইন কানেক্ট করার সুবিধা",
    ],
    showcase: "seo",
  },
  {
    pillText: "AI রাইটিং",
    pillIcon: "/icons/ai-pencil.svg",
    titleStart: "প্রোডাক্ট ডেসক্রিপশন,",
    titleHighlight: "এক ক্লিকে",
    titleEnd: "",
    description:
      "এক ক্লিকে আকর্ষণীয় প্রোডাক্ট কপি তৈরি করুন এবং যেকোনো সময় মনের মতো না হওয়া পর্যন্ত জেনারেট করুন।",
    bullets: [
      "এক ক্লিকে AI দিয়ে প্রোডাক্ট ডেসক্রিপশন তৈরি",
      "পছন্দমতো ডেসক্রিপশন রি-জেনারেট করার অপশন",
      "সেভ করার আগে ড্রাফট সম্পূর্ণ এডিট করার সুবিধা",
      "সঠিক কপির জন্য প্রোডাক্ট ডিটেইলস কনটেক্সট ব্যবহার",
      "Softunebd প্রোডাক্ট এডিটর থেকেই সরাসরি কাজ করে",
    ],
    showcase: "ai",
  },
  {
    pillText: "স্টোর সেল POS",
    pillIcon: "/icons/cart.svg",
    titleStart: "শপে সরাসরি বিক্রি করুন,",
    titleHighlight: "একই ক্যাটালগ দিয়ে",
    titleEnd: "",
    description:
      "আপনার অনলাইন ক্যাটালগ থেকেই সরাসরি দোকানে ইন-পার্সন কাস্টমারদের বিক্রি করুন, রসিদ প্রিন্ট করুন এবং ক্যাশ/মোবাইল পেমেন্ট গ্রহণ করুন।",
    bullets: [
      "অনলাইন স্টোরের সাথে ইনস্ট্যান্ট সিঙ্কড স্টোর স্টক",
      "ক্যাটাগরি ফিল্টার ও কুইক সার্চ বার",
      "ক্যাশ, কার্ড বা মোবাইল ব্যাংকিং পেমেন্ট রেকর্ড",
      "ডেট, টাইম ও টোটাল সহ পোর্টেবল রসিদ প্রিন্ট অপশন",
      "সাম্প্রতিক সব কাস্টমার সেলসের বিস্তারিত হিস্ট্রি",
    ],
    showcase: "pos",
  },
];

export const sections = sectionsEn;

const CheckIcon = () => (
  <svg className="mt-0.5 size-6 shrink-0 text-[var(--color-brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export function PlatformFeatures({ locale = "en" }: { locale?: "en" | "bn" }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isDark = !mounted || resolvedTheme === "dark";
  const activeSections = locale === "bn" ? sectionsBn : sectionsEn;

  return (
    <section className="overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-canvas)] py-14 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="flex flex-col gap-14 md:gap-40">
          {activeSections.map((section, index) => {
            const isImageRight = index % 2 === 0;
            const liteSrc = `/showcase/${section.showcase}-l.webp`;
            const darkSrc = `/showcase/${section.showcase}-d.webp`;
            const usePlaceholder = Boolean(section.placeholderColor);

            return (
              <div
                key={section.showcase}
                className={`flex flex-col items-center gap-8 md:gap-12 lg:gap-20 ${
                  isImageRight ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="w-full flex-1 space-y-6 md:space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:gap-3 md:p-1.5 md:pr-4">
                      <div className="relative flex size-5 items-center justify-center rounded-full bg-[var(--color-brand)]/10 md:size-6">
                        <span
                          className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                          style={{ animationDuration: "2s" }}
                        />
                        <img
                          loading="lazy"
                          decoding="async"
                          src={section.pillIcon}
                          alt=""
                          className="relative z-10 size-3 object-contain md:size-3.5 dark:invert"
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
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-[15px] leading-relaxed font-medium text-[var(--color-ink-soft)] sm:text-[16px]">
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
                  className="w-full flex-1"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)] shadow-lg sm:rounded-[24px] md:rounded-[32px]">
                    {usePlaceholder ? (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ backgroundColor: section.placeholderColor }}
                      >
                        <span className="text-sm font-medium tracking-wide text-white/40 select-none">
                          Screenshot coming soon
                        </span>
                      </div>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={isDark ? darkSrc : liteSrc}
                        alt={`${section.pillText} in the Softunebd dashboard`}
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={800}
                        className="absolute inset-0 size-full object-cover"
                      />
                    )}
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
