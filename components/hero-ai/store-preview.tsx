"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { MaskIcon } from "@/components/ui/mask-icon";
import { AiCursor } from "./ai-cursor";
import type { Scenario, Target } from "./scenarios";

type Locale = "en" | "bn";
const EASE = [0.16, 1, 0.3, 1] as const;

/** The demo store, drawn in code so every part reacts to the AI. The canvas is
 * laid out in container-width units (cqw): nav, hero, categories and products
 * each have a fixed rectangle, so the AI cursor and its selection box can fly
 * to exactly the part being worked on, at any window size. */

const PALETTES = {
  base: { bg: "#fbf6f1", soft: "#f3e4da", ink: "#2a1c17", muted: "#8a7067", accent: "#b4533f", accent2: "#e9bba6" },
  warm: { bg: "#fdf6ea", soft: "#f6e3c2", ink: "#2b1d0e", muted: "#8a6f4e", accent: "#b8641a", accent2: "#f0c27b" },
};
type Palette = (typeof PALETTES)["base"];

type Rect = { l: number; t: number; w: number; h: number };
const RECTS: Record<Exclude<Target, "orders" | "total">, Rect> = {
  nav: { l: 0, t: 0, w: 100, h: 6.5 },
  hero: { l: 2.5, t: 8.5, w: 47, h: 26 },
  heroArt: { l: 51.5, t: 8.5, w: 46, h: 26 },
  categories: { l: 2.5, t: 36.8, w: 95, h: 5.4 },
  products: { l: 2.5, t: 43.6, w: 95, h: 16.4 },
};
/** Where the cursor rests for each target (cqw). */
const CURSOR: Record<Target, [number, number]> = {
  nav: [30, 3],
  hero: [30, 22],
  heroArt: [76, 22],
  categories: [40, 39.5],
  products: [58, 52],
  orders: [20, 24],
  total: [20, 52],
};

const PRODUCTS = [
  { name: "Linen Kurti", price: "৳1,450", tone: ["#efd5c7", "#d99b83"] },
  { name: "Silk Saree", price: "৳4,800", tone: ["#f3dfc2", "#c9935a"] },
  { name: "Cotton Set", price: "৳2,250", tone: ["#e5d9cf", "#a98b7c"] },
  { name: "Block Print Dupatta", price: "৳890", tone: ["#f0d0c4", "#b4533f"] },
];
const CATEGORIES = ["Sarees", "Kurtis", "Three-piece", "Dupattas", "New in"];

