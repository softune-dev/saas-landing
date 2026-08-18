"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    title: "The Vision & Foundation",
    desc: "Softune was founded to resolve tool fragmentation. Independent brands were tired of connecting separate POS systems, billing tools, and courier services. We built a unified SaaS prototype.",
    icon: "/icons/play.svg"
  },
  {
    year: "2025",
    title: "Platform Launch",
    desc: "We released the multi-tenant store generator, native courier APIs, and checkout optimizations. Within 6 months, we onboarded our first 1,000 active merchants processing live transactions.",
    icon: "/icons/splash.svg"
  },
  {
    year: "2026",
    title: "Scale & AI Integration",
    desc: "Softune expands to support cross-border logistics, localized payment gateways (SSLCommerz, bKash), and integrated AI assistant content generation to boost sales conversions.",
    icon: "/icons/analytics.svg"
  }
];

const team = [
  {
    name: "Kamrul Hasan",
    role: "Founder & Lead Architect",
    bio: "Ex-Systems Engineer focused on building multi-tenant SaaS pipelines, performant storefront templates, and real-time inventory synchronization systems.",
    avatar: "https://i.pravatar.cc/150?img=68"
  },
  {
    name: "Ayesha Rahman",
    role: "Head of Product Design",
    bio: "Passionate about creating clean UI libraries, frictionless visual theme design engines, and intuitive merchant administration dashboards.",
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  {
    name: "Sarah Connor",
    role: "Developer Advocate",
    bio: "Bridging the gap between merchants and developers through open documentation, REST API guides, and community forum discussions.",
    avatar: "https://i.pravatar.cc/150?img=47"
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
      <main className="min-h-screen bg-[#FAF9F6]">
        
        {/* Hero Section */}
        <div className="relative pt-16 pb-20 px-5 text-center overflow-hidden bg-[#f0f1f3] rounded-b-[4rem] border-b-[6px] border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[var(--color-brand)]/10 to-transparent" />

          {/* Hero Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mx-auto mb-6 flex max-w-fit items-center gap-2.5 rounded-full border border-[var(--color-line)] bg-white p-1.5 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="relative flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15" style={{ animationDuration: "2s" }} />
              <img src="/icons/user.svg" alt="Users" className="size-3.5 object-contain" />
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
                className="relative overflow-hidden rounded-[24px] border border-[#D4D4D4] hover:border-[var(--color-brand)] bg-white p-8 md:p-10 transition-all duration-300 cursor-pointer group text-left"
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
                className="relative overflow-hidden rounded-[24px] border border-[#D4D4D4] hover:border-[var(--color-brand)] bg-white p-8 md:p-10 transition-all duration-300 cursor-pointer group text-left"
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
        <section className="py-24 border-y border-[var(--color-line)] bg-[#f3f4f6]/40 relative overflow-hidden">
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
              <div className="relative border-l border-[#D4D4D4] ml-3 md:ml-4 pl-8 md:pl-10 space-y-12 py-4">
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
                    <div className="absolute -left-[48px] md:-left-[60px] top-1 flex size-8 md:size-10 items-center justify-center rounded-full bg-[var(--color-brand)] text-white ring-8 ring-[#FAF9F6] transition-transform group-hover:scale-110 shadow-sm">
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

          <div className="grid gap-6 md:grid-cols-3">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="relative overflow-hidden rounded-[24px] border border-[#D4D4D4] hover:border-[var(--color-brand)] bg-white transition-all duration-300 group flex flex-col text-left cursor-pointer"
              >
                {/* Background Dots Gradient */}
                <div className="pointer-events-none absolute bottom-0 right-0 w-2/3 h-1/2 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_bottom_right,black_0%,transparent_80%)] opacity-80 transition-opacity duration-300" />
                
                {/* Edge-to-edge Image Section (Video/Blog Styled) */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-[#D4D4D4]/60 shrink-0 z-10">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Section */}
                <div className="relative z-10 flex flex-col flex-1 p-6">
                  <span className="text-[12px] font-bold text-[var(--color-brand)]">
                    {member.role}
                  </span>
                  
                  <h3 className="mt-2 flex items-center gap-2 text-[18px] md:text-[20px] font-bold tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand)] leading-snug">
                    {member.name}
                    <img src="/icons/domain.svg" alt="" className="size-4 object-contain brightness-0 opacity-40 transition-opacity group-hover:opacity-100" />
                  </h3>

                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-[var(--color-muted)] font-medium">
                    {member.bio}
                  </p>

                  {/* Social & Email Links */}
                  <div className="mt-6 flex items-center gap-4 pt-4 border-t border-[#D4D4D4]/50 relative z-20">
                    <a href="#" aria-label="Email" className="text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </a>
                    <a href="#" aria-label="Twitter / X" className="text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                    </a>
                    <a href="#" aria-label="LinkedIn" className="text-[var(--color-muted)] hover:text-[var(--color-brand)] transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
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
            className="bg-white border border-[#D4D4D4] rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden"
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
