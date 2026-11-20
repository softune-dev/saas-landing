"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Mail, X } from "lucide-react";
import { answer, STARTERS, type Answer, type Locale } from "./help/knowledge";
import { INSTAGRAM_URL, LINKEDIN_URL, MESSENGER_URL, SUPPORT_EMAIL, SUPPORT_PHONE, X_URL } from "@/lib/site";

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
    ask: "Ask Softy", talk: "Talk to us", hello: "Hi, I'm Softy! Ask me anything about SoftuneBD: pricing, payments, couriers, setup. Or pick one:",
    placeholder: "Type your question", unknown: "I don't have that one written down yet. Send it to the team and a person will answer:",
    sendWa: "Ask on WhatsApp", from: "From", fastest: "Fastest, usually within minutes", msgr: "Message our Facebook page",
    ig: "DM us on Instagram", email: "Or email", li: "Follow us on LinkedIn", xnote: "Follow and message on X", soon: "Coming soon", soonNote: "Not live yet",
  },
  bn: {
    ask: "Softy-কে জিজ্ঞেস করুন", talk: "কথা বলুন", hello: "হ্যালো, আমি Softy! SoftuneBD নিয়ে যা জানতে চান জিজ্ঞেস করুন: দাম, পেমেন্ট, কুরিয়ার, সেটআপ। অথবা একটি বেছে নিন:",
    placeholder: "আপনার প্রশ্ন লিখুন", unknown: "এই প্রশ্নের উত্তর এখনো লেখা নেই। টিমকে পাঠান, একজন মানুষ উত্তর দেবেন:",
    sendWa: "WhatsApp-এ জিজ্ঞেস করুন", from: "সূত্র", fastest: "সবচেয়ে দ্রুত, সাধারণত কয়েক মিনিটে", msgr: "আমাদের ফেসবুক পেজে মেসেজ দিন",
    ig: "Instagram-এ DM করুন", email: "অথবা ইমেইল", li: "LinkedIn-এ ফলো করুন", xnote: "X-এ ফলো ও মেসেজ করুন", soon: "শীঘ্রই আসছে", soonNote: "এখনো চালু হয়নি",
  },
};

/** Brand glyphs for channels that have no image file in /icons. */
const GLYPH: Record<string, string> = {
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  tiktok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  youtube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  telegram: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
};

type Chan = { name: string; tint: string; href?: string; img?: string; glyph?: string };

const LIVE: Chan[] = [
  { name: "WhatsApp", tint: "#25D366", href: WA, img: "/icons/whatsapp.svg" },
  { name: "Messenger", tint: "#0866FF", href: MESSENGER_URL, img: "/icons/facebook.webp" },
  { name: "Instagram", tint: "#E1306C", href: INSTAGRAM_URL, img: "/icons/insta.webp" },
  { name: "LinkedIn", tint: "#0A66C2", href: LINKEDIN_URL, img: "/icons/linkedin.webp" },
  { name: "X", tint: "#111111", href: X_URL, glyph: "x" },
];
/** Not set up yet: shown greyed out, not clickable. */
const SOON: Chan[] = [
  { name: "TikTok", tint: "#111111", glyph: "tiktok" },
  { name: "YouTube", tint: "#FF0000", glyph: "youtube" },
  { name: "Telegram", tint: "#27A7E7", glyph: "telegram" },
];

function ChanIcon({ c, size }: { c: Chan; size: number }) {
  return c.img ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={c.img} alt="" width={size} height={size} className="object-contain" style={{ width: size, height: size }} />
  ) : (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden fill="currentColor" style={{ color: c.tint === "#111111" ? "var(--color-ink)" : c.tint }}>
      <path d={c.glyph ? GLYPH[c.glyph] : ""} />
    </svg>
  );
}

/** The three main ways to reach us, as logo buttons inside a chat reply. */
function ChannelRow() {
  return (
    <div className="flex flex-wrap gap-2">
      {LIVE.slice(0, 3).map((c) => (
        <a
          key={c.name}
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={c.name}
          title={c.name}
          className="flex size-11 items-center justify-center rounded-2xl ring-1 ring-[var(--color-line)] transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: `${c.tint}1A` }}
        >
          <ChanIcon c={c} size={24} />
        </a>
      ))}
    </div>
  );
}

