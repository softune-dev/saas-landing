"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { SiGoogleanalytics, SiGoogletagmanager, SiMeta, SiTiktok } from "react-icons/si";
import { CARD_SHADOW, Stage, useScenes } from "./stage";

// low, climb, climb, then one tracking service after another, hold
const SCENES = [1400, 900, 1300, 700, 700, 700, 700, 2200] as const;

const EVENTS = [
  { id: "meta", Icon: SiMeta, color: "#0866ff" },
  { id: "tiktok", Icon: SiTiktok, color: null },
  { id: "ga", Icon: SiGoogleanalytics, color: "#e37400" },
  { id: "gtm", Icon: SiGoogletagmanager, color: "#246fdb" },
];

const ROW = 68;

function Other({ widths }: { widths: [string, string, string] }) {
  return (
    <div className="flex h-[58px] flex-col justify-center gap-[7px] rounded-[16px] bg-white/[0.07] px-4 ring-1 ring-white/10 ring-inset">
      <span className="h-1.5 rounded-full bg-white/25" style={{ width: widths[0] }} />
      <span className="h-2.5 rounded-full bg-white/30" style={{ width: widths[1] }} />
      <span className="h-1.5 rounded-full bg-white/15" style={{ width: widths[2] }} />
    </div>
  );
}

/** The store's result climbs, then every tracking service hears the sale. */
export function SeoVisual({ bn }: { bn: boolean }) {
  const { ref, scene } = useScenes(SCENES);
  const place = scene === 0 ? 2 : scene === 1 ? 1 : 0;
  const heard = scene - 3;
  const spring = { type: "spring", stiffness: 120, damping: 19, mass: 0.9 } as const;
  // The other results slide down to make room, in their fixed order.
  const others = [0, 1, 2].filter((slot) => slot !== place);

  return (
    <Stage light="topRight" innerRef={ref}>
      <div className={`absolute inset-x-6 top-6 flex h-12 items-center gap-3 rounded-full bg-white pr-4 pl-4 text-[#171717] ${CARD_SHADOW}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/google.webp" alt="" className="size-5 object-contain" />
        <span className="flex-1 truncate text-[14.5px] font-medium">{bn ? "ঈদের কোটি অনলাইনে কিনুন" : "buy eid koti online"}</span>
        <Search className="size-[18px] text-[#8b847f]" strokeWidth={2.2} />
      </div>

      <div className="absolute inset-x-6 top-[88px]" style={{ height: ROW * 3 }}>
        {others.map((slot, i) => (
          <motion.div key={i} className="absolute inset-x-0" animate={{ y: slot * ROW }} transition={spring} initial={false}>
            <Other widths={i === 0 ? ["26%", "68%", "84%"] : ["32%", "54%", "72%"]} />
          </motion.div>
        ))}
        <motion.div
          className={`absolute -inset-x-2 z-10 flex h-[64px] items-center gap-3 rounded-[18px] bg-white p-2 text-[#171717] ${CARD_SHADOW}`}
          animate={{ y: place * ROW - 2, scale: place === 0 ? 1.02 : 1 }}
          transition={spring}
          initial={false}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bento/p/koti.webp" alt="" className="size-[48px] rounded-[12px] object-cover object-top" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[12px] text-[#5d5854]">yourshop.com</span>
            <span className="block truncate text-[14.5px] font-bold tracking-tight text-[#1a0dab]">
              {bn ? "গোল্ড ব্রোকেড কোটি, আপনার শপ" : "Gold Brocade Koti, Your Shop"}
            </span>
            <span className="block truncate text-[12px] text-[#5d5854]">
              {bn ? "৳২,১৫২ · স্টকে আছে" : "৳2,152 · In stock"}
            </span>
          </span>
        </motion.div>
      </div>

      {/* Tracking: one shelf, four equal places */}
      <div className="absolute inset-x-6 bottom-[18px] grid grid-cols-4 gap-2 rounded-[24px] bg-white/[0.08] p-2 ring-1 ring-white/12 ring-inset">
        {EVENTS.map(({ id, Icon, color }, i) => {
          const on = heard >= i;
          return (
            <motion.span
              key={id}
              className={`relative flex h-[56px] items-center justify-center rounded-[17px] ring-1 ring-inset transition-colors duration-300 ${
                on ? "bg-white ring-transparent dark:bg-[#1d1a1c] dark:ring-white/15" : "bg-white/[0.06] ring-white/[0.06]"
              }`}
              animate={{ y: on ? [0, -6, 0] : 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Icon
                className={`size-[26px] transition-colors duration-300 ${on ? (color ? "" : "text-black dark:text-white") : "text-white/45"}`}
                style={on && color ? { color } : undefined}
              />
              {on ? (
                <motion.span
                  className="absolute inset-0 rounded-[17px] border-2 border-white"
                  initial={{ opacity: 0.55, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.28 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              ) : null}
            </motion.span>
          );
        })}
      </div>
    </Stage>
  );
}
