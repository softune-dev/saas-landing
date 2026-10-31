"use client";

import { motion } from "framer-motion";

/** A design-tool selection box: a hairline brand outline, four square handles
 * and a name tag. The hero title uses it on "Website", and the live preview
 * uses it on whichever part of the store the AI is working on, so the page has
 * one visual idea for "this is being built". */
export function SelectionFrame({
  label,
  className = "",
  tagClassName = "",
  handleClassName = "size-[7px]",
  tagInside = false,
}: {
  label?: string;
  className?: string;
  tagClassName?: string;
  handleClassName?: string;
  /** Put the tag inside the top-left corner (when there's no room above). */
  tagInside?: boolean;
}) {
  const handle = ["absolute rounded-[2px] border-[1.5px] border-[var(--color-brand)] bg-white", handleClassName].join(" ");
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={["pointer-events-none absolute border-[1.5px] border-[var(--color-brand)]", className].join(" ")}
    >
      <span className={[handle, "-top-[4px] -left-[4px]"].join(" ")} />
      <span className={[handle, "-top-[4px] -right-[4px]"].join(" ")} />
      <span className={[handle, "-bottom-[4px] -left-[4px]"].join(" ")} />
      <span className={[handle, "-right-[4px] -bottom-[4px]"].join(" ")} />
      {label ? (
        <span
          className={[
            tagInside ? "absolute top-[3px] left-[3px]" : "absolute bottom-full left-[-1.5px] mb-1",
            "rounded-[4px] bg-[var(--color-brand)] px-1.5 py-[1px] font-sans text-[11px] leading-[1.5] font-semibold tracking-normal whitespace-nowrap text-white",
            tagClassName,
          ].join(" ")}
        >
          {label}
        </span>
      ) : null}
    </motion.span>
  );
}
