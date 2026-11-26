"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeToggleProps = {
  className?: string;
};

/** Dark-mode button: one icon, showing the mode a click switches to. */
export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      disabled={!mounted}
      onClick={() => {
        const next = isDark ? "light" : "dark";
        if (typeof document !== "undefined" && (document as any).startViewTransition) {
          (document as any).startViewTransition(() => setTheme(next));
        } else {
          setTheme(next);
        }
      }}
      className={[
        "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand)]",
        className,
      ].join(" ")}
    >
      <Icon className="size-[19px]" strokeWidth={2.2} aria-hidden />
    </button>
  );
}
