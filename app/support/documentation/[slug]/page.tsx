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

function DocBody({ body }: { body: DocBodyBlock[] }) {
  return (
    <div className="space-y-5">
      {body.map((block, idx) => {
        if (block.type === "h2")
          return (
            <h2
              key={idx}
              className="border-b border-[var(--color-line)] pt-6 pb-1 text-xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-2xl"
              style={{ fontFamily: "var(--font-outfit)" }}
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

export default function DocArticlePage() {
  const params = useParams() as { slug: string };
  const article = getDocArticle(params.slug);

  if (!article) {
    notFound();
  }

  const relatedDocs = getRelatedDocArticles(article.slug);

  return (
    <>
      <ReadingProgress />
      <Header />
      <main className="min-h-screen bg-[#FAF9F6]">
        <div className="relative overflow-hidden border-b border-[var(--color-line)] bg-[#f0f1f3] px-5 pt-10 pb-12 text-center">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-6 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-white p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span
                className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                style={{ animationDuration: "2s" }}
              />
              <img
                src={article.categoryIcon}
                alt=""
                className="size-3.5 object-contain"
              />
            </div>
            <a
              href="/support/documentation"
              className="text-[14px] font-semibold tracking-tight text-[var(--color-muted)] transition-colors hover:text-[var(--color-brand)]"
            >
              Documentation
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
            style={{ fontFamily: "var(--font-outfit)" }}
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
              Updated {article.updated}
            </span>
          </motion.div>
        </div>

        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
          <div className="flex items-start gap-10 lg:gap-14">
            <div className="hidden w-56 shrink-0 lg:block">
              <div className="sticky top-24">
                <div className="overflow-hidden rounded-[12px] border border-[#D4D4D4] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#D4D4D4] bg-[#f8f8f7] px-4 py-3">
                    <div className="size-2 rounded-full bg-[var(--color-brand)]" />
                    <p className="text-[13px] font-bold text-[var(--color-ink)]">
                      On This Page
                    </p>
                  </div>
                  <ul className="space-y-1 p-3">
                    {article.toc.map((item, i) => (
                      <li
                        key={i}
                        className="group flex cursor-pointer items-start gap-2.5 py-1.5"
                      >
                        <span className="mt-[3px] shrink-0 text-[11px] font-black tabular-nums text-[var(--color-brand)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[12.5px] leading-snug font-semibold text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-brand)]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 overflow-hidden rounded-[12px] border border-[#D4D4D4] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#D4D4D4] bg-[#f8f8f7] px-4 py-3">
                    <div className="size-2 rounded-full bg-[var(--color-brand)]" />
                    <p className="text-[13px] font-bold text-[var(--color-ink)]">
                      Details
                    </p>
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold text-[var(--color-muted)]">
                        Section
                      </p>
                      <p className="text-[12px] font-bold text-[var(--color-ink)]">
                        {article.category}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold text-[var(--color-muted)]">
                        Read Time
                      </p>
                      <p className="text-[12px] font-bold text-[var(--color-ink)]">
                        {article.readTime}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold text-[var(--color-muted)]">
                        Updated
                      </p>
                      <p className="text-[12px] font-bold text-[var(--color-ink)]">
                        {article.updated}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <DocBody body={article.body} />

              <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-line)] pt-8 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[14px] font-bold text-[var(--color-ink)]">
                    Was this article helpful?
                  </p>
                  <p className="mt-0.5 text-[13px] font-medium text-[var(--color-muted)]">
                    Let us know so we can keep improving our docs.
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full border border-[#D4D4D4] px-4 py-2 text-[13px] font-bold text-[var(--color-muted)] transition-all duration-200 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full border border-[#D4D4D4] px-4 py-2 text-[13px] font-bold text-[var(--color-muted)] transition-all duration-200 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden w-52 shrink-0 xl:block">
              <div className="sticky top-24">
                <div className="overflow-hidden rounded-[12px] border border-[#D4D4D4] bg-white">
                  <div className="flex items-center gap-2 border-b border-[#D4D4D4] bg-[#f8f8f7] px-4 py-3">
                    <div className="size-2 rounded-full bg-[var(--color-brand)]" />
                    <p className="text-[13px] font-bold text-[var(--color-ink)]">
                      Related Docs
                    </p>
                  </div>
                  <ul className="space-y-0 p-3">
                    {relatedDocs.map((doc) => (
                      <li key={doc.slug}>
                        <a
                          href={`/support/documentation/${doc.slug}`}
                          className="group flex cursor-pointer items-start gap-2.5 border-b border-[#f0f0f0] py-2.5 last:border-0"
                        >
                          <img
                            src="/icons/empty.svg"
                            alt=""
                            className="mt-0.5 size-3.5 shrink-0 opacity-40 transition-opacity group-hover:opacity-100"
                          />
                          <div>
                            <p className="text-[12.5px] leading-snug font-semibold text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-brand)]">
                              {doc.title}
                            </p>
                            <p className="mt-0.5 text-[11px] text-[#A3A3A3]">
                              {doc.category}
                            </p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="/support/documentation"
                  className="mt-4 flex items-center gap-2 text-[13px] font-bold text-[var(--color-muted)] transition-colors hover:text-[var(--color-brand)]"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
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
