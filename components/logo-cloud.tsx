"use client";

import Marquee from "react-fast-marquee";

const brands = [
  "Modhu Bon",
  "Northlight",
  "Kala Studio",
  "River & Co",
  "Ananya",
  "Mishthan",
  "Bareform",
  "Pulse Market",
];

export function LogoCloud() {
  return (
    <section className="overflow-hidden py-8 md:py-10">
      <p className="mb-5 px-4 text-center text-[10px] font-medium tracking-[0.16em] text-[var(--color-muted-soft)] uppercase sm:mb-6 sm:text-[11px] sm:tracking-[0.18em]">
        Built for teams who ship storefronts weekly
      </p>
      <div 
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
        }}
      >
        <Marquee autoFill={true} speed={40} className="overflow-hidden py-2">
          {brands.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="mx-8 text-[15px] font-semibold tracking-tight text-[var(--color-ink)]/35"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
