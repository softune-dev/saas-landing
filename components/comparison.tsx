"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { TRIAL_CTA_BN } from "@/lib/site";

type Row = {
  softune: string;
  others: string;
  parity?: boolean;
};

const rowsEn: Row[] = [
  {
    softune: "0% transaction fee, every plan",
    others: "Some take a cut of every order you sell",
  },
  {
    softune: "No setup fee, ever",
    others: "Some charge a one-time setup fee (e.g. ৳5,000)",
  },
  {
    softune: "AI assistant across products, categories & theme direction",
    others: "Rare, and usually just one narrow AI writing tool",
  },
  {
    softune: "Multiple real storefront themes + a live AI theme editor",
    others: "Usually one fixed theme per merchant",
  },
  {
    softune: "26 built-in add-ons, categorized by use case",
    others: "Limited or no add-on ecosystem",
  },
  {
    softune: "COD, bKash, Nagad, SSLCommerz & BD courier connects",
    others: "Standard here too, since most BD builders offer it",
    parity: true,
  },
];

const rowsBn: Row[] = [
  {
    softune: "সব প্ল্যানে 0% ট্রানজেকশন ফি",
    others: "অনেকে প্রতিটি বিক্রিতে পার্সেন্টেজ কেটে নেয়",
  },
  {
    softune: "কোনো ধরনের হিডেন বা সেটআপ ফি নেই",
    others: "অনেকে ওয়ান-টাইম সেটআপ ফি কাটে (যেমন ৳৫,০০০)",
  },
  {
    softune: "প্রোডাক্ট, ক্যাটাগরি ও থিম সাজাতে রিয়েল AI অ্যাসিস্ট্যান্ট",
    others: "খুবই সীমিত বা কেবল একটি ডেসক্রিপশন রাইটিং টুল",
  },
  {
    softune: "একাধিক রিয়েল স্টোরফ্রন্ট থিম + লাইভ AI থিম এডিটর",
    others: "সাধারণত মার্চেন্টের জন্য একটিই ফিক্সড থিম",
  },
  {
    softune: "২৬টি বিল্ট-ইন অ্যাড-অনস ও ফিচার",
    others: "সীমিত বা কোনো অ্যাড-অনস ইকোসিস্টেম নেই",
  },
  {
    softune: "COD, bKash, Nagad, SSLCommerz ও BD কুরিয়ার কানেক্ট",
    others: "এখানে সমতা, কারণ অধিকাংশ বিল্ডারে এই সুবিধা আছে",
    parity: true,
  },
];

const globalComparisonEn = {
  name: "Shopify",
  fact: "charges roughly 2.8%–3.0% per sale on top of its subscription",
};

