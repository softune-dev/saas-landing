/**
 * Plain data, deliberately NOT in components/faq.tsx (a "use client" file) —
 * the server app/page.tsx needs to read this directly to build real
 * FAQPage schema.org JSON-LD, and Next's RSC boundary only exposes a client
 * module's DEFAULT export as an opaque reference to server code, not its
 * named data exports. Same pattern as lib/faq-data.ts for the /support/faq
 * page — this is a separate, shorter list specific to the homepage.
 */
export const homeFaqs = [
  {
    q: "What is Softune?",
    a: "Softune is an all-in-one ecommerce SaaS platform for small businesses and startups. Create professional online stores, manage products and orders, process payments, and grow your business—all from one intuitive dashboard.",
  },
  {
    q: "Do I need coding skills to use Softune?",
    a: "No. Softune is built for non-technical users. Launch stores, add products, manage orders, and customize your storefront using our drag-and-drop interface—no coding or technical expertise required.",
  },
  {
    q: "Can I manage multiple stores from one dashboard?",
    a: "Yes. Softune's multi-store management lets you handle unlimited stores from a single dashboard, making it easy to scale your business and manage inventory, orders, and customers across all stores.",
  },
  {
    q: "What payment methods does Softune support?",
    a: "Softune supports Cash on Delivery (COD) by default. Additional payment gateways can be integrated based on your plan to expand your payment options.",
  },
  {
    q: "How long does it take to launch my store?",
    a: "Minutes. With our AI-powered store setup and pre-built themes, you can have your online store live and accepting orders in just minutes, not weeks.",
  },
  {
    q: "Is my customer data secure?",
    a: "Yes. Softune uses enterprise-grade security with real-time fraud detection, secure payment processing, and automatic backups to protect your business and customer data.",
  },
  {
    q: "Can I customize my store's design?",
    a: "Absolutely. Choose from professional themes or use our AI-powered theme editor to customize colors, layouts, fonts, and branding without touching any code.",
  },
  {
    q: "What courier services are integrated with Softune?",
    a: "Softune integrates with major Bangladeshi courier services. Orders sync automatically, shipment tracking is real-time, and customers receive automatic shipping updates.",
  },
  {
    q: "Can I upgrade or downgrade my plan anytime?",
    a: "Yes. You can upgrade to a higher plan or downgrade anytime. Changes take effect immediately, and your billing is pro-rated based on usage.",
  },
  {
    q: "How does Softune's AI help my business?",
    a: "Softune's AI assists with store setup and optimization, provides actionable analytics and insights on your performance, helps refine your theme design, and improves your store's SEO automatically.",
  },
];
