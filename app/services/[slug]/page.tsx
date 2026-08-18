"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Testimonial } from "@/components/testimonial";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Tag, ChevronRight, HelpCircle } from "lucide-react";

import { SERVICES_PAGES, SERVICES_LIST } from "@/lib/services-data";
import { Button } from "@/components/ui/button";

export default function ServicePage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  
  const service = SERVICES_PAGES[slug] || SERVICES_PAGES["store-setup"];
  const otherServices = SERVICES_LIST.map(s => SERVICES_PAGES[s.slug] || s);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAF9F6]">
        
        {/* Hero Section (Changelog Inspired) */}
        <div className="relative pt-12 pb-14 px-5 text-center overflow-hidden bg-[#f0f1f3] rounded-b-[4rem] border-b-[6px] border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)]">
          {/* Masked Grid Layer */}
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_20%_40%,transparent_0%,black_60%)]" />
          
          {/* Bottom Gradient Fade */}
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
              <img src={service.icon} alt="Icon" className="size-3.5 object-contain" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              {service.subtitle}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-[var(--color-ink)] mb-6 flex justify-center items-center flex-wrap gap-x-2 gap-y-3"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {service.title.split(' ').slice(0, -1).join(' ')}
            <span className="relative inline-block px-3 py-1 mx-1">
              <span className="absolute inset-0 -rotate-2 rounded-lg bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">{service.title.split(' ').slice(-1)}</em>
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="relative z-10 text-[16px] md:text-lg text-[var(--color-muted)] font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {service.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="relative z-10 flex flex-wrap justify-center gap-4 pt-8"
          >
            <Button as="a" href="#contact" variant="primary" className="px-7 py-3.5 text-[15px] font-bold shadow-sm">
              Book This Service
              <ArrowRight className="size-4" />
            </Button>
            <Button as="a" href="#process" variant="outline" className="px-7 py-3.5 text-[15px] font-bold shadow-sm border-[#D4D4D4]">
              View Our Process
            </Button>
          </motion.div>
        </div>

        {/* "What's Included" Cards Section - Modern Neo-Minimalist Grid */}
        <section className="py-24 bg-[#FAF9F6] border-b border-[var(--color-line)]">
          <div className="mx-auto max-w-7xl px-5 md:px-8">


            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {service.features.map((feat, idx) => (
                <motion.article
                  key={idx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="relative overflow-hidden rounded-[24px] border border-[#D4D4D4] hover:border-[var(--color-brand)] bg-white p-8 md:p-10 transition-all duration-300 cursor-pointer group text-left"
                >
                  {/* Background Dots Gradient */}
                  <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-2/3 bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_80%)] opacity-80" />

                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-brand)] p-1.5 transition-transform duration-300 group-hover:scale-110">
                      <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm">
                        <img
                          src={feat.icon}
                          alt=""
                          className="size-5 object-contain brightness-0 invert"
                        />
                      </div>
                    </div>
                    <h3 className="mt-6 text-[18px] md:text-[20px] font-extrabold tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-brand)]">
                      {feat.title}
                    </h3>
                    <p className="mt-3 text-[15px] md:text-[16px] leading-relaxed text-[var(--color-muted)]">
                      {feat.desc}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* "Our Process" Timeline Section */}
        <section id="process" className="py-24 bg-white border-b border-[var(--color-line)] overflow-hidden">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-col items-center text-center mx-auto mb-20">
              <h2 className="max-w-2xl font-extrabold tracking-tight text-4xl sm:text-5xl leading-[1.1] text-[var(--color-ink)]">
                Our Proven Work{" "}
                <span className="relative inline-block whitespace-nowrap px-4 py-0.5 mx-1">
                  <span className="absolute inset-0 -rotate-2 top-1 rounded-xl bg-[var(--color-brand)] shadow-sm" />
                  <em className="relative not-italic text-white">Process</em>
                </span>
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
              {service.process.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative space-y-4 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-black text-[var(--color-brand)]/15 select-none transition-colors group-hover:text-[var(--color-brand)]/35">
                      {step.step}
                    </span>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-[var(--color-line)] to-transparent group-hover:from-[var(--color-brand)]/40 transition-colors hidden lg:block" />
                  </div>
                  <div>
                    <h4 className="text-[18px] font-bold tracking-tight text-[var(--color-ink)]">
                      {step.title}
                    </h4>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-muted)] font-medium">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Service Navigation - Bottom Grid */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-5 md:px-8 text-center">
            <h2 className="max-w-2xl mx-auto font-extrabold tracking-tight text-4xl sm:text-5xl leading-[1.1] text-[var(--color-ink)] mb-16">
              Explore Other
              <span className="relative inline-block whitespace-nowrap px-4 py-0.5 mx-1">
                <span className="absolute inset-0 -rotate-2 top-1 rounded-xl bg-[var(--color-brand)] shadow-sm" />
                <em className="relative not-italic text-white">Services</em>
              </span>
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 text-left">
              {otherServices.map((s, idx) => {
                const isActive = s.slug === service.slug;
                return (
                  <motion.div
                    key={s.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    onClick={() => {
                      if (isActive) {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        router.push(`/services/${s.slug}`);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={`relative overflow-hidden rounded-[24px] border ${
                      isActive 
                        ? "border-[var(--color-brand)] ring-1 ring-[var(--color-brand)] shadow-md"
                        : "border-[#D4D4D4] hover:border-[var(--color-brand)] bg-white"
                    } bg-white p-6 transition-all duration-300 cursor-pointer group flex flex-col justify-between`}
                  >
                    <div className="pointer-events-none absolute top-0 right-0 w-full h-full bg-dot-grid-dense [mask-image:radial-gradient(circle_at_top_right,black_0%,transparent_70%)] opacity-80" />

                    <div className="relative z-10 flex flex-col items-start space-y-4">
                      <div className={`inline-flex items-center justify-center rounded-full border border-dashed p-1.5 transition-transform duration-300 ${
                        isActive ? "border-[var(--color-brand)] scale-110" : "border-[var(--color-brand)] group-hover:scale-110"
                      }`}>
                        <div className="flex size-9 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm">
                          <img src={s.icon} alt="" className="size-4 object-contain brightness-0 invert" />
                        </div>
                      </div>
                      <div>
                        <h3 className={`text-[16px] font-extrabold tracking-tight transition-colors ${
                          isActive ? "text-[var(--color-brand)]" : "text-[var(--color-ink)] group-hover:text-[var(--color-brand)]"
                        }`}>
                          {s.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonial & Contact */}
        <Testimonial />
        <Faq />
        <Contact />

      </main>
      <Footer />
    </>
  );
}
