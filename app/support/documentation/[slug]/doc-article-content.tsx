"use client";

import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import {
  getDocArticle,
  type DocBodyBlock,
} from "@/lib/documentation-articles";
import { getRelatedDocArticles } from "@/lib/documentation-data";

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
    <div className="fixed top-0 right-0 left-0 z-50 h-[3px] bg-[#D4D4D4]/40">
      <motion.div
        className="h-full origin-left bg-[var(--color-brand)]"
        style={{ scaleX: progress / 100 }}
        transition={{ ease: "linear", duration: 0.1 }}
      />
    </div>
  );
}

function DocBody({ body, isBn }: { body: DocBodyBlock[]; isBn?: boolean }) {
  return (
    <div className="space-y-5">
      {body.map((block, idx) => {
        if (block.type === "h2")
          return (
            <h2
              key={idx}
              className="border-b border-[var(--color-line)] pt-6 pb-1 text-xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-2xl"
              style={{ fontFamily: isBn ? "var(--font-bn), var(--font-heading), sans-serif" : "var(--font-heading), sans-serif" }}
            >
              {block.content}
            </h2>
          );
        if (block.type === "h3")
          return (
            <h3
              key={idx}
              className="pt-2 text-[17px] font-bold tracking-tight text-[var(--color-ink)]"
            >
              {block.content}
            </h3>
          );
        if (block.type === "p")
          return (
            <p
              key={idx}
              className="text-[15.5px] leading-[1.85] font-medium text-[var(--color-ink)] opacity-75"
            >
              {block.content}
            </p>
          );
        if (block.type === "quote")
          return (
            <blockquote
              key={idx}
              className="my-4 rounded-r-lg border-l-4 border-[var(--color-brand)] bg-[var(--color-brand)]/5 py-3 pr-4 pl-5"
            >
              <p className="text-[15px] leading-relaxed font-semibold text-[var(--color-ink)] italic opacity-80">
                &ldquo;{block.content}&rdquo;
              </p>
            </blockquote>
          );
        if (block.type === "list")
          return (
            <ul key={idx} className="space-y-2.5">
              {block.content.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[15.5px] leading-relaxed font-medium text-[var(--color-ink)] opacity-75"
                >
                  <span className="mt-1 flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/15">
                    <svg
                      className="size-2.5 text-[var(--color-brand)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          );
        if (block.type === "callout")
          return (
            <div
              key={idx}
              className="relative my-2 overflow-hidden rounded-[12px] border border-[var(--color-brand)]/20 bg-[var(--color-brand)]/8 p-5"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]">
                  <svg
                    className="size-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4m0-4h.01" />
                  </svg>
                </div>
                <p className="text-[14.5px] leading-relaxed font-semibold text-[var(--color-ink)] opacity-85">
                  {block.content}
                </p>
              </div>
            </div>
          );
        return null;
      })}
    </div>
  );
}

export default function DocArticlePage({ locale = "en" }: { locale?: "en" | "bn" }) {
  const isBn = locale === "bn";
  const params = useParams() as { slug: string };
  const article = getDocArticle(params.slug, locale);
  const docPrefix = isBn ? "/bn/support/documentation/" : "/support/documentation/";

  if (!article) {
    notFound();
  }

  const relatedDocs = getRelatedDocArticles(article.slug, 4, locale);

  return (
    <>
      <ReadingProgress />
      <Header locale={locale} />
      <main className="min-h-screen bg-[var(--color-canvas)] pb-24">
        {/* Article Header */}
        <div className="relative overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-surface)] py-14 text-center">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black_70%)]" />

          {/* Breadcrumb Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative z-10 mx-auto mb-5 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-canvas)] p-1.5 pr-4 shadow-xs"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <img
                src={article.categoryIcon}
                alt=""
                className="size-3.5 object-contain dark:invert"
              />
            </div>
            <a
              href={docPrefix}
              className="text-[14px] font-semibold tracking-tight text-[var(--color-muted)] transition-colors hover:text-[var(--color-brand)]"
            >
              {isBn ? "ডকুমেন্টেশন" : "Documentation"}
            </a>
            <span className="font-bold text-[#D4D4D4]">/</span>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              {article.category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="relative z-10 mx-auto mb-4 max-w-3xl text-3xl leading-tight font-black tracking-tight text-[var(--color-ink)] md:text-5xl"
            style={{ fontFamily: isBn ? "var(--font-bn), var(--font-heading), sans-serif" : "var(--font-heading), sans-serif" }}
          >
            {article.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="relative z-10 mx-auto max-w-2xl text-[15.5px] leading-relaxed font-medium text-[var(--color-muted)]"
          >
            {article.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="relative z-10 mt-5 flex items-center justify-center gap-4 text-[13px] font-semibold text-[var(--color-muted)]"
          >
            <span className="flex items-center gap-1.5">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {article.readTime}
            </span>
            <span className="size-1 rounded-full bg-[#D4D4D4]" />
            <span className="flex items-center gap-1.5">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              {isBn ? `আপডেট: ${article.updated}` : `Updated ${article.updated}`}
            </span>
          </motion.div>
        </div>

        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
          <div className="flex items-start gap-10 lg:gap-14">
            {/* Left Sidebar - Table of Contents */}
            <div className="hidden w-56 shrink-0 lg:block">
              <div className="sticky top-24">
                <div className="overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-[var(--color-surface)]">
                  <div className="flex items-center gap-2 border-b border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3">
                    <div className="size-2 rounded-full bg-[var(--color-brand)]" />
                    <p className="text-[13px] font-bold text-[var(--color-ink)]">
                      {isBn ? "সূচিপত্র" : "On This Page"}
                    </p>
                  </div>
                  <ul className="space-y-1 p-3">
                    {article.toc.map((item, i) => (
                      <li
                        key={i}
                        className="group flex cursor-pointer items-baseline gap-2.5 py-1.5"
                      >
                        <span className="shrink-0 text-[11px] font-black tabular-nums text-[var(--color-brand)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[12.5px] leading-snug font-semibold text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-brand)]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-[var(--color-surface)]">
                  <div className="flex items-center gap-2 border-b border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3">
                    <div className="size-2 rounded-full bg-[var(--color-brand)]" />
                    <p className="text-[13px] font-bold text-[var(--color-ink)]">
                      {isBn ? "তথ্য" : "Details"}
                    </p>
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[12px] font-semibold text-[var(--color-muted)] shrink-0">
                        {isBn ? "সেকশন" : "Section"}
                      </p>
                      <p className="text-[12px] font-bold text-[var(--color-ink)] text-right truncate">
                        {article.category}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[12px] font-semibold text-[var(--color-muted)] shrink-0">
                        {isBn ? "পড়ার সময়" : "Read Time"}
                      </p>
                      <p className="text-[12px] font-bold text-[var(--color-ink)] text-right">
                        {article.readTime}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[12px] font-semibold text-[var(--color-muted)] shrink-0">
                        {isBn ? "সর্বশেষ আপডেট" : "Updated"}
                      </p>
                      <p className="text-[12px] font-bold text-[var(--color-ink)] text-right">
                        {article.updated}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Body */}
            <div className="min-w-0 flex-1">
              <DocBody body={article.body} isBn={isBn} />

              <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-line)] pt-8 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[14px] font-bold text-[var(--color-ink)]">
                    {isBn ? "গাইডটি কি আপনার কাজে এসেছে?" : "Was this article helpful?"}
                  </p>
                  <p className="mt-0.5 text-[13px] font-medium text-[var(--color-muted)]">
                    {isBn
                      ? "আপনার মতামত আমাদের ডকুমেন্টেশন আরও সমৃদ্ধ করতে সাহায্য করে।"
                      : "Let us know so we can keep improving our docs."}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2 text-[13px] font-bold text-[var(--color-muted)] transition-all duration-200 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                  >
                    {isBn ? "হ্যাঁ" : "Yes"}
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2 text-[13px] font-bold text-[var(--color-muted)] transition-all duration-200 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                  >
                    {isBn ? "না" : "No"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Related Articles */}
            <div className="hidden w-52 shrink-0 xl:block">
              <div className="sticky top-24">
                <div className="overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-[var(--color-surface)]">
                  <div className="flex items-center gap-2 border-b border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3">
                    <div className="size-2 rounded-full bg-[var(--color-brand)]" />
                    <p className="text-[13px] font-bold text-[var(--color-ink)]">
                      {isBn ? "সম্পর্কিত গাইড" : "Related Docs"}
                    </p>
                  </div>
                  <ul className="space-y-0 p-3">
                    {relatedDocs.map((doc) => (
                      <li key={doc.slug}>
                        <a
                          href={`${docPrefix}${doc.slug}`}
                          className="group flex cursor-pointer items-start gap-2.5 border-b border-[var(--color-line)] py-2.5 last:border-0"
                        >
                          <img
                            src="/icons/empty.svg"
                            alt=""
                            className="mt-0.5 size-3.5 shrink-0 opacity-40 transition-opacity group-hover:opacity-100 dark:invert"
                          />
                          <div>
                            <p className="text-[12.5px] leading-snug font-semibold text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-brand)]">
                              {doc.title}
                            </p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <a
                    href={docPrefix}
                    className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--color-muted)] transition-colors hover:text-[var(--color-brand)]"
                  >
                    <span>&larr;</span> {isBn ? "ডকুমেন্টেশনে ফিরে যান" : "Back to Docs"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
