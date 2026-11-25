"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Check } from "lucide-react";
import { CARD_SHADOW, OUT, Stage, useScenes, useTyped } from "./stage";

/* Each round: type the next request, send it, think, show the new product. The
   card never empties: the last product stays until the next one covers it. The
   very last scene lands back on the first product, which is also what people
   with motion turned off see. */
const ROUND = [2300, 500, 1300, 2600];
const SCENES = [...ROUND, ...ROUND, ...ROUND];

const PRODUCTS = [
  {
    photo: "/bento/p/headphones.webp",
    en: {
      ask: "Add the ANC headphones for ৳7,642",
      name: "ANC Headphones",
      price: "৳7,642",
      lines: ["Active noise cancelling,", "soft ear cushions and", "long battery life."],
    },
    bn: {
      ask: "৳7,642-এ ANC হেডফোন যোগ করো",
      name: "ANC হেডফোন",
      price: "৳7,642",
      lines: ["নয়েজ ক্যান্সেলিং,", "নরম ইয়ার কুশন আর", "লম্বা ব্যাটারি।"],
    },
  },
  {
    photo: "/bento/p/perfume.webp",
    en: {
      ask: "Now the amber perfume for ৳4,242",
      name: "Noir Amber EDP",
      price: "৳4,242",
      lines: ["Warm amber and vanilla,", "a rich evening scent", "in a 100ml bottle."],
    },
    bn: {
      ask: "এবার ৳4,242-এ অ্যাম্বার পারফিউম",
      name: "নোয়ার অ্যাম্বার EDP",
      price: "৳4,242",
      lines: ["অ্যাম্বার আর ভ্যানিলার", "গাঢ় সন্ধ্যার সুবাস,", "100ml বোতল।"],
    },
  },
  {
    photo: "/bento/p/sneaker.webp",
    en: {
      ask: "Add the running shoes for ৳3,392",
      name: "Aero Runner",
      price: "৳3,392",
      lines: ["Breathable knit upper,", "a cushioned sole and", "an easy daily fit."],
    },
    bn: {
      ask: "৳3,392-এ রানিং শু যোগ করো",
      name: "অ্যারো রানার",
      price: "৳3,392",
      lines: ["বাতাস চলাচলের নিট,", "কুশন সোল আর", "আরামের ফিট।"],
    },
  },
];

const COPY = {
  en: { live: "Live on your store", thinking: "Writing it up", hint: "Ask for anything" },
  bn: { live: "স্টোরে লাইভ", thinking: "লেখা হচ্ছে", hint: "যা দরকার বলুন" },
};

/** One sentence becomes a finished product page, one after another. */
export function AiVisual({ bn }: { bn: boolean }) {
  const lang = bn ? "bn" : "en";
  const c = COPY[lang];
  const { ref, scene } = useScenes(SCENES);

  const round = Math.floor(scene / ROUND.length);
  const phase = scene % ROUND.length; // 0 type, 1 send, 2 think, 3 shown
  const next = (round + 1) % PRODUCTS.length;
  const shown = phase === 3 ? next : round;
  const product = PRODUCTS[shown];
  const text = product[lang];
  const ask = PRODUCTS[next][lang].ask;
  const typed = useTyped(ask, phase === 0, 42);

  return (
    <Stage light="bottom" innerRef={ref}>
      {/* The product on the store */}
      <div
        className={`absolute inset-x-6 top-6 flex h-[238px] gap-4 rounded-[22px] bg-white p-3 text-[#171717] ring-1 ring-transparent dark:bg-[#1d1a1c] dark:text-white dark:ring-white/15 ${CARD_SHADOW}`}
      >
        <div className="relative isolate w-[148px] shrink-0 overflow-hidden rounded-[14px] bg-[#f3efec] dark:bg-[#2a2527]">
          <AnimatePresence initial={false}>
            <motion.img
              key={product.photo}
              src={product.photo}
              alt=""
              className="absolute inset-0 size-full object-cover"
              initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15, zIndex: 1 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1, zIndex: 1 }}
              // The old photo holds underneath until the new one has covered it.
              exit={{ opacity: 0, zIndex: 0, transition: { opacity: { delay: 1, duration: 0.1 }, zIndex: { duration: 0 } } }}
              transition={{ duration: 1, ease: OUT }}
            />
          </AnimatePresence>
          {phase === 2 ? (
            <motion.div
              className="absolute inset-x-0 z-10 h-24 bg-gradient-to-b from-transparent via-[#ff5a36]/40 to-transparent"
              initial={{ y: -96 }}
              animate={{ y: 220 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col py-1.5 pr-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={shown}
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)", transition: { duration: 0.18 } }}
              transition={{ duration: 0.55, ease: OUT }}
            >
              <p className="truncate text-[16.5px] leading-[22px] font-bold tracking-tight">{text.name}</p>
              <p className="mt-1.5 text-[21px] leading-[26px] font-extrabold tracking-tight text-[#e2481f] dark:text-[#ff7a52]">
                {text.price}
              </p>
              <div className="mt-2">
                {text.lines.map((line) => (
                  <p key={line} className="truncate text-[13px] leading-[19px] text-[#5d5854] dark:text-white/65">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-auto h-7">
            <AnimatePresence mode="wait" initial={false}>
              {phase === 2 ? (
                <motion.span
                  key="think"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="inline-flex h-7 items-center gap-2 text-[12.5px] font-semibold text-[#6d6661] dark:text-white/70"
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
              ) : (
                <motion.span
                  key="live"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ type: "spring", stiffness: 420, damping: 24 }}
                  className="inline-flex h-7 items-center gap-1.5 rounded-full bg-[#12804a] px-3 text-[12px] font-bold text-white"
                >
                  <Check className="size-3.5" strokeWidth={3} />
                  {c.live}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* The sentence that makes the next one */}
      <div className="absolute inset-x-6 bottom-6">
        <div className="flex h-[58px] items-center gap-3 rounded-[20px] border border-white/20 bg-[#1a0f0b]/70 pr-2 pl-5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)]">
          <p className="min-w-0 flex-1 truncate text-[14.5px] font-medium">
            {phase === 0 ? (
              <>
                {typed}
                <motion.span
                  className="ml-0.5 inline-block h-[17px] w-[2px] translate-y-[3px] bg-[#ff8a5c]"
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                />
              </>
            ) : phase === 1 ? (
              ask
            ) : (
              <span className="text-white/55">{c.hint}</span>
            )}
          </p>
          <motion.span
            className="flex size-[42px] shrink-0 items-center justify-center rounded-[14px] bg-[var(--color-brand)]"
            animate={phase === 1 ? { scale: [1, 0.86, 1.06, 1] } : { scale: 1 }}
            transition={{ duration: 0.45, ease: OUT }}
          >
            <ArrowUp className="size-5" strokeWidth={2.6} />
          </motion.span>
        </div>
      </div>
    </Stage>
  );
}
