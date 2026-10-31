"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { TRIAL_NOTE, TRIAL_NOTE_BN } from "@/lib/site";
import { MaskIcon } from "@/components/ui/mask-icon";
import { HeroCtas } from "./hero-ctas";
import { BuildStage } from "./hero-ai/build-stage";
import { PromptText } from "./hero-ai/prompt-text";
import { SelectionFrame } from "./hero-ai/selection-frame";
import { SCENARIOS } from "./hero-ai/scenarios";

// Timings, in ms. One scenario runs ~8-10 s: write, send, work the steps, hold.
const WORD_MS = 95;
const SEND_PAUSE_MS = 500;
const STEP_MS = 1000;
const LONG_STEP_MS = 2200; // the image generation step, which should feel like work
const HOLD_MS = 3200;

type Phase = "typing" | "working" | "hold";

/**
 * AI-first hero. The prompt box is the page's main object, because "tell the AI
 * what you want" is the product. It writes real example requests by itself
 * (store setup, the agent, AI images, ChatGPT) and the app window below shows
 * the agent's run and the demo store reacting. A visitor can click in and type
 * their own; Build takes them to signup. Autoplay pauses while they type and
 * while the hero is off screen; reduced motion shows each finished state.
 */
export function Hero({ locale = "en" }: { locale?: "en" | "bn" }) {
  const isBn = locale === "bn";
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(0);
  const [userMode, setUserMode] = useState(false);
  const [userText, setUserText] = useState("");
  const [visible, setVisible] = useState(true);

  const scenario = SCENARIOS[index];
  const words = scenario.prompt[locale].split(" ");
  const signupHref = isBn ? "/bn/signup" : "/signup";
  const changelogHref = isBn ? "/bn/changelog" : "/changelog";
  const running = !userMode && visible;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!reduced || !running) return;
    setShown(words.length);
    setDone(scenario.steps.length);
    setPhase("hold");
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % SCENARIOS.length), 6500);
    return () => window.clearTimeout(id);
  }, [reduced, running, index, words.length, scenario.steps.length]);

  useEffect(() => {
    if (reduced || !running) return;
    let id: number | undefined;
    if (phase === "typing") {
      id =
        shown < words.length
          ? window.setTimeout(() => setShown((n) => n + 1), WORD_MS)
          : window.setTimeout(() => {
              setDone(0);
              setPhase("working");
            }, SEND_PAUSE_MS);
    } else if (phase === "working") {
      if (done < scenario.steps.length) {
        const long = scenario.id === "image" && done === 1;
        id = window.setTimeout(() => setDone((d) => d + 1), long ? LONG_STEP_MS : STEP_MS);
      } else {
        setPhase("hold");
      }
    } else {
      id = window.setTimeout(() => goTo((index + 1) % SCENARIOS.length), HOLD_MS);
    }
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, running, phase, shown, done, index]);

  function goTo(next: number) {
    setIndex(next);
    setShown(0);
    setDone(0);
    setPhase("typing");
  }

  function pickTab(next: number) {
    setUserMode(false);
    setUserText("");
    goTo(next);
  }

  function startTyping() {
    setUserMode(true);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  function go() {
    window.location.href = signupHref;
  }

  const sent = phase !== "typing";

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden rounded-b-[2rem] border-[4px] border-t-0 border-[var(--color-surface)] bg-[var(--color-canvas)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] sm:rounded-b-[3rem] md:rounded-b-[4rem] md:border-[6px] md:border-t-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_50%_22%,transparent_0%,black_62%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[14%] left-1/2 h-[380px] w-[860px] max-w-[140vw] -translate-x-1/2 rounded-full bg-[var(--color-brand)] opacity-[0.09] blur-[120px] dark:opacity-[0.13]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 pt-12 text-center sm:px-5 sm:pt-14 md:px-8 md:pt-16">
        <Link
          href={changelogHref}
          className="mb-7 flex w-max max-w-full items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 pr-3 text-[12px] font-semibold text-[var(--color-ink)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-colors hover:border-[var(--color-brand)]/40 md:text-[13px]"
        >
          <motion.span
            className="rounded-full bg-[var(--color-brand)] px-2 py-0.5 text-[11px] font-bold text-white shadow-[0_4px_12px_-4px_rgba(255,90,54,0.8)]"
            animate={reduced ? undefined : { opacity: [1, 0.55, 1], scale: [1, 0.97, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {isBn ? "নতুন" : "New"}
          </motion.span>
          <span className="truncate">{isBn ? "AI এজেন্ট ও ChatGPT কানেক্টর" : "AI agent and ChatGPT connector"}</span>
          <MaskIcon src="/icons/arrow-right.svg" className="size-3.5 text-[var(--color-brand)]" />
        </Link>

        <h1
          style={{ fontFamily: isBn ? "var(--font-bn), var(--font-heading), sans-serif" : "var(--font-heading), sans-serif" }}
          className={[
            isBn ? "text-[1.55rem]" : "text-[1.75rem]",
            "font-bold tracking-[-0.03em] text-balance text-[var(--color-ink)] sm:text-[2.2rem] md:text-[2.75rem] lg:text-[3.1rem]",
            // Bangla vowel signs and conjuncts clip below ~1.1.
            isBn ? "leading-[1.12]" : "leading-[0.95]",
          ].join(" ")}
        >
          <span className="flex flex-wrap items-center justify-center gap-x-[0.28em] gap-y-[0.18em]">
            <span className="relative inline-block rounded-[0.22em] bg-[var(--color-brand)] px-[0.22em] py-[0.08em] text-white shadow-[0_10px_26px_-8px_rgba(255,90,54,0.65)]">
              AI
            </span>
            <span>{isBn ? "ই-কমার্স" : "Ecommerce"}</span>
            <span className="relative inline-block px-[0.14em] py-[0.04em]">
              <SelectionFrame label="your-brand.com" className="inset-0" tagClassName="hidden sm:block" />
              {isBn ? "ওয়েবসাইট" : "Website"}
            </span>
            <span>{isBn ? "বিল্ডার" : "Builder"}</span>
          </span>
          <span className="mt-[0.18em] block">{isBn ? "বাংলাদেশের জন্য" : "for Bangladesh"}</span>
        </h1>

        <p className="mt-5 max-w-lg text-[14px] leading-relaxed font-medium text-[var(--color-muted)] md:text-[15px]">
          {isBn
            ? "আইডিয়া বলুন, AI স্টোর বানাবে, বদলাবে, ছবি বানাবে। চাইলে ChatGPT থেকেও চালান।"
            : "Tell the AI your idea. It builds your store, edits it on request, makes your images, and runs from ChatGPT too."}
        </p>

        {/* The prompt composer */}
        <div className="group mt-8 w-full max-w-3xl rounded-[1.6rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-2 text-left shadow-[0_24px_60px_-26px_rgba(15,15,15,0.35)] transition-[border-color,box-shadow] duration-300 focus-within:border-[var(--color-brand)]/50 focus-within:shadow-[0_24px_70px_-22px_rgba(255,90,54,0.4)] md:mt-9">
          <div className="min-h-[64px] px-3 pt-2.5 md:min-h-[70px] md:px-3.5">
            {userMode ? (
              <textarea
                ref={inputRef}
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                onBlur={() => {
                  if (!userText.trim()) setUserMode(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    go();
                  }
                }}
                rows={2}
                aria-label={isBn ? "আপনার ব্যবসার বর্ণনা দিন" : "Describe your business"}
                placeholder={scenario.prompt[locale]}
                className="w-full resize-none bg-transparent text-[14.5px] leading-relaxed text-[var(--color-ink)] caret-[var(--color-brand)] outline-none placeholder:text-[13.5px] placeholder:text-[var(--color-muted-soft)] md:text-[15.5px]"
              />
            ) : (
              <button
                type="button"
                onClick={startTyping}
                className="block w-full cursor-text text-left"
                aria-label={isBn ? "নিজের মতো লিখুন" : "Type your own"}
              >
                <PromptText id={`${scenario.id}-${locale}`} words={words} shown={shown} sent={sent} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={startTyping}
              aria-label={isBn ? "নিজের মতো লিখুন" : "Write your own"}
              className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-muted)] transition-colors hover:border-[var(--color-brand)]/50 hover:text-[var(--color-brand)]"
            >
              <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
              <span className="absolute h-3.5 w-[1.5px] rounded-full bg-current" />
            </button>

            <div
              role="tablist"
              aria-label={isBn ? "AI কী করতে পারে" : "What the AI can do"}
              className="no-scrollbar flex min-w-0 flex-1 gap-1.5 overflow-x-auto py-2 [mask-image:linear-gradient(90deg,black_88%,transparent)] sm:[mask-image:none]"
            >
              {SCENARIOS.map((s, i) => {
                const active = i === index && !userMode;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => pickTab(i)}
                    className={[
                      "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-[background-color,color,box-shadow,border-color] duration-300 ease-out",
                      active
                        ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white shadow-[0_8px_20px_-6px_rgba(255,90,54,0.7)]"
                        : "border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:border-[var(--color-brand)]/40 hover:text-[var(--color-ink)]",
                    ].join(" ")}
                  >
                    {s.icon.endsWith(".svg") ? (
                      <MaskIcon src={s.icon} className="size-3.5" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.icon} alt="" className="size-3.5 rounded-[3px]" />
                    )}
                    {s.tab[locale]}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={go}
              aria-label={isBn ? "AI দিয়ে বানান" : "Build with AI"}
              className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-brand)] px-3 text-[13px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(255,90,54,0.7)] transition-transform hover:scale-[1.03] active:scale-95 sm:px-4"
            >
              <MaskIcon src="/icons/ai.svg" className="size-3.5" />
              <span className="hidden sm:inline">{isBn ? "বানান" : "Build"}</span>
            </button>
          </div>
        </div>

        <HeroCtas locale={locale} className="mt-7" />
        <p className="mt-5 text-[12px] font-medium text-[var(--color-muted)] sm:text-[13px]">{isBn ? TRIAL_NOTE_BN : TRIAL_NOTE}</p>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-3 pt-10 pb-10 sm:px-5 md:px-6 md:pt-14 md:pb-16">
        <BuildStage scenario={scenario} sent={sent} done={done} locale={locale} />
      </div>
    </section>
  );
}
