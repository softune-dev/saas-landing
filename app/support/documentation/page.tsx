"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { 
  Search, BookOpen, Settings, Paintbrush, Code, CreditCard, 
  Truck, ArrowRight, ChevronRight, FileText, ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    title: "Getting Started",
    icon: BookOpen,
    articles: [
      "Introduction to Softune",
      "Account setup checklist",
      "Connecting custom domains",
      "Navigating your dashboard"
    ]
  },
  {
    title: "Store Management",
    icon: Settings,
    articles: [
      "Managing product catalogs",
      "Setting up tax configurations",
      "Inventory tracking & alerts",
      "Bulk imports via CSV"
    ]
  },
  {
    title: "Bespoke Themes",
    icon: Paintbrush,
    articles: [
      "Introduction to theme editor",
      "Custom CSS and layouts",
      "Adding custom font families",
      "Optimizing mobile viewport styling"
    ]
  },
  {
    title: "SEO Optimization",
    icon: Search,
    articles: [
      "Configuring product meta tags",
      "Generating XML sitemaps",
      "Setting up JSON-LD schema",
      "URL structure & 301 redirects"
    ]
  },
  {
    title: "Payment Integration",
    icon: CreditCard,
    articles: [
      "Integrating Stripe & PayPal",
      "Regional COD pipelines",
      "Refund & payout workflows",
      "Multi-currency support setup"
    ]
  },
  {
    title: "Shipping & Courier",
    icon: Truck,
    articles: [
      "Courier API integrations",
      "Live rate calculations",
      "Automated tracking notifications",
      "Cross-border shipping options"
    ]
  }
];

export default function DocumentationPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter(cat => 
    cat.title.toLowerCase().includes(search.toLowerCase()) ||
    cat.articles.some(art => art.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF9F6]">
        
        {/* Hero Section (Changelog Inspired) */}
        <div className="relative pt-12 pb-14 px-5 text-center overflow-hidden bg-[#f0f1f3] rounded-b-[4rem] border-b-[6px] border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

          {/* Hero Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-6 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-white p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15" style={{ animationDuration: "2s" }} />
              <img src="/icons/book.svg" alt="Docs" className="size-3.5 object-contain" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Softune Docs
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Developer & Merchant
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Documentation</em>
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Learn how to configure your store, customize themes, integrate custom payment processors, and leverage our robust API to scale your ecommerce business.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="relative z-10 max-w-lg mx-auto"
          >
            <div className="relative flex items-center bg-white rounded-full border border-[#D4D4D4] shadow-sm hover:border-[var(--color-brand)] focus-within:border-[var(--color-brand)] focus-within:ring-2 focus-within:ring-[var(--color-brand)]/15 transition-all p-1">
              <Search className="size-5 ml-4 text-[var(--color-muted)]" />
              <input
                type="text"
                placeholder="Search articles, APIs, guides..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-0 outline-none px-3 py-2 text-[15px] font-medium text-[var(--color-ink)] placeholder-[#A3A3A3]"
              />
            </div>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <section className="py-24 bg-[#FAF9F6]">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <motion.article
                    key={cat.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="relative overflow-hidden rounded-[24px] border border-[#D4D4D4] hover:border-[var(--color-brand)] bg-white p-8 md:p-10 transition-all duration-300 group text-left"
                  >
                    {/* Background Dots Gradient */}
                    <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)] opacity-80" />

                    <div className="relative z-10">
                      <div className="inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-brand)] p-1.5 transition-transform duration-300 group-hover:scale-110">
                        <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm text-white">
                          <Icon className="size-5" />
                        </div>
                      </div>
                      
                      <h3 className="mt-6 text-[20px] font-extrabold tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand)]">
                        {cat.title}
                      </h3>

                      <ul className="mt-6 space-y-3.5 border-t border-[var(--color-line)] pt-5">
                        {cat.articles.map((art) => (
                          <li key={art}>
                            <a
                              href="/support/documentation/article"
                              className="flex items-center justify-between group/link cursor-pointer"
                            >
                              <span className="text-[15px] font-medium text-[var(--color-muted)] group-hover/link:text-[var(--color-ink)] transition-colors flex items-center gap-2">
                                <img src="/icons/empty.svg" alt="" className="size-4 object-contain opacity-70" />
                                {art}
                              </span>
                              <ChevronRight className="size-4 text-[var(--color-muted)] group-hover/link:translate-x-1 transition-transform" />
                            </a>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 pt-4 border-t border-[var(--color-line)]">
                        <a href="/support/documentation/article" className="inline-flex items-center gap-1 text-[13px] font-bold text-[var(--color-brand)] hover:underline">
                          Browse All Articles <ArrowRight className="size-3.5 ml-1" />
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
