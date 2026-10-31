"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MaskIcon } from "@/components/ui/mask-icon";
import { AiCursor } from "./ai-cursor";
import { Diffusion, Part, Placeholder, WorkFrame } from "./canvas-parts";
import { CATEGORIES, COPY, DESKTOP, DESKTOP_CURSOR, IMAGES, PALETTES, PRODUCTS, type Locale, type Rect } from "./store-data";
import type { Scenario } from "./scenarios";

const EASE = [0.16, 1, 0.3, 1] as const;
const serif = (isBn: boolean) => (isBn ? "var(--font-bn), serif" : "var(--font-instrument), serif");

export type StageState = { scenario: Scenario; sent: boolean; done: number; locale: Locale };

/** The demo store at desktop width, laid out in container units (cqw) so the AI
 * cursor and its selection box can fly to exactly the part being worked on. */
export function StoreDesktop({ scenario, sent, done, locale }: StageState) {
  const isBn = locale === "bn";
  const total = scenario.steps.length;
  const finished = sent && done >= total;
  const current = sent && !finished ? scenario.steps[done] : null;
  const target = current?.target ?? (finished ? scenario.steps[total - 1].target : scenario.steps[0].target);
  const [cx, cy] = sent ? DESKTOP_CURSOR[target] : [78, 55];
  const id = scenario.id;

  const building = id === "store";
  const step = sent ? done : -1;
  const has = { nav: !building || step >= 0, hero: !building || step >= 1, categories: !building || step >= 2, products: !building || step >= 3 };
  const warm = id === "agent" && step >= 2;
  const p = warm ? PALETTES.warm : PALETTES.base;
  const eid = id === "agent" && step >= 1;
  const eidTags = id === "agent" && step >= 3;
  const heroGenerating = id === "image" && sent && done === 0;
  const heroNew = id === "image" && sent && done >= 1;
  const photosGenerating = id === "image" && sent && done === 1;
  const photosNew = !(id === "image") || (sent && done >= 2);
  const warmFilter = warm ? "sepia(0.28) saturate(1.2)" : "none";
  const cover = building ? p.bg : undefined;
  const delay = building ? 0.5 : 0;

  if (id === "chatgpt") return <ChatSplitDesktop {...{ scenario, sent, done, locale, finished, current: !!current, cx, cy }} />;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: p.bg, transition: "background-color 900ms ease" }}>
      {building ? <StarterStore locale={locale} /> : null}

      <Part show={has.nav} delay={delay} rect={DESKTOP.nav} cover={cover}>
        <div className="flex h-full items-center justify-between border-b px-[3.5cqw]" style={{ borderColor: p.soft }}>
          <span className="text-[2.4cqw] leading-none font-bold" style={{ fontFamily: serif(isBn), color: p.ink }}>Veila</span>
          <span className="flex gap-[2.2cqw] text-[1.1cqw] font-medium" style={{ color: p.muted }}>
            {COPY.nav.map((n, i) => (
              <span key={i} style={i === COPY.nav.length - 1 ? { color: p.accent } : undefined}>{n[locale]}</span>
            ))}
          </span>
          <span className="flex items-center gap-[1.4cqw]" style={{ color: p.ink }}>
            <span className="h-[2.4cqw] w-[10cqw] rounded-full" style={{ backgroundColor: p.soft }} />
            <MaskIcon src="/icons/shop-bag.svg" className="size-[1.9cqw]" />
          </span>
        </div>
      </Part>

      <Part show={has.hero} delay={delay} rect={DESKTOP.hero} cover={cover}>
        <div className="flex h-full flex-col justify-center">
          <span className="mb-[1.1cqw] text-[1cqw] font-semibold tracking-[0.12em] uppercase transition-colors duration-700" style={{ color: p.accent }}>
            {eid ? COPY.seasonEid[locale] : COPY.season[locale]}
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={(eid ? "eid" : "base") + locale}
              initial={{ opacity: 0, y: "0.25em" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-0.25em" }}
              transition={{ duration: 0.45, ease: EASE }}
              className={["block font-bold tracking-[-0.01em]", isBn ? "text-[3.7cqw] leading-[1.15]" : "text-[4.3cqw] leading-[1]"].join(" ")}
              style={{ fontFamily: serif(isBn), color: p.ink }}
            >
              {eid ? COPY.headlineEid[locale] : COPY.headline[locale]}
            </motion.span>
          </AnimatePresence>
          <span className="mt-[1.3cqw] max-w-[34cqw] text-[1.2cqw] leading-relaxed" style={{ color: p.muted }}>{COPY.sub[locale]}</span>
          <span className="mt-[1.8cqw] flex gap-[1cqw]">
            <span className="rounded-full px-[2.1cqw] py-[0.95cqw] text-[1.1cqw] font-semibold text-white transition-colors duration-700" style={{ backgroundColor: p.accent }}>{eid ? COPY.shopEid[locale] : COPY.shop[locale]}</span>
            <span className="rounded-full border px-[2.1cqw] py-[0.95cqw] text-[1.1cqw] font-semibold transition-colors duration-700" style={{ borderColor: p.accent2, color: p.ink }}>{COPY.lookbook[locale]}</span>
          </span>
        </div>
      </Part>

      <Part show={has.hero} delay={delay} rect={DESKTOP.heroArt} cover={cover}>
        <div className="relative h-full overflow-hidden rounded-[1.4cqw]" style={{ backgroundColor: p.soft }}>
          {id === "image" && !heroNew ? (
            <Placeholder tone={["#f3e4da", "#e9bba6"]} />
          ) : (
            <img src={heroNew ? IMAGES.heroAi : IMAGES.hero} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700" style={{ objectPosition: heroNew ? "center" : "center 30%", filter: warmFilter }} />
          )}
          {heroGenerating ? <Diffusion /> : null}
          {heroNew ? <Diffusion resolve /> : null}
          {heroNew ? (
            <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="absolute top-[1cqw] left-[1cqw] flex items-center gap-[0.5cqw] rounded-full bg-black/50 px-[1cqw] py-[0.4cqw] text-[0.95cqw] font-semibold text-white backdrop-blur-md">
              <MaskIcon src="/icons/ai.svg" className="size-[1cqw]" />
              {COPY.aiTag[locale]}
            </motion.span>
          ) : null}
        </div>
      </Part>

      <Part show={has.categories} delay={delay} rect={DESKTOP.categories} cover={cover}>
        <div className="grid h-full grid-cols-5">
          {CATEGORIES.map((c) => (
            <div key={c.name.en} className="flex flex-col items-center gap-[0.6cqw]">
              <span className="relative size-[7.4cqw] overflow-hidden rounded-full" style={{ backgroundColor: p.soft }}>
                <img src={c.img} alt="" draggable={false} className="absolute inset-0 h-full w-full origin-top scale-[1.32] object-cover transition-[filter] duration-700" style={{ objectPosition: "50% 20%", filter: warmFilter }} />
              </span>
              <span className="text-[1.1cqw] font-semibold" style={{ color: p.ink }}>{c.name[locale]}</span>
            </div>
          ))}
        </div>
      </Part>

      <Part show={has.products} delay={delay} rect={DESKTOP.products} cover={cover}>
        <div className="grid h-full grid-cols-4 gap-[1.6cqw]">
          {PRODUCTS.map((item, i) => (
            <div key={item.name.en} className="min-w-0">
              <div className="relative h-[18cqw] overflow-hidden rounded-[1.1cqw]" style={{ backgroundColor: p.soft }}>
                {photosNew ? (
                  <img src={item.img} alt="" draggable={false} className={["absolute inset-0 h-full w-full object-cover transition-[filter] duration-700", item.crop ? "origin-top scale-[1.3]" : ""].join(" ")} style={{ objectPosition: item.crop ? "50% 15%" : "50% 40%", filter: warmFilter }} />
                ) : (
                  <Placeholder tone={item.tone} />
                )}
                {photosGenerating ? <Diffusion /> : null}
                {i === 0 ? <span className="absolute top-[0.8cqw] left-[0.8cqw] rounded-full bg-white/90 px-[0.8cqw] py-[0.2cqw] text-[0.85cqw] font-semibold" style={{ color: p.accent }}>{COPY.tagNew[locale]}</span> : null}
                {eidTags && i < 3 ? <span className="absolute top-[0.8cqw] right-[0.8cqw] rounded-full px-[0.8cqw] py-[0.2cqw] text-[0.85cqw] font-semibold text-white" style={{ backgroundColor: p.accent }}>{COPY.tagEid[locale]}</span> : null}
              </div>
              <p className="mt-[0.7cqw] truncate text-[1.1cqw] font-semibold" style={{ color: p.ink }}>{item.name[locale]}</p>
              <p className="text-[1.05cqw] font-medium transition-colors duration-700" style={{ color: p.accent }}>{item.price[locale]}</p>
            </div>
          ))}
        </div>
      </Part>

      {current && current.target in DESKTOP ? <WorkFrame rect={DESKTOP[current.target as keyof typeof DESKTOP] as Rect} label={current.label[locale]} showLabel={current.target !== "nav"} /> : null}
      <AiCursor x={cx} y={cy} working={!!current} label="SoftuneBD AI" />
    </div>
  );
}

