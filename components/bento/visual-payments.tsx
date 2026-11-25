"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { CARD_SHADOW, OUT, Stage, useScenes } from "./stage";

const W = 396;
const H = 380;
const CX = W / 2;
const CY = 154;

type Node = { id: string; src: string; x: number; y: number; paid?: { en: string; bn: string } };

const NODES: Node[] = [
  { id: "bkash", src: "/bento/bkash.webp", x: 60, y: 54, paid: { en: "৳2,152", bn: "৳২,১৫২" } },
  { id: "nagad", src: "/bento/nagad.webp", x: 60, y: CY, paid: { en: "৳1,752", bn: "৳১,৭৫২" } },
  { id: "rocket", src: "/bento/rocket.png", x: 60, y: 254, paid: { en: "৳760", bn: "৳৭৬০" } },
  { id: "sslcommerz", src: "/bento/sslcommerz.webp", x: W - 60, y: 54, paid: { en: "৳3,392", bn: "৳৩,৩৯২" } },
  { id: "softunepay", src: "/bento/softune-pay.webp", x: W - 60, y: CY, paid: { en: "৳1,096", bn: "৳১,০৯৬" } },
  { id: "cod", src: "/bento/cod.webp", x: W - 60, y: 254, paid: { en: "৳1,606", bn: "৳১,৬০৬" } },
];

const SCENES = NODES.map(() => 1900);

function pathOf(n: Node) {
  const mid = (n.x + CX) / 2;
  return `M ${n.x} ${n.y} C ${mid} ${n.y}, ${mid} ${CY}, ${CX} ${CY}`;
}

/** Every way to pay, wired into one place. */
export function PaymentsVisual({ bn }: { bn: boolean }) {
  const { ref, scene, moving } = useScenes(SCENES);
  const active = NODES[scene];

  return (
    <Stage light="center" innerRef={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{ width: W, height: H }}>
        <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
          <defs>
            {NODES.map((n, i) => {
              const right = n.x > CX;
              const from = right ? n.x + 10 : n.x - 10;
              // The window of light slides from the logo to the middle.
              const reach = 70;
              const a = right ? [from, CX - reach] : [from - reach, CX];
              const b = right ? [from + reach, CX] : [from, CX + reach];
              return (
                <motion.linearGradient
                  key={n.id}
                  id={`beam-${n.id}`}
                  gradientUnits="userSpaceOnUse"
                  y1={0}
                  y2={0}
                  initial={{ x1: -200, x2: -190 }}
                  animate={moving ? { x1: a, x2: b } : { x1: -200, x2: -190 }}
                  transition={
                    moving
                      ? { duration: 1.35, ease: [0.45, 0, 0.25, 1], repeat: Infinity, repeatDelay: 0.25, delay: i * 0.26 }
                      : { duration: 0 }
                  }
                >
                  <stop stopColor="#fff" stopOpacity={0} />
                  <stop offset="35%" stopColor="#ffd9c8" />
                  <stop offset="65%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#ffb08f" stopOpacity={0} />
                </motion.linearGradient>
              );
            })}
          </defs>
          {NODES.map((n) => (
            <g key={n.id} strokeLinecap="round">
              <path d={pathOf(n)} stroke="#fff" strokeOpacity={0.28} strokeWidth={2} />
              <path d={pathOf(n)} stroke={`url(#beam-${n.id})`} strokeWidth={4} />
            </g>
          ))}
        </svg>

        {/* The middle */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: CX, top: CY }}>
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-[30px] border border-white/40"
              animate={moving ? { scale: [1, 1.5], opacity: [0.5, 0] } : { opacity: 0 }}
              transition={moving ? { duration: 2.6, ease: "easeOut", repeat: Infinity, delay: i * 1.3 } : { duration: 0 }}
            />
          ))}
          <span className={`relative flex size-[98px] items-center justify-center rounded-[30px] bg-white ${CARD_SHADOW}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-icon.png" alt="" className="h-[58px] w-auto" />
          </span>
        </div>

        {NODES.map((n) => (
          <motion.span
            key={n.id}
            className={`absolute flex h-[66px] w-[84px] items-center justify-center rounded-[20px] bg-white p-2.5 ${CARD_SHADOW}`}
            style={{ left: n.x - 42, top: n.y - 33 }}
            animate={{ scale: active.id === n.id ? 1.08 : 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={n.src} alt="" className={`max-h-full max-w-full object-contain ${n.id === "rocket" ? "rounded-lg" : ""}`} />
          </motion.span>
        ))}
      </div>

      {/* What just arrived */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 22, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.96, transition: { duration: 0.16 } }}
            transition={{ duration: 0.55, ease: OUT }}
            className={`flex h-12 items-center gap-3 rounded-full bg-white pr-5 pl-2 text-[#171717] ${CARD_SHADOW}`}
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-[#12804a] text-white">
              <Check className="size-4" strokeWidth={3} />
            </span>
            <span className="text-[13px] font-semibold text-[#5d5854]">
              {active.id === "cod" ? (bn ? "ক্যাশ অন ডেলিভারি" : "Cash on Delivery") : bn ? "পেমেন্ট এসেছে" : "Payment received"}
            </span>
            <span className="text-[16px] font-extrabold tracking-tight tabular-nums">{bn ? active.paid?.bn : active.paid?.en}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </Stage>
  );
}
