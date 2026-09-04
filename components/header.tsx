"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SoftuneLogo } from "@/components/brand/softune-logo";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { GeoBanner } from "./geo-banner";
import { TRIAL_CTA, TRIAL_CTA_BN } from "@/lib/site";

const linksEn = [
  {
    label: "Features",
    href: "/features",
    submenus: [
      { label: "Theme Editor", href: "/features/multiple-themes", icon: "/icons/color.svg" },
      { label: "AI Assistant", href: "/features/ai-assistant", icon: "/icons/ai-pencil.svg" },
      { label: "Payments", href: "/features/payments", icon: "/icons/wallet.svg" },
      { label: "Store Sale", href: "/features/store-sale", icon: "/icons/shop-bag.svg" },
      { label: "Events & Campaigns", href: "/features/events-campaigns", icon: "/icons/events.svg" },
      {
        label: "Marketing & Tracking",
        href: "/features/marketing-tracking",
        icon: "/icons/analytics.svg",
      },
      {
        label: "Store Analytics",
        href: "/features/store-analytics",
        icon: "/icons/analytics.svg",
      },
      { label: "Couriers", href: "/features/courier", icon: "/icons/delivery.svg" },
      { label: "Orders", href: "/features/orders", icon: "/icons/orders.svg" },
      { label: "Customers", href: "/features/customer-management", icon: "/icons/user.svg" },
      { label: "Fraud Protection", href: "/features/fraud-protection", icon: "/icons/lock.svg" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blog" },
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

const linksBn = [
  {
    label: "ফিচারসমূহ",
    href: "/bn/features",
    submenus: [
      { label: "থিম এডিটর", href: "/bn/features/multiple-themes", icon: "/icons/color.svg" },
      { label: "AI অ্যাসিস্ট্যান্ট", href: "/bn/features/ai-assistant", icon: "/icons/ai-pencil.svg" },
      { label: "পেমেন্ট গেটওয়ে", href: "/bn/features/payments", icon: "/icons/wallet.svg" },
      { label: "স্টোর সেল", href: "/bn/features/store-sale", icon: "/icons/shop-bag.svg" },
      { label: "ইভেন্ট ও ক্যাম্পেইন", href: "/bn/features/events-campaigns", icon: "/icons/events.svg" },
      {
        label: "মার্কেটিং & ট্র্যাকিং",
        href: "/bn/features/marketing-tracking",
        icon: "/icons/analytics.svg",
      },
      {
        label: "স্টোর অ্যানালিটিক্স",
        href: "/bn/features/store-analytics",
        icon: "/icons/analytics.svg",
      },
      { label: "লোকাল কুরিয়ার", href: "/bn/features/courier", icon: "/icons/delivery.svg" },
      { label: "অর্ডার ম্যানেজমেন্ট", href: "/bn/features/orders", icon: "/icons/orders.svg" },
      { label: "কাস্টমার ম্যানেজমেন্ট", href: "/bn/features/customer-management", icon: "/icons/user.svg" },
      { label: "ফ্রড প্রোটেকশন", href: "/bn/features/fraud-protection", icon: "/icons/lock.svg" },
    ],
  },
  { label: "প্রাইসিং", href: "/bn/pricing" },
  { label: "আমাদের কথা", href: "/bn/about" },
  { label: "ব্লগ", href: "/bn/blog" },
  {
    label: "সাপোর্ট",
    href: "/bn/#support",
    submenus: [
      { label: "ডকুমেন্টেশন", href: "/bn/support/documentation", icon: "/icons/book.svg" },
      { label: "FAQ", href: "/bn/support/faq", icon: "/icons/help-desk.svg" },
      { label: "কন্টাক্ট সাপোর্ট", href: "/bn/support/contact", icon: "/icons/chat.svg" },
      { label: "ভিডিও টিউটোরিয়াল", href: "/bn/support/tutorials", icon: "/icons/play.svg" },
      { label: "কমিউনিটি ফোরাম", href: "/bn/support/community", icon: "/icons/user.svg" },
    ],
  },
];

export function Header({ locale = "en" }: { locale?: "en" | "bn" }) {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const isBn = locale === "bn";
  const links = isBn ? linksBn : linksEn;
  const signupHref = isBn ? "/bn/signup" : "/signup";
  const homeHref = isBn ? "/bn" : "/";
  const ctaText = isBn ? TRIAL_CTA_BN : TRIAL_CTA;

  return (
    <>
      <GeoBanner />
      {/* Top Announcement Bar - Only visible on sm screens and larger */}
      <div className="relative z-40 hidden h-[44px] w-full items-center justify-between overflow-hidden bg-[#c147b6] px-6 lg:px-8 text-white sm:flex">
        <div className="flex items-center gap-2">
          <img
            loading="lazy"
            decoding="async"
            src="/sale.svg"
            alt=""
            width={180}
            height={44}
            className="h-11 w-auto object-contain object-left"
          />
        </div>

        {/* Desktop: full message */}
        <div className="z-10 flex-1 text-center text-base font-medium md:text-lg">
          {isBn ? (
            <>
              ৩ দিনের ফ্রি ট্রায়াল চলছে!{" "}
              <a href={signupHref} className="text-[#a3ffaa] underline underline-offset-2">
                কোনো কার্ড ছাড়াই লাইভ স্টোর খুলুন।
              </a>
            </>
          ) : (
            <>
              3-day free trial is on! Open a real store with{" "}
              <a href={signupHref} className="text-[#a3ffaa] underline underline-offset-2">
                no credit card.
              </a>
            </>
          )}
        </div>
        <div className="z-10 flex">
          <a
            href={signupHref}
            className="animate-shine -my-[38px] flex h-[120px] flex-col items-center justify-center rounded-full border-[4px] border-white bg-gradient-to-r from-[#10b981] to-[#34d399] px-8 leading-tight transition-transform hover:scale-[1.02]"
          >
            <span className="text-[13px] font-bold tracking-tight text-[#1a1a1a]">
              {isBn ? "শুরু করুন" : "GET"}
            </span>
            <span className="text-base font-black text-[#1a1a1a]">
              {isBn ? "ফ্রি" : "FREE"}
            </span>
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 flex flex-col border-b border-[var(--color-line)] bg-[var(--color-surface)]/90 backdrop-blur-md">
        {/* Main Navbar */}
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 md:h-20 md:px-8">
          <a href={homeHref} className="flex min-w-0 items-center">
            <SoftuneLogo className="h-9 w-auto md:h-11" />
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
                  className="font-[family-name:var(--font-dm-sans),var(--font-bn)] flex items-center gap-1 text-lg font-medium tracking-tight text-[var(--color-ink)] transition-colors hover:text-[var(--color-brand)]"
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
                              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-canvas)] transition-colors group-hover:bg-[var(--color-brand)]">
                                <img
                                  loading="lazy"
                                  decoding="async"
                                  src={sub.icon}
                                  alt=""
                                  className="size-5 object-contain transition-all group-hover:brightness-0 group-hover:invert dark:invert"
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

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle />
            <Button
              as="a"
              href={signupHref}
              variant="primary"
              className="gap-2 px-5 py-2.5 text-base font-semibold shadow-md"
            >
              {ctaText}
              <img
                src="/icons/arrow-right.svg"
                alt=""
                className="size-4 object-contain brightness-0 invert"
              />
            </Button>
          </div>

          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <LanguageSwitcher locale={locale} />
            <ThemeToggle className="ml-0" />
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-[var(--color-ink)]"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() =>
                setOpen((v) => {
                  if (v) setMobileExpanded(null);
                  return !v;
                })
              }
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Backdrop & Drawer Panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setOpen(false);
                setMobileExpanded(null);
              }}
              className="fixed inset-0 z-[9999] bg-black/60 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[10000] w-full max-w-[340px] bg-surface shadow-2xl flex flex-col md:hidden border-r border-line"
            >
              <div className="flex h-16 items-center justify-between px-6 border-b border-line shrink-0">
                <a
                  href={homeHref}
                  className="flex items-center"
                  onClick={() => {
                    setOpen(false);
                    setMobileExpanded(null);
                  }}
                >
                  <SoftuneLogo className="h-10 w-auto" />
                </a>
                <button
                  onClick={() => {
                    setOpen(false);
                    setMobileExpanded(null);
                  }}
                  className="flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-line/40"
                  aria-label="Close menu"
                >
                  <X className="size-6" />
                </button>
              </div>

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
                                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-canvas group-hover:bg-brand transition-colors">
                                        <img
                                          loading="lazy"
                                          decoding="async"
                                          src={sub.icon}
                                          alt=""
                                          className="size-5 object-contain dark:invert group-hover:brightness-0 group-hover:invert transition-all"
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

              <div className="flex items-center gap-4 p-6 border-t border-line bg-canvas/20 shrink-0">
                <Button
                  as="a"
                  href={signupHref}
                  onClick={() => setOpen(false)}
                  variant="primary"
                  className="min-w-0 flex-1 justify-center gap-2 py-3.5 text-base font-bold shadow-md"
                >
                  {ctaText}
                  <img
                    src="/icons/arrow-right.svg"
                    alt=""
                    className="size-4 object-contain brightness-0 invert"
                  />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
