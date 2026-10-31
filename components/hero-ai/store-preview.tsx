"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { MaskIcon } from "@/components/ui/mask-icon";
import { SelectionFrame } from "./selection-frame";
import type { ScenarioId } from "./scenarios";

type Locale = "en" | "bn";
const EASE = [0.16, 1, 0.3, 1] as const;

/** The demo store, drawn in code rather than a screenshot so every part of it
 * can react to the AI: sections assemble, the headline rewrites, the palette
 * warms, the hero art develops. Everything is sized in container units (cqw),
 * so the whole storefront scales as one piece with the window. */

const PALETTES = {
  base: { bg: "#fbf6f1", soft: "#f3e4da", ink: "#2a1c17", muted: "#8a7067", accent: "#b4533f", accent2: "#e9bba6" },
  warm: { bg: "#fdf6ea", soft: "#f6e3c2", ink: "#2b1d0e", muted: "#8a6f4e", accent: "#b8641a", accent2: "#f0c27b" },
};
type Palette = (typeof PALETTES)["base"];

const PRODUCTS = [
  { name: "Linen Kurti", price: "৳1,450", initial: "L", tone: ["#efd5c7", "#d99b83"] },
  { name: "Silk Saree", price: "৳4,800", initial: "S", tone: ["#f3dfc2", "#c9935a"] },
  { name: "Cotton Set", price: "৳2,250", initial: "C", tone: ["#e5d9cf", "#a98b7c"] },
  { name: "Block Print Dupatta", price: "৳890", initial: "B", tone: ["#f0d0c4", "#b4533f"] },
];
const CATEGORIES = ["Sarees", "Kurtis", "Three-piece", "Dupattas", "New in"];

