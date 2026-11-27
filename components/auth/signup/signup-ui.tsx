"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, X } from "lucide-react";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { PROGRESS, SIDE_IMAGE, t, type Locale, type StepId } from "./signup-copy";

/** One plain field shape everywhere: a thin border that turns solid on focus.
 * 16px text, so iOS Safari doesn't zoom in. */
export const boxClass =
  "flex h-[52px] w-full items-center gap-3 rounded-xl border border-line bg-surface px-4 transition-[border-color,box-shadow] focus-within:border-ink focus-within:shadow-[0_0_0_1px_var(--ink)]";

export const bareInputClass = "h-full w-full min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted-soft";

export function Spinner() {
  return <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />;
}

export function PrimaryButton({ busy, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { busy?: boolean }) {
  return (
    <button
      type="submit"
      {...props}
      disabled={busy || props.disabled}
      className="flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-brand px-7 text-base font-bold text-white transition-[filter,transform] hover:brightness-95 focus-visible:ring-4 focus-visible:ring-brand/30 focus-visible:outline-none active:scale-[0.99] disabled:pointer-events-none disabled:opacity-40"
    >
      {busy ? <Spinner /> : null}
      {children}
    </button>
  );
}

/** The placeholder is the visible label; screen readers get the real one. */
export function TextInput({ label, trailing, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; trailing?: ReactNode }) {
  return (
    <div className={boxClass}>
      <input aria-label={label} placeholder={label} {...props} className={bareInputClass} />
      {trailing}
    </div>
  );
}

export function ErrorBox({ message }: { message: string | null }) {
  return message ? (
    <p role="alert" className="rounded-xl bg-rose-500/10 px-4 py-3 text-center text-sm font-medium text-rose-700 dark:text-rose-300">
      {message}
    </p>
  ) : null;
}

export function Heading({ title, sub }: { title: string; sub?: ReactNode }) {
  return (
    <header className="text-center">
      <h1 className="text-[26px] leading-tight !font-extrabold tracking-[-0.025em] text-balance text-ink sm:text-[30px]">{title}</h1>
      {sub ? <p className="mt-2 text-[15px] text-muted">{sub}</p> : null}
    </header>
  );
}

const roundButton = "flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-search-bg";

/** Phones: logo, the question, the answer. Desktop adds a full-height photo
 * on the right. `wide` drops the photo for the design gallery. */
export function SignupShell({
  locale,
  step,
  isPreview,
  wide,
  onBack,
  children,
}: {
  locale: Locale;
  step: StepId;
  isPreview: boolean;
  wide: boolean;
  onBack?: () => void;
  children: ReactNode;
}) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  const home = locale === "bn" ? "/bn" : "/";

  return (
    <div className={`min-h-dvh bg-surface ${wide ? "" : "lg:grid lg:grid-cols-2"}`}>
      <div className="flex min-h-dvh min-w-0 flex-col">
        <div className="h-1 bg-search-bg">
          <div className="h-full rounded-r-full bg-brand transition-[width] duration-500 ease-out" style={{ width: `${PROGRESS[step]}%` }} />
        </div>
        <div className="grid h-16 grid-cols-[40px_1fr_40px] items-center px-3 sm:px-6">
          {onBack ? (
            <button type="button" onClick={onBack} aria-label={L("Back", "পেছনে")} className={roundButton}>
              <ChevronLeft className="size-6" />
            </button>
          ) : (
            <span />
          )}
          <a href={home} className="justify-self-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-dark.png" alt="SoftuneBD" className="h-7 w-auto dark:hidden" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.png" alt="SoftuneBD" className="hidden h-7 w-auto dark:block" />
          </a>
          <a href={home} aria-label={L("Close", "বন্ধ করুন")} className={roundButton}>
            <X className="size-5" />
          </a>
        </div>

        <main className={wide ? "flex flex-1 flex-col" : "flex flex-1 justify-center px-5 pt-5 pb-10 sm:px-10 lg:items-center lg:pt-0"}>
          {wide ? (
            children
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.18 }}
                className="flex w-full max-w-[420px] flex-col"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          )}
        </main>
        {isPreview ? (
          <p className="pointer-events-none fixed bottom-2 left-2 z-40 rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-semibold text-black">
            {L("Preview: nothing is saved", "প্রিভিউ: কিছু সেভ হবে না")}
          </p>
        ) : null}
      </div>

      {wide ? null : (
        <aside className="hidden p-3 lg:block">
          <div className="sticky top-3 h-[calc(100dvh-1.5rem)] overflow-hidden rounded-[28px] bg-[#fde3d1]">
            <AnimatePresence initial={false}>
              <motion.img
                key={SIDE_IMAGE[step]}
                src={SIDE_IMAGE[step]}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
          </div>
        </aside>
      )}
    </div>
  );
}
