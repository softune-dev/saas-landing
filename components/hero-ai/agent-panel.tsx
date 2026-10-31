"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MaskIcon } from "@/components/ui/mask-icon";
import type { Scenario } from "./scenarios";

type Locale = "en" | "bn";
const EASE = [0.16, 1, 0.3, 1] as const;
const THINK_MS = 900;

/** The left side of the window, modelled on how coding agents (Cursor, Lovable)
 * show a run: small type, hairlines instead of boxes, no progress bar. An
 * earlier exchange sits at the top; your request is a plain grey block; the
 * reply is a "Thinking" line that settles to "Thought for 2s", one line per
 * action (spinner and shimmering verb while it runs, then a check and the past
 * tense), then a short closing message. Content is anchored to the input, with
 * older messages fading out above, so the panel is always full. */
export function AgentPanel({ scenario, sent, done, locale }: { scenario: Scenario; sent: boolean; done: number; locale: Locale }) {
  const isBn = locale === "bn";
  const total = scenario.steps.length;
  const finished = sent && done >= total;

  const [thinking, setThinking] = useState(false);
  useEffect(() => {
    if (!sent) {
      setThinking(false);
      return;
    }
    setThinking(true);
    const id = window.setTimeout(() => setThinking(false), THINK_MS);
    return () => window.clearTimeout(id);
  }, [sent, scenario.id]);

  const visibleSteps = sent && !thinking ? scenario.steps.slice(0, Math.min(done + 1, total)) : [];
  const closing = scenario.result[locale].split(" ");

  return (
    <div className="flex h-full flex-col text-[12.5px] leading-[1.55]">
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-[var(--color-line)] px-4">
        <MaskIcon src="/icons/ai.svg" className="size-3.5 text-[var(--color-brand)]" />
        <span className="text-[12px] font-semibold text-[var(--color-ink)]">SoftuneBD AI</span>
      </div>

      <div className="flex min-h-[280px] flex-1 flex-col justify-end gap-3.5 overflow-hidden px-4 py-4 [mask-image:linear-gradient(to_bottom,transparent,black_32px)]">
        <div className="flex flex-col gap-2.5 opacity-55">
          <p className="rounded-lg bg-[var(--color-search-bg)] px-3 py-2 text-[var(--color-ink)]">{scenario.history.user[locale]}</p>
          <p className="text-[var(--color-ink)]">{scenario.history.ai[locale]}</p>
        </div>

        {sent ? (
          <motion.p
            key={scenario.id + locale}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="rounded-lg bg-[var(--color-search-bg)] px-3 py-2 text-[var(--color-ink)]"
          >
            {scenario.prompt[locale]}
          </motion.p>
        ) : (
          <p className="rounded-lg border border-dashed border-[var(--color-line)] px-3 py-2 text-[var(--color-muted)]">{isBn ? "আপনার নির্দেশ এখানে আসবে" : "Your request shows up here"}</p>
        )}

        {sent ? (
          <div key={scenario.id + locale + "reply"} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[var(--color-muted)]">
              <motion.span
                className="flex size-3.5 items-center justify-center text-[var(--color-brand)]"
                animate={thinking ? { rotate: 360 } : { rotate: 0 }}
                transition={thinking ? { duration: 2.2, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
              >
                <MaskIcon src="/icons/ai.svg" className="size-3.5" />
              </motion.span>
              <span className={thinking ? "ai-shimmer font-medium text-[var(--color-ink)]" : ""}>
                {thinking ? (isBn ? "ভাবছি…" : "Thinking…") : isBn ? "২ সেকেন্ড ভেবেছি" : "Thought for 2s"}
              </span>
            </div>

            {visibleSteps.map((step, i) => {
              const isDone = i < done;
              const text = isDone ? step.done[locale] : step.doing[locale];
              const verb = <span className={isDone ? "text-[var(--color-muted)]" : "ai-shimmer font-medium text-[var(--color-ink)]"}>{text}</span>;
              const chip = <span className="rounded bg-[var(--color-search-bg)] px-1.5 py-px font-medium text-[var(--color-ink)]">{step.label[locale]}</span>;
              return (
                <motion.div key={scenario.id + i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }} className="flex items-center gap-2">
                  <span className="flex size-3.5 shrink-0 items-center justify-center">
                    {isDone ? (
                      <svg viewBox="0 0 12 12" className="size-3.5 text-[var(--color-brand)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="m2.5 6.4 2.3 2.3 4.7-5" />
                      </svg>
                    ) : (
                      <motion.svg viewBox="0 0 16 16" className="size-3.5 text-[var(--color-brand)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} aria-hidden>
                        <path d="M8 2a6 6 0 1 0 6 6" />
                      </motion.svg>
                    )}
                  </span>
                  <span className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5">
                    {isBn ? (
                      <>
                        {chip}
                        {verb}
                      </>
                    ) : (
                      <>
                        {verb}
                        {chip}
                      </>
                    )}
                  </span>
                </motion.div>
              );
            })}

            {finished ? (
              <p className="pt-1 text-[var(--color-ink)]">
                {closing.map((w, i) => (
                  <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.06, duration: 0.25 }} className="inline-block whitespace-pre">
                    {w}
                    {i < closing.length - 1 ? " " : ""}
                  </motion.span>
                ))}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="shrink-0 p-3 pt-0">
        <div className="flex items-center gap-2 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] py-1.5 pr-1.5 pl-3" aria-hidden>
          <span className="min-w-0 flex-1 truncate text-[12px] text-[var(--color-muted-soft)]">{isBn ? "SoftuneBD AI-কে জিজ্ঞেস করুন…" : "Ask SoftuneBD AI…"}</span>
          <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand)] text-white">
            <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 10V2.5M2.8 5.5 6 2.3l3.2 3.2" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
