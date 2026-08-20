"use client";

import { motion } from "framer-motion";

const features = [
  <><span className="text-[var(--color-brand)] font-semibold">Native AI Assistant</span> baked into the dashboard</>,
  <><span className="text-[var(--color-brand)] font-semibold">1-Click Theme Switching</span> between distinct storefronts</>,
  <>Built-in <span className="text-[var(--color-brand)] font-semibold">Guided Onboarding</span> & setup checklist</>,
  <>Unified <span className="text-[var(--color-brand)] font-semibold">Product & Variant</span> management</>,
  <>Seamless <span className="text-[var(--color-brand)] font-semibold">Payment Gateway</span> integrations</>,
  <>Plug-and-play <span className="text-[var(--color-brand)] font-semibold">Courier Integrations</span></>,
  <><span className="text-[var(--color-brand)] font-semibold">Add-Ons Marketplace</span> with 26 native apps</>,
  <>Instant <span className="text-[var(--color-brand)] font-semibold">CSV, PDF & JSON</span> data exports</>,
  <>Built-in <span className="text-[var(--color-brand)] font-semibold">Media Library</span> with clear storage limits</>,
  <>Dynamic <span className="text-[var(--color-brand)] font-semibold">AI Theme Editor</span> with brand suggestions</>,
  <>Predictable, <span className="text-[var(--color-brand)] font-semibold">transparent pricing & caps</span></>
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
    <section className="border-b border-[var(--color-line)] bg-[#FAF9F6] py-14 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-5 md:px-8">
        <div className="mx-auto mb-8 flex flex-col items-center text-center md:mb-10">
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
                src="/icons/zap.svg"
                alt=""
                className="relative z-10 size-3 object-contain md:size-3.5"
              />
            </div>
            <span className="text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
              Comparison
            </span>
          </motion.div>

          <h2 className="max-w-3xl text-3xl leading-[1.2] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-5xl sm:leading-[1.15] md:text-5xl">
            Why Softune Beats{" "}
            <span className="relative ml-0.5 inline-block px-2.5 py-0.5 sm:ml-1 sm:whitespace-nowrap sm:px-4">
              <span className="absolute inset-0 -rotate-2 rounded-xl bg-[var(--color-brand)] shadow-sm" />
              <em className="relative not-italic text-white">The Competition</em>
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] sm:mt-6 sm:text-[17px] md:text-[18px]">
            See how Softune compares to other ecommerce platforms.
          </p>
        </div>

        <p className="mb-3 text-center text-[12px] font-medium text-[var(--color-muted-soft)] sm:hidden">
          Swipe to compare →
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto overflow-hidden rounded-[20px] border border-[#D4D4D4] bg-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.05)] sm:rounded-[24px] md:rounded-[32px]"
        >
          <div className="-mx-px overflow-x-auto overscroll-x-contain">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D4D4D4]">
                  <th className="w-1/2 p-4 text-[14px] font-bold text-[var(--color-ink)] sm:p-6 sm:text-[15px] md:p-8 md:text-[17px]">
                    Features
                  </th>
                  <th className="w-1/4 border-l border-[#D4D4D4] bg-[#FAFAFA] p-4 text-center text-[14px] font-bold text-[var(--color-muted)] sm:p-6 sm:text-[15px] md:p-8 md:text-[16px]">
                    Others
                  </th>
                  <th className="w-1/4 border-l border-[var(--color-brand)] bg-[var(--color-brand)] p-4 sm:p-6 md:p-8">
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                      <img
                        src="/logo.svg"
                        alt=""
                        className="h-4 object-contain brightness-0 invert sm:h-5 md:h-6"
                      />
                      <span className="text-[15px] font-extrabold text-white sm:text-[17px] md:text-[19px]">
                        Softune
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4D4D4]/40">
                {features.map((feature, i) => (
                  <tr
                    key={i}
                    className="group transition-colors hover:bg-[#FAFAFA]/60"
                  >
                    <td className="px-4 py-4 text-[13px] font-medium text-[var(--color-ink-soft)] transition-colors group-hover:text-[var(--color-ink)] sm:px-6 sm:py-5 sm:text-[14px] md:px-8 md:py-6 md:text-[15.5px]">
                      <span className="mr-1 inline-block w-5 font-semibold text-[var(--color-muted)] sm:w-6">
                        {i + 1}.
                      </span>{" "}
                      {feature}
                    </td>
                    <td className="border-l border-[#D4D4D4]/40 bg-[#FAFAFA]/30 p-4 sm:p-5 md:p-6">
                      <CrossIcon />
                    </td>
                    <td className="relative border-l border-white/10 bg-[var(--color-brand)] p-4 sm:p-5 md:p-6">
                      <div className="pointer-events-none absolute inset-0 border-b border-white/10" />
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
