"use client";

import { motion } from "framer-motion";
import { Check, SquareArrowOutUpRight } from "lucide-react";
import { STORES } from "@/components/demo-stores";
import { SUGGESTED_DEMOS, t, type Locale } from "./signup-copy";
import { ErrorBox, Heading, PrimaryButton } from "./signup-ui";

/** All the live demo stores, as phone screenshots (most shoppers are on
 * phones). Picking one gives the new store that demo's theme, colour and
 * fonts (DEMO_LOOKS). */
export function DesignStep({
  locale,
  category,
  value,
  error,
  onSelect,
  onCreate,
}: {
  locale: Locale;
  category: string;
  value: string;
  error: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
}) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  const suggested = SUGGESTED_DEMOS[category] ?? [];
  const rank = (id: string) => (suggested.includes(id) ? suggested.indexOf(id) : suggested.length);
  const stores = [...STORES].sort((a, b) => rank(a.id) - rank(b.id));
  const picked = STORES.find((s) => s.id === value);
  // Named by what it sells: a demo store's own name means nothing to a new merchant.
  const label = (store: (typeof STORES)[number]) => (locale === "bn" ? store.nicheBn : store.niche);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (picked) onCreate();
      }}
      className="flex flex-1 flex-col"
    >
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 pb-10 sm:px-8">
        <Heading
          title={L("Pick your store design", "আপনার স্টোরের ডিজাইন বেছে নিন")}
          sub={L("Theme, colour and fonts. Your own name and products.", "থিম, রং ও ফন্ট। নাম ও পণ্য আপনার নিজের।")}
        />

        <div role="radiogroup" aria-label={L("Store design", "স্টোর ডিজাইন")} className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-5">
          {stores.map((store, i) => {
            const active = store.id === value;
            return (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.3 }}
                className="group flex min-w-0 flex-col"
              >
                <label className="relative block cursor-pointer">
                  <input type="radio" name="design" checked={active} onChange={() => onSelect(store.id)} className="peer sr-only" />
                  <span className="relative block">
                    {/* A phone frame around the screenshot; the ring marks the pick. */}
                    <span
                      className={`block rounded-[26px] bg-[#0b0b0d] p-[5px] transition-all duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-brand/40 ${
                        active
                          ? "shadow-[0_0_0_3px_var(--brand),0_26px_44px_-22px_rgba(255,90,54,0.85)]"
                          : "shadow-[0_16px_30px_-22px_rgba(0,0,0,0.6)] group-hover:-translate-y-1.5 group-hover:shadow-[0_26px_40px_-22px_rgba(0,0,0,0.6)]"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/demos/${store.id}-mobile.webp`}
                        alt=""
                        loading="lazy"
                        width={390}
                        height={844}
                        className="block aspect-[390/760] w-full rounded-[21px] bg-search-bg object-cover object-top"
                      />
                    </span>
                    {active ? (
                      <span className="absolute -top-2.5 -right-2.5 flex size-9 items-center justify-center rounded-full border-[3px] border-surface bg-brand text-white shadow-lg">
                        <Check aria-hidden className="size-4" strokeWidth={3.5} />
                      </span>
                    ) : null}
                    {suggested.includes(store.id) ? (
                      <span className="absolute bottom-3 left-1/2 max-w-[calc(100%-16px)] -translate-x-1/2 truncate rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-white shadow-lg">
                        {L("Suggested for you", "আপনার জন্য")}
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-3 block truncate text-center text-[14px] font-bold text-ink">{label(store)}</span>
                </label>
                <a
                  href={`https://${store.host}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={L(`View the ${label(store)} demo store (opens in a new tab)`, `${label(store)} ডেমো স্টোর দেখুন (নতুন ট্যাবে খুলবে)`)}
                  className="mx-auto mt-2.5 flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs font-bold text-ink transition-colors hover:border-ink/35 hover:bg-search-bg"
                >
                  {L("View store", "স্টোর দেখুন")}
                  <SquareArrowOutUpRight aria-hidden className="size-3" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="sticky bottom-0 z-20 border-t border-line bg-surface/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-4">
          {error ? (
            <ErrorBox message={error} />
          ) : (
            <p className="text-sm text-muted" aria-live="polite">
              {picked ? (
                <>
                  {L("Selected: ", "বেছে নিয়েছেন: ")}
                  <strong className="font-bold text-ink">{label(picked)}</strong>
                </>
              ) : (
                L("Select a design to continue", "চালিয়ে যেতে একটি ডিজাইন বেছে নিন")
              )}
            </p>
          )}
          <div className="w-full shrink-0 sm:w-72">
            <PrimaryButton disabled={!picked}>{L("Create my free store", "আমার ফ্রি স্টোর তৈরি করুন")}</PrimaryButton>
          </div>
        </div>
      </div>
    </form>
  );
}
