import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Stage } from "./stage";

/* A shop whose signboard says it all. The Free plan's limits are written under
 * the tile, from app/plans.py. Drawn flat on purpose: no card, no glow. */
const COPY = {
  en: { cta: "Create your free store" },
  bn: { cta: "ফ্রি স্টোর খুলুন" },
};

// Two shelves of different goods, none of them shown elsewhere in this section.
const SHELVES = [
  ["tote", "lamp", "phone"],
  ["mugs", "lotion", "panjabi"],
];

/* Day colours, then evening ones under `.dark`. */
const COLORS = [
  "[--sky:#ffe3d3] [--ground:#e9c3ae] [--curb:#d7ab93] [--wall:#fff8f1] [--trim:#2b1a14] [--glass:#d8ecf0] [--shelf:#b98a70] [--door:#c9461f]",
  "dark:[--sky:#1b1418] dark:[--ground:#2a1f22] dark:[--curb:#392a2d] dark:[--wall:#3a2c2c] dark:[--trim:#100b0b] dark:[--glass:#f3dcb4] dark:[--shelf:#8a5f45] dark:[--door:#9c3617]",
].join(" ");

const STRIPES = 11;
const STRIPE = 344 / STRIPES;

export function FreeVisual({ bn }: { bn: boolean }) {
  const c = bn ? COPY.bn : COPY.en;

  return (
    <Stage light="bottom" interactive>
      <div className={`absolute inset-0 ${COLORS}`}>
        {/* The street runs past the board, so a wider tile has no gaps. */}
        <div aria-hidden className="absolute inset-y-0 -inset-x-[200px] bg-[var(--sky)]" />
        <div aria-hidden className="absolute top-[312px] bottom-0 -inset-x-[200px] border-t-[6px] border-[var(--curb)] bg-[var(--ground)]" />

        <div aria-hidden>
          {/* Building */}
          <div className="absolute top-[60px] left-[40px] h-[252px] w-[316px] bg-[var(--wall)]" />

          {/* Signboard */}
          <div className="absolute top-[16px] left-[62px] flex h-[62px] w-[272px] items-center justify-center rounded-t-[18px] bg-[var(--trim)]">
            <span className="pl-[0.12em] text-[44px] leading-none font-extrabold tracking-[0.12em] text-[#fff4ea]">FREE</span>
          </div>

          {/* Awning */}
          <svg className="absolute top-[76px] left-[26px] drop-shadow-[0_7px_0_rgba(0,0,0,0.12)]" width={344} height={52} viewBox="0 0 344 52">
            {Array.from({ length: STRIPES }, (_, i) => {
              const x = i * STRIPE;
              return (
                <path
                  key={i}
                  d={`M ${(14 + x * (316 / 344)).toFixed(2)} 0 H ${(14 + (x + STRIPE) * (316 / 344)).toFixed(2)} L ${(x + STRIPE).toFixed(2)} 36 A ${(STRIPE / 2).toFixed(2)} 13 0 0 1 ${x.toFixed(2)} 36 Z`}
                  fill={i % 2 === 0 ? "#ff5a36" : "#fff4ea"}
                />
              );
            })}
          </svg>

          {/* Window */}
          <div className="absolute top-[136px] left-[52px] flex h-[166px] w-[214px] flex-col justify-evenly rounded-[6px] border-[6px] border-[var(--trim)] bg-[var(--glass)]">
            {SHELVES.map((shelf) => (
              <div key={shelf[0]} className="mx-[7px] flex justify-between border-b-[4px] border-[var(--shelf)] px-[3px]">
                {shelf.map((id) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={id} src={`/bento/p/${id}.webp`} alt="" className="h-[66px] w-[56px] rounded-t-[8px] object-cover" />
                ))}
              </div>
            ))}
          </div>
          <div className="absolute top-[302px] left-[48px] h-[10px] w-[222px] rounded-[2px] bg-[var(--trim)]" />

          {/* Door */}
          <div className="absolute top-[136px] left-[278px] h-[176px] w-[66px] rounded-t-[8px] border-[5px] border-b-0 border-[var(--trim)] bg-[var(--door)]">
            <div className="mx-auto mt-[8px] h-[100px] w-[42px] rounded-[4px] bg-[var(--glass)]" />
            <span className="absolute top-[124px] right-[7px] size-[8px] rounded-full bg-[#ffd9a0]" />
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
