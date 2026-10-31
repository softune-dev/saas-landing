"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MaskIcon } from "@/components/ui/mask-icon";
import { AgentTree } from "./agent-tree";
import { StorePreview } from "./store-preview";
import type { Scenario } from "./scenarios";

type Locale = "en" | "bn";
const EASE = [0.16, 1, 0.3, 1] as const;

/** The app window under the prompt box: the agent's run as a git-style graph
 * on the left, the live store reacting on the right. Driven by the hero's
 * clock (`sent`, `done`); this only draws one moment of it. */
export function BuildStage({
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

  return (
    <div className="relative">
      {/* Soft brand light under the window, so it sits on the page rather than on top of it. */}
      <div aria-hidden className="absolute inset-x-[8%] -bottom-6 h-24 rounded-full bg-[var(--color-brand)] opacity-20 blur-3xl" />

      <div className="relative overflow-hidden rounded-[1.4rem] border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[0_40px_90px_-40px_rgba(15,15,15,0.55),0_2px_0_rgba(255,255,255,0.04)_inset]">
        <div className="flex items-center gap-3 border-b border-[var(--color-line)] bg-[var(--color-canvas)]/60 px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex min-w-0 items-center gap-1.5 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1 text-[12px] font-medium text-[var(--color-muted)]">
            <MaskIcon src="/icons/lock.svg" className="size-3 text-emerald-500" />
            <span className="truncate">veila.softunebd.com</span>
          </div>
          <span className="hidden items-center gap-1.5 text-[11.5px] font-semibold text-[var(--color-muted)] sm:flex">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative size-1.5 rounded-full bg-emerald-500" />
            </span>
            {isBn ? "লাইভ প্রিভিউ" : "Live preview"}
          </span>
        </div>

        <div className="grid md:grid-cols-[300px_minmax(0,1fr)] lg:grid-cols-[330px_minmax(0,1fr)]">
          <div className="order-2 border-t border-[var(--color-line)] md:order-1 md:border-t-0 md:border-r">
            <AgentTree scenario={scenario} sent={sent} done={done} locale={locale} />
          </div>

          <div className="@container relative order-1 aspect-[16/10] self-start overflow-hidden md:order-2">
            <StorePreview id={scenario.id} sent={sent} done={done} total={total} locale={locale} />
            <AnimatePresence>
              {scenario.id === "chatgpt" ? <ChatGptCard key="chat" sent={sent} done={done} scenario={scenario} locale={locale} /> : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

const WEEK = [38, 52, 44, 61, 57, 74, 88];
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

/** ChatGPT, drawn as a neutral chat card (not OpenAI's interface) over the
 * merchant's store: the question goes in, the store's numbers come back. */
function ChatGptCard({ sent, done, scenario, locale }: { sent: boolean; done: number; scenario: Scenario; locale: Locale }) {
  const isBn = locale === "bn";
  const answered = sent && done >= 2;
  return (
    <>
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[#1a120d]/25 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute top-1/2 left-1/2 flex w-[64cqw] -translate-x-1/2 -translate-y-1/2 flex-col gap-[1.6cqw] rounded-[2cqw] bg-white p-[2.4cqw] text-[#111] shadow-[0_3cqw_7cqw_-2cqw_rgba(0,0,0,0.45)]"
      >
        <div className="flex items-center gap-[1cqw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/chatgpt.webp" alt="" className="size-[2.6cqw] rounded-[0.6cqw]" />
          <span className="text-[1.6cqw] font-bold">ChatGPT</span>
          <span className="ml-auto flex items-center gap-[0.6cqw] rounded-full bg-[#fff0ec] px-[1.2cqw] py-[0.4cqw] text-[1.15cqw] font-semibold text-[#ff5a36]">
            <span className="size-[0.8cqw] rounded-full bg-[#ff5a36]" />
            SoftuneBD
          </span>
        </div>

        {sent ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="ml-auto max-w-[80%] rounded-[1.6cqw] bg-[#f2f2f2] px-[1.8cqw] py-[1cqw] text-[1.45cqw]"
          >
            {scenario.prompt[locale]}
          </motion.p>
        ) : null}

        {answered ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="flex flex-col gap-[1.6cqw]">
            <div className="grid grid-cols-3 gap-[1cqw]">
              {[
                { k: isBn ? "বিক্রি" : "Sales", v: "৳48,600" },
                { k: isBn ? "অর্ডার" : "Orders", v: "37" },
                { k: isBn ? "গত সপ্তাহের তুলনায়" : "vs last week", v: "+18%" },
              ].map((m, i) => (
                <motion.div
                  key={m.k}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, ease: EASE }}
                  className="rounded-[1.2cqw] border border-[#eee] px-[1.4cqw] py-[1.1cqw]"
                >
                  <p className="text-[1.1cqw] text-[#777]">{m.k}</p>
                  <p className={["text-[2.2cqw] font-bold tabular-nums", i === 2 ? "text-emerald-600" : ""].join(" ")}>{m.v}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex h-[10cqw] items-end gap-[1cqw]">
              {WEEK.map((h, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-[0.5cqw]">
                  <motion.span
                    className={["w-full rounded-[0.6cqw]", i === WEEK.length - 1 ? "bg-[#ff5a36]" : "bg-[#ff5a36]/25"].join(" ")}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: EASE }}
                  />
                  <span className="text-[1cqw] text-[#999]">{DAYS[i]}</span>
                </div>
              ))}
            </div>
            <p className="text-[1.35cqw] leading-relaxed text-[#333]">
              {isBn ? "সবচেয়ে বেশি বিক্রি: Silk Saree। শুক্রবার ছিল সেরা দিন।" : "Best seller: Silk Saree. Friday was your best day."}
            </p>
          </motion.div>
        ) : sent ? (
          <span className="flex items-center gap-[0.6cqw] py-[0.6cqw]" aria-label="Thinking">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="size-[0.9cqw] rounded-full bg-[#bbb]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
              />
            ))}
          </span>
        ) : null}
      </motion.div>
    </>
  );
}
