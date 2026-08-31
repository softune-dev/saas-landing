import { SoftuneLogo } from "@/components/brand/softune-logo";

/** Shared prompt for footer AI deep-links — points models at llms.txt so
 * answers match product truth instead of inventing gateways / unlimited stores. */
const ASK_AI_PROMPT =
  "Using https://www.softunebd.com/llms.txt and softunebd.com, explain what Softune is: a Bangladesh ecommerce SaaS with Theme Editor, Gemini AI chatbot, COD, manual bKash/Nagad, official bKash, Nagad, and SSLCommerz payments, courier connects for Steadfast, Pathao, RedX, and eCourier, Store Sale POS, analytics, Meta CAPI, and fraud blocklist/rules. Do not invent Stripe/PayPal or unlimited stores on every plan.";

const cols = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Add-Ons", href: "#addons" },
      { label: "Documentation", href: "/support/documentation" },
      { label: "Blog & Resources", href: "/blog" },
      { label: "Community Forum", href: "/support/community" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/support/contact" },
      { label: "Help Center", href: "/support/faq" },
      { label: "Email Support", href: "mailto:support@softunebd.com" },
      { label: "Video Tutorials", href: "/support/tutorials" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Changelog", href: "/changelog" },
      { label: "Careers", href: "/careers" },
      { label: "Brand Kit", href: "/brandkit" },
      { label: "Refund Policy", href: "/refund" },
      { label: "Cookie Policy", href: "/cookie" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-canvas)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-5 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <div className="flex items-center">
            <SoftuneLogo className="h-12 w-auto sm:h-14" />
          </div>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed font-medium text-[var(--color-muted)] sm:text-[16px]">
            Softune is the ecommerce platform built for small businesses and
            startups in Bangladesh. Themes, orders, COD, bKash, Nagad,
            SSLCommerz, couriers, POS, and AI — one dashboard. No coding
            required.
          </p>

          <div className="mt-4">
            <p className="mb-4 text-[14px] font-semibold tracking-tight text-[var(--color-ink)]">
              Ask AI how Softune helps Businesses grow
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={`https://chatgpt.com/?q=${encodeURIComponent(ASK_AI_PROMPT)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/chatgpt.webp"
                  alt="ChatGPT"
                  className="size-9 md:size-10 object-contain transition-transform hover:scale-110 cursor-pointer"
                />
              </a>
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(ASK_AI_PROMPT)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/claud.webp"
                  alt="Claude"
                  className="size-9 md:size-10 object-contain transition-transform hover:scale-110 cursor-pointer"
                />
              </a>
              <a
                href={`https://gemini.google.com/app?q=${encodeURIComponent(ASK_AI_PROMPT)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/gemini.webp"
                  alt="Gemini"
                  className="size-9 md:size-10 object-contain transition-transform hover:scale-110 cursor-pointer"
                />
              </a>
              <a
                href={`https://grok.com/?q=${encodeURIComponent(ASK_AI_PROMPT)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/grok.webp"
                  alt="Grok"
                  className="size-9 md:size-10 object-contain transition-transform hover:scale-110 cursor-pointer"
                />
              </a>
              <a
                href={`https://www.perplexity.ai/search?q=${encodeURIComponent(ASK_AI_PROMPT)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/perplexity.webp"
                  alt="Perplexity"
                  className="size-9 md:size-10 object-contain transition-transform hover:scale-110 cursor-pointer"
                />
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#" className="transition-transform hover:scale-105">
              <img src="/googleplay.webp" alt="Get it on Google Play" className="h-[80px] w-auto object-contain" />
            </a>
            <a href="#" className="transition-transform">
              <img src="/appstore.webp" alt="Download on the App Store" className="h-[40px] w-auto object-contain" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-8 lg:col-span-3">
          {cols.map((c) => (
            <div key={c.title} className="min-w-0">
              <p className="text-[15px] font-extrabold tracking-tight text-[var(--color-ink)] underline decoration-[var(--color-brand)] decoration-2 underline-offset-4 sm:text-[16px]">
                {c.title}
              </p>
              <ul className="mt-4 space-y-2.5 sm:mt-6 sm:space-y-3">
                {c.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group relative flex min-h-9 items-center text-[14px] font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-brand)] sm:text-[15px]"
                    >
                      <span className="absolute -left-4 font-bold opacity-0 transition-all duration-300 group-hover:left-0 group-hover:opacity-100">
                        -
                      </span>
                      <span className="transition-transform duration-300 group-hover:translate-x-4">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)] py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-5 md:flex-row md:gap-4 md:px-8">
          <div className="order-3 flex-1 text-center text-[13px] font-medium text-[var(--color-muted)] sm:text-[14px] md:order-1 md:text-left">
            © {new Date().getFullYear()} Softune. All rights reserved.{" "}
            <br className="lg:hidden" />
            <span className="mx-2 hidden text-[#D4D4D4] lg:inline">|</span>
            Created with ❤️ by{" "}
            <a
              href="https://kamrulhasan.site"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[var(--color-brand)] transition-all hover:underline"
            >
              Kamrul Hasan
            </a>
          </div>

          <div className="order-1 flex flex-col items-center gap-6 md:order-2 md:flex-row md:gap-8 lg:gap-12">
            <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
              <span className="shrink-0 text-sm font-medium tracking-tight text-[var(--color-muted)] sm:text-base">
                Secured Payment :
              </span>
              <div className="grid w-full max-w-[360px] grid-cols-4 items-center gap-2 sm:flex sm:w-auto sm:max-w-none sm:gap-5">
                <img
                  src="/icons/bkash.webp"
                  alt="bKash"
                  className="mx-auto h-5 w-full max-w-[88px] object-contain sm:mx-0 sm:h-8 sm:w-auto sm:max-w-none"
                />
                <img
                  src="/icons/nagad.webp"
                  alt="Nagad"
                  className="mx-auto h-5 w-full max-w-[88px] object-contain sm:mx-0 sm:h-8 sm:w-auto sm:max-w-none"
                />
                <img
                  src="/icons/sslcommerz.webp"
                  alt="SSLCommerz"
                  className="mx-auto h-5 w-full max-w-[88px] object-contain sm:mx-0 sm:h-8 sm:w-auto sm:max-w-none"
                />
                <span
                  className="mx-auto flex h-5 w-full max-w-[88px] items-center justify-center rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] text-[11px] font-extrabold tracking-wide text-[var(--color-ink)] sm:mx-0 sm:h-8 sm:w-auto sm:max-w-none sm:px-3 sm:text-[12px]"
                  aria-label="Cash on Delivery"
                >
                  COD
                </span>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <a
                href="#"
                className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110"
              >
                <img
                  src="/icons/facebook.webp"
                  alt="Facebook"
                  className="size-6 object-contain"
                />
              </a>
              <a
                href="#"
                className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110"
              >
                <img
                  src="/icons/insta.webp"
                  alt="Instagram"
                  className="size-6 object-contain"
                />
              </a>
              <a
                href="#"
                className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110"
              >
                <img
                  src="/icons/linkedin.webp"
                  alt="LinkedIn"
                  className="size-6 object-contain"
                />
              </a>
              <a
                href="#"
                className="opacity-70 hover:opacity-100 transition-opacity hover:scale-110"
              >
                <img
                  src="/icons/google.webp"
                  alt="Google"
                  className="size-6 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
