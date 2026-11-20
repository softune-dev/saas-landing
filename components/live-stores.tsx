"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { PhoneShot, STORES } from "./demo-stores";

/** Home page strip of the real demo stores: a grid of phone-only cards, each
 * opening the live store, and a button through to the full /demo page. */
export function LiveStores({ locale = "en" }: { locale?: "en" | "bn" }) {
  const isBn = locale === "bn";
  return (
    <section id="live-stores" className="mx-auto max-w-[1400px] px-4 py-14 sm:px-5 md:px-8 md:py-20">
      <div className="mx-auto flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-4 inline-flex rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-1.5 text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]"
        >
          {isBn ? "লাইভ ডেমো স্টোর" : "Live demo stores"}
        </motion.span>
        <h2 className="max-w-3xl text-3xl leading-[1.15] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.1] md:text-6xl">
          {isBn ? "আসল স্টোর, " : "Real stores, "}
          <span className="relative ml-0.5 inline-block px-3 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
            <span className="absolute inset-0 top-1.5 -rotate-1 rounded-xl bg-[var(--color-brand)] shadow-sm sm:top-2" />
            <em className="relative not-italic text-white">{isBn ? "খুলে দেখুন" : "open them now"}</em>
          </span>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed font-medium text-[var(--color-muted)] sm:mt-5 sm:text-base">
          {isBn
            ? "SoftuneBD দিয়ে বানানো ১০টি স্টোর, যেকোনোটি খুলে ঘুরে দেখুন।"
            : "Ten stores built with SoftuneBD, on mobile. Open any of them and shop around."}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-2 sm:gap-3 md:mt-14 md:grid-cols-3 lg:grid-cols-5">
        {STORES.map((s) => (
          <a
            key={s.id}
            href={`https://${s.host}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-2xl bg-[var(--color-surface)] p-1.5 ring-1 ring-[var(--color-line)] transition-shadow hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.35)] sm:rounded-3xl sm:p-2"
          >
            <PhoneShot id={s.id} name={s.name} />
            <div className="flex items-center justify-between gap-2 px-1 pb-0.5">
              <div className="min-w-0">
                <h3 className="truncate text-[14px] font-bold text-[var(--color-ink)] sm:text-[15px]">{s.name}</h3>
                <p className="mt-0.5 truncate text-[12px] text-[var(--color-muted)] sm:text-[13px]">{isBn ? s.nicheBn : s.niche}</p>
              </div>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-canvas)] transition-transform group-hover:scale-105">
                <ArrowUpRight className="size-4" strokeWidth={2.2} />
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          href={isBn ? "/bn/demo" : "/demo"}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
        >
          {isBn ? "সব ডেমো দেখুন" : "See all demos"}
          <ArrowUpRight className="size-4" strokeWidth={2.2} />
        </Link>
      </div>
    </section>
  );
}
