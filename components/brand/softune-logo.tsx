"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type SoftuneLogoProps = {
  className?: string;
  alt?: string;
};

/**
 * Softune wordmark+mark. Light mode → logo-dark, dark mode → logo-white.
 */
export function SoftuneLogo({
  className = "h-7 w-auto",
  alt = "Softunebd",
}: SoftuneLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Landing defaults to dark; before mount prefer white mark for the dark canvas.
  const isDark = !mounted || resolvedTheme === "dark";
  const src = isDark ? "/logo-white.png" : "/logo-dark.png";

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />;
}