/** The generic starter template every new store begins as: neutral greys and
 * placeholder words in the same rectangles as the real store. */
function StarterStore({ locale }: { locale: Locale }) {
  const grey = "#d9d9d5";
  const ink = "#8b8b86";
  const box = (r: Rect): React.CSSProperties => ({ left: `${r.l}cqw`, top: `${r.t}cqw`, width: `${r.w}cqw`, height: `${r.h}cqw` });
  const T = COPY.starter;
  return (
    <div aria-hidden className="absolute inset-0 bg-[#f6f6f4]">
      <div className="absolute flex items-center justify-between border-b px-[3.5cqw]" style={{ ...box(DESKTOP.nav), borderColor: "#e6e6e2", color: ink }}>
        <span className="text-[2cqw] font-bold">{T.brand[locale]}</span>
        <span className="flex gap-[2.2cqw] text-[1.1cqw]">{T.links.map((l, i) => <span key={i}>{l[locale]}</span>)}</span>
        <span className="h-[2.4cqw] w-[8cqw] rounded-full" style={{ backgroundColor: grey }} />
      </div>
      <div className="absolute flex flex-col justify-center" style={{ ...box(DESKTOP.hero), color: ink }}>
        <span className="text-[3.6cqw] leading-[1.1] font-bold">{T.headline[locale]}</span>
        <span className="mt-[1.3cqw] text-[1.2cqw]">{T.sub[locale]}</span>
        <span className="mt-[1.8cqw] w-fit rounded-md px-[2.1cqw] py-[0.95cqw] text-[1.1cqw] font-semibold text-white" style={{ backgroundColor: "#b3b3ae" }}>{T.button[locale]}</span>
      </div>
      <div className="absolute rounded-[1.4cqw]" style={{ ...box(DESKTOP.heroArt), backgroundColor: grey }} />
      <div className="absolute grid grid-cols-5" style={{ ...box(DESKTOP.categories), color: ink }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center gap-[0.6cqw]">
            <span className="size-[7.4cqw] rounded-full" style={{ backgroundColor: grey }} />
            <span className="text-[1.1cqw]">{T.category[locale]}</span>
          </div>
        ))}
      </div>
      <div className="absolute grid grid-cols-4 gap-[1.6cqw]" style={{ ...box(DESKTOP.products), color: ink }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-[18cqw] rounded-[1.1cqw]" style={{ backgroundColor: grey }} />
            <p className="mt-[0.7cqw] text-[1.1cqw] font-semibold">{T.product[locale]}</p>
            <p className="text-[1.05cqw]">৳0</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const ORDERS = [
  { id: "#1042", name: { en: "Nusrat J.", bn: "নুসরাত জে." }, amount: { en: "৳2,450", bn: "৳২,৪৫০" } },
  { id: "#1041", name: { en: "Tania A.", bn: "তানিয়া এ." }, amount: { en: "৳4,800", bn: "৳৪,৮০০" } },
  { id: "#1040", name: { en: "Mim R.", bn: "মিম আর." }, amount: { en: "৳1,450", bn: "৳১,৪৫০" } },
  { id: "#1039", name: { en: "Sadia K.", bn: "সাদিয়া কে." }, amount: { en: "৳890", bn: "৳৮৯০" } },
  { id: "#1038", name: { en: "Rima S.", bn: "রিমা এস." }, amount: { en: "৳3,200", bn: "৳৩,২০০" } },
  { id: "#1037", name: { en: "Farhana H.", bn: "ফারহানা এইচ." }, amount: { en: "৳1,950", bn: "৳১,৯৫০" } },
];
const WEEK = [38, 52, 44, 61, 57, 74, 88];
const DAYS = { en: ["S", "M", "T", "W", "T", "F", "S"], bn: ["র", "সো", "ম", "বু", "বৃ", "শু", "শ"] };

/** ChatGPT on the right, the merchant's orders on the left: a real split screen,
 * with the AI cursor reading the orders while ChatGPT works out the answer. */
function ChatSplitDesktop({ scenario, sent, done, locale, finished, current, cx, cy }: StageState & { finished: boolean; current: boolean; cx: number; cy: number }) {
  const isBn = locale === "bn";
  const activeOrders = sent && done === 0;
  const activeTotal = sent && done === 1;
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#fbf6f1]">
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="relative border-r border-[#eadbd1] bg-[#fbf6f1] p-[2.2cqw]">
          <p className="text-[1.05cqw] font-semibold tracking-wide text-[#8a7067] uppercase">{isBn ? "Veila · অর্ডার" : "Veila · Orders"}</p>
          <p className="mt-[0.3cqw] mb-[1.6cqw] text-[1cqw] text-[#8a7067]">{isBn ? "এই সপ্তাহ" : "This week"}</p>
          <div className={["rounded-[1cqw] border bg-white transition-colors duration-500", activeOrders ? "border-[#ff5a36]" : "border-[#eadbd1]"].join(" ")}>
            {ORDERS.map((o, i) => (
              <div key={o.id} className={["flex items-center justify-between px-[1.4cqw] py-[1.3cqw] text-[1.2cqw] text-[#2a1c17]", i > 0 ? "border-t border-[#f1e6de]" : ""].join(" ")}>
                <span className="font-semibold">{o.id}</span>
                <span className="text-[#8a7067]">{o.name[locale]}</span>
                <span className="font-semibold">{o.amount[locale]}</span>
              </div>
            ))}
          </div>
          <div className={["mt-[1.6cqw] flex items-center justify-between rounded-[1cqw] border px-[1.4cqw] py-[1.4cqw] transition-colors duration-500", activeTotal || finished ? "border-[#ff5a36] bg-[#fff0ec]" : "border-[#eadbd1] bg-white"].join(" ")}>
            <span className="text-[1.15cqw] font-semibold text-[#2a1c17]">{isBn ? "মোট বিক্রি" : "Total sales"}</span>
            <span className="text-[1.8cqw] font-bold text-[#2a1c17] tabular-nums">{isBn ? "৳৪৮,৬০০" : "৳48,600"}</span>
          </div>
        </div>
        <ChatPane scenario={scenario} sent={sent} finished={finished} locale={locale} scale="desktop" />
      </div>
      <AiCursor x={cx} y={cy} working={current} label="SoftuneBD AI" />
    </div>
  );
}

