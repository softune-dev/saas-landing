"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MaskIcon } from "@/components/ui/mask-icon";
import { AiCursor } from "./ai-cursor";
import { Diffusion, Part, Placeholder, WorkFrame } from "./canvas-parts";
import { ChatPane, type StageState } from "./store-desktop";
import { CATEGORIES, COPY, IMAGES, MOBILE, MOBILE_CURSOR, PALETTES, PRODUCTS, type Locale, type Rect } from "./store-data";

const EASE = [0.16, 1, 0.3, 1] as const;
const serif = (isBn: boolean) => (isBn ? "var(--font-bn), serif" : "var(--font-instrument), serif");

/** The same demo store laid out for a phone: one column, big type, a full-bleed
 * hero with its text over the photo, round category images and a product grid.
 * The canvas is portrait (100 x 125 container units). */
export function StoreMobile({ scenario, sent, done, locale }: StageState) {
  const isBn = locale === "bn";
  const total = scenario.steps.length;
  const finished = sent && done >= total;
  const current = sent && !finished ? scenario.steps[done] : null;
  const target = current?.target ?? (finished ? scenario.steps[total - 1].target : scenario.steps[0].target);
  const [cx, cy] = sent ? MOBILE_CURSOR[target] : [75, 60];
  const id = scenario.id;

  if (id === "chatgpt") {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <ChatPane scenario={scenario} sent={sent} finished={finished} locale={locale} scale="mobile" />
      </div>
    );
  }

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

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: p.bg, transition: "background-color 900ms ease" }}>
      {building ? <StarterMobile locale={locale} /> : null}

      <Part show={has.nav} delay={delay} rect={MOBILE.nav} cover={cover}>
        <div className="flex h-full items-center justify-between border-b px-[5cqw]" style={{ borderColor: p.soft, color: p.ink }}>
          <span className="text-[5.4cqw] leading-none font-bold" style={{ fontFamily: serif(isBn) }}>Veila</span>
          <span className="flex items-center gap-[4cqw]">
            <span className="h-[2px] w-[5cqw] rounded-full bg-current opacity-70" />
            <MaskIcon src="/icons/shop-bag.svg" className="size-[5.4cqw]" />
          </span>
        </div>
      </Part>

      <Part show={has.hero} delay={delay} rect={MOBILE.hero} cover={cover}>
        <div className="relative h-full overflow-hidden rounded-[4cqw]" style={{ backgroundColor: p.soft }}>
          {id === "image" && !heroNew ? (
            <Placeholder tone={["#f3e4da", "#e9bba6"]} />
          ) : (
            <img src={heroNew ? IMAGES.heroAi : IMAGES.hero} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700" style={{ objectPosition: "center 35%", filter: warmFilter }} />
          )}
          {heroGenerating ? <Diffusion /> : null}
          {heroNew ? <Diffusion resolve /> : null}
          {!heroNew ? (
            <>
              <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute inset-x-[5cqw] bottom-[5cqw] flex flex-col items-start text-white">
                <span className="mb-[1.6cqw] text-[2.7cqw] font-semibold tracking-[0.12em] uppercase opacity-90">{eid ? COPY.seasonEid[locale] : COPY.season[locale]}</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={(eid ? "eid" : "base") + locale}
                    initial={{ opacity: 0, y: "0.25em" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-0.25em" }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className={["block font-bold", isBn ? "text-[7cqw] leading-[1.15]" : "text-[8.2cqw] leading-[1]"].join(" ")}
                    style={{ fontFamily: serif(isBn) }}
                  >
                    {eid ? COPY.headlineEid[locale] : COPY.headline[locale]}
                  </motion.span>
                </AnimatePresence>
                <span className="mt-[3.4cqw] rounded-full px-[5cqw] py-[2.2cqw] text-[3.2cqw] font-semibold text-white transition-colors duration-700" style={{ backgroundColor: p.accent }}>{eid ? COPY.shopEid[locale] : COPY.shop[locale]}</span>
              </div>
            </>
          ) : (
            <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="absolute top-[3cqw] left-[3cqw] flex items-center gap-[1.4cqw] rounded-full bg-black/50 px-[3cqw] py-[1.2cqw] text-[2.8cqw] font-semibold text-white backdrop-blur-md">
              <MaskIcon src="/icons/ai.svg" className="size-[3cqw]" />
              {COPY.aiTag[locale]}
            </motion.span>
          )}
        </div>
      </Part>

      <Part show={has.categories} delay={delay} rect={MOBILE.categories} cover={cover}>
        <div className="flex h-full items-center justify-between px-[4cqw]">
          {CATEGORIES.map((c) => (
            <div key={c.name.en} className="flex w-[17cqw] flex-col items-center gap-[1.6cqw]">
              <span className="relative size-[14.5cqw] overflow-hidden rounded-full" style={{ backgroundColor: p.soft }}>
                <img src={c.img} alt="" draggable={false} className="absolute inset-0 h-full w-full origin-top scale-[1.32] object-cover transition-[filter] duration-700" style={{ objectPosition: "50% 20%", filter: warmFilter }} />
              </span>
              <span className="w-full truncate text-center text-[2.9cqw] font-semibold" style={{ color: p.ink }}>{c.name[locale]}</span>
            </div>
          ))}
        </div>
      </Part>

      <Part show={has.products} delay={delay} rect={MOBILE.products} cover={cover}>
        <div className="grid h-full grid-cols-2 gap-[3.4cqw]">
          {PRODUCTS.slice(0, 2).map((item, i) => (
            <div key={item.name.en} className="min-w-0">
              <div className="relative h-[34cqw] overflow-hidden rounded-[3cqw]" style={{ backgroundColor: p.soft }}>
                {photosNew ? (
                  <img src={item.img} alt="" draggable={false} className={["absolute inset-0 h-full w-full object-cover transition-[filter] duration-700", item.crop ? "origin-top scale-[1.3]" : ""].join(" ")} style={{ objectPosition: item.crop ? "50% 15%" : "50% 40%", filter: warmFilter }} />
                ) : (
                  <Placeholder tone={item.tone} />
                )}
                {photosGenerating ? <Diffusion /> : null}
                {i === 0 ? <span className="absolute top-[2.2cqw] left-[2.2cqw] rounded-full bg-white/90 px-[2.2cqw] py-[0.6cqw] text-[2.4cqw] font-semibold" style={{ color: p.accent }}>{COPY.tagNew[locale]}</span> : null}
                {eidTags ? <span className="absolute top-[2.2cqw] right-[2.2cqw] rounded-full px-[2.2cqw] py-[0.6cqw] text-[2.4cqw] font-semibold text-white" style={{ backgroundColor: p.accent }}>{COPY.tagEid[locale]}</span> : null}
              </div>
              <p className="mt-[1.8cqw] truncate text-[3.2cqw] font-semibold" style={{ color: p.ink }}>{item.name[locale]}</p>
              <p className="text-[3cqw] font-medium transition-colors duration-700" style={{ color: p.accent }}>{item.price[locale]}</p>
            </div>
          ))}
        </div>
      </Part>

      {current && current.target in MOBILE_FRAMES ? <WorkFrame rect={MOBILE_FRAMES[current.target]} label={current.label[locale]} showLabel={current.target !== "nav"} /> : null}
      <AiCursor x={cx} y={cy} working={!!current} label="SoftuneBD AI" />
    </div>
  );
}

