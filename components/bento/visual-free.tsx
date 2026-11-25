"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Stage, useScenes } from "./stage";

/* A shop with no rent. The Free plan's limits are written under the tile, from
 * app/plans.py. Drawn flat on purpose: no card, no glow. */
const COPY = {
  en: { name: "Your Shop", open: "OPEN", rent: "Shop rent", price: "৳0", per: "a month", cta: "Create your free store" },
  bn: { name: "আপনার দোকান", open: "খোলা", rent: "দোকান ভাড়া", price: "৳০", per: "প্রতি মাসে", cta: "ফ্রি স্টোর খুলুন" },
};

const GOODS = [
  { id: "koti", src: "/bento/p/koti.webp", en: "৳2,152", bn: "৳২,১৫২" },
  { id: "fatua", src: "/bento/p/fatua.webp", en: "৳1,096", bn: "৳১,০৯৬" },
  { id: "linen", src: "/bento/p/linen-koti.webp", en: "৳1,752", bn: "৳১,৭৫২" },
];

/* Day colours, then evening ones under `.dark`. */
const COLORS = [
  "[--sky:#ffe3d3] [--ground:#e9c3ae] [--curb:#d7ab93] [--wall:#fff8f1] [--trim:#2b1a14] [--glass:#d8ecf0] [--door:#c9461f]",
  "dark:[--sky:#1b1418] dark:[--ground:#2a1f22] dark:[--curb:#392a2d] dark:[--wall:#3a2c2c] dark:[--trim:#100b0b] dark:[--glass:#f3dcb4] dark:[--door:#9c3617]",
].join(" ");

const STRIPES = 11;
const STRIPE = 344 / STRIPES;

const IDLE = [1000] as const;

