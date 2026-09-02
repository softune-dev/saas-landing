"use client";

import { AlertCircle, Check, Info, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ToastVariant = "success" | "error" | "info";

export type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

type ToastItem = ToastInput & { id: string };

type ToastContextValue = {
  toast: (input: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setItems((list) => list.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((input: ToastInput) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setItems((list) =>
      [...list, { variant: "error", duration: 4200, ...input, id }].slice(-3),
    );
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[140] flex flex-col items-end gap-2.5 p-4 sm:p-6"
      >
        <AnimatePresence>
          {items.map((item) => (
            <ToastCard key={item.id} item={item} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const ICONS = {
  success: Check,
  error: AlertCircle,
  info: Info,
} as const;

function ToastCard({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const variant = item.variant ?? "error";
  const Icon = ICONS[variant];
  const duration = item.duration ?? 4200;

  useEffect(() => {
    const timer = window.setTimeout(() => onDismiss(item.id), duration);
    return () => window.clearTimeout(timer);
  }, [duration, item.id, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      className="pointer-events-auto flex w-[min(100vw-2rem,22rem)] items-start gap-3 rounded-xl border border-border bg-surface px-3.5 py-3 shadow-xl dark:border-white/10"
    >
      <span
        className={[
          "mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full",
          variant === "error"
            ? "bg-red-500/15 text-red-600 dark:text-red-300"
            : variant === "success"
              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
              : "bg-primary/15 text-primary",
        ].join(" ")}
      >
        <Icon className="size-3.5" strokeWidth={2.25} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-foreground">{item.title}</p>
        {item.description ? (
          <p className="mt-0.5 text-xs text-muted">{item.description}</p>
        ) : null}
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => onDismiss(item.id)}
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-muted-soft hover:bg-search-bg hover:text-foreground"
      >
        <X className="size-3.5" strokeWidth={2} />
      </button>
    </motion.div>
  );
}
