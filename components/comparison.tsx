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
    "softune": "An AI agent that carries out real store tasks",
    "others": "Check whether AI carries out tasks or drafts text",
    "parity": true
  },
  {
    "softune": "Change colors, fonts, and homepage text by conversation",
    "others": "Check how colors, fonts, and homepage text are changed",
    "parity": true
  },
  {
    "softune": "Create products, categories, and sale events through the agent",
    "others": "Check AI support for products, categories, and sale events",
    "parity": true
  },
  {
    "softune": "Generate product images and place them on your storefront",
    "others": "Check product image generation, storefront placement, and credit limits",
    "parity": true
  },
  {
    "softune": "Get Bangla or English answers from your store data",
    "others": "Check store data access and Bangla or English support",
    "parity": true
  },
  {
    "softune": "Undo supported changes and confirm sensitive actions before execution",
    "others": "Check change history, Undo support, and sensitive action confirmations",
    "parity": true
  },
  {
    "softune": "COD, local payments, courier connects, POS, and fraud protection",
    "others": "Compare payments, couriers, POS, and fraud protection by plan",
    "parity": true
  }
];

const rowsBn: Row[] = [
  {
    "softune": "স্টোরের বাস্তব কাজ করতে পারে এমন AI এজেন্ট",
    "others": "AI কাজ করে নাকি শুধু লেখা তৈরি করে দেখুন",
    "parity": true
  },
  {
    "softune": "কথা বলেই কালার, ফন্ট ও হোমপেজের লেখা বদলান",
    "others": "কালার, ফন্ট ও হোমপেজের লেখা কীভাবে বদলায় দেখুন",
    "parity": true
  },
  {
    "softune": "এজেন্ট দিয়ে প্রোডাক্ট, ক্যাটাগরি ও সেল ইভেন্ট তৈরি করুন",
    "others": "প্রোডাক্ট, ক্যাটাগরি ও সেল ইভেন্টে AI সাপোর্ট দেখুন",
    "parity": true
  },
  {
    "softune": "প্রোডাক্টের ছবি তৈরি করে স্টোরের সমর্থিত জায়গায় বসান",
    "others": "প্রোডাক্ট ইমেজ জেনারেশন, প্লেসমেন্ট ও ক্রেডিট লিমিট দেখুন",
    "parity": true
  },
  {
    "softune": "নিজের স্টোরের ডেটা থেকে বাংলা বা ইংরেজিতে উত্তর পান",
    "others": "স্টোরের ডেটা অ্যাক্সেস এবং বাংলা বা ইংরেজি সাপোর্ট দেখুন",
    "parity": true
  },
  {
    "softune": "সমর্থিত পরিবর্তনে Undo; সংবেদনশীল কাজে কনফার্মেশন",
    "others": "চেঞ্জ হিস্ট্রি, Undo ও সংবেদনশীল কাজে কনফার্মেশন দেখুন",
    "parity": true
  },
  {
    "softune": "COD, লোকাল পেমেন্ট, কুরিয়ার কানেক্ট, POS ও ফ্রড প্রোটেকশন",
    "others": "পেমেন্ট, কুরিয়ার, POS ও ফ্রড প্রোটেকশন প্ল্যান অনুযায়ী দেখুন",
    "parity": true
  }
];


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
              {isBn ? "স্টোর চালান AI-এর সাথে" : "Your store. Your AI agent."}
            </span>
          </motion.div>

          <h2 className="max-w-3xl text-3xl leading-[1.2] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.15] md:text-5xl">
            {isBn ? (
              <>
                স্টোর চলুক{" "}
                <span className="relative ml-0.5 inline-block px-2.5 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
                  <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)]" />
                  <em className="relative not-italic text-white">আপনার কথায়</em>
                </span>
              </>
            ) : (
              <>
                Your store,{" "}
                <span className="relative ml-0.5 inline-block px-2.5 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
                  <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)]" />
                  <em className="relative not-italic text-white">powered by action</em>
                </span>
              </>
            )}
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] sm:mt-6 sm:text-[17px] md:text-[18px]">
            {isBn
              ? "বাংলাদেশি ই-কমার্স বিল্ডার বাছাইয়ে শুধু ফিচার লিস্ট নয়, প্রতিদিনের কতটা কাজ AI-কে দিতে পারবেন দেখুন। SoftuneBD-এর এজেন্ট আপনার স্টোরের ডেটা বুঝে কাজ করে।"
              : "When choosing a Bangladeshi ecommerce builder, look beyond the feature list. SoftuneBD’s agent understands your store data and carries out everyday tasks."}
          </p>
        </div>

        <div className="grid items-stretch gap-4 md:grid-cols-2 md:gap-5">
          {/* SoftuneBD first on mobile; column 2 on desktop. */}
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
                  alt="SoftuneBD"
                  className="h-10 w-auto object-contain sm:h-12"
                />
                <p className="mt-4 max-w-[280px] text-[14px] leading-snug font-medium text-white/65">
                  {isBn
                    ? "বাংলা বা ইংরেজিতে বলেই ডিজাইন বদলান, প্রোডাক্ট যোগ করুন ও সেল তৈরি করুন।"
                    : "Ask in Bangla or English to change your design, add products, and create sales."}
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
                  {isBn ? "বাংলাদেশি ই-কমার্স বিল্ডারসমূহ" : "Bangladeshi ecommerce builders"}
                </p>
                <h3 className="text-xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-2xl">
                  {isBn ? "বেছে নেওয়ার আগে যা দেখবেন" : "What to compare before choosing"}
                </h3>
                <p className="mt-3 max-w-[280px] text-[14px] leading-snug font-medium text-[var(--color-muted)]">
                  {isBn ? "প্রতিটি বিল্ডারের বর্তমান সুবিধা ও প্ল্যান মিলিয়ে দেখুন।" : "Check each builder’s current capabilities and plans."}
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
                {isBn ? "SoftuneBD প্ল্যান দেখুন" : "See SoftuneBD plans"}
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
            {isBn
              ? "ফিচার ও ক্রেডিট প্ল্যান অনুযায়ী প্রযোজ্য। সমর্থিত পরিবর্তনে Undo আছে; সংবেদনশীল কাজে কনফার্মেশন লাগে।"
              : "Features and credits depend on your plan. Supported changes have Undo; sensitive actions require confirmation."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

