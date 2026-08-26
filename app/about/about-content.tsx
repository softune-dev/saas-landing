"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { team } from "@/lib/team-data";

const values = [
  {
    title: "Merchant First",
    desc: "We build for the independent store owner, not the corporate board. Every feature is designed to reduce friction, automate workflows, and save administrative hours.",
    icon: "/icons/user.svg"
  },
  {
    title: "Zero Complexity",
    desc: "E-commerce shouldn't require a software engineering degree. We provide powerful SaaS tooling without code-heavy clutter, plugin juggling, or configuration pain.",
    icon: "/icons/zap.svg"
  },
  {
    title: "Absolute Integrity",
    desc: "Your customer records, transaction details, and custom stylesheets are secured via logical database isolation and robust encryption patterns.",
    icon: "/icons/lock.svg"
  }
];

const timeline = [
  {
    year: "2024",
    title: "The Idea",
    desc: "Softune started as a side project, sketched out and prototyped in spare time around a full-time job and finishing university. Progress was slow, but the core idea (one dashboard, real storefronts, no code) never changed.",
    icon: "/icons/play.svg"
  },
  {
    year: "2025",
    title: "Building the Foundation",
    desc: "Evenings and weekends went into getting the fundamentals right: tenant-isolated data, a real theme editor, and the storefront contract everything else is built on top of.",
    icon: "/icons/splash.svg"
  },
  {
    year: "2026",
    title: "Built & Live",
    desc: "Went full-time on Softune. The dashboard, storefront themes, AI tooling, local payments (bKash, Nagad, SSLCommerz), and courier integrations were built out and the platform went live.",
    icon: "/icons/analytics.svg"
  }
];

