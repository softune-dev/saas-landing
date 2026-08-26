"use client";

import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const assets = [
  {
    title: "Logo on Light",
    desc: "Dark Softune wordmark for white and light backgrounds.",
    preview: "/logo-dark.png",
    bg: "bg-white",
    downloads: [
      { label: "PNG", href: "/logo-dark.png" },
    ],
  },
  {
    title: "Logo on Dark",
    desc: "White Softune wordmark for dark or brand-colored backgrounds.",
    preview: "/logo-white.png",
    bg: "bg-[var(--color-ink)]",
    downloads: [
      { label: "PNG", href: "/logo-white.png" },
    ],
  },
  {
    title: "Favicon",
    desc: "Browser tab icon for Softune sites and apps.",
    preview: "/favicon.ico",
    bg: "bg-white",
    downloads: [
      { label: "ICO", href: "/favicon.ico" },
    ],
  },
];

const colors = [
  { name: "Brand Orange", hex: "#FF5733", var: "--color-brand", usage: "CTAs, highlights, interactive elements" },
  { name: "Ink Black", hex: "#0F0F0F", var: "--color-ink", usage: "Headings, body text, icons" },
  { name: "Muted Grey", hex: "#6B7280", var: "--color-muted", usage: "Subtext, captions, placeholders" },
  { name: "Surface White", hex: "#FAF9F6", var: "--color-bg", usage: "Page backgrounds, card fills" },
  { name: "Border Line", hex: "#D4D4D4", var: "--color-line", usage: "Card borders, dividers, separators" },
];

const guidelines = [
  {
    icon: "/icons/lock.svg",
    title: "Don't Alter the Logo",
    desc: "Never stretch, rotate, recolor, or add effects to the Softune logo. Use only the provided files.",
  },
  {
    icon: "/icons/zap.svg",
    title: "Maintain Clear Space",
    desc: "Always provide adequate white space around the logo equal to the height of the 'S' in Softune.",
  },
  {
    icon: "/icons/user.svg",
    title: "Use Approved Colors",
    desc: "Only display the logo in its approved colors. Do not place it on busy backgrounds or conflicting hues.",
  },
  {
    icon: "/icons/help-desk.svg",
    title: "Ask Before Publishing",
    desc: "For editorial, advertising, or partnership use, please reach out to hello@softune.xyz first.",
  },
];

const typography = [
  { name: "Outfit", weight: "Black 900", usage: "Hero headings, section titles", sample: "Aa" },
  { name: "Inter", weight: "Semibold 600", usage: "Sub-headings, labels, navigation", sample: "Aa" },
  { name: "Inter", weight: "Medium 500", usage: "Body text, descriptions, captions", sample: "Aa" },
];

