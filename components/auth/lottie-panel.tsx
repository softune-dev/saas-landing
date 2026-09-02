"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/** Fills the AuthShell left panel with a looping .lottie animation —
 * public/acc.lottie (account step) and public/build.lottie (building
 * step). "contain" (not "cover") — cover cropped the artwork's edges off
 * to fill the panel; contain scales the whole thing down to fit instead,
 * so nothing gets cut off even though it leaves a little breathing room
 * around it. */
export function LottiePanel({ src }: { src: string }) {
  return (
    <div className="absolute inset-0 p-6" aria-hidden>
      <DotLottieReact
        src={src}
        loop
        autoplay
        layout={{ fit: "contain", align: [0.5, 0.5] }}
        className="size-full"
      />
    </div>
  );
}
