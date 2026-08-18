"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONTACT_OPTIONS = [
  {
    name: "WhatsApp",
    desc: "Typically replies in minutes",
    href: "https://wa.me/1234567890",
    color: "bg-[#25D366]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
      </svg>
    ),
  },
  {
    name: "Messenger",
    desc: "Chat with our support team",
    href: "https://m.me/softune",
    color: "bg-[#00B2FF]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-white">
        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.056-3.26-5.963 3.26 6.559-6.963 3.13 3.26 5.888-3.26-6.558 6.963z"/>
      </svg>
    ),
  },
  {
    name: "Email Us",
    desc: "Get a reply within 24 hours",
    href: "mailto:hello@softune.com",
    color: "bg-[var(--color-ink)]",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5 text-white" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  }
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{ x: isOpen ? 0 : 340 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="fixed top-[25%] right-0 z-50 flex items-start shadow-2xl"
    >
      {/* Attached Edge Tab */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -left-[44px] top-1/2 -translate-y-1/2 flex h-[120px] w-[44px] flex-col items-center justify-center gap-1.5 rounded-l-xl bg-[var(--color-brand)] shadow-[-4px_0_12px_rgba(0,0,0,0.1)] transition-all hover:brightness-110 cursor-pointer border-none py-3"
      >
        <img 
          src="/icons/arrow-right.svg"
          alt="Toggle"
          className={`size-5 shrink-0 object-contain brightness-0 invert transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`} 
        />
        <span 
          className="text-[13px] font-extrabold tracking-widest text-white uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Support
        </span>
      </button>

      {/* Drawer Box */}
      <div className="flex w-[340px] max-h-[85vh] flex-col rounded-bl-[24px] border-y border-l border-[var(--color-line)] bg-white shadow-[-12px_32px_64px_-12px_rgba(0,0,0,0.2)]">
        
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#E5E5E5] px-6 py-5 bg-[#FAF9F6]">
          <h4 className="text-[17px] font-extrabold tracking-tight text-[var(--color-ink)] flex items-center gap-2.5">
            <img src="/icons/chat.svg" alt="Chat" className="size-5 object-contain" />
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-brand)] opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-[var(--color-brand)]"></span>
            </span>
            We're Online!
          </h4>
          <button 
            onClick={() => setIsOpen(false)}
            className="flex size-7 items-center justify-center rounded-full bg-white border border-[#D4D4D4] text-[var(--color-muted)] transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-3.5" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <h3 className="text-xl font-extrabold text-[var(--color-ink)] tracking-tight mb-1.5">Need help?</h3>
          <p className="mb-6 text-[14px] font-medium leading-relaxed text-[var(--color-muted)]">
            Choose a platform below to quickly chat with our friendly support team.
          </p>
          
          <div className="flex flex-col gap-2.5">
            {CONTACT_OPTIONS.map((opt) => (
              <a
                key={opt.name}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-[18px] p-3.5 transition-colors bg-white hover:bg-[#FAF9F6] border border-[var(--color-brand)]/40 hover:border-[var(--color-brand)]"
              >
                <div className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${opt.color}`}>
                  {opt.icon}
                </div>
                <div>
                  <h5 className="text-[14.5px] font-extrabold text-[var(--color-ink)] group-hover:text-[var(--color-brand)] transition-colors">
                    {opt.name}
                  </h5>
                  <p className="mt-0.5 text-[12.5px] font-medium text-[var(--color-muted)]">
                    {opt.desc}
                  </p>
                </div>
                <div className="ml-auto flex size-7 items-center justify-center rounded-full bg-white border border-[#E5E5E5] opacity-0 transition-all group-hover:opacity-100 group-hover:border-[var(--color-brand)] text-[var(--color-brand)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-3.5" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="rounded-bl-[24px] border-t border-[#E5E5E5] p-4 text-center bg-[#FAF9F6]">
          <p className="text-[12px] font-medium text-[var(--color-muted)]">
            Usually responds within <span className="font-bold text-[var(--color-ink)]">5 minutes</span>.
          </p>
        </div>
        
      </div>
    </motion.div>
  );
}
