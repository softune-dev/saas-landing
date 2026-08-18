"use client";

import React, { useState, useEffect, use } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

import { ARTICLES, RELATED_POSTS, DEFAULT_ARTICLE_SLUG } from "@/lib/blog-data";



function ShareDrawer({ title, open, onClose }: { title: string; open: boolean; onClose: () => void }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shares = [
    {
      label: "Twitter / X",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/>
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "LinkedIn",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
        </svg>
      ),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "Facebook",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      label: "WhatsApp",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      ),
      href: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
    },
  ];

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden" onClick={onClose} />

      {/* Mobile Bottom Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[28px] px-6 pt-4 pb-10 md:hidden border-t border-[var(--color-line)]"
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-[#D4D4D4] mx-auto mb-6" />
        <p className="text-[17px] font-extrabold text-[var(--color-ink)] mb-5">Share This Article</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {shares.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-[#D4D4D4] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] text-[var(--color-ink)] px-4 py-3.5 transition-all duration-200 font-semibold text-[14px]"
            >
              {s.icon}
              {s.label}
            </a>
          ))}
        </div>
        <button
          onClick={copyLink}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border border-[#D4D4D4] hover:border-[var(--color-brand)] text-[var(--color-ink)] hover:text-[var(--color-brand)] px-4 py-3.5 transition-all duration-200 font-semibold text-[14px]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
          {copied ? "Link Copied!" : "Copy Link"}
        </button>
      </motion.div>

      {/* Desktop Popover (inline, not modal) */}
    </>
  );
}

// ─── Desktop Floating Share Sidebar ──────────────────────────────────────────