const MOBILE_FRAMES: Record<string, Rect> = {
  nav: MOBILE.nav,
  hero: MOBILE.hero,
  heroArt: MOBILE.hero,
  categories: MOBILE.categories,
  products: MOBILE.products,
};

function StarterMobile({ locale }: { locale: Locale }) {
  const grey = "#d9d9d5";
  const ink = "#8b8b86";
  const T = COPY.starter;
  const box = (r: Rect): React.CSSProperties => ({ left: `${r.l}cqw`, top: `${r.t}cqw`, width: `${r.w}cqw`, height: `${r.h}cqw` });
  return (
    <div aria-hidden className="absolute inset-0 bg-[#f6f6f4]">
      <div className="absolute flex items-center justify-between border-b px-[5cqw]" style={{ ...box(MOBILE.nav), borderColor: "#e6e6e2", color: ink }}>
        <span className="text-[4.4cqw] font-bold">{T.brand[locale]}</span>
        <span className="h-[2px] w-[5cqw] rounded-full bg-current" />
      </div>
      <div className="absolute flex flex-col items-start justify-end rounded-[4cqw] p-[5cqw]" style={{ ...box(MOBILE.hero), backgroundColor: grey, color: "#6f6f6a" }}>
        <span className="text-[7cqw] leading-[1.1] font-bold">{T.headline[locale]}</span>
        <span className="mt-[3cqw] rounded-md px-[5cqw] py-[2.2cqw] text-[3.2cqw] font-semibold text-white" style={{ backgroundColor: "#a9a9a4" }}>{T.button[locale]}</span>
      </div>
      <div className="absolute flex items-center justify-between px-[4cqw]" style={{ ...box(MOBILE.categories), color: ink }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex w-[17cqw] flex-col items-center gap-[1.6cqw]">
            <span className="size-[14.5cqw] rounded-full" style={{ backgroundColor: grey }} />
            <span className="text-[2.9cqw]">{T.category[locale]}</span>
          </div>
        ))}
      </div>
      <div className="absolute grid grid-cols-2 gap-[3.4cqw]" style={{ ...box(MOBILE.products), color: ink }}>
        {[0, 1].map((i) => (
          <div key={i}>
            <div className="h-[34cqw] rounded-[3cqw]" style={{ backgroundColor: grey }} />
            <p className="mt-[1.8cqw] text-[3.2cqw] font-semibold">{T.product[locale]}</p>
            <p className="text-[3cqw]">৳0</p>
          </div>
        ))}
      </div>
    </div>
  );
}
