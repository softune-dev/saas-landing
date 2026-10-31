"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUp, Image as ImageIcon, MessageCircle, Sparkles, Store } from "lucide-react";
import { TRIAL_NOTE, TRIAL_NOTE_BN } from "@/lib/site";
import { HeroCtas } from "./hero-ctas";
import { BuildStage } from "./hero-ai/build-stage";
import { SCENARIOS, type ScenarioId } from "./hero-ai/scenarios";

const TAB_ICONS: Record<ScenarioId, typeof Store> = {
  store: Store,
  agent: Sparkles,
  image: ImageIcon,
  chatgpt: MessageCircle,
};

// Timings, in ms. One scenario takes ~7-9 s: type, send, tick the steps, hold.
const TYPE_MS = 34;
const SEND_PAUSE_MS = 450;
const STEP_MS = 800;
const HOLD_MS = 2800;

type Phase = "typing" | "working" | "hold";

/**
 * AI-first hero: the page's main object is a prompt box, because "tell the AI
 * what you want" is the product. It types real example requests by itself
 * (store setup, the agent, AI images, ChatGPT), and the window below shows the
 * demo store reacting to each one. A visitor can click in and type their own;
 * Build takes them to signup. Autoplay pauses while they type, while the hero
 * is off screen, and is replaced by static final states for reduced motion.
 */
