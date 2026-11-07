"use client";

import { ArrowUp, Baby, Brain, Check, Eye, EyeOff, Headphones, Leaf, Loader, Lock, Mail, Palette, Shirt, Sparkles, User, WandSparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, type FormEvent, type ReactNode, type RefObject } from "react";
import { OTP_LENGTH, OtpBoxes } from "../otp-boxes";
import { PasswordStrength } from "../password-strength";
import { RecaptchaDisclosure } from "../recaptcha-disclosure";
import {
  RecaptchaV2Fallback,
  type RecaptchaV2FallbackHandle,
} from "../recaptcha-v2-fallback";
import { FontPicker } from "../font-picker";
import { BODY_FONTS, COLOR_SWATCHES, HEADING_FONTS, TEMPLATES, type TemplateKey } from "../trial-theme-step";
import { IDEA_EXAMPLES, t, type Locale } from "./agent-copy";
import { ActionButton, BRAND_GRADIENT, BrandButton } from "./agent-ui";

/**
 * The agent input, modelled on a deep-black prompt box: a soft outer bezel
 * around the field, text on top, a control row underneath with the send
 * button on the right. While the agent is working, a status strip hangs off
 * the bottom of the box ("Thinking…") and send turns into a stop square, so
 * there is one obvious place to look for what's happening. No gradients:
 * colour lives only in the suggestion chips' icons.
 * 16px text on phones: smaller makes iOS Safari zoom on focus.
 */
