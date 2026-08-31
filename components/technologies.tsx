"use client";

import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import {
  SiFastapi,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiVercel,
  SiRedis,
  SiRabbitmq,
} from "react-icons/si";

const stack = [
  { name: "Next.js", color: "var(--color-ink)", Icon: SiNextdotjs },
  { name: "React", color: "#087EA4", Icon: SiReact },
  { name: "Python", color: "#3776AB", Icon: SiPython },
  { name: "FastAPI", color: "#009688", Icon: SiFastapi },
  { name: "Supabase", color: "#3ECF8E", Icon: SiSupabase },
  { name: "PostgreSQL", color: "#336791", Icon: SiPostgresql },
  { name: "Tailwind CSS", color: "#38B2AC", Icon: SiTailwindcss },
  { name: "Vercel", color: "var(--color-ink)", Icon: SiVercel },
  { name: "Redis", color: "#DC382D", Icon: SiRedis },
  { name: "RabbitMQ", color: "#FF6600", Icon: SiRabbitmq },
];

export function Technologies() {
  return (
    <section className="bg-[var(--color-canvas)] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:gap-3 md:p-1.5 md:pr-4"
          >
            <div className="relative flex size-5 items-center justify-center rounded-full bg-[var(--color-brand)]/10 md:size-6">
              <span
                className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                style={{ animationDuration: "2s" }}
              />
              <img
            loading="lazy"
            decoding="async"
                src="/icons/zap.svg"
                alt=""
                className="size-3 object-contain md:size-3.5 dark:invert"
              />
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
              Powered By
            </span>
          </motion.div>

          <h2 className="max-w-3xl text-3xl leading-[1.15] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.1] md:text-6xl">
            Built with the Best
            <br />
            Modern{" "}
            <span className="relative ml-0.5 inline-block px-2.5 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
              <span className="absolute inset-0 top-1.5 -rotate-1 rounded-xl bg-[var(--color-brand)] shadow-sm sm:top-2" />
              <em className="relative not-italic text-white">Technologies</em>
            </span>
          </h2>
        </div>
      </div>

      <div
        className="mt-10 overflow-hidden md:mt-16"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <Marquee autoFill={true} speed={40} className="overflow-hidden py-4">
          {stack.map((tech, i) => (
            <div
              key={i}
              className="mx-6 flex items-center gap-2.5 sm:mx-8 md:mx-10 md:gap-3"
            >
              <tech.Icon
                className="size-8 shrink-0 sm:size-10 md:size-12"
                style={{ color: tech.color }}
                aria-hidden
              />
              <span
                className="text-sm font-bold whitespace-nowrap sm:text-base md:text-xl"
                style={{ color: tech.color }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
