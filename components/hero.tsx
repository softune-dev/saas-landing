"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { TRIAL_CTA, TRIAL_CTA_BN, TRIAL_NOTE, TRIAL_NOTE_BN } from "@/lib/site";
import { MaskIcon } from "@/components/ui/mask-icon";
import dynamic from "next/dynamic";
import { DemoAccessModal } from "./demo-access-modal";

// Loaded after first paint: the rays are decoration, never worth delaying the headline.
const LightRays = dynamic(() => import("@/components/ui/light-rays").then((m) => m.LightRays), { ssr: false });

type Locale = "en" | "bn";
type Text = { en: string; bn: string };
/** lo/li = left outer/inner, ri/ro = right inner/outer, c = the dashboard. */
type Slot = "lo" | "li" | "c" | "ri" | "ro";

/** The four things the prompt box "does". Each lights up one product
 * screenshot, so the visual below answers the prompt above. */
const SCENARIOS: { id: string; icon: string; tab: Text; prompt: Text; slot: Slot }[] = [
  {
    id: "store",
    icon: "/icons/shop-bag.svg",
    tab: { en: "Build store", bn: "স্টোর বানান" },
    prompt: { en: "Build a fashion store called Veila", bn: "Veila নামে একটি ফ্যাশন স্টোর বানাও" },
    slot: "li",
  },
  {
    id: "agent",
    icon: "/icons/ai.svg",
    tab: { en: "AI agent", bn: "AI এজেন্ট" },
    prompt: { en: "Get my store ready for Eid", bn: "ঈদের জন্য আমার স্টোর সাজাও" },
    slot: "c",
  },
  {
    id: "image",
    icon: "/icons/color.svg",
    tab: { en: "Image Gen 2.0", bn: "ইমেজ জেন ২.০" },
    prompt: { en: "Create a hero banner and photos", bn: "হিরো ব্যানার ও প্রোডাক্ট ছবি বানাও" },
    slot: "ri",
  },
  {
    id: "chatgpt",
    icon: "/icons/chatgpt-mark.png",
    tab: { en: "GPT Connect", bn: "GPT কানেক্ট" },
    prompt: { en: "How did my store do this week?", bn: "এই সপ্তাহে স্টোর কেমন চলল?" },
    slot: "c",
  },
];

const CARDS: Record<Slot, { src: string; alt: string }> = {
  c: { src: "/dashboard-d.webp", alt: "SoftuneBD dashboard" },
  lo: { src: "/themes/women-fashion.webp", alt: "Women's fashion storefront theme" },
  li: { src: "/themes/fashion-store.webp", alt: "Fashion storefront theme" },
  ri: { src: "/themes/genz-fashion.webp", alt: "Gen Z fashion storefront theme" },
  ro: { src: "/themes/skincare-shop.webp", alt: "Skincare storefront theme" },
};

const WORD_MS = 90;
const SEND_PAUSE_MS = 450;
const HOLD_MS = 3600;

/**
 * Dark AI hero: a glowing horizon, a huge headline, one glass prompt box that
 * writes real example requests by itself, and the product's own screenshots
 * floating in 3D below it. Each prompt lights up the screenshot it relates to. Autoplay stops while a visitor types, while the hero
 * is off screen, and for reduced motion.
 */
