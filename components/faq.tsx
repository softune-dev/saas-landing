"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { homeFaqs as faqs } from "@/lib/home-faq-data";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  const half = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, half);
  const rightColumn = faqs.slice(half);

  const renderFaqCard = (item: { q: string, a: string }, index: number) => {
    const isOpen = open === index;
    return (
      <motion.div 
        key={item.q}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className={`group rounded-[20px] border transition-all duration-300 ${
          isOpen 
            ? "border-[var(--color-brand)] bg-[var(--color-surface)]" 
            : "border-[var(--color-line)] bg-[var(--color-surface)] hover:border-[var(--color-brand)]"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(isOpen ? null : index)}
          aria-expanded={isOpen}
          className="flex min-h-14 w-full items-center justify-between gap-3 p-4 text-left sm:gap-4 sm:p-5 md:px-6 md:py-5"
        >
          <span className={`text-[16px] md:text-[18px] font-semibold tracking-tight transition-colors ${
            isOpen ? "text-[var(--color-brand)]" : "text-[var(--color-ink)]"
          }`}>
            {item.q}
          </span>
          
          <div className={`flex size-8 md:size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
            isOpen 
              ? "bg-[var(--color-brand)] text-white" 
              : "bg-[var(--color-canvas)] text-[var(--color-muted)] group-hover:bg-[var(--color-brand)]/10 group-hover:text-[var(--color-brand)]"
          }`}>
            <svg 
              className={`size-4 md:size-5 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </button>
        {/* Answers stay in the HTML even when collapsed so crawlers that
         * skip JS still read the FAQ. AnimatePresence unmounted them. */}
        <div
          className={[
            "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          ].join(" ")}
        >
          <div className="overflow-hidden">
            <p className="px-5 md:px-6 pb-5 md:pb-6 pt-0 text-[15px] md:text-[16px] leading-relaxed text-[var(--color-ink-soft)] font-medium max-w-2xl">
              {item.a}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="faq"
      className="w-full border-b border-[var(--color-line)] bg-[var(--color-canvas)] py-14 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <div className="mx-auto mb-8 flex flex-col items-center text-center md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:mb-6 md:gap-3 md:p-1.5 md:pr-4"
          >
            <div className="relative flex size-5 items-center justify-center rounded-full bg-[var(--color-brand)]/10 md:size-6">
              <span
                className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                style={{ animationDuration: "2s" }}
              />
              <img
            loading="lazy"
            decoding="async"
                src="/icons/help-desk.svg"
                alt=""
                className="relative z-10 size-3 object-contain md:size-3.5 dark:invert"
              />
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
              FAQ
            </span>
          </motion.div>

          <h2 className="max-w-3xl text-3xl leading-[1.2] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.15] md:text-5xl">
            Frequently Asked{" "}
            <span className="relative ml-0.5 inline-block px-2.5 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
              <span className="absolute inset-0 -rotate-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Questions</em>
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] sm:mt-6 sm:text-[17px] md:text-[18px]">
            Everything you need to know about building with Softunebd.
          </p>
        </div>

        <div className="mx-auto grid w-full grid-cols-1 items-start gap-3 sm:gap-4 md:grid-cols-2 md:gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-4 md:gap-6">
            {leftColumn.map((item, i) => renderFaqCard(item, i))}
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col gap-4 md:gap-6">
            {rightColumn.map((item, i) => renderFaqCard(item, i + half))}
          </div>
        </div>

      </div>
    </section>
  );
}
