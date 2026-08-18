"use client";

import { useState } from "react";
import { Menu, X, ShoppingCart, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

const links = [
  {
    label: "Features",
    href: "#features",
    submenus: [
      { label: "Multiple Themes", href: "/features/multiple-themes", icon: "/icons/themes.svg" },
      { label: "AI Assistant", href: "/features/ai-assistant", icon: "/icons/ai-pencil.svg" },
      { label: "POS System", href: "/features/pos-system", icon: "/icons/billing.svg" },
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
  {
    label: "Services",
    href: "#services",
    submenus: [
      { label: "Store Setup", href: "/services/store-setup", icon: "/icons/domain.svg" },
      {
        label: "Theme Design",
        href: "/services/theme-design",
        icon: "/icons/color.svg",
      },
      { label: "SEO Optimization", href: "/services/seo-optimization", icon: "/icons/analytics.svg" },
      {
        label: "Store Migration",
        href: "/services/store-migration",
        icon: "/icons/arrow-link.svg",
      },
      {
        label: "Consultation",
        href: "/services/consultation",
        icon: "/icons/chat.svg",
      },
    ],
  },
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

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="relative z-40 flex h-[44px] w-full items-center justify-between overflow-hidden bg-[#c147b6] px-4 text-white sm:px-6 lg:px-8">
        <div className="hidden items-center gap-2 sm:flex">
          <img
            src="/sale.svg"
            alt="Sale"
            className="h-12 w-auto object-contain"
          />
        </div>
        <div className="flex-1 text-center text-lg font-medium z-10">
          Launch Sale is on! 🎉 Get ready to boost your sales with{" "}
          <span className="text-[#a3ffaa] cursor-pointer underline underline-offset-2">
            exclusive discounts!
          </span>
        </div>
        <div className="hidden sm:flex z-10">
          <a
            href="#sale"
            className="animate-shine flex h-[120px] -my-[38px] flex-col items-center justify-center rounded-full border-[4px] border-white bg-gradient-to-r from-[#10b981] to-[#34d399] px-10 leading-tight transition-transform hover:scale-[1.02]"
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
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm">
              <img
                src="/logo.svg"
                alt="Softune"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-[var(--color-ink)]">
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
                  className="font-[family-name:var(--font-dm-sans)] flex items-center gap-1 text-lg font-medium tracking-tight  text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand)]"
                >
                  {l.label}
                  {l.submenus && <ChevronDown className="size-4" />}
                </a>

                {/* Desktop Dropdown */}
                {l.submenus && (
                  <AnimatePresence>
                    {openDropdown === l.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute left-0 top-full rounded-b-xl border border-[var(--color-line)] border-t-0 bg-[var(--color-surface)] p-3 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] ${
                          l.submenus.length > 3
                            ? "w-[540px] grid grid-cols-2 gap-x-6 gap-y-1 before:absolute before:inset-y-4 before:left-1/2 before:-translate-x-1/2 before:w-[1px] before:bg-[var(--color-line)]"
                            : "w-56 flex flex-col gap-1"
                        }`}
                      >
                        {l.submenus.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            className="group flex items-center gap-3 rounded-md px-3 py-1.5 text-sm font-medium text-[var(--color-muted)] hover:bg-[var(--color-canvas)] hover:text-[var(--color-ink)] transition-colors"
                          >
                            {sub.icon && (
                              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] transition-colors group-hover:bg-[var(--color-brand)]">
                                <img
                                  src={sub.icon}
                                  alt=""
                                  className="size-5 object-contain opacity-70 transition-all group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                                />
                              </div>
                            )}
                            <span>{sub.label}</span>
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
              className="relative flex items-center justify-center text-[var(--color-ink)] hover:text-[var(--color-brand)] transition-colors"
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
              href="#login"
              variant="primary"
              className="gap-2 px-6 py-2.5 text-base font-semibold"
            >
              <img
                src="/icons/user.svg"
                alt=""
                className="size-4 object-contain brightness-0 invert"
              />
              Login
            </Button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <a
              href="#cart"
              className="relative flex items-center justify-center text-[var(--color-ink)]"
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
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-full text-[var(--color-ink)]"
              aria-label="Menu"
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
              <div className="flex flex-col gap-1 px-5 py-4">
                {links.map((l) => (
                  <div key={l.label}>
                    <a
                      href={l.href}
                      onClick={() => !l.submenus && setOpen(false)}
                      className="font-[family-name:var(--font-dm-sans)] flex w-full items-center justify-between rounded-lg px-2 py-3 text-lg font-semibold text-[var(--color-ink)]"
                    >
                      {l.label}
                      {l.submenus && (
                        <ChevronDown className="size-4 text-[var(--color-muted)]" />
                      )}
                    </a>
                    {l.submenus && (
                      <div
                        className={`ml-4 flex flex-col gap-1 border-l-2 border-[var(--color-line)] pl-2 mt-1 ${l.submenus.length > 3 ? "grid grid-cols-1" : ""}`}
                      >
                        {l.submenus.map((sub) => (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            className="group flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm font-medium text-[var(--color-muted)]"
                          >
                            {sub.icon && (
                              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] transition-colors group-hover:bg-[var(--color-brand)]">
                                <img
                                  src={sub.icon}
                                  alt=""
                                  className="size-4 object-contain opacity-70 transition-all group-hover:opacity-100 group-hover:brightness-0 group-hover:invert"
                                />
                              </div>
                            )}
                            <span>{sub.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Button
                  as="a"
                  href="https://dashboard.softune.xyz/"
                  onClick={() => setOpen(false)}
                  variant="primary"
                  className="mt-4 gap-2 px-6 py-3 text-base font-semibold"
                >
                  <img
                    src="/icons/user.svg"
                    alt=""
                    className="size-4 object-contain brightness-0 invert"
                  />
                  Login
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
