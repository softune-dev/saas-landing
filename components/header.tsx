"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";

const links = [
  {
    label: "Features",
    href: "/#features",
    submenus: [
      { label: "Multiple Themes", href: "/features/multiple-themes", icon: "/icons/themes.svg" },
      { label: "AI Assistant", href: "/features/ai-assistant", icon: "/icons/ai-pencil.svg" },
      { label: "Fraud Protection", href: "/features/fraud-protection", icon: "/icons/lock.svg" },
      { label: "Courier", href: "/features/courier", icon: "/icons/delivery.svg" },
      {
        label: "Store Analytics",
        href: "/features/store-analytics",
        icon: "/icons/analytics.svg",
      },
      { label: "Customer Management", href: "/features/customer-management", icon: "/icons/user.svg" },
      { label: "Orders", href: "/features/orders", icon: "/icons/orders.svg" },
      { label: "Payments", href: "/features/payments", icon: "/icons/wallet.svg" },
    ],
  },
  { label: "Add-Ons", href: "/#addons" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  {
    label: "Support",
    href: "/#support",
    submenus: [
      { label: "Documentation", href: "/support/documentation", icon: "/icons/book.svg" },
      { label: "FAQ", href: "/support/faq", icon: "/icons/help-desk.svg" },
      { label: "Contact Support", href: "/support/contact", icon: "/icons/chat.svg" },
      { label: "Video Tutorials", href: "/support/tutorials", icon: "/icons/play.svg" },
      { label: "Community Forum", href: "/support/community", icon: "/icons/user.svg" },
    ],
  },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>("Features");

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="relative z-40 flex h-11 w-full items-center justify-between overflow-hidden bg-[#c147b6] px-3 text-white sm:h-[44px] sm:px-6 lg:px-8">
        <div className="hidden items-center gap-2 sm:flex">
          <img
            src="/sale.svg"
            alt="Sale"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Mobile: compact copy + discount chip */}
        <div className="flex flex-1 items-center justify-between gap-2 sm:hidden">
          <p className="min-w-0 truncate text-[13px] font-semibold tracking-tight">
            Launch Sale is on! 🎉
          </p>
          <a
            href="#sale"
            className="inline-flex shrink-0 items-center rounded-full border border-white/40 bg-gradient-to-r from-[#10b981] to-[#34d399] px-2.5 py-1 text-[11px] font-black tracking-tight text-[#1a1a1a]"
          >
            20% OFF
          </a>
        </div>

        {/* Desktop: full message */}
        <div className="z-10 hidden flex-1 text-center text-lg font-medium sm:block">
          Launch Sale is on! 🎉 Get ready to boost your sales with{" "}
          <span className="cursor-pointer text-[#a3ffaa] underline underline-offset-2">
            exclusive discounts!
          </span>
        </div>
        <div className="z-10 hidden sm:flex">
          <a
            href="#sale"
            className="animate-shine -my-[38px] flex h-[120px] flex-col items-center justify-center rounded-full border-[4px] border-white bg-gradient-to-r from-[#10b981] to-[#34d399] px-10 leading-tight transition-transform hover:scale-[1.02]"
          >
            <span className="text-[14px] font-bold tracking-tight text-[#1a1a1a]">
              GET
            </span>
            <span className="text-lg font-black text-[#1a1a1a]">20% OFF</span>
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 flex flex-col border-b border-[var(--color-line)] bg-[var(--color-surface)]/90 backdrop-blur-md">
        {/* Main Navbar */}
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 md:h-20 md:px-8">
          <a href="/" className="flex min-w-0 items-center gap-2 md:gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm md:size-10">
              <img
                src="/logo.svg"
                alt="Softune"
                className="h-6 w-auto object-contain brightness-0 invert md:h-8"
              />
            </div>
            <span className="truncate text-lg font-bold tracking-tight text-[var(--color-ink)] md:text-xl">
              Softune
            </span>
          </a>

          <nav className="hidden h-full items-center gap-8 md:flex">
            {links.map((l) => (
              <div
                key={l.label}
                className="relative flex h-full items-center after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:bg-[var(--color-brand)] after:transition-all after:duration-300 hover:after:w-full"
                onMouseEnter={() => setOpenDropdown(l.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={l.href}
                  className="font-[family-name:var(--font-dm-sans)] flex items-center gap-1 text-lg font-medium tracking-tight text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand)]"
                >
                  {l.label}
                  {l.submenus && <ChevronDown className="size-4" />}
                </a>

                {l.submenus && (
                  <AnimatePresence>
                    {openDropdown === l.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className={`absolute left-0 top-full z-50 mt-0 overflow-hidden rounded-b-2xl border border-[var(--color-line)] border-t-0 bg-[var(--color-surface)] p-2 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.18)] ${
                          l.submenus.length > 3
                            ? "grid w-[480px] grid-cols-2 gap-0.5"
                            : "flex w-56 flex-col gap-0.5"
                        }`}
                      >
                        {l.submenus.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-line)]/50"
                          >
                            {sub.icon && (
                              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-canvas)] transition-colors group-hover:bg-[var(--color-brand)]">
                                <img
                                  src={sub.icon}
                                  alt=""
                                  className="size-4 object-contain transition-all group-hover:brightness-0 group-hover:invert dark:invert"
                                />
                              </div>
                            )}
                            <span className="tracking-tight">{sub.label}</span>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <a
              href="#cart"
              className="relative flex items-center justify-center text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand)]"
            >
              <img
                src="/icons/cart.svg"
                alt="Cart"
                className="size-5 object-contain dark:invert"
              />
              <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-[var(--color-brand)] text-[9px] font-bold text-white">
                0
              </span>
            </a>
            <ThemeToggle />
            <Button
              as="a"
              href="https://dashboard.softune.xyz/"
              variant="primary"
              className="px-6 py-2.5 text-base font-semibold shadow-md"
            >
              Login
            </Button>
          </div>

          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <ThemeToggle className="ml-0" />
            <a
              href="#cart"
              className="relative flex size-9 items-center justify-center text-[var(--color-ink)]"
            >
              <img
                src="/icons/cart.svg"
                alt="Cart"
                className="size-5 object-contain dark:invert"
              />
              <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-[var(--color-brand)] text-[9px] font-bold text-white">
                0
              </span>
            </a>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-full text-[var(--color-ink)]"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Backdrop & Drawer Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[9999] bg-black/60 md:hidden"
            />
            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[10000] w-full max-w-[340px] bg-surface shadow-2xl flex flex-col md:hidden border-r border-line"
            >
              {/* Header inside sidebar */}
              <div className="flex h-16 items-center justify-between px-6 border-b border-line shrink-0">
                <a href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand shadow-sm">
                    <img
                      src="/logo.svg"
                      alt="Softune"
                      className="h-5 w-auto object-contain brightness-0 invert"
                    />
                  </div>
                  <span className="text-lg font-bold tracking-tight text-ink">
                    Softune
                  </span>
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="flex size-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-line/40"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Navigation list */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar">
                {links.map((l) => {
                  const expanded = mobileExpanded === l.label;
                  return (
                    <div key={l.label} className="space-y-3">
                      {l.submenus ? (
                        <div>
                          <button
                            type="button"
                            onClick={() => setMobileExpanded(expanded ? null : l.label)}
                            className="flex w-full items-center justify-between font-display text-2xl font-normal tracking-tight text-ink"
                          >
                            <span>{l.label}</span>
                            <ChevronDown className={`size-5 text-muted transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
                          </button>
                          
                          <AnimatePresence initial={false}>
                            {expanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mt-3 pl-1 space-y-1.5"
                              >
                                {l.submenus.map((sub) => (
                                  <a
                                    key={sub.label}
                                    href={sub.href}
                                    onClick={() => setOpen(false)}
                                    className="group flex items-center gap-3 rounded-xl px-2 py-2 text-[15px] font-semibold text-muted hover:text-ink transition-colors"
                                  >
                                    {sub.icon && (
                                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-canvas group-hover:bg-brand transition-colors">
                                        <img 
                                          src={sub.icon} 
                                          alt="" 
                                          className="size-4 object-contain dark:invert group-hover:brightness-0 group-hover:invert transition-all" 
                                        />
                                      </div>
                                    )}
                                    <span className="tracking-tight">{sub.label}</span>
                                  </a>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <a
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="block font-display text-2xl font-normal tracking-tight text-ink"
                        >
                          {l.label}
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Login/CTA Area */}
              <div className="p-6 border-t border-line bg-canvas/20 shrink-0">
                <Button
                  as="a"
                  href="https://dashboard.softune.xyz/"
                  onClick={() => setOpen(false)}
                  variant="primary"
                  className="w-full justify-center py-3.5 text-base font-bold shadow-md"
                >
                  Login / Get Started
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
