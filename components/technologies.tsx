"use client";

import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

const techColors = [
  "#FF5A36", // Primary brand
  "#3178C6", // Blue
  "#10B981", // Emerald
  "#8B5CF6", // Violet
  "#F59E0B", // Amber
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#14B8A6", // Teal
];

export function Technologies() {
  return (
    <section className="bg-[#FAF9F6] py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
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
                src="/icons/zap.svg"
                alt=""
                className="size-3 md:size-3.5 object-contain"
              />
            </div>
            <span className="text-[13px] md:text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Powered By
            </span>
          </motion.div>

          <h2 className="max-w-3xl font-extrabold tracking-tight text-4xl leading-[1.1] text-[var(--color-ink)] sm:text-5xl md:text-6xl">
            Built with the Best
            <br />
            Modern{" "}
            <span className="relative inline-block whitespace-nowrap px-4 py-0.5 ml-1">
              <span className="absolute inset-0 -rotate-1 top-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">Technologies</em>
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-muted)] font-medium md:text-[17px] lg:text-lg">
            We use industry-leading tools and frameworks to ensure your store is blazing fast, secure, and infinitely scalable.
          </p>
        </div>
      </div>

      <div 
        className="mt-16 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
        }}
      >
        <Marquee autoFill={true} speed={40} className="overflow-hidden py-4">
          {techColors.map((color, i) => (
            <div
              key={i}
              className="mx-4 h-24 w-40 rounded-[24px] shadow-sm md:mx-6 md:h-32 md:w-56"
              style={{ backgroundColor: color }}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