export function Hero({ locale = "en" }: { locale?: "en" | "bn" }) {
  const isBn = locale === "bn";
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(0);
  const [userMode, setUserMode] = useState(false);
  const [userText, setUserText] = useState("");
  const [visible, setVisible] = useState(true);

  const scenario = SCENARIOS[index];
  // Array.from keeps Bangla and other multi-code-unit characters whole.
  const chars = Array.from(scenario.prompt[locale]);
  const signupHref = isBn ? "/bn/signup" : "/signup";
  const running = !userMode && visible;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reduced motion: no typing or ticking, each scenario shown finished, slower.
  useEffect(() => {
    if (!reduced || !running) return;
    setTyped(chars.length);
    setDone(scenario.steps.length);
    setPhase("hold");
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % SCENARIOS.length), 6000);
    return () => window.clearTimeout(id);
  }, [reduced, running, index, chars.length, scenario.steps.length]);

  useEffect(() => {
    if (reduced || !running) return;
    let id: number;
    if (phase === "typing") {
      if (typed < chars.length) {
        id = window.setTimeout(() => setTyped((t) => t + 1), TYPE_MS);
      } else {
        id = window.setTimeout(() => {
          setDone(0);
          setPhase("working");
        }, SEND_PAUSE_MS);
      }
    } else if (phase === "working") {
      if (done < scenario.steps.length) {
        id = window.setTimeout(() => setDone((d) => d + 1), STEP_MS);
      } else {
        setPhase("hold");
      }
    } else {
      id = window.setTimeout(() => goTo((index + 1) % SCENARIOS.length), HOLD_MS);
    }
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, running, phase, typed, done, index]);

  function goTo(next: number) {
    setIndex(next);
    setTyped(0);
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

  function submit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = signupHref;
  }

  const sent = phase !== "typing";

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col overflow-hidden rounded-b-[2rem] border-[4px] border-t-0 border-[var(--color-surface)] bg-[var(--color-canvas)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] sm:rounded-b-[3rem] md:rounded-b-[4rem] md:border-[6px] md:border-t-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_50%_25%,transparent_0%,black_60%)]" />
      {/* One warm light behind the prompt box: the page's focal point. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[18%] left-1/2 h-[420px] w-[900px] max-w-[140vw] -translate-x-1/2 rounded-full bg-[var(--color-brand)] opacity-[0.10] blur-[120px] dark:opacity-[0.14]"
      />
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-40 bg-gradient-to-t from-[var(--color-brand)]/12 to-transparent md:h-56" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-12 text-center sm:px-5 sm:pt-16 md:px-8 md:pt-16">
        <Link
          href={isBn ? "/bn/features/chatgpt-connector" : "/features/chatgpt-connector"}
          className="mb-6 flex w-max max-w-full items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 pr-3 text-[12px] font-semibold text-[var(--color-ink)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-colors hover:border-[var(--color-brand)]/40 md:mb-7 md:p-1.5 md:pr-4 md:text-[14px]"
        >
          <span className="rounded-full bg-[var(--color-brand)] px-2 py-0.5 text-[11px] font-bold text-white md:text-[12px]">
            {isBn ? "নতুন" : "New"}
          </span>
          <span className="truncate">{isBn ? "AI এজেন্ট ও ChatGPT কানেক্টর" : "AI agent and ChatGPT connector"}</span>
          <ArrowRight className="size-3.5 shrink-0 text-[var(--color-brand)] md:size-4" />
        </Link>

        <h1
          style={{ fontFamily: isBn ? "var(--font-bn), var(--font-heading), sans-serif" : "var(--font-heading), sans-serif" }}
          className="text-[2rem] leading-[1.12] font-bold tracking-tight text-balance text-[var(--color-ink)] sm:text-[2.6rem] md:text-[3.4rem] lg:text-[3.9rem]"
        >
          {isBn ? "আপনার ব্যবসার কথা বলুন," : "Describe your business."}
          <span className="mt-2 flex flex-wrap items-center justify-center gap-x-3">
            {isBn ? "স্টোর বানাবে" : "Your store is built by"}
            <span className="relative inline-block px-3 py-0.5 md:px-4 md:py-1">
              <span className="absolute inset-0 top-1 rounded-xl bg-[var(--color-brand)] shadow-[0_10px_30px_-8px_rgba(255,90,54,0.6)]" />
              <span className="relative text-white">AI</span>
            </span>
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] md:text-[17px]">
          {isBn
            ? "SoftuneBD-র AI আপনার অনলাইন স্টোর সাজিয়ে দেয়, বললেই বদলায়, প্রোডাক্টের ছবি বানায়, আর ChatGPT থেকেও চালানো যায়। bKash, Nagad, COD ও কুরিয়ার সবই সাথে।"
            : "SoftuneBD's AI sets up your online store, changes it when you ask, makes your product images, and even lets you run it from ChatGPT. bKash, Nagad, COD and couriers included."}
        </p>

        {/* The prompt composer */}
        <form
          onSubmit={submit}
          className="group mt-8 w-full max-w-3xl rounded-[1.6rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-2 text-left shadow-[0_24px_60px_-24px_rgba(15,15,15,0.35)] transition-[border-color,box-shadow] duration-300 focus-within:border-[var(--color-brand)]/50 focus-within:shadow-[0_24px_70px_-20px_rgba(255,90,54,0.35)] md:mt-10"
        >
          <div className="min-h-[76px] px-3 pt-2.5 pb-1 md:min-h-[84px] md:px-4 md:pt-3">
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
                    window.location.href = signupHref;
                  }
                }}
                rows={2}
                aria-label={isBn ? "আপনার ব্যবসার বর্ণনা দিন" : "Describe your business"}
                placeholder={scenario.prompt[locale]}
                className="w-full resize-none bg-transparent text-[16px] leading-relaxed text-[var(--color-ink)] caret-[var(--color-brand)] outline-none placeholder:text-[var(--color-muted)] md:text-[18px]"
              />
            ) : (
              <button
                type="button"
                onClick={startTyping}
                className="block w-full cursor-text text-left text-[16px] leading-relaxed text-[var(--color-ink)] md:text-[18px]"
                aria-label={isBn ? "নিজের মতো লিখুন" : "Type your own"}
              >
                <span>{chars.slice(0, typed).join("")}</span>
                <span
                  aria-hidden
                  className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-[var(--color-brand)]"
                />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 px-1 pb-1">
            <div role="tablist" aria-label={isBn ? "AI কী করতে পারে" : "What the AI can do"} className="no-scrollbar flex min-w-0 flex-1 gap-1 overflow-x-auto">
              {SCENARIOS.map((s, i) => {
                const Icon = TAB_ICONS[s.id];
                const active = i === index && !userMode;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => pickTab(i)}
                    className={[
                      "relative flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition-colors md:text-[13px]",
                      active ? "text-[var(--color-brand)]" : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
                    ].join(" ")}
                  >
                    {active ? (
                      <motion.span
                        layoutId="hero-ai-tab"
                        className="absolute inset-0 rounded-full bg-[var(--color-brand-soft)]"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                      />
                    ) : null}
                    <Icon className="relative size-3.5" />
                    <span className="relative">{s.tab[locale]}</span>
                  </button>
                );
              })}
            </div>
            <button
              type="submit"
              aria-label={isBn ? "AI দিয়ে বানান" : "Build with AI"}
              className="flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-brand)] px-3 text-[13px] font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95 sm:px-4"
            >
              <span className="hidden sm:inline">{isBn ? "বানান" : "Build"}</span>
              <ArrowUp className="size-4" strokeWidth={2.5} />
            </button>
          </div>
        </form>

        <HeroCtas locale={locale} className="mt-7 md:mt-8" />
        <p className="mt-5 text-[12px] font-medium text-[var(--color-muted)] sm:text-[13px]">
          {isBn ? TRIAL_NOTE_BN : TRIAL_NOTE}
        </p>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-3 pt-10 pb-8 sm:px-5 sm:pb-10 md:px-6 md:pt-14 md:pb-14">
        <BuildStage scenario={scenario} sent={sent} done={done} locale={locale} />
      </div>
    </section>
  );
}
