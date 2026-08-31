"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  /** Card max-width — bigger pages (welcome, which holds more content than
   * a plain form) pass a wider value than the default. */
  maxWidth?: string;
  /** Override the default shopping-bag illustration — e.g. welcome uses
   * the actual dashboard screenshot instead, since it's showing off the
   * product a lead is about to get, not a generic auth-page graphic. */
  image?: { dark: string; light: string };
};

/** Two-panel auth card — same layout as dashboard LoginScreen. */
export function AuthShell({
  title,
  subtitle,
  children,
  maxWidth = "max-w-6xl",
  image,
}: AuthShellProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = image?.dark ?? "/auth-dark.png";
  const light = image?.light ?? "/auth-lite.png";
  const authImage = mounted && resolvedTheme === "dark" ? dark : light;

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <div className={`grid w-full ${maxWidth} overflow-hidden rounded-2xl bg-surface shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] sm:rounded-3xl lg:grid-cols-2`}>
        <div className="relative hidden min-h-[560px] pt-2.5 pb-2.5 pl-2.5 lg:block">
          <div className="relative size-full overflow-hidden rounded-xl sm:rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={authImage}
              src={authImage}
              alt=""
              className="absolute inset-0 size-full object-cover object-left-top"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href="/">
            <img
              src="/logo-icon.png"
              alt="Softune"
              className="h-10 w-auto object-contain object-left sm:h-11"
            />
          </a>

          <h1 className="mt-8 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  );
}

export const fieldClass =
  "h-11 w-full rounded-lg border border-border bg-search-bg pr-4 pl-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-soft focus:border-primary focus:bg-surface";

export const primaryBtnClass =
  "flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-white transition-opacity hover:opacity-95 disabled:opacity-60";

export const outlineBtnClass =
  "flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface text-sm font-semibold text-foreground transition-colors hover:bg-search-bg disabled:opacity-50";
