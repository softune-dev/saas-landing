"use client";

import { Check, ChevronDown, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { GOOGLE_FONTS, ensureGoogleFont } from "@/lib/google-fonts";

const PAGE_SIZE = 40;

export type FontOption = { value: string; label: string };

type FontPickerProps = {
  value: string;
  options: FontOption[];
  onChange: (value: string) => void;
};

/** Same search-modal pattern as the dashboard theme editor's FontPicker —
 * curated faces first, then the full Google Fonts list, each row previewed
 * live. */
export function FontPicker({ value, options, onChange }: FontPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const active = options.find((opt) => opt.value === value);
  const activeLabel = active?.label ?? value;

  useEffect(() => {
    ensureGoogleFont(activeLabel);
  }, [activeLabel]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) return GOOGLE_FONTS.filter((n) => n.toLowerCase().includes(q));
    const curated = options.map((o) => o.label);
    const rest = GOOGLE_FONTS.filter((n) => !curated.includes(n));
    return [...curated, ...rest];
  }, [query, options]);

  const results = matches.slice(0, page * PAGE_SIZE);
  const hasMore = results.length < matches.length;

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    results.forEach((name) => ensureGoogleFont(name, "400;600"));
  }, [open, results]);

  function closeModal() {
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-border bg-search-bg px-2.5 text-left text-[13px] text-foreground transition-colors hover:border-muted-soft"
        style={{ fontFamily: `"${activeLabel}", sans-serif` }}
      >
        <span className="truncate">{activeLabel}</span>
        <ChevronDown className="size-3.5 shrink-0 text-muted-soft" />
      </button>

      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.button
              type="button"
              aria-label="Dismiss"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/35"
              onClick={closeModal}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-[75vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-surface shadow-xl"
            >
              <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-4 py-3 dark:border-transparent">
                <h3 className="text-[13px] font-semibold text-foreground">
                  Choose a font
                </h3>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={closeModal}
                  className="inline-flex size-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-search-bg"
                >
                  <X className="size-4" strokeWidth={2} />
                </button>
              </div>
              <div className="relative shrink-0 border-b border-border px-4 py-2.5 dark:border-transparent">
                <Search className="pointer-events-none absolute top-1/2 left-6.5 size-3.5 -translate-y-1/2 text-muted-soft" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${GOOGLE_FONTS.length}+ fonts…`}
                  className="w-full rounded-lg border border-border bg-search-bg py-1.5 pr-3 pl-7 text-[13px] text-foreground outline-none focus:border-primary"
                />
              </div>
              <div
                className="min-h-0 flex-1 overflow-y-auto p-1.5"
                onScroll={(e) => {
                  const el = e.currentTarget;
                  if (
                    hasMore &&
                    el.scrollHeight - el.scrollTop - el.clientHeight < 40
                  ) {
                    setPage((p) => p + 1);
                  }
                }}
              >
                {results.length === 0 ? (
                  <p className="py-8 text-center text-[13px] text-muted-soft">
                    No fonts match &ldquo;{query}&rdquo;
                  </p>
                ) : (
                  results.map((name) => {
                    const isActive = name === value || name === activeLabel;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => {
                          const match = options.find((o) => o.label === name);
                          onChange(match?.value ?? name);
                          closeModal();
                        }}
                        className={[
                          "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-search-bg",
                        ].join(" ")}
                      >
                        <span
                          className="truncate text-[15px] text-foreground"
                          style={{ fontFamily: `"${name}", sans-serif` }}
                        >
                          {name}
                        </span>
                        {isActive ? (
                          <Check
                            className="size-4 shrink-0 text-primary"
                            strokeWidth={2.5}
                          />
                        ) : null}
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