export function StorePreview({
  id,
  sent,
  done,
  total,
  locale,
}: {
  id: ScenarioId;
  sent: boolean;
  done: number;
  total: number;
  locale: Locale;
}) {
  const isBn = locale === "bn";
  const step = sent ? done : -1; // -1 = prompt not sent yet
  const finished = sent && done >= total;

  // Which parts of the store exist yet. Only the "store" scenario builds from
  // nothing; the others start from the finished store.
  const building = id === "store";
  const has = {
    nav: !building || step >= 1,
    hero: !building || step >= 2,
    catalog: !building || step >= 3,
  };
  const activeSection = !building || !sent || finished ? null : (["nav", "hero", "catalog"] as const)[done];

  const p = id === "agent" && step >= 2 ? PALETTES.warm : PALETTES.base;
  const eid = id === "agent" && step >= 1;
  const generated = id === "image" && step >= 2;
  const generating = id === "image" && step === 1;

  return (
    <div className="@container absolute inset-0 overflow-hidden" style={{ backgroundColor: p.bg, transition: "background-color 900ms ease" }}>
      {building && !finished ? <Blueprint locale={locale} has={has} /> : null}

      {/* Nav */}
      <Section show={has.nav} active={activeSection === "nav"} label={isBn ? "ব্র্যান্ড ও থিম" : "Brand and theme"} className="flex h-[7cqw] items-center justify-between border-b px-[4cqw]" style={{ borderColor: p.soft }}>
        <span className="text-[2.6cqw] leading-none font-bold" style={{ fontFamily: "var(--font-instrument), serif", color: p.ink }}>
          Veila
        </span>
        <span className="flex gap-[2.4cqw] text-[1.15cqw] font-medium" style={{ color: p.muted }}>
          <span>New in</span>
          <span>Sarees</span>
          <span>Kurtis</span>
          <span style={{ color: p.accent }}>Sale</span>
        </span>
        <span className="flex items-center gap-[1.4cqw]" style={{ color: p.ink }}>
          <span className="h-[2.6cqw] w-[11cqw] rounded-full" style={{ backgroundColor: p.soft }} />
          <MaskIcon src="/icons/shop-bag.svg" className="size-[2cqw]" />
        </span>
      </Section>

      {/* Hero */}
      <Section show={has.hero} active={activeSection === "hero"} label={isBn ? "হোমপেজের লেখা" : "Homepage copy"} className="grid h-[31cqw] grid-cols-[1.05fr_1fr] gap-[3cqw] px-[4cqw] py-[3cqw]">
        <div className="relative flex flex-col justify-center">
          <span className="mb-[1.2cqw] text-[1.05cqw] font-semibold tracking-[0.12em] uppercase transition-colors duration-700" style={{ color: p.accent }}>
            {eid ? "Eid Collection 2026" : "New season"}
          </span>
          <span className="relative">
            <AnimatePresence mode="wait">
              <motion.span
                key={eid ? "eid" : "base"}
                initial={{ opacity: 0, y: "0.3em", filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: "-0.3em", filter: "blur(8px)" }}
                transition={{ duration: 0.55, ease: EASE }}
                className="block text-[4.6cqw] leading-[0.98] font-bold tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-instrument), serif", color: p.ink }}
              >
                {eid ? "Celebrate Eid in style" : "Grace in every thread"}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence>
              {id === "agent" && sent && step === 0 ? (
                <SelectionFrame label={isBn ? "হেডলাইন" : "Headline"} className="-inset-[0.8cqw]" handleClassName="size-[6px]" />
              ) : null}
            </AnimatePresence>
          </span>
          <span className="mt-[1.4cqw] max-w-[34cqw] text-[1.25cqw] leading-relaxed" style={{ color: p.muted }}>
            Handpicked sarees, kurtis and three-piece sets, made for everyday elegance.
          </span>
          <span className="mt-[2cqw] flex gap-[1cqw]">
            <span className="rounded-full px-[2.2cqw] py-[1cqw] text-[1.15cqw] font-semibold text-white transition-colors duration-700" style={{ backgroundColor: p.accent }}>
              {eid ? "Shop Eid" : "Shop now"}
            </span>
            <span className="rounded-full border px-[2.2cqw] py-[1cqw] text-[1.15cqw] font-semibold transition-colors duration-700" style={{ borderColor: p.accent2, color: p.ink }}>
              Lookbook
            </span>
          </span>
        </div>

        <div className="relative">
          <div className="absolute inset-0 overflow-hidden rounded-[1.6cqw]">
            <AnimatePresence initial={false}>
              {generated ? (
                <motion.div key="gen" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                  <GeneratedArt />
                  <Diffusion resolve />
                </motion.div>
              ) : (
                <motion.div key="base" className="absolute inset-0" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <BaseArt p={p} />
                </motion.div>
              )}
            </AnimatePresence>
            {generating ? <Diffusion /> : null}
            {generated ? (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute top-[1.4cqw] left-[1.4cqw] flex items-center gap-[0.6cqw] rounded-full bg-black/45 px-[1.2cqw] py-[0.5cqw] text-[1cqw] font-semibold text-white backdrop-blur-md"
              >
                <MaskIcon src="/icons/ai.svg" className="size-[1.1cqw]" />
                {isBn ? "AI দিয়ে তৈরি" : "Made with AI"} · 2048×1152
              </motion.span>
            ) : null}
          </div>
          <AnimatePresence>
            {id === "image" && sent && !generated ? (
              <SelectionFrame label={isBn ? "হিরো ছবি" : "Hero image"} className="-inset-[0.6cqw]" handleClassName="size-[6px]" />
            ) : null}
          </AnimatePresence>
        </div>
      </Section>

      {/* Categories + products */}
      <Section show={has.catalog} active={activeSection === "catalog"} label={isBn ? "ক্যাটালগ" : "Catalog"} className="px-[4cqw] pt-[0.6cqw]">
        <div className="flex gap-[1cqw]">
          {CATEGORIES.map((c, i) => (
            <span key={c} className="flex items-center gap-[0.6cqw] rounded-full border px-[1.3cqw] py-[0.6cqw] text-[1.05cqw] font-medium transition-colors duration-700" style={{ borderColor: p.soft, color: p.ink, backgroundColor: i === 0 ? p.soft : "transparent" }}>
              {c}
            </span>
          ))}
        </div>
        <div className="mt-[1.8cqw] grid grid-cols-4 gap-[1.6cqw]">
          {PRODUCTS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={building ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
            >
              <div className="relative h-[13cqw] overflow-hidden rounded-[1.2cqw]" style={{ background: `linear-gradient(160deg, ${item.tone[0]}, ${item.tone[1]})` }}>
                <span className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1.2px)", backgroundSize: "1.2cqw 1.2cqw" }} />
                <span className="absolute -right-[0.6cqw] -bottom-[2.4cqw] text-[13cqw] leading-none font-bold text-white/55" style={{ fontFamily: "var(--font-instrument), serif" }}>
                  {item.initial}
                </span>
                {i === 0 ? <span className="absolute top-[0.9cqw] left-[0.9cqw] rounded-full bg-white/85 px-[0.9cqw] py-[0.25cqw] text-[0.9cqw] font-semibold" style={{ color: p.accent }}>New</span> : null}
              </div>
              <p className="mt-[0.8cqw] truncate text-[1.15cqw] font-semibold" style={{ color: p.ink }}>{item.name}</p>
              <p className="text-[1.1cqw] font-medium transition-colors duration-700" style={{ color: p.accent }}>{item.price}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <AnimatePresence>
        {finished && id !== "chatgpt" ? (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="absolute right-[2.4cqw] bottom-[2.4cqw] flex items-center gap-[1.2cqw] rounded-[1.2cqw] bg-[#17120f] py-[1cqw] pr-[1cqw] pl-[1.6cqw] text-[1.2cqw] font-medium text-white shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)]"
          >
            <span className="size-[1cqw] rounded-full bg-emerald-400" />
            {id === "store" ? (isBn ? "veila.softunebd.com পাবলিশের জন্য রেডি" : "veila.softunebd.com is ready") : isBn ? "স্টোরে লাইভ" : "Live on your store"}
            {id !== "store" ? <span className="rounded-[0.7cqw] bg-white/12 px-[1cqw] py-[0.4cqw] font-semibold">Undo</span> : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** A part of the store that fades in once built, and carries the selection
 * frame while the agent is working on it. */
function Section({
  show,
  active,
  label,
  className,
  style,
  children,
}: {
  show: boolean;
  active: boolean;
  label: string;
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <motion.div
        className={className}
        style={style}
        initial={false}
        animate={show ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(10px)", y: 10 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {children}
      </motion.div>
      <AnimatePresence>
        {active ? (
          <SelectionFrame label={label} className="inset-[0.6cqw]" handleClassName="size-[6px]" tagInside />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** The empty store before the prompt is sent: a faint blueprint of where each
 * part will go, so the window is never a blank rectangle. */
function Blueprint({ locale, has }: { locale: Locale; has: { nav: boolean; hero: boolean; catalog: boolean } }) {
  const isBn = locale === "bn";
  const box = "absolute rounded-[1cqw] border border-dashed border-[#c9b8ad] text-[1.1cqw] font-medium text-[#a8968b] flex items-center justify-center";
  return (
    <div aria-hidden className="absolute inset-0">
      {!has.nav ? <span className={box + " inset-x-[3cqw] top-[1.4cqw] h-[4.4cqw]"}>{isBn ? "নেভিগেশন" : "Navigation"}</span> : null}
      {!has.hero ? <span className={box + " top-[8.4cqw] left-[3cqw] h-[27cqw] w-[45cqw]"}>{isBn ? "হেডলাইন" : "Headline"}</span> : null}
      {!has.hero ? <span className={box + " top-[8.4cqw] right-[3cqw] h-[27cqw] w-[44cqw]"}>{isBn ? "হিরো ছবি" : "Hero image"}</span> : null}
      {!has.catalog ? <span className={box + " inset-x-[3cqw] top-[38cqw] bottom-[2cqw]"}>{isBn ? "প্রোডাক্ট" : "Products"}</span> : null}
    </div>
  );
}

/** Hero art for the base store: an arched window with a low sun, in the store's own palette. */
function BaseArt({ p }: { p: Palette }) {
  return (
    <div className="absolute inset-0 transition-[background] duration-700" style={{ background: `linear-gradient(170deg, ${p.soft}, ${p.accent2})` }}>
      <span className="absolute bottom-0 left-1/2 h-[82%] w-[58%] -translate-x-1/2 rounded-t-full transition-[background] duration-700" style={{ background: `linear-gradient(180deg, ${p.accent2}, ${p.accent})` }} />
      <span className="absolute top-[22%] left-1/2 size-[7cqw] -translate-x-1/2 rounded-full bg-[#fff4ea]/90 shadow-[0_0_6cqw_2cqw_rgba(255,236,214,0.7)]" />
      <span className="absolute inset-x-0 bottom-0 h-[22%]" style={{ background: `linear-gradient(180deg, transparent, ${p.ink}33)` }} />
      <span className="absolute top-[10%] right-[8%] rounded-full bg-white/80 px-[1cqw] py-[0.4cqw] text-[1cqw] font-semibold" style={{ color: p.accent }}>
        New season
      </span>
    </div>
  );
}

/** What the "AI" paints: a sunlit still life, long window shadows across a warm wall. */
function GeneratedArt() {
  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #ffd9a8 0%, #f4a46a 45%, #c2573a 100%)" }}>
      <span className="absolute inset-0 opacity-35" style={{ backgroundImage: "repeating-linear-gradient(115deg, transparent 0 3cqw, rgba(90,30,10,0.45) 3cqw 4.2cqw)" }} />
      <span className="absolute bottom-0 left-[10%] h-[30%] w-[80%] rounded-t-[1cqw] bg-[#7a2e1c]/70" />
      <span className="absolute bottom-[30%] left-[30%] h-[34%] w-[16%] rounded-t-full rounded-b-[1cqw] bg-gradient-to-b from-[#fbe3c4] to-[#e2a27a] shadow-[1cqw_1cqw_2cqw_rgba(80,25,10,0.35)]" />
      <span className="absolute bottom-[30%] left-[52%] h-[22%] w-[12%] rounded-full bg-gradient-to-b from-[#f7cfa3] to-[#cf7b52] shadow-[1cqw_1cqw_2cqw_rgba(80,25,10,0.35)]" />
      <span className="absolute top-[12%] right-[10%] size-[6cqw] rounded-full bg-[#fff1d6] shadow-[0_0_5cqw_2cqw_rgba(255,230,190,0.8)]" />
      <span className="absolute bottom-[6%] left-[6%] text-[3.4cqw] leading-none font-bold text-white/90" style={{ fontFamily: "var(--font-instrument), serif" }}>
        Everyday
      </span>
    </div>
  );
}

/** The image "developing": a grid of noisy tiles that flicker while the model
 * works, then dissolve in random order to reveal the art underneath. */
function Diffusion({ resolve = false }: { resolve?: boolean }) {
  const cells = useMemo(
    () => Array.from({ length: 12 * 7 }, (_, i) => ({ i, delay: Math.random(), hue: 18 + Math.random() * 22, light: 55 + Math.random() * 30 })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 grid grid-cols-12 grid-rows-7">
      {cells.map((c) => (
        <motion.span
          key={c.i}
          style={{ backgroundColor: `hsl(${c.hue} 70% ${c.light}%)` }}
          initial={{ opacity: 1 }}
          animate={resolve ? { opacity: 0 } : { opacity: [1, 0.55, 0.95, 0.7, 1] }}
          transition={
            resolve
              ? { delay: c.delay * 0.7, duration: 0.35, ease: "easeOut" }
              : { duration: 1.2 + c.delay, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}
    </div>
  );
}
