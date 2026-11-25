"use client";

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Check, House, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MdDeliveryDining } from "react-icons/md";
import { CityMap, HOUSE, MAP_COLORS, ROUTE, SHOP } from "./city-map";
import { CARD_SHADOW, OUT, Stage, useScenes } from "./stage";

// booked, picked up, on the way, delivered
const SCENES = [1500, 1700, 3400, 2600] as const;
const AT = [0, 0.14, 0.86, 1]; // how far along the route each scene ends
const RIDE = [0, 1.5, 3.2, 1.1]; // seconds spent getting there

const COURIERS = [
  { id: "steadfast", src: "/bento/steadfast.png" },
  { id: "pathao", src: "/bento/pathao.png" },
  { id: "redx", src: "/bento/redx.svg" },
  { id: "ecourier", src: "/bento/ecourier.png" },
  { id: "carrybee", src: "/bento/carrybee.png" },
];

const SURFACE = "bg-white text-[#171717] ring-1 ring-black/5 dark:bg-[#1d1a1c] dark:text-white dark:ring-white/15";

/** A rider crosses the city to the customer's door while the status follows. */
export function CourierVisual({ bn }: { bn: boolean }) {
  const { ref, scene, moving } = useScenes(SCENES);
  const steps = bn ? ["পার্সেল বুকড", "পিকআপ হয়েছে", "পথে আছে", "ডেলিভার হয়েছে"] : ["Parcel booked", "Picked up", "On the way", "Delivered"];
  const done = scene === 3;

  const path = useRef<SVGPathElement>(null);
  const progress = useMotionValue(moving ? 0 : 1);
  const [length, setLength] = useState(0);
  useEffect(() => setLength(path.current?.getTotalLength() ?? 0), []);
  useEffect(() => {
    if (scene === 0) progress.set(0);
    const run = animate(progress, AT[scene], { duration: RIDE[scene], ease: [0.45, 0, 0.25, 1] });
    return () => run.stop();
  }, [scene, progress]);

  const point = (p: number) => (length ? path.current!.getPointAtLength(length * p) : SHOP);
  const x = useTransform(progress, (p) => point(p).x);
  const y = useTransform(progress, (p) => point(p).y);
  // The scooter turns to face the way it is travelling.
  const facing = useTransform(progress, (p) => (point(Math.min(p + 0.02, 1)).x < point(Math.max(p - 0.02, 0)).x - 0.5 ? -1 : 1));
  // The ring round the courier logo fills as the rider travels.
  const ring = useTransform(progress, (p) => 0.14 + 0.86 * p);

  return (
    <Stage light="bottomLeft" innerRef={ref}>
      <div className={`absolute inset-0 ${MAP_COLORS}`}>
        {/* Two layers: the city is painted once, only the route redraws. */}
        <svg width={396} height={380} viewBox="0 0 396 380" fill="none" className="absolute inset-0 transform-gpu overflow-visible">
          <CityMap bn={bn} />
        </svg>
        <svg width={396} height={380} viewBox="0 0 396 380" fill="none" className="absolute inset-0 transform-gpu overflow-visible">
          {/* The route: what is left is bright, what is behind fades. */}
          <path d={ROUTE} stroke="#fff" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
          <path ref={path} d={ROUTE} stroke="#ff5a36" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          <motion.path d={ROUTE} stroke="#ffc3b3" strokeWidth={6} strokeLinecap="round" style={{ pathLength: progress }} />
        </svg>

        {/* The shop */}
        <span
          className={`absolute flex size-[34px] items-center justify-center rounded-full ${SURFACE} shadow-[0_8px_18px_-6px_rgba(0,0,0,0.45)]`}
          style={{ left: SHOP.x - 17, top: SHOP.y - 17 }}
        >
          <ShoppingCart className="size-4" strokeWidth={2.4} />
        </span>

        {/* The customer's house: a pin that pulses until the parcel arrives */}
        <span className="absolute" style={{ left: HOUSE.x, top: HOUSE.y }}>
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute -top-[22px] -left-[22px] size-[44px] rounded-full"
              style={{ backgroundColor: done ? "#12804a" : "#ff5a36" }}
              animate={moving ? { scale: [0.4, 1.7], opacity: [0.4, 0] } : { opacity: 0 }}
              transition={moving ? { duration: 2.2, ease: "easeOut", repeat: Infinity, delay: i * 1.1 } : { duration: 0 }}
            />
          ))}
          <motion.span
            className="absolute -top-[49px] -left-[20px] block w-[40px] drop-shadow-[0_8px_8px_rgba(0,0,0,0.3)]"
            animate={{ y: done ? [0, -10, 0] : 0 }}
            transition={{ duration: 0.55, ease: OUT }}
          >
            <svg viewBox="0 0 46 56" width={40} height={49}>
              <path
                d="M23 55 C 23 55 2 36 2 22 A 21 21 0 0 1 44 22 C 44 36 23 55 23 55 Z"
                className="transition-colors duration-300"
                fill={done ? "#12804a" : "#ff5a36"}
                stroke="#fff"
                strokeWidth={2.5}
              />
            </svg>
            <span className="absolute inset-x-0 top-[8px] flex justify-center text-white">
              {done ? <Check className="size-5" strokeWidth={3.2} /> : <House className="size-[19px]" strokeWidth={2.4} />}
            </span>
          </motion.span>
        </span>

        {/* The rider */}
        <motion.span className="absolute top-0 left-0" style={{ x, y }}>
          <motion.span
            className="absolute -top-[22px] -left-[22px] flex size-[44px] items-center justify-center rounded-full bg-[#171717] shadow-[0_10px_22px_-6px_rgba(0,0,0,0.6)] ring-[3px] ring-white"
            animate={{ scale: done ? 0 : 1 }}
            transition={{ duration: 0.35, delay: done ? 0.85 : 0, ease: OUT }}
          >
            <motion.span style={{ scaleX: facing }}>
              <MdDeliveryDining className="size-7 text-white" />
            </motion.span>
          </motion.span>
        </motion.span>
      </div>

      {/* Couriers you can connect */}
      <div className={`absolute top-4 left-4 flex gap-[5px] rounded-full p-[5px] ${SURFACE} shadow-[0_12px_26px_-10px_rgba(0,0,0,0.45)]`}>
        {COURIERS.map((c) => (
          <span key={c.id} className="flex size-[31px] items-center justify-center rounded-full border border-[#d8d2cc] bg-white p-[5px] dark:border-white/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.src} alt="" className="max-h-full max-w-full object-contain" />
          </span>
        ))}
      </div>

      {/* Status: a small pill, with the delivery's progress round the logo */}
      <div className="absolute inset-x-0 bottom-3.5 flex justify-center">
        <div className={`flex h-[54px] w-[272px] items-center gap-2.5 rounded-full pr-5 pl-[7px] ${SURFACE} ${CARD_SHADOW}`}>
          <span className="relative flex size-[40px] shrink-0 items-center justify-center">
            <span className="flex size-[32px] items-center justify-center rounded-full bg-white p-[5px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bento/steadfast.png" alt="" className="max-h-full max-w-full object-contain" />
            </span>
            <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90" fill="none">
              <circle cx={20} cy={20} r={18} strokeWidth={3} className="stroke-[#ece8e5] dark:stroke-white/15" />
              <motion.circle
                cx={20}
                cy={20}
                r={18}
                strokeWidth={3}
                strokeLinecap="round"
                className="transition-colors duration-500"
                stroke={done ? "#12a05c" : "#ff5a36"}
                style={{ pathLength: ring }}
              />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <div className="relative h-[18px] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={scene}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.45, ease: OUT }}
                  className="truncate text-[14px] leading-[18px] font-bold tracking-tight"
                >
                  {steps[scene]}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="truncate text-[12px] leading-[16px] text-[#6d6661] dark:text-white/60">
              {bn ? "Steadfast, অর্ডার ১০৪২" : "Steadfast, order 1042"}
            </p>
          </div>
          <span className="text-[14px] font-extrabold tracking-tight tabular-nums">{bn ? "৳২,১৫২" : "৳2,152"}</span>
        </div>
      </div>
    </Stage>
  );
}
