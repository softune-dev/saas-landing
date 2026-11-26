"use client";

import Marquee from "react-fast-marquee";

/** The ten demo stores' own logos, straight from the stores. Cloudinary sends
 * a small copy (twice the shown height, for sharp screens). */
const LOGO_BASE = "https://res.cloudinary.com/ds19gltup/image/upload/h_72,c_limit,q_auto,f_auto";
const LOGOS: [name: string, path: string][] = [
  ["Raaj", "v1795202971/softune/demo/raaj/logo.webp"],
  ["TinyTots", "v1795202974/softune/demo/tinytots/logo.webp"],
  ["Voltix", "v1795202966/softune/demo/voltix/logo.webp"],
  ["PawPal", "v1795202981/softune/demo/pawpal/logo.webp"],
  ["Ghorkona", "v1795202987/softune/demo/ghorkona/logo.webp"],
  ["FreshKart", "v1795205434/softune/demo/freshkart/logo.webp"],
  ["Stride", "v1795205400/softune/demo/stride/logo.webp"],
  ["Noor Modest", "v1795202962/softune/demo/noor/logo.webp"],
  ["Swarna Jewels", "v1795205330/softune/demo/swarna/logo.webp"],
  ["Oudh House", "v1795205366/softune/demo/oudh/logo.webp"],
];

export function DemoLogoLoop({ locale = "en" }: { locale?: "en" | "bn" }) {
  const fade = "linear-gradient(to right, transparent, black 10%, black 90%, transparent)";
  return (
    <section
      aria-label={locale === "bn" ? "SoftuneBD-এর ডেমো স্টোর" : "Demo stores built with SoftuneBD"}
      className="overflow-hidden py-6 md:py-8"
    >
      <div className="mx-auto max-w-6xl" style={{ maskImage: fade, WebkitMaskImage: fade }}>
        <Marquee autoFill speed={32} pauseOnHover className="py-1">
          {LOGOS.map(([name, path]) => (
            // White in both themes: several logos are dark and would vanish.
            <span
              key={name}
              className="mx-2 flex h-14 items-center justify-center rounded-full border border-black/10 bg-white px-7 md:mx-2.5 md:h-16 md:px-9"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${LOGO_BASE}/${path}`} alt={name} loading="lazy" decoding="async" className="h-7 w-auto max-w-[130px] object-contain md:h-9 md:max-w-[160px]" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
