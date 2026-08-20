"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";

export type FeatureSection = {
  pillText: string;
  pillIcon: string;
  titleStart: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  bullets: string[];
  videoBrief: string;
  buttons: { text: string; variant: "primary" | "outline" }[];
};

export const sections: FeatureSection[] = [
  {
    pillText: "Store Overview",
    pillIcon: "/icons/analytics.svg",
    titleStart: "All Your Tools in",
    titleHighlight: "One Dashboard",
    titleEnd: "",
    description: "Track revenue, order counts, AI credits, and storage from a single dashboard.",
    bullets: [
      "Built-in payment gateways and checkout terms",
      "Integrated local courier and delivery systems",
      "Product catalog and inventory management center"
    ],
    videoBrief: "Opens on the main dashboard, hovers over revenue stats, scrolls to plan limits, and ends on storage usage.",
    buttons: [
      { text: "Get Started", variant: "primary" },
      { text: "See Features", variant: "outline" }
    ]
  },
  {
    pillText: "Product Catalog",
    pillIcon: "/icons/shop-bag.svg",
    titleStart: "Generate Text With",
    titleHighlight: "One-Click AI",
    titleEnd: "",
    description: "Create product descriptions using AI, then edit the text before saving.",
    bullets: [
      "One-click AI product description builder",
      "Editable text editor for generated content",
      "Size, color, and SKU variant management"
    ],
    videoBrief: "Opens product creator, clicks AI Description, edits one line, and clicks Save.",
    buttons: [
      { text: "Get Started", variant: "primary" },
      { text: "Explore Catalog", variant: "outline" }
    ]
  },
  {
    pillText: "Order History",
    pillIcon: "/icons/delivery.svg",
    titleStart: "Protected Sales Records &",
    titleHighlight: "PDF Invoices",
    titleEnd: "",
    description: "Order items save product details at purchase time, keeping past invoices accurate even if products are edited later.",
    bullets: [
      "Protected past order receipts saved at time of sale",
      "One-click downloadable PDF invoices",
      "Past sales records stay accurate when catalog items change"
    ],
    videoBrief: "Opens an order, downloads the PDF invoice, changes product price in catalog, and confirms old order stays unchanged.",
    buttons: [
      { text: "Get Started", variant: "primary" },
      { text: "View Orders", variant: "outline" }
    ]
  },
  {
    pillText: "Multi-Device Editor",
    pillIcon: "/icons/themes.svg",
    titleStart: "Preview Stores on",
    titleHighlight: "Multiple Devices",
    titleEnd: "",
    description: "Switch between desktop, tablet, and mobile viewports directly inside the theme editor to inspect your storefront layout.",
    bullets: [
      "Multi-device viewport toggles for desktop, tablet, and mobile",
      "Interactive live editor showing real-time storefront changes",
      "Responsive layout previews across all target screen sizes"
    ],
    videoBrief: "Opens the theme editor, clicks the desktop icon, switches to tablet view, toggles mobile view, and edits a section header.",
    buttons: [
      { text: "Get Started", variant: "primary" },
      { text: "Try Preview", variant: "outline" }
    ]
  },
  {
    pillText: "Storefront Design",
    pillIcon: "/icons/themes.svg",
    titleStart: "Customize Themes With",
    titleHighlight: "AI Suggest",
    titleEnd: "",
    description: "Type a prompt to generate theme color, font, and copy updates, then review the patch before publishing.",
    bullets: [
      "AI prompt for proposed color, font, and copy updates",
      "Review modal to inspect changes before going live",
      "Live desktop and mobile split preview"
    ],
    videoBrief: "Types prompt in theme editor, reviews suggested color patch in modal, and clicks Apply to update split preview.",
    buttons: [
      { text: "Get Started", variant: "primary" },
      { text: "Browse Themes", variant: "outline" }
    ]
  },
  {
    pillText: "App Extensions",
    pillIcon: "/icons/save.svg",
    titleStart: "Connect Integrations In",
    titleHighlight: "Add-Ons Store",
    titleEnd: "",
    description: "Enable payment gateways, tracking pixels, and customer chat extensions with one click.",
    bullets: [
      "Payment integrations for Stripe, SSLCommerz, and bKash",
      "Facebook Pixel and SEO tools",
      "WhatsApp messaging and live chat add-ons"
    ],
    videoBrief: "Opens Add-Ons page, filters engagement apps, clicks Install on WhatsApp Alerts, and toggles active status.",
    buttons: [
      { text: "Get Started", variant: "primary" },
      { text: "View All Add-Ons", variant: "outline" }
    ]
  }
];

