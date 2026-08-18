"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const themes = [
  {
    name: "Aurora",
    vibe: "Fashion editorial",
    description:
      "A minimalist, high-end editorial layout designed to put your photography center stage. Perfect for fashion, jewelry, and luxury brands.",
    color: "#1c1917",
    surface: "#faf9f6",
    image: "/theme_aurora.jpg",
  },
  {
    name: "Bazaar",
    vibe: "General marketplace",
    description:
      "A clean, data-dense interface built for massive catalogs. Features advanced filtering, bold categories, and high-conversion product grids.",
    color: "#2563EB",
    surface: "#f8fafc",
    image: "/theme_bazaar.jpg",
  },
  {
    name: "Mishthan",
    vibe: "Bakery & sweets",
    description:
      "Warm, inviting, and deliciously crafted. Uses soft tones and elegant typography to make your food and artisanal products irresistible.",
    color: "#DC5200",
    surface: "#faf5ef",
    image: "/themes/mishthan.webp",
  },
];

export function Themes() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section id="themes" className="mx-auto max-w-[1400px] px-5 py-20 md:px-8">
      <div className="flex flex-col items-center text-center mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-4 inline-flex items-center gap-2 md:gap-3 rounded-full border border-[var(--color-line)] bg-white p-1 md:p-1.5 pr-3 md:pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <div className="relative flex size-5 md:size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
            <span
              className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
              style={{ animationDuration: "2s" }}
            />
            <img
              src="/icons/themes.svg"
              alt="Themes"
              className="size-3 md:size-3.5 object-contain"
            />
          </div>
          <span className="text-[13px] md:text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
            Templates
          </span>
        </motion.div>

        <h2 className=" max-w-2xl font-extrabold tracking-tight text-4xl leading-[1.1] text-[var(--color-ink)] sm:text-5xl md:text-6xl">
          Trendy Themes for Every{""}
          <span className="relative inline-block whitespace-nowrap px-4 py-0.5 ml-1">
            <span className="absolute inset-0 -rotate-1 rounded-xl top-2 bg-[var(--color-brand)] shadow-sm" />
            <em className="relative not-italic text-white">Business</em>
          </span>
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)] font-medium md:text-[17px] lg:text-lg">
          Select from professionally designed themes that match your brand.
          Customize colors, layouts, and content—no coding required.
        </p>
      </div>

      <div 
        ref={carouselRef}
        className="mt-10 flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10"
      >
        {themes.map((t, i) => (
          <motion.article
            key={t.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group flex flex-col shrink-0 snap-start w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[calc(33.333%-1rem)]"
          >
            {/* Massive Browser Window */}
            <div className="relative w-full h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white shadow-[0_24px_60px_-15px_rgba(0,0,0,0.1)] transition-transform duration-500 flex flex-col">
              {/* Browser Header */}
              <div className="flex items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-[#ff5f57]" />
                  <span className="size-3 rounded-full bg-[#febc2e]" />
                  <span className="size-3 rounded-full bg-[#28c840]" />
                  <div className="ml-3 flex-1 rounded-md bg-white border border-[var(--color-line)] h-6 min-w-[120px] max-w-[200px] flex items-center px-2 hidden sm:flex">
                    <span className="text-[10px] text-[var(--color-muted)] font-medium truncate">
                      {t.name.toLowerCase()}.softune.com
                    </span>
                  </div>
                </div>
                <div className="group/link flex items-center justify-center cursor-pointer">
                  <div 
                    className="size-5 bg-[var(--color-ink)] transition-colors group-hover/link:bg-[var(--color-brand)]"
                    style={{
                      WebkitMaskImage: 'url(/icons/arrow-link.svg)',
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                    }}
                  />
                </div>
              </div>

              {/* Browser Content (Solid Placeholder) */}
              <div 
                className="relative w-full flex-1"
                style={{ backgroundColor: t.surface }}
              />

              {/* Bottom Dark Overlay & Title */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 flex items-center gap-3 cursor-pointer">
                <h3 className="text-4xl md:text-5xl text-white drop-shadow-md transition-colors group-hover:text-[var(--color-brand)]" style={{ fontFamily: "var(--font-niconne)" }}>
                  {t.name}
                </h3>
                <div 
                  className="mt-2 size-6 bg-white transition-all duration-300 group-hover:translate-x-2 group-hover:bg-[var(--color-brand)]"
                  style={{
                    WebkitMaskImage: 'url(/icons/arrow-right.svg)',
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                  }}
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button as="a" href="#all-themes" variant="primary" className="group flex items-center gap-2 px-8 py-4 text-[15px] font-bold rounded-full transition-all">
          View all themes
          <img 
            src="/icons/arrow-right.svg" 
            alt="" 
            className="size-4 object-contain brightness-0 invert transition-transform group-hover:translate-x-1" 
          />
        </Button>
      </div>
    </section>
  );
}
