"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { faqData, faqDataBn } from "@/lib/faq-data";

export default function FAQPage({ locale = "en" }: { locale?: "en" | "bn" }) {
  const isBn = locale === "bn";
  const faqsList = isBn ? faqDataBn : faqData;

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categories = ["All", "General", "Billing", "Themes", "Integrations", "Security"];

  const categoryLabels: Record<string, string> = {
    All: isBn ? "সকল প্রশ্ন" : "All",
    General: isBn ? "সাধারণ" : "General",
    Billing: isBn ? "বিলিং ও ট্রায়াল" : "Billing",
    Themes: isBn ? "থিম ও ডিজাইন" : "Themes",
    Integrations: isBn ? "পেমেন্ট ও কুরিয়ার" : "Integrations",
    Security: isBn ? "সিকিউরিটি" : "Security",
  };

  const filteredFaqs = faqsList.filter((faq) => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const half = Math.ceil(filteredFaqs.length / 2);
  const leftColumn = filteredFaqs.slice(0, half);
  const rightColumn = filteredFaqs.slice(half);

  const renderFaqCard = (faq: (typeof faqsList)[0], idx: number) => {
    const isOpen = openFaq === idx;
    return (
      <motion.div
        key={faq.q}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)] overflow-hidden transition-all duration-200 ${
          isOpen ? "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] border-[var(--color-brand)]/40" : "hover:border-[var(--color-line)]/80"
        }`}
      >
        <button
          onClick={() => setOpenFaq(isOpen ? null : idx)}
          className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-bold text-[16px] md:text-[17px] text-[var(--color-ink)]"
        >
          <span>{faq.q}</span>
          <div
            className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
              isOpen ? "bg-[var(--color-brand)] text-white rotate-45" : "bg-[var(--color-line)]/60 text-[var(--color-muted)]"
            }`}
          >
            <span className="text-lg leading-none">+</span>
          </div>
        </button>
        <div
          className={[
            "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          ].join(" ")}
        >
          <div className="overflow-hidden">
            <p className="px-5 md:px-6 pb-5 md:pb-6 pt-0 text-[15px] md:text-[16px] leading-relaxed text-[var(--color-ink-soft)] font-medium max-w-2xl">
              {faq.a}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        {/* Hero Section */}
        <div className="relative pt-16 pb-20 px-5 text-center overflow-hidden bg-[var(--color-canvas)] rounded-b-[4rem] border-b-[6px] border-[var(--color-surface)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

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
              <img src="/icons/help-desk.svg" alt="FAQ" className="size-3.5 object-contain dark:invert" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              {isBn ? "হেল্প সেন্টার" : "Help Center"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: isBn ? "var(--font-bn), var(--font-heading), sans-serif" : "var(--font-heading), sans-serif" }}
          >
            {isBn ? (
              <>
                সাধারণত জিজ্ঞাসিত{" "}
                <span className="relative inline-block px-3 py-1 mx-1">
                  <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
                  <em className="relative not-italic text-white">প্রশ্নাবলী</em>
                </span>
              </>
            ) : (
              <>
                Frequently Asked
                <span className="relative inline-block px-3 py-1 mx-1">
                  <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
                  <em className="relative not-italic text-white">Questions</em>
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed mb-8"
          >
            {isBn
              ? "স্টোর সেটআপ, বিলিং, শিপিং এবং পেমেন্ট সংক্রান্ত আপনার প্রশ্নগুলোর দ্রুত উত্তর পান।"
              : "Find quick answers to common questions about setting up your store, managing billing, shipping configuration, and custom integrations."}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="relative z-10 max-w-lg mx-auto"
          >
            <div className="relative flex items-center bg-[var(--color-surface)] rounded-full border border-[var(--color-line)] shadow-sm hover:border-[var(--color-brand)] focus-within:border-[var(--color-brand)] focus-within:ring-2 focus-within:ring-[var(--color-brand)]/15 transition-all p-1">
              <Search className="size-5 ml-4 text-[var(--color-muted)]" />
              <input
                type="text"
                placeholder={isBn ? "প্রশ্ন খুঁজুন..." : "Search FAQs..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-0 outline-none px-3 py-2 text-[15px] font-medium text-[var(--color-ink)] placeholder-[var(--color-muted-soft)]"
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
                    : "bg-[var(--color-line)] text-[var(--color-muted)] hover:bg-[var(--color-line)]/80 hover:text-[var(--color-ink)]"
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
              <div className="flex flex-col gap-4 md:gap-6">
                {leftColumn.map((faq, idx) => renderFaqCard(faq, idx))}
              </div>
              <div className="flex flex-col gap-4 md:gap-6">
                {rightColumn.map((faq, idx) => renderFaqCard(faq, idx + half))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[17px] font-bold text-[var(--color-ink)] mb-1">
                {isBn ? "কোনো উত্তর পাওয়া যায়নি" : "No matching questions found"}
              </p>
              <p className="text-[14px] text-[var(--color-muted)]">
                {isBn ? "অন্য কোনো শব্দ দিয়ে আবার চেষ্টা করুন।" : "Try searching for a different keyword or category."}
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
