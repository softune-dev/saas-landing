"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { FEATURES_LIST } from "@/lib/features-data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FeaturesIndexPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        <div className="relative overflow-hidden rounded-b-[4rem] border-b-[6px] border-[var(--color-surface)] bg-[var(--color-canvas)] px-5 pt-12 pb-14 text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

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
              <img
                src="/icons/zap.svg"
                alt=""
                className="size-3.5 object-contain dark:invert"
              />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Product
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 mb-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-4xl font-black tracking-tight text-[var(--color-ink)] md:text-6xl"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Everything in the
            <span className="relative mx-1 inline-block px-3 py-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">dashboard</em>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 mx-auto max-w-2xl text-[16px] leading-relaxed font-medium text-[var(--color-muted)] md:text-lg"
          >
            Theme Editor, COD and local payments, courier connects, Store Sale
            POS, analytics, and Gemini AI — the surfaces a Bangladeshi merchant
            actually uses.
          </motion.p>
        </div>

        <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES_LIST.map((item, i) => (
              <motion.a
                key={item.slug}
                href={`/features/${item.slug}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.04 * i }}
                className="group relative flex flex-col overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 text-left transition-all hover:border-[var(--color-brand)]"
              >
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-[var(--color-brand)]">
                  <img
                    src={item.icon}
                    alt=""
                    className="size-4 object-contain brightness-0 invert"
                  />
                </div>
                <h2 className="mb-1 flex items-center justify-between gap-2 text-[16px] font-bold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand)]">
                  {item.title}
                  <ArrowRight className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </h2>
                <p className="text-[14px] leading-relaxed font-medium text-[var(--color-muted)]">
                  {item.desc}
                </p>
              </motion.a>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Button as="a" href="/signup" className="rounded-full px-6 py-3 text-[15px] font-bold">
              Get started
            </Button>
            <Button
              as="a"
              href="/pricing"
              variant="outline"
              className="rounded-full px-6 py-3 text-[15px] font-bold"
            >
              See pricing
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
