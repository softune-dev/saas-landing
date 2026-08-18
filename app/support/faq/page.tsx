"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";

const faqData = [
  {
    category: "General",
    q: "What is Softune?",
    a: "Softune is an all-in-one ecommerce SaaS platform for small businesses and startups. Create professional online stores, manage products and orders, process payments, and grow your business—all from one intuitive dashboard."
  },
  {
    category: "General",
    q: "Do I need coding skills to use Softune?",
    a: "No. Softune is built for non-technical users. Launch stores, add products, manage orders, and customize your storefront using our drag-and-drop interface—no coding or technical expertise required."
  },
  {
    category: "General",
    q: "Can I manage multiple stores from one dashboard?",
    a: "Yes. Softune's multi-store management lets you handle unlimited stores from a single dashboard, making it easy to scale your business and manage inventory, orders, and customers across all stores."
  },
  {
    category: "Integrations",
    q: "What payment methods does Softune support?",
    a: "Softune supports Cash on Delivery (COD) by default. Additional payment gateways can be integrated based on your plan to expand your payment options."
  },
  {
    category: "General",
    q: "How long does it take to launch my store?",
    a: "Minutes. With our AI-powered store setup and pre-built themes, you can have your online store live and accepting orders in just minutes, not weeks."
  },
  {
    category: "Security",
    q: "Is my customer data secure?",
    a: "Yes. Softune uses enterprise-grade security with real-time fraud detection, secure payment processing, and automatic backups to protect your business and customer data."
  },
  {
    category: "Themes",
    q: "Can I customize my store's design?",
    a: "Absolutely. Choose from professional themes or use our AI-powered theme editor to customize colors, layouts, fonts, and branding without touching any code."
  },
  {
    category: "Integrations",
    q: "What courier services are integrated with Softune?",
    a: "Softune integrates with major Bangladeshi courier services. Orders sync automatically, shipment tracking is real-time, and customers receive automatic shipping updates."
  },
  {
    category: "Billing",
    q: "Can I upgrade or downgrade my plan anytime?",
    a: "Yes. You can upgrade to a higher plan or downgrade anytime. Changes take effect immediately, and your billing is pro-rated based on usage."
  },
  {
    category: "General",
    q: "How does Softune's AI help my business?",
    a: "Softune's AI assists with store setup and optimization, provides actionable analytics and insights on your performance, helps refine your theme design, and improves your store's SEO automatically."
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categories = ["All", "General", "Billing", "Themes", "Integrations", "Security"];

  const filteredFaqs = faqData.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch = faq.q.toLowerCase().includes(search.toLowerCase()) || 
                          faq.a.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const half = Math.ceil(filteredFaqs.length / 2);
  const leftColumn = filteredFaqs.slice(0, half);
  const rightColumn = filteredFaqs.slice(half);

  const renderFaqCard = (faq: typeof faqData[0], idx: number) => {
    const isOpen = openFaq === idx;
    return (
      <motion.div
        key={faq.q}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`group rounded-[20px] border transition-all duration-300 bg-white ${
          isOpen 
            ? "border-[var(--color-brand)]" 
            : "border-[#D4D4D4] hover:border-[#A3A3A3]"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpenFaq(isOpen ? null : idx)}
          className="flex w-full items-center justify-between gap-4 p-5 md:px-6 md:py-5 text-left"
        >
          <span className={`text-[16px] md:text-[18px] font-semibold tracking-tight transition-colors ${
            isOpen ? "text-[var(--color-brand)]" : "text-[var(--color-ink)]"
          }`}>
            {faq.q}
          </span>
          
          <div className={`flex size-8 md:size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
            isOpen 
              ? "bg-[var(--color-brand)] text-white" 
              : "bg-[#F5F5F5] text-[var(--color-muted)] group-hover:bg-[var(--color-brand)]/10 group-hover:text-[var(--color-brand)]"
          }`}>
            <svg 
              className={`size-4 md:size-5 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="px-5 md:px-6 pb-5 md:pb-6 pt-0 text-[15px] md:text-[16px] leading-relaxed text-[var(--color-ink-soft)] font-medium max-w-2xl">
                {faq.a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF9F6]">
        
        {/* Hero Section (Changelog Inspired) */}
        <div className="relative pt-16 pb-20 px-5 text-center overflow-hidden bg-[#f0f1f3] rounded-b-[4rem] border-b-[6px] border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
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
              <img src="/icons/help-desk.svg" alt="FAQ" className="size-3.5 object-contain" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Help Center
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Frequently Asked
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Questions</em>
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Find quick answers to common questions about setting up your store, managing billing, shipping configuration, and custom integrations.
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
                placeholder="Search FAQs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-0 outline-none px-3 py-2 text-[15px] font-medium text-[var(--color-ink)] placeholder-[#A3A3A3]"
              />
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <section className="py-14 max-w-6xl mx-auto px-5 md:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenFaq(0);
                }}
                className={`px-5 py-2.5 rounded-full text-[14px] font-bold tracking-tight transition-all duration-300 border border-transparent ${
                  activeCategory === cat
                    ? "bg-[var(--color-brand)] text-white"
                    : "bg-[#E8E8E8]/60 text-[var(--color-muted)] hover:bg-[#E8E8E8]/90 hover:text-[var(--color-ink)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion Questions - 2 Columns */}
          {filteredFaqs.length > 0 ? (
            <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
              {/* Left Column */}
              <div className="flex flex-col gap-4 md:gap-6">
                {leftColumn.map((faq, idx) => renderFaqCard(faq, idx))}
              </div>
              
              {/* Right Column */}
              <div className="flex flex-col gap-4 md:gap-6">
                {rightColumn.map((faq, idx) => renderFaqCard(faq, idx + half))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-[#D4D4D4] p-8 max-w-lg mx-auto">
              <p className="text-[16px] text-[var(--color-muted)] font-medium">
                No FAQs found matching your criteria.
              </p>
            </div>
          )}
        </section>

      </main>
      <Footer />
    </>
  );
}