export default function BrandKitPage() {
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
              <img src="/icons/domain.svg" alt="" className="size-3.5 object-contain dark:invert" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">Brand Assets</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Softune
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Brand Kit</em>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Official logos, color palettes, and typography guidelines for press, partners, and integrations. Please review usage guidelines before publishing.
          </motion.p>
        </div>

        {/* Logo Downloads */}
        <section className="pt-24 pb-12 max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl" style={{ fontFamily: "var(--font-outfit)" }}>
              Logo{" "}
              <span className="relative inline-block px-3 py-0.5 mx-1">
                <span className="absolute inset-0 -rotate-1 rounded-lg bg-[var(--color-brand)]" />
                <em className="relative not-italic text-white">Assets</em>
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {assets.map((asset, idx) => (
              <motion.div
                key={asset.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="relative overflow-hidden rounded-[24px] border border-[var(--color-line)] hover:border-[var(--color-brand)] bg-[var(--color-surface)] transition-all duration-300 group flex flex-col"
              >
                {/* Preview */}
                <div className={`relative flex items-center justify-center aspect-video w-full border-b border-[var(--color-line)]/60 ${asset.bg}`}>
                  <img
                    src={asset.preview}
                    alt={asset.title}
                    className="h-12 w-auto object-contain"
                  />
                </div>

                {/* Content */}
                <div className="relative p-6 flex flex-col flex-1">
                  <div className="pointer-events-none absolute bottom-0 right-0 w-2/3 h-1/2 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_bottom_right,black_0%,transparent_80%)] opacity-80" />
                  <div className="relative z-10">
                    <h3 className="text-[17px] font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors">
                      {asset.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-muted)] font-medium flex-1">
                      {asset.desc}
                    </p>
                    <div className="mt-5 flex gap-3">
                      {asset.downloads.map((dl) => (
                        <a
                          key={dl.label}
                          href={dl.href}
                          download
                          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] text-[var(--color-ink)] text-[13px] font-bold px-4 py-2 transition-all duration-200"
                        >
                          <img src="/icons/save.svg" alt="" className="size-3.5 object-contain opacity-60 dark:invert" />
                          {dl.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Color Palette */}
        <section className="py-24 border-t border-[var(--color-line)] max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl" style={{ fontFamily: "var(--font-outfit)" }}>
              Color{" "}
              <span className="relative inline-block px-3 py-0.5 mx-1">
                <span className="absolute inset-0 -rotate-1 rounded-lg bg-[var(--color-brand)]" />
                <em className="relative not-italic text-white">Palette</em>
              </span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {colors.map((color, idx) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="relative overflow-hidden rounded-[24px] border border-[var(--color-line)] hover:border-[var(--color-brand)] bg-[var(--color-surface)] transition-all duration-300 group cursor-pointer flex flex-col"
              >
                {/* Color Swatch */}
                <div
                  className="h-24 w-full rounded-t-[22px] transition-transform duration-300 group-hover:scale-[1.03]"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="p-5 relative">
                  <div className="pointer-events-none absolute bottom-0 right-0 w-2/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_bottom_right,black_0%,transparent_80%)] opacity-60" />
                  <div className="relative z-10">
                    <p className="text-[15px] font-bold text-[var(--color-ink)]">{color.name}</p>
                    <p className="mt-1 text-[13px] font-mono text-[var(--color-muted)]">{color.hex}</p>
                    <p className="mt-2 text-[12px] leading-relaxed text-[var(--color-muted)] font-medium">{color.usage}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="py-24 border-y border-[var(--color-line)] bg-[var(--color-canvas)]/40 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)] opacity-5" />
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl" style={{ fontFamily: "var(--font-outfit)" }}>
                Type{" "}
                <span className="relative inline-block px-3 py-0.5 mx-1">
                  <span className="absolute inset-0 -rotate-1 rounded-lg bg-[var(--color-brand)]" />
                  <em className="relative not-italic text-white">System</em>
                </span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {typography.map((type, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="relative overflow-hidden rounded-[24px] border border-[var(--color-line)] hover:border-[var(--color-brand)] bg-[var(--color-surface)] p-8 transition-all duration-300 group text-left"
                >
                  <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)] opacity-80" />
                  <div className="relative z-10">
                    <p
                      className="text-6xl font-black text-[var(--color-brand)] leading-none mb-6"
                      style={{ fontFamily: type.name === "Outfit" ? "var(--font-outfit)" : "inherit" }}
                    >
                      {type.sample}
                    </p>
                    <p className="text-[18px] font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors">{type.name}</p>
                    <p className="mt-1 text-[13px] font-semibold text-[var(--color-brand)] uppercase tracking-widest">{type.weight}</p>
                    <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-muted)] font-medium">{type.usage}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="py-24 max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)] md:text-5xl" style={{ fontFamily: "var(--font-outfit)" }}>
              Usage{" "}
              <span className="relative inline-block px-3 py-0.5 mx-1">
                <span className="absolute inset-0 -rotate-1 rounded-lg bg-[var(--color-brand)]" />
                <em className="relative not-italic text-white">Guidelines</em>
              </span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {guidelines.map((guide, idx) => (
              <motion.div
                key={guide.title}
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
                      <img src={guide.icon} alt="" className="size-5 object-contain brightness-0 invert" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-[17px] font-bold text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors">
                    {guide.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-muted)] font-medium">
                    {guide.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24 max-w-7xl mx-auto px-5 md:px-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="pointer-events-none absolute top-0 right-0 w-1/3 h-full bg-dot-grid-dense [mask-image:radial-gradient(ellipse_at_top_right,black_0%,transparent_70%)] opacity-80" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-ink)] mb-4" style={{ fontFamily: "var(--font-outfit)" }}>
                Need Something Specific?
              </h3>
              <p className="text-[15.5px] leading-relaxed text-[var(--color-muted)] font-medium mb-8">
                If you need additional formats, high-resolution files, or have a specific brand partnership in mind, reach out to us directly.
              </p>
              <Button variant="primary" as="a" href="mailto:hello@softune.xyz" className="px-8 py-3.5 font-bold gap-2">
                Contact Brand Team
                <img src="/icons/arrow-right.svg" alt="" className="size-4 object-contain brightness-0 invert" />
              </Button>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
