/**
 * The ENUVOR mark (public/enuvor/, copied from the ENUVOR site's public/brand) with its wordmark,
 * set the way the ENUVOR site sets it: wide, spaced capitals. SoftuneBD's own heading font is
 * used for the letters; the mark is a full-colour image, so it needs no dark/light variant.
 */
export function EnuvorLogo({ size = 40, wordmark = true, className = "" }: { size?: number; wordmark?: boolean; className?: string }) {
  return (
    <span className={["inline-flex items-center gap-3", className].join(" ")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/enuvor/enuvor-mark-256.png"
        alt={wordmark ? "" : "ENUVOR"}
        width={size}
        height={size}
        draggable={false}
        style={{ width: size, height: size }}
        className="shrink-0 object-contain"
      />
      {wordmark ? (
        <span
          className="font-semibold uppercase tracking-[0.22em] text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-heading), var(--font-bn)", fontSize: Math.round(size * 0.42) }}
        >
          ENUVOR
        </span>
      ) : null}
    </span>
  );
}
