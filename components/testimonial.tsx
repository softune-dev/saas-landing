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
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mx-auto mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-6 inline-flex items-center gap-2 md:gap-3 rounded-full border border-[var(--color-line)] bg-white p-1 md:p-1.5 pr-3 md:pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        >
          <div className="relative flex size-5 md:size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/10">
            <span
              className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
              style={{ animationDuration: "2s" }}
            />
            <img src="/icons/chat.svg" alt="" className="size-3 md:size-3.5 object-contain relative z-10" />
          </div>
          <span className="text-[13px] md:text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
            Testimonials
          </span>
        </motion.div>

        <h2 className="max-w-3xl font-extrabold tracking-tight text-4xl leading-[1.15] text-[var(--color-ink)] sm:text-5xl md:text-5xl">
          Loved By Fast-Growing{" "}
          <span className="relative inline-block whitespace-nowrap px-4 py-0.5 ml-1">
            <span className="absolute inset-0 -rotate-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
            <em className="relative not-italic text-white">Brands</em>
          </span>
        </h2>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--color-muted)] font-medium md:text-[18px]">
          See what our merchants have to say about building with Softune.
        </p>
      </div>

      <div className="mx-auto max-w-5xl text-center relative px-8 sm:px-16 md:px-32">
        
        {/* Navigation Arrows at Sides */}
        <button 
          onClick={handlePrev}
          className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 flex size-10 md:size-12 items-center justify-center rounded-full border border-[#D4D4D4] bg-white text-[var(--color-ink)] shadow-sm transition-all hover:bg-[#FAFAFA] hover:border-[var(--color-ink)] hover:shadow-md active:scale-95 z-10"
          aria-label="Previous testimonial"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-4 md:size-5" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 flex size-10 md:size-12 items-center justify-center rounded-full border border-[#D4D4D4] bg-white text-[var(--color-ink)] shadow-sm transition-all hover:bg-[#FAFAFA] hover:border-[var(--color-ink)] hover:shadow-md active:scale-95 z-10"
          aria-label="Next testimonial"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-4 md:size-5" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Fixed height container to prevent layout shift */}
        <div className="relative w-full min-h-[380px] sm:min-h-[260px] md:min-h-[240px] lg:min-h-[220px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10"
            >
              <p className="font-display text-2xl leading-snug text-[var(--color-ink)] sm:text-3xl md:text-[2.15rem]">
                “{testimonials[index].text}”
              </p>
              
              <footer className="mt-8 md:mt-10 flex items-center justify-center gap-4">
                <img 
                  src={testimonials[index].avatar} 
                  alt={testimonials[index].name} 
                  className="size-12 md:size-14 rounded-full object-cover border border-[#D4D4D4] shadow-sm"
                />
                <div className="text-left flex flex-col justify-center">
                  <p className="text-[15px] md:text-[16px] font-bold text-[var(--color-ink)] leading-tight">
                    {testimonials[index].name}
                  </p>
                  <p className="mt-1 text-[13.5px] md:text-[14.5px] text-[var(--color-muted)] leading-tight">
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