export function StorePreview({ scenario, sent, done, locale }: { scenario: Scenario; sent: boolean; done: number; locale: Locale }) {
  const total = scenario.steps.length;
  const finished = sent && done >= total;
  const current = sent && !finished ? scenario.steps[done] : null;
  const target: Target = current?.target ?? (finished ? scenario.steps[total - 1].target : scenario.steps[0].target);
  const [cx, cy] = sent ? CURSOR[target] : [78, 50];
  const isBn = locale === "bn";
  const label = "SoftuneBD AI";

  if (scenario.id === "chatgpt") {
    return (
      <div className="@container absolute inset-0 overflow-hidden bg-[#fbf6f1]">
        <ChatSplit scenario={scenario} sent={sent} done={done} finished={finished} locale={locale} />
        <AiCursor x={cx} y={cy} working={!!current} label={label} />
      </div>
    );
  }

  const id = scenario.id;
  const building = id === "store";
  const step = sent ? done : -1;
  const has = {
    nav: !building || step >= 0,
    hero: !building || step >= 1,
    categories: !building || step >= 2,
    products: !building || step >= 3,
  };
  const p = id === "agent" && step >= 2 ? PALETTES.warm : PALETTES.base;
  const eid = id === "agent" && step >= 1;
  const eidTags = id === "agent" && step >= 3;
  const heroGenerating = id === "image" && sent && done === 0;
  const heroNew = id === "image" && done >= 1 && sent;
  const photosGenerating = id === "image" && sent && done === 1;
  const photosNew = id === "image" && done >= 2 && sent;

  return (
    <div className="@container absolute inset-0 overflow-hidden" style={{ backgroundColor: p.bg, transition: "background-color 900ms ease" }}>
      {/* The store build starts from a plain starter template, never a blank
          canvas; each Veila section fades in over its starter counterpart. */}
      {building ? <StarterStore /> : null}

      {/* Navbar */}
      <Part show={has.nav} delay={building ? 0.5 : 0} rect={RECTS.nav} cover={building ? p.bg : undefined}>
        <div className="flex h-full items-center justify-between border-b px-[3.5cqw]" style={{ borderColor: p.soft }}>
          <span className="text-[2.4cqw] leading-none font-bold" style={{ fontFamily: "var(--font-instrument), serif", color: p.ink }}>
            Veila
          </span>
          <span className="flex gap-[2.2cqw] text-[1.1cqw] font-medium" style={{ color: p.muted }}>
            <span>New in</span>
            <span>Sarees</span>
            <span>Kurtis</span>
            <span style={{ color: p.accent }}>Sale</span>
          </span>
          <span className="flex items-center gap-[1.4cqw]" style={{ color: p.ink }}>
            <span className="h-[2.4cqw] w-[10cqw] rounded-full" style={{ backgroundColor: p.soft }} />
            <MaskIcon src="/icons/shop-bag.svg" className="size-[1.9cqw]" />
          </span>
        </div>
      </Part>

      {/* Hero copy */}
      <Part show={has.hero} delay={building ? 0.5 : 0} rect={RECTS.hero} cover={building ? p.bg : undefined}>
        <div className="flex h-full flex-col justify-center">
          <span className="mb-[1.1cqw] text-[1cqw] font-semibold tracking-[0.12em] uppercase transition-colors duration-700" style={{ color: p.accent }}>
            {eid ? "Eid Collection 2026" : "New season"}
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={eid ? "eid" : "base"}
              initial={{ opacity: 0, y: "0.25em" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-0.25em" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="block text-[4.3cqw] leading-[1] font-bold tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-instrument), serif", color: p.ink }}
            >
              {eid ? "Celebrate Eid in style" : "Grace in every thread"}
            </motion.span>
          </AnimatePresence>
          <span className="mt-[1.3cqw] max-w-[34cqw] text-[1.2cqw] leading-relaxed" style={{ color: p.muted }}>
            Handpicked sarees, kurtis and three-piece sets, made for everyday elegance.
          </span>
          <span className="mt-[1.8cqw] flex gap-[1cqw]">
            <span className="rounded-full px-[2.1cqw] py-[0.95cqw] text-[1.1cqw] font-semibold text-white transition-colors duration-700" style={{ backgroundColor: p.accent }}>
              {eid ? "Shop Eid" : "Shop now"}
            </span>
            <span className="rounded-full border px-[2.1cqw] py-[0.95cqw] text-[1.1cqw] font-semibold transition-colors duration-700" style={{ borderColor: p.accent2, color: p.ink }}>
              Lookbook
            </span>
          </span>
        </div>
      </Part>

      {/* Hero art */}
      <Part show={has.hero} delay={building ? 0.5 : 0} rect={RECTS.heroArt} cover={building ? p.bg : undefined}>
        <div className="relative h-full overflow-hidden rounded-[1.4cqw]">
          <AnimatePresence initial={false}>
            {heroNew ? (
              <motion.div key="new" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                <GeneratedArt />
                <Diffusion resolve />
              </motion.div>
            ) : (
              <motion.div key="base" className="absolute inset-0" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <BaseArt p={p} />
              </motion.div>
            )}
          </AnimatePresence>
          {heroGenerating ? <Diffusion /> : null}
        </div>
      </Part>

      {/* Categories */}
      <Part show={has.categories} delay={building ? 0.5 : 0} rect={RECTS.categories} cover={building ? p.bg : undefined}>
        <div className="flex h-full items-center gap-[1cqw]">
          {CATEGORIES.map((c, i) => (
            <span key={c} className="rounded-full border px-[1.3cqw] py-[0.55cqw] text-[1cqw] font-medium transition-colors duration-700" style={{ borderColor: p.soft, color: p.ink, backgroundColor: i === 0 ? p.soft : "transparent" }}>
              {c}
            </span>
          ))}
        </div>
      </Part>

      {/* Products */}
      <Part show={has.products} delay={building ? 0.5 : 0} rect={RECTS.products} cover={building ? p.bg : undefined}>
        <div className="grid h-full grid-cols-4 gap-[1.6cqw]">
          {PRODUCTS.map((item, i) => (
            <div key={item.name} className="min-w-0">
              <div className="relative h-[11cqw] overflow-hidden rounded-[1.1cqw]" style={{ background: `linear-gradient(160deg, ${item.tone[0]}, ${item.tone[1]})` }}>
                <ProductArt photo={photosNew} index={i} tone={item.tone} />
                {photosGenerating ? <Diffusion /> : null}
                {i === 0 ? <span className="absolute top-[0.8cqw] left-[0.8cqw] rounded-full bg-white/85 px-[0.8cqw] py-[0.2cqw] text-[0.85cqw] font-semibold" style={{ color: p.accent }}>New</span> : null}
                {eidTags && i < 3 ? <span className="absolute top-[0.8cqw] right-[0.8cqw] rounded-full px-[0.8cqw] py-[0.2cqw] text-[0.85cqw] font-semibold text-white" style={{ backgroundColor: p.accent }}>Eid pick</span> : null}
              </div>
              <p className="mt-[0.6cqw] truncate text-[1.05cqw] font-semibold" style={{ color: p.ink }}>{item.name}</p>
              <p className="text-[1cqw] font-medium transition-colors duration-700" style={{ color: p.accent }}>{item.price}</p>
            </div>
          ))}
        </div>
      </Part>

      {/* The part the AI is working on */}
      {current && current.target !== "orders" && current.target !== "total" ? <WorkFrame rect={RECTS[current.target]} label={current.label[locale]} showLabel={current.target !== "nav"} /> : null}

      <AiCursor x={cx} y={cy} working={!!current} label={label} />
    </div>
  );
}

/** The generic starter template every new store begins as: neutral greys and
 * placeholder words, laid out in the same rectangles as the real store. */
function StarterStore() {
  const grey = "#d9d9d5";
  const ink = "#8b8b86";
  const box = (r: Rect): React.CSSProperties => ({ left: `${r.l}cqw`, top: `${r.t}cqw`, width: `${r.w}cqw`, height: `${r.h}cqw` });
  return (
    <div aria-hidden className="absolute inset-0 bg-[#f6f6f4]">
      <div className="absolute flex items-center justify-between border-b px-[3.5cqw]" style={{ ...box(RECTS.nav), borderColor: "#e6e6e2", color: ink }}>
        <span className="text-[2cqw] font-bold">Your Store</span>
        <span className="flex gap-[2.2cqw] text-[1.1cqw]"><span>Home</span><span>Shop</span><span>About</span></span>
        <span className="h-[2.4cqw] w-[8cqw] rounded-full" style={{ backgroundColor: grey }} />
      </div>
      <div className="absolute flex flex-col justify-center" style={{ ...box(RECTS.hero), color: ink }}>
        <span className="text-[3.6cqw] leading-[1.05] font-bold">Welcome to our store</span>
        <span className="mt-[1.3cqw] text-[1.2cqw]">Add a short description of your shop here.</span>
        <span className="mt-[1.8cqw] w-fit rounded-md px-[2.1cqw] py-[0.95cqw] text-[1.1cqw] font-semibold text-white" style={{ backgroundColor: "#b3b3ae" }}>Button</span>
      </div>
      <div className="absolute rounded-[1.4cqw]" style={{ ...box(RECTS.heroArt), backgroundColor: grey }} />
      <div className="absolute flex items-center gap-[1cqw]" style={{ ...box(RECTS.categories), color: ink }}>
        {["All", "Category", "Category", "Category"].map((c, i) => (
          <span key={i} className="rounded-full border px-[1.3cqw] py-[0.55cqw] text-[1cqw]" style={{ borderColor: "#e0e0dc" }}>{c}</span>
        ))}
      </div>
      <div className="absolute grid grid-cols-4 gap-[1.6cqw]" style={{ ...box(RECTS.products), color: ink }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-[11cqw] rounded-[1.1cqw]" style={{ backgroundColor: grey }} />
            <p className="mt-[0.6cqw] text-[1.05cqw] font-semibold">Product name</p>
            <p className="text-[1cqw]">৳0</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** A part of the store, pinned to its rectangle, fading in once built. */
function Part({ show, delay, rect, cover, children }: { show: boolean; delay: number; rect: Rect; cover?: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${rect.l}cqw`, top: `${rect.t}cqw`, width: `${rect.w}cqw`, height: `${rect.h}cqw`, backgroundColor: cover }}
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.55, delay: show ? delay : 0, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** One selection box that glides from part to part. */
function WorkFrame({ rect, label, showLabel }: { rect: Rect; label: string; showLabel: boolean }) {
  const handle = "absolute size-[6px] rounded-[2px] border-[1.5px] border-[#ff5a36] bg-white";
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-20 border-[1.5px] border-[#ff5a36]"
      initial={false}
      animate={{ left: `${rect.l - 0.5}cqw`, top: `${rect.t - 0.4}cqw`, width: `${rect.w + 1}cqw`, height: `${rect.h + 0.8}cqw` }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
    >
      <span className={handle + " -top-[4px] -left-[4px]"} />
      <span className={handle + " -top-[4px] -right-[4px]"} />
      <span className={handle + " -bottom-[4px] -left-[4px]"} />
      <span className={handle + " -right-[4px] -bottom-[4px]"} />
      {showLabel ? (
        <span className="absolute bottom-full left-[-1.5px] mb-[3px] rounded-[4px] bg-[#ff5a36] px-1.5 py-[1px] text-[11px] leading-[1.5] font-semibold whitespace-nowrap text-white">{label}</span>
      ) : null}
    </motion.div>
  );
}

function BaseArt({ p }: { p: Palette }) {
  return (
    <div className="absolute inset-0 transition-[background] duration-700" style={{ background: `linear-gradient(170deg, ${p.soft}, ${p.accent2})` }}>
      <span className="absolute bottom-0 left-1/2 h-[82%] w-[58%] -translate-x-1/2 rounded-t-full transition-[background] duration-700" style={{ background: `linear-gradient(180deg, ${p.accent2}, ${p.accent})` }} />
      <span className="absolute top-[22%] left-1/2 size-[6cqw] -translate-x-1/2 rounded-full bg-[#fff4ea]/90" />
      <span className="absolute inset-x-0 bottom-0 h-[22%]" style={{ background: `linear-gradient(180deg, transparent, ${p.ink}33)` }} />
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
      <span className="absolute top-[12%] right-[10%] size-[5cqw] rounded-full bg-[#fff1d6]" />
      <span className="absolute bottom-[6%] left-[6%] text-[3cqw] leading-none font-bold text-white/90" style={{ fontFamily: "var(--font-instrument), serif" }}>
        Everyday
      </span>
    </div>
  );
}

/** A product tile: a flat placeholder until the AI "shoots" it, then a lit
 * garment-on-a-backdrop look. */
function ProductArt({ photo, index, tone }: { photo: boolean; index: number; tone: string[] }) {
  if (!photo) {
    return <span className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1.2px)", backgroundSize: "1.1cqw 1.1cqw" }} />;
  }
  const shapes = ["rounded-t-[3cqw] rounded-b-[0.6cqw]", "rounded-[2cqw]", "rounded-t-[1.2cqw] rounded-b-[3cqw]", "rounded-full"];
  return (
    <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <span className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 30%, #fffaf3 0%, ${tone[0]} 55%, ${tone[1]} 130%)` }} />
      <span className={`absolute bottom-[10%] left-1/2 h-[62%] w-[46%] -translate-x-1/2 ${shapes[index]}`} style={{ background: `linear-gradient(180deg, ${tone[1]}, ${tone[0]} 160%)`, boxShadow: "0 1.4cqw 1.6cqw -0.6cqw rgba(60,25,10,0.35)" }} />
    </motion.div>
  );
}

/** The image "developing": tiles that shimmer while the model works, then
 * dissolve in random order to reveal the art underneath. */
function Diffusion({ resolve = false }: { resolve?: boolean }) {
  const cells = useMemo(() => Array.from({ length: 10 * 6 }, (_, i) => ({ i, delay: Math.random(), hue: 18 + Math.random() * 22, light: 60 + Math.random() * 25 })), []);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 grid grid-cols-10 grid-rows-6">
      {cells.map((c) => (
        <motion.span
          key={c.i}
          style={{ backgroundColor: `hsl(${c.hue} 70% ${c.light}%)` }}
          initial={{ opacity: 1 }}
          animate={resolve ? { opacity: 0 } : { opacity: [1, 0.6, 0.95, 1] }}
          transition={resolve ? { delay: c.delay * 0.6, duration: 0.35, ease: "easeOut" } : { duration: 1.4 + c.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const ORDERS = [
  { id: "#1042", name: "Nusrat J.", amount: "৳2,450" },
  { id: "#1041", name: "Tania A.", amount: "৳4,800" },
  { id: "#1040", name: "Mim R.", amount: "৳1,450" },
  { id: "#1039", name: "Sadia K.", amount: "৳890" },
  { id: "#1038", name: "Rima S.", amount: "৳3,200" },
  { id: "#1037", name: "Farhana H.", amount: "৳1,950" },
];
const WEEK = [38, 52, 44, 61, 57, 74, 88];
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

/** ChatGPT on the right, the merchant's orders on the left: a real split
 * screen, with the AI cursor reading the orders while ChatGPT works out the answer. */
function ChatSplit({ scenario, sent, done, finished, locale }: { scenario: Scenario; sent: boolean; done: number; finished: boolean; locale: Locale }) {
  const isBn = locale === "bn";
  const activeOrders = sent && done === 0;
  const activeTotal = sent && done === 1;
  return (
    <div className="absolute inset-0 grid grid-cols-2">
      <div className="relative border-r border-[#eadbd1] bg-[#fbf6f1] p-[2.2cqw]">
        <p className="text-[1.05cqw] font-semibold tracking-wide text-[#8a7067] uppercase">{isBn ? "Veila · অর্ডার" : "Veila · Orders"}</p>
        <p className="mt-[0.3cqw] mb-[1.6cqw] text-[1cqw] text-[#8a7067]">{isBn ? "এই সপ্তাহ" : "This week"}</p>
        <div className={["rounded-[1cqw] border bg-white transition-colors duration-500", activeOrders ? "border-[#ff5a36]" : "border-[#eadbd1]"].join(" ")}>
          {ORDERS.map((o, i) => (
            <div key={o.id} className={["flex items-center justify-between px-[1.4cqw] py-[1.1cqw] text-[1.15cqw] text-[#2a1c17]", i > 0 ? "border-t border-[#f1e6de]" : ""].join(" ")}>
              <span className="font-semibold">{o.id}</span>
              <span className="text-[#8a7067]">{o.name}</span>
              <span className="font-semibold">{o.amount}</span>
            </div>
          ))}
        </div>
        <div className={["mt-[1.4cqw] flex items-center justify-between rounded-[1cqw] border px-[1.4cqw] py-[1.2cqw] transition-colors duration-500", activeTotal || finished ? "border-[#ff5a36] bg-[#fff0ec]" : "border-[#eadbd1] bg-white"].join(" ")}>
          <span className="text-[1.1cqw] font-semibold text-[#2a1c17]">{isBn ? "মোট বিক্রি" : "Total sales"}</span>
          <span className="text-[1.7cqw] font-bold text-[#2a1c17] tabular-nums">৳48,600</span>
        </div>
      </div>

      <div className="flex flex-col gap-[1.4cqw] bg-white p-[2.2cqw]">
        <div className="flex items-center gap-[0.9cqw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/chatgpt-mark-dark.png" alt="" className="size-[2.4cqw]" />
          <span className="text-[1.5cqw] font-bold text-[#111]">ChatGPT</span>
        </div>
        {sent ? (
          <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="ml-auto max-w-[85%] rounded-[1.4cqw] bg-[#f2f2f2] px-[1.5cqw] py-[0.9cqw] text-[1.25cqw] text-[#111]">
            {scenario.prompt[locale]}
          </motion.p>
        ) : null}
        {finished ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="flex flex-col gap-[1.3cqw]">
            <p className="text-[1.25cqw] leading-relaxed text-[#333]">
              {isBn ? "এই সপ্তাহে ৩৭টি অর্ডারে ৳৪৮,৬০০ বিক্রি, গত সপ্তাহের চেয়ে ১৮% বেশি। সেরা বিক্রি: Silk Saree।" : "You made ৳48,600 from 37 orders this week, up 18% on last week. Best seller: Silk Saree."}
            </p>
            <div className="flex h-[9cqw] items-end gap-[0.9cqw]">
              {WEEK.map((h, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-[0.4cqw]">
                  <motion.span className={["w-full rounded-[0.5cqw]", i === WEEK.length - 1 ? "bg-[#ff5a36]" : "bg-[#ff5a36]/25"].join(" ")} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: EASE }} />
                  <span className="text-[0.95cqw] text-[#999]">{DAYS[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : sent ? (
          <span className="flex items-center gap-[0.6cqw] py-[0.6cqw]" aria-label="Thinking">
            {[0, 1, 2].map((i) => (
              <motion.span key={i} className="size-[0.9cqw] rounded-full bg-[#bbb]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }} />
            ))}
          </span>
        ) : null}

        <div className="mt-auto flex items-center gap-[1cqw] rounded-[1.6cqw] border border-[#e5e5e5] px-[1.4cqw] py-[1cqw]" aria-hidden>
          <span className="flex-1 text-[1.2cqw] text-[#9a9a9a]">{isBn ? "ChatGPT-কে মেসেজ করুন" : "Message ChatGPT"}</span>
          <span className="flex size-[2.6cqw] items-center justify-center rounded-full bg-[#111]">
            <svg viewBox="0 0 12 12" className="size-[1.2cqw]" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 10V2.5M2.8 5.5 6 2.3l3.2 3.2" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
