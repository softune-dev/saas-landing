"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What is Softune?",
    a: "Softune is an all-in-one ecommerce SaaS platform for small businesses and startups. Create professional online stores, manage products and orders, process payments, and grow your business—all from one intuitive dashboard.",
  },
  {
    q: "Do I need coding skills to use Softune?",
    a: "No. Softune is built for non-technical users. Launch stores, add products, manage orders, and customize your storefront using our drag-and-drop interface—no coding or technical expertise required.",
  },
  {
    q: "Can I manage multiple stores from one dashboard?",
    a: "Yes. Softune's multi-store management lets you handle unlimited stores from a single dashboard, making it easy to scale your business and manage inventory, orders, and customers across all stores.",
  },
  {
    q: "What payment methods does Softune support?",
    a: "Softune supports Cash on Delivery (COD) by default. Additional payment gateways can be integrated based on your plan to expand your payment options.",
  },
  {
    q: "How long does it take to launch my store?",
    a: "Minutes. With our AI-powered store setup and pre-built themes, you can have your online store live and accepting orders in just minutes, not weeks.",
  },
  {
    q: "Is my customer data secure?",
    a: "Yes. Softune uses enterprise-grade security with real-time fraud detection, secure payment processing, and automatic backups to protect your business and customer data.",
  },
  {
    q: "Can I customize my store's design?",
    a: "Absolutely. Choose from professional themes or use our AI-powered theme editor to customize colors, layouts, fonts, and branding without touching any code.",
  },
  {
    q: "What courier services are integrated with Softune?",
    a: "Softune integrates with major Bangladeshi courier services. Orders sync automatically, shipment tracking is real-time, and customers receive automatic shipping updates.",
  },
  {
    q: "Can I upgrade or downgrade my plan anytime?",
    a: "Yes. You can upgrade to a higher plan or downgrade anytime. Changes take effect immediately, and your billing is pro-rated based on usage.",
  },
  {
    q: "How does Softune's AI help my business?",
    a: "Softune's AI assists with store setup and optimization, provides actionable analytics and insights on your performance, helps refine your theme design, and improves your store's SEO automatically.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

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
            ? "border-[var(--color-brand)] bg-white" 
            : "border-[#D4D4D4] bg-white hover:border-[#A3A3A3]"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(isOpen ? null : index)}
          className="flex w-full items-center justify-between gap-4 p-5 md:px-6 md:py-5 text-left"
        >
          <span className={`text-[16px] md:text-[18px] font-semibold tracking-tight transition-colors ${
            isOpen ? "text-[var(--color-brand)]" : "text-[var(--color-ink)]"
          }`}>
            {item.q}
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
          {isOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="px-5 md:px-6 pb-5 md:pb-6 pt-0 text-[15px] md:text-[16px] leading-relaxed text-[var(--color-ink-soft)] font-medium max-w-2xl">
                {item.a}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section id="faq" className="w-full bg-[#FAF9F6] py-24 border-b border-[var(--color-line)]">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mx-auto mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-6 inline-flex items-center gap-2 md:gap-3 rounded-full border border-[var(--color-line)] bg-white p-1 md:p-1.5 pr-3 md:pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-5 md:size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span
                className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                style={{ animationDuration: "2s" }}
              />
              <img src="/icons/help-desk.svg" alt="" className="size-3 md:size-3.5 object-contain relative z-10" />
            </div>
            <span className="text-[13px] md:text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              FAQ
            </span>
          </motion.div>

          <h2 className="max-w-3xl font-extrabold tracking-tight text-4xl leading-[1.15] text-[var(--color-ink)] sm:text-5xl md:text-5xl">
            Frequently Asked{" "}
            <span className="relative inline-block whitespace-nowrap px-4 py-0.5 ml-1">
              <span className="absolute inset-0 -rotate-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Questions</em>
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--color-muted)] font-medium md:text-[18px]">
            Everything you need to know about building with Softune.
          </p>
        </div>

        {/* 2-Column FAQ Layout */}
        <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
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
