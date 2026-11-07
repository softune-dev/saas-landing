"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { DASHBOARD_URL } from "@/lib/site";
import { t, type Locale } from "./agent-copy";
import { BRAND_GRADIENT } from "./agent-ui";

// Loaded after first paint, as on the hero: decoration never delays the page.
const Grainient = dynamic(() => import("@/components/ui/grainient"), { ssr: false });
// The hero's palette, pulled down to a soft dark: same warm hue and the same
// moving grain, but the bottom stops at deep ember brown instead of bright
// orange, so white text stays readable on every part of a long form.
const HERO_COLORS = ["#0c0b0e", "#0e0c0f", "#141011", "#1c1211", "#2a1812", "#3a2016"];


/**
 * The page around the conversation: a dark canvas lit from below like the
 * landing hero (so clicking "Generate store" feels like stepping further
 * into the same place, not onto a separate signup page), the chat on the
 * left, and the live store on the right. Phones get the store as a sheet
 * behind a header button.
 *
 * The `dark` class flips the site's colour tokens for the few shared pieces
 * inside (OTP boxes, password meter) that style themselves with tokens.
 */
export function AgentShell({
  locale,
  isPreview,
  progress,
  showSignIn,
  showPanel,
  panel,
  thumb,
  autoScrollKey,
  children,
}: {
  locale: Locale;
  isPreview: boolean;
  progress: number;
  showSignIn: boolean;
  showPanel: boolean;
  panel: ReactNode;
  thumb: string;
  autoScrollKey: string;
  children: ReactNode;
}) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  const [sheet, setSheet] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const pinned = useRef(true);

  // Stick to the bottom while the agent streams, unless the reader has
  // scrolled up to look at something: then leave them where they are.
  useEffect(() => {
    const onScroll = () => {
      const gap = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      pinned.current = gap < 220;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const el = chatRef.current;
    const ro = el
      ? new ResizeObserver(() => {
          if (pinned.current) window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
        })
      : null;
    if (el && ro) ro.observe(el);
    return () => {
      window.removeEventListener("scroll", onScroll);
      ro?.disconnect();
    };
  }, []);

  // Each new question re-pins: the answer just sent was at the bottom.
  useEffect(() => {
    pinned.current = true;
  }, [autoScrollKey]);

  return (
    <div className="dark relative isolate min-h-dvh bg-[#0c0b0e] text-white">
      {/* The landing hero's own background (same colours and Grainient
          settings as hero.tsx), fixed behind the page, so "Generate store"
          leads into the same place. The static gradient shows until the
          canvas loads. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ background: `linear-gradient(180deg, ${HERO_COLORS[0]} 0%, ${HERO_COLORS[1]} 32%, ${HERO_COLORS[2]} 50%, ${HERO_COLORS[3]} 68%, ${HERO_COLORS[4]} 86%, ${HERO_COLORS[5]} 100%)` }}
      >
        <Grainient
          colors={HERO_COLORS}
          angle={180}
          flow={0.6}
          silk={0.2}
          grainAmount={0.05}
          saturation={0.8}
          interactive={false}
          clickSwirl={false}
          intro={false}
          className="absolute inset-0"
        />
      </div>

      {isPreview ? (
        <div className="bg-amber-500 px-4 py-1.5 text-center text-xs font-semibold text-black">
          {L("Preview mode: no account will be created", "প্রিভিউ মোড: কোনো একাউন্ট তৈরি হবে না")}
        </div>
      ) : null}

      <header className="sticky top-0 z-30 bg-[#09080b]/75 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4">
          <a href={locale === "bn" ? "/bn" : "/"} className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.png" alt="SoftuneBD" className="h-7 w-auto" />
          </a>
          <div className="flex items-center gap-2">
            {showPanel ? (
              <button
                type="button"
                onClick={() => setSheet(true)}
                className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] py-1 pr-3 pl-1 text-[13px] font-semibold text-white lg:hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb} alt="" className="size-6 rounded-full object-cover object-top" />
                {L("Preview", "প্রিভিউ")}
              </button>
            ) : null}
            {showSignIn ? (
              <a href={DASHBOARD_URL} className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/55 transition-colors hover:text-white">
                {L("Sign in", "সাইন ইন")}
              </a>
            ) : null}
          </div>
        </div>
        <div className="h-[2px] w-full bg-white/[0.06]">
          <div
            className="h-full transition-[width] duration-700 ease-out"
            style={{ width: `${Math.max(3, progress * 100)}%`, background: BRAND_GRADIENT }}
          />
        </div>
      </header>

      <div
        className={[
          "mx-auto w-full px-4",
          showPanel ? "max-w-6xl lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_440px]" : "max-w-3xl",
        ].join(" ")}
      >
        <div ref={chatRef} className="mx-auto flex min-h-[calc(100dvh-3.5rem)] w-full max-w-[640px] flex-col">
          {children}
        </div>
        {showPanel ? (
          <aside className="hidden lg:block">
            <div className="sticky top-20 flex flex-col gap-4 py-6">{panel}</div>
          </aside>
        ) : null}
      </div>

      <AnimatePresence>
        {sheet ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end bg-black/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSheet(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={L("Store preview", "স্টোর প্রিভিউ")}
              className="max-h-[90dvh] w-full overflow-y-auto rounded-t-[28px] border-t border-white/10 bg-[#0a0a0a] px-4 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="mx-auto h-1 w-10 rounded-full bg-white/20" aria-hidden />
              </div>
              <div className="flex flex-col gap-4">{panel}</div>
              <button
                type="button"
                onClick={() => setSheet(false)}
                className="mt-4 h-12 w-full rounded-2xl bg-white/[0.08] text-[15px] font-semibold text-white"
              >
                {L("Back to chat", "চ্যাটে ফিরুন")}
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
