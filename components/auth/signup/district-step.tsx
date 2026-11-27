"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { BD_DISTRICTS, BD_MAP_VIEWBOX } from "./bd-map";
import { t, type Business, type Locale } from "./signup-copy";
import { DistrictPicker } from "./signup-controls";
import { ErrorBox, Heading, PrimaryButton } from "./signup-ui";

/** Tap the map, or search: small districts around Dhaka are hard to hit on a
 * phone. Optional either way. */
export function DistrictStep({
  locale,
  value,
  busy,
  error,
  onChange,
  onNext,
}: {
  locale: Locale;
  value: Business;
  busy: boolean;
  error: string | null;
  onChange: (patch: Partial<Business>) => void;
  onNext: () => void;
}) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  const [hover, setHover] = useState("");
  const selected = BD_DISTRICTS.find((d) => d.name === value.district);
  const pointed = BD_DISTRICTS.find((d) => d.name === hover) ?? selected;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      className="flex flex-col gap-3"
    >
      <Heading title={L("Where is your shop?", "আপনার দোকান কোথায়?")} />

      {/* Keyboard and screen-reader users choose from the search list below. */}
      <svg
        viewBox={BD_MAP_VIEWBOX}
        aria-hidden
        onPointerLeave={() => setHover("")}
        className="mx-auto h-[clamp(300px,calc(100dvh-362px),520px)] w-full touch-manipulation select-none"
      >
        {BD_DISTRICTS.map((d) => (
          <path
            key={d.name}
            d={d.d}
            onClick={() => onChange({ district: d.name === value.district ? "" : d.name })}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHover(d.name)}
            // The line stays one crisp width however small the map is drawn.
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            className={`cursor-pointer stroke-[#d9663c] stroke-[0.9] transition-[fill] duration-150 dark:stroke-[#c9795a] ${
              d.name === value.district ? "fill-brand" : d.name === hover ? "fill-[#ffb399]" : "fill-[#fde1d1] dark:fill-[#4a2c21]"
            }`}
          />
        ))}
        {pointed ? (
          <g className="pointer-events-none" transform={`translate(${Math.min(Math.max(pointed.x, 92), 508)} ${Math.max(pointed.y - 22, 22)})`}>
            <rect x="-90" y="-20" width="180" height="38" rx="19" className="fill-[#141012]" />
            <text textAnchor="middle" dominantBaseline="central" y="-1" className="fill-white text-[19px] font-bold">
              {locale === "bn" ? pointed.bn : pointed.name}
            </text>
          </g>
        ) : null}
      </svg>

      <DistrictPicker id="signup-district" locale={locale} value={value.district} onChange={(district) => onChange({ district })} />

      <ErrorBox message={error} />
      <PrimaryButton busy={busy}>
        {value.district ? null : <MapPin aria-hidden className="size-4" />}
        {value.district ? L("Continue", "চালিয়ে যান") : L("Skip for now", "এখন থাক")}
      </PrimaryButton>
    </form>
  );
}
