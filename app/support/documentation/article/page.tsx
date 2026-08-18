"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

// ─── Reading Progress ─────────────────────────────────────────────────────────

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-[#D4D4D4]/40">
      <motion.div
        className="h-full bg-[var(--color-brand)] origin-left"
        style={{ scaleX: progress / 100 }}
        transition={{ ease: "linear", duration: 0.1 }}
      />
    </div>
  );
}

// ─── Article Data ─────────────────────────────────────────────────────────────

const article = {
  category: "Getting Started",
  categoryIcon: "/icons/book.svg",
  title: "Introduction to Softune",
  desc: "A complete orientation to the Softune platform — how it's structured, what each module does, and how to navigate your merchant dashboard from day one.",
  readTime: "5 min read",
  updated: "Aug 15, 2026",
  toc: [
    "What is Softune?",
    "Platform architecture overview",
    "Your merchant dashboard",
    "Core modules at a glance",
    "Next steps",
  ],
  body: [
    { type: "p", content: "Softune is a multi-tenant SaaS ecommerce platform built for independent merchants, small businesses, and growing brands. It consolidates storefront management, inventory, payments, POS, logistics, and analytics into a single unified dashboard — removing the need to subscribe to and stitch together multiple third-party tools." },
    { type: "h2", content: "What is Softune?" },
    { type: "p", content: "At its core, Softune provides each merchant with a fully isolated tenant environment. Your product catalog, customer records, order history, and theme files are logically separated from every other merchant on the platform. This means your data is never co-mingled, your performance is never throttled by noisy neighbors, and your storefront loads independently." },
    { type: "callout", content: "Softune is not a marketplace. You own your storefront, your customer relationships, and your brand. Softune is the infrastructure underneath it all." },
    { type: "h2", content: "Platform Architecture Overview" },
    { type: "p", content: "The platform is organized into three layers: the Merchant Dashboard (where you manage day-to-day operations), the Storefront Layer (what your customers see), and the API Layer (for integrations, automations, and custom workflows). Most merchants never need to touch the API layer — everything is configurable through the dashboard UI." },
    { type: "h2", content: "Your Merchant Dashboard" },
    { type: "p", content: "When you log in, you land on your Dashboard home. This shows a real-time snapshot of today's orders, revenue, low-stock alerts, and recent customer activity. The left sidebar provides navigation across all major modules. The top bar gives you quick access to notifications, your store switcher (if you manage multiple stores), and account settings." },
    { type: "h3", content: "Sidebar Navigation" },
    { type: "list", content: [
      "Dashboard — real-time metrics and activity feed",
      "Products — catalog management, variants, and collections",
      "Orders — full order lifecycle from placement to dispatch",
      "Customers — profiles, segments, and purchase history",
      "Themes — visual storefront editor and CSS overrides",
      "Analytics — sales trends, traffic sources, and conversion funnels",
      "Settings — billing, team members, domains, and integrations",
    ]},
    { type: "h2", content: "Core Modules at a Glance" },
    { type: "p", content: "Each Softune module is designed to work independently or together as an integrated system. You can start with just a Product Catalog and basic Checkout, then layer in POS, courier integrations, or AI recommendations as your business grows. Nothing is locked behind plan upgrades except raw usage limits." },
    { type: "quote", content: "The best merchant dashboard is the one that gets out of your way. Softune is designed for operators, not developers." },
    { type: "h2", content: "Next Steps" },
    { type: "list", content: [
      "Complete the Account Setup Checklist to verify your store details",
      "Connect your custom domain from Settings → Domains",
      "Upload your first product batch via CSV import or manually",
      "Choose a theme from the Theme Gallery and publish your storefront",
      "Run a test order to verify your checkout and payment flow end-to-end",
    ]},
    { type: "p", content: "Once you have completed these steps, your store will be fully operational. From here, explore the module-specific documentation for deeper dives into each area of the platform." },
  ],
};

