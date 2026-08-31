type MaskIconProps = {
  src: string;
  className?: string;
};

/** Public SVG as a mask so fill follows `currentColor` — lets a local icon
 * (e.g. /icons/whatsapp.svg) pick up text-primary/text-white via className
 * instead of being stuck with whatever color is baked into the file.
 * Mirrors dashboard/components/ui/mask-icon.tsx exactly. */
export function MaskIcon({ src, className = "size-5" }: MaskIconProps) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        maskImage: `url(${src})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
