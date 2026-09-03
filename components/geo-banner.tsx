"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { hasBnVersion } from "@/lib/seo";

export function GeoBanner() {
  const pathname = usePathname() || "/";
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show on English pages (path does NOT start with /bn) that
    // actually HAVE a Bangla twin — most pages don't (legal pages, the
    // programmatic SEO pages, etc.), and offering a link into one of those
    // would just 404. See lib/seo.ts's hasBnVersion, the same check
    // pageSeo() and sitemap.ts use to avoid the identical mistake.
    if (pathname.startsWith("/bn") || !hasBnVersion(pathname)) return;

    try {
      // Check if previously dismissed or manually set to English
      const dismissed = localStorage.getItem("softunebd_lang_dismissed");
      const savedLang = localStorage.getItem("softunebd_lang");
      if (dismissed === "true" || savedLang === "en") return;

      // Check timezone/locale for Bangladesh indication (e.g., Asia/Dhaka or bn language)
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      const isBD =
        tz === "Asia/Dhaka" ||
        navigator.language?.toLowerCase().includes("bn") ||
        (navigator.languages &&
          navigator.languages.some((l) => l.toLowerCase().includes("bn")));

      if (isBD) {
        setShow(true);
      }
    } catch {
      // Ignore client API failures
    }
  }, [pathname]);

  const handleDismiss = () => {
    setShow(false);
    try {
      localStorage.setItem("softunebd_lang_dismissed", "true");
    } catch {
      // Ignore
    }
  };

  const targetPath = `/bn${pathname === "/" ? "" : pathname}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative z-50 bg-[var(--color-surface)] border-b border-[var(--color-line)] py-2.5 px-4 text-xs font-semibold text-[var(--color-ink)] shadow-sm"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Globe className="size-4 shrink-0 text-[var(--color-brand)]" />
              <span className="truncate">
                বাংলাদেশ থেকে ভিসিট করছেন? সাইটটি বাংলায় দেখুন।
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={targetPath}
                className="inline-flex items-center rounded-full bg-[var(--color-brand)] px-3 py-1 text-xs font-bold text-white transition-opacity hover:opacity-90"
              >
                বাংলায় দেখুন
              </a>
              <button
                type="button"
                onClick={handleDismiss}
                className="rounded-full p-1 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                aria-label="Dismiss banner"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