export function ChatPane({ scenario, sent, finished, locale, scale }: { scenario: Scenario; sent: boolean; finished: boolean; locale: Locale; scale: "desktop" | "mobile" }) {
  const isBn = locale === "bn";
  const m = scale === "mobile";
  // One set of sizes per device, in container units, so text stays readable.
  const z = m ? { pad: "5cqw", gap: "3.4cqw", h: "5.4cqw", icon: "7cqw", text: "3.7cqw", bubble: "3.7cqw", chart: "26cqw", day: "2.6cqw", input: "3.5cqw", send: "8cqw" } : { pad: "2.2cqw", gap: "1.4cqw", h: "1.5cqw", icon: "2.4cqw", text: "1.25cqw", bubble: "1.25cqw", chart: "9cqw", day: "0.95cqw", input: "1.2cqw", send: "2.6cqw" };
  return (
    <div className="flex h-full flex-col bg-white" style={{ padding: z.pad, gap: z.gap }}>
      <div className="flex items-center" style={{ gap: "0.9cqw" }}>
        <img src="/icons/chatgpt-mark-dark.png" alt="" style={{ width: z.icon, height: z.icon }} />
        <span className="font-bold text-[#111]" style={{ fontSize: z.h }}>ChatGPT</span>
      </div>
      {sent ? (
        <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="ml-auto max-w-[88%] rounded-[1.6em] bg-[#f2f2f2] px-[1.2em] py-[0.7em] text-[#111]" style={{ fontSize: z.bubble }}>
          {scenario.prompt[locale]}
        </motion.p>
      ) : null}
      {finished ? (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="flex flex-col" style={{ gap: z.gap }}>
          <p className="leading-relaxed text-[#333]" style={{ fontSize: z.text }}>
            {isBn ? "এই সপ্তাহে ৩৭টি অর্ডারে ৳৪৮,৬০০ বিক্রি, গত সপ্তাহের চেয়ে ১৮% বেশি। সেরা বিক্রি: এমব্রয়ডারি শাড়ি।" : "You made ৳48,600 from 37 orders this week, up 18% on last week. Best seller: Embroidered Saree."}
          </p>
          <div className="flex items-end" style={{ height: z.chart, gap: "0.9cqw" }}>
            {WEEK.map((h, i) => (
              <div key={i} className="flex h-full flex-1 flex-col items-center justify-end" style={{ gap: "0.5cqw" }}>
                <motion.span className={["w-full rounded-[0.5cqw]", i === WEEK.length - 1 ? "bg-[#ff5a36]" : "bg-[#ff5a36]/25"].join(" ")} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: EASE }} />
                <span className="text-[#999]" style={{ fontSize: z.day }}>{DAYS[locale][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ) : sent ? (
        <span className="flex items-center gap-[0.8cqw] py-[0.6cqw]" aria-label="Thinking">
          {[0, 1, 2].map((i) => (
            <motion.span key={i} className="rounded-full bg-[#bbb]" style={{ width: m ? "2.6cqw" : "0.9cqw", height: m ? "2.6cqw" : "0.9cqw" }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }} />
          ))}
        </span>
      ) : null}
      <div className="mt-auto flex items-center rounded-full border border-[#e5e5e5]" style={{ padding: m ? "2cqw 2.4cqw 2cqw 4cqw" : "0.8cqw 1cqw 0.8cqw 1.6cqw", gap: "1cqw" }} aria-hidden>
        <span className="flex-1 text-[#9a9a9a]" style={{ fontSize: z.input }}>{isBn ? "ChatGPT-কে মেসেজ করুন" : "Message ChatGPT"}</span>
        <span className="flex items-center justify-center rounded-full bg-[#111]" style={{ width: z.send, height: z.send }}>
          <svg viewBox="0 0 12 12" className="size-[55%]" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M6 10V2.5M2.8 5.5 6 2.3l3.2 3.2" />
          </svg>
        </span>
      </div>
    </div>
  );
}
