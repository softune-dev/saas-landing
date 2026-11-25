"use client";

import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { OUT, Stage, useScenes } from "./stage";

// ready, tap, tap, tap, paid, hold
const SCENES = [900, 1100, 1100, 1200, 1500, 2200] as const;

const ITEMS = [
  { id: "koti", src: "/bento/p/koti.webp", price: 2152, en: "Gold Koti", bn: "গোল্ড কোটি" },
  { id: "fatua", src: "/bento/p/fatua.webp", price: 1096, en: "Indigo Fatua", bn: "নীল ফতুয়া" },
  { id: "sandal", src: "/bento/p/sandal.webp", price: 1606, en: "Leather Sandal", bn: "স্যান্ডেল" },
];

// The torn bottom edge of till paper.
const TORN = {
  maskImage: "conic-gradient(from -45deg at bottom, transparent, #000 1deg 89deg, transparent 90deg)",
  maskSize: "12px 100%",
  WebkitMaskImage: "conic-gradient(from -45deg at bottom, transparent, #000 1deg 89deg, transparent 90deg)",
  WebkitMaskSize: "12px 100%",
} as const;

/** Tap the photos, the receipt prints itself. */
export function PosVisual({ bn }: { bn: boolean }) {
  const { ref, scene } = useScenes(SCENES);
  const added = Math.min(scene, 3);
  const paid = scene >= 4;
  const money = (n: number) => `৳${n.toLocaleString(bn ? "bn-BD" : "en-US")}`;
  const total = ITEMS.slice(0, added).reduce((sum, i) => sum + i.price, 0);
  // How much paper is out: header, each line, then the total.
  const paper = 82 + added * 34 + (paid ? 118 : 0);

  return (
    <Stage light="bottomRight" innerRef={ref}>
      {/* Catalogue */}
      <div className="absolute top-6 bottom-6 left-6 flex w-[118px] flex-col gap-3">
        {ITEMS.map((item, i) => {
          const tapping = scene === i + 1;
          const on = added > i;
          return (
            <motion.div
              key={item.id}
              className="relative flex-1 overflow-hidden rounded-[18px] bg-[#f3efec] shadow-[0_18px_36px_-14px_rgba(0,0,0,0.7)]"
              animate={{ scale: tapping ? [1, 0.93, 1] : 1 }}
              transition={{ duration: 0.45, ease: OUT }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt="" className={`size-full object-cover ${item.id === "sandal" ? "object-center" : "object-top"}`} />
              <motion.span
                className="absolute right-2 bottom-2 flex size-7 items-center justify-center rounded-full text-white"
                animate={{ backgroundColor: on ? "#12804a" : "#171717" }}
                transition={{ duration: 0.25 }}
              >
                {on ? <Check className="size-4" strokeWidth={3} /> : <Plus className="size-4" strokeWidth={2.6} />}
              </motion.span>
              {tapping ? (
                <motion.span
                  className="absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                  initial={{ opacity: 0.75, scale: 0.2 }}
                  animate={{ opacity: 0, scale: 2.6 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              ) : null}
            </motion.div>
          );
        })}
      </div>

      {/* Printer and paper */}
      <div className="absolute top-6 right-5 left-[160px]">
        <div className="relative z-10 h-[18px] rounded-full bg-[#3a2a24] shadow-[0_10px_22px_-6px_rgba(0,0,0,0.8)] ring-1 ring-white/15">
          <span className="absolute inset-x-3 top-[8px] h-[3px] rounded-full bg-black" />
        </div>
        <motion.div
          className="mx-2.5 -mt-[8px] overflow-hidden drop-shadow-[0_24px_30px_rgba(0,0,0,0.5)]"
          animate={{ height: paper }}
          transition={{ duration: 0.75, ease: [0.35, 0, 0.2, 1] }}
        >
          <div className="flex h-full flex-col justify-end bg-[#fffdfb] text-[#171717]" style={TORN}>
            <div className="flex flex-col px-4 pt-5 pb-5" style={{ minHeight: 82 }}>
              <p className="text-center text-[18px] font-extrabold tracking-tight">Raaj</p>
              <div className="mt-3 space-y-3 border-t border-dashed border-[#cfc8c3] pt-3">
                {ITEMS.slice(0, added).map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex h-[22px] items-center justify-between gap-2 text-[13.5px]"
                  >
                    <span className="truncate font-medium text-[#46403c]">{bn ? item.bn : item.en}</span>
                    <span className="font-bold tabular-nums">{money(item.price)}</span>
                  </motion.div>
                ))}
              </div>
              {paid ? (
                <div className="mt-3 border-t border-dashed border-[#cfc8c3] pt-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[13px] font-semibold text-[#6d6661]">{bn ? "মোট" : "Total"}</span>
                    <span className="text-[24px] font-extrabold tracking-tight tabular-nums">{money(total)}</span>
                  </div>
                  <motion.span
                    className="mx-auto mt-3 flex h-9 w-fit items-center gap-1.5 rounded-full bg-[#12804a] px-4 text-[13px] font-bold whitespace-nowrap text-white"
                    initial={{ scale: 0, rotate: -8 }}
                    animate={{ scale: 1, rotate: -3 }}
                    transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.55 }}
                  >
                    <Check className="size-3.5" strokeWidth={3} />
                    {bn ? "ক্যাশে পেইড" : "Paid in cash"}
                  </motion.span>
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </Stage>
  );
}
