"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { SiFacebook, SiGoogleanalytics, SiGooglesearchconsole, SiWhatsapp } from "react-icons/si";
import { CARD_SHADOW, Stage, useScenes } from "./stage";

// low, climb, climb, then along the dock one app at a time, hold
const SCENES = [1400, 900, 1300, 650, 650, 650, 650, 650, 2200] as const;

/* Search tools, then the places a shared link shows your own picture. */
const DOCK = [
  { id: "console", Icon: SiGooglesearchconsole, color: "#458cf5" },
  { id: "analytics", Icon: SiGoogleanalytics, color: "#e37400" },
  { id: "facebook", Icon: SiFacebook, color: "#0866ff" },
  { id: "whatsapp", Icon: SiWhatsapp, color: "#1faf52" },
];

const ROW = 72;

function Other({ widths }: { widths: [string, string, string] }) {
  return (
    <div className="flex h-[58px] flex-col justify-center gap-[7px] rounded-[16px] bg-white/[0.07] px-4 ring-1 ring-white/10 ring-inset">
      <span className="h-1.5 rounded-full bg-white/25" style={{ width: widths[0] }} />
      <span className="h-2.5 rounded-full bg-white/30" style={{ width: widths[1] }} />
      <span className="h-1.5 rounded-full bg-white/15" style={{ width: widths[2] }} />
    </div>
  );
}

/** The store's result climbs to the top; below, the places it gets seen. */
export function SeoVisual({ bn }: { bn: boolean }) {
  const { ref, scene } = useScenes(SCENES);
  const place = scene === 0 ? 2 : scene === 1 ? 1 : 0;
  const lifted = scene - 3;
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

      <div className="absolute inset-x-6 top-[90px]" style={{ height: ROW * 3 }}>
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

      {/* A small dock: whichever app has its turn rises, like a desktop taskbar. */}
      <div className="absolute inset-x-0 bottom-[18px] flex justify-center">
        <div className="flex items-end gap-1.5 rounded-[18px] bg-white/[0.1] p-1.5 ring-1 ring-white/15 ring-inset">
          {[null, ...DOCK].map((app, i) => (
            <motion.span
              key={app?.id ?? "google"}
              className="flex size-[38px] origin-bottom items-center justify-center rounded-[12px] bg-white ring-1 ring-transparent ring-inset dark:bg-[#1d1a1c] dark:ring-white/15"
              animate={{ y: lifted === i ? -7 : 0, scale: lifted === i ? 1.18 : 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              {app ? (
                <app.Icon className="size-[19px]" style={{ color: app.color }} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/icons/google.webp" alt="" className="size-[19px] object-contain" />
              )}
            </motion.span>
          ))}
        </div>
      </div>
    </Stage>
  );
}
