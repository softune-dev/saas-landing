const cols = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features/multiple-themes" },
      { label: "Pricing", href: "/pricing" },
      { label: "Store Setup Guide", href: "/services/store-setup" },
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
      { label: "Email Support", href: "mailto:support@softune.com" },
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
    <footer className="border-t border-[var(--color-line)] bg-[#FAF9F6]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-5 md:px-8 lg:gap-16">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-sm">
              <img
                src="/logo.svg"
                alt="Softune Logo"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>
            <span className="text-[20px] font-extrabold tracking-tight text-[var(--color-ink)]">
              Softune
            </span>
          </div>
          <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-[var(--color-muted)] font-medium">
            Softune is the ecommerce platform built for small businesses and
            startups. Manage unlimited stores, customers, and products from one
            dashboard. No coding, no complexity.
          </p>

          <div className="mt-8">
            <p className="text-[14px] font-semibold text-[var(--color-ink)] mb-4 tracking-tight">
              Ask AI how Softune helps Businesses grow
            </p>
            <div className="flex items-center gap-4">
              <a
                href={`https://chatgpt.com/?q=${encodeURIComponent("Help me understand what makes Softune a powerful, all-in-one SaaS and multi-tenant storefront platform that simplifies operations and supports business growth. Based on softune.com, explain how Softune unifies core functions like multi-store management, POS, and inventory management into one system, reducing tool fragmentation and complexity, and how its flexible architecture helps businesses automate workflows, improve efficiency, and scale effectively while driving better decisions and long-term growth.")}`}
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
                href={`https://claude.ai/new?q=${encodeURIComponent("Help me understand what makes Softune a powerful, all-in-one SaaS and multi-tenant storefront platform that simplifies operations and supports business growth. Based on softune.com, explain how Softune unifies core functions like multi-store management, POS, and inventory management into one system, reducing tool fragmentation and complexity, and how its flexible architecture helps businesses automate workflows, improve efficiency, and scale effectively while driving better decisions and long-term growth.")}`}
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
                href={`https://gemini.google.com/app?q=${encodeURIComponent("Help me understand what makes Softune a powerful, all-in-one SaaS and multi-tenant storefront platform that simplifies operations and supports business growth. Based on softune.com, explain how Softune unifies core functions like multi-store management, POS, and inventory management into one system, reducing tool fragmentation and complexity, and how its flexible architecture helps businesses automate workflows, improve efficiency, and scale effectively while driving better decisions and long-term growth.")}`}
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
                href={`https://grok.com/?q=${encodeURIComponent("Help me understand what makes Softune a powerful, all-in-one SaaS and multi-tenant storefront platform that simplifies operations and supports business growth. Based on softune.com, explain how Softune unifies core functions like multi-store management, POS, and inventory management into one system, reducing tool fragmentation and complexity, and how its flexible architecture helps businesses automate workflows, improve efficiency, and scale effectively while driving better decisions and long-term growth.")}`}
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
                href={`https://www.perplexity.ai/search?q=${encodeURIComponent("Help me understand what makes Softune a powerful, all-in-one SaaS and multi-tenant storefront platform that simplifies operations and supports business growth. Based on softune.com, explain how Softune unifies core functions like multi-store management, POS, and inventory management into one system, reducing tool fragmentation and complexity, and how its flexible architecture helps businesses automate workflows, improve efficiency, and scale effectively while driving better decisions and long-term growth.")}`}
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
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-3">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-[16px] font-extrabold tracking-tight text-[var(--color-ink)] underline underline-offset-4 decoration-[var(--color-brand)] decoration-2">
                {c.title}
              </p>
              <ul className="mt-6 space-y-3">
                {c.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group relative flex items-center text-[15px] font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-brand)]"
                    >
                      <span className="absolute -left-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:left-0 font-bold">
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

      <div className="border-t border-[var(--color-line)] py-6 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          <div className="text-[14px] text-[var(--color-muted)] font-medium text-center md:text-left flex-1 md:order-1 order-3">
            © {new Date().getFullYear()} Softune. All rights reserved.{" "}
            <br className="lg:hidden" />
            <span className="hidden lg:inline mx-2 text-[#D4D4D4]">|</span>
            Created with ❤️ by{" "}
            <a
              href="https://kamarulhasan.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-brand)] font-bold hover:underline transition-all"
            >
              Kamrul Hasan
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 md:order-2 order-1">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="text-md font-medium text-[var(--color-muted)] tracking-tight">
                Secured Payment :
              </span>
              <div className="flex items-center gap-5">
                <img
                  src="/icons/bkash.svg"
                  alt="bKash"
                  className="h-8 w-auto object-contain"
                />
                <img
                  src="/icons/nagad.svg"
                  alt="Nagad"
                  className="h-8 w-auto object-contain"
                />
                <img
                  src="/icons/sslcommerz.svg"
                  alt="SSLCommerz"
                  className="h-8 w-auto object-contain"
                />
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
