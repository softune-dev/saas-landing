"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/** Thin progress bar pinned to the very top edge of the viewport, filling
 * left-to-right as the page scrolls — plus a soft, static glow riding the
 * fill's leading edge (no dot shape, no pulse animation). The glow is a
 * sibling, not a child, of the scaled fill bar: nesting it inside would
 * scale its width along with the bar's scaleX transform and stretch it.
 * framer-motion is already a dependency here, so this needs no new package. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });
  const tipLeft = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <motion.div
        className="h-full origin-left bg-[var(--color-brand)]"
        style={{ scaleX: progress }}
      />
      <motion.div
        className="absolute top-1/2 h-3 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-brand)] opacity-70 blur-[6px]"
        style={{ left: tipLeft }}
      />
    </div>
  );
}
