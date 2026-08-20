"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeToggleProps = {
  className?: string;
};

/** Header dark-mode switch — Sun/Moon sliding-thumb pattern matching dashboard. */
export function ThemeToggle({ className = "ml-2.5" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      disabled={!mounted}
      onClick={() => {
        if (typeof document !== "undefined" && (document as any).startViewTransition) {
          (document as any).startViewTransition(() => {
            setTheme(isDark ? "light" : "dark");
          });
        } else {
          setTheme(isDark ? "light" : "dark");
        }
      }}
      className={[
        "relative flex w-[3rem] shrink-0 items-center rounded-full px-1 py-1 transition-colors duration-300 cursor-pointer",
        isDark ? "bg-[var(--color-brand)]" : "bg-[var(--color-line)]",
        className,
      ].join(" ")}
    >
      <span
        className={[
          "relative flex size-5 items-center justify-center rounded-full bg-white text-[var(--color-ink)] shadow-sm transition-transform duration-300",
          isDark ? "translate-x-5" : "translate-x-0",
        ].join(" ")}
      >
        <Moon
          className={[
            "absolute size-3 text-[var(--color-brand)] transition-all duration-300",
            isDark ? "scale-100 opacity-100 rotate-0" : "scale-50 opacity-0 -rotate-90",
          ].join(" ")}
          strokeWidth={2.5}
          aria-hidden
        />
        <Sun
          className={[
            "absolute size-3 text-[var(--color-muted)] transition-all duration-300",
            isDark ? "scale-50 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0",
          ].join(" ")}
          strokeWidth={2.5}
          aria-hidden
        />
      </span>
    </button>
  );
}
