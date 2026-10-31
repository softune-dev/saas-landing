"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MaskIcon } from "@/components/ui/mask-icon";
import type { Scenario } from "./scenarios";

type Locale = "en" | "bn";
const EASE = [0.16, 1, 0.3, 1] as const;

/** The agent's run, drawn like a git graph: the prompt is the first commit,
 * each step is a node on the main line, sub-tasks branch off it while the step
 * runs, and the result merges back in at the end. The line fills with brand
 * colour as the run progresses, so progress is read from the shape itself. */
export function AgentTree({
  scenario,
  sent,
  done,
  locale,
}: {
  scenario: Scenario;
  sent: boolean;
  done: number;
  locale: Locale;
}) {
  const isBn = locale === "bn";
  const total = scenario.steps.length;
  const finished = sent && done >= total;
  const seconds = (scenario.steps.reduce((sum, s) => sum + s.ms, 0) / 1000).toFixed(1);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 border-b border-[var(--color-line)] px-4 py-3">
        <span className="flex size-7 items-center justify-center rounded-lg bg-[var(--color-brand)] text-white shadow-[0_6px_16px_-6px_rgba(255,90,54,0.8)]">
          <MaskIcon src="/icons/ai.svg" className="size-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] leading-tight font-bold text-[var(--color-ink)]">{isBn ? "এজেন্ট রান" : "Agent run"}</p>
          <p className="truncate text-[11px] leading-tight text-[var(--color-muted)]">ai/{scenario.id}-{isBn ? "পরিবর্তন" : "changes"}</p>
        </div>
        <RunStatus sent={sent} finished={finished} seconds={seconds} isBn={isBn} />
      </div>

      <div className="relative flex-1 px-4 pt-4 pb-3">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="relative flex flex-col"
        >
            <Node state={sent ? "done" : "active"} variant="commit">
              <p className="line-clamp-2 text-[12.5px] leading-snug font-semibold text-[var(--color-ink)]">
                {sent ? scenario.prompt[locale] : isBn ? "আপনার নির্দেশের অপেক্ষায়" : "Waiting for your prompt"}
              </p>
              <p className="mt-0.5 text-[11px] text-[var(--color-muted)]">{isBn ? "আপনি · এইমাত্র" : "you · just now"}</p>
            </Node>

            {scenario.steps.map((step, i) => {
              const state = !sent ? "idle" : i < done ? "done" : i === done ? "active" : "idle";
              const showBranch = step.branch && (state === "active" || state === "done");
              return (
                <div key={i} className="contents">
                  <Node state={state}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className={["text-[12.5px] font-semibold", state === "idle" ? "text-[var(--color-muted)]" : "text-[var(--color-ink)]"].join(" ")}>
                        {step.label[locale]}
                      </span>
                      <span className="shrink-0 text-[11px] text-[var(--color-muted)] tabular-nums">
                        {state === "done" ? `${(step.ms / 1000).toFixed(2)}s` : state === "active" ? (isBn ? "চলছে" : "running") : ""}
                      </span>
                    </div>
                  </Node>
                  {showBranch
                    ? step.branch!.map((b, j) => (
                        <Branch key={j} index={j} done={state === "done"} label={b[locale]} />
                      ))
                    : null}
                </div>
              );
            })}

            <Node state={finished ? "merged" : "idle"} variant="merge" last>
              <span className={["text-[12.5px] font-semibold", finished ? "text-[var(--color-brand)]" : "text-[var(--color-muted)]"].join(" ")}>
                {scenario.result[locale]}
              </span>
            </Node>
        </motion.div>
      </div>
    </div>
  );
}

function RunStatus({ sent, finished, seconds, isBn }: { sent: boolean; finished: boolean; seconds: string; isBn: boolean }) {
  const label = !sent ? (isBn ? "অপেক্ষা" : "Idle") : finished ? `${isBn ? "সম্পন্ন" : "Done"} · ${seconds}s` : isBn ? "চলছে" : "Running";
  return (
    <span
      className={[
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-500",
        finished ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400" : sent ? "bg-[var(--color-brand)]/10 text-[var(--color-brand)]" : "bg-[var(--color-search-bg)] text-[var(--color-muted)]",
      ].join(" ")}
    >
      <span className="relative flex size-1.5">
        {sent && !finished ? <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-60" /> : null}
        <span className="relative size-1.5 rounded-full bg-current" />
      </span>
      {label}
    </span>
  );
}

type NodeState = "idle" | "active" | "done" | "merged";

/** One row on the main line. The rail segment below the node is drawn by the
 * row itself, so branches and rows stack without measuring anything. */
function Node({
  state,
  children,
  variant = "step",
  last = false,
}: {
  state: NodeState;
  children: React.ReactNode;
  variant?: "commit" | "step" | "merge";
  last?: boolean;
}) {
  const lit = state === "done" || state === "merged";
  return (
    <div className="relative grid grid-cols-[20px_minmax(0,1fr)] gap-x-3 pb-4">
      {!last ? (
        <span aria-hidden className="absolute top-5 bottom-0 left-[9px] w-[2px] overflow-hidden rounded-full bg-[var(--color-line)]">
          <motion.span
            className="absolute inset-x-0 top-0 bg-[var(--color-brand)]"
            initial={false}
            animate={{ height: lit ? "100%" : "0%" }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </span>
      ) : null}
      <span className="relative z-10 mt-0.5 flex size-5 items-center justify-center">
        {state === "active" ? (
          <motion.span
            className="absolute inset-0 rounded-full bg-[var(--color-brand)]/25"
            animate={{ scale: [1, 1.7, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
        ) : null}
        <span
          className={[
            "relative flex items-center justify-center transition-all duration-300",
            variant === "merge" ? "size-3.5 rotate-45 rounded-[3px]" : variant === "commit" ? "size-3.5 rounded-full" : "size-3 rounded-full",
            lit
              ? "bg-[var(--color-brand)] shadow-[0_0_0_3px_var(--color-surface),0_4px_10px_-2px_rgba(255,90,54,0.7)]"
              : state === "active"
                ? "border-2 border-[var(--color-brand)] bg-[var(--color-surface)]"
                : "border-2 border-[var(--color-line)] bg-[var(--color-surface)]",
          ].join(" ")}
        />
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

/** A sub-task forking off the main line with a rounded elbow. */
function Branch({ index, done, label }: { index: number; done: boolean; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6, filter: "blur(3px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      transition={{ delay: index * 0.12, duration: 0.4, ease: EASE }}
      className="relative -mt-2 grid grid-cols-[20px_minmax(0,1fr)] gap-x-3 pb-2"
    >
      <span aria-hidden className="absolute top-0 bottom-0 left-[9px] w-[2px] bg-[var(--color-brand)]/70" />
      <span aria-hidden className="relative">
        <span
          className={[
            "absolute top-0 left-[9px] h-3 w-4 rounded-bl-lg border-b-2 border-l-2 transition-colors duration-300",
            done ? "border-[var(--color-brand)]/70" : "border-[var(--color-brand)]/40",
          ].join(" ")}
        />
      </span>
      <span className="ml-2 inline-flex w-fit items-center gap-1.5 rounded-md border border-[var(--color-line)] bg-[var(--color-canvas)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-ink)]">
        <span className={["size-1.5 rounded-full transition-colors duration-300", done ? "bg-[var(--color-brand)]" : "bg-[var(--color-muted)]/50"].join(" ")} />
        {label}
      </span>
    </motion.div>
  );
}
