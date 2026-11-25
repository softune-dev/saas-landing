"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";
import { CARD_SHADOW, Stage, useScenes } from "./stage";

const W = 396;
const H = 380;
const CX = W / 2;
const CY = H / 2; // dead centre, so a full orbit stays inside the tile
const RING = 134;
const DOT = 62;
const TURN_MS = 42_000; // one slow lap

const LOGOS = [
  { id: "bkash", src: "/bento/bkash.webp", size: "w-[36px]" },
  { id: "sslcommerz", src: "/bento/sslcommerz.webp", size: "w-[50px]" },
  { id: "cod", src: "/bento/cod-mark.webp", darkSrc: "/bento/cod-dark.webp", size: "w-[44px]" },
  { id: "softunepay", src: "/bento/softune-pay-mark.webp", size: "w-[36px]" },
  { id: "nagad", src: "/bento/nagad-mark.webp", size: "w-[34px]" },
];

const CIRCLE = `flex items-center justify-center rounded-full bg-white ring-1 ring-transparent dark:bg-[#1d1a1c] dark:ring-white/15 ${CARD_SHADOW}`;

// Rounded so the server and the browser always print the same numbers.
function polar(radius: number, angle: number) {
  const x = Math.round((CX + radius * Math.cos(angle)) * 100) / 100;
  const y = Math.round((CY + radius * Math.sin(angle)) * 100) / 100;
  return { x, y };
}

/** Where logo `i` sits, and the swirled arm from it into the middle, once the
 * whole wheel has turned by `turn` radians. */
function place(i: number, turn: number) {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / LOGOS.length + turn;
  const node = polar(RING, angle);
  const a = polar(RING * 0.8, angle + 0.5);
  const b = polar(RING * 0.42, angle + 0.56);
  return { node, d: `M ${node.x} ${node.y} C ${a.x} ${a.y}, ${b.x} ${b.y}, ${CX} ${CY}` };
}

const IDLE = [1000] as const;

/* The night sky, the same on server and browser. It reaches past the board so a
 * wider tile still has stars at its edges. */
const STARS = (() => {
  let state = 424243;
  const next = () => {
    state = (state * 48271) % 2147483647;
    return state / 2147483647;
  };
  return Array.from({ length: 110 }, (_, i) => {
    const x = +(-130 + next() * (W + 260)).toFixed(1);
    const y = +(next() * H).toFixed(1);
    const size = next();
    return {
      x,
      y,
      r: size > 0.93 ? 1.5 : size > 0.65 ? 1 : 0.65,
      o: +(0.22 + next() * 0.5).toFixed(2),
      twinkle: i % 9 === 0 ? (i % 2 === 0 ? 1 : 2) : 0,
    };
  }).filter((s) => Math.hypot(s.x - CX, s.y - CY) > 62);
})();

/** Every way to pay, circling one place and always wired to it. */
export function PaymentsVisual() {
  const { ref, moving } = useScenes(IDLE);
  const turn = useRef(0);
  const dots = useRef<(HTMLSpanElement | null)[]>([]);
  const arms = useRef<(SVGGElement | null)[]>([]);

  // A logo and its arm are redrawn from one angle in the same frame, so they can
  // never drift apart. Written straight to the DOM: no re-render per frame.
  useAnimationFrame((_, delta) => {
    if (!moving) return;
    turn.current = (turn.current + (Math.min(delta, 50) / TURN_MS) * 2 * Math.PI) % (2 * Math.PI);
    LOGOS.forEach((_logo, i) => {
      const { node, d } = place(i, turn.current);
      const dot = dots.current[i];
      if (dot) dot.style.transform = `translate(${node.x - DOT / 2}px, ${node.y - DOT / 2}px)`;
      arms.current[i]?.querySelectorAll("path").forEach((path) => path.setAttribute("d", d));
    });
  });

  return (
    <Stage light="space" innerRef={ref}>
      <style>{"@keyframes pay-beam { from { stroke-dashoffset: 26 } to { stroke-dashoffset: -100 } } @keyframes pay-star { 50% { opacity: 0.25 } }"}</style>

      {/* Stars: two small groups twinkle, the rest hold still. */}
      <svg className="absolute inset-0 overflow-visible" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {[0, 1, 2].map((group) => (
          <g
            key={group}
            style={
              group === 0
                ? undefined
                : { animation: `pay-star ${group * 1.7 + 1.6}s ease-in-out infinite`, animationPlayState: moving ? "running" : "paused" }
            }
          >
            {STARS.filter((s) => s.twinkle === group).map((s) => (
              <circle key={`${s.x}-${s.y}`} cx={s.x} cy={s.y} r={s.r} fill="#fff" fillOpacity={s.o} />
            ))}
          </g>
        ))}
      </svg>

      {/* The sun's light stays close to the middle. */}
      <div
        className="absolute size-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: CX,
          top: CY,
          background: "radial-gradient(closest-side, rgba(255,150,80,0.55) 38%, rgba(255,108,50,0.2) 60%, rgba(255,90,40,0.05) 80%, rgba(255,90,40,0) 100%)",
        }}
      />

      <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
        {LOGOS.map((logo, i) => {
          const { d } = place(i, 0);
          const beam = {
            animation: `pay-beam 1.9s cubic-bezier(0.45, 0, 0.25, 1) ${i * 0.38}s infinite both`,
            animationPlayState: moving ? "running" : "paused",
          } as const;
          return (
            <g
              key={logo.id}
              ref={(el) => {
                arms.current[i] = el;
              }}
              strokeLinecap="round"
            >
              <path d={d} stroke="#fff" strokeOpacity={0.3} strokeWidth={1.75} />
              {/* The travelling light: a soft long tail under a short bright head. */}
              <path d={d} pathLength={100} stroke="#ffb08f" strokeOpacity={0.45} strokeWidth={4} strokeDasharray="26 200" style={beam} />
              <path d={d} pathLength={100} stroke="#fff" strokeWidth={2.5} strokeDasharray="10 200" style={beam} />
            </g>
          );
        })}
      </svg>

      {/* The middle */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: CX, top: CY }}>
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border border-[#ffb182]/50"
            animate={moving ? { scale: [1, 1.5], opacity: [0.5, 0] } : { opacity: 0 }}
            transition={moving ? { duration: 2.6, ease: "easeOut", repeat: Infinity, delay: i * 1.3 } : { duration: 0 }}
          />
        ))}
        <span className={`relative size-[92px] ${CIRCLE} !shadow-[0_0_28px_4px_rgba(255,140,70,0.55)]`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-icon.png" alt="" className="h-[50px] w-auto" />
        </span>
      </div>

      {LOGOS.map((logo, i) => {
        const { node } = place(i, 0);
        return (
          <span
            key={logo.id}
            ref={(el) => {
              dots.current[i] = el;
            }}
            className={`absolute top-0 left-0 will-change-transform ${CIRCLE}`}
            style={{ width: DOT, height: DOT, transform: `translate(${node.x - DOT / 2}px, ${node.y - DOT / 2}px)` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt="" className={`${logo.size} h-auto ${logo.darkSrc ? "dark:hidden" : ""}`} />
            {logo.darkSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo.darkSrc} alt="" className={`${logo.size} hidden h-auto dark:block`} />
            ) : null}
          </span>
        );
      })}
    </Stage>
  );
}
