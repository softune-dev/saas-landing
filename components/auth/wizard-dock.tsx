"use client";

import { Home, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";
import { MaskIcon } from "@/components/ui/mask-icon";

function DockButton({
  children,
  label,
  href,
  onClick,
  disabled,
}: {
  children: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const className =
    "group relative flex size-10 items-center justify-center rounded-full bg-primary text-white transition-all hover:scale-110 hover:opacity-90 disabled:pointer-events-none disabled:opacity-30";
  // Bottom-center layout (below 1400px) puts the tooltip above the button;
  // the left-edge layout (1400px+) puts it to the right instead, matching
  // wherever the dock itself actually is at that width.
  const tooltip = (
    <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 -translate-x-1/2 rounded-md bg-black/80 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 min-[1400px]:top-1/2 min-[1400px]:bottom-auto min-[1400px]:left-full min-[1400px]:mb-0 min-[1400px]:ml-3 min-[1400px]:translate-x-0 min-[1400px]:-translate-y-1/2">
      {label}
    </span>
  );

  if (href) {
    return (
      <a href={href} aria-label={label} className={className}>
        {children}
        {tooltip}
      </a>
    );
  }
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
      {tooltip}
    </button>
  );
}

/** macOS-style floating dock, present on every wizard step. Docked to the
 * left edge (vertical) only from 1400px up, where there's enough margin
 * around the centered AuthShell card for it to sit without touching it;
 * below that it drops to a horizontal bar centered at the bottom edge —
 * a relative breakpoint rather than a fixed pixel offset, so it adapts to
 * however wide the card itself ends up rendering instead of guessing a
 * gap that would collide on some viewport sizes and not others. */
export function WizardDock({
  onBack,
  backDisabled,
}: {
  onBack: () => void;
  backDisabled: boolean;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="fixed bottom-4 left-1/2 z-40 hidden -translate-x-1/2 flex-row gap-1.5 rounded-full border border-border bg-surface p-2 shadow-2xl sm:flex min-[1400px]:top-1/2 min-[1400px]:bottom-auto min-[1400px]:left-4 min-[1400px]:translate-x-0 min-[1400px]:-translate-y-1/2 min-[1400px]:flex-col">
      <DockButton href="/" label="Home">
        <Home className="size-5" strokeWidth={2} />
      </DockButton>
      <DockButton label="Back" onClick={onBack} disabled={backDisabled}>
        {/* No dedicated "back" arrow in public/icons — arrow-right.svg
            flipped is the same glyph the rest of the site already ships. */}
        <MaskIcon src="/icons/arrow-right.svg" className="size-5 -scale-x-100" />
      </DockButton>
      <DockButton
        label={isDark ? "Light mode" : "Dark mode"}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {isDark ? (
          <Sun className="size-5" strokeWidth={2} />
        ) : (
          <Moon className="size-5" strokeWidth={2} />
        )}
      </DockButton>
      <DockButton href="mailto:support@softunebd.com" label="Contact support">
        <MaskIcon src="/icons/chat.svg" className="size-5" />
      </DockButton>
    </div>
  );
}
