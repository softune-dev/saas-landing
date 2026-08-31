"use client";

import { Check, ChevronDown, Tag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type CategoryDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  id?: string;
};

/** Opens a centered modal instead of a floating dropdown list. The earlier
 * portal-positioned dropdown (anchored to the button's bounding rect) had
 * no viewport-edge collision handling — a field near the bottom of a short
 * or mobile viewport pushed the menu off-screen. A modal sidesteps that
 * whole class of bug entirely: it's always centered, never anchored to a
 * field that might be near an edge. */
export function CategoryDropdown({
  value,
  onChange,
  options,
  placeholder = "Select a category",
  id,
}: CategoryDropdownProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  const modal =
    open ? (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={() => setOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-[70vh] w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-surface shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)]"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">Select a category</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-full p-1 text-muted transition-colors hover:bg-search-bg hover:text-foreground"
            >
              <X className="size-4" strokeWidth={2} />
            </button>
          </div>
          <ul role="listbox" className="overflow-y-auto py-1.5">
            {options.map((option) => {
              const selected = option === value;
              return (
                <li key={option}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-2 px-5 py-3 text-left text-sm transition-colors hover:bg-search-bg ${
                      selected ? "font-medium text-primary" : "text-foreground"
                    }`}
                  >
                    {option}
                    {selected ? <Check className="size-4 shrink-0" strokeWidth={2} /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    ) : null;

  return (
    <div className="relative">
      <button
        id={id}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex h-11 w-full items-center rounded-lg border border-border bg-search-bg pr-4 pl-10 text-sm text-foreground outline-none transition-colors focus:border-primary focus:bg-surface"
      >
        <Tag
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
          strokeWidth={2}
        />
        <span className={value ? "text-foreground" : "text-muted-soft"}>
          {value || placeholder}
        </span>
        <ChevronDown className="ml-auto size-4 shrink-0 text-muted" strokeWidth={2} />
      </button>

      {mounted && modal ? createPortal(modal, document.body) : null}
    </div>
  );
}
