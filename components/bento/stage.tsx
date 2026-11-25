"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

// Fine film grain, so the long dark gradients never band.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** The light every tile shares with the hero: the same ember horizon, coming
 * from a different side in each tile so the six read as one lit room. */
function ember(at: string, size: string) {
  return `radial-gradient(${size} at ${at}, #ff7a45 0%, #e8592a 16%, #a83c16 32%, #4d1d0e 52%, rgba(12,10,13,0) 76%)`;
}

export const BOARD_W = 396;
export const BOARD_H = 380;

const LIGHT = {
  bottom: ember("50% 118%", "95% 78%"),
  // A night sky: no ember wash. The tile draws its own sun and stars.
  space: "radial-gradient(110% 100% at 50% 50%, #12101a 0%, #09080f 55%, #050508 100%)",
  topRight: ember("104% -8%", "95% 92%"),
  bottomLeft: ember("-6% 108%", "98% 88%"),
  top: ember("50% -22%", "100% 82%"),
  bottomRight: ember("106% 108%", "98% 88%"),
};

export function Stage({
  light,
  innerRef,
  children,
}: {
  light: keyof typeof LIGHT;
  innerRef?: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  // Every visual is drawn once, on a 396 by 380 board, and the whole board
  // scales to the tile. Nothing inside it ever reflows or truncates on a phone.
  const own = useRef<HTMLDivElement>(null);
  const root = innerRef ?? own;
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const watch = new ResizeObserver(([entry]) => setScale(Math.min(entry.contentRect.width / BOARD_W, 1.12)));
    watch.observe(el);
    return () => watch.disconnect();
  }, [root]);

  return (
    <div
      ref={root}
      aria-hidden
      className="relative isolate overflow-hidden rounded-[22px] bg-[#0c0a0d] text-white select-none"
      style={{ height: BOARD_H * scale }}
    >
      <div className="absolute inset-0 -z-10" style={{ background: LIGHT[light] }} />
      <div className="absolute inset-0 -z-10 opacity-[0.16] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      <div
        className="absolute top-0 left-1/2 origin-top"
        style={{ width: BOARD_W, height: BOARD_H, marginLeft: -BOARD_W / 2, transform: `scale(${scale})` }}
      >
        {children}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-white/10 ring-inset" />
    </div>
  );
}

/**
 * A looping timeline: returns the current scene. `durations` is how long each
 * scene holds, in ms. Runs only while the tile is on screen; with reduced motion
 * it rests on the last scene, which every visual draws as its finished state.
 */
export function useScenes(durations: readonly number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduced = useReducedMotion() === true;
  const [scene, setScene] = useState(0);
  const last = durations.length - 1;

  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setTimeout(() => setScene((s) => (s >= last ? 0 : s + 1)), durations[scene]);
    return () => window.clearTimeout(id);
  }, [reduced, inView, scene, last, durations]);

  return { ref, scene: reduced ? last : scene, moving: inView && !reduced };
}

/** Types `text` out while `active`; shows all of it otherwise. */
export function useTyped(text: string, active: boolean, ms: number) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    setCount(0);
    const chars = Array.from(text).length;
    const id = window.setInterval(() => setCount((c) => Math.min(c + 1, chars)), ms);
    return () => window.clearInterval(id);
  }, [text, active, ms]);
  return active ? Array.from(text).slice(0, count).join("") : text;
}

/** Exponential ease-out, used by every entrance here. */
export const OUT = [0.16, 1, 0.3, 1] as const;

export const CARD_SHADOW = "shadow-[0_28px_60px_-18px_rgba(0,0,0,0.65)]";
