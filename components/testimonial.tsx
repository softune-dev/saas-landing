"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    text: "We stopped rebuilding storefronts from scratch. Softune gave us themes, tenant isolation, and a dashboard the merchants actually understand — so the team ships brands, not glue code.",
    name: "Ayesha Rahman",
    role: "Founder, Studio Partner",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    text: "Softune’s analytics and POS integrations saved us dozens of hours a week. The ability to manage our inventory in real-time across multiple channels is a complete game-changer.",
    name: "Marcus Chen",
    role: "Operations Director",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    text: "Setting up our store was incredibly fast, and the built-in SEO tools helped us rank within weeks. I’ve never used an ecommerce platform that feels this tailored for growing businesses.",
    name: "Sarah Jenkins",
    role: "E-commerce Manager",
    avatar: "https://i.pravatar.cc/150?img=5"
  }
];

const slideVariants = {
  initial: (dir: number) => ({ opacity: 0, x: dir * 30, filter: "blur(4px)" }),
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (dir: number) => ({ opacity: 0, x: dir * -30, filter: "blur(4px)" }),
};

export function Testimonial() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-5 md:px-8 md:py-28">
      <div className="mx-auto mb-10 flex flex-col items-center text-center md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white p-1 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:mb-6 md:gap-3 md:p-1.5 md:pr-4"
        >
          <div className="relative flex size-5 items-center justify-center rounded-full bg-[var(--color-brand)]/10 md:size-6">
            <span
              className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
              style={{ animationDuration: "2s" }}
            />
            <img
              src="/icons/chat.svg"
              alt=""
              className="relative z-10 size-3 object-contain md:size-3.5"
            />
          </div>
          <span className="text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
            Testimonials
          </span>
        </motion.div>

        <h2 className="max-w-3xl text-3xl leading-[1.2] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.15] md:text-5xl">
          Loved By Fast-Growing{" "}
          <span className="relative ml-0.5 inline-block px-3 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
            <span className="absolute inset-0 -rotate-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
            <em className="relative not-italic text-white">Brands</em>
          </span>
        </h2>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] sm:mt-6 sm:text-[17px] md:text-[18px]">
          See what our merchants have to say about building with Softune.
        </p>
      </div>

      <div className="relative mx-auto max-w-5xl px-11 text-center sm:px-16 md:px-32">
        <button
          type="button"
          onClick={handlePrev}
          className="absolute top-1/2 left-0 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4D4D4] bg-white text-[var(--color-ink)] shadow-sm transition-all hover:border-[var(--color-ink)] hover:bg-[#FAFAFA] hover:shadow-md active:scale-95 md:left-4 md:size-12"
          aria-label="Previous testimonial"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="size-4 md:size-5"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute top-1/2 right-0 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4D4D4] bg-white text-[var(--color-ink)] shadow-sm transition-all hover:border-[var(--color-ink)] hover:bg-[#FAFAFA] hover:shadow-md active:scale-95 md:right-4 md:size-12"
          aria-label="Next testimonial"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="size-4 md:size-5"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <div className="relative w-full min-h-[420px] sm:min-h-[280px] md:min-h-[240px] lg:min-h-[220px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center justify-center"
            >
              <p className="font-display text-[1.25rem] leading-snug text-[var(--color-ink)] sm:text-3xl md:text-[2.15rem]">
                “{testimonials[index].text}”
              </p>

              <footer className="mt-6 flex items-center justify-center gap-3 sm:mt-8 sm:gap-4 md:mt-10">
                <img
                  src={testimonials[index].avatar}
                  alt={testimonials[index].name}
                  className="size-11 rounded-full border border-[#D4D4D4] object-cover shadow-sm sm:size-12 md:size-14"
                />
                <div className="flex flex-col justify-center text-left">
                  <p className="text-[15px] leading-tight font-bold text-[var(--color-ink)] md:text-[16px]">
                    {testimonials[index].name}
                  </p>
                  <p className="mt-1 text-[13px] leading-tight text-[var(--color-muted)] md:text-[14.5px]">
                    {testimonials[index].role}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
