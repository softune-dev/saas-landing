"use client";

import { motion } from "framer-motion";

const features = [
  <><span className="text-[var(--color-brand)] font-semibold">Multi-store management</span> from one dashboard</>,
  <>Launch stores with <span className="text-[var(--color-brand)] font-semibold">customizable themes</span></>,
  <><span className="text-[var(--color-brand)] font-semibold">Centralized product & catalog</span> management</>,
  <>Simplified <span className="text-[var(--color-brand)] font-semibold">store expansion</span> & growth</>,
  <><span className="text-[var(--color-brand)] font-semibold">Unified order & customer</span> management</>,
  <>Flexible <span className="text-[var(--color-brand)] font-semibold">branding & storefront</span> customization</>,
  <><span className="text-[var(--color-brand)] font-semibold">All ecommerce operations</span> in one system</>,
  <>Manage <span className="text-[var(--color-brand)] font-semibold">large product catalogs</span> across stores</>,
  <><span className="text-[var(--color-brand)] font-semibold">AI-powered</span> store setup & analysis</>,
  <><span className="text-[var(--color-brand)] font-semibold">AI theme editor</span> & SEO assistant</>,
  <><span className="text-[var(--color-brand)] font-semibold">Courier integration</span> & auto-sync</>,
  <><span className="text-[var(--color-brand)] font-semibold">Real-time fraud detection</span></>,
  <><span className="text-[var(--color-brand)] font-semibold">Affordable pricing</span> for small businesses</>
];

const CheckIcon = () => (
  <div className="mx-auto flex size-7 items-center justify-center rounded-full bg-white/20 text-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-white/10 transition-transform duration-300 group-hover:scale-[1.15]">
    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

const CrossIcon = () => (
  <div className="mx-auto flex size-7 items-center justify-center rounded-full bg-red-50 text-red-500 border border-red-100 transition-transform duration-300 group-hover:scale-[1.15]">
    <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </div>
);

export function Comparison() {
  return (
    <section className="py-24 bg-[#FAF9F6] border-b border-[var(--color-line)]">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mx-auto mb-10">
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
              <img src="/icons/zap.svg" alt="" className="size-3 md:size-3.5 object-contain relative z-10" />
            </div>
            <span className="text-[13px] md:text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Comparison
            </span>
          </motion.div>

          <h2 className="max-w-3xl font-extrabold tracking-tight text-4xl leading-[1.15] text-[var(--color-ink)] sm:text-5xl md:text-5xl">
            Why Softune Beats{" "}
            <span className="relative inline-block whitespace-nowrap px-4 py-0.5 ml-1">
              <span className="absolute inset-0 -rotate-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">The Competition</em>
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--color-muted)] font-medium md:text-[18px]">
            See how Softune compares to other ecommerce platforms.
          </p>
        </div>

        {/* Comparison Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto overflow-hidden rounded-[24px] md:rounded-[32px] border border-[#D4D4D4] bg-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.05)]"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#D4D4D4]">
                  <th className="p-6 md:p-8 text-[15px] md:text-[17px] font-bold text-[var(--color-ink)] w-1/2">
                    Features
                  </th>
                  <th className="p-6 md:p-8 text-center text-[15px] md:text-[16px] font-bold text-[var(--color-muted)] w-1/4 border-l border-[#D4D4D4] bg-[#FAFAFA]">
                    Others
                  </th>
                  <th className="p-6 md:p-8 w-1/4 border-l border-[var(--color-brand)] bg-[var(--color-brand)]">
                    <div className="flex items-center justify-center gap-2">
                      <img src="/logo.svg" alt="" className="h-5 md:h-6 object-contain brightness-0 invert" />
                      <span className="text-[17px] md:text-[19px] font-extrabold text-white">Softune</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4D4D4]/40">
                {features.map((feature, i) => (
                  <tr key={i} className="transition-colors hover:bg-[#FAFAFA]/60 group">
                    <td className="p-5 md:p-6 px-6 md:px-8 text-[14px] md:text-[15.5px] text-[var(--color-ink-soft)] font-medium group-hover:text-[var(--color-ink)] transition-colors">
                      <span className="inline-block w-6 text-[var(--color-muted)] font-semibold">{i + 1}.</span> {feature}
                    </td>
                    <td className="p-5 md:p-6 border-l border-[#D4D4D4]/40 bg-[#FAFAFA]/30">
                      <CrossIcon />
                    </td>
                    <td className="p-5 md:p-6 border-l border-white/10 bg-[var(--color-brand)] relative">
                      {/* Optional subtle overlay to separate rows since the bg is solid primary */}
                      <div className="absolute inset-0 border-b border-white/10 pointer-events-none" />
                      <CheckIcon />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
