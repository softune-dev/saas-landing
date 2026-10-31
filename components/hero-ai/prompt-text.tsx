"use client";

import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The auto-written prompt. Words arrive one at a time out of a soft blur,
 * the newest two still glowing in brand colour as if the ink is wet, with a
 * lit caret riding the end. When the prompt is "sent" the whole line lifts
 * and dissolves, and the next one writes itself in. */
export function PromptText({ id, words, shown, sent }: { id: string; words: string[]; shown: number; sent: boolean }) {
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={id}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
        transition={{ duration: 0.35, ease: EASE }}
        className="text-[14.5px] leading-relaxed text-[var(--color-ink)] md:text-[15.5px]"
      >
        {words.slice(0, shown).map((word, i) => {
          const fresh = !sent && i >= shown - 2;
          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 5, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="inline-block whitespace-pre transition-colors duration-700"
              style={{ color: fresh ? "var(--color-brand)" : undefined }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          );
        })}
        {!sent ? (
          <motion.span
            aria-hidden
            layout
            className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[3px] rounded-full bg-[var(--color-brand)] shadow-[0_0_10px_2px_rgba(255,90,54,0.55)]"
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}
      </motion.p>
    </AnimatePresence>
  );
}
