import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "outline" | "ink" | "secondary";
  className?: string;
};

type ButtonAsButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type ButtonAsAnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

export function Button({
  children,
  variant = "primary",
  className = "",
  as = "button",
  ...props
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium disabled:opacity-50 cursor-pointer transition-all duration-200";
  
  const variants = {
    primary: "bg-[var(--color-brand)] text-white hover:opacity-90",
    ink: "bg-[var(--color-ink)] text-white hover:opacity-90",
    outline: "border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-canvas)]",
    secondary: "bg-[var(--color-line)] text-[var(--color-ink)] border border-transparent hover:bg-[var(--color-surface)] hover:border-[var(--color-line)] transition-all duration-200",
  };

  const finalClasses = [baseClasses, variants[variant], className].filter(Boolean).join(" ");

  if (as === "a") {
    return (
      <a className={finalClasses} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={finalClasses} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
