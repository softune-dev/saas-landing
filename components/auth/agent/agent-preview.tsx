"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { ensureGoogleFont } from "@/lib/google-fonts";
import { HEADING_FONTS } from "../trial-theme-step";
import { categoryLabel, slugify, t, templateFor, type Locale, type StepId } from "./agent-copy";
import type { Draft } from "./agent-transcript";
import { Check } from "lucide-react";
import { BRAND_GRADIENT } from "./agent-ui";

export type BuildState = { started: boolean; finished: boolean; pct: number };

/**
 * The store the agent is making, updating as the merchant answers: the name
 * lands in the address bar and the nav, the design swaps in, the brand color
 * shows on the button, and during the build a scan line sweeps it until it
 * goes live. This is the payoff that makes the chat feel like it's *doing*
 * something rather than collecting a form.
 */
export function StorePreview({
  locale,
  draft,
  isDone,
  build,
}: {
  locale: Locale;
  draft: Draft;
  isDone: (s: StepId) => boolean;
  build: BuildState;
}) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  const reduced = useReducedMotion();
  const tpl = templateFor(draft.templateKey);
  const slug = slugify(draft.name);
  const hasLook = isDone("look");
  const status = build.finished ? "live" : build.started ? "building" : "draft";
  // Picked font names are stored as keys; the preview needs the face itself.
  const headingFont = HEADING_FONTS.find((f) => f.value === draft.displayFont)?.label ?? draft.displayFont;
  useEffect(() => {
    ensureGoogleFont(headingFont);
  }, [headingFont]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-[1.6rem] border border-white/[0.09] bg-[#0f0f0f]">
        <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-3.5 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </span>
          <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[12px] text-white/50">
            <svg viewBox="0 0 16 16" className="size-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
              <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
            </svg>
            <span className="truncate">
              <span className={slug ? "text-white" : "text-white/35"}>{slug || "yourshop"}</span>.softunebd.com
            </span>
          </span>
          <StatusChip status={status} locale={locale} />
        </div>

        <div className="relative aspect-[4/5] overflow-hidden bg-[#0c0c0c] lg:aspect-auto lg:h-[min(58vh,560px)]">
          {/* Before a design is picked, a clean sketch of a storefront rather
              than a blurred screenshot: it reads as "not built yet", on
              purpose, and already wears the name and brand color. */}
          {hasLook ? (
            <AnimatePresence initial={false}>
              <motion.img
                key={tpl.image}
                src={tpl.image}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 size-full object-cover object-top pt-12"
              />
            </AnimatePresence>
          ) : (
            <Sketch color={draft.color} caption={draft.category ? categoryLabel(draft.category, locale) : L("Takes shape as you answer", "উত্তর দিলেই রূপ নিচ্ছে")} />
          )}

          {/* The merchant's own nav bar. */}
          <div className="absolute inset-x-0 top-0 flex h-12 items-center justify-between gap-3 border-b border-white/[0.07] bg-[#0f0f0f] px-4">
            {draft.name ? (
              <motion.span
                key={draft.name}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="truncate text-[17px] font-bold tracking-tight text-white"
                style={{ fontFamily: `"${headingFont}", var(--font-heading), serif` }}
              >
                {draft.name}
              </motion.span>
            ) : (
              <span className="h-3.5 w-24 rounded-full bg-white/10" />
            )}
            <span
              className="shrink-0 rounded-full px-3 py-1 text-[11.5px] font-semibold text-white transition-colors duration-500"
              style={{ backgroundColor: draft.color }}
            >
              {L("Shop now", "কিনুন")}
            </span>
          </div>
          {build.started && !build.finished && !reduced ? (
            <>
              <motion.div
                aria-hidden
                className="absolute inset-x-0 h-24"
                style={{ background: "linear-gradient(180deg, transparent, rgba(255,90,54,0.18), transparent)" }}
                animate={{ top: ["-20%", "100%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 bg-black/25" aria-hidden />
            </>
          ) : null}

          {build.started ? (
            <div className="absolute inset-x-4 bottom-4">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: BRAND_GRADIENT }}
                  animate={{ width: `${build.pct}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function StatusChip({ status, locale }: { status: "draft" | "building" | "live"; locale: Locale }) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  const map = {
    draft: { label: L("Draft", "ড্রাফট"), dot: "bg-white/40", cls: "text-white/60" },
    building: { label: L("Building", "তৈরি হচ্ছে"), dot: "bg-amber-400 animate-pulse", cls: "text-amber-200" },
    live: { label: L("Live", "লাইভ"), dot: "bg-emerald-400", cls: "text-emerald-200" },
  }[status];
  return (
    <span className={`flex shrink-0 items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold ${map.cls}`}>
      <span className={`size-1.5 rounded-full ${map.dot}`} />
      {map.label}
    </span>
  );
}

/** What the agent will do, ticking off live. */
export function AgentPlan({
  locale,
  current,
  isDone,
  build,
}: {
  locale: Locale;
  current: StepId;
  isDone: (s: StepId) => boolean;
  build: BuildState;
}) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  const tasks: { label: string; steps: StepId[] }[] = [
    { label: L("Understand your idea", "আইডিয়া বোঝা"), steps: ["idea"] },
    { label: L("Shop details", "শপের তথ্য"), steps: ["name", "category", "phone"] },
    { label: L("Pick a design", "ডিজাইন বাছাই"), steps: ["look"] },
    { label: L("Secure your account", "একাউন্ট সুরক্ষা"), steps: ["account", "verify"] },
    { label: L("Build and publish", "বানানো ও পাবলিশ"), steps: ["build"] },
  ];
  const states = tasks.map((task) => {
    const done = task.steps[0] === "build" ? build.finished : task.steps.every(isDone);
    const running = !done && (task.steps.includes(current) || (task.steps[0] === "build" && build.started));
    return done ? "done" : running ? "running" : "pending";
  });
  const doneCount = states.filter((x) => x === "done").length;

  // A numbered stepper on a rail: the line fills as steps complete, the
  // current step is the only bright row.
  return (
    <div className="rounded-3xl border border-white/[0.08] bg-[#0f0f0f] p-4">
      <div className="mb-3 flex items-center justify-between text-[12px]">
        <span className="font-medium text-white/50">{L("Agent plan", "এজেন্টের পরিকল্পনা")}</span>
        <span className="font-mono text-white/40">{doneCount}/{tasks.length}</span>
      </div>
      <ol className="flex flex-col">
        {tasks.map((task, i) => {
          const st = states[i]!;
          const last = i === tasks.length - 1;
          return (
            <li key={task.label} className="relative flex items-center gap-3 py-[7px]">
              {!last ? (
                <span
                  aria-hidden
                  className={`absolute top-[26px] left-[10px] h-[calc(100%-12px)] w-px ${st === "done" ? "bg-[#ff5a36]" : "bg-white/10"}`}
                />
              ) : null}
              <span
                className={[
                  "relative z-10 flex size-[21px] shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                  st === "done"
                    ? "bg-[#ff5a36] text-white"
                    : st === "running"
                      ? "border border-white/70 bg-[#0f0f0f] text-white"
                      : "border border-white/15 bg-[#0f0f0f] text-white/35",
                ].join(" ")}
              >
                {st === "done" ? <Check className="size-3" strokeWidth={3} /> : i + 1}
              </span>
              <span className={`text-[14px] ${st === "pending" ? "text-white/35" : st === "running" ? "font-medium text-white" : "text-white/60"}`}>
                {task.label}
              </span>
              {st === "running" ? (
                <span className="ai-shimmer ml-auto text-[12px] text-white/45">{L("In progress", "চলছে")}</span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
function Sketch({ color, caption }: { color: string; caption: string }) {
  const block = "rounded-lg bg-white/[0.05]";
  return (
    <div className="absolute inset-0 flex flex-col gap-4 px-4 pt-16 pb-5" aria-hidden>
      <div className="flex flex-col justify-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-5" style={{ minHeight: "34%" }}>
        <span className={`h-3.5 w-3/5 ${block}`} />
        <span className={`h-3.5 w-2/5 ${block}`} />
        <span className={`mt-1 h-2.5 w-1/2 ${block}`} />
        <span className="mt-2 h-7 w-24 rounded-full transition-colors duration-500" style={{ backgroundColor: color }} />
      </div>
      <div className="flex gap-2.5">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-7 flex-1 rounded-full bg-white/[0.04]" />
        ))}
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <span className="flex-1 rounded-lg bg-white/[0.05]" />
            <span className={`h-2 w-4/5 ${block}`} />
            <span className="h-2 w-2/5 rounded-full" style={{ backgroundColor: `${color}66` }} />
          </div>
        ))}
      </div>
      <p className="text-center text-[12.5px] text-white/40">{caption}</p>
    </div>
  );
}