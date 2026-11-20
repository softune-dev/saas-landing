"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Mail, MessageCircle, X } from "lucide-react";
import { answer, STARTERS, type Answer, type Locale } from "./help/knowledge";
import { INSTAGRAM_URL, MESSENGER_URL, SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/site";

/**
 * Floating help: one button, two tabs. "Ask" answers from a fixed, written
 * knowledge base (components/help/knowledge.ts, built on the site FAQ), so
 * it needs no API key and never makes things up: when it doesn't know, it
 * says so and hands the question to a person on WhatsApp. "Talk to us" is
 * WhatsApp, Messenger and Instagram.
 */

type Msg = { from: "user"; text: string } | { from: "bot"; answer: Answer | null; question: string };

const WA = `https://wa.me/${SUPPORT_PHONE.replace("+", "")}`;
const waWith = (text: string) => `${WA}?text=${encodeURIComponent(text)}`;

const T = {
  en: {
    open: "Help", title: "SoftuneBD help", sub: "Instant answers, or a real person on WhatsApp",
    ask: "Ask", talk: "Talk to us", hello: "Hi! Ask anything about SoftuneBD: pricing, payments, couriers, setup. Or pick one:",
    placeholder: "Type your question", unknown: "I don't have that one written down yet. Send it to the team and a person will answer:",
    sendWa: "Ask on WhatsApp", from: "From", fastest: "Fastest, usually within minutes", msgr: "Message our Facebook page",
    ig: "DM us on Instagram", email: "Or email",
  },
  bn: {
    open: "সাহায্য", title: "SoftuneBD সাহায্য", sub: "সাথে সাথে উত্তর, অথবা WhatsApp-এ সরাসরি মানুষ",
    ask: "প্রশ্ন করুন", talk: "কথা বলুন", hello: "হ্যালো! SoftuneBD নিয়ে যা জানতে চান জিজ্ঞেস করুন: দাম, পেমেন্ট, কুরিয়ার, সেটআপ। অথবা একটি বেছে নিন:",
    placeholder: "আপনার প্রশ্ন লিখুন", unknown: "এই প্রশ্নের উত্তর এখনো লেখা নেই। টিমকে পাঠান, একজন মানুষ উত্তর দেবেন:",
    sendWa: "WhatsApp-এ জিজ্ঞেস করুন", from: "সূত্র", fastest: "সবচেয়ে দ্রুত, সাধারণত কয়েক মিনিটে", msgr: "আমাদের ফেসবুক পেজে মেসেজ দিন",
    ig: "Instagram-এ DM করুন", email: "অথবা ইমেইল",
  },
};

export function ChatWidget() {
  const pathname = usePathname() || "/";
  const locale: Locale = pathname === "/bn" || pathname.startsWith("/bn/") ? "bn" : "en";
  const t = T[locale];
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"ask" | "talk">("ask");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function ask(q: string) {
    const question = q.trim();
    if (!question || typing) return;
    setInput("");
    setMsgs((m) => [...m, { from: "user", text: question }]);
    setTyping(true);
    // A short pause reads as "looked it up" rather than a canned instant reply.
    window.setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", answer: answer(question, locale), question }]);
      setTyping(false);
    }, 550);
  }

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-label={t.title}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-2 bottom-[5.25rem] z-[90] flex h-[min(620px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-3xl bg-[var(--color-surface)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] ring-1 ring-[var(--color-line)] sm:inset-x-auto sm:right-5 sm:w-[380px]"
          >
            <div className="bg-[var(--color-ink)] px-5 pt-5 pb-3 text-[var(--color-canvas)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[16px] font-bold tracking-tight">{t.title}</p>
                  <p className="mt-0.5 text-[12.5px] opacity-70">{t.sub}</p>
                </div>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="-mt-1 -mr-1 flex size-8 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100">
                  <X className="size-4" strokeWidth={2.2} />
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-1 rounded-full bg-[var(--color-canvas)]/10 p-1 text-[13px] font-semibold">
                {(["ask", "talk"] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setTab(k)}
                    className={`rounded-full py-1.5 transition-colors ${tab === k ? "bg-[var(--color-canvas)] text-[var(--color-ink)]" : "opacity-75 hover:opacity-100"}`}
                  >
                    {k === "ask" ? t.ask : t.talk}
                  </button>
                ))}
              </div>
            </div>

            {tab === "ask" ? (
              <>
                <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                  <BotText>{t.hello}</BotText>
                  <Chips items={STARTERS[locale]} onPick={ask} />
                  {msgs.map((m, i) =>
                    m.from === "user" ? (
                      <div key={i} className="flex justify-end">
                        <p className="max-w-[80%] rounded-2xl rounded-br-md bg-[var(--color-brand)] px-3.5 py-2 text-[14px] leading-snug text-white">{m.text}</p>
                      </div>
                    ) : (
                      <BotReply key={i} msg={m} t={t} onPick={ask} />
                    ),
                  )}
                  {typing ? (
                    <div className="flex gap-1 px-1 py-2" aria-label="Typing">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="size-1.5 animate-pulse rounded-full bg-[var(--color-muted)]" style={{ animationDelay: `${d * 120}ms` }} />
                      ))}
                    </div>
                  ) : null}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    ask(input);
                  }}
                  className="flex items-center gap-2 border-t border-[var(--color-line)] p-3"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t.placeholder}
                    aria-label={t.placeholder}
                    className="h-11 min-w-0 flex-1 rounded-full bg-[var(--color-canvas)] px-4 text-[14px] text-[var(--color-ink)] ring-1 ring-[var(--color-line)] outline-none placeholder:text-[var(--color-muted)] focus:ring-[var(--color-brand)]"
                  />
                  <button type="submit" aria-label="Send" disabled={!input.trim() || typing} className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-white transition-opacity disabled:opacity-40">
                    <ArrowUp className="size-4" strokeWidth={2.4} />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 space-y-2.5 overflow-y-auto p-4">
                <Channel href={WA} icon="/icons/whatsapp.svg" tint="#25D366" name="WhatsApp" note={t.fastest} />
                <Channel href={MESSENGER_URL} icon="/icons/facebook.webp" tint="#0866FF" name="Messenger" note={t.msgr} />
                <Channel href={INSTAGRAM_URL} icon="/icons/insta.webp" tint="#E1306C" name="Instagram" note={t.ig} />
                <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center justify-center gap-2 pt-3 text-[13px] text-[var(--color-muted)] hover:text-[var(--color-ink)]">
                  <Mail className="size-4" strokeWidth={1.8} />
                  {t.email} {SUPPORT_EMAIL}
                </a>
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close help" : t.open}
        className="fixed right-4 bottom-4 z-[90] flex h-14 items-center gap-2 rounded-full bg-[var(--color-ink)] pr-5 pl-4 text-[var(--color-canvas)] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.03] active:scale-95 sm:right-5 sm:bottom-5"
      >
        <span className="relative flex size-6 items-center justify-center">
          {open ? <X className="size-5" strokeWidth={2.2} /> : <MessageCircle className="size-5" strokeWidth={2} />}
          {open ? null : <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-[#25D366] ring-2 ring-[var(--color-ink)]" />}
        </span>
        <span className="text-[14px] font-semibold">{t.open}</span>
      </button>
    </>
  );
}