/** Softy, the help assistant: a small friendly robot in the brand colour. */
function BotAvatar({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden className={`shrink-0 ${className}`}>
      <defs>
        <linearGradient id="softy-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF7A45" />
          <stop offset="1" stopColor="#E8431A" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#softy-bg)" />
      <line x1="20" y1="7.5" x2="20" y2="11" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="20" cy="6.5" r="1.9" fill="#FFE1D4" />
      <rect x="9.5" y="11" width="21" height="17" rx="6.5" fill="#fff" />
      <rect x="7" y="17" width="2.5" height="5.5" rx="1.25" fill="#fff" opacity="0.85" />
      <rect x="30.5" y="17" width="2.5" height="5.5" rx="1.25" fill="#fff" opacity="0.85" />
      <rect x="12.5" y="14" width="15" height="10" rx="4.5" fill="#1F1B2E" />
      <circle cx="16.8" cy="18.4" r="1.7" fill="#5EEAD4" />
      <circle cx="23.2" cy="18.4" r="1.7" fill="#5EEAD4" />
      <path d="M17.6 21.4 Q20 23.1 22.4 21.4" stroke="#5EEAD4" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <rect x="15" y="29.5" width="10" height="3.5" rx="1.75" fill="#fff" opacity="0.9" />
    </svg>
  );
}

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
    }, 650);
  }

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-label="SoftuneBD help"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-2 bottom-[5.25rem] z-[90] flex h-[min(600px,calc(100dvh-7rem))] flex-col overflow-hidden rounded-3xl bg-[var(--color-surface)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] ring-1 ring-[var(--color-line)] sm:inset-x-auto sm:right-5 sm:w-[380px]"
          >
            <div className="p-2.5">
              <div className="grid grid-cols-2 gap-1 rounded-2xl bg-[var(--color-canvas)] p-1 text-[13px] font-semibold ring-1 ring-[var(--color-line)]">
                {(["ask", "talk"] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setTab(k)}
                    className={`flex items-center justify-center gap-1.5 rounded-xl py-2 transition-colors ${tab === k ? "bg-[var(--color-ink)] text-[var(--color-canvas)] shadow-sm" : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"}`}
                  >
                    {k === "ask" ? <BotAvatar size={18} /> : null}
                    {k === "ask" ? t.ask : t.talk}
                  </button>
                ))}
              </div>
            </div>

            {tab === "ask" ? (
              <>
                <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto px-3.5 pt-1 pb-4">
                  <BotRow>
                    <Bubble>{t.hello}</Bubble>
                    <Chips items={STARTERS[locale]} onPick={ask} />
                  </BotRow>
                  {msgs.map((m, i) =>
                    m.from === "user" ? (
                      <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                        <p className="max-w-[80%] rounded-2xl rounded-br-md bg-[var(--color-ink)] px-3.5 py-2 text-[14px] leading-snug text-[var(--color-canvas)]">{m.text}</p>
                      </motion.div>
                    ) : (
                      <BotReply key={i} msg={m} t={t} onPick={ask} />
                    ),
                  )}
                  {typing ? (
                    <BotRow>
                      <div className="inline-flex gap-1 rounded-2xl rounded-tl-md bg-[var(--color-canvas)] px-3.5 py-3 ring-1 ring-[var(--color-line)]" aria-label="Typing">
                        {[0, 1, 2].map((d) => (
                          <span key={d} className="size-1.5 animate-pulse rounded-full bg-[var(--color-muted)]" style={{ animationDelay: `${d * 150}ms` }} />
                        ))}
                      </div>
                    </BotRow>
                  ) : null}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    ask(input);
                  }}
                  className="flex items-center gap-2 border-t border-[var(--color-line)] p-2.5"
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
              <div className="flex-1 space-y-2 overflow-y-auto px-3.5 pt-1 pb-4">
                {LIVE.map((c) => (
                  <Channel key={c.name} c={c} note={c.name === "WhatsApp" ? t.fastest : c.name === "Messenger" ? t.msgr : c.name === "Instagram" ? t.ig : c.name === "LinkedIn" ? t.li : t.xnote} />
                ))}
                <p className="px-1 pt-3 text-[11px] font-semibold tracking-wide text-[var(--color-muted)] uppercase">{t.soon}</p>
                {SOON.map((c) => (
                  <Channel key={c.name} c={c} note={t.soonNote} disabled />
                ))}
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
        aria-label={open ? "Close chat" : "Let's Talk"}
        className="fixed right-4 bottom-4 z-[90] flex h-14 items-center gap-2.5 rounded-full bg-[var(--color-ink)] pr-5 pl-2 text-[var(--color-canvas)] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.03] active:scale-95 sm:right-5 sm:bottom-5"
      >
        <span className="relative">
          {open ? (
            <span className="flex size-10 items-center justify-center rounded-full bg-[var(--color-canvas)]/15">
              <X className="size-5" strokeWidth={2.2} />
            </span>
          ) : (
            <>
              <BotAvatar size={40} />
              <span className="absolute right-0 bottom-0 size-3 rounded-full bg-[#22C55E] ring-2 ring-[var(--color-ink)]" />
            </>
          )}
        </span>
        <span className="text-[14px] font-semibold">{open ? "Close" : "Let's Talk"}</span>
      </button>
    </>
  );
}

