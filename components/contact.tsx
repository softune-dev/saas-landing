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
    <section
      id="contact"
      className="mx-auto max-w-7xl overflow-x-clip px-4 py-14 sm:px-5 md:px-8 md:py-32"
    >
      <div className="grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:mb-6 md:gap-3 md:p-1.5 md:pr-4"
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
              Contact Us
            </span>
          </motion.div>

          <h2 className="text-3xl leading-[1.2] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.15]">
            Let&apos;s build something <br />
            <span className="relative mt-2 inline-block px-2.5 py-0.5 sm:whitespace-nowrap sm:px-4">
              <span className="absolute inset-0 -rotate-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">extraordinary.</em>
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] sm:mt-6 sm:text-[17px]">
            Whether you need custom development, migration assistance, or just have a few questions, our team is ready to help you succeed on Softune.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 md:gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative overflow-hidden p-6 rounded-[20px] border border-[var(--color-line)] bg-[var(--color-canvas)] transition-all hover:bg-[var(--color-surface)] hover:border-[var(--color-brand)] shadow-sm hover:shadow-md flex flex-col items-start"
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
          className="w-full min-w-0 max-w-full rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 shadow-xl shadow-[var(--color-brand)]/5 sm:rounded-[2.5rem] sm:p-8 sm:shadow-2xl md:p-12"
        >
          <h3 className="mb-6 text-xl font-extrabold tracking-tight text-[var(--color-ink)] sm:mb-8 sm:text-2xl">
            Send us a message
          </h3>

          <form
            className="flex flex-col gap-5 sm:gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[var(--color-ink)]">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  required
                  className="min-h-12 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-brand)]/10"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[var(--color-ink)]">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  required
                  className="min-h-12 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-brand)]/10"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[var(--color-ink)]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@company.com"
                required
                className="min-h-12 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-brand)]/10"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[var(--color-ink)]">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="min-h-12 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-brand)]/10"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[var(--color-ink)]">
                Message
              </label>
              <textarea
                rows={4}
                required
                placeholder="How can we help you?"
                className="resize-none rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] px-4 py-3.5 text-[15px] font-medium outline-none transition-all focus:border-[var(--color-brand)] focus:bg-[var(--color-surface)] focus:ring-4 focus:ring-[var(--color-brand)]/10"
              />
            </div>

            <div className="mt-1 flex items-center gap-3 sm:mt-2">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  id="verify-human"
                  required
                  className="peer size-5 cursor-pointer appearance-none rounded-[6px] border-2 border-[var(--color-line)] bg-[var(--color-canvas)] transition-all checked:border-[var(--color-brand)] checked:bg-[var(--color-brand)] hover:border-[var(--color-muted)]"
                />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  className="pointer-events-none absolute size-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <label
                htmlFor="verify-human"
                className="cursor-pointer text-[14px] font-bold text-[var(--color-ink)] select-none sm:text-[14.5px]"
              >
                I am human (Verify)
              </label>
            </div>

            <Button
              type="submit"
              className="animate-shine mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-brand)] py-5 text-[15px] font-extrabold text-white shadow-lg shadow-[var(--color-brand)]/20 hover:opacity-90 sm:mt-4 sm:py-6"
            >
              Send Message
              <img
                src="/icons/send.svg"
                alt=""
                className="size-5 object-contain brightness-0 invert"
              />
            </Button>
          </form>
        </motion.div>
        
      </div>
    </section>
  );
}
