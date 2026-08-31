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

export const sections: FeatureSection[] = [
  {
    pillText: "Theme Editor",
    pillIcon: "/icons/color.svg",
    titleStart: "Design Your Store",
    titleHighlight: "Live",
    titleEnd: "",
    description:
      "Edit your storefront in Softune’s Theme Editor: change colors, fonts, sections, and copy, preview desktop and mobile, then publish when it looks right.",
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
    titleStart: "Ask Softune,",
    titleHighlight: "Get Answers",
    titleEnd: "",
    description:
      "Chat with Softune’s built-in AI, powered by Google Gemini. It reads your real products, orders, and sales, then helps you act without leaving the dashboard.",
    bullets: [
      "Powered by Google Gemini for clear, fast answers",
      "Ask about products, orders, and sales in plain language",
      "Answers come from your own Softune store data",
      "Propose product or category changes you still confirm",
      "Stay inside Softune — no extra AI app to open",
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
      "Softune Site Settings covers search listings, social share previews, tracking pixels, and your custom domain — so discovery and measurement live next to the store you publish.",
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
      "Works inside the Softune product editor you already use",
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
      "Softune POS is walk-in checkout on your live product catalog. Search, filter by category, complete the sale, print a receipt, and review recent POS orders.",
    bullets: [
      "Same Softune products and stock as your online store",
      "Category filters, compact product rows, and pagination",
      "Cash, card, or mobile banking labels on each sale",
      "Printable shop-style receipt with date, time, and totals",
      "Recent Sales list for walk-in (POS) orders",
    ],
    showcase: "pos",
  },
];

const CheckIcon = () => (
  <svg className="mt-0.5 size-6 shrink-0 text-[var(--color-brand)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export function PlatformFeatures() {
  // Same mounted-gate pattern as Hero: avoids a hydration mismatch (server
  // always renders the same theme) while still picking ONE image per
  // section instead of shipping both light+dark variants and hiding one
  // with CSS — that was fetching roughly double the bytes this section
  // needed for every visitor.
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <section className="overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-canvas)] py-14 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="flex flex-col gap-14 md:gap-40">
          {sections.map((section, index) => {
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
                        alt={`${section.pillText} in the Softune dashboard`}
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
