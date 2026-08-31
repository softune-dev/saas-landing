"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        
        {/* Hero Section (Changelog Inspired) */}
        <div className="relative pt-12 pb-14 px-5 text-center overflow-hidden bg-[var(--color-canvas)] rounded-b-[4rem] border-b-[6px] border-[var(--color-surface)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

          {/* Hero Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-4 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15" style={{ animationDuration: "2s" }} />
              <img src="/icons/user.svg" alt="User" className="size-3.5 object-contain dark:invert" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Connect with Sellers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Community Forums &
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Feedback</em>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed"
          >
            The forum is still being built. Until it's live, reach us directly — a real person reads every message.
          </motion.p>
        </div>

        {/* Content Section */}
        <section className="py-24 max-w-3xl mx-auto px-5 md:px-8">
          <div className="grid gap-6 sm:grid-cols-2">

            {/* Contact card */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[24px] p-8 text-left relative overflow-hidden sm:col-span-2">
              <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)] opacity-40" />
              <h3 className="text-xl font-black text-[var(--color-ink)] mb-4">
                Coming soon
              </h3>
              <p className="text-[14px] leading-relaxed text-[var(--color-muted)] mb-6">
                We're building a real place for merchants to share tips, request features, and help each other out.
                It's not live yet — no fabricated activity here in the meantime. If you have a question or a feature
                request today, email us directly.
              </p>

              <Button variant="primary" as="a" href="mailto:support@softunebd.com" className="w-full justify-center py-3.5 font-bold gap-2 sm:w-auto">
                <img src="/icons/chat.svg" alt="" className="size-4 object-contain brightness-0 invert" />
                Email support@softunebd.com
              </Button>
            </div>

            {/* Forum Guidelines */}
            <div className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[24px] p-8 text-left relative overflow-hidden sm:col-span-2">
              <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)] opacity-80" />

              <h3 className="text-[16px] font-extrabold text-[var(--color-ink)] mb-4 flex items-center gap-2 relative z-10">
                <img src="/icons/lock.svg" alt="" className="size-4.5 object-contain dark:invert" />
                Planned forum guidelines
              </h3>
              <ul className="space-y-3 text-[13.5px] text-[var(--color-muted)] font-medium">
                <li className="flex gap-2">
                  <span className="text-[var(--color-brand)] font-bold">1.</span>
                  Be respectful and supportive of fellow merchants.
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-brand)] font-bold">2.</span>
                  Post custom HTML/CSS code inside code blocks.
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-brand)] font-bold">3.</span>
                  Do not share API keys or sensitive merchant data.
                </li>
              </ul>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
