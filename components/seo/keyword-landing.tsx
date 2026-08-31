"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export type KeywordFeature = { icon: string; title: string; desc: string };
export type KeywordFaq = { q: string; a: string };
export type KeywordComparisonRow = { label: string; softune: string; other: string };
export type KeywordComparison = {
  competitorName: string;
  rows: KeywordComparisonRow[];
};

export type KeywordLandingData = {
  pill: string;
  h1Start: string;
  h1Highlight: string;
  h1End?: string;
  intro: string;
  features: KeywordFeature[];
  comparison?: KeywordComparison;
  faqs?: KeywordFaq[];
  ctaText: string;
  ctaHref: string;
};

/** Shared shell for every keyword-targeted landing page (commercial,
 * /integrations/*, /ecommerce/*) — one visual system instead of 15 bespoke
 * layouts, driven entirely by real data passed in per page. No stat this
 * component renders is invented here; every number/claim lives in the
 * page's own data file and must trace back to something actually true
 * (real feature, real price, real integration) — see this session's
 * fake-stats cleanup on /about and /support/community for why that rule
 * exists.
 */
export function KeywordLanding({ data }: { data: KeywordLandingData }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        <div className="relative pt-16 pb-20 px-5 text-center overflow-hidden bg-[var(--color-canvas)] rounded-b-[4rem] border-b-[6px] border-[var(--color-surface)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-4 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15" style={{ animationDuration: "2s" }} />
              <img src="/icons/zap.svg" alt="" className="size-3.5 object-contain dark:invert" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              {data.pill}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {data.h1Start}
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">{data.h1Highlight}</em>
            </span>
            {data.h1End}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {data.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="relative z-10 mt-8"
          >
            <Button variant="primary" as="a" href={data.ctaHref} className="py-3.5 px-8 font-bold">
              {data.ctaText}
            </Button>
          </motion.div>
        </div>

        {/* Feature grid */}
        <section className="py-20 max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.map((f, idx) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="relative overflow-hidden rounded-[24px] border border-[var(--color-line)] bg-[var(--color-surface)] p-7 text-left"
              >
                <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)] opacity-40" />
                <div className="relative z-10">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[var(--color-brand)]/10 mb-4">
                    <img src={f.icon} alt="" className="size-5 object-contain dark:invert" />
                  </div>
                  <h3 className="text-[16px] font-extrabold text-[var(--color-ink)] mb-2">{f.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[var(--color-muted)]">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        {data.comparison ? (
          <section className="pb-20 max-w-4xl mx-auto px-5 md:px-8">
            <h2
              className="text-2xl md:text-3xl font-black tracking-tight text-[var(--color-ink)] text-center mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Softune vs {data.comparison.competitorName}
            </h2>
            <div className="overflow-x-auto rounded-[24px] border border-[var(--color-line)] bg-[var(--color-surface)]">
              <table className="w-full text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[var(--color-line)]">
                    <th className="p-4 font-bold text-[var(--color-ink)]">Feature</th>
                    <th className="p-4 font-bold text-[var(--color-brand)]">Softune</th>
                    <th className="p-4 font-bold text-[var(--color-muted)]">{data.comparison.competitorName}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.comparison.rows.map((row) => (
                    <tr key={row.label} className="border-b border-[var(--color-line)] last:border-0">
                      <td className="p-4 font-semibold text-[var(--color-ink)]">{row.label}</td>
                      <td className="p-4 text-[var(--color-ink)]">{row.softune}</td>
                      <td className="p-4 text-[var(--color-muted)]">{row.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {/* FAQ */}
        {data.faqs?.length ? (
          <section className="pb-24 max-w-3xl mx-auto px-5 md:px-8">
            <h2
              className="text-2xl md:text-3xl font-black tracking-tight text-[var(--color-ink)] text-center mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {data.faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)] p-6"
                >
                  <h3 className="text-[15px] font-extrabold text-[var(--color-ink)] mb-2">{faq.q}</h3>
                  <p className="text-[14px] leading-relaxed text-[var(--color-muted)]">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
