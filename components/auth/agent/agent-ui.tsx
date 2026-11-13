"use client";

import { ArrowRight, Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";

// Flat on purpose: the page is deep black and white, with the brand orange
// used as a solid accent only (checks, selection, progress). No gradients.
export const BRAND_GRADIENT = "#ff5a36";

/**
 * The agent's avatar: SoftuneBD's own logo mark. It pulses gently while the
 * agent is working, so its state is readable at a glance.
 */
export function AgentOrb({ size = 28, busy = false }: { size?: number; busy?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className="inline-flex shrink-0"
      style={{ width: size, height: size }}
      aria-hidden
      animate={busy && !reduced ? { opacity: [1, 0.55, 1] } : { opacity: 1 }}
      transition={busy ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" } : undefined}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-icon.png" alt="" width={size} height={size} className="size-full object-contain" />
    </motion.span>
  );
}

export type Tool = { label: string; detail?: string };

/** `**bold**` -> segments, so streamed replies can still emphasise a name. */
function tokenize(text: string) {
  const out: { word: string; bold: boolean }[] = [];
  text.split(/(\*\*[^*]+\*\*)/g).forEach((part) => {
    const bold = part.startsWith("**") && part.endsWith("**");
    const clean = bold ? part.slice(2, -2) : part;
    clean.split(/(\s+)/).forEach((w) => w && out.push({ word: w, bold }));
  });
  return out;
}

type Phase = "think" | "work" | "say" | "done";

/**
 * One agent turn, played like an agent actually works: a thinking beat,
 * then its steps run one by one (spinner, then check), then the reply
 * streams in word by word, and only then does whatever it's asking for
 * (chips, cards, a form) appear. Past turns render settled, instantly.
 */
export function AgentTurn({
  fresh,
  tools = [],
  text,
  children,
  onBusyChange,
  thinkingLabel = "Thinking…",
}: {
  fresh?: boolean;
  tools?: Tool[];
  text: string;
  children?: ReactNode;
  /** Lets the input show "Thinking…" while this turn is still playing. */
  onBusyChange?: (busy: boolean) => void;
  thinkingLabel?: string;
}) {
  const reduced = useReducedMotion();
  const animate = !!fresh && !reduced;
  const tokens = useMemo(() => tokenize(text), [text]);
  const [phase, setPhase] = useState<Phase>(animate ? "think" : "done");
  const [toolStep, setToolStep] = useState(animate ? 0 : tools.length);
  const [words, setWords] = useState(animate ? 0 : tokens.length);

  useEffect(() => {
    if (phase === "done") return;
    let id: number;
    if (phase === "think") {
      id = window.setTimeout(() => setPhase(tools.length ? "work" : "say"), 700);
    } else if (phase === "work") {
      id = window.setTimeout(() => {
        if (toolStep + 1 >= tools.length) {
          setToolStep(tools.length);
          setPhase("say");
        } else setToolStep((n) => n + 1);
      }, 520);
    } else {
      id = window.setTimeout(() => {
        if (words >= tokens.length) setPhase("done");
        else setWords((n) => Math.min(tokens.length, n + 2));
      }, 34);
    }
    return () => window.clearTimeout(id);
  }, [phase, toolStep, words, tools.length, tokens.length]);

  const busy = phase === "think" || phase === "work";
  const playing = phase !== "done";
  useEffect(() => {
    onBusyChange?.(playing);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- report phase changes only
  }, [playing]);

  return (
    // Chat-app layout: the orb is the avatar in a left gutter, the message
    // flows beside it. No repeated name label on every turn.
    <div className="flex gap-3">
      <div className="w-7 shrink-0 pt-px">
        <AgentOrb size={26} busy={busy} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 pt-[3px]">
      {phase === "think" ? (
        <span className="ai-shimmer text-[15px] leading-relaxed text-white/50">{thinkingLabel}</span>
      ) : null}

      {tools.length && phase !== "think" ? (
        <WorkLog>
          {tools.slice(0, phase === "work" ? toolStep + 1 : tools.length).map((tool, i) => (
            <ToolRow key={tool.label} state={phase !== "work" || i < toolStep ? "done" : "running"} detail={tool.detail}>
              {tool.label}
            </ToolRow>
          ))}
        </WorkLog>
      ) : null}

      {phase === "say" || phase === "done" ? (
        <p className="text-[15.5px] leading-relaxed text-white/90">
          {/* Settled turns show everything: their text can change later
              (an edited name) and must not stay cut at the old length. */}
          {tokens.slice(0, phase === "done" ? tokens.length : words).map((tk, i) =>
            tk.bold ? (
              <strong key={i} className="font-semibold text-white">{tk.word}</strong>
            ) : (
              <Fragment key={i}>{tk.word}</Fragment>
            ),
          )}
          {phase === "say" ? <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-[#ff8a3d]" /> : null}
        </p>
      ) : null}

      <AnimatePresence>
        {phase === "done" && children ? (
          <motion.div
            initial={animate ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
      </div>
    </div>
  );
}

export function WorkLog({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-white/[0.08] bg-[#0f0f0f] px-4 py-3.5">
      {children}
    </div>
  );
}

export function ToolRow({
  state,
  detail,
  children,
}: {
  state: "done" | "running" | "pending";
  detail?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-3 text-[14px] leading-snug"
    >
      <span className="relative mt-px flex size-[18px] shrink-0 items-center justify-center">
        {state === "done" ? (
          <motion.span
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            className="flex size-full items-center justify-center rounded-full text-white"
            style={{ background: BRAND_GRADIENT }}
          >
            <Check className="size-2.5" strokeWidth={3.5} />
          </motion.span>
        ) : state === "running" ? (
          <span className="size-full animate-spin rounded-full border-2 border-white/10 border-t-[#ff8a3d]" />
        ) : (
          <span className="size-2 rounded-full bg-white/20" />
        )}
      </span>
      {/* One column, never two sides: the label wraps if it must, and the
          detail sits under it as a small chip. Side-by-side text breaks at
          phone width. */}
      <span className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
        <span className={state === "pending" ? "text-white/35" : state === "running" ? "ai-shimmer text-white/90" : "text-white/80"}>
          {children}
        </span>
        {detail ? (
          <span className="max-w-full truncate rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 font-mono text-[11.5px] text-white/55">
            {detail}
          </span>
        ) : null}
      </span>
    </motion.div>
  );
}

/** The merchant's side. Shop answers can be changed until the build starts. */
export function UserBubble({
  children,
  onEdit,
  editLabel,
}: {
  children: ReactNode;
  onEdit?: () => void;
  editLabel?: string;
}) {
  return (
    <div className="group flex flex-col items-end gap-1.5">
      <div className="max-w-[85%] rounded-[20px] rounded-br-md border border-white/10 bg-white/[0.07] px-4 py-2.5 text-[15px] leading-snug text-white backdrop-blur">
        {children}
      </div>
      {onEdit ? (
        <button
          type="button"
          onClick={onEdit}
          className="px-1 text-xs font-medium text-white/40 transition-colors hover:text-white"
        >
          {editLabel}
        </button>
      ) : null}
    </div>
  );
}

export function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "relative min-h-10 rounded-full px-4 text-[14px] font-medium transition-all active:scale-[0.97]",
        active
          ? "text-white"
          : "border border-white/[0.09] bg-[#111] text-white/85 hover:border-white/20 hover:bg-[#181818] hover:text-white",
      ].join(" ")}
      style={active ? { background: BRAND_GRADIENT } : undefined}
    >
      {children}
    </button>
  );
}

export function ErrorLine({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="rounded-xl border border-rose-400/25 bg-rose-500/10 px-3.5 py-2.5 text-sm text-rose-200">
      {children}
    </p>
  );
}

export const cardClass =
  "flex flex-col gap-3 rounded-[24px] border border-white/[0.09] bg-[#0f0f0f] p-4 sm:p-5";
export const inputClass =
  // Same slim bordered dark field as the agent input box.
  "h-12 w-full rounded-[14px] border border-white/[0.13] bg-[#0b0b0d] px-4 text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-white/30 sm:text-[15px]";
export const buttonClass =
  "group/btn flex h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-white pr-1.5 pl-6 text-[15px] font-semibold text-[#0b0b0b] transition-[opacity,transform,box-shadow] hover:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.35)] active:scale-[0.98] disabled:opacity-40 disabled:shadow-none";

/** The one action button: white pill, label, then a dark round arrow that
 * nudges forward on hover. While busy the arrow becomes a spinner. */
export function ActionButton({
  busy,
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { busy?: boolean }) {
  return (
    <button {...props} className={`${buttonClass} ${className}`}>
      <span className="flex-1 whitespace-nowrap text-left sm:flex-none">{children}</span>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] text-white">
        {busy ? (
          <span className="size-3.5 animate-spin rounded-full border-2 border-white/25 border-t-white" />
        ) : (
          <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" strokeWidth={2.2} />
        )}
      </span>
    </button>
  );
}

/** Same pill, for the plain "go" buttons (design, build). */
export function BrandButton({ className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <ActionButton {...props} className={className} />;
}
export function Spinner() {
  return <span className="size-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />;
}
