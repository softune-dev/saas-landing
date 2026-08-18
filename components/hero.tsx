"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  ShoppingCart,
  Package,
  Store,
  Gift,
  PlayCircle,
  BookOpen,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex items-center min-h-[calc(100vh-8rem)] overflow-hidden bg-[#f0f1f3] rounded-b-[4rem] border-[6px] border-t-0 border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
      {/* Masked Grid Layer */}
      <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />

      {/* Bottom Gradient Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/15 to-transparent" />

      <div className="relative z-10 mx-auto w-full grid max-w-7xl grid-cols-1 gap-12 px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20 lg:grid-cols-2 lg:items-center">
        {/* Left Column: Text */}
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-6 md:mb-8 flex items-center gap-2 md:gap-3 rounded-full border border-[var(--color-line)] bg-white p-1 md:p-1.5 pr-3 md:pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-5 md:size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span
                className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                style={{ animationDuration: "2s" }}
              />
              <img
                src="/icons/zap.svg"
                alt="Zap"
                className="size-3 md:size-3.5 object-contain"
              />
            </div>
            <span className="text-[13px] md:text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Softune eCommerce is live
            </span>
            <span className="h-3 md:h-4 w-px bg-[var(--color-line)]" />
            <Link
              href="/changelog"
              className="group hover:underline cursor-pointer flex items-center gap-1 text-[13px] md:text-[14px] font-bold text-[var(--color-brand)] transition-opacity hover:opacity-80"
            >
              See what's new
              <ArrowRight className="size-3.5 md:size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.h1
            style={{ fontFamily: 'var(--font-outfit)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-black tracking-tighter text-5xl leading-[0.9] text-[var(--color-ink)] sm:text-[4rem] md:text-[4.5rem] lg:text-[5.5rem] flex flex-wrap items-center justify-start gap-x-3 gap-y-2 lg:gap-y-4"
          >
            <span>Launch your eCommerce</span>
            <span className="relative inline-block whitespace-nowrap px-4 py-1.5">
              <span className="absolute inset-0 -rotate-1 top-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative flex items-center gap-2 not-italic text-white">
                <img src="/icons/clock.svg" alt="Clock" className="size-[0.8em] object-contain brightness-0 invert" />
                in minutes
              </em>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-4 md:mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)] font-medium md:text-[17px] lg:text-lg"
          >
            Create a professional store, manage products, and start selling
            online—without coding. AI-powered features included.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-8 md:mt-10 flex flex-wrap items-center justify-start gap-3 md:gap-4"
          >
            <div className="relative">
              <span
                className="pointer-events-none absolute -left-5 -top-5 md:-left-6 md:-top-6 size-6 md:size-8 bg-[var(--color-brand)]"
                style={{
                  maskImage: 'url(/icons/splash.svg)',
                  WebkitMaskImage: 'url(/icons/splash.svg)',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
              <a
                href="#demo"
                className="relative z-10 flex items-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-3 md:px-8 md:py-4 text-[14px] md:text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                <img src="/icons/play.svg" alt="Play" className="size-3.5 md:size-4 object-contain brightness-0 invert" />
                Live demo
              </a>
            </div>
            <a
              href="#manual"
              className="flex items-center gap-2 rounded-full border border-[var(--color-brand)] bg-transparent px-6 py-3 md:px-8 md:py-4 text-[14px] md:text-[15px] font-semibold text-[var(--color-ink)] transition-colors hover:bg-[var(--color-brand)]/5"
            >
              <img src="/icons/book.svg" alt="Book" className="size-3.5 md:size-4 object-contain" />
              User manual
            </a>
          </motion.div>
        </div>

        {/* Right Column: Dashboard Mockup */}
        <div className="relative mt-14 lg:mt-0 w-full">
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-0 lg:w-[140%] max-w-none"
          >
            <div className="overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_24px_80px_-32px_rgba(12,12,12,0.35)]">
              <div className="relative w-full bg-[var(--color-surface)]">
                <img
                  src="/dashboard.png"
                  alt="Softune Dashboard"
                  className="w-full h-auto object-cover object-left-top"
                  width={1440}
                  height={1024}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
