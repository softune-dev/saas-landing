"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EnuvorLogo } from "@/components/brand/enuvor-logo";
import {
  ENUVOR_URL,
  enuvorIntro,
  enuvorMilestones,
  enuvorStats,
  enuvorStory,
  enuvorStudio,
  enuvorValues,
} from "@/lib/enuvor-data";

type Locale = "en" | "bn";

const HEADING = { fontFamily: "var(--font-heading), var(--font-bn)" } as const;

/** Section heading with the orange highlighted keyword the rest of the site uses. */
function Heading({ lead, mark }: { lead: string; mark: string }) {
  return (
    <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl" style={HEADING}>
      {lead}
      <span className="relative mx-1 inline-block px-3 py-0.5">
        <span className="absolute inset-0 -rotate-1 rounded-lg bg-[var(--color-brand)]" />
        <em className="relative not-italic text-white">{mark}</em>
      </span>
    </h2>
  );
}

/** Counts up to `to` the first time it scrolls into view; static when reduced motion is on. */
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduced, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/** Who owns SoftuneBD: the ENUVOR logo, what the company is, its story, and the numbers. */
export function EnuvorAbout({ locale }: { locale: Locale }) {
  const isBn = locale === "bn";
  return (
    <section className="px-5 pb-8 pt-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-start rounded-[28px] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 md:p-10"
          >
            <span className="rounded-full bg-[var(--color-brand)]/10 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
              {isBn ? "প্যারেন্ট কোম্পানি" : "Parent company"}
            </span>
            <EnuvorLogo size={64} className="mt-6" />
            <p className="mt-6 text-[15.5px] font-medium leading-relaxed text-[var(--color-muted)]">{enuvorIntro[locale]}</p>
            <Button variant="outline" as="a" href={ENUVOR_URL} target="_blank" rel="noopener noreferrer" className="mt-8 gap-2 px-6 py-3 font-bold">
              {isBn ? "ENUVOR দেখুন" : "Visit ENUVOR"}
              <img src="/icons/arrow-link.svg" alt="" className="size-4 object-contain dark:invert" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-left"
          >
            <Heading lead={isBn ? "SoftuneBD-এর পেছনে " : "Behind SoftuneBD: "} mark="ENUVOR" />
            <div className="mt-6 space-y-5">
              {enuvorStory[locale].map((p) => (
                <p key={p} className="text-[16px] font-medium leading-relaxed text-[var(--color-muted)] md:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {enuvorStats.map((s, i) => (
            <motion.div
              key={s.label.en}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-[22px] border border-[var(--color-line)] bg-[var(--color-surface)] p-6 text-left"
            >
              <div className="text-4xl font-black tracking-tight text-[var(--color-brand)] md:text-5xl" style={HEADING}>
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-[14px] font-semibold text-[var(--color-muted)]">{s.label[locale]}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** ENUVOR's company timeline, 2019 to 2026. */
export function EnuvorTimeline({ locale }: { locale: Locale }) {
  const isBn = locale === "bn";
  return (
    <section className="relative overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-canvas)]/40 py-24">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="mb-16 text-center">
          <Heading lead={isBn ? "আমাদের " : "Our "} mark={isBn ? "যাত্রা" : "Journey"} />
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="relative ml-3 space-y-12 border-l border-[var(--color-line)] py-4 pl-8 md:ml-4 md:pl-10">
            {enuvorMilestones.map((step, idx) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group relative text-left"
              >
                <div className="absolute -left-[48px] top-1 flex size-8 items-center justify-center rounded-full bg-[var(--color-brand)] text-white shadow-sm ring-8 ring-[var(--color-canvas)] transition-transform group-hover:scale-110 md:-left-[60px] md:size-10">
                  <img src={step.icon} alt="" className="size-4 object-contain brightness-0 invert md:size-5" />
                </div>
                <div>
                  <span className="rounded-full bg-[var(--color-brand)]/10 px-3 py-1 text-[12px] font-black uppercase tracking-wider text-[var(--color-brand)]">
                    {step.year}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand)] md:text-2xl">
                    {step.title[locale]}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[15px] font-medium leading-relaxed text-[var(--color-muted)]">{step.desc[locale]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** How ENUVOR works (four values), and where the studio is. */
export function EnuvorValuesAndStudio({ locale }: { locale: Locale }) {
  const isBn = locale === "bn";
  return (
    <section className="mx-auto max-w-6xl px-5 pb-8 pt-24 md:px-8">
      <div className="mb-14 text-center">
        <Heading lead={isBn ? "আমরা যেভাবে " : "How we "} mark={isBn ? "কাজ করি" : "work"} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {enuvorValues.map((v, i) => (
          <motion.div
            key={v.title.en}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 2) * 0.07 }}
            className="rounded-[24px] border border-[var(--color-line)] bg-[var(--color-surface)] p-7 text-left"
          >
            <span className="text-[13px] font-black text-[var(--color-brand)]">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-xl font-bold text-[var(--color-ink)]" style={HEADING}>
              {v.title[locale]}
            </h3>
            <p className="mt-3 text-[15px] font-medium leading-relaxed text-[var(--color-muted)]">{v.desc[locale]}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-4 flex flex-col gap-3 rounded-[24px] border border-[var(--color-line)] bg-[var(--color-surface)] p-7 text-left md:flex-row md:items-center md:justify-between md:gap-10"
      >
        <div>
          <span className="text-[12px] font-bold uppercase tracking-wider text-[var(--color-brand)]">{isBn ? "স্টুডিও" : "Studio"}</span>
          <h3 className="mt-2 text-xl font-bold text-[var(--color-ink)]" style={HEADING}>
            {enuvorStudio.city[locale]}
          </h3>
          <p className="mt-2 max-w-xl text-[15px] font-medium leading-relaxed text-[var(--color-muted)]">{enuvorStudio.note[locale]}</p>
        </div>
        <p className="shrink-0 text-[14px] font-semibold text-[var(--color-ink)]">{enuvorStudio.hours[locale]}</p>
      </motion.div>
    </section>
  );
}
