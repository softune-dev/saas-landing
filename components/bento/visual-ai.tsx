"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Check } from "lucide-react";
import { CARD_SHADOW, OUT, Stage, useScenes, useTyped } from "./stage";

// type, send, think, build, live
const SCENES = [2300, 500, 1500, 2400, 2600] as const;

const COPY = {
  en: {
    ask: "Add the gold brocade koti for ৳2,152",
    name: "Gold Brocade Koti",
    price: "৳2,152",
    lines: ["Woven gold brocade,", "antique buttons, and a", "tailored festive fit."],
    live: "Live on your store",
    thinking: "Writing it up",
    hint: "Ask for anything",
  },
  bn: {
    ask: "২,১৫২ টাকায় গোল্ড ব্রোকেড কোটি যোগ করো",
    name: "গোল্ড ব্রোকেড কোটি",
    price: "৳২,১৫২",
    lines: ["নরম কটনে সোনালি ব্রোকেড,", "অ্যান্টিক বোতাম আর", "উৎসবের ফিট।"],
    live: "স্টোরে লাইভ",
    thinking: "লেখা হচ্ছে",
    hint: "যা দরকার বলুন",
  },
};

/** One sentence becomes a finished product page. */
export function AiVisual({ bn }: { bn: boolean }) {
  const c = bn ? COPY.bn : COPY.en;
  const { ref, scene } = useScenes(SCENES);
  const typed = useTyped(c.ask, scene === 0, 42);
  const built = scene >= 3;

  return (
    <Stage light="bottom" innerRef={ref}>
      {/* The product, assembling */}
      <div className={`absolute inset-x-6 top-6 flex h-[238px] gap-4 rounded-[22px] bg-white p-3 text-[#171717] ${CARD_SHADOW}`}>
        <div className="relative w-[148px] shrink-0 overflow-hidden rounded-[14px] bg-[#f3efec]">
          <AnimatePresence>
            {built ? (
              <motion.img
                key="photo"
                src="/bento/p/koti.webp"
                alt=""
                className="absolute inset-0 size-full object-cover object-top"
                initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: OUT }}
              />
            ) : null}
          </AnimatePresence>
          {scene === 2 ? (
            <motion.div
              className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#ff5a36]/35 to-transparent"
              initial={{ y: -96 }}
              animate={{ y: 220 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col py-1.5 pr-1">
          <div className="h-[22px]">
            {built ? (
              <motion.p
                initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: OUT, delay: 0.15 }}
                className="truncate text-[16.5px] font-bold tracking-tight"
              >
                {c.name}
              </motion.p>
            ) : (
              <span className="block h-4 w-4/5 rounded-md bg-[#efedeb]" />
            )}
          </div>
          <div className="mt-1.5 h-[26px]">
            {built ? (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: OUT, delay: 0.3 }}
                className="text-[21px] font-extrabold tracking-tight text-[#e2481f]"
              >
                {c.price}
              </motion.p>
            ) : (
              <span className="block h-5 w-2/5 rounded-md bg-[#efedeb]" />
            )}
          </div>
          <div className="mt-2 space-y-1">
            {c.lines.map((line, i) =>
              built ? (
                <motion.p
                  key={line}
                  initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={{ duration: 0.7, ease: "linear", delay: 0.5 + i * 0.35 }}
                  className="truncate text-[13px] leading-[19px] text-[#5d5854]"
                >
                  {line}
                </motion.p>
              ) : (
                <span key={line} className={`block h-[10px] rounded bg-[#efedeb] ${i === 2 ? "w-1/2" : "w-full"}`} />
              ),
            )}
          </div>
          <div className="mt-auto h-7">
            <AnimatePresence mode="wait">
              {scene === 4 ? (
                <motion.span
                  key="live"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 24 }}
                  className="inline-flex h-7 items-center gap-1.5 rounded-full bg-[#12804a] px-3 text-[12px] font-bold text-white"
                >
                  <Check className="size-3.5" strokeWidth={3} />
                  {c.live}
                </motion.span>
              ) : scene === 2 || scene === 3 ? (
                <motion.span
                  key="think"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex h-7 items-center gap-2 text-[12.5px] font-semibold text-[#6d6661]"
                >
                  <motion.img
                    src="/icons/gemini.webp"
                    alt=""
                    className="size-4 object-contain"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                  />
                  {c.thinking}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* The sentence that made it */}
      <div className="absolute inset-x-6 bottom-6">
        <div className="flex h-[58px] items-center gap-3 rounded-[20px] border border-white/20 bg-[#1a0f0b]/70 pr-2 pl-5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)]">
          <p className="min-w-0 flex-1 truncate text-[14.5px] font-medium">
            {scene === 0 ? (
              <>
                {typed}
                <motion.span
                  className="ml-0.5 inline-block h-[17px] w-[2px] translate-y-[3px] bg-[#ff8a5c]"
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                />
              </>
            ) : scene === 1 ? (
              c.ask
            ) : (
              <span className="text-white/55">{c.hint}</span>
            )}
          </p>
          <motion.span
            className="flex size-[42px] shrink-0 items-center justify-center rounded-[14px] bg-[var(--color-brand)]"
            animate={scene === 1 ? { scale: [1, 0.86, 1.06, 1] } : { scale: 1 }}
            transition={{ duration: 0.45, ease: OUT }}
          >
            <ArrowUp className="size-5" strokeWidth={2.6} />
          </motion.span>
        </div>
      </div>
    </Stage>
  );
}