export function Composer({
  value,
  onChange,
  onSubmit,
  placeholder,
  multiline,
  prefix,
  inputMode,
  autoComplete,
  chips,
  meta,
  working,
  workingLabel,
  onSurprise,
  surpriseLabel,
  below,
  sendLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder: string;
  multiline?: boolean;
  prefix?: ReactNode;
  inputMode?: "text" | "numeric" | "tel";
  autoComplete?: string;
  /** Context shown inside the box above the text, like an attachment. */
  chips?: ReactNode;
  /** Left side of the control row. */
  meta?: ReactNode;
  working?: boolean;
  workingLabel?: string;
  /** Top-right wand: fills the box with a ready-made example. */
  onSurprise?: () => void;
  surpriseLabel?: string;
  below?: ReactNode;
  sendLabel: string;
}) {
  const ref = useRef<HTMLTextAreaElement & HTMLInputElement>(null);

  useEffect(() => {
    // Not on touch: popping the keyboard over a reply not yet read hides it.
    if (window.matchMedia("(pointer: fine)").matches) ref.current?.focus();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!multiline || !el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(Math.max(el.scrollHeight, 56), 160)}px`;
  }, [value, multiline]);

  function submit(e?: FormEvent) {
    e?.preventDefault();
    if (value.trim() && !working) onSubmit();
  }

  const field =
    "w-full min-w-0 bg-transparent text-base leading-relaxed text-white outline-none placeholder:text-white/35 sm:text-[15px]";

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <div className="rounded-[26px] bg-[#151515] p-[5px] ring-1 ring-white/[0.05]">
        <div
          onClick={() => ref.current?.focus()}
          className="rounded-[21px] border border-white/[0.09] bg-[#0b0b0b] px-4 pt-3.5 pb-3 transition-colors focus-within:border-white/20"
        >
          {chips ? <div className="mb-2.5 flex flex-wrap gap-1.5">{chips}</div> : null}
          <div className="flex items-start gap-3">
            {prefix ? <span className="pt-px text-base text-white/40 sm:text-[15px]">{prefix}</span> : null}
            {multiline ? (
              <textarea
                ref={ref}
                rows={2}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) submit(e);
                }}
                placeholder={working ? workingLabel : placeholder}
                className={`${field} resize-none ${working ? "placeholder:text-[#ff8a65]" : ""}`}
              />
            ) : (
              <input
                ref={ref}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={working ? workingLabel : placeholder}
                inputMode={inputMode}
                autoComplete={autoComplete}
                className={`${field} ${working ? "placeholder:text-[#ff8a65]" : ""}`}
              />
            )}
            {onSurprise ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSurprise();
                }}
                aria-label={surpriseLabel}
                title={surpriseLabel}
                className="-mt-0.5 -mr-1 flex size-8 shrink-0 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <WandSparkles className="size-[18px]" strokeWidth={1.6} />
              </button>
            ) : null}
          </div>

          <div className={`flex items-center gap-3 ${multiline ? "mt-4" : "mt-3"}`}>
            <div className="min-w-0 flex-1 truncate text-[12.5px] text-white/45">{meta}</div>
            <button
              type="submit"
              disabled={!value.trim() || working}
              aria-label={sendLabel}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0b0b0b] transition-[opacity,transform] active:scale-95 disabled:opacity-25"
            >
              {working ? (
                <span className="size-3.5 rounded-[3px] border-2 border-[#0b0b0b]" />
              ) : (
                <ArrowUp className="size-[18px]" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
        {working ? (
          <div className="flex items-center gap-2 px-3 pt-2 pb-1 text-[12.5px] text-white/55">
            <Brain className="size-3.5" strokeWidth={1.8} />
            <span className="ai-shimmer">{workingLabel}</span>
            <Loader className="ml-auto size-3.5 animate-spin" strokeWidth={1.8} />
          </div>
        ) : null}
      </div>
      {below}
    </form>
  );
}
/** A context chip inside the input box, styled like a file attachment:
 * white icon tile, then the text. */
export function ComposerChip({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="flex max-w-full items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] py-1 pr-2.5 pl-1.5 text-[12.5px] text-white/80">
      <span className="flex size-5 shrink-0 items-center justify-center rounded-[5px] bg-white/90 text-[#0b0b0d]">{icon}</span>
      <span className="truncate">{children}</span>
    </span>
  );
}
const IDEA_ICONS = [
  { Icon: Shirt, color: "text-pink-400" },
  { Icon: Sparkles, color: "text-violet-400" },
  { Icon: Headphones, color: "text-sky-400" },
  { Icon: Leaf, color: "text-emerald-400" },
  { Icon: Baby, color: "text-amber-400" },
  { Icon: Palette, color: "text-rose-400" },
];

/** Starter ideas as chips under the input, each with its own coloured icon:
 * the only colour on an otherwise black-and-white screen. */
export function IdeaChips({ locale, onPick }: { locale: Locale; onPick: (prompt: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {IDEA_EXAMPLES.map((ex, i) => {
        const { Icon, color } = IDEA_ICONS[i % IDEA_ICONS.length]!;
        return (
          <motion.button
            key={ex.image}
            type="button"
            onClick={() => onPick(ex.prompt[locale])}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
            className="flex items-center gap-2 rounded-xl border border-white/[0.09] bg-[#111] px-3 py-2 text-[13.5px] text-white/85 transition-colors hover:border-white/20 hover:bg-[#181818] hover:text-white"
          >
            <Icon className={`size-4 ${color}`} strokeWidth={1.8} />
            {ex.title[locale]}
          </motion.button>
        );
      })}
    </div>
  );
}
export function LookPicker({
  locale,
  templateKey,
  recommended,
  color,
  displayFont,
  bodyFont,
  onTemplate,
  onColor,
  onDisplayFont,
  onBodyFont,
  onDone,
}: {
  locale: Locale;
  templateKey: TemplateKey;
  recommended: TemplateKey;
  color: string;
  displayFont: string;
  bodyFont: string;
  onTemplate: (k: TemplateKey) => void;
  onColor: (c: string) => void;
  onDisplayFont: (f: string) => void;
  onBodyFont: (f: string) => void;
  onDone: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0">
        {TEMPLATES.map((tpl) => {
          const on = tpl.key === templateKey;
          return (
            <button
              key={tpl.slug}
              type="button"
              onClick={() => onTemplate(tpl.key)}
              aria-pressed={on}
              className="relative w-[58%] shrink-0 snap-start rounded-[20px] p-[2px] text-left transition-shadow sm:w-auto"
              style={{
                background: on ? BRAND_GRADIENT : "rgba(255,255,255,0.08)",
              }}
            >
              <span className="block overflow-hidden rounded-[18px] bg-[#0f0f0f]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tpl.image} alt="" className="aspect-[4/5] w-full object-cover object-top" />
                <span className="flex items-center justify-between gap-1 px-3 py-2.5 text-[14px] font-semibold text-white">
                  {tpl.name}
                  {tpl.key === recommended ? (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10.5px] font-semibold text-[#ffb454]">
                      {t(locale, "Agent pick", "এজেন্টের পছন্দ")}
                    </span>
                  ) : null}
                </span>
              </span>
              {on ? (
                <span className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full text-white shadow-lg" style={{ background: BRAND_GRADIENT }}>
                  <Check className="size-4" strokeWidth={3} />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="text-[12px] font-semibold tracking-[0.12em] text-white/40 uppercase">
          {t(locale, "Brand color", "ব্র্যান্ড কালার")}
        </span>
        <div className="flex flex-wrap gap-2.5">
          {COLOR_SWATCHES.map((c) => {
            const on = c.toLowerCase() === color.toLowerCase();
            return (
              <button
                key={c}
                type="button"
                aria-label={c}
                aria-pressed={on}
                onClick={() => onColor(c)}
                className={[
                  "size-9 rounded-full transition-transform",
                  on ? "scale-110 ring-2 ring-white ring-offset-[3px] ring-offset-[#0a0a0a]" : "ring-1 ring-white/15 hover:scale-105",
                ].join(" ")}
                style={{ backgroundColor: c }}
              />
            );
          })}
        </div>
      </div>

      {/* Fonts: the agent pre-picks a pair (randomised per visitor), shown
          here so it can be changed — same searchable picker as the old
          wizard, each option previewed in its own face. */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[12px] font-semibold tracking-[0.12em] text-white/40 uppercase">
          {t(locale, "Fonts", "ফন্ট")}
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          <label className="flex min-w-0 flex-col gap-1.5">
            <span className="text-[12px] text-white/50">{t(locale, "Headings", "হেডিং")}</span>
            <FontPicker value={displayFont} options={HEADING_FONTS} onChange={onDisplayFont} />
          </label>
          <label className="flex min-w-0 flex-col gap-1.5">
            <span className="text-[12px] text-white/50">{t(locale, "Body text", "বডি টেক্সট")}</span>
            <FontPicker value={bodyFont} options={BODY_FONTS} onChange={onBodyFont} />
          </label>
        </div>
      </div>

      <BrandButton type="button" onClick={onDone} className="self-start">
        {t(locale, "Use this design", "এই ডিজাইন নিন")}
      </BrandButton>
    </div>
  );
}

export function AccountCard(props: {
  locale: Locale;
  fullName: string;
  email: string;
  password: string;
  showPassword: boolean;
  busy: boolean;
  needsChallenge: boolean;
  hasV2Fallback: boolean;
  v2Token: string | null;
  v2Ref: RefObject<RecaptchaV2FallbackHandle | null>;
  onFullName: (v: string) => void;
  onEmail: (v: string) => void;
  onPassword: (v: string) => void;
  onTogglePassword: () => void;
  onV2Verify: (token: string | null) => void;
  onSubmit: (e: FormEvent) => void;
}) {
  const { locale } = props;
  const L = (en: string, bn: string) => t(locale, en, bn);
  const row = "flex items-center gap-3 px-4";
  const bare =
    "h-[52px] min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/30 sm:text-[15px]";
  const icon = "size-[17px] shrink-0 text-white/35 transition-colors group-focus-within:text-white/80";

  // One grouped box instead of three separate chunky fields: rows share a
  // frame and are split by hairlines, each with a leading icon that lights
  // up while its row is focused.
  return (
    <form onSubmit={props.onSubmit} className="flex flex-col gap-4">
      <div className="divide-y divide-white/[0.08] overflow-hidden rounded-[20px] border border-white/[0.12] bg-[#0b0b0d]/95 backdrop-blur">
        <label className={`group ${row}`}>
          <User className={icon} strokeWidth={1.8} />
          <input
            type="text"
            autoComplete="name"
            aria-label={L("Your name", "আপনার নাম")}
            placeholder={L("Your name", "আপনার নাম")}
            value={props.fullName}
            onChange={(e) => props.onFullName(e.target.value)}
            className={bare}
          />
        </label>
        <label className={`group ${row}`}>
          <Mail className={icon} strokeWidth={1.8} />
          <input
            type="email"
            required
            autoComplete="email"
            aria-label={L("Email", "ইমেইল")}
            placeholder="name@email.com"
            value={props.email}
            onChange={(e) => props.onEmail(e.target.value)}
            className={bare}
          />
        </label>
        <label className={`group ${row}`}>
          <Lock className={icon} strokeWidth={1.8} />
          <input
            type={props.showPassword ? "text" : "password"}
            required
            minLength={8}
            autoComplete="new-password"
            aria-label={L("Password", "পাসওয়ার্ড")}
            placeholder={L("Create a password", "পাসওয়ার্ড দিন")}
            value={props.password}
            onChange={(e) => props.onPassword(e.target.value)}
            className={bare}
          />
          <button
            type="button"
            onClick={props.onTogglePassword}
            aria-label={props.showPassword ? L("Hide password", "পাসওয়ার্ড লুকান") : L("Show password", "পাসওয়ার্ড দেখান")}
            className="-mr-2 flex size-9 shrink-0 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            {props.showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </label>
      </div>

      <PasswordStrength password={props.password} locale={locale} />

      {props.needsChallenge && props.hasV2Fallback ? (
        <RecaptchaV2Fallback ref={props.v2Ref} onVerify={props.onV2Verify} />
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <RecaptchaDisclosure />
        <ActionButton type="submit" busy={props.busy} disabled={props.busy || (props.needsChallenge && !props.v2Token)}>
          {props.busy ? L("Creating account...", "একাউন্ট তৈরি হচ্ছে...") : L("Create account", "একাউন্ট তৈরি করুন")}
        </ActionButton>
      </div>
    </form>
  );
}
export function VerifyCard(props: {
  locale: Locale;
  digits: string[];
  busy: boolean;
  resending: boolean;
  resent: boolean;
  onDigits: (next: string[]) => void;
  onSubmit: (e: FormEvent) => void;
  onResend: () => void;
  onChangeEmail: () => void;
}) {
  const { locale } = props;
  const L = (en: string, bn: string) => t(locale, en, bn);
  return (
    <form onSubmit={props.onSubmit} className="flex flex-col gap-4">
      <OtpBoxes value={props.digits} onChange={props.onDigits} disabled={props.busy} />
      {props.resent ? (
        <p className="text-sm font-medium text-[#ffb454]">{L("A new code is on the way.", "একটি নতুন কোড পাঠানো হয়েছে।")}</p>
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-sm">
          <button type="button" onClick={props.onResend} disabled={props.resending || props.busy} className="font-medium text-[#ff9b6a] disabled:opacity-50">
            {props.resending ? L("Sending...", "পাঠানো হচ্ছে...") : L("Resend code", "কোড আবার পাঠান")}
          </button>
          <button type="button" onClick={props.onChangeEmail} disabled={props.busy} className="font-medium text-white/45 transition-colors hover:text-white">
            {L("Use a different email", "অন্য ইমেইল দিন")}
          </button>
        </div>
        <ActionButton type="submit" busy={props.busy} disabled={props.busy || props.digits.join("").length !== OTP_LENGTH}>
          {props.busy ? L("Checking...", "যাচাই হচ্ছে...") : L("Verify", "যাচাই করুন")}
        </ActionButton>
      </div>
    </form>
  );
}
