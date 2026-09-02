"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  /** Card max-width — wider than default for steps that hold more than a
   * plain form. */
  maxWidth?: string;
  /** Override the default shopping-bag illustration. The trial wizard
   * passes a different pair per step so the left panel tracks the form. */
  image?: { dark: string; light: string };
  /** Replaces the photo on desktop. Hidden below lg, same as the image. */
  leftPanel?: ReactNode;
  /** Rendered beside the logo behind a vertical divider — the wizard's
   * step badge, so "step 2 of 4" reads as part of the page identity
   * rather than a caption buried under the title. */
  headerBadge?: ReactNode;
  /** Far right of the same header row as the logo/badge — small, secondary
   * links (e.g. "Already have an account? Sign in") that don't need the
   * weight of living in the form body. */
  headerRight?: ReactNode;
};

/** Two-panel auth card — same layout as dashboard LoginScreen. */
export function AuthShell({
  title,
  subtitle,
  children,
  maxWidth = "max-w-6xl",
  image,
  leftPanel,
  headerBadge,
  headerRight,
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
      <div className={`grid w-full min-w-0 ${maxWidth} overflow-hidden rounded-2xl bg-surface shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] sm:rounded-3xl lg:grid-cols-2`}>
        <div className="relative hidden min-h-[560px] pt-2.5 pb-2.5 pl-2.5 lg:block">
          <div className="relative size-full overflow-hidden rounded-xl sm:rounded-2xl">
            {leftPanel ?? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={authImage}
                src={authImage}
                alt=""
                className="absolute inset-0 size-full object-cover object-left-top"
              />
            )}
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center p-5 sm:p-8 lg:p-12">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <a href="/" className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-icon.png"
                  alt="Softune"
                  className="h-10 w-auto object-contain object-left sm:h-11"
                />
              </a>
              {headerBadge ? (
                <>
                  <span className="h-7 w-px shrink-0 bg-border" aria-hidden />
                  {headerBadge}
                </>
              ) : null}
            </div>
            {headerRight ? <div className="shrink-0">{headerRight}</div> : null}
          </div>

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