const relatedDocs = [
  { title: "Account setup checklist", category: "Getting Started" },
  { title: "Connecting custom domains", category: "Getting Started" },
  { title: "Navigating your dashboard", category: "Getting Started" },
  { title: "Managing product catalogs", category: "Store Management" },
];

// ─── Body Renderer ────────────────────────────────────────────────────────────

function DocBody({ body }: { body: { type: string; content: string | string[] }[] }) {
  return (
    <div className="space-y-5">
      {body.map((block, idx) => {
        if (block.type === "h2") return (
          <h2 key={idx} className="text-xl md:text-2xl font-extrabold text-[var(--color-ink)] tracking-tight pt-6 pb-1 border-b border-[var(--color-line)]" style={{ fontFamily: "var(--font-outfit)" }}>
            {block.content as string}
          </h2>
        );
        if (block.type === "h3") return (
          <h3 key={idx} className="text-[17px] font-bold text-[var(--color-ink)] tracking-tight pt-2">
            {block.content as string}
          </h3>
        );
        if (block.type === "p") return (
          <p key={idx} className="text-[15.5px] leading-[1.85] text-[var(--color-ink)] opacity-75 font-medium">
            {block.content as string}
          </p>
        );
        if (block.type === "quote") return (
          <blockquote key={idx} className="my-4 pl-5 border-l-4 border-[var(--color-brand)] bg-[var(--color-brand)]/5 rounded-r-lg py-3 pr-4">
            <p className="text-[15px] leading-relaxed text-[var(--color-ink)] font-semibold italic opacity-80">
              "{block.content as string}"
            </p>
          </blockquote>
        );
        if (block.type === "list") return (
          <ul key={idx} className="space-y-2.5">
            {(block.content as string[]).map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-[var(--color-ink)] opacity-75 font-medium">
                <span className="mt-1 flex-shrink-0 size-4 rounded-full bg-[var(--color-brand)]/15 flex items-center justify-center">
                  <svg className="size-2.5 text-[var(--color-brand)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        );
        if (block.type === "callout") return (
          <div key={idx} className="relative overflow-hidden rounded-[12px] bg-[var(--color-brand)]/8 border border-[var(--color-brand)]/20 p-5 my-2">
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 size-6 rounded-full bg-[var(--color-brand)] flex items-center justify-center mt-0.5">
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>
                </svg>
              </div>
              <p className="text-[14.5px] leading-relaxed text-[var(--color-ink)] font-semibold opacity-85">
                {block.content as string}
              </p>
            </div>
          </div>
        );
        return null;
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocArticlePage() {
  return (
    <>
      <ReadingProgress />
      <Header />
      <main className="min-h-screen bg-[#FAF9F6]">

        {/* Compact Doc Hero — not full-bleed, stays light */}
        <div className="relative pt-10 pb-12 px-5 text-center overflow-hidden bg-[#f0f1f3] border-b border-[var(--color-line)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />

          {/* Breadcrumb Pill — matches site-wide hero pill pattern */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-6 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-white p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15" style={{ animationDuration: "2s" }} />
              <img src={article.categoryIcon} alt="" className="size-3.5 object-contain" />
            </div>
            <a href="/support/documentation" className="text-[14px] font-semibold tracking-tight text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors">
              Documentation
            </a>
            <span className="text-[#D4D4D4] font-bold">/</span>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              {article.category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="relative z-10 text-3xl md:text-5xl font-black tracking-tight text-[var(--color-ink)] max-w-3xl mx-auto leading-tight mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {article.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="relative z-10 text-[15.5px] text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {article.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="relative z-10 flex items-center justify-center gap-4 mt-5 text-[13px] font-semibold text-[var(--color-muted)]"
          >
            <span className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              {article.readTime}
            </span>
            <span className="size-1 rounded-full bg-[#D4D4D4]" />
            <span className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Updated {article.updated}
            </span>
          </motion.div>
        </div>

        {/* 3-column layout */}
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
          <div className="flex gap-10 lg:gap-14 items-start">

            {/* Left: TOC sidebar */}
            <div className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-24">
                <div className="rounded-[12px] border border-[#D4D4D4] bg-white overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-[#D4D4D4] bg-[#f8f8f7]">
                    <div className="size-2 rounded-full bg-[var(--color-brand)]" />
                    <p className="text-[13px] font-bold text-[var(--color-ink)]">On This Page</p>
                  </div>
                  <ul className="p-3 space-y-1">
                    {article.toc.map((item, i) => (
                      <li key={i} className="group flex items-start gap-2.5 py-1.5 cursor-pointer">
                        <span className="mt-[3px] shrink-0 text-[11px] font-black tabular-nums text-[var(--color-brand)]">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-[12.5px] font-semibold text-[var(--color-muted)] group-hover:text-[var(--color-brand)] transition-colors leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Article meta */}
                <div className="mt-4 rounded-[12px] border border-[#D4D4D4] bg-white overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-[#D4D4D4] bg-[#f8f8f7]">
                    <div className="size-2 rounded-full bg-[var(--color-brand)]" />
                    <p className="text-[13px] font-bold text-[var(--color-ink)]">Details</p>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold text-[var(--color-muted)]">Section</p>
                      <p className="text-[12px] font-bold text-[var(--color-ink)]">{article.category}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold text-[var(--color-muted)]">Read Time</p>
                      <p className="text-[12px] font-bold text-[var(--color-ink)]">{article.readTime}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold text-[var(--color-muted)]">Updated</p>
                      <p className="text-[12px] font-bold text-[var(--color-ink)]">{article.updated}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Article content */}
            <div className="flex-1 min-w-0">
              <DocBody body={article.body} />

              {/* Feedback row */}
              <div className="mt-12 pt-8 border-t border-[var(--color-line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[14px] font-bold text-[var(--color-ink)]">Was this article helpful?</p>
                  <p className="text-[13px] text-[var(--color-muted)] font-medium mt-0.5">Let us know so we can keep improving our docs.</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="flex items-center gap-2 rounded-full border border-[#D4D4D4] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] text-[var(--color-muted)] px-4 py-2 text-[13px] font-bold transition-all duration-200">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                    Yes
                  </button>
                  <button className="flex items-center gap-2 rounded-full border border-[#D4D4D4] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] text-[var(--color-muted)] px-4 py-2 text-[13px] font-bold transition-all duration-200">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>
                    No
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Related docs */}
            <div className="hidden xl:block w-52 shrink-0">
              <div className="sticky top-24">
                <div className="rounded-[12px] border border-[#D4D4D4] bg-white overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-[#D4D4D4] bg-[#f8f8f7]">
                    <div className="size-2 rounded-full bg-[var(--color-brand)]" />
                    <p className="text-[13px] font-bold text-[var(--color-ink)]">Related Docs</p>
                  </div>
                  <ul className="p-3 space-y-0">
                    {relatedDocs.map((doc, i) => (
                      <li key={i}>
                        <a
                          href="/support/documentation/article"
                          className="group flex items-start gap-2.5 py-2.5 border-b border-[#f0f0f0] last:border-0 cursor-pointer"
                        >
                          <img src="/icons/empty.svg" alt="" className="size-3.5 mt-0.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                          <div>
                            <p className="text-[12.5px] font-semibold text-[var(--color-muted)] group-hover:text-[var(--color-brand)] transition-colors leading-snug">
                              {doc.title}
                            </p>
                            <p className="text-[11px] text-[#A3A3A3] mt-0.5">{doc.category}</p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Back to docs */}
                <a
                  href="/support/documentation"
                  className="mt-4 flex items-center gap-2 text-[13px] font-bold text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  Back to Docs
                </a>
              </div>
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
