"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Clock, Award, PlayCircle } from "lucide-react";

const tutorialsDataEn = [
  {
    title: "Complete Store Setup in 10 Minutes",
    category: "Getting Started",
    icon: "/icons/book.svg",
    duration: "10:24",
    level: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    desc: "A full walk-through showing how to link a domain, add catalog items, connect payment methods, and make your first sandbox test checkout.",
  },
  {
    title: "Designing a Bespoke Homepage Layout",
    category: "Design & Layout",
    icon: "/icons/color.svg",
    duration: "15:45",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    desc: "Learn how to use Softunebd's dashboard grid editor to customize typography, configure colors, and organize sections for optimal conversion.",
  },
  {
    title: "Setting Up Schema & SEO Metadata",
    category: "Marketing & Growth",
    icon: "/icons/analytics.svg",
    duration: "08:12",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80",
    desc: "A developer guide showing how to map structured data schemas, crawl-proof sitemaps, and write conversion-focused titles on products.",
  },
  {
    title: "Courier Automations & Logistics Sync",
    category: "Getting Started",
    icon: "/icons/delivery.svg",
    duration: "12:30",
    level: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    desc: "How to open Softunebd Couriers, connect Steadfast, Pathao, RedX, or eCourier, review the partner roster, and keep order status in sync as you fulfill.",
  },
  {
    title: "Running A/B Sales & Cart Recovery",
    category: "Marketing & Growth",
    icon: "/icons/analytics.svg",
    duration: "14:18",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    desc: "Optimize checkout rates using automated email chains for abandoned items and setup discount tags to retain buyers.",
  },
  {
    title: "Advanced Theme Tweaks with Custom CSS",
    category: "Design & Layout",
    icon: "/icons/color.svg",
    duration: "18:05",
    level: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    desc: "Tweak variables and write custom styles to adjust cart drawer animations, hover effects, and navigation bar details.",
  },
];

export default function TutorialsPage({ locale = "en" }: { locale?: "en" | "bn" }) {
  const isBn = locale === "bn";
  const tutorialsData = tutorialsDataEn; // Keep core tutorials data structured
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { label: "All", icon: "/icons/play.svg" },
    { label: "Getting Started", icon: "/icons/book.svg" },
    { label: "Design & Layout", icon: "/icons/color.svg" },
    { label: "Marketing & Growth", icon: "/icons/analytics.svg" },
  ];

  const filteredTutorials = tutorialsData.filter(
    (tut) => activeCategory === "All" || tut.category === activeCategory,
  );

  return (
    <>
      <Header locale={locale} />
      <main className="min-h-screen bg-[var(--color-canvas)]">
        {/* Hero Section */}
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
              <img src="/icons/play.svg" alt="Play" className="size-3.5 object-contain dark:invert" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              {isBn ? "ভিডিও টিউটোরিয়াল" : "Learn Softunebd Visually"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: "var(--font-heading), var(--font-bn)" }}
          >
            {isBn ? (
              <>
                ভিডিও গাইড ও{" "}
                <span className="relative inline-block px-3 py-1 mx-1">
                  <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
                  <em className="relative not-italic text-white">টিউটোরিয়াল</em>
                </span>
              </>
            ) : (
              <>
                Video Guides &
                <span className="relative inline-block px-3 py-1 mx-1">
                  <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
                  <em className="relative not-italic text-white">Tutorials</em>
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {isBn
              ? "ধাপে ধাপে ভিডিও টিউটোরিয়াল দেখুন কীভাবে আপনার অনলাইন শপ সাজাবেন, ক্যাটাগরি যোগ করবেন এবং সেলস বৃদ্ধি করবেন।"
              : "Step-by-step video courses on how to customize your storefront, upload catalogs, optimize checkouts, and run high-converting marketing campaigns."}
          </motion.p>
        </div>

        {/* Content Section */}
        <section className="py-14 max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`px-5 py-2.5 rounded-full text-[14px] font-bold tracking-tight transition-all duration-300 border border-transparent flex items-center gap-2 ${
                    isActive
                      ? "bg-[var(--color-brand)] text-white"
                      : "bg-[var(--color-line)] text-[var(--color-muted)] hover:bg-[var(--color-line)]/80 hover:text-[var(--color-ink)]"
                  }`}
                >
                  <img src={cat.icon} alt="" className={`size-4 object-contain ${isActive ? "brightness-0 invert" : "dark:invert"}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredTutorials.map((tut, i) => (
              <motion.article
                key={tut.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative overflow-hidden rounded-[24px] border border-[var(--color-line)] hover:border-[var(--color-brand)] bg-[var(--color-surface)] transition-all duration-300 group flex flex-col text-left cursor-pointer"
              >
                <div className="pointer-events-none absolute bottom-0 right-0 w-2/3 h-1/2 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_bottom_right,black_0%,transparent_80%)] opacity-30 transition-opacity duration-300 group-hover:opacity-60" />

                <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-[var(--color-line)]/60 shrink-0 z-10">
                  <img
                    src={tut.thumbnail}
                    alt={tut.title}
                    className="absolute inset-0 size-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/35 transition-colors">
                    <PlayCircle className="size-12 text-white/90 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <div className="absolute bottom-3 left-4 flex gap-2">
                    <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1">
                      <Clock className="size-3" />
                      {tut.duration}
                    </span>
                    <span className="bg-[var(--color-brand)] text-white px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 shadow-sm">
                      <Award className="size-3" />
                      {tut.level}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col flex-1 p-6">
                  <span className="text-[12px] font-bold text-[var(--color-brand)]">
                    {tut.category}
                  </span>

                  <h3 className="mt-2 text-[18px] md:text-[20px] font-extrabold tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand)] leading-snug">
                    {tut.title}
                  </h3>

                  <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-muted)]">
                    {tut.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
