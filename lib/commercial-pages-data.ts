import type { KeywordLandingData } from "@/components/seo/keyword-landing";

/**
 * The 7 flat top-level keyword pages from the SEO audit's priority list
 * (softunebd.com/{slug}). Comparison rows against Shopify/WooCommerce state
 * only their well-established, generally-true platform characteristics for
 * the Bangladesh market (no native BDT pricing, bKash/Nagad needs a
 * third-party app, etc.) — not invented numbers, and phrased so a reader
 * can independently verify each claim rather than take it on faith.
 */
export const COMMERCIAL_PAGES: Record<
  string,
  { title: string; description: string } & KeywordLandingData
> = {
  "ecommerce-platform-bangladesh": {
    title: "Ecommerce Platform for Bangladesh",
    description:
      "Softunebd is an ecommerce platform built for Bangladesh — COD, bKash, Nagad, SSLCommerz, Steadfast, Pathao, RedX, eCourier, Store Sale POS, and a real theme editor. Start a free 3-day trial, no credit card.",
    pill: "Ecommerce Platform Bangladesh",
    h1Start: "The Ecommerce Platform Built for",
    h1Highlight: "Bangladesh",
    intro:
      "Softunebd is a full ecommerce platform designed around how Bangladeshi merchants actually sell — local payment methods, real courier partners, and no code required.",
    features: [
      { icon: "/icons/color.svg", title: "Real Theme Editor", desc: "Design your storefront visually — colors, fonts, sections, copy — and preview it before publishing." },
      { icon: "/icons/wallet.svg", title: "Local Payments Built In", desc: "COD, bKash, Nagad, and SSLCommerz — no separate payment plugin to install or maintain." },
      { icon: "/icons/domain.svg", title: "Real Courier Integrations", desc: "Steadfast, Pathao, RedX, and eCourier connect directly to your order flow." },
      { icon: "/icons/billing.svg", title: "Store Sale POS", desc: "Sell in person and online from the same product catalog and inventory." },
      { icon: "/icons/ai-pencil.svg", title: "AI Assistant Included", desc: "Product copy, store questions, and suggestions — built into the dashboard, not a bolt-on." },
      { icon: "/icons/analytics.svg", title: "Real Profit Analytics", desc: "Actual margin per order, not just visitor counts." },
    ],
    faqs: [
      { q: "Is Softunebd built specifically for Bangladesh?", a: "Yes — BDT pricing, bKash/Nagad/SSLCommerz payments, and Steadfast/Pathao/RedX/eCourier delivery are native, not add-ons." },
      { q: "Do I need to know how to code?", a: "No — stores are built with a visual theme editor, no code required to launch or run one." },
      { q: "Is there a free trial?", a: "Yes — a 3-day free trial with full access. No credit card required." },
    ],
    ctaText: "Start Free",
    ctaHref: "/signup",
  },
  "online-store-builder-bangladesh": {
    title: "Online Store Builder for Bangladesh",
    description:
      "Build your online store in Bangladesh with Softunebd's drag-and-drop store builder — local payments, courier delivery, and AI tools. Free 3-day trial, no credit card.",
    pill: "Online Store Builder",
    h1Start: "Build Your Online Store",
    h1Highlight: "Without Code",
    intro:
      "Softunebd's store builder lets you design, launch, and run a real online store in Bangladesh — visual editing, local payments, and courier delivery, no developer required.",
    features: [
      { icon: "/icons/color.svg", title: "Drag-and-Drop Sections", desc: "Add and rearrange homepage sections without touching code." },
      { icon: "/icons/wallet.svg", title: "Local Payments Built In", desc: "COD, bKash, Nagad, and SSLCommerz ready from day one." },
      { icon: "/icons/domain.svg", title: "Real Courier Integrations", desc: "Steadfast, Pathao, RedX, and eCourier connect straight to your orders." },
      { icon: "/icons/ai-pencil.svg", title: "AI-Assisted Copy", desc: "Describe a product, get sellable copy — built into the editor." },
    ],
    faqs: [
      { q: "How fast can I launch a store?", a: "You can sign up, pick a theme, add products, and publish the same day — no development work needed." },
      { q: "Is there a free trial?", a: "Yes — a 3-day free trial with full access. No credit card required." },
    ],
    ctaText: "Start Free",
    ctaHref: "/signup",
  },
  "ecommerce-website-builder-bangladesh": {
    title: "Ecommerce Website Builder for Bangladesh",
    description:
      "Softunebd is an ecommerce website builder for Bangladesh that cares about your branding and identity, not a generic look — plus local payments, couriers, and AI. Start free for 3 days, no credit card.",
    pill: "Ecommerce Website Builder",
    h1Start: "Ecommerce Website Builder for",
    h1Highlight: "Bangladesh",
    intro:
      "Design and launch a real ecommerce website that looks like your brand, not a default theme. Softunebd's visual theme editor, local payment methods, and courier delivery are built for Bangladeshi merchants.",
    features: [
      { icon: "/icons/color.svg", title: "Your Brand, Not a Generic Look", desc: "Live preview while you edit logo, colors, fonts, and homepage sections so the shop reads as your identity." },
      { icon: "/icons/wallet.svg", title: "Local Payments Built In", desc: "COD, bKash, Nagad, and SSLCommerz, without a third-party plugin." },
      { icon: "/icons/domain.svg", title: "Real Courier Integrations", desc: "Steadfast, Pathao, RedX, and eCourier — connected, not promised." },
    ],
    faqs: [
      { q: "Does this work for a mobile-first audience?", a: "Yes — every theme is built mobile-first, since most Bangladeshi shoppers browse and buy on their phones." },
      { q: "Will my store look like every other Softunebd shop?", a: "No. Softunebd cares about your branding and identity, not a generic storefront that looks like everyone else's. Logo, colors, fonts, and sections stay yours." },
      { q: "Is there a free trial?", a: "Yes — a 3-day free trial with full access. No credit card required." },
    ],
    ctaText: "Start Free",
    ctaHref: "/signup",
  },
  "shopify-alternative-bangladesh": {
    title: "Shopify Alternative for Bangladesh",
    description:
      "Looking for a Shopify alternative in Bangladesh? Softunebd has native BDT pricing, built-in bKash, Nagad, and SSLCommerz, and local couriers. Start a free 3-day trial — no credit card.",
    pill: "Shopify Alternative",
    h1Start: "A Shopify Alternative Built for",
    h1Highlight: "Bangladesh",
    intro:
      "Shopify is a strong global platform, but it wasn't built around Bangladeshi payment methods and couriers. Softunebd was — bKash, Nagad, SSLCommerz, and local delivery partners are native, not third-party workarounds.",
    features: [
      { icon: "/icons/wallet.svg", title: "Native BDT Pricing", desc: "Plans priced and billed in Bangladeshi Taka, not converted from USD." },
      { icon: "/icons/domain.svg", title: "Local Couriers Built In", desc: "Steadfast, Pathao, RedX, and eCourier connect directly — no separate app store purchase." },
      { icon: "/icons/lock.svg", title: "bKash & Nagad Native", desc: "Local mobile payment methods are core checkout options, not a workaround." },
    ],
    comparison: {
      competitorName: "Shopify",
      rows: [
        { label: "Pricing currency", softune: "Native BDT pricing", other: "Priced in USD, converted at checkout" },
        { label: "bKash / Nagad", softune: "Built-in, native checkout options", other: "Typically requires a third-party app" },
        { label: "Local couriers (Steadfast, Pathao, RedX)", softune: "Built-in integrations", other: "Requires installing separate courier apps" },
        { label: "Cash on Delivery", softune: "Built-in", other: "Available via app or manual payment method" },
        { label: "AI assistant", softune: "Included in every plan", other: "Available via separate AI apps" },
      ],
    },
    faqs: [
      { q: "Can I migrate my products from Shopify to Softunebd?", a: "Products, categories, and images can be set up directly in Softunebd's dashboard; there isn't an automated one-click Shopify importer today." },
      { q: "Is Softunebd cheaper than Shopify for a Bangladeshi merchant?", a: "Softunebd's plans are priced natively in BDT, so there's no currency conversion or international card fee on your subscription itself — compare the current plans on the pricing page for exact numbers." },
      { q: "Is there a free trial?", a: "Yes — a 3-day free trial with full access. No credit card required." },
    ],
    ctaText: "Compare Plans",
    ctaHref: "/pricing",
  },
  "woocommerce-alternative-bangladesh": {
    title: "WooCommerce Alternative for Bangladesh",
    description:
      "Looking for a WooCommerce alternative in Bangladesh? Softunebd is a fully hosted platform with built-in bKash, Nagad, SSLCommerz, and local courier integrations — no separate hosting or plugin maintenance.",
    pill: "WooCommerce Alternative",
    h1Start: "A WooCommerce Alternative for",
    h1Highlight: "Bangladesh",
    intro:
      "WooCommerce means running your own WordPress hosting, security updates, and a stack of plugins. Softunebd is fully hosted, with local payments and couriers built in from the start.",
    features: [
      { icon: "/icons/domain.svg", title: "Fully Hosted", desc: "No separate web hosting, WordPress updates, or plugin conflicts to manage." },
      { icon: "/icons/wallet.svg", title: "Payments Built In", desc: "COD, bKash, Nagad, and SSLCommerz — no payment plugin to install and configure." },
      { icon: "/icons/lock.svg", title: "Security Handled For You", desc: "Tenant-isolated data and managed infrastructure — not your own WordPress install to secure." },
    ],
    comparison: {
      competitorName: "WooCommerce",
      rows: [
        { label: "Hosting", softune: "Fully hosted, nothing to manage", other: "Requires your own WordPress hosting" },
        { label: "bKash / Nagad", softune: "Built-in, native checkout options", other: "Requires a separate payment plugin" },
        { label: "Local couriers", softune: "Built-in integrations", other: "Requires separate shipping plugins" },
        { label: "Updates & maintenance", softune: "Handled automatically", other: "Plugin and core updates are your responsibility" },
        { label: "AI assistant", softune: "Included in every plan", other: "Requires a separate AI plugin" },
      ],
    },
    faqs: [
      { q: "Do I need a developer to run a Softunebd store like I would with WooCommerce?", a: "No — Softunebd doesn't require managing a WordPress install, plugins, or hosting; WooCommerce generally does." },
      { q: "Is there a free trial?", a: "Yes — a 3-day free trial with full access. No credit card required." },
    ],
    ctaText: "Compare Plans",
    ctaHref: "/pricing",
  },
  "best-ecommerce-platform-bangladesh": {
    title: "Best Ecommerce Platform for Bangladesh",
    description:
      "What makes an ecommerce platform right for Bangladesh: native BDT pricing, bKash/Nagad/SSLCommerz payments, real courier integrations, and Cash on Delivery. See how Softunebd covers all of it.",
    pill: "Ecommerce Platform Bangladesh",
    h1Start: "What Makes an Ecommerce Platform Right for",
    h1Highlight: "Bangladesh",
    intro:
      "A platform built for a global market doesn't always fit Bangladeshi ecommerce. Here's what actually matters for merchants here — and how Softunebd covers it, feature by feature.",
    features: [
      { icon: "/icons/wallet.svg", title: "Local Payment Methods", desc: "Cash on Delivery, bKash, Nagad, and SSLCommerz — the payment mix Bangladeshi shoppers actually use." },
      { icon: "/icons/domain.svg", title: "Real Courier Partners", desc: "Steadfast, Pathao, RedX, and eCourier — the couriers merchants already rely on." },
      { icon: "/icons/color.svg", title: "No-Code Store Builder", desc: "A visual theme editor, so launching doesn't require hiring a developer." },
      { icon: "/icons/ai-pencil.svg", title: "AI Tools Included", desc: "Product copy and store assistance built into every plan." },
    ],
    faqs: [
      { q: "What should I look for in an ecommerce platform in Bangladesh?", a: "Native BDT pricing, built-in bKash/Nagad support, real courier integrations (not just COD), and Cash on Delivery as a first-class option." },
      { q: "Is there a free trial?", a: "Yes — a 3-day free trial with full access. No credit card required." },
    ],
    ctaText: "See Softunebd's Plans",
    ctaHref: "/pricing",
  },
  "fcommerce-website-bangladesh": {
    title: "F-commerce Website Builder for Bangladesh",
    description:
      "Selling on a Facebook Page in Bangladesh? Build a real ecommerce website with Softunebd — COD, bKash, Nagad, courier delivery, and a proper product catalog beyond comments and DMs.",
    pill: "F-commerce to Website",
    h1Start: "Turn Your Facebook Page Into a Real",
    h1Highlight: "Website",
    intro:
      "Selling through Facebook comments and inbox messages doesn't scale. Softunebd gives F-commerce sellers a real storefront — product catalog, local payments, and courier delivery — while keeping the Facebook Page as a marketing channel.",
    features: [
      { icon: "/icons/domain.svg", title: "A Real Product Catalog", desc: "Move beyond scattered Facebook posts into an organized, searchable storefront." },
      { icon: "/icons/wallet.svg", title: "COD, bKash & Nagad", desc: "The same payment methods your Facebook Page customers already trust, now with a proper checkout." },
      { icon: "/icons/analytics.svg", title: "Track Real Orders", desc: "Every order recorded automatically — not manually tracked in a notebook or spreadsheet." },
      { icon: "/icons/domain.svg", title: "Courier Delivery Built In", desc: "Steadfast, Pathao, RedX, and eCourier connect straight from your order list." },
    ],
    faqs: [
      { q: "Do I have to stop selling on my Facebook Page?", a: "No — most F-commerce sellers keep the Page for marketing and link to their new Softunebd storefront for the actual purchase and checkout." },
      { q: "Is there a free trial?", a: "Yes — a 3-day free trial with full access. No credit card required." },
    ],
    ctaText: "Start Free",
    ctaHref: "/signup",
  },
};
