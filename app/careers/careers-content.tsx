"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const perks = [
  {
    icon: "/icons/clock.svg",
    title: "Flexible Hours",
    desc: "Work from anywhere, on your own schedule. We care about outcomes, not clock-in times.",
  },
  {
    icon: "/icons/zap.svg",
    title: "High Impact Work",
    desc: "Every line you ship reaches thousands of merchants. Your work matters immediately.",
  },
  {
    icon: "/icons/analytics.svg",
    title: "Growth Budget",
    desc: "Annual learning budget for courses, conferences, books, or any tool that helps you grow.",
  },
  {
    icon: "/icons/lock.svg",
    title: "Equity & Ownership",
    desc: "Competitive salary plus meaningful equity so you share in Softune's long-term success.",
  },
  {
    icon: "/icons/user.svg",
    title: "Small, Focused Team",
    desc: "No bureaucracy. Work directly with founders, ship fast, and see your ideas in production.",
  },
  {
    icon: "/icons/shop-bag.svg",
    title: "Full Remote",
    desc: "We're a distributed team. Work from home, a coffee shop, or across the globe.",
  },
];

const openRoles = [
  {
    title: "Senior Full-Stack Engineer",
    type: "Full-time · Remote",
    team: "Engineering",
    desc: "Build the core SaaS infrastructure powering thousands of merchant storefronts. Own critical features end-to-end.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    title: "Product Designer",
    type: "Full-time · Remote",
    team: "Design",
    desc: "Design the merchant dashboard, onboarding flows, and storefront theme builder. You'll define how Softune looks and feels.",
    tags: ["Figma", "UI Systems", "User Research"],
  },
  {
    title: "Developer Advocate",
    type: "Part-time · Remote",
    team: "Growth",
    desc: "Write guides, create video tutorials, and engage our merchant community. Bridge the gap between product and people.",
    tags: ["Technical Writing", "Community", "Video"],
  },
];

const values = [
  { label: "Team Size", value: "~12" },
  { label: "Countries", value: "6+" },
  { label: "Fully Remote", value: "Yes" },
  { label: "Founded", value: "2024" },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-canvas)]">

        {/* Hero */}
        <div className="relative pt-12 pb-14 px-5 text-center overflow-hidden bg-[var(--color-canvas)] rounded-b-[4rem] border-b-[6px] border-[var(--color-surface)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-6 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15" style={{ animationDuration: "2s" }} />
              <img src="/icons/user.svg" alt="" className="size-3.5 object-contain dark:invert" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">We're Hiring</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Build the Future of
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Commerce</em>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Join a small, ambitious team building the infrastructure for the next generation of independent online merchants. Remote-first, impact-driven, and growing.
          </motion.p>
        </div>

        {/* Perks & Benefits */}
        <section className="py-24 max-w-7xl mx-auto px-5 md:px-8 border-t border-[var(--color-line)]">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl" style={{ fontFamily: "var(--font-outfit)" }}>
              Why Work{" "}
              <span className="relative inline-block px-3 py-0.5 mx-1">
                <span className="absolute inset-0 -rotate-1 rounded-lg bg-[var(--color-brand)]" />
                <em className="relative not-italic text-white">With Us</em>
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk, idx) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="relative overflow-hidden rounded-[24px] border border-[var(--color-line)] hover:border-[var(--color-brand)] bg-[var(--color-surface)] p-8 transition-all duration-300 group text-left cursor-pointer"
              >
                <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)] opacity-80" />
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-brand)] p-1.5 transition-transform duration-300 group-hover:scale-110">
                    <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-brand)]">
                      <img src={perk.icon} alt="" className="size-5 object-contain brightness-0 invert" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-[18px] font-bold tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors">
                    {perk.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-muted)] font-medium">
                    {perk.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Open Roles */}
        <section className="py-14 border-y border-[var(--color-line)] bg-[var(--color-canvas)]/40 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)] opacity-5" />
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl" style={{ fontFamily: "var(--font-outfit)" }}>
                Open{" "}
                <span className="relative inline-block px-3 py-0.5 mx-1">
                  <span className="absolute inset-0 -rotate-1 rounded-lg bg-[var(--color-brand)]" />
                  <em className="relative not-italic text-white">Roles</em>
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {openRoles.map((role, idx) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="relative overflow-hidden rounded-[24px] border border-[var(--color-line)] hover:border-[var(--color-brand)] bg-[var(--color-surface)] p-8 transition-all duration-300 group cursor-pointer"
                >
                  <div className="pointer-events-none absolute top-0 right-0 w-1/3 h-full bg-dot-grid-dense [mask-image:radial-gradient(ellipse_at_top_right,black_0%,transparent_70%)] opacity-50" />
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-[11px] font-black uppercase tracking-widest text-[var(--color-brand)] bg-[var(--color-brand)]/10 px-3 py-1 rounded-full">
                          {role.team}
                        </span>
                        <span className="text-[13px] text-[var(--color-muted)] font-medium">{role.type}</span>
                      </div>
                      <h3 className="text-[20px] font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors mb-2">
                        {role.title}
                      </h3>
                      <p className="text-[14.5px] leading-relaxed text-[var(--color-muted)] font-medium mb-4">
                        {role.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {role.tags.map((tag) => (
                          <span key={tag} className="text-[12px] font-semibold text-[var(--color-ink)] bg-[var(--color-canvas)] px-3 py-1 rounded-full border border-[var(--color-line)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Button variant="primary" as="a" href="mailto:hello@softune.xyz" className="px-6 py-3 font-bold gap-2 whitespace-nowrap">
                        Apply Now
                        <img src="/icons/arrow-right.svg" alt="" className="size-4 object-contain brightness-0 invert" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
