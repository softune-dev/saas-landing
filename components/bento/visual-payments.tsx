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
    <Stage light="center" innerRef={ref}>
      <style>{"@keyframes pay-beam { from { stroke-dashoffset: 26 } to { stroke-dashoffset: -100 } }"}</style>

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
            className="absolute inset-0 rounded-full border border-white/40"
            animate={moving ? { scale: [1, 1.5], opacity: [0.5, 0] } : { opacity: 0 }}
            transition={moving ? { duration: 2.6, ease: "easeOut", repeat: Infinity, delay: i * 1.3 } : { duration: 0 }}
          />
        ))}
        <span className={`relative size-[92px] ${CIRCLE}`}>
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
