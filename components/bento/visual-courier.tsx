"use client";

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Check, House, Package, Store } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CARD_SHADOW, OUT, Stage, useScenes } from "./stage";

// booked, picked up, on the way, delivered
const SCENES = [1500, 1600, 2200, 2400] as const;
const AT = [0, 0.32, 0.76, 1];

const ROUTE = "M 56 222 C 100 222, 96 138, 152 138 S 206 212, 260 196 S 300 112, 342 104";

const COURIERS = [
  { id: "steadfast", src: "/bento/steadfast.png" },
  { id: "pathao", src: "/bento/pathao.png" },
  { id: "redx", src: "/bento/redx.svg" },
  { id: "ecourier", src: "/bento/ecourier.png" },
];

/** A parcel crosses the city while its status follows. */
export function CourierVisual({ bn }: { bn: boolean }) {
  const { ref, scene, moving } = useScenes(SCENES);
  const steps = bn ? ["পার্সেল বুকড", "পিকআপ হয়েছে", "পথে আছে", "ডেলিভার হয়েছে"] : ["Parcel booked", "Picked up", "On the way", "Delivered"];

  const path = useRef<SVGPathElement>(null);
  const progress = useMotionValue(moving ? 0 : 1);
  const [length, setLength] = useState(0);
  useEffect(() => setLength(path.current?.getTotalLength() ?? 0), []);
  useEffect(() => {
    if (scene === 0) progress.set(0);
    const run = animate(progress, AT[scene], { duration: scene === 0 ? 0 : 1.5, ease: [0.5, 0, 0.2, 1] });
    return () => run.stop();
  }, [scene, progress]);
  const x = useTransform(progress, (p) => (length ? path.current!.getPointAtLength(length * p).x : 56));
  const y = useTransform(progress, (p) => (length ? path.current!.getPointAtLength(length * p).y : 222));
  const done = scene === 3;

  return (
    <Stage light="bottomLeft" innerRef={ref}>
      <div className="absolute top-0 left-0 h-[290px] w-[396px]">
        <svg width={396} height={290} viewBox="0 0 396 290" className="absolute inset-0 overflow-visible" fill="none">
          {/* City blocks */}
          <g stroke="#fff" strokeOpacity={0.08} strokeWidth={10} strokeLinecap="round">
            <path d="M-20 60 C 90 90 130 40 240 74 S 380 60 430 90" />
            <path d="M-20 178 C 80 190 160 176 240 160 S 360 150 430 168" />
            <path d="M96 -10 C 110 80 74 170 96 300" />
            <path d="M206 -10 C 190 90 230 180 204 300" />
            <path d="M312 -10 C 330 80 296 200 318 300" />
            <path d="M-20 262 C 100 250 200 276 430 250" />
          </g>
          <g stroke="#fff" strokeOpacity={0.07} strokeWidth={4} strokeLinecap="round">
            <path d="M40 -10 L 60 300" />
            <path d="M150 -10 L 160 300" />
            <path d="M262 -10 L 258 300" />
            <path d="M372 -10 L 366 300" />
            <path d="M-20 116 L 430 124" />
            <path d="M-20 222 L 430 208" />
          </g>
          <path ref={path} d={ROUTE} stroke="#fff" strokeOpacity={0.35} strokeWidth={4} strokeLinecap="round" strokeDasharray="1 11" />
          <motion.path d={ROUTE} stroke="#fff" strokeWidth={5} strokeLinecap="round" style={{ pathLength: progress }} />
        </svg>

        <span className={`absolute flex size-[46px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#171717] ${CARD_SHADOW}`} style={{ left: 56, top: 222 }}>
          <Store className="size-[21px]" strokeWidth={2.1} />
        </span>
        <motion.span
          className={`absolute flex size-[46px] items-center justify-center rounded-full ${CARD_SHADOW}`}
          style={{ left: 319, top: 81 }}
          animate={{ backgroundColor: done ? "#12804a" : "#ffffff", color: done ? "#ffffff" : "#171717", scale: done ? [1, 1.22, 1] : 1 }}
          transition={{ duration: 0.5, ease: OUT }}
        >
          {done ? <Check className="size-[22px]" strokeWidth={3} /> : <House className="size-[21px]" strokeWidth={2.1} />}
        </motion.span>

        <motion.span className="absolute top-0 left-0" style={{ x, y }}>
          <motion.span
            className="-mt-[21px] -ml-[21px] flex size-[42px] items-center justify-center rounded-[14px] bg-[var(--color-brand)] shadow-[0_14px_28px_-8px_rgba(0,0,0,0.75)] ring-[3px] ring-white"
            animate={{ scale: done ? 0 : 1 }}
            transition={{ duration: 0.35, ease: OUT }}
          >
            <Package className="size-5 text-white" strokeWidth={2.2} />
          </motion.span>
        </motion.span>
      </div>

      {/* Couriers */}
      <div className="absolute top-5 left-5 flex gap-2">
        {COURIERS.map((c) => (
          <span
            key={c.id}
            className="flex size-[48px] items-center justify-center rounded-[15px] bg-white p-2 shadow-[0_12px_26px_-10px_rgba(0,0,0,0.6)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.src} alt="" className="max-h-full max-w-full object-contain" />
          </span>
        ))}
      </div>

      {/* Status */}
      <div className={`absolute inset-x-5 bottom-5 rounded-[20px] bg-white p-4 text-[#171717] ${CARD_SHADOW}`}>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bento/steadfast.png" alt="" className="size-9 object-contain" />
          <div className="min-w-0 flex-1">
            <div className="relative h-[21px] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={scene}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.45, ease: OUT }}
                  className="text-[15.5px] leading-[21px] font-bold tracking-tight"
                >
                  {steps[scene]}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="truncate text-[12.5px] text-[#6d6661]">{bn ? "Steadfast, অর্ডার ১০৪২" : "Steadfast, order 1042"}</p>
          </div>
          <span className="text-[15px] font-extrabold tracking-tight tabular-nums">{bn ? "৳২,১৫২" : "৳2,152"}</span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {steps.map((s, i) => (
            <span key={s} className="h-[5px] overflow-hidden rounded-full bg-[#ece8e5]">
              <motion.span
                className="block h-full rounded-full"
                animate={{ width: i <= scene ? "100%" : "0%", backgroundColor: done ? "#12804a" : "#ff5a36" }}
                transition={{ duration: scene === 0 ? 0 : 0.6, ease: OUT }}
                initial={false}
              />
            </span>
          ))}
        </div>
      </div>
    </Stage>
  );
}
