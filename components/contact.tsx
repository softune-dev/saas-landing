"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";

const cards = [
  {
    title: "Custom Development",
    desc: "Need bespoke features? We build custom themes and apps.",
    icon: "/icons/color.svg",
  },
  {
    title: "Installation Service",
    desc: "Let our experts set up and configure your store for you.",
    icon: "/icons/zap.svg",
  },
  {
    title: "Request Support",
    desc: "Having issues? Our support team is here to help 24/7.",
    icon: "/icons/help-desk.svg",
  },
  {
    title: "Documentation",
    desc: "Explore guides, API docs, and platform architecture.",
    icon: "/icons/book.svg",
  },
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left Side: Content & Cards */}
        <div>
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
              Contact Us
            </span>
          </motion.div>

          <h2 className="font-extrabold tracking-tight text-4xl leading-[1.15] text-[var(--color-ink)] sm:text-5xl">
            Let's build something <br/>
            <span className="relative inline-block whitespace-nowrap px-4 py-0.5 mt-2">
              <span className="absolute inset-0 -rotate-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">extraordinary.</em>
            </span>
          </h2>
          
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--color-muted)] font-medium">
            Whether you need custom development, migration assistance, or just have a few questions, our team is ready to help you succeed on Softune.
          </p>

          {/* Cards Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative overflow-hidden p-6 rounded-[20px] border border-[#D4D4D4] bg-[#FAFAFA] transition-all hover:bg-white hover:border-[var(--color-brand)] shadow-sm hover:shadow-md flex flex-col items-start"
              >
                <div className="absolute top-0 right-0 w-full h-full bg-dot-grid-dense [mask-image:radial-gradient(ellipse_at_top_right,black_0%,transparent_60%)] pointer-events-none opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative z-10">
                  <div className="mb-4 inline-flex items-center justify-center rounded-full border border-dashed border-[var(--color-brand)] p-1.5 transition-transform duration-300 group-hover:scale-110">
                    <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm">
                      <img
                        src={card.icon}
                        alt=""
                        className="size-4 object-contain brightness-0 invert"
                      />
                    </div>
                  </div>
                  <h3 className="font-bold text-[16px] text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-brand)] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[14px] text-[var(--color-muted)] leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Contact Form Container */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-[2.5rem] border border-[#D4D4D4] bg-white p-8 md:p-12 shadow-2xl shadow-[var(--color-brand)]/5"
        >
          <h3 className="text-2xl font-extrabold text-[var(--color-ink)] mb-8 tracking-tight">
            Send us a message
          </h3>
          
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[var(--color-ink)]">First Name</label>
                <input 
                  type="text" 
                  placeholder="John"
                  required
                  className="rounded-xl border border-[#D4D4D4] bg-[#FAFAFA] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-white focus:ring-4 focus:ring-[var(--color-brand)]/10"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[var(--color-ink)]">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe"
                  required
                  className="rounded-xl border border-[#D4D4D4] bg-[#FAFAFA] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-white focus:ring-4 focus:ring-[var(--color-brand)]/10"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[var(--color-ink)]">Email Address</label>
              <input 
                type="email" 
                placeholder="john@company.com"
                required
                className="rounded-xl border border-[#D4D4D4] bg-[#FAFAFA] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-white focus:ring-4 focus:ring-[var(--color-brand)]/10"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[var(--color-ink)]">Phone Number</label>
              <input 
                type="tel" 
                placeholder="+1 (555) 000-0000"
                className="rounded-xl border border-[#D4D4D4] bg-[#FAFAFA] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-white focus:ring-4 focus:ring-[var(--color-brand)]/10"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[var(--color-ink)]">Message</label>
              <textarea 
                rows={4}
                required
                placeholder="How can we help you?"
                className="resize-none rounded-xl border border-[#D4D4D4] bg-[#FAFAFA] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-white focus:ring-4 focus:ring-[var(--color-brand)]/10"
              />
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  id="verify-human"
                  required
                  className="peer size-5 appearance-none rounded-[6px] border-2 border-[#D4D4D4] bg-[#FAFAFA] transition-all checked:border-[var(--color-brand)] checked:bg-[var(--color-brand)] hover:border-[#A3A3A3] cursor-pointer"
                />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="pointer-events-none absolute size-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <label htmlFor="verify-human" className="text-[14.5px] font-bold text-[var(--color-ink)] cursor-pointer select-none">
                I am human (Verify)
              </label>
            </div>

            <Button 
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-6 text-[15px] font-extrabold animate-shine bg-[var(--color-brand)] text-white hover:opacity-90 shadow-lg shadow-[var(--color-brand)]/20"
            >
              Send Message
              <img src="/icons/send.svg" alt="" className="size-5 object-contain brightness-0 invert" />
            </Button>
          </form>
        </motion.div>
        
      </div>
    </section>
  );
}
