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
    a: "Softune is an all-in-one ecommerce SaaS platform for small businesses and startups in Bangladesh. Create a professional online store, manage products and orders, accept COD and manual bKash/Nagad payments, connect couriers, run Store Sale (POS), and grow from one dashboard.",
  },
  {
    q: "Do I need coding skills to use Softune?",
    a: "No. Softune is built for non-technical users. Launch a store, add products, manage orders, and customize your storefront in the Theme Editor — no coding required.",
  },
  {
    q: "Can I manage multiple stores from one dashboard?",
    a: "Yes. Softune lets you switch between stores from one dashboard. The Business plan includes up to 3 storefronts on a single account. Softune does not offer unlimited stores on every plan.",
  },
  {
    q: "What payment methods does Softune support?",
    a: "Softune supports Cash on Delivery (COD) plus manual bKash and Nagad: shoppers pay your wallet number and submit a transaction ID, then you verify before shipping. Live auto-checkout through SSLCommerz or other card gateways is not available yet.",
  },
  {
    q: "How long does it take to launch my store?",
    a: "Minutes. Pick a pre-built theme, add products, enable a payment method, and publish — your store can be live and accepting orders the same day.",
  },
  {
    q: "Is my customer data secure?",
    a: "Yes. Softune isolates each merchant’s data by tenant, stores sensitive credentials encrypted, and includes rule-based Fraud Protection (phone blocklist plus checkout rules) to reduce COD abuse. Softune does not claim machine-learning fraud scoring.",
  },
  {
    q: "Can I customize my store's design?",
    a: "Yes. Choose a professional theme and use Softune’s Theme Editor to change colors, fonts, sections, and branding with live desktop and mobile preview — no code. AI Suggest can propose changes you still review before publishing.",
  },
  {
    q: "What courier services are integrated with Softune?",
    a: "Softune’s Couriers screen lists major Bangladesh partners including Steadfast, Pathao, RedX, Paperfly, eCourier, Sundarban, Carrybee, SA Paribahan, and PandaGo. Steadfast supports a verified API-key connect today; Softune does not claim real-time tracking or auto-booking for every partner.",
  },
  {
    q: "Can I upgrade or downgrade my plan anytime?",
    a: "Yes. You can move between Starter, Growth, and Business. See the live pricing page for current limits and what’s included on each plan.",
  },
  {
    q: "How does Softune's AI help my business?",
    a: "Softune’s Gemini-powered AI chatbot answers questions about your products, orders, and sales from your own store data. AI Suggest helps with theme direction, and one-click AI writing drafts product descriptions. Merchants always confirm before AI changes go live — Softune does not auto-rewrite your store SEO without review.",
  },
];
