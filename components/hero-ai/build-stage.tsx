"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, MessageCircle, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import type { Scenario } from "./scenarios";

type Locale = "en" | "bn";

/** The window under the prompt box: the AI's steps on the left, the demo store
 * reacting on the right. Driven entirely by the parent's clock (`sent`,
 * `done`), so the hero owns timing and this only draws a moment of it. */
export function BuildStage({
  scenario,
  sent,
  done,
  locale,
}: {
  scenario: Scenario;
  sent: boolean;
  /** How many of scenario.steps are finished. */
  done: number;
  locale: Locale;
}) {
  const isBn = locale === "bn";
  const isChatGpt = scenario.id === "chatgpt";
  const total = scenario.steps.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[0_30px_80px_-30px_rgba(15,15,15,0.45)]">
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-[var(--color-line)] px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex min-w-0 items-center gap-2 rounded-full bg-[var(--color-search-bg)] px-3 py-1 text-[12px] font-medium text-[var(--color-muted)]">
          <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
          <span className="truncate">veila.softunebd.com</span>
        </div>
        <span className="hidden rounded-full border border-[var(--color-line)] px-2 py-0.5 text-[11px] font-semibold text-[var(--color-muted)] sm:inline">
          {isBn ? "ডেমো স্টোর" : "Demo store"}
        </span>
      </div>

      <div className="grid md:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        {/* Agent panel */}
        <div className="order-2 flex flex-col gap-3 border-t border-[var(--color-line)] p-4 text-left md:order-1 md:border-t-0 md:border-r md:p-5">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-[var(--color-brand)] text-white">
              {isChatGpt ? <MessageCircle className="size-4" /> : <Sparkles className="size-4" />}
            </span>
            <span className="text-[13px] font-bold text-[var(--color-ink)]">
              {isChatGpt ? (isBn ? "ChatGPT কানেক্টর" : "ChatGPT connector") : isBn ? "SoftuneBD AI এজেন্ট" : "SoftuneBD AI agent"}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.p
                key={scenario.id + "-prompt"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="ml-auto max-w-[92%] rounded-2xl rounded-br-md bg-[var(--color-brand)] px-3.5 py-2.5 text-[13px] leading-snug font-medium text-white"
              >
                {scenario.prompt[locale]}
              </motion.p>
            ) : (
              <motion.p
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[13px] text-[var(--color-muted)]"
              >
                {isBn ? "আপনার নির্দেশের অপেক্ষায়…" : "Waiting for your prompt…"}
              </motion.p>
            )}
          </AnimatePresence>

          <ol className="flex flex-col gap-2.5">
            {scenario.steps.map((step, i) => {
              const state = !sent ? "idle" : i < done ? "done" : i === done ? "active" : "idle";
              return (
                <motion.li
                  key={scenario.id + i}
                  initial={false}
                  animate={{ opacity: state === "idle" ? 0.4 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2.5 text-[13px] leading-snug text-[var(--color-ink)]"
                >
                  <span
                    className={[
                      "mt-px flex size-[18px] shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                      state === "done" ? "bg-[var(--color-brand)] text-white" : "border border-[var(--color-line)] text-[var(--color-brand)]",
                    ].join(" ")}
                  >
                    {state === "done" ? (
                      <Check className="size-3" strokeWidth={3} />
                    ) : state === "active" ? (
                      <Loader2 className="size-3 animate-spin" />
                    ) : null}
                  </span>
                  {step[locale]}
                </motion.li>
              );
            })}
          </ol>

          {sent && done >= total && scenario.id !== "chatgpt" ? (
            <motion.button
              type="button"
              tabIndex={-1}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--color-line)] px-3 py-1.5 text-[12px] font-semibold text-[var(--color-muted)]"
            >
              <RotateCcw className="size-3.5" />
              Undo
            </motion.button>
          ) : null}
        </div>

        {/* Live preview */}
        <div className="relative order-1 aspect-[16/10] overflow-hidden bg-[var(--color-canvas)] md:order-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {scenario.id === "store" && <StorePreview progress={sent ? done / total : 0} locale={locale} />}
              {scenario.id === "agent" && <AgentPreview done={sent ? done : 0} />}
              {scenario.id === "image" && <ImagePreview done={sent ? done : 0} sent={sent} locale={locale} />}
              {scenario.id === "chatgpt" && <ChatGptPreview sent={sent} done={done} scenario={scenario} locale={locale} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const STORE_IMG = "/themes/women-fashion.webp";

function StoreImage({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={STORE_IMG}
      alt=""
      draggable={false}
      className={["absolute inset-0 h-full w-full object-cover object-top", className].join(" ")}
      style={style}
    />
  );
}

/** The storefront wipes in from the top as each step lands, with a bright scan
 * line riding the edge, so "AI is building it" is something you watch. */
function StorePreview({ progress, locale }: { progress: number; locale: Locale }) {
  const shown = Math.max(0, Math.min(1, progress)) * 100;
  return (
    <>
      <div className="absolute inset-0 bg-dot-grid opacity-60" aria-hidden />
      {progress === 0 ? (
        <p className="absolute inset-0 flex items-center justify-center text-[13px] font-medium text-[var(--color-muted)]">
          {locale === "bn" ? "এখানে আপনার স্টোর তৈরি হবে" : "Your store appears here"}
        </p>
      ) : null}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ clipPath: `inset(0 0 ${100 - shown}% 0)` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <StoreImage />
      </motion.div>
      {shown > 0 && shown < 100 ? (
        <motion.div
          aria-hidden
          className="absolute inset-x-0 h-px bg-[var(--color-brand)] shadow-[0_0_24px_6px_rgba(255,90,54,0.55)]"
          initial={false}
          animate={{ top: `${shown}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      ) : null}
    </>
  );
}

/** Same store; the agent rewrites the hero headline in place and warms the palette. */
function AgentPreview({ done }: { done: number }) {
  return (
    <>
      <StoreImage
        className="transition-[filter] duration-[1200ms] ease-out"
        style={{ filter: done >= 2 ? "sepia(0.35) saturate(1.35) hue-rotate(-12deg)" : "none" }}
      />
      <AnimatePresence>
        {done >= 1 ? (
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[27%] left-[5%] flex h-[46%] w-[44%] flex-col items-start justify-center gap-[0.6em] rounded-md bg-[#f6ebe6] py-[3%] pr-[2%] pl-[3%] text-[clamp(9px,1.5vw,15px)] text-[#3b2a26]"
          >
            <span className="font-semibold tracking-wide text-[#a5524a] uppercase" style={{ fontSize: "0.7em" }}>
              Eid Collection 2026
            </span>
            <span className="leading-[1.05] font-bold" style={{ fontFamily: "var(--font-instrument), serif", fontSize: "2.5em" }}>
              Celebrate in Style
            </span>
            <span className="rounded-full bg-[#a5524a] px-[1em] py-[0.45em] font-semibold text-white" style={{ fontSize: "0.7em" }}>
              Shop Eid
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

const NEW_BANNER = "/themes/fashion-store.webp";

/** The hero area "develops": a shimmering placeholder with a real progress
 * count, then the new banner sharpens into place. */
function ImagePreview({ done, sent, locale }: { done: number; sent: boolean; locale: Locale }) {
  const [pct, setPct] = useState(0);
  const generating = sent && done < 2;

  useEffect(() => {
    if (!generating) {
      setPct(done >= 2 ? 100 : 0);
      return;
    }
    const id = window.setInterval(() => setPct((p) => Math.min(96, p + 3 + Math.random() * 6)), 120);
    return () => window.clearInterval(id);
  }, [generating, done]);

  return (
    <>
      <StoreImage className="opacity-30 blur-[2px]" />
      {done >= 2 ? (
        <motion.div
          initial={{ opacity: 0, scale: 1.04, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={NEW_BANNER} alt="" draggable={false} className="h-full w-full object-cover object-top" />
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            <Sparkles className="size-3" />
            {locale === "bn" ? "AI দিয়ে তৈরি" : "Made with AI"}
          </span>
        </motion.div>
      ) : (
        <div className="absolute inset-[6%] overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)]">
          <motion.div
            aria-hidden
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[var(--color-brand)]/15 to-transparent"
            animate={{ x: ["-100%", "220%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="text-[13px] font-medium text-[var(--color-muted)]">
              {sent ? (locale === "bn" ? "ব্যানার তৈরি হচ্ছে…" : "Generating banner…") : locale === "bn" ? "নতুন ব্যানার এখানে আসবে" : "Your new banner lands here"}
            </span>
            {sent ? (
              <span className="text-[28px] font-bold text-[var(--color-ink)] tabular-nums">{Math.round(pct)}%</span>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

const WEEK = [38, 52, 44, 61, 57, 74, 88];

/** A neutral chat window (not OpenAI's UI): the merchant asks, the answer comes
 * back with this week's numbers from the demo store. */
function ChatGptPreview({ sent, done, scenario, locale }: { sent: boolean; done: number; scenario: Scenario; locale: Locale }) {
  const isBn = locale === "bn";
  const answered = sent && done >= 1;
  return (
    <div className="absolute inset-0 flex flex-col gap-3 bg-[var(--color-surface)] p-4 sm:p-6">
      <div className="flex items-center gap-2 text-[13px] font-semibold text-[var(--color-ink)]">
        <MessageCircle className="size-4 text-[var(--color-muted)]" />
        ChatGPT
        <span className="rounded-full border border-[var(--color-line)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-muted)]">
          {isBn ? "SoftuneBD যুক্ত" : "SoftuneBD connected"}
        </span>
      </div>
      {sent ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="ml-auto max-w-[75%] rounded-2xl bg-[var(--color-search-bg)] px-3.5 py-2 text-[13px] text-[var(--color-ink)]"
        >
          {scenario.prompt[locale]}
        </motion.p>
      ) : null}
      {answered ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex max-w-[92%] flex-col gap-3 text-[13px] leading-relaxed text-[var(--color-ink)]"
        >
          <p>
            {isBn
              ? "এই সপ্তাহে ৩৭টি অর্ডারে ৳৪৮,৬০০ বিক্রি হয়েছে, গত সপ্তাহের চেয়ে ১৮% বেশি। সবচেয়ে বেশি বিক্রি: Linen Blazer Dress।"
              : "This week: ৳48,600 from 37 orders, up 18% on last week. Best seller: Linen Blazer Dress."}
          </p>
          <div className="flex h-20 items-end gap-1.5 sm:h-28" aria-hidden>
            {WEEK.map((h, i) => (
              <motion.span
                key={i}
                className={["flex-1 rounded-t-md", i === WEEK.length - 1 ? "bg-[var(--color-brand)]" : "bg-[var(--color-brand)]/25"].join(" ")}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>
        </motion.div>
      ) : sent ? (
        <span className="inline-flex items-center gap-1 py-2" aria-label="Thinking">
          <span className="size-1.5 animate-bounce rounded-full bg-[var(--color-muted)] [animation-delay:-0.3s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-[var(--color-muted)] [animation-delay:-0.15s]" />
          <span className="size-1.5 animate-bounce rounded-full bg-[var(--color-muted)]" />
        </span>
      ) : null}
    </div>
  );
}
