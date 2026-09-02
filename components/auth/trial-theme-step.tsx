"use client";

import { Check, Pipette } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, type FormEvent } from "react";
import { primaryBtnClass } from "./auth-shell";
import { FontPicker } from "./font-picker";

// Marketing names, not backend template keys — same names/images the
// public landing page uses for these two niches (lib/themes-data.ts's
// "fashion" and "outlet" cards). "aurora"/"bazaar" are internal
// Template.key values in the database; a merchant should never see those.
export const TEMPLATES = [
  { key: "aurora", name: "Fashion", image: "/themes/fashion-store.webp" },
  { key: "bazaar", name: "Multi", image: "/themes/multi-category.webp" },
] as const;

export type TemplateKey = (typeof TEMPLATES)[number]["key"];

// Evenly spread around the color wheel, plus one neutral dark — the old
// list was mostly near-black variants (olive-black, near-black, navy,
// dark green, dark rust) that read as duplicates of each other at a
// glance rather than real, distinguishable options.
const COLOR_SWATCHES = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#22C55E",
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#1E293B",
];

export const HEADING_FONTS = [
  { value: "fraunces", label: "Fraunces" },
  { value: "playfair", label: "Playfair Display" },
  { value: "cormorant", label: "Cormorant" },
  { value: "libre-baskerville", label: "Libre Baskerville" },
  { value: "dm-serif-display", label: "DM Serif Display" },
  { value: "newsreader", label: "Newsreader" },
  { value: "prata", label: "Prata" },
  { value: "archivo-black", label: "Archivo Black" },
];

export const BODY_FONTS = [
  { value: "inter", label: "Inter" },
  { value: "manrope", label: "Manrope" },
  { value: "work-sans", label: "Work Sans" },
  { value: "outfit", label: "Outfit" },
  { value: "plus-jakarta-sans", label: "Plus Jakarta Sans" },
  { value: "dm-sans", label: "DM Sans" },
  { value: "figtree", label: "Figtree" },
  { value: "nunito-sans", label: "Nunito Sans" },
];

function isLightHex(hex: string): boolean {
  const n = hex.replace("#", "");
  if (n.length !== 6) return true;
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62;
}

type ThemeStepProps = {
  templateKey: TemplateKey;
  primaryColor: string;
  displayFont: string;
  bodyFont: string;
  busy: boolean;
  onTemplate: (key: TemplateKey) => void;
  onColor: (color: string) => void;
  onDisplayFont: (font: string) => void;
  onBodyFont: (font: string) => void;
  onSubmit: (e: FormEvent) => void;
};

export function ThemeStep(props: ThemeStepProps) {
  return (
    <form onSubmit={props.onSubmit} className="mt-4 flex flex-col gap-3.5">
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-medium text-muted">
          Theme — hover to preview
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {TEMPLATES.map((t) => {
            const selected = props.templateKey === t.key;
            return (
              <div key={t.key} className="group relative">
                <button
                  type="button"
                  onClick={() => props.onTemplate(t.key)}
                  className={`flex w-full items-center justify-between gap-1.5 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                    selected
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border text-foreground hover:border-primary/50 hover:bg-search-bg"
                  }`}
                >
                  <span className="truncate">{t.name}</span>
                  {selected ? (
                    <Check className="size-4 shrink-0 text-primary" strokeWidth={2.5} />
                  ) : null}
                </button>
                <div
                  className="pointer-events-none absolute bottom-full left-0 z-20 mb-2 w-28 origin-bottom-left scale-95 overflow-hidden rounded-lg border border-border opacity-0 shadow-xl transition-all duration-150 group-hover:scale-100 group-hover:opacity-100"
                  aria-hidden
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt=""
                    className="h-20 w-full object-cover object-top"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ColorWell value={props.primaryColor} onChange={props.onColor} />

      <div className="grid grid-cols-2 gap-2">
        <label className="flex min-w-0 flex-col gap-1">
          <span className="text-[11px] font-medium text-muted">Headings</span>
          <FontPicker
            value={props.displayFont}
            options={HEADING_FONTS}
            onChange={props.onDisplayFont}
          />
        </label>
        <label className="flex min-w-0 flex-col gap-1">
          <span className="text-[11px] font-medium text-muted">Body text</span>
          <FontPicker
            value={props.bodyFont}
            options={BODY_FONTS}
            onChange={props.onBodyFont}
          />
        </label>
      </div>

      <button type="submit" disabled={props.busy} className={primaryBtnClass}>
        {props.busy ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Opening your store...
          </>
        ) : (
          "Start 3-day trial"
        )}
      </button>
    </form>
  );
}

function ColorWell({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  const isCustom = !COLOR_SWATCHES.some(
    (s) => s.toLowerCase() === value.toLowerCase(),
  );

  return (
    <div
      className={[
        "flex flex-col gap-2.5 rounded-xl p-3",
        dark ? "bg-[#2A2A2A]" : "bg-search-bg",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-[11px] font-medium ${dark ? "text-white/70" : "text-muted"}`}
        >
          Primary color
        </span>
        <span
          className={[
            "text-[11px] font-medium uppercase tracking-wide",
            dark ? "text-white/80" : "text-muted",
          ].join(" ")}
        >
          {value}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {COLOR_SWATCHES.map((color) => {
          const active = color.toLowerCase() === value.toLowerCase();
          const light = isLightHex(color);
          return (
            <button
              key={color}
              type="button"
              aria-label={color}
              aria-pressed={active}
              onClick={() => onChange(color)}
              className={[
                "relative size-8 shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)] transition-transform",
                dark ? "ring-1 ring-white/25" : "",
                active
                  ? `scale-105 ring-2 ring-primary ring-offset-2 ${dark ? "ring-offset-[#2A2A2A]" : "ring-offset-search-bg"}`
                  : "",
              ].join(" ")}
              style={{ backgroundColor: color }}
            >
              {active ? (
                <Check
                  className={`absolute inset-0 m-auto size-3 ${light ? "text-slate-900" : "text-white"}`}
                  strokeWidth={3}
                />
              ) : null}
            </button>
          );
        })}
        <label
          className={[
            "relative size-8 shrink-0 cursor-pointer overflow-hidden rounded-full",
            isCustom
              ? `ring-2 ring-primary ring-offset-2 ${dark ? "ring-offset-[#2A2A2A]" : "ring-offset-search-bg"}`
              : dark
                ? "border border-dashed border-white/30 bg-white/10"
                : "border border-dashed border-border bg-surface",
          ].join(" ")}
          style={isCustom ? { backgroundColor: value } : undefined}
        >
          <span className="sr-only">Custom color</span>
          {isCustom ? (
            <Check
              className={`pointer-events-none absolute inset-0 m-auto size-3 ${isLightHex(value) ? "text-slate-900" : "text-white"}`}
              strokeWidth={3}
            />
          ) : (
            <Pipette
              className={`pointer-events-none absolute inset-0 m-auto size-3.5 ${dark ? "text-white/60" : "text-muted-soft"}`}
              strokeWidth={2}
            />
          )}
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            className="sr-only"
          />
        </label>
      </div>
    </div>
  );
}