const CheckIcon = () => (
  <svg className="size-6 shrink-0 text-[var(--color-brand)] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export function PlatformFeatures() {
  return (
    <section className="overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-canvas)] py-14 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="flex flex-col gap-14 md:gap-40">
          {sections.map((section, index) => {
            const isVideoRight = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col items-center gap-8 md:gap-12 lg:gap-20 ${
                  isVideoRight ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="w-full flex-1 space-y-6 md:space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1 pr-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:gap-3 md:p-1.5 md:pr-4">
                      <div className="relative flex size-5 items-center justify-center rounded-full bg-[var(--color-brand)]/10 md:size-6">
                        <span
                          className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand)]/15"
                          style={{ animationDuration: "2s" }}
                        />
                        <img
                          src={section.pillIcon}
                          alt=""
                          className="relative z-10 size-3 object-contain md:size-3.5 dark:invert"
                        />
                      </div>
                      <span className="text-[13px] font-semibold tracking-tight text-[var(--color-ink)] md:text-[14px]">
                        {section.pillText}
                      </span>
                    </div>

                    <h2 className="text-[1.7rem] leading-[1.2] font-extrabold tracking-tight text-[var(--color-ink)] sm:text-3xl md:text-4xl md:leading-[1.15] lg:text-[42px]">
                      {section.titleStart}{" "}
                      <span className="relative mx-0.5 inline-block px-2.5 py-0.5 sm:mx-1 sm:whitespace-nowrap sm:px-4">
                        <span className="absolute inset-0 top-1.5 -rotate-1 rounded-xl bg-[var(--color-brand)] shadow-sm sm:top-2" />
                        <em className="relative not-italic text-white">
                          {section.titleHighlight}
                        </em>
                      </span>{" "}
                      {section.titleEnd}
                    </h2>
                    <p className="mt-4 max-w-xl text-[15px] leading-relaxed font-medium text-[var(--color-muted)] sm:mt-6 sm:text-[17px] md:text-[18px]">
                      {section.description}
                    </p>
                  </motion.div>

                  <motion.ul
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="max-w-xl space-y-3 sm:space-y-4"
                  >
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-[15px] leading-relaxed font-medium text-[var(--color-ink-soft)] sm:text-[16px]">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </motion.ul>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4 sm:pt-4"
                  >
                    <Button
                      variant="primary"
                      className="animate-shine flex min-h-12 w-full items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-bold shadow-none sm:w-auto"
                    >
                      {section.buttons[0].text}
                      <img
                        src="/icons/arrow-right.svg"
                        alt=""
                        className="size-4 object-contain brightness-0 invert"
                      />
                    </Button>
                    <Button
                      variant="outline"
                      className="flex min-h-12 w-full items-center justify-center gap-2 bg-transparent px-6 py-3.5 text-[15px] font-bold shadow-none sm:w-auto"
                    >
                      {section.buttons[1].text}
                      <img
                        src="/icons/arrow-right.svg"
                        alt=""
                        className="size-4 object-contain opacity-60 dark:invert"
                      />
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex-1"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-[var(--color-surface)] shadow-lg sm:rounded-[24px] md:rounded-[32px]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <span className="text-sm font-semibold text-[var(--color-ink)] sm:text-base">
                        Demo Video Placeholder
                      </span>
                      <p className="mt-2 max-w-sm text-xs font-normal leading-relaxed text-[var(--color-muted)]">
                        {section.videoBrief}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
