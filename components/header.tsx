"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

const links = [
  {
    label: "Features",
    href: "#features",
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
  { label: "Add-Ons", href: "#addons" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  {
    label: "Support",
    href: "#support",
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
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

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

      <header className="sticky top-0 z-50 flex flex-col border-b border-[var(--color-line)]/80 bg-white/90 backdrop-blur-md">
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
                        className={`absolute left-0 top-full z-50 mt-0 overflow-hidden rounded-b-2xl border border-[var(--color-line)] border-t-0 bg-[#f0f1f3] p-2 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.18)] ${
                          l.submenus.length > 3
                            ? "grid w-[480px] grid-cols-2 gap-0.5"
                            : "flex w-56 flex-col gap-0.5"
                        }`}
                      >
                        {l.submenus.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:bg-[#e4e5e8]"
                          >
                            {sub.icon && (
                              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#e4e5e8] transition-colors group-hover:bg-[var(--color-brand)]">
                                <img
                                  src={sub.icon}
                                  alt=""
                                  className="size-4 object-contain transition-all group-hover:brightness-0 group-hover:invert"
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
                className="size-5 object-contain"
              />
              <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-[var(--color-brand)] text-[9px] font-bold text-white">
                0
              </span>
            </a>
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
            <a
              href="#cart"
              className="relative flex size-9 items-center justify-center text-[var(--color-ink)]"
            >
              <img
                src="/icons/cart.svg"
                alt="Cart"
                className="size-5 object-contain"
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

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[var(--color-line)] md:hidden"
            >
              <div className="flex max-h-[min(70vh,32rem)] flex-col gap-0.5 overflow-y-auto px-4 py-3">
                {links.map((l) => {
                  const expanded = mobileExpanded === l.label;
                  return (
                    <div key={l.label}>
                      {l.submenus ? (
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpanded(expanded ? null : l.label)
                          }
                          className="font-[family-name:var(--font-dm-sans)] flex w-full items-center justify-between rounded-lg px-2 py-3 text-base font-semibold text-[var(--color-ink)]"
                        >
                          {l.label}
                          <ChevronDown
                            className={[
                              "size-4 text-[var(--color-muted)] transition-transform",
                              expanded ? "rotate-180" : "",
                            ].join(" ")}
                          />
                        </button>
                      ) : (
                        <a
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="font-[family-name:var(--font-dm-sans)] flex w-full items-center rounded-lg px-2 py-3 text-base font-semibold text-[var(--color-ink)]"
                        >
                          {l.label}
                        </a>
                      )}
                      {l.submenus && expanded ? (
                        <div className="mb-2 ml-2 flex flex-col gap-0.5 border-l-2 border-[var(--color-line)] pl-2">
                          {l.submenus.map((sub) => (
                            <a
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setOpen(false)}
                              className="group flex min-h-11 items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium text-[var(--color-muted)]"
                            >
                              {sub.icon ? (
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#e4e5e8] transition-colors group-hover:bg-[var(--color-brand)]">
                                  <img
                                    src={sub.icon}
                                    alt=""
                                    className="size-3.5 object-contain transition-all group-hover:brightness-0 group-hover:invert"
                                  />
                                </div>
                              ) : null}
                              <span>{sub.label}</span>
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                <div className="mt-3 flex flex-col gap-2">
                  <Button
                    as="a"
                    href="https://dashboard.softune.xyz/"
                    onClick={() => setOpen(false)}
                    variant="primary"
                    className="w-full justify-center py-3 text-base font-semibold"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