export function Hero({ locale = "en" }: { locale?: Locale }) {
  const isBn = locale === "bn";
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(0);
  const [sent, setSent] = useState(false);
  const [userMode, setUserMode] = useState(false);
  const [userText, setUserText] = useState("");
  const [visible, setVisible] = useState(true);
  const [demoOpen, setDemoOpen] = useState(false);

  const scenario = SCENARIOS[index];
  const words = scenario.prompt[locale].split(" ");
  const signupHref = isBn ? "/bn/signup" : "/signup";
  const changelogHref = isBn ? "/bn/changelog" : "/changelog";
  const running = !userMode && visible;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) {
      setShown(words.length);
      setSent(true);
      return;
    }
    if (!running) return;
    let id: number;
    if (!sent) {
      id = window.setTimeout(
        () => (shown < words.length ? setShown((n) => n + 1) : setSent(true)),
        shown < words.length ? WORD_MS : SEND_PAUSE_MS,
      );
    } else {
      id = window.setTimeout(() => {
        setIndex((i) => (i + 1) % SCENARIOS.length);
        setShown(0);
        setSent(false);
      }, HOLD_MS);
    }
    return () => window.clearTimeout(id);
  }, [reduced, running, sent, shown, words.length]);

  function pick(i: number) {
    setUserMode(false);
    setUserText("");
    setIndex(i);
    setShown(0);
    setSent(false);
  }

  function startTyping() {
    setUserMode(true);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  const go = () => {
    window.location.href = signupHref;
  };

  const active: Slot | null = sent ? scenario.slot : null;

  return (
    <section ref={sectionRef} className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#09080b] text-white sm:rounded-[2.5rem]">
        {/* Atmosphere: warm bloom at the horizon, a faint grid, a rising arc. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <LightRays className="absolute inset-x-0 top-0 h-[85%] [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" color="#ff6a3d" intensity={0.9} />
          <div className="absolute inset-0 [background:radial-gradient(70%_55%_at_50%_100%,rgba(255,90,54,0.42),transparent_70%),radial-gradient(40%_30%_at_50%_0%,rgba(255,150,110,0.10),transparent_70%)]" />
        </div>

        {/* The first screen: everything down to the trial note fills the viewport
            (minus the header and the panel's margin), so the product visuals start
            right below the fold. */}
        <div className="mx-auto flex min-h-[calc(100svh-6.5rem)] w-full max-w-6xl flex-col items-center justify-center px-4 py-10 text-center sm:min-h-[calc(100svh-7.75rem)] sm:px-6 md:py-12">
          <Link
            href={changelogHref}
            className="group flex w-max max-w-full items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] p-1 pr-3 text-[12px] font-medium text-white/85 backdrop-blur transition-colors hover:border-white/25 md:text-[13px]"
          >
            <motion.span
              className="rounded-full bg-[var(--color-brand)] px-2 py-0.5 text-[11px] font-bold text-white"
              animate={reduced ? undefined : { opacity: [1, 0.55, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              {isBn ? "নতুন" : "New"}
            </motion.span>
            <span className="truncate">{isBn ? "AI এজেন্ট ও ChatGPT কানেক্টর" : "AI agent and ChatGPT connector"}</span>
            <MaskIcon src="/icons/arrow-right.svg" className="size-3.5 text-white/60 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <h1
            style={{ fontFamily: isBn ? "var(--font-bn), var(--font-heading), sans-serif" : "var(--font-heading), sans-serif" }}
            className={[
              "mt-7 max-w-4xl font-bold tracking-[-0.035em] text-balance text-white",
              "text-[2.3rem] sm:text-[3.2rem] md:text-[4.1rem] lg:text-[4.6rem]",
              isBn ? "leading-[1.15]" : "leading-[0.98]",
            ].join(" ")}
          >
            {isBn ? (
              <>
                <span className="text-[var(--color-brand)]">AI</span> ই-কমার্স ওয়েবসাইট বিল্ডার বাংলাদেশের জন্য
              </>
            ) : (
              <>
                <span className="text-[var(--color-brand)]">AI</span> Ecommerce Website Builder for Bangladesh
              </>
            )}
          </h1>

          <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-white/60 md:text-base">
            {isBn ? "আইডিয়া বলুন। AI স্টোর বানাবে, বদলাবে, ছবি বানাবে। ChatGPT থেকেও চালান।" : "Tell the AI your idea. It builds your store, edits it, makes your images, and runs from ChatGPT too."}
          </p>

          {/* The prompt: the page's one focal object. */}
          <div className="mt-9 w-full max-w-2xl rounded-[1.6rem] border border-white/12 bg-white/[0.06] p-2 text-left backdrop-blur-xl transition-colors duration-300 focus-within:border-[var(--color-brand)]/60">
            <div className="min-h-[44px] px-3 pt-3 md:min-h-[58px] md:px-4">
              {userMode ? (
                <textarea
                  ref={inputRef}
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
                  onBlur={() => !userText.trim() && setUserMode(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      go();
                    }
                  }}
                  rows={2}
                  aria-label={isBn ? "আপনার ব্যবসার বর্ণনা দিন" : "Describe your business"}
                  placeholder={scenario.prompt[locale]}
                  className="w-full resize-none bg-transparent text-[14px] leading-snug text-white caret-[var(--color-brand)] outline-none placeholder:text-white/35 md:text-[16px]"
                />
              ) : (
                <button type="button" onClick={startTyping} className="block w-full cursor-text text-left" aria-label={isBn ? "নিজের মতো লিখুন" : "Type your own"}>
                  <p key={scenario.id + locale} className="text-[14px] leading-snug text-white md:text-[16px]">
                    {words.slice(0, shown).map((w, i) => (
                      <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="inline-block whitespace-pre">
                        {w}
                        {i < words.length - 1 ? " " : ""}
                      </motion.span>
                    ))}
                  </p>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={startTyping}
                aria-label={isBn ? "নিজের মতো লিখুন" : "Write your own"}
                className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/35 hover:text-white"
              >
                <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
                <span className="absolute h-3.5 w-[1.5px] rounded-full bg-current" />
              </button>

              <div role="tablist" aria-label={isBn ? "AI কী করতে পারে" : "What the AI can do"} className="no-scrollbar hidden min-w-0 flex-1 gap-1.5 overflow-x-auto py-2 sm:flex">
                {SCENARIOS.map((s, i) => {
                  const on = i === index && !userMode;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => pick(i)}
                      className={[
                        "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-300",
                        on ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white" : "border-white/12 text-white/65 hover:border-white/30 hover:text-white",
                      ].join(" ")}
                    >
                      <MaskIcon src={s.icon} className="size-3.5" />
                      {s.tab[locale]}
                    </button>
                  );
                })}
              </div>
              <div className="flex-1 sm:hidden" aria-hidden />

              <button
                type="button"
                onClick={go}
                aria-label={isBn ? "AI দিয়ে বানান" : "Build with AI"}
                className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-brand)] px-3 text-[13px] font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95 sm:px-4"
              >
                <MaskIcon src="/icons/ai.svg" className="size-3.5" />
                <span className="hidden sm:inline">{isBn ? "বানান" : "Build"}</span>
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href={signupHref} className="flex min-h-11 items-center gap-2 rounded-full bg-white px-6 text-[14px] font-semibold text-[#09080b] transition-opacity hover:opacity-90">
              {isBn ? TRIAL_CTA_BN : TRIAL_CTA}
              <MaskIcon src="/icons/arrow-right.svg" className="size-3.5" />
            </a>
            <button type="button" onClick={() => setDemoOpen(true)} className="flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-6 text-[14px] font-semibold text-white transition-colors hover:border-white/35">
              <MaskIcon src="/icons/play.svg" className="size-3.5" />
              {isBn ? "লাইভ ডেমো দেখুন" : "See Demo"}
            </button>
          </div>
          <p className="mt-8 text-[12px] text-white/45">{isBn ? TRIAL_NOTE_BN : TRIAL_NOTE}</p>
        </div>

        {/* The product, floating in perspective and cut off by the panel's edge. */}
        <div className="relative mx-auto mt-2 h-[290px] w-full max-w-6xl overflow-visible px-4 [perspective:1800px] sm:h-[350px] md:h-[440px]">
          {/* The horizon: an arc of orange light rising behind the cards. */}
          <div aria-hidden className="pointer-events-none absolute top-[3rem] left-1/2 -z-0 aspect-square w-[150%] -translate-x-1/2 rounded-full border-t-2 border-[rgba(255,170,130,0.75)] bg-[radial-gradient(60%_30%_at_50%_0%,rgba(255,90,54,0.30),#09080b_75%)] shadow-[0_-24px_110px_0_rgba(255,90,54,0.55)] md:top-[4rem]" />
          <Card slot="lo" active={active === "lo"} reduced={!!reduced} />
          <Card slot="ro" active={active === "ro"} reduced={!!reduced} />
          <Card slot="li" active={active === "li"} reduced={!!reduced} />
          <Card slot="ri" active={active === "ri"} reduced={!!reduced} />
          <Card slot="c" active={active === "c"} reduced={!!reduced} />

        </div>
      </div>
      <DemoAccessModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}

const SLOT_STYLE: Record<Slot, string> = {
  c: "left-1/2 top-[0.5rem] z-20 w-[92%] -translate-x-1/2 sm:w-[78%] md:top-[1.5rem] md:w-[56%]",
  li: "left-[8%] top-[4.5rem] z-10 hidden w-[24%] md:block",
  ri: "right-[8%] top-[4.5rem] z-10 hidden w-[24%] md:block",
  lo: "left-[-1%] top-[7rem] z-[5] hidden w-[19%] md:block",
  ro: "right-[-1%] top-[7rem] z-[5] hidden w-[19%] md:block",
};
const SLOT_TILT: Record<Slot, { rotateX: number; rotateY: number; rotateZ: number }> = {
  c: { rotateX: 16, rotateY: 0, rotateZ: 0 },
  li: { rotateX: 14, rotateY: 22, rotateZ: -2 },
  ri: { rotateX: 14, rotateY: -22, rotateZ: 2 },
  lo: { rotateX: 12, rotateY: 32, rotateZ: -4 },
  ro: { rotateX: 12, rotateY: -32, rotateZ: 4 },
};

/** One product screenshot in a browser frame, tilted in 3D. The active one
 * lifts and brightens; the rest sit back, dimmed. A slow drift keeps it alive. */
function Card({ slot, active, reduced }: { slot: Slot; active: boolean; reduced: boolean }) {
  const { src, alt } = CARDS[slot];
  const tilt = SLOT_TILT[slot];
  return (
    <div className={["absolute", SLOT_STYLE[slot]].join(" ")} style={{ transformStyle: "preserve-3d" }}>
      <motion.div
        initial={false}
        animate={{
          ...tilt,
          y: active ? -18 : 0,
          scale: active ? 1.03 : 1,
          filter: active ? "brightness(1)" : "brightness(0.7)",
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 6 + (slot === "c" ? 0 : slot === "li" || slot === "ri" ? 1.2 : 2.2), repeat: Infinity, ease: "easeInOut" }}
          className="overflow-hidden rounded-2xl border border-white/12 bg-[#101013] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.9)]"
        >
          <div className="flex h-7 items-center gap-1.5 border-b border-white/8 bg-white/[0.04] px-3" aria-hidden>
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
            <span className="size-2 rounded-full bg-white/20" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} draggable={false} className={["block w-full object-cover object-top", slot === "c" ? "aspect-[3/2]" : "aspect-[4/5]"].join(" ")} loading={slot === "c" ? "eager" : "lazy"} />
        </motion.div>
      </motion.div>
    </div>
  );
}
