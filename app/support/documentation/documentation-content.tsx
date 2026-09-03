"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  Settings,
  Paintbrush,
  CreditCard,
  BarChart3,
  Package,
  ArrowRight,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { DOC_CATEGORIES, type DocIconName } from "@/lib/documentation-data";

const DOC_ICONS: Record<DocIconName, LucideIcon> = {
  book: BookOpen,
  settings: Settings,
  paintbrush: Paintbrush,
  payments: CreditCard,
  analytics: BarChart3,
  addons: Package,
};

export default function DocumentationPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = DOC_CATEGORIES.filter(
    (cat) =>
      cat.title.toLowerCase().includes(search.toLowerCase()) ||
      cat.articles.some((art) =>
        art.title.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        {/* Hero Section (Changelog Inspired) */}
        <div className="relative overflow-hidden rounded-b-[4rem] border-b-[6px] border-[var(--color-surface)] bg-[var(--color-canvas)] pt-12 pb-14 text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] px-5">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

          {/* Hero Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-6 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span
                className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                style={{ animationDuration: "2s" }}
              />
              <img
                src="/icons/book.svg"
                alt="Docs"
                className="size-3.5 object-contain dark:invert"
              />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Softunebd Docs
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 mb-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-4xl font-black tracking-tight text-[var(--color-ink)] md:text-6xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Developer & Merchant
            <span className="relative mx-1 inline-block px-3 py-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Documentation</em>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 mx-auto mb-8 max-w-2xl text-[16px] leading-relaxed font-medium text-[var(--color-muted)] md:text-lg"
          >
            Learn how to configure your store, customize themes, connect
            payments and couriers, and use Softunebd&apos;s dashboard tools to
            grow your ecommerce business.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="relative z-10 mx-auto max-w-lg"
          >
            <div className="relative flex items-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 shadow-sm transition-all hover:border-[var(--color-brand)] focus-within:border-[var(--color-brand)] focus-within:ring-2 focus-within:ring-[var(--color-brand)]/15">
              <Search className="ml-4 size-5 text-[var(--color-muted)]" />
              <input
                type="text"
                placeholder="Search articles, APIs, guides..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border-0 bg-transparent px-3 py-2 text-[15px] font-medium text-[var(--color-ink)] outline-none placeholder-[var(--color-muted-soft)]"
              />
            </div>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <section className="bg-[var(--color-canvas)] py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((cat, i) => {
                const Icon = DOC_ICONS[cat.icon];
                return (
                  <motion.article
                    key={cat.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="group relative overflow-hidden rounded-[24px] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 text-left transition-all duration-300 hover:border-[var(--color-brand)] md:p-10"
                  >
                    <div className="pointer-events-none absolute top-0 right-0 h-2/3 w-2/3 bg-dot-grid-dense opacity-80 [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)]" />

                    <div className="relative z-10">
                      <div className="inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-brand)] p-1.5 transition-transform duration-300 group-hover:scale-110">
                        <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-brand)] text-white shadow-sm">
                          <Icon className="size-5" />
                        </div>
                      </div>

                      <h3 className="mt-6 text-[20px] font-extrabold tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand)]">
                        {cat.title}
                      </h3>

                      <ul className="mt-6 space-y-5">
                        {cat.articles.map((art) => (
                          <li key={art.slug}>
                            <a
                              href={`/support/documentation/${art.slug}`}
                              className="group/link flex cursor-pointer items-center justify-between"
                            >
                              <span className="flex items-center gap-2 text-[15px] font-medium text-[var(--color-muted)] transition-colors group-hover/link:text-[var(--color-ink)]">
                                <img
                                  src="/icons/doc.svg"
                                  alt=""
                                  className="size-4 object-contain opacity-70 dark:invert"
                                />
                                {art.title}
                              </span>
                              <ChevronRight className="size-4 text-[var(--color-muted)] transition-transform group-hover/link:translate-x-1" />
                            </a>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8">
                        <a
                          href={`/support/documentation/${cat.articles[0].slug}`}
                          className="inline-flex items-center gap-1 text-[13px] font-bold text-[var(--color-brand)] hover:underline"
                        >
                          Browse All Articles{" "}
                          <img
                            src="/icons/arrow-right.svg"
                            alt=""
                            className="size-3 object-contain"
                          />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
