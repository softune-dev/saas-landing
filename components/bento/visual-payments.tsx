"use client";

import { motion } from "framer-motion";
import { CARD_SHADOW, Stage, useScenes } from "./stage";

const W = 396;
const H = 380;
const CX = W / 2;
const CY = 202;
const RING = 138;
const DOT = 80;

const LOGOS = [
  { id: "bkash", src: "/bento/bkash.webp", size: "w-[50px]" },
  { id: "sslcommerz", src: "/bento/sslcommerz.webp", size: "w-[66px]" },
  { id: "cod", src: "/bento/cod-mark.webp", darkSrc: "/bento/cod-dark.webp", size: "w-[56px]" },
  { id: "softunepay", src: "/bento/softune-pay-mark.webp", size: "w-[48px]" },
  { id: "nagad", src: "/bento/nagad-mark.webp", size: "w-[46px]" },
];

// Five equal steps round the middle, starting at the top.
const NODES = LOGOS.map((logo, i) => {
  const angle = ((-90 + i * 72) * Math.PI) / 180;
  return { ...logo, x: CX + RING * Math.cos(angle), y: CY + RING * Math.sin(angle) };
});

const CIRCLE = `flex items-center justify-center rounded-full bg-white ring-1 ring-transparent dark:bg-[#1d1a1c] dark:ring-white/15 ${CARD_SHADOW}`;

const IDLE = [1000] as const;

/** Every way to pay, wired into one place. */
export function PaymentsVisual() {
  const { ref, moving } = useScenes(IDLE);

  return (
    <Stage light="center" innerRef={ref}>
      <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
        <defs>
          {NODES.map((n, i) => {
            // A short window of light that slides from the logo to the middle.
            const at = (t: number) => ({ x: n.x + (CX - n.x) * t, y: n.y + (CY - n.y) * t });
            const from = [at(-0.1), at(0.3)];
            const to = [at(0.85), at(1.25)];
            return (
              <motion.linearGradient
                key={n.id}
                id={`beam-${n.id}`}
                gradientUnits="userSpaceOnUse"
                initial={{ x1: -200, y1: -200, x2: -190, y2: -190 }}
                animate={
                  moving
                    ? {
                        x1: [from[0].x, to[0].x],
                        y1: [from[0].y, to[0].y],
                        x2: [from[1].x, to[1].x],
                        y2: [from[1].y, to[1].y],
                      }
                    : { x1: -200, y1: -200, x2: -190, y2: -190 }
                }
                transition={
                  moving
                    ? { duration: 1.3, ease: [0.45, 0, 0.25, 1], repeat: Infinity, repeatDelay: 0.3, delay: i * 0.32 }
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
            <path d={`M ${n.x} ${n.y} L ${CX} ${CY}`} stroke="#fff" strokeOpacity={0.28} strokeWidth={2} />
            <path d={`M ${n.x} ${n.y} L ${CX} ${CY}`} stroke={`url(#beam-${n.id})`} strokeWidth={4} />
          </g>
        ))}
      </svg>

      {/* The middle */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: CX, top: CY }}>
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border border-white/40"
            animate={moving ? { scale: [1, 1.5], opacity: [0.5, 0] } : { opacity: 0 }}
            transition={moving ? { duration: 2.6, ease: "easeOut", repeat: Infinity, delay: i * 1.3 } : { duration: 0 }}
          />
        ))}
        <span className={`relative size-[104px] ${CIRCLE}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-icon.png" alt="" className="h-[56px] w-auto" />
        </span>
      </div>

      {NODES.map((n) => (
        <span
          key={n.id}
          className={`absolute ${CIRCLE}`}
          style={{ left: n.x - DOT / 2, top: n.y - DOT / 2, width: DOT, height: DOT }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={n.src} alt="" className={`${n.size} h-auto ${n.darkSrc ? "dark:hidden" : ""}`} />
          {n.darkSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={n.darkSrc} alt="" className={`${n.size} hidden h-auto dark:block`} />
          ) : null}
        </span>
      ))}
    </Stage>
  );
}
