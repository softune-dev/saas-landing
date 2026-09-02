"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import React from "react";
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

export default function ChangelogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        {/* Hero Section */}
        <div className="relative pt-12 pb-14 px-5 text-center overflow-hidden bg-[var(--color-canvas)] rounded-b-[4rem] border-b-[6px] border-[var(--color-surface)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          {/* Masked Grid Layer */}
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />

          {/* Bottom Gradient Fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

          {/* Hero Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-4 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span
                className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                style={{ animationDuration: "2s" }}
              />
              <img
                src="/icons/zap.svg"
                alt="Zap"
                className="size-3.5 object-contain dark:invert"
              />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Product Updates
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center gap-1.5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Change
            <span className="relative inline-block px-3 py-1 ml-1">
              <span className="absolute inset-0 -rotate-1 top-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">log</em>
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-xl mx-auto leading-relaxed"
          >
            What shipped in the Softune dashboard and on your live store —
            features, fixes, and improvements merchants actually use.
          </motion.p>
        </div>

        {/* 2-Column Layout */}
        <div className="mx-auto max-w-6xl px-5 md:px-8 py-16 flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Sidebar (Sticky Quick Nav) */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block w-[260px] shrink-0"
          >
            <div className="sticky top-32 space-y-4">
              <h4 className="text-[12px] font-extrabold text-[var(--color-muted)] uppercase tracking-widest mb-6 border-b border-[var(--color-line)] pb-3">
                Release History
              </h4>
              <nav className="flex flex-col gap-4">
                {changelogData.map((log) => (
                  <a
                    key={log.version}
                    href={`#release-${log.serial.replace(".", "-")}`}
                    className="group flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex size-1.5 rounded-full bg-[var(--color-line)] group-hover:bg-[var(--color-brand)] transition-colors"></span>
                      <span className="text-[14.5px] font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors">
                        {log.serial} - {log.title}
                      </span>
                    </div>
                    <span className="pl-3.5 text-[12.5px] font-medium text-[var(--color-muted)]">
                      {log.date}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Right Content (Timeline) */}
          <div className="flex-1 space-y-20">
            {changelogData.map((log) => (
              <div
                key={log.version}
                id={`release-${log.serial.replace(".", "-")}`}
                className="scroll-mt-32"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Date & Version Header */}
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
                    {/* Title with Serial */}
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4 flex items-center gap-3">
                      <span className="text-[var(--color-brand)]">
                        {log.serial}
                      </span>
                      {log.title}
                    </h2>
                    <p className="text-[15.5px] leading-relaxed text-[var(--color-muted)] font-medium mb-10 max-w-3xl">
                      {log.description}
                    </p>

                    {/* Changes Grid */}
                    <div className="grid grid-cols-[100px_1fr] md:grid-cols-[110px_1fr] gap-x-4 gap-y-5 md:gap-x-6 md:gap-y-6">
                      {log.changes.map((change, i) => (
                        <React.Fragment key={i}>
                          {/* Fixed Badge Column */}
                          <div className="flex justify-end items-start pt-0.5">
                            <Badge type={change.type} />
                          </div>
                          {/* Description Column */}
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
      <Footer />
    </>
  );
}
