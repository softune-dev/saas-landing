"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BatteryFull, Moon, Signal, Wifi } from "lucide-react";
import { OUT, Stage, useScenes } from "./stage";

// question, typing, answer, question, typing, product
const SCENES = [1200, 1100, 1700, 1200, 1000, 3200] as const;

const COPY = {
  en: {
    q1: "Delivery charge to Chattogram?",
    a1: "৳120, and it arrives in 2 to 3 days.",
    q2: "Do you have the gold koti?",
    name: "Gold Brocade Koti",
    price: "৳2,152",
    buy: "View",
    time: "2:14 AM",
    online: "Replies instantly",
  },
  bn: {
    q1: "চট্টগ্রামে ডেলিভারি চার্জ কত?",
    a1: "৳১২০, ২ থেকে ৩ দিনে পৌঁছাবে।",
    q2: "গোল্ড কোটি আছে?",
    name: "গোল্ড ব্রোকেড কোটি",
    price: "৳২,১৫২",
    buy: "দেখুন",
    time: "রাত ২:১৪",
    online: "সাথে সাথে উত্তর",
  },
};

const enter = {
  initial: { opacity: 0, y: 14, scale: 0.94 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.5, ease: OUT },
};

function Dots() {
  return (
    <motion.span layout {...enter} exit={{ opacity: 0, transition: { duration: 0.1 } }} className="flex w-fit gap-1 rounded-[15px] rounded-bl-[5px] bg-[#f1eeec] px-3 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-[6px] rounded-full bg-[#9b938d]"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.13, ease: "easeInOut" }}
        />
      ))}
    </motion.span>
  );
}

/** A shopper at two in the morning, answered by the store itself. */
export function AssistantVisual({ bn }: { bn: boolean }) {
  const c = bn ? COPY.bn : COPY.en;
  const { ref, scene } = useScenes(SCENES);

  return (
    <Stage light="top" innerRef={ref}>
      <div className="absolute top-5 left-1/2 w-[300px] -translate-x-1/2 rounded-[2.7rem] bg-[#050506] p-[8px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/20">
        <div className="relative h-[520px] overflow-hidden rounded-[2.2rem] bg-[#f7f3ec]">
          <div className="relative z-10 flex h-8 items-center justify-between bg-[#050506] px-6 text-[11px] font-semibold text-white">
            <span>2:14</span>
            <span className="absolute top-1.5 left-1/2 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10" />
            <span className="flex items-center gap-1">
              <Signal className="size-3" strokeWidth={2.5} />
              <Wifi className="size-3" strokeWidth={2.5} />
              <BatteryFull className="size-3.5" strokeWidth={2} />
            </span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bento/p/raaj.webp" alt="" className="block w-full" loading="lazy" />
          <div className="absolute inset-0 top-8 bg-black/35" />

          <div className="absolute inset-x-0 top-[68px] bottom-0 flex flex-col rounded-t-[24px] bg-white text-[#171717] shadow-[0_-18px_40px_-12px_rgba(0,0,0,0.5)]">
            <div className="flex h-[54px] shrink-0 items-center gap-2.5 px-4">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#7a1f1f] text-[15px] font-bold text-[#f3d9a4]">R</span>
              <span className="flex-1">
                <span className="block text-[13.5px] leading-tight font-bold">Raaj</span>
                <span className="flex items-center gap-1.5 text-[11px] text-[#6d6661]">
                  <span className="size-[7px] rounded-full bg-[#12a05c]" />
                  {c.online}
                </span>
              </span>
            </div>
            <div className="flex h-[230px] flex-col justify-start gap-2 overflow-hidden border-t border-[#eeebe8] px-3 pt-3 pb-3 text-[13px] leading-snug font-medium">
              <AnimatePresence mode="popLayout">
                {scene >= 0 ? (
                  <motion.span key="q1" layout {...enter} className="max-w-[85%] self-end rounded-[15px] rounded-br-[5px] bg-[#7a1f1f] px-3 py-2 text-white">
                    {c.q1}
                  </motion.span>
                ) : null}
                {scene === 1 ? <Dots key="d1" /> : null}
                {scene >= 2 ? (
                  <motion.span key="a1" layout {...enter} className="max-w-[85%] self-start rounded-[15px] rounded-bl-[5px] bg-[#f1eeec] px-3 py-2">
                    {c.a1}
                  </motion.span>
                ) : null}
                {scene >= 3 ? (
                  <motion.span key="q2" layout {...enter} className="max-w-[85%] self-end rounded-[15px] rounded-br-[5px] bg-[#7a1f1f] px-3 py-2 text-white">
                    {c.q2}
                  </motion.span>
                ) : null}
                {scene === 4 ? <Dots key="d2" /> : null}
                {scene >= 5 ? (
                  <motion.span key="p" layout {...enter} className="flex w-full items-center gap-2.5 rounded-[16px] bg-white p-2 shadow-[0_8px_22px_-8px_rgba(60,30,10,0.35)] ring-1 ring-[#eeebe8]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/bento/p/koti.webp" alt="" className="size-[52px] rounded-[11px] object-cover object-top" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12.5px] font-bold">{c.name}</span>
                      <span className="block text-[13px] font-extrabold text-[#7a1f1f]">{c.price}</span>
                    </span>
                    <span className="rounded-full bg-[#7a1f1f] px-3 py-1.5 text-[11.5px] font-bold text-white">{c.buy}</span>
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-[58px] right-3 flex h-9 items-center gap-2 rounded-full bg-[#0c0a0d] px-3.5 text-[12.5px] font-semibold shadow-[0_14px_30px_-10px_rgba(0,0,0,0.8)] ring-1 ring-white/20">
        <Moon className="size-4 text-[#ffcf9e]" strokeWidth={2.2} />
        {c.time}
      </div>
    </Stage>
  );
}
