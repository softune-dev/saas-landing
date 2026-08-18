export interface ServiceFeature {
  title: string;
  desc: string;
  icon: string;
}

export interface ServiceProcess {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  duration: string;
  price: string;
  features: ServiceFeature[];
  process: ServiceProcess[];
  faqs: ServiceFAQ[];
}

export const SERVICES_PAGES: Record<string, ServiceData> = {
  "store-setup": {
    slug: "store-setup",
    title: "Store Setup & Launch",
    subtitle: "Complete Ecommerce Launchpad",
    description: "Launch your store in record time. We handle backend setup, payments, and catalog configurations so you can focus on marketing and sales.",
    icon: "/icons/domain.svg",
    duration: "3-5 Business Days",
    price: "Starting at $499",
    features: [
      { title: "Domain & SSL Config", desc: "We link your custom brand domain and verify SSL certificates for safe checkouts.", icon: "/icons/lock.svg" },
      { title: "Payment Integration", desc: "Setup card processing, digital wallets, and regional Cash-on-Delivery pipelines.", icon: "/icons/wallet.svg" },
      { title: "Logistics & Courier Sync", desc: "Integrate automatic shipping portals and live tracking alerts for packages.", icon: "/icons/delivery.svg" },
      { title: "Catalog Architecture", desc: "Structurally map your product variants, inventories, collections, and price details.", icon: "/icons/themes.svg" },
      { title: "Tax & Compliance", desc: "Configure local tax rates, billing info, and draft essential legal pages.", icon: "/icons/analytics.svg" },
      { title: "Admin Training", desc: "Receive a personalized video walkthrough showing how to manage orders and inventory.", icon: "/icons/user.svg" }
    ],
    process: [
      { step: "01", title: "Discovery & Plan", desc: "We review your brand, catalog size, and target region to map payment and shipping logistics requirements." },
      { step: "02", title: "Configuration", desc: "Our specialists link domains, establish SSL security, and connect API integrations for checkout processing." },
      { step: "03", title: "Catalog Load", desc: "We upload product data, organize inventory counts, structure collections, and optimize metadata styles." },
      { step: "04", title: "Testing & Launch", desc: "We run end-to-end sandbox checkouts to verify automated email receipts, tags, logistics, and hand over keys." }
    ],
    faqs: [
      { q: "Do I need to purchase a hosting plan?", a: "No, Softune is fully hosted in the cloud. You only need your own domain name, which we will help you configure during the setup phase." },
      { q: "Can I migrate my existing products?", a: "Yes. If you have products in CSV lists or Shopify format, we can migrate them directly during the catalog load step." },
      { q: "What payment gateways are supported?", a: "We support Stripe, PayPal, SSLCommerz, bKash, Nagad, and standard COD options out of the box." }
    ]
  },
  "theme-design": {
    slug: "theme-design",
    title: "Bespoke Theme Customization",
    subtitle: "High-Converting Custom Aesthetics",
    description: "Upgrade beyond generic presets. We craft a custom theme identity that aligns with your brand, optimizes mobile layouts, and maximizes visual impact.",
    icon: "/icons/color.svg",
    duration: "5-7 Business Days",
    price: "Starting at $799",
    features: [
      { title: "Brand Identity Sync", desc: "We adapt your brand guidelines, primary colors, layouts, and custom typography.", icon: "/icons/color.svg" },
      { title: "Mobile UI Polish", desc: "Ensure checkout elements, images, and nav bars match swipe patterns on phone viewports.", icon: "/icons/delivery.svg" },
      { title: "Custom Layout Sections", desc: "Create unique video cards, testimonial grids, or banner spaces suited for your products.", icon: "/icons/themes.svg" },
      { title: "Optimized Load Speeds", desc: "Ensure your custom styles maintain page speeds and meet web vitals.", icon: "/icons/zap.svg" },
      { title: "Interactive UI Elements", desc: "Add fluid hover effects, animated cart drawers, and custom visual buttons.", icon: "/icons/splash.svg" },
      { title: "Asset Preparation", desc: "We optimize product images, crop layouts, and prepare banners for maximum conversion.", icon: "/icons/themes.svg" }
    ],
    process: [
      { step: "01", title: "Visual Mockup", desc: "We create visual style frames in Figma detailing your homepage layout, catalog pages, and typography ideas." },
      { step: "02", title: "Theme Integration", desc: "We translate approved design assets into code structures using Softune's custom style components." },
      { step: "03", title: "Speed Refinement", desc: "We run page audits, compile scripts, and compress images to guarantee pages load in under 1 second." },
      { step: "04", title: "Review & Signoff", desc: "We conduct cross-device testing on iOS, Android, Safari, and Chrome before publishing the final styles." }
    ],
    faqs: [
      { q: "Will theme customization slow down my store?", a: "No. All custom styles are optimized using native CSS variables and optimized React modules to avoid bloated scripts." },
      { q: "Can I adjust colors myself later?", a: "Yes, you can edit layout structures, colors, and typography styles anytime through the dashboard editor." }
    ]
  },
  "seo-optimization": {
    slug: "seo-optimization",
    title: "Search Engine Optimization",
    subtitle: "Capture High-Intent Organic Traffic",
    description: "Rank higher on Google and outpace competitors. We optimize your technical SEO, schema data, and keywords to bring ready-to-buy traffic to your site.",
    icon: "/icons/analytics.svg",
    duration: "4-6 Business Days",
    price: "Starting at $399",
    features: [
      { title: "Technical Code Audit", desc: "We locate broken links, crawl bottlenecks, and resolve index errors on search databases.", icon: "/icons/zap.svg" },
      { title: "Schema Structured Data", desc: "Integrate JSON-LD schema so search engines show product prices and ratings directly.", icon: "/icons/themes.svg" },
      { title: "Metadata Customization", desc: "Draft high-click meta descriptions and title tags for every page.", icon: "/icons/ai-pencil.svg" },
      { title: "Sitemap Verification", desc: "Build and submit XML sitemaps to Google Search Console to guarantee indexing.", icon: "/icons/analytics.svg" },
      { title: "Competitor Analysis", desc: "Identify keyword opportunities and design search strategy recommendations.", icon: "/icons/user.svg" },
      { title: "Page Speed Boost", desc: "Configure server-side details to optimize speed signals that Google ranks.", icon: "/icons/zap.svg" }
    ],
    process: [
      { step: "01", title: "Keyword Audit", desc: "We trace target keywords used by your direct market competitors and locate low-difficulty targets." },
      { step: "02", title: "On-Page Cleanup", desc: "We rewrite headings, establish clean URL hierarchies, and build optimal meta tags on key products." },
      { step: "03", title: "Technical Setup", desc: "We hook up Google Search Console, submit clean sitemaps, and add schema script objects." },
      { step: "04", title: "Performance Review", desc: "We schedule recurring ranking reports and provide advice on content writing rules for your catalog." }
    ],
    faqs: [
      { q: "How long until I see results?", a: "SEO is a medium-term strategy. While search engines index changes within weeks, search ranking upgrades generally show over 30 to 60 days." },
      { q: "Is this a recurring service?", a: "This is a one-time optimization project to set a clean technical foundation. We also provide optional monthly growth packages." }
    ]
  },
  "store-migration": {
    slug: "store-migration",
    title: "Seamless Store Migration",
    subtitle: "Zero Downtime Platform Switch",
    description: "Migrate your catalog, orders, and customer database from any platform to Softune with absolute accuracy and zero business downtime.",
    icon: "/icons/arrow-link.svg",
    duration: "4-6 Business Days",
    price: "Starting at $599",
    features: [
      { title: "Database Integrity Check", desc: "We audit customer accounts, transaction histories, and catalog logs before transferring.", icon: "/icons/lock.svg" },
      { title: "URL Redirect Presets", desc: "Establish 301 redirects to ensure old store URLs forward to new pages without breaking SEO.", icon: "/icons/analytics.svg" },
      { title: "Batch Catalog Exports", desc: "Export thousands of products, descriptions, reviews, and images cleanly.", icon: "/icons/orders.svg" },
      { title: "Order Sync Integration", desc: "Move active order records so past order fulfillment timelines remain intact.", icon: "/icons/billing.svg" },
      { title: "Zero Downtime Launch", desc: "Configure domain routing adjustments during off-peak hours so the transition is instant.", icon: "/icons/zap.svg" },
      { title: "Customer Account Sync", desc: "Synchronize user details so accounts are retained during the platform transition.", icon: "/icons/user.svg" }
    ],
    process: [
      { step: "01", title: "System Audit", desc: "We inspect your current database layout, order size, and plugin integrations to draft a transfer map." },
      { step: "02", title: "Data Extraction", desc: "We pull customer profile catalogs and order history, and re-structure data into compatible schema formats." },
      { step: "03", title: "Softune Import", desc: "We load databases into your Softune account, check variant linkages, and test checkout functions." },
      { step: "04", title: "Domain Switch", desc: "We adjust DNS target zones, issue SSL tokens, establish 301 SEO redirects, and push the new site live." }
    ],
    faqs: [
      { q: "Will we lose search rankings during migration?", a: "No. By establishing comprehensive 301 redirect paths for all catalog URLs, we protect your SEO authority." },
      { q: "Can customer passwords be migrated?", a: "For security, passwords are encrypted. Customers will keep their profile histories but will receive a reset password link upon first checkout." }
    ]
  },
  "consultation": {
    slug: "consultation",
    title: "E-commerce Growth Strategy",
    subtitle: "1-on-1 Expert Advisory",
    description: "Unlock bottlenecks in your sales funnel. Consult with our experts to optimize pricing, logistics, landing pages, and retention campaigns.",
    icon: "/icons/chat.svg",
    duration: "2-3 Business Days",
    price: "Starting at $199",
    features: [
      { title: "Funnel Analysis Check", desc: "We audit your checkout drop-offs, cart values, and marketing campaigns.", icon: "/icons/analytics.svg" },
      { title: "Logistics Optimization", desc: "Learn how to select courier partners and decrease delivery times.", icon: "/icons/delivery.svg" },
      { title: "Pricing & Variant Consulting", desc: "Determine how to structure discount tiers and inventory setups.", icon: "/icons/wallet.svg" },
      { title: "Customer Retention Strategy", desc: "Design loyalty rewards systems that double buyer frequencies.", icon: "/icons/user.svg" },
      { title: "Marketing Strategy Audit", desc: "Verify pixel parameters, UTM tags, and review social ad budgets.", icon: "/icons/zap.svg" },
      { title: "Actionable Roadmap", desc: "Receive a PDF checklist containing structural adjustments to execute.", icon: "/icons/themes.svg" }
    ],
    process: [
      { step: "01", title: "Data Collection", desc: "We request dashboard insights, catalog sheets, and access to analytics tools to trace patterns." },
      { step: "02", title: "Funnel Review", desc: "We walk through checkouts, landing pages, and email campaigns to highlight friction items." },
      { step: "03", title: "Strategy Session", desc: "A live video review session answering your e-commerce growth questions." },
      { step: "04", title: "PDF Handover", desc: "We issue a priority action roadmap summarizing specific steps to scale store revenues." }
    ],
    faqs: [
      { q: "How is the strategy session conducted?", a: "Consultations are conducted over Google Meet or Zoom. Sessions are recorded and shared with you for your records." },
      { q: "Can you help execute the roadmap?", a: "Yes. If you decide to work with our setup or theme design teams, consultation fees are credited toward implementation projects." }
    ]
  }
};

export const SERVICES_LIST = [
  { slug: "store-setup", title: "Store Setup", icon: "/icons/domain.svg", desc: "E-commerce store launch" },
  { slug: "theme-design", title: "Theme Design", icon: "/icons/color.svg", desc: "Custom theme branding" },
  { slug: "seo-optimization", title: "SEO Optimization", icon: "/icons/analytics.svg", desc: "Organic search ranking" },
  { slug: "store-migration", title: "Store Migration", icon: "/icons/arrow-link.svg", desc: "Zero downtime transition" },
  { slug: "consultation", title: "Consultation", icon: "/icons/chat.svg", desc: " Funnel optimization advice" }
];
