"use client";

import { motion } from "framer-motion";

/** The agent, drawn as a collaborator's cursor on the canvas (the same idea as a
 * multiplayer design tool): an arrow with a name tag that glides to whatever
 * part of the store the AI is working on. Positions are in container-width
 * units (cqw), so it lands on the same spot at any window size. */
export function AiCursor({ x, y, working, label }: { x: number; y: number; working: boolean; label: string }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-30"
      initial={false}
      animate={{ left: `${x}cqw`, top: `${y}cqw` }}
      transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
    >
      <motion.div
        animate={working ? { x: [0, 3, -2, 0], y: [0, -2, 3, 0] } : { x: 0, y: 0 }}
        transition={working ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
          <path d="M4 2.5 20 10.2l-7.6 2.3L9.9 20 4 2.5Z" fill="#ff5a36" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        <span className="mt-0.5 ml-3.5 inline-block rounded-full bg-[#ff5a36] px-2 py-[2px] text-[11px] leading-[1.4] font-semibold whitespace-nowrap text-white">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}