function BotText({ children }: { children: React.ReactNode }) {
  return <p className="max-w-[92%] text-[14px] leading-relaxed whitespace-pre-line text-[var(--color-ink)]">{children}</p>;
}

function Chips({ items, onPick }: { items: string[]; onPick: (q: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((q) => (
        <button key={q} type="button" onClick={() => onPick(q)} className="rounded-full bg-[var(--color-canvas)] px-3 py-1.5 text-left text-[12.5px] font-medium text-[var(--color-ink)] ring-1 ring-[var(--color-line)] transition-colors hover:ring-[var(--color-brand)]">
          {q}
        </button>
      ))}
    </div>
  );
}

function BotReply({ msg, t, onPick }: { msg: Extract<Msg, { from: "bot" }>; t: (typeof T)["en"]; onPick: (q: string) => void }) {
  const a = msg.answer;
  if (!a) {
    return (
      <div className="space-y-2.5">
        <BotText>{t.unknown}</BotText>
        <a href={waWith(msg.question)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-[13px] font-semibold text-white">
          {t.sendWa}
          <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
        </a>
      </div>
    );
  }
  return (
    <div className="space-y-2.5">
      <div className="border-l-2 border-[var(--color-brand)] pl-3">
        <BotText>{a.text}</BotText>
        <p className="mt-1.5 text-[11px] font-semibold tracking-wide text-[var(--color-muted)] uppercase">
          {t.from} {a.source}
        </p>
      </div>
      {a.actions?.length ? (
        <div className="flex flex-wrap gap-1.5">
          {a.actions.map((ac) =>
            ac.external ? (
              <a key={ac.href} href={ac.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-3.5 py-1.5 text-[12.5px] font-semibold text-[var(--color-canvas)]">
                {ac.label}
                <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
              </a>
            ) : (
              <Link key={ac.href} href={ac.href} className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-3.5 py-1.5 text-[12.5px] font-semibold text-[var(--color-canvas)]">
                {ac.label}
                <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
              </Link>
            ),
          )}
        </div>
      ) : null}
      {a.followUps?.length ? <Chips items={a.followUps} onPick={onPick} /> : null}
    </div>
  );
}

function Channel({ href, icon, tint, name, note }: { href: string; icon: string; tint: string; name: string; note: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl bg-[var(--color-canvas)] p-3 ring-1 ring-[var(--color-line)] transition-shadow hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.35)]">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${tint}1A` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" className="size-6 object-contain" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] font-bold text-[var(--color-ink)]">{name}</span>
        <span className="block truncate text-[12.5px] text-[var(--color-muted)]">{note}</span>
      </span>
      <ArrowUpRight className="size-4 shrink-0 text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-ink)]" strokeWidth={2.2} />
    </a>
  );
}