export function FreeVisual({ bn }: { bn: boolean }) {
  const lang = bn ? "bn" : "en";
  const c = COPY[lang];
  const { ref, moving } = useScenes(IDLE);
  // Two small swings. Only rotation changes, so phones barely notice.
  const swing = (name: string, seconds: number) => ({
    animation: `${name} ${seconds}s ease-in-out infinite`,
    animationPlayState: moving ? "running" : "paused",
  });

  return (
    <Stage light="bottom" innerRef={ref} interactive>
      <style>{"@keyframes shop-sign { 0%, 100% { transform: rotate(-7deg) } 50% { transform: rotate(7deg) } } @keyframes shop-tag { 0%, 100% { transform: rotate(-4deg) } 50% { transform: rotate(1deg) } }"}</style>

      <div className={`absolute inset-0 ${COLORS}`}>
        {/* The street runs past the board, so a wider tile has no gaps. */}
        <div aria-hidden className="absolute inset-y-0 -inset-x-[200px] bg-[var(--sky)]" />
        <div aria-hidden className="absolute top-[312px] bottom-0 -inset-x-[200px] border-t-[6px] border-[var(--curb)] bg-[var(--ground)]" />

        <div aria-hidden>
          {/* Building */}
          <div className="absolute top-[48px] left-[40px] h-[264px] w-[316px] bg-[var(--wall)]" />

          {/* Signboard */}
          <div className="absolute top-[20px] left-[62px] flex h-[46px] w-[272px] items-center justify-center rounded-t-[16px] bg-[var(--trim)] text-[21px] font-extrabold tracking-tight text-[#fff4ea]">
            {c.name}
          </div>

          {/* Awning */}
          <svg className="absolute top-[64px] left-[26px] drop-shadow-[0_7px_0_rgba(0,0,0,0.12)]" width={344} height={56} viewBox="0 0 344 56">
            {Array.from({ length: STRIPES }, (_, i) => {
              const x = i * STRIPE;
              return (
                <path
                  key={i}
                  d={`M ${(14 + x * (316 / 344)).toFixed(2)} 0 H ${(14 + (x + STRIPE) * (316 / 344)).toFixed(2)} L ${(x + STRIPE).toFixed(2)} 40 A ${(STRIPE / 2).toFixed(2)} 14 0 0 1 ${x.toFixed(2)} 40 Z`}
                  fill={i % 2 === 0 ? "#ff5a36" : "#fff4ea"}
                />
              );
            })}
          </svg>

          {/* Window */}
          <div className="absolute top-[130px] left-[52px] h-[166px] w-[212px] rounded-[6px] border-[6px] border-[var(--trim)] bg-[var(--glass)]">
            <div className="flex justify-center gap-[7px] pt-[6px]">
              {GOODS.map((g) => (
                <span key={g.id} className="block w-[58px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt="" className="h-[66px] w-[58px] rounded-t-full rounded-b-[4px] object-cover object-top" />
                  <span className="mt-[3px] block rounded-[3px] bg-[#fff8f1] text-center text-[10px] leading-[14px] font-bold text-[#2b1a14] tabular-nums">
                    {g[lang]}
                  </span>
                </span>
              ))}
            </div>
            {/* A shine across the glass */}
            <span className="absolute inset-y-0 left-[22px] w-[18px] -skew-x-[20deg] bg-white/20" />
          </div>
          <div className="absolute top-[296px] left-[48px] h-[8px] w-[220px] rounded-[2px] bg-[var(--trim)]" />

          {/* Door */}
          <div className="absolute top-[130px] left-[276px] h-[182px] w-[68px] rounded-t-[8px] border-[5px] border-b-0 border-[var(--trim)] bg-[var(--door)]">
            <div className="mx-auto mt-[7px] h-[104px] w-[44px] rounded-[4px] bg-[var(--glass)]" />
            <span className="absolute top-[128px] right-[7px] size-[8px] rounded-full bg-[#ffd9a0]" />
            <div className="absolute top-[12px] left-[3px] w-[52px] origin-top" style={swing("shop-sign", 3.2)}>
              <svg width={52} height={18} viewBox="0 0 52 18" className="block" fill="none">
                <path d="M8 18 L26 2 L44 18" stroke="#2b1a14" strokeWidth={1.5} />
                <circle cx={26} cy={2.5} r={2} fill="#2b1a14" />
              </svg>
              <span className="block rounded-[5px] bg-[#12804a] py-[4px] text-center text-[12px] leading-[16px] font-extrabold text-white">{c.open}</span>
            </div>
          </div>
        </div>

        {/* The rent tag, tied under the window */}
        <div className="absolute top-[227px] left-[62px] w-[192px] origin-top" style={swing("shop-tag", 4.4)}>
          <svg aria-hidden width={192} height={20} viewBox="0 0 192 20" className="block" fill="none">
            <path d="M96 0 L40 20 M96 0 L152 20" stroke="#2b1a14" strokeWidth={1.6} />
            <circle cx={96} cy={2.5} r={2.5} fill="#2b1a14" />
          </svg>
          <div className="-mt-px rounded-[12px] border-[2.5px] border-[#2b1a14] bg-[#ffd23f] px-3 pt-1 pb-1.5 text-center text-[#2b1a14] shadow-[5px_6px_0_rgba(43,26,20,0.28)]">
            <p className="text-[13px] leading-[16px] font-extrabold">{c.rent}</p>
            <p className="flex items-baseline justify-center gap-1.5">
              <span className="text-[44px] leading-[46px] font-extrabold tracking-tighter">{c.price}</span>
              <span className="text-[12.5px] font-bold">{c.per}</span>
            </p>
          </div>
        </div>

        {/* On the pavement */}
        <Link
          href={bn ? "/bn/signup" : "/signup"}
          className="absolute top-[328px] left-[58px] flex h-[40px] w-[280px] items-center justify-center gap-2 rounded-full bg-[#2b1a14] text-[14.5px] font-bold text-white transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] dark:bg-[#fff4ea] dark:text-[#2b1a14]"
        >
          {c.cta}
          <ArrowRight className="size-[17px]" strokeWidth={2.6} aria-hidden />
        </Link>
      </div>
    </Stage>
  );
}
