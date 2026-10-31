"use client";

import { motion } from "framer-motion";

/** The auto-written prompt: plain text, each word simply fades in. No caret, no
 * colour change, no blur. */
export function PromptText({ id, words, shown }: { id: string; words: string[]; shown: number }) {
  return (
    <p key={id} className="text-[14.5px] leading-relaxed text-[var(--color-ink)] md:text-[15.5px]">
      {words.slice(0, shown).map((word, i) => (
        <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="inline-block whitespace-pre">
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </p>
  );
}
