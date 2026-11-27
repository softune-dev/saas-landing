"use client";

import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher({
  locale = "en",
  className = "",
}: {
  locale?: "en" | "bn";
  className?: string;
}) {
  const pathname = usePathname() || "/";
  const router = useRouter();

  const isBn = locale === "bn" || pathname.startsWith("/bn");
  const basePath = pathname.startsWith("/bn") ? pathname.slice(3) || "/" : pathname;

  const targetLocale = isBn ? "en" : "bn";
  const targetPath = isBn ? basePath : `/bn${basePath === "/" ? "" : basePath}`;

  const toggleLanguage = () => {
    try {
      localStorage.setItem("softunebd_lang", targetLocale);
    } catch {
      // Ignore quota/private mode errors
    }
    // middleware.ts can't read localStorage, so the same choice also goes in
    // a cookie — that's what stops its Bangla-first redirect from bouncing
    // someone who deliberately picked English straight back to /bn.
    document.cookie = `softunebd_lang=${targetLocale}; path=/; max-age=31536000; samesite=lax`;
    router.push(targetPath);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-[var(--color-line)] px-2.5 text-[13px] font-bold text-[var(--color-ink)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] ${className}`}
      title={isBn ? "Switch to English" : "বাংলায় দেখুন"}
      aria-label={isBn ? "Switch to English" : "Switch to Bangla"}
    >
      {isBn ? "EN" : "বাং"}
    </button>
  );
}
