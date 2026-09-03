"use client";

import { usePathname, useRouter } from "next/navigation";

function FlagBD({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={`${className} shrink-0 aspect-square rounded-full overflow-hidden shadow-xs`}
      viewBox="0 0 100 100"
    >
      <rect width="100" height="100" fill="#006A4E" />
      <circle cx="45" cy="50" r="30" fill="#F42A41" />
    </svg>
  );
}

function FlagUK({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={`${className} shrink-0 aspect-square rounded-full overflow-hidden shadow-xs`}
      viewBox="0 0 100 100"
    >
      <clipPath id="uk-circle-clip">
        <circle cx="50" cy="50" r="50" />
      </clipPath>
      <g clipPath="url(#uk-circle-clip)">
        <rect width="100" height="100" fill="#012169" />
        <path d="M0 0L100 100M100 0L0 100" stroke="#FFFFFF" strokeWidth="14" />
        <path d="M0 0L100 100M100 0L0 100" stroke="#C8102E" strokeWidth="9" />
        <path d="M50 0V100M0 50H100" stroke="#FFFFFF" strokeWidth="22" />
        <path d="M50 0V100M0 50H100" stroke="#C8102E" strokeWidth="13" />
      </g>
    </svg>
  );
}

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
    router.push(targetPath);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-bold tracking-tight text-[var(--color-ink)] transition-all hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] ${className}`}
      title={isBn ? "Switch to English" : "বাংলায় দেখুন"}
      aria-label="Toggle language"
    >
      {isBn ? <FlagUK className="size-4" /> : <FlagBD className="size-4" />}
      <span>{isBn ? "English" : "বাংলা"}</span>
    </button>
  );
}
