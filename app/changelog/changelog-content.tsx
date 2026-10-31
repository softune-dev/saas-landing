"use client";

import { DarkHero } from "@/components/dark-hero";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { changelogData, type ChangeType } from "@/lib/changelog-data";

function Badge({ type }: { type: ChangeType }) {
  const colors: Record<string, string> = {
    Feature: "bg-[#E6F4EA] text-[#137333] border-[#137333]/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
    Improvement: "bg-[#F3E8FD] text-[#6B21A8] border-[#6B21A8]/20 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20",
    "Bug Fix": "bg-[#FCE8E6] text-[#C5221F] border-[#C5221F]/20 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
  };

  const style = colors[type] || "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[13px] font-bold border ${style} w-full`}
    >
      {type}
    </span>
  );
}

export default function ChangelogPage({ locale = "en" }: { locale?: "en" | "bn" }) {
  const isBn = locale === "bn";
  const releaseId = (serial: string) => `release-${serial.replace(".", "-")}`;
  const [activeId, setActiveId] = useState<string>(() => releaseId(changelogData[0].serial));
  const sidebarRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  // The site header is sticky and its height changes with screen size, so the sticky sidebar and the
  // phone jump strip read the real height instead of guessing (exposed as --header-h).
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const root = document.documentElement;
    const apply = () => root.style.setProperty("--header-h", `${header.getBoundingClientRect().height}px`);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(header);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--header-h");
    };
  }, []);

  // Follow the page: the release whose card crosses a band near the top of the screen is "current".
  useEffect(() => {
    const sections = changelogData
      .map((log) => document.getElementById(releaseId(log.serial)))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActiveId(hit.target.id);
      },
      { rootMargin: "-18% 0px -70% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Keep the current entry visible inside the sidebar / chip bar by scrolling THEM (never the page).
  useEffect(() => {
    const reveal = (box: HTMLElement | null, axis: "y" | "x") => {
      const item = box?.querySelector<HTMLElement>(`[data-release="${activeId}"]`);
      if (!box || !item) return;
      if (axis === "y") {
        const top = item.offsetTop - box.clientHeight / 2 + item.clientHeight / 2;
        box.scrollTo({ top, behavior: "smooth" });
      } else {
        const left = item.offsetLeft - box.clientWidth / 2 + item.clientWidth / 2;
        box.scrollTo({ left, behavior: "smooth" });
      }
    };
    reveal(sidebarRef.current, "y");
    reveal(chipsRef.current, "x");
  }, [activeId]);

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        {/* Hero Section */}
        <DarkHero>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-4 flex max-w-fit items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] backdrop-blur p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span
                className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                style={{ animationDuration: "2s" }}
              />
              <img
                src="/icons/zap.svg"
                alt="Zap"
                className="size-3.5 object-contain"
              />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-white">
              {isBn ? "প্রোডাক্ট আপডেট" : "Product Updates"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-white mb-6 flex justify-center items-center gap-1.5"
            style={{ fontFamily: "var(--font-heading), var(--font-bn)" }}
          >
            {isBn ? (
              <>
                চেঞ্জ<span className="relative inline-block px-3 py-1 ml-1">
                  <span className="absolute inset-0 -rotate-1 top-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
                  <em className="relative not-italic text-white">লগ</em>
                </span>
              </>
            ) : (
              <>
                Change
                <span className="relative inline-block px-3 py-1 ml-1">
                  <span className="absolute inset-0 -rotate-1 top-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
                  <em className="relative not-italic text-white">log</em>
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-white/60 font-medium max-w-xl mx-auto leading-relaxed"
          >
            {isBn
              ? "SoftuneBD ড্যাশবোর্ড ও লাইভ স্টোরফ্রন্টে নতুন যে ফিচার, ফিক্স ও ইমপ্রুভমেন্টগুলো যুক্ত হয়েছে।"
              : "What shipped in the SoftuneBD dashboard and on your live store - features, fixes, and improvements merchants actually use."}
          </motion.p>
        </DarkHero>

        {/* Phones and tablets: a sticky strip of release numbers to jump between versions. */}
        <div className="sticky top-[var(--header-h,4.5rem)] z-30 border-b border-[var(--color-line)] bg-[var(--color-canvas)]/90 backdrop-blur-md lg:hidden">
          <div ref={chipsRef} className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-3">
            {changelogData.map((log) => {
              const id = releaseId(log.serial);
              const on = id === activeId;
              return (
                <a
                  key={log.version}
                  href={`#${id}`}
                  data-release={id}
                  className={[
                    "shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-bold transition-colors",
                    on
                      ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                      : "border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-muted)]",
                  ].join(" ")}
                >
                  {log.version}
                </a>
              );
            })}
          </div>
        </div>

        {/* 2-Column Layout: the sidebar scrolls on its own, the releases scroll with the page. */}
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-12 md:px-8 lg:flex-row lg:gap-14 lg:py-16">
          {/* Left Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden w-[290px] shrink-0 lg:block"
          >
            <div className="sticky top-[calc(var(--header-h,4.5rem)+1rem)] flex max-h-[calc(100vh-var(--header-h,4.5rem)-2rem)] flex-col overflow-hidden rounded-[22px] border border-[var(--color-line)] bg-[var(--color-surface)]">
              <div className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-4">
                <h4 className="text-[12px] font-extrabold uppercase tracking-widest text-[var(--color-muted)]">
                  {isBn ? "রিলিজ হিস্ট্রি" : "Release History"}
                </h4>
                <span className="rounded-full bg-[var(--color-brand)]/10 px-2 py-0.5 text-[11.5px] font-bold text-[var(--color-brand)]">
                  {changelogData.length}
                </span>
              </div>
              <div
                ref={sidebarRef}
                className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 [scrollbar-color:var(--color-line)_transparent] [scrollbar-width:thin]"
              >
                <nav className="relative flex flex-col gap-1">
                  {/* the timeline rail the dots sit on */}
                  <span aria-hidden className="absolute bottom-3 left-[19px] top-3 w-px bg-[var(--color-line)]" />
                  {changelogData.map((log) => {
                    const id = releaseId(log.serial);
                    const on = id === activeId;
                    return (
                      <a
                        key={log.version}
                        href={`#${id}`}
                        data-release={id}
                        aria-current={on ? "true" : undefined}
                        className={[
                          "group relative flex gap-3 rounded-xl px-2.5 py-2.5 transition-colors",
                          on ? "bg-[var(--color-brand)]/10" : "hover:bg-[var(--color-canvas)]",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full border-2 transition-colors",
                            on
                              ? "border-[var(--color-brand)] bg-[var(--color-brand)]"
                              : "border-[var(--color-line)] bg-[var(--color-surface)] group-hover:border-[var(--color-brand)]",
                          ].join(" ")}
                        />
                        <span className="flex min-w-0 flex-col gap-0.5">
                          <span
                            className={[
                              "line-clamp-2 text-[14px] font-bold leading-snug transition-colors",
                              on ? "text-[var(--color-brand)]" : "text-[var(--color-ink)] group-hover:text-[var(--color-brand)]",
                            ].join(" ")}
                          >
                            <span className="opacity-60">{log.serial}</span> {log.title}
                          </span>
                          <span className="text-[12px] font-medium text-[var(--color-muted)]">{log.date}</span>
                        </span>
                      </a>
                    );
                  })}
                </nav>
              </div>
            </div>
          </motion.aside>

          {/* Right Content */}
          <div className="min-w-0 flex-1 space-y-14 md:space-y-20">
            {changelogData.map((log) => (
              <div
                key={log.version}
                id={`release-${log.serial.replace(".", "-")}`}
                className="scroll-mt-[calc(var(--header-h,4.5rem)+4.5rem)] lg:scroll-mt-[calc(var(--header-h,4.5rem)+1.5rem)]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex size-7 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm">
                      <img
                        src="/icons/clock.svg"
                        alt="Date"
                        className="size-3.5 object-contain brightness-0 invert"
                      />
                    </div>
                    <span className="text-[16px] font-bold text-[var(--color-ink)]">
                      {log.date}
                    </span>
                    <span className="h-4 w-px bg-[var(--color-line)] mx-1"></span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] text-[12px] font-bold">
                      {log.version}
                    </span>
                  </div>

                  <div className="rounded-[24px] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 md:p-10 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)]">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4 flex items-center gap-3">
                      <span className="text-[var(--color-brand)]">
                        {log.serial}
                      </span>
                      {log.title}
                    </h2>
                    <p className="text-[15.5px] leading-relaxed text-[var(--color-muted)] font-medium mb-10 max-w-3xl">
                      {log.description}
                    </p>

                    <div className="grid grid-cols-[100px_1fr] md:grid-cols-[110px_1fr] gap-x-4 gap-y-5 md:gap-x-6 md:gap-y-6">
                      {log.changes.map((change, i) => (
                        <React.Fragment key={i}>
                          <div className="flex justify-end items-start pt-0.5">
                            <Badge type={change.type} />
                          </div>
                          <span className="text-[14.5px] md:text-[15px] font-medium text-[var(--color-ink)] leading-relaxed pt-1">
                            {change.content}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