function BotRow({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2">
      <BotAvatar size={30} className="mt-0.5" />
      <div className="min-w-0 flex-1 space-y-2">{children}</div>
    </motion.div>
  );
}

function Bubble({ children, footer }: { children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="w-fit max-w-full rounded-2xl rounded-tl-md bg-[var(--color-canvas)] px-3.5 py-2.5 ring-1 ring-[var(--color-line)]">
      <p className="text-[14px] leading-relaxed whitespace-pre-line text-[var(--color-ink)]">{children}</p>
      {footer}
    </div>
  );
}

function Chips({ items, onPick }: { items: string[]; onPick: (q: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((q) => (
        <button key={q} type="button" onClick={() => onPick(q)} className="rounded-full bg-[var(--color-surface)] px-3 py-1.5 text-left text-[12.5px] font-medium text-[var(--color-ink)] ring-1 ring-[var(--color-line)] transition-colors hover:text-[var(--color-brand)] hover:ring-[var(--color-brand)]">
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
      <BotRow>
        <Bubble>{t.unknown}</Bubble>
        <a href={waWith(msg.question)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#128C4A] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#0F7A40]">
          {t.sendWa}
          <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
        </a>
        <ChannelRow />
      </BotRow>
    );
  }
  return (
    <BotRow>
      <Bubble
        footer={
          <p className="mt-2 border-t border-[var(--color-line)] pt-1.5 text-[10.5px] font-semibold tracking-wide text-[var(--color-muted)] uppercase">
            {t.from} {a.source}
          </p>
        }
      >
        {a.text}
      </Bubble>
      {a.actions?.length ? (
        <div className="flex flex-wrap gap-1.5">
          {a.actions.map((ac) => {
            const cls = "inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand)] px-3.5 py-1.5 text-[12.5px] font-semibold text-white";
            const body = (
              <>
                {ac.label}
                <ArrowUpRight className="size-3.5" strokeWidth={2.4} />
              </>
            );
            return ac.external ? (
              <a key={ac.href} href={ac.href} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>
            ) : (
              <Link key={ac.href} href={ac.href} className={cls}>{body}</Link>
            );
          })}
        </div>
      ) : null}
      {a.channels ? <ChannelRow /> : null}
      {a.followUps?.length ? <Chips items={a.followUps} onPick={onPick} /> : null}
    </BotRow>
  );
}

function Channel({ c, note, disabled }: { c: Chan; note: string; disabled?: boolean }) {
  const body = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${c.tint}1A` }}>
        <ChanIcon c={c} size={24} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] font-bold text-[var(--color-ink)]">{c.name}</span>
        <span className="block truncate text-[12.5px] text-[var(--color-muted)]">{note}</span>
      </span>
      {disabled ? null : <ArrowUpRight className="size-4 shrink-0 text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-ink)]" strokeWidth={2.2} />}
    </>
  );
  if (disabled) {
    return (
      <div aria-disabled="true" className="flex cursor-not-allowed items-center gap-3 rounded-2xl bg-[var(--color-canvas)] p-3 opacity-45 ring-1 ring-[var(--color-line)] grayscale">
        {body}
      </div>
    );
  }
  return (
    <a href={c.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl bg-[var(--color-canvas)] p-3 ring-1 ring-[var(--color-line)] transition-shadow hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.35)]">
      {body}
    </a>
  );
}
