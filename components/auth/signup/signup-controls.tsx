"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, MapPin, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BD_DISTRICTS } from "./bd-map";
import { CATEGORIES, t, type Locale } from "./signup-copy";
import { bareInputClass, boxClass } from "./signup-ui";

export function CategoryCards({ locale, value, onChange }: { locale: Locale; value: string; onChange: (v: string) => void }) {
  return (
    <div role="radiogroup" aria-label={t(locale, "What do you sell?", "আপনি কী বিক্রি করেন?")} className="grid grid-cols-3 gap-x-2.5 gap-y-3 sm:grid-cols-4 sm:gap-3">
      {CATEGORIES.map((c) => {
        const active = c.value === value;
        return (
          <label key={c.value} className="relative cursor-pointer">
            <input type="radio" name="category" checked={active} onChange={() => onChange(c.value)} className="peer sr-only" />
            <span
              className={`block overflow-hidden rounded-2xl bg-[#fde1d1] transition-[box-shadow,transform] peer-focus-visible:ring-4 peer-focus-visible:ring-brand/40 active:scale-[0.97] ${
                active ? "shadow-[0_0_0_3px_var(--brand)]" : "hover:-translate-y-0.5"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/signup/categories/${c.value}.webp`} alt="" width={480} height={480} className="block aspect-square w-full object-cover" />
            </span>
            {active ? (
              <span className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-brand text-white shadow">
                <Check aria-hidden className="size-3.5" strokeWidth={3.5} />
              </span>
            ) : null}
            <span className={`mt-1.5 block truncate text-center text-[13px] font-semibold ${active ? "text-brand" : "text-ink"}`}>{c.label[locale]}</span>
          </label>
        );
      })}
    </div>
  );
}

const pad = (v: string) => v.replace(/\D/g, "").slice(0, 11);

export function PhoneInput({ id, label, value, required, onChange }: { id: string; label: string; value: string; required?: boolean; onChange: (v: string) => void }) {
  return (
    <div className={boxClass}>
      <span aria-hidden className="flex shrink-0 items-center gap-2 border-r border-line pr-3">
        {/* Drawn, not an emoji: Windows shows flag emojis as two letters. */}
        <span className="relative h-4 w-6 overflow-hidden rounded-[3px] bg-[#006a4e]">
          <span className="absolute top-1/2 left-[45%] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f42a41]" />
        </span>
        <span className="text-[14px] font-semibold text-muted">+88</span>
      </span>
      <input
        id={id}
        aria-label={label}
        type="tel"
        required={required}
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="01XXXXXXXXX"
        value={value}
        onChange={(e) => onChange(pad(e.target.value))}
        className={`${bareInputClass} tracking-wide tabular-nums`}
      />
    </div>
  );
}

export function Switch({ checked, label, onChange }: { checked: boolean; label: string; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-2xl bg-search-bg px-4 py-3 text-left text-sm font-semibold text-ink focus-visible:ring-4 focus-visible:ring-brand/30 focus-visible:outline-none"
    >
      {label}
      <span className={`flex h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors ${checked ? "justify-end bg-brand" : "justify-start bg-ink/15"}`}>
        <motion.span layout transition={{ type: "spring", stiffness: 600, damping: 34 }} className="size-5 rounded-full bg-white shadow" />
      </span>
    </button>
  );
}

/** A searchable list of the 64 districts, in place of the browser's select. */
export function DistrictPicker({ id, locale, value, onChange }: { id: string; locale: Locale; value: string; onChange: (v: string) => void }) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const q = query.trim().toLowerCase();
  const matches = BD_DISTRICTS.filter((d) => d.name.toLowerCase().includes(q) || d.bn.includes(q)).map((d) => d.name);
  const shown = (name: string) => (locale === "bn" ? (BD_DISTRICTS.find((d) => d.name === name)?.bn ?? name) : name);

  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  useEffect(() => {
    list.current?.children[cursor]?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  function choose(district: string) {
    onChange(district);
    setOpen(false);
  }

  return (
    <div ref={root} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setQuery("");
          setCursor(0);
          setOpen((v) => !v);
        }}
        className={`${boxClass} text-left focus-visible:border-brand focus-visible:outline-none`}
      >
        <MapPin aria-hidden className="size-[18px] shrink-0 text-muted-soft" />
        <span className={`flex-1 truncate text-[15px] ${value ? "text-ink" : "text-muted-soft"}`}>{value ? shown(value) : L("Search your district", "জেলা খুঁজুন")}</span>
        <ChevronDown aria-hidden className={`size-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.16 }}
            className="absolute bottom-[calc(100%+8px)] left-0 z-30 w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_50px_-18px_rgba(0,0,0,0.35)]"
          >
            <div className="flex h-14 shrink-0 items-center gap-3 border-b border-line px-4">
              <Search aria-hidden className="size-4 text-muted-soft" />
              <input
                autoFocus
                value={query}
                aria-label={L("Search districts", "জেলা খুঁজুন")}
                placeholder={L("Search district", "জেলা খুঁজুন")}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={(e) => {
                  // Enter picks a district here; it must not submit the form.
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (matches[cursor]) choose(matches[cursor]!);
                  } else if (e.key === "Escape") setOpen(false);
                  else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault();
                    setCursor((c) => Math.max(0, Math.min(matches.length - 1, c + (e.key === "ArrowDown" ? 1 : -1))));
                  }
                }}
                className={bareInputClass}
              />
            </div>
            <ul ref={list} role="listbox" className="max-h-56 overflow-y-auto p-1.5">
              {matches.map((d, i) => (
                <li key={d}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={d === value}
                    onClick={() => choose(d)}
                    onMouseEnter={() => setCursor(i)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink ${i === cursor ? "bg-search-bg" : ""}`}
                  >
                    {shown(d)}
                    {d === value ? <Check aria-hidden className="size-4 text-brand" strokeWidth={3} /> : null}
                  </button>
                </li>
              ))}
              {matches.length === 0 ? <li className="px-3 py-4 text-center text-sm text-muted">{L("No district found", "কোনো জেলা পাওয়া যায়নি")}</li> : null}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
