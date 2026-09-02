"use client";

import { Check } from "lucide-react";
import { BUILD_LABELS } from "./use-trial-build";

/** Pure presentational checklist — `done`/`pct` are computed once by
 * useTrialBuild, so this and the left-panel animation can never drift out
 * of sync with each other. */
export function BuildingStoreScreen({
  done,
  pct,
}: {
  done: boolean[];
  pct: number;
}) {
  const activeIndex = done.findIndex((d) => !d);

  return (
    <div className="mt-8">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-search-bg">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs font-medium text-muted-soft">{pct}%</p>

      <ol className="mt-6 flex list-none flex-col" aria-live="polite">
        {BUILD_LABELS.map((label, i) => {
          const isDone = done[i];
          const isActive = !isDone && i === activeIndex;
          const isLast = i === BUILD_LABELS.length - 1;
          return (
            <li key={label} className="relative flex items-center gap-3 pb-4 last:pb-0">
              {!isLast ? (
                <span
                  aria-hidden
                  className={[
                    "absolute top-7 left-3.5 -ml-px h-[calc(100%-1.75rem)] w-0.5",
                    isDone ? "bg-primary" : "bg-border",
                  ].join(" ")}
                />
              ) : null}
              <span
                className={[
                  "relative flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  isDone
                    ? "bg-primary text-white"
                    : isActive
                      ? "border border-primary/40 bg-primary/10 text-primary"
                      : "border border-border bg-search-bg text-muted-soft",
                ].join(" ")}
              >
                {isDone ? (
                  <Check className="size-3.5" strokeWidth={2.5} />
                ) : isActive ? (
                  <span className="size-3 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={[
                  "text-sm font-medium",
                  isDone || isActive ? "text-foreground" : "text-muted",
                ].join(" ")}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
