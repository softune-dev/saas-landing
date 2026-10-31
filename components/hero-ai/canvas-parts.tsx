"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import type { Rect } from "./store-data";

const EASE = [0.16, 1, 0.3, 1] as const;

/** A part of the store, pinned to its rectangle (container units), fading in
 * once built. `cover` paints it opaque so it hides the starter template below. */
export function Part({ show, delay, rect, cover, children }: { show: boolean; delay: number; rect: Rect; cover?: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${rect.l}cqw`, top: `${rect.t}cqw`, width: `${rect.w}cqw`, height: `${rect.h}cqw`, backgroundColor: cover }}
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.55, delay: show ? delay : 0, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** One selection box that glides from part to part. */
export function WorkFrame({ rect, label, showLabel }: { rect: Rect; label: string; showLabel: boolean }) {
  const handle = "absolute size-[6px] rounded-[2px] border-[1.5px] border-[#ff5a36] bg-white";
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-20 border-[1.5px] border-[#ff5a36]"
      initial={false}
      animate={{ left: `${rect.l - 0.5}cqw`, top: `${rect.t - 0.4}cqw`, width: `${rect.w + 1}cqw`, height: `${rect.h + 0.8}cqw` }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
    >
      <span className={handle + " -top-[4px] -left-[4px]"} />
      <span className={handle + " -top-[4px] -right-[4px]"} />
      <span className={handle + " -bottom-[4px] -left-[4px]"} />
      <span className={handle + " -right-[4px] -bottom-[4px]"} />
      {showLabel ? (
        <span className="absolute bottom-full left-[-1.5px] mb-[3px] rounded-[4px] bg-[#ff5a36] px-1.5 py-[1px] text-[11px] leading-[1.5] font-semibold whitespace-nowrap text-white">{label}</span>
      ) : null}
    </motion.div>
  );
}

/** The image "developing": tiles that shimmer while the model works, then
 * dissolve in random order to reveal the picture underneath. */
export function Diffusion({ resolve = false }: { resolve?: boolean }) {
  const cells = useMemo(() => Array.from({ length: 10 * 6 }, (_, i) => ({ i, delay: Math.random(), hue: 18 + Math.random() * 22, light: 60 + Math.random() * 25 })), []);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 grid grid-cols-10 grid-rows-6">
      {cells.map((c) => (
        <motion.span
          key={c.i}
          style={{ backgroundColor: `hsl(${c.hue} 70% ${c.light}%)` }}
          initial={{ opacity: 1 }}
          animate={resolve ? { opacity: 0 } : { opacity: [1, 0.6, 0.95, 1] }}
          transition={resolve ? { delay: c.delay * 0.6, duration: 0.35, ease: "easeOut" } : { duration: 1.4 + c.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/** A flat gradient stand-in shown before the AI "shoots" a photo. */
export function Placeholder({ tone }: { tone: [string, string] }) {
  return (
    <span className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${tone[0]}, ${tone[1]})` }}>
      <span className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1.2px)", backgroundSize: "1.1cqw 1.1cqw" }} />
    </span>
  );
}