export function Comparison({ locale = "en" }: { locale?: "en" | "bn" }) {
  const isBn = locale === "bn";
  const rows = isBn ? rowsBn : rowsEn;
  const signupHref = isBn ? "/bn/signup" : "/signup";

  return (
    <section
      id="comparison"
      className="border-b border-[var(--color-line)] bg-[var(--color-canvas)] py-14 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <div className="mx-auto mb-10 flex flex-col items-center text-center md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 pr-3 md:mb-6 md:gap-3 md:p-1.5 md:pr-4"
          >
            <div className="flex size-5 items-center justify-center rounded-full bg-[var(--color-brand)]/10 md:size-6">
              <img
                loading="lazy"
                decoding="async"
                src="/icons/zap.svg"
                alt=""
                className="size-3 object-contain md:size-3.5 dark:invert"
              />
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
              {isBn ? "Softunebd বনাম অন্যান্য লোকাল বিল্ডার" : "Softunebd vs Bangladeshi Builders"}
            </span>
          </motion.div>

          <h2 className="max-w-3xl text-3xl leading-[1.2] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.15] md:text-5xl">
            {isBn ? (
              <>
                কোনো হিডেন{" "}
                <span className="relative ml-0.5 inline-block px-2.5 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
                  <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)]" />
                  <em className="relative not-italic text-white">খরচ নেই</em>
                </span>
              </>
            ) : (
              <>
                No hidden{" "}
                <span className="relative ml-0.5 inline-block px-2.5 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
                  <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)]" />
                  <em className="relative not-italic text-white">costs</em>
                </span>
              </>
            )}
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] sm:mt-6 sm:text-[17px] md:text-[18px]">
            {isBn
              ? "বাংলাদেশের বেশিরভাগ স্টোর বিল্ডারে সেটআপ ফি, অর্ডারে অতিরিক্ত চার্জ বা হিডেন ফি থাকে। Softunebd-এ কোনো হিডেন ফি নেই।"
              : "Most Bangladeshi store builders charge extra somewhere: a setup fee, a cut of every order, or a paywalled feature. Softunebd doesn't."}
          </p>
        </div>

        <div className="grid items-stretch gap-4 md:grid-cols-2 md:gap-5">
          {/* Softunebd first on mobile; column 2 on desktop. */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.06 }}
            className="relative flex flex-col overflow-hidden rounded-xl border-2 border-[var(--color-brand)] md:col-start-2 md:row-start-1"
          >
            <div className="relative overflow-hidden border-b border-[var(--color-brand)] bg-[var(--color-ink)] px-5 py-6 sm:px-7 sm:py-7 dark:bg-[#0c0c0c]">
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 h-full w-3/4 opacity-90 [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_75%)]"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.18) 1.5px, transparent 1.5px)",
                  backgroundSize: "8px 8px",
                }}
              />
              <div className="relative z-10">
                <p className="mb-4 text-[11px] font-bold tracking-[0.14em] text-[var(--color-brand)] uppercase">
                  {isBn ? "সেরা পছন্দ" : "Recommended"}
                </p>
                <img
                  loading="lazy"
                  decoding="async"
                  src="/logo-white.png"
                  alt="Softunebd"
                  className="h-10 w-auto object-contain sm:h-12"
                />
                <p className="mt-4 max-w-[280px] text-[14px] leading-snug font-medium text-white/65">
                  {isBn
                    ? "কোনো ট্রানজেকশন ফি নেই, সেটআপ ফি নেই — সাথে বিল্ট-ইন AI অ্যাসিস্ট্যান্ট ও রেডি থিমসমূহ।"
                    : "No transaction fee, no setup fee, and a real AI assistant with storefront themes built in."}
                </p>
              </div>
            </div>

            <ul className="flex flex-1 flex-col bg-[var(--color-surface)]">
              {rows.map((row, i) => (
                <li
                  key={row.softune}
                  className={`flex items-start gap-3 px-5 py-3.5 sm:px-7 sm:py-4 ${
                    i < rows.length - 1
                      ? "border-b border-[var(--color-line)]"
                      : ""
                  }`}
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-[var(--color-brand)]"
                    strokeWidth={2.75}
                  />
                  <span className="text-[14px] leading-snug font-semibold text-[var(--color-ink)] sm:text-[15px]">
                    {row.softune}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)] p-5 sm:p-7">
              <Button
                as="a"
                href={signupHref}
                variant="primary"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg py-3.5 text-[14px] font-bold"
              >
                {isBn ? TRIAL_CTA_BN : "Start Free"}
                <img
                  loading="lazy"
                  decoding="async"
                  src="/icons/arrow-right.svg"
                  alt=""
                  className="size-4 object-contain brightness-0 invert"
                />
              </Button>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] md:col-start-1 md:row-start-1"
          >
            <div
              className="relative overflow-hidden border-b border-[var(--color-line)] px-5 py-6 sm:px-7 sm:py-7"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-ink) 6%, var(--color-surface))",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 h-full w-[85%] opacity-100 [mask-image:radial-gradient(circle_at_top_right,black_10%,transparent_78%)]"
                style={{
                  backgroundImage:
                    "radial-gradient(color-mix(in srgb, var(--color-ink) 22%, transparent) 1.5px, transparent 1.5px)",
                  backgroundSize: "8px 8px",
                }}
              />
              <div className="relative z-10">
                <p className="mb-3 text-[11px] font-bold tracking-[0.14em] text-[var(--color-muted)] uppercase">
                  {isBn ? "সাধারণ লোকাল বিল্ডারসমূহ" : "Typical BD builders"}
                </p>
                <h3 className="text-xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-2xl">
                  {isBn ? "অন্যান্য স্থানে যা পাবেন" : "What you'll find elsewhere"}
                </h3>
                <p className="mt-3 max-w-[280px] text-[14px] leading-snug font-medium text-[var(--color-muted)]">
                  {isBn ? "সাধারণত খরচ বেশি এবং সুবিধা কম।" : "Usually costs more and does less."}
                </p>
              </div>
            </div>

            <ul className="flex flex-1 flex-col bg-[var(--color-surface)]">
              {rows.map((row, i) => (
                <li
                  key={row.others}
                  className={`flex items-start gap-3 px-5 py-3.5 sm:px-7 sm:py-4 ${
                    i < rows.length - 1
                      ? "border-b border-[var(--color-line)]"
                      : ""
                  }`}
                >
                  {row.parity ? (
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-[var(--color-muted-soft)]"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <X
                      className="mt-0.5 size-4 shrink-0 text-[var(--color-muted-soft)]"
                      strokeWidth={2.5}
                    />
                  )}
                  <span className="text-[14px] leading-snug font-medium text-[var(--color-muted)] sm:text-[15px]">
                    {row.others}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)] p-5 sm:p-7">
              <Button
                as="a"
                href={isBn ? "/bn/pricing" : "/pricing"}
                variant="secondary"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg py-3.5 text-[14px] font-bold"
              >
                {isBn ? "Softunebd প্ল্যান দেখুন" : "See Softunebd plans"}
                <img
                  loading="lazy"
                  decoding="async"
                  src="/icons/arrow-right.svg"
                  alt=""
                  className="size-4 object-contain opacity-60 dark:invert"
                />
              </Button>
            </div>
          </motion.article>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-1.5 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-6 py-5 text-center sm:mt-8"
        >
          <p className="text-[14px] leading-relaxed font-medium text-[var(--color-muted)] sm:text-[15px]">
            {isBn ? (
              <>
                গ্লোবাল প্ল্যাটফর্মের সাথে তুলনা করছেন?{" "}
                <span className="font-semibold text-[var(--color-ink)]">
                  Shopify
                </span>{" "}
                প্রতি বিক্রিতে প্রায় ২.৮%–৩.০% অতিরিক্ত ফি নেয়। Softunebd-এ সব প্ল্যানে ট্রানজেকশন ফি 0%।
              </>
            ) : (
              <>
                Comparing to a global platform instead?{" "}
                <span className="font-semibold text-[var(--color-ink)]">
                  {globalComparisonEn.name}
                </span>{" "}
                {globalComparisonEn.fact}. Softunebd&apos;s is 0%, on every plan.
              </>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