const stats = [
  { label: "Active Storefronts", value: "12,000+", icon: "/icons/domain.svg" },
  { label: "Average Page Load", value: "15ms", icon: "/icons/zap.svg" },
  { label: "Uptime SLA", value: "99.99%", icon: "/icons/lock.svg" },
  { label: "Plugin Costs Saved", value: "৳4,500/mo", icon: "/icons/wallet.svg" }
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        
        {/* Hero Section */}
        <div className="relative pt-16 pb-20 px-5 text-center overflow-hidden bg-[var(--color-canvas)] rounded-b-[4rem] border-b-[6px] border-[var(--color-surface)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

          {/* Hero Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-6 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15" style={{ animationDuration: "2s" }} />
              <img src="/icons/user.svg" alt="Users" className="size-3.5 object-contain dark:invert" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Our Journey
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Smarter e-Commerce,
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Simplified</em>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Softune is an all-in-one SaaS platform enabling independent brands to synchronize inventory, customize themes, route couriers, and run POS terminals out of a unified admin panel.
          </motion.p>
        </div>

        {/* Stats Section */}
        <section className="pt-24 pb-12 max-w-7xl mx-auto px-5 md:px-8">
          {/* Full-width Centered Intro */}
          <div className="max-w-3xl text-center mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
              Why Softune{" "}
              <span className="relative inline-block px-3 py-0.5 mx-1">
                <span className="absolute inset-0 -rotate-1 rounded-lg bg-[var(--color-brand)]" />
                <em className="relative not-italic text-white">Works</em>
              </span>
            </h2>
            <p className="text-[16px] md:text-lg leading-relaxed text-[var(--color-muted)] font-medium">
              Softune is built to eliminate third-party plug-in subscriptions, bloated stylesheets, and database lags. By keeping storefront instances logically isolated, your site loads instantly while securing all checkout transactional payloads.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="relative overflow-hidden rounded-[24px] border border-[var(--color-line)] hover:border-[var(--color-brand)] bg-[var(--color-surface)] p-8 md:p-10 transition-all duration-300 cursor-pointer group text-left"
              >
                {/* Background Dots Gradient */}
                <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)] opacity-80" />

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-brand)] p-1.5 transition-transform duration-300 group-hover:scale-110">
                    <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-brand)]">
                      <img src={stat.icon} alt="" className="size-5 object-contain brightness-0 invert" />
                    </div>
                  </div>

                  <p className="mt-6 text-3xl md:text-4xl font-black text-[var(--color-ink)] tracking-tight group-hover:text-[var(--color-brand)] transition-colors">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[14px] text-[var(--color-muted)] font-semibold">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Brand Values */}
        <section className="py-24 max-w-7xl mx-auto px-5 md:px-8 border-t border-[var(--color-line)]">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl" style={{ fontFamily: 'var(--font-outfit)' }}>
              Values That{" "}
              <span className="relative inline-block px-3 py-0.5 mx-1">
                <span className="absolute inset-0 -rotate-1 rounded-lg bg-[var(--color-brand)]" />
                <em className="relative not-italic text-white">Drive Us</em>
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="relative overflow-hidden rounded-[24px] border border-[var(--color-line)] hover:border-[var(--color-brand)] bg-[var(--color-surface)] p-8 md:p-10 transition-all duration-300 cursor-pointer group text-left"
              >
                {/* Background Dots Gradient */}
                <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)] opacity-80" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-brand)] p-1.5 transition-transform duration-300 group-hover:scale-110">
                    <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-brand)]">
                      <img src={val.icon} alt="" className="size-5 object-contain brightness-0 invert" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-[18px] md:text-[20px] font-bold tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand)]">
                    {val.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-muted)] font-medium">
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Milestone Timeline List (NOT Cards) */}
        <section className="py-24 border-y border-[var(--color-line)] bg-[var(--color-canvas)]/40 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)] opacity-5" />
          
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl" style={{ fontFamily: 'var(--font-outfit)' }}>
                Our{" "}
                <span className="relative inline-block px-3 py-0.5 mx-1">
                  <span className="absolute inset-0 -rotate-1 rounded-lg bg-[var(--color-brand)]" />
                  <em className="relative not-italic text-white">Timeline</em>
                </span>
              </h2>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="relative border-l border-[var(--color-line)] ml-3 md:ml-4 pl-8 md:pl-10 space-y-12 py-4">
                {timeline.map((step, idx) => (
                  <motion.div
                    key={step.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.1 }}
                    className="relative text-left group"
                  >
                    {/* Node Circle */}
                    <div className="absolute -left-[48px] md:-left-[60px] top-1 flex size-8 md:size-10 items-center justify-center rounded-full bg-[var(--color-brand)] text-white ring-8 ring-[var(--color-canvas)] transition-transform group-hover:scale-110 shadow-sm">
                      <img src={step.icon} alt="" className="size-4 md:size-5 object-contain brightness-0 invert" />
                    </div>
                    <div>
                      <span className="text-[12px] font-black text-[var(--color-brand)] bg-[var(--color-brand)]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                        {step.year}
                      </span>
                      <h3 className="mt-4 text-xl md:text-2xl font-bold text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand)]">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)] font-medium max-w-2xl">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Grid (Video/Blog Card Styled) */}
        <section className="pt-24 pb-12 max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl" style={{ fontFamily: 'var(--font-outfit)' }}>
              Meet Our{" "}
              <span className="relative inline-block px-3 py-0.5 mx-1">
                <span className="absolute inset-0 -rotate-1 rounded-lg bg-[var(--color-brand)]" />
                <em className="relative not-italic text-white">Team</em>
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {team.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="relative overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-[var(--color-surface)] flex flex-col md:flex-row"
              >
                {/* Background Dots Gradient */}
                <div className="pointer-events-none absolute bottom-0 right-0 w-1/2 h-1/2 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_bottom_right,black_0%,transparent_80%)] opacity-60" />

                {/* 1:1 image, left on desktop */}
                <div className="relative aspect-square w-full md:w-96 shrink-0 overflow-hidden bg-slate-900">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>

                {/* Content, right on desktop */}
                <div className="relative z-10 flex flex-col flex-1 p-8 md:p-10">
                  <span className="text-[13px] font-bold text-[var(--color-brand)] uppercase tracking-wide">
                    {member.role}
                  </span>

                  <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-ink)] leading-snug" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {member.name}
                  </h3>

                  {member.location ? (
                    <span className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-muted)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                      {member.location}
                    </span>
                  ) : null}

                  <p className="mt-5 flex-1 text-[15px] md:text-[16px] leading-relaxed text-[var(--color-muted)] font-medium">
                    {member.bio}
                  </p>

                  {/* Real links only, pulled from kamrulhasan.site/contact */}
                  <div className="mt-6 flex items-center gap-4 pt-6 border-t border-[var(--color-line)]/50 relative z-20">
                    {member.email ? (
                      <a href={`mailto:${member.email}`} aria-label="Email" className="text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      </a>
                    ) : null}
                    {member.portfolio ? (
                      <a href={member.portfolio} target="_blank" rel="noopener noreferrer" aria-label="Portfolio" className="text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>
                      </a>
                    ) : null}
                    {member.github ? (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577v-2.017c-3.338.726-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.755-1.333-1.755-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.38 1.236-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.102.823 2.222v3.293c0 .32.192.694.801.576C20.566 21.797 24 17.298 24 12c0-6.63-5.37-12-12-12"/></svg>
                      </a>
                    ) : null}
                    {member.twitter ? (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                      </a>
                    ) : null}
                    {member.facebook ? (
                      <a href={member.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Full-width CTA Banner (Scale Your Brand) */}
        <section className="pb-24 max-w-7xl mx-auto px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden"
          >
            {/* Background Dots Gradient */}
            <div className="pointer-events-none absolute top-0 right-0 w-1/3 h-full bg-dot-grid-dense [mask-image:radial-gradient(ellipse_at_top_right,black_0%,transparent_70%)] opacity-80" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-ink)] mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
                Scale Your Brand With Us
              </h3>
              <p className="text-[15.5px] leading-relaxed text-[var(--color-muted)] font-medium mb-8">
                Experience an integrated system with POS logs, secure payment pathways, smart analytics, and courier integrations configured for conversion.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" as="a" href="#waitlist" className="px-8 py-3.5 font-bold gap-2">
                  Get Started Now
                  <img src="/icons/arrow-right.svg" alt="" className="size-4 object-contain brightness-0 invert" />
                </Button>
                <Button variant="secondary" as="a" href="/support/contact" className="px-8 py-3.5 font-bold">
                  Contact Support
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