function FloatingShare({ title }: { title: string }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="hidden md:flex flex-col gap-3 sticky top-28">
      <p className="text-[11px] font-black uppercase tracking-widest text-[var(--color-muted)] mb-1">Share</p>

      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center size-10 rounded-full border border-[#D4D4D4] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] text-[var(--color-muted)] transition-all duration-200"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/>
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center size-10 rounded-full border border-[#D4D4D4] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] text-[var(--color-muted)] transition-all duration-200"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
        </svg>
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
        target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center size-10 rounded-full border border-[#D4D4D4] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] text-[var(--color-muted)] transition-all duration-200"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
        </svg>
      </a>

      {/* Copy */}
      <button
        onClick={copyLink}
        className={`flex items-center justify-center size-10 rounded-full border transition-all duration-200 ${copied ? "border-[var(--color-brand)] text-[var(--color-brand)]" : "border-[#D4D4D4] text-[var(--color-muted)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"}`}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
      </button>

      {/* Divider */}
      <div className="w-px h-8 bg-[#D4D4D4] mx-auto mt-1" />
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
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

// ─── Body Renderer ────────────────────────────────────────────────────────────

function ArticleBody({ body }: { body: { type: string; content: string | string[] }[] }) {
  return (
    <div className="space-y-6">
      {body.map((block, idx) => {
        if (block.type === "h2") return (
          <h2 key={idx} className="text-2xl md:text-3xl font-extrabold text-[var(--color-ink)] tracking-tight pt-4" style={{ fontFamily: "var(--font-outfit)" }}>
            {block.content as string}
          </h2>
        );
        if (block.type === "h3") return (
          <h3 key={idx} className="text-xl md:text-2xl font-bold text-[var(--color-ink)] tracking-tight pt-2">
            {block.content as string}
          </h3>
        );
        if (block.type === "p") return (
          <p key={idx} className="text-[16px] md:text-[17px] leading-[1.85] text-[var(--color-ink)] opacity-80 font-medium">
            {block.content as string}
          </p>
        );
        if (block.type === "quote") return (
          <blockquote key={idx} className="relative my-8 pl-6 border-l-4 border-[var(--color-brand)]">
            <p className="text-[17px] md:text-[18px] leading-relaxed text-[var(--color-ink)] font-semibold italic opacity-90">
              "{block.content as string}"
            </p>
          </blockquote>
        );
        if (block.type === "list") return (
          <ul key={idx} className="space-y-3">
            {(block.content as string[]).map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[16px] md:text-[17px] leading-relaxed text-[var(--color-ink)] opacity-80 font-medium">
                <span className="mt-1 flex-shrink-0 size-5 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        );
        if (block.type === "callout") return (
          <div key={idx} className="relative overflow-hidden rounded-[20px] bg-[var(--color-brand)]/8 border border-[var(--color-brand)]/20 p-6 my-8">
            <div className="pointer-events-none absolute top-0 right-0 w-1/2 h-full bg-dot-grid-dense [mask-image:radial-gradient(ellipse_at_top_right,black_0%,transparent_70%)] opacity-40" />
            <div className="flex gap-4 items-start relative z-10">
              <div className="flex-shrink-0 size-8 rounded-full bg-[var(--color-brand)] flex items-center justify-center mt-0.5">
                <svg className="size-4 brightness-0 invert" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>
                </svg>
              </div>
              <p className="text-[15px] leading-relaxed text-[var(--color-ink)] font-semibold opacity-90">
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

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const article = ARTICLES[resolvedParams.slug] || ARTICLES[DEFAULT_ARTICLE_SLUG];
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <>
      <ReadingProgress />
      <Header />
      <main className="min-h-screen bg-[#FAF9F6]">

        {/* Hero — Full-bleed Image + Overlay */}
        <div className="relative w-full overflow-hidden" style={{ height: "clamp(340px, 55vw, 620px)" }}>
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Category breadcrumb top-left */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-6 left-6 flex items-center gap-2"
          >
            <a href="/blog" className="text-white/70 text-[13px] font-semibold hover:text-white transition-colors">Blog</a>
            <span className="text-white/40">/</span>
            <span className="text-white/90 text-[13px] font-semibold">{article.category}</span>
          </motion.div>

          {/* Bottom Title area */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 md:px-10 md:pb-12">
            <div className="max-w-4xl mx-auto">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-brand)] text-white text-[12px] font-black px-3.5 py-1 uppercase tracking-wider mb-4"
              >
                {article.category}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {article.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.18 }}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/70 text-[13px] font-semibold"
              >
                <span>{article.date}</span>
                <span className="size-1 rounded-full bg-white/40" />
                <span>{article.readTime}</span>
                <span className="size-1 rounded-full bg-white/40" />
                <span>{article.author}</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16">
          <div className="flex gap-10 lg:gap-16 items-start">

            {/* Left: Floating Share Sidebar */}
            <div className="hidden md:block w-12 shrink-0">
              <FloatingShare title={article.title} />
            </div>

            {/* Center: Article Content */}
            <div className="flex-1 min-w-0">

              {/* Description Lead */}
              <p className="text-[18px] md:text-[20px] leading-relaxed text-[var(--color-ink)] font-semibold mb-10 pb-10 border-b border-[var(--color-line)]">
                {article.desc}
              </p>

              {/* Body */}
              <ArticleBody body={article.body} />



              {/* Mobile Share Button */}
              <div className="mt-10 flex md:hidden items-center justify-between p-5 rounded-[20px] bg-white border border-[#D4D4D4]">
                <div>
                  <p className="text-[15px] font-extrabold text-[var(--color-ink)]">Enjoyed this article?</p>
                  <p className="text-[13px] text-[var(--color-muted)] font-medium mt-0.5">Share it with your network</p>
                </div>
                <button
                  onClick={() => setShareOpen(true)}
                  className="flex items-center gap-2 rounded-full bg-[var(--color-brand)] text-white px-5 py-2.5 text-[14px] font-bold transition-all hover:opacity-90"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/>
                  </svg>
                  Share
                </button>
              </div>
            </div>

            {/* Right: Table of Contents / Sidebar */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28 space-y-4">
                {/* TOC */}
                <div className="rounded-[12px] border border-[#D4D4D4] bg-white overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-[#D4D4D4] bg-[#f8f8f7]">
                    <div className="size-2 rounded-full bg-[var(--color-brand)]" />
                    <p className="text-[13px] font-bold text-[var(--color-ink)]">In This Article</p>
                  </div>
                  <ul className="p-4 space-y-1">
                    {article.body.filter(b => b.type === "h2" || b.type === "h3").map((b, i) => (
                      <li key={i} className="group flex items-start gap-2.5 py-1.5 cursor-pointer">
                        <span className="mt-[3px] shrink-0 text-[11px] font-black tabular-nums text-[var(--color-brand)]">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-[13px] font-semibold text-[var(--color-muted)] group-hover:text-[var(--color-brand)] transition-colors leading-snug">
                          {b.content as string}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meta info */}
                <div className="rounded-[12px] border border-[#D4D4D4] bg-white overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-[#D4D4D4] bg-[#f8f8f7]">
                    <div className="size-2 rounded-full bg-[var(--color-brand)]" />
                    <p className="text-[13px] font-bold text-[var(--color-ink)]">Article Details</p>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold text-[var(--color-muted)]">Published</p>
                      <p className="text-[12px] font-bold text-[var(--color-ink)]">{article.date}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold text-[var(--color-muted)]">Read Time</p>
                      <p className="text-[12px] font-bold text-[var(--color-ink)]">{article.readTime}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold text-[var(--color-muted)]">Category</p>
                      <span className="inline-flex items-center rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-[11px] font-bold px-2.5 py-0.5">
                        {article.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <section className="py-20 border-t border-[var(--color-line)] max-w-6xl mx-auto px-5 md:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-ink)] mb-10" style={{ fontFamily: "var(--font-outfit)" }}>
            Related Articles
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {RELATED_POSTS.map((post, idx) => (
              <motion.a
                key={idx}
                href={`/blog/${post.slug}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="relative overflow-hidden rounded-[20px] border border-[#D4D4D4] hover:border-[var(--color-brand)] bg-white transition-all duration-300 group flex flex-col cursor-pointer"
              >
                <div className="pointer-events-none absolute bottom-0 right-0 w-2/3 h-1/2 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_bottom_right,black_0%,transparent_80%)] opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-[#D4D4D4]/60 shrink-0 z-10">
                  <img src={post.image} alt={post.title} className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative z-10 p-5 flex flex-col flex-1">
                  <span className="text-[11px] font-bold text-[var(--color-brand)]">{post.category}</span>
                  <h4 className="mt-2 text-[15px] font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors leading-snug flex-1">
                    {post.title}
                  </h4>
                  <div className="mt-4 pt-3 border-t border-[var(--color-line)] flex items-center justify-between text-[12px] font-bold text-[var(--color-muted)]">
                    <span>{post.date}</span>
                    <span>{post.readTime} read</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

      </main>

      {/* Mobile Share Drawer */}
      <ShareDrawer title={article.title} open={shareOpen} onClose={() => setShareOpen(false)} />

      <Footer />
    </>
  );
}
