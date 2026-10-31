"use client";

import dynamic from "next/dynamic";

// Decoration only: loaded after the page text, never delays it.
const Grainient = dynamic(() => import("@/components/ui/grainient"), { ssr: false });

/**
 * The shared dark hero panel used across the site's inner pages: a rounded near-black
 * panel inset from the page edges, with the quiet Grainient ember behind the content.
 * The home page's hero and the feature pages use the same look.
 */
export function DarkHero({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#09080b] px-5 pt-12 pb-14 text-center text-white sm:rounded-[2.5rem] md:pt-16 md:pb-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <Grainient
            colors={["#09080b", "#09080b", "#0f0909", "#22100a", "#6b2a12", "#c2511f"]}
            angle={180}
            flow={0.6}
            silk={0.2}
            grainAmount={0.06}
            saturation={0.9}
            interactive={false}
            clickSwirl={false}
            className="absolute inset-0"
          />
        </div>
        {children}
      </div>
    </div>
  );
}
