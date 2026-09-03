export interface AlternatingItem {
  pillText: string;
  pillIcon: string;
  titleStart: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  bullets: string[];
  /** Theme-aware screenshot for this section — only set for features that
   * kept the alternating media layout (Theme Editor, AI Assistant). */
  image?: { light: string; dark: string };
}

export interface ExtraCard {
  title: string;
  desc: string;
  icon: string;
}

export interface FeatureData {
  slug: string;
  pillText: string;
  titleStart: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  /** Set only for a feature simple enough to need one screenshot instead of
   * a separate image per alternating section (e.g. Payments) — shown once
   * in the hero, right under the description. Its presence switches the
   * alternating section below from "text + own media per item" to a plain
   * 3-column text grid, since one shared image repeated 3x would be
   * redundant. Leave unset for features like Theme Editor that have a
   * genuinely different visual per section. */
  heroImage?: { light: string; dark: string };
  /** Solid-color placeholder used in place of heroImage when no real
   * screenshot exists yet. The component renders a styled div at the same
   * aspect-[16/9] size. Prefer heroImage once a real screenshot is available. */
  heroPlaceholderColor?: string;
  introTitle: string;
  introDesc: string;
  alternating: AlternatingItem[];
  extraTitle: string;
  extraDesc: string;
  extraCards: ExtraCard[];
}

export const FEATURE_PAGES: Record<string, FeatureData> = {
  "multiple-themes": {
    slug: "multiple-themes",
    pillText: "Theme Editor",
    titleStart: "Design Your Store",
    titleHighlight: "Live",
    titleEnd: "",
    description:
      "Softunebd cares about your branding and identity, not a generic storefront. The Theme Editor lets you change logo, colors, fonts, and homepage sections with a live preview — then publish when the shop looks like your brand.",
    introTitle: "Your brand, not a default template",
    introDesc:
      "Softunebd is built so each store looks like the merchant, not like every other shop on the same theme. Desktop, tablet, and mobile previews sit beside your edits, so customers only see the identity you publish.",
    alternating: [
      {
        pillText: "Live Preview",
        pillIcon: "/icons/themes.svg",
        titleStart: "See It on",
        titleHighlight: "Every Screen",
        titleEnd: "",
        description:
          "Work next to a live storefront preview. Switch Desktop, Tablet, and Mobile widths and watch your edits land before anyone else does.",
        bullets: [
          "Live preview of your real theme template",
          "Desktop, tablet, and mobile device sizes",
          "Navigate pages inside the preview while you edit",
        ],
        image: { light: "/feature/theme/t1-l.webp", dark: "/feature/theme/t1-d.webp" },
      },
      {
        pillText: "Brand & Sections",
        pillIcon: "/icons/color.svg",
        titleStart: "Build Your Look,",
        titleHighlight: "Your Way",
        titleEnd: "",
        description:
          "Your branding and identity stay yours: logo, colors, fonts, and buttons. Add, remove, and reorder homepage sections, and edit the content shoppers actually see — instead of shipping a generic look.",
        bullets: [
          "Logo, site name, tagline, colors, and font pairs",
          "Drag-and-drop homepage sections without code",
          "Header links, banners, and page content in one place",
        ],
        image: { light: "/feature/theme/t2-l.webp", dark: "/feature/theme/t2-d.webp" },
      },
      {
        pillText: "AI Suggest",
        pillIcon: "/icons/ai-pencil.svg",
        titleStart: "Ask AI,",
        titleHighlight: "Then Apply",
        titleEnd: "",
        description:
          "Describe a vibe and Softunebd’s AI Suggest proposes brand colors, fonts, and copy. You review the patch, apply what you like, then publish when ready.",
        bullets: [
          "Plain-language prompts for colors, fonts, and text",
          "Review every suggestion before it changes your draft",
          "Nothing goes live until you publish",
        ],
        image: { light: "/feature/theme/t3-l.webp", dark: "/feature/theme/t3-d.webp" },
      },
    ],
    extraTitle: "Start from a theme that fits",
    extraDesc:
      "Fashion, Emporium, and Vault share the same editor, so you customize one clear design system instead of fighting a rigid template.",
    extraCards: [
      { title: "Fashion", desc: "Editorial layout for apparel, jewelry, and photo-led brands.", icon: "/icons/themes.svg" },
      { title: "Emporium", desc: "Many aisles under one roof — dense catalogs and category browsing.", icon: "/icons/color.svg" },
      { title: "Vault", desc: "Built for courses, templates, software, and other digital goods.", icon: "/icons/zap.svg" },
    ],
  },
  "ai-assistant": {
    slug: "ai-assistant",
    pillText: "AI Assistant",
    titleStart: "AI Help,",
    titleHighlight: "You Decide",
    titleEnd: "",
    description:
      "Softunebd’s AI is powered by Google Gemini. It writes product copy, suggests theme changes, and chats about your store data. You review every change before it saves.",
    introTitle: "Gemini drafts. You approve.",
    introDesc:
      "Product descriptions, Theme Editor suggestions, and dashboard AI chat all share the same rule: Softunebd never writes to your live store until you confirm.",
    alternating: [
      {
        pillText: "Product Copy",
        pillIcon: "/icons/ai-pencil.svg",
        titleStart: "Write Copy,",
        titleHighlight: "One Click",
        titleEnd: "",
        description:
          "Generate a product description from the product form, regenerate anytime, then edit the text before you save.",
        bullets: [
          "One-click generate from the product editor",
          "Regenerate until the wording feels right",
          "Fully editable before you save",
        ],
        image: { light: "/feature/ai/a1-l.webp", dark: "/feature/ai/a1-d.webp" },
      },
      {
        pillText: "AI Suggest",
        pillIcon: "/icons/themes.svg",
        titleStart: "Ask for a Look,",
        titleHighlight: "Apply It",
        titleEnd: "",
        description:
          "In Theme Editor, describe a vibe and Gemini suggests colors, fonts, and brand text. Review the patch, apply what you like, then publish when ready.",
        bullets: [
          "Plain-language prompts for brand and style",
          "See every field before you apply",
          "Still needs Publish to go live",
        ],
        image: { light: "/feature/ai/a2-l.webp", dark: "/feature/ai/a2-d.webp" },
      },
      {
        pillText: "AI Chat",
        pillIcon: "/icons/chat.svg",
        titleStart: "Ask Softunebd,",
        titleHighlight: "Get Answers",
        titleEnd: "",
        description:
          "Chat in the dashboard about products, orders, and sales. Softunebd reads your real store data and can propose product or category changes you still confirm.",
        bullets: [
          "Powered by Google Gemini",
          "Answers from your own products and orders",
          "Confirm cards before any write is saved",
        ],
        // Only 2 dedicated AI screenshots exist — reusing the Theme Editor's
        // AI Suggest shot (t3) for this third section, per instruction.
        image: { light: "/feature/theme/t3-l.webp", dark: "/feature/theme/t3-d.webp" },
      },
    ],
    extraTitle: "Safe by design",
    extraDesc:
      "AI only proposes through the same paths a manual edit uses. Daily AI usage follows your plan limits.",
    extraCards: [
      { title: "Review First", desc: "Suggestions are patches you apply, never silent auto-writes.", icon: "/icons/lock.svg" },
      { title: "Scoped Actions", desc: "Chat can propose specific product or category changes, nothing broader.", icon: "/icons/ai-pencil.svg" },
      { title: "Daily Limits", desc: "Usage is capped per day by your plan and shown on the dashboard.", icon: "/icons/wallet.svg" },
    ],
  },
  "fraud-protection": {
    slug: "fraud-protection",
    pillText: "Fraud Protection",
    titleStart: "Stop Fake",
    titleHighlight: "COD Orders",
    titleEnd: "",
    description:
      "Protect Cash on Delivery sales with a phone blocklist enforced at checkout, plus fraud rules you control from one Softunebd screen.",
    heroImage: { light: "/feature/fraud-l.webp", dark: "/feature/fraud-d.webp" },
    introTitle: "Built for COD abuse, not card scoring",
    introDesc:
      "Fraud Protection sits next to Orders. Block bad phones, keep notes for your team, and tune rules that match how your store gets burned.",
    alternating: [
      {
        pillText: "Phone Blocklist",
        pillIcon: "/icons/lock.svg",
        titleStart: "Block Bad",
        titleHighlight: "Numbers",
        titleEnd: "",
        description:
          "Add a phone to your store blocklist and Softunebd rejects it at checkout automatically, not just as a later warning.",
        bullets: [
          "Enforced live at checkout today",
          "Optional notes for your team",
          "Scoped to your store only",
          "Add or remove numbers anytime",
          "Works alongside your other fraud rules",
        ],
      },
      {
        pillText: "Fraud Rules",
        pillIcon: "/icons/orders.svg",
        titleStart: "Set Your",
        titleHighlight: "Rules",
        titleEnd: "",
        description:
          "Configure high-value first-order holds and burst-order flags, and toggle each rule independently from Fraud Protection.",
        bullets: [
          "High-value first-order threshold",
          "Burst-order detection window",
          "Each rule can be turned on or off",
          "You set the threshold amount",
          "Applies automatically at checkout",
        ],
      },
      {
        pillText: "Per Store",
        pillIcon: "/icons/domain.svg",
        titleStart: "Saved With Your",
        titleHighlight: "Store",
        titleEnd: "",
        description:
          "Fraud settings belong to each storefront, so different shops can run different blocklists and rules.",
        bullets: [
          "Per-site blocklist and rules",
          "No separate fraud SaaS to buy",
          "Same tenant isolation as Softunebd orders",
          "Configured from your Fraud Protection screen",
          "Different shops can run different rules",
        ],
      },
    ],
    extraTitle: "Built for COD safety",
    extraDesc:
      "Softunebd blocklists stop bad phones at checkout, and fraud rules stay under your control on one screen.",
    extraCards: [
      { title: "Your Numbers", desc: "You choose what to block. Nothing is forced on by default.", icon: "/icons/zap.svg" },
      { title: "Team Notes", desc: "Blocklist entries can carry context for staff.", icon: "/icons/book.svg" },
      { title: "One Dashboard", desc: "Configured beside Orders and Site Settings.", icon: "/icons/delivery.svg" },
    ],
  },
  "courier": {
    slug: "courier",
    pillText: "Couriers",
    titleStart: "Ship With the",
    titleHighlight: "Partners You Use",
    titleEnd: "",
    description:
      "Connect Steadfast, Pathao, RedX, and eCourier from Softunebd Couriers with your own merchant accounts. The same screen also lists Paperfly, Sundarban, Carrybee, SA Paribahan, and PandaGo.",
    heroImage: { light: "/feature/courier-l.webp", dark: "/feature/courier-d.webp" },
    introTitle: "Bangladesh couriers on one Softunebd screen",
    introDesc:
      "Softunebd does not use a shared Softunebd courier login. You connect your own credentials. Steadfast, Pathao, RedX, and eCourier can connect today; the rest of the roster lives on the same Couriers page.",
    alternating: [
      {
        pillText: "Partner Roster",
        pillIcon: "/icons/delivery.svg",
        titleStart: "All Partners,",
        titleHighlight: "One Place",
        titleEnd: "",
        description:
          "See every Softunebd courier option in one dashboard list instead of hunting separate apps for each logistics brand.",
        bullets: [
          "Steadfast — connect today",
          "Pathao Courier — connect today",
          "RedX — connect today",
          "eCourier — connect today",
          "Paperfly, Sundarban, Carrybee, SA Paribahan, PandaGo — on the same roster",
        ],
      },
      {
        pillText: "Connect Today",
        pillIcon: "/icons/zap.svg",
        titleStart: "Four Partners,",
        titleHighlight: "Ready Now",
        titleEnd: "",
        description:
          "Connect Steadfast, Pathao, RedX, or eCourier with your own merchant credentials. Steadfast verifies keys against its API before save; the others store your account the same encrypted way.",
        bullets: [
          "Steadfast API key and secret, verified on connect",
          "Pathao merchant API (client ID, secret, username, password)",
          "RedX access token",
          "eCourier username and password",
          "Your own merchant account — never a shared Softunebd login",
        ],
      },
      {
        pillText: "Secure Setup",
        pillIcon: "/icons/lock.svg",
        titleStart: "Your Keys,",
        titleHighlight: "Your Account",
        titleEnd: "",
        description:
          "Courier credentials are encrypted at rest, scoped per store, and never shared Softunebd logins. Paperfly, Sundarban, Carrybee, SA Paribahan, and PandaGo stay on the same roster as those connects land.",
        bullets: [
          "Encrypted credential storage",
          "Per-store courier settings",
          "No shared Softunebd courier account",
          "One screen for the full partner list",
          "Same encryption Softunebd uses for payments",
        ],
      },
    ],
    extraTitle: "Built for Bangladesh logistics",
    extraDesc:
      "Connect Steadfast, Pathao, RedX, and eCourier today. Paperfly, Sundarban, Carrybee, SA Paribahan, and PandaGo stay on the same Couriers screen.",
    extraCards: [
      { title: "Connect Today", desc: "Steadfast, Pathao, RedX, and eCourier — your own merchant accounts, one Couriers screen.", icon: "/icons/delivery.svg" },
      { title: "Verified Connect", desc: "Steadfast keys are checked with the courier API before save.", icon: "/icons/zap.svg" },
      { title: "Encrypted", desc: "Courier credentials are encrypted at rest like payment credentials.", icon: "/icons/lock.svg" },
    ],
  },
  "store-analytics": {
    slug: "store-analytics",
    pillText: "Store Analytics",
    titleStart: "Know Your",
    titleHighlight: "Real Numbers",
    titleEnd: "",
    description:
      "Track revenue, visitor traffic, conversion rate, and profit from your Softunebd storefront and orders. Export CSV, JSON, or PDF when you need a report.",
    heroImage: { light: "/feature/analytics-l.webp", dark: "/feature/analytics-d.webp" },
    introTitle: "Sales, traffic, and profit in one place",
    introDesc:
      "Pick a 1 to 26 week window. Softunebd shows revenue, orders, refunds, unique visitors, conversion rate, and profit when you have set Cost Prices on products.",
    alternating: [
      {
        pillText: "Sales Metrics",
        pillIcon: "/icons/analytics.svg",
        titleStart: "Revenue,",
        titleHighlight: "Orders, AOV",
        titleEnd: "",
        description:
          "See revenue, order count, average order value, and refund rate for your window, each with a period-over-period change, plus best sellers and category share.",
        bullets: [
          "1 to 26 week reporting window",
          "Period-over-period change on each metric",
          "Weekly revenue trend and best sellers",
          "CSV, JSON, and PDF export when you need a report",
        ],
      },
      {
        pillText: "Visitor Traffic",
        pillIcon: "/icons/zap.svg",
        titleStart: "Real Visitors,",
        titleHighlight: "Conversion Rate",
        titleEnd: "",
        description:
          "Softunebd tracks unique visitors on your storefront and shows Conversion Rate (orders ÷ unique visitors) next to your sales numbers, so you can see whether traffic is turning into orders.",
        bullets: [
          "Unique visitor counts from your live storefront",
          "Conversion Rate = orders ÷ unique visitors",
          "Traffic and conversion in the same date window as revenue",
          "Built into Softunebd analytics, no extra visitor tag for this view",
        ],
      },
      {
        pillText: "Profit Tracking",
        pillIcon: "/icons/wallet.svg",
        titleStart: "Know Your",
        titleHighlight: "Real Profit",
        titleEnd: "",
        description:
          "Set a Cost Price per product and Softunebd shows profit (revenue minus cost) alongside revenue. Profit is only as complete as the cost data you enter — products without Cost Price do not contribute to the profit figure yet.",
        bullets: [
          "Set Cost Price per product in the product editor",
          "Profit = revenue minus cost from real orders",
          "Shown beside revenue so you see both at a glance",
          "No Cost Price yet? Revenue stays accurate; profit waits on your cost data",
        ],
      },
    ],
    extraTitle: "Built on what actually happened",
    extraDesc:
      "Softunebd analytics follow your orders, storefront visitors, and the cost prices you set — not estimates or invented funnels.",
    extraCards: [
      { title: "Order-Based", desc: "Revenue and orders come from real Softunebd checkouts.", icon: "/icons/analytics.svg" },
      { title: "Real Traffic", desc: "Visitor counts and conversion rate come from your storefront.", icon: "/icons/zap.svg" },
      { title: "Honest Profit", desc: "Profit only fills in after you set Cost Price on products.", icon: "/icons/wallet.svg" },
    ],
  },

  "orders": {
    slug: "orders",
    pillText: "Orders",
    titleStart: "Orders That",
    titleHighlight: "Stay True",
    titleEnd: "",
    description:
      "Search, filter, update status, and print slips from one screen. Every order keeps a snapshot of what was sold, so catalog edits never rewrite history.",
    heroImage: { light: "/feature/order-l.webp", dark: "/feature/order-d.webp" },
    introTitle: "Past sales stay accurate",
    introDesc:
      "Each line item stores name, SKU, and price at checkout. Edit or delete the product later and the order still shows what the customer bought.",
    alternating: [
      {
        pillText: "Find Fast",
        pillIcon: "/icons/orders.svg",
        titleStart: "Find Any",
        titleHighlight: "Order",
        titleEnd: "",
        description:
          "Search by order number or customer details, then filter by status to get to the right order quickly.",
        bullets: [
          "Search by order number or customer",
          "Filter by order status",
          "Clear list for day-to-day ops",
          "No digging through spreadsheets",
          "Built for daily fulfillment work",
        ],
      },
      {
        pillText: "Snapshots",
        pillIcon: "/icons/lock.svg",
        titleStart: "History That",
        titleHighlight: "Doesn’t Drift",
        titleEnd: "",
        description:
          "Softunebd locks product name, SKU, and unit price into the order at sale time, so later catalog changes cannot rewrite old totals.",
        bullets: [
          "Name, SKU, and price locked at sale",
          "Deleting a product does not break past orders",
          "Totals priced from your catalog on the server",
          "Refunds and disputes stay accurate",
          "Trustworthy history for support and accounting",
        ],
      },
      {
        pillText: "Print & Status",
        pillIcon: "/icons/doc.svg",
        titleStart: "Print Slips,",
        titleHighlight: "Update Status",
        titleEnd: "",
        description:
          "Print a delivery slip or invoice in one click, and move orders through pending, paid, fulfilled, cancelled, or refunded.",
        bullets: [
          "One-click invoice or delivery slip",
          "Status updates as you fulfill",
          "Notes when your team needs context",
          "Keep customers updated at each stage",
          "One place for the whole order lifecycle",
        ],
      },
    ],
    extraTitle: "Built for daily ops",
    extraDesc:
      "Orders are tenant-scoped and server-priced. Bulk tools and packing barcodes are still expanding.",
    extraCards: [
      { title: "Status Flow", desc: "Move orders through fulfillment statuses as work happens.", icon: "/icons/zap.svg" },
      { title: "Server Totals", desc: "Totals come from your catalog, not client-submitted prices.", icon: "/icons/wallet.svg" },
      { title: "Per Store", desc: "Orders stay inside one storefront account.", icon: "/icons/lock.svg" },
    ],
  },
  "payments": {
    slug: "payments",
    pillText: "Payments",
    titleStart: "Payments,",
    titleHighlight: "Made Simple",
    titleEnd: "",
    description:
      "Take Cash on Delivery, manual bKash/Nagad, official bKash, Nagad, and SSLCommerz from one Softunebd Payments screen. Everything stays centralized and easy to manage.",
    // Note: source filenames are "paymet-*" (typo in the asset itself), not "payment-*".
    heroImage: { light: "/feature/paymet-l.webp", dark: "/feature/paymet-d.webp" },
    introTitle: "BD payments on one Softunebd screen",
    introDesc:
      "Connect Cash on Delivery, manual bKash/Nagad wallets, official bKash merchant checkout, Nagad merchant API, and SSLCommerz from Payments. You connect your own merchant credentials — Softunebd does not use a shared payment login.",
    alternating: [
      {
        pillText: "bKash & Nagad",
        pillIcon: "/icons/billing.svg",
        titleStart: "bKash &",
        titleHighlight: "Nagad",
        titleEnd: "",
        description:
          "Connect official bKash and Nagad merchant accounts, or take manual wallet payments: the shopper pays your number, submits a transaction ID, and you verify before you ship.",
        bullets: [
          "Official bKash merchant checkout — connect App Key, App Secret, username, and password",
          "Nagad merchant API — merchant ID plus RSA keys",
          "Manual bKash and Nagad with a transaction ID on each order",
          "No extra plugin — same Payments screen",
          "Works alongside Cash on Delivery and SSLCommerz",
        ],
      },
      {
        pillText: "Cash on Delivery",
        pillIcon: "/icons/wallet.svg",
        titleStart: "Add",
        titleHighlight: "COD",
        titleEnd: "",
        description:
          "Turn on Cash on Delivery with an optional fee when your store needs pay-on-delivery checkout beside wallet payments.",
        bullets: [
          "Easy to enable next to wallet methods",
          "Optional COD fee",
          "Same Payments screen as bKash, Nagad, and SSLCommerz",
          "No card gateway needed to launch",
          "The default most Bangladeshi shoppers expect",
        ],
      },
      {
        pillText: "All in One",
        pillIcon: "/icons/lock.svg",
        titleStart: "One Screen,",
        titleHighlight: "Easy Setup",
        titleEnd: "",
        description:
          "Payment methods stay centralized in Softunebd. Enable COD, wallet methods, and gateway connects, keep credentials secure, and avoid juggling separate payment plugins.",
        bullets: [
          "Centralized payment tools in one dashboard",
          "COD, manual wallets, official bKash, Nagad, and SSLCommerz",
          "Encrypted credential storage",
          "Switch methods without rebuilding checkout",
          "One place to audit every payment method",
        ],
      },
    ],
    extraTitle: "Built for real checkouts",
    extraDesc:
      "COD, bKash, Nagad, and SSLCommerz — the methods Bangladeshi shoppers already use, kept simple and centralized.",
    extraCards: [
      { title: "bKash & Nagad", desc: "Official merchant checkout plus manual wallet payments with a transaction ID.", icon: "/icons/billing.svg" },
      { title: "SSLCommerz", desc: "Connect your SSLCommerz store for cards, mobile banking, and netbanking.", icon: "/icons/wallet.svg" },
      { title: "COD", desc: "Offer Cash on Delivery when your customers prefer to pay on receipt.", icon: "/icons/zap.svg" },
    ],
  },
  "customer-management": {
    slug: "customer-management",
    pillText: "Customers",
    titleStart: "Know Who",
    titleHighlight: "Buys Again",
    titleEnd: "",
    description:
      "Softunebd builds customer records from real orders using phone numbers, so you can see order history, spend, and last purchase in one place.",
    heroImage: { light: "/feature/customer-l.webp", dark: "/feature/customer-d.webp" },
    introTitle: "Customers from checkout, not spreadsheets",
    introDesc:
      "The first time a phone checks out, Softunebd creates a customer. Later orders from that number link to the same record, even when the number is typed in different formats.",
    alternating: [
      {
        pillText: "Auto Match",
        pillIcon: "/icons/user.svg",
        titleStart: "Created From",
        titleHighlight: "Orders",
        titleEnd: "",
        description:
          "No separate signup form is required. Softunebd matches phones automatically and keeps one customer record per shopper.",
        bullets: [
          "Created from real checkout orders",
          "Phone matching across formats",
          "Works for storefront and manual orders",
          "No customer signup flow to build",
          "One record even across repeat guest checkouts",
        ],
      },
      {
        pillText: "History",
        pillIcon: "/icons/orders.svg",
        titleStart: "See Spend,",
        titleHighlight: "See Orders",
        titleEnd: "",
        description:
          "Open a customer to see order count, total spend, last order date, and every linked order.",
        bullets: [
          "Order count and total spend",
          "Full linked order history",
          "Search and filter your list",
          "Spot your highest-spending customers",
          "Useful context for support conversations",
        ],
      },
      {
        pillText: "Export",
        pillIcon: "/icons/doc.svg",
        titleStart: "Export",
        titleHighlight: "CSV",
        titleEnd: "",
        description:
          "Export customers to CSV anytime, and edit name or email on the profile when you need cleaner contact details.",
        bullets: [
          "One-click CSV export",
          "Edit name and email per customer",
          "Copy phone or email from the profile",
          "Import into your own CRM or spreadsheet",
          "Customer data stays portable, not locked in",
        ],
      },
    ],
    extraTitle: "Built from real checkouts",
    extraDesc:
      "Softunebd tracks who bought and what they ordered. Loyalty and campaign tools live in Add-Ons when you need them.",
    extraCards: [
      { title: "Phone First", desc: "Phone is the reliable ID for COD-heavy stores.", icon: "/icons/wallet.svg" },
      { title: "Clear History", desc: "See spend and orders for each matched shopper.", icon: "/icons/orders.svg" },
      { title: "Per Store", desc: "Customer lists stay scoped to each storefront.", icon: "/icons/domain.svg" },
    ],
  },
  "marketing-tracking": {
    slug: "marketing-tracking",
    pillText: "Marketing & Tracking",
    titleStart: "Pixels That",
    titleHighlight: "Actually Work",
    titleEnd: "",
    description:
      "Connect Facebook/Meta Pixel, TikTok Pixel, Google Tag Manager, and GA4 to your Softunebd store. Softunebd fires real ecommerce events — ViewContent, AddToCart, InitiateCheckout, Purchase — not just a generic PageView. Meta Conversions API sends Purchase events server-side so ad blockers and iOS privacy settings cannot strip them.",
    heroImage: { light: "/feature/marketing-l.webp", dark: "/feature/marketing-d.webp" },
    introTitle: "Real events on every platform, server-side where it counts",
    introDesc:
      "Softunebd fires ecommerce events — not just PageView — across Meta, TikTok, GTM, and GA4. The Meta Conversions API layer sends Purchase data from Softunebd's own server, deduplicated against the browser pixel automatically.",
    alternating: [
      {
        pillText: "Meta & TikTok Pixels",
        pillIcon: "/icons/analytics.svg",
        titleStart: "Real Events,",
        titleHighlight: "Not Just PageView",
        titleEnd: "",
        description:
          "Facebook/Meta Pixel and TikTok Pixel both fire the full ecommerce event set: ViewContent when a shopper views a product, AddToCart, InitiateCheckout, and Purchase on order completion. Previously only a generic PageView was sent.",
        bullets: [
          "ViewContent, AddToCart, InitiateCheckout, Purchase events",
          "Facebook/Meta Pixel — real ecommerce events (upgraded from PageView only)",
          "TikTok Pixel — new, same event set",
          "Add your Pixel ID from the Softunebd integrations screen",
          "No custom code or tag setup required",
        ],
      },
      {
        pillText: "GTM & GA4",
        pillIcon: "/icons/analytics.svg",
        titleStart: "Your GTM,",
        titleHighlight: "Connected",
        titleEnd: "",
        description:
          "Google Tag Manager uses a container-based approach: add your own GTM ID and Softunebd loads your container, so you control what fires from inside GTM. Google Analytics (GA4) is also supported and now fires the same real ecommerce events alongside other pixels.",
        bullets: [
          "Google Tag Manager — container-based, add your own GTM ID",
          "You manage tags inside GTM as normal",
          "GA4 — real ecommerce events (upgraded from PageView only)",
          "GTM and GA4 can run alongside Meta and TikTok pixels",
          "One integrations screen for all tracking connections",
        ],
      },
      {
        pillText: "Meta Conversions API",
        pillIcon: "/icons/lock.svg",
        titleStart: "Server-Side",
        titleHighlight: "Purchase Tracking",
        titleEnd: "",
        description:
          "Meta Conversions API (CAPI) sends Purchase events directly from Softunebd's server to Meta — not just from the customer's browser. This means sales still get tracked even when the customer's browser ad blocker or iOS privacy settings strip the client-side pixel. Events are automatically deduplicated against the browser pixel so there's no double-counting.",
        bullets: [
          "Purchase sent server-side from Softunebd, not the customer's browser",
          "Survives ad blockers and iOS privacy restrictions that strip browser pixels",
          "Automatic deduplication against the browser-side Meta Pixel",
          "No double-counting — each sale reported once to Meta",
          "A real edge over setups that only fire client-side pixels",
        ],
      },
    ],
    extraTitle: "Tracking that survives the real web",
    extraDesc:
      "Browser pixels alone miss sales blocked by ad blockers and iOS. Softunebd's server-side Meta CAPI layer closes that gap for Meta campaigns.",
    extraCards: [
      { title: "Full Event Set", desc: "ViewContent, AddToCart, InitiateCheckout, Purchase — not just PageView.", icon: "/icons/analytics.svg" },
      { title: "Server-Side CAPI", desc: "Purchase events from Softunebd's server survive ad blockers and iOS privacy settings.", icon: "/icons/lock.svg" },
      { title: "No Double-Count", desc: "Browser pixel and CAPI are deduplicated automatically — one sale, one event.", icon: "/icons/zap.svg" },
    ],
  },
  "store-sale": {
    slug: "store-sale",
    pillText: "Store Sale",
    titleStart: "Sell In Person,",
    titleHighlight: "Same Catalog",
    titleEnd: "",
    description:
      "Softunebd Store Sale is a walk-in checkout against your live product catalog. Search products, filter by category, build a sale, record how the customer paid, and print a receipt — without a separate POS product.",
    heroImage: { light: "/feature/pos-l.webp", dark: "/feature/pos-d.webp" },
    introTitle: "Counter sales that use your real Softunebd inventory",
    introDesc:
      "Store Sale creates orders on the same catalog and stock your storefront uses, tagged as POS channel so you can tell walk-in sales from online checkouts.",
    alternating: [
      {
        pillText: "Fast Catalog",
        pillIcon: "/icons/shop-bag.svg",
        titleStart: "Find Products",
        titleHighlight: "Fast",
        titleEnd: "",
        description:
          "Search by name or SKU, filter by category, and add items from a compact list. A USB barcode scanner can type into the same search field.",
        bullets: [
          "Category chips to show All or one category",
          "Compact product rows with price and stock",
          "Pagination so long catalogs stay manageable",
          "Uses your live Softunebd products, not a separate POS catalog",
        ],
      },
      {
        pillText: "Current Sale",
        pillIcon: "/icons/cart.svg",
        titleStart: "Build the",
        titleHighlight: "Sale",
        titleEnd: "",
        description:
          "Adjust quantities, remove lines, add optional customer name or phone, and choose Cash, Card, or Mobile Banking as the payment label recorded on the order.",
        bullets: [
          "Quantity steppers and line totals",
          "Optional customer name and phone",
          "Payment method saved on the order meta",
          "Complete Sale creates a real Softunebd order",
        ],
      },
      {
        pillText: "Receipts & History",
        pillIcon: "/icons/orders.svg",
        titleStart: "Receipts and",
        titleHighlight: "Recent Sales",
        titleEnd: "",
        description:
          "After a sale, Softunebd shows a thermal-style receipt you can print, and a Recent Sales list of walk-in orders you can open in the same order detail modal used elsewhere in the dashboard.",
        bullets: [
          "Printable receipt with shop name, date, time, and totals",
          "Recent Sales filtered to Store Sale (POS) orders",
          "Open any recent sale to review status and items",
          "Not a full cash-drawer register — no drawer session or refunds-at-counter flow",
        ],
      },
    ],
    extraTitle: "Same stock, clearer channel",
    extraDesc:
      "Store Sale writes to Softunebd orders with channel set to POS, so analytics and order history can separate walk-in sales from storefront checkouts.",
    extraCards: [
      { title: "Live Catalog", desc: "Products and stock come from the same Softunebd catalog as your online store.", icon: "/icons/shop-bag.svg" },
      { title: "Print Receipt", desc: "Browser print of a shop-style slip — no separate printer SDK required.", icon: "/icons/doc.svg" },
      { title: "Recent Sales", desc: "Open past walk-in orders without leaving Store Sale.", icon: "/icons/orders.svg" },
    ],
  },
};

export const FEATURES_LIST = [
  { slug: "multiple-themes", title: "Theme Editor", icon: "/icons/color.svg", desc: "Your branding and identity — live preview, not a generic look" },
  { slug: "ai-assistant", title: "AI Assistant", icon: "/icons/ai-pencil.svg", desc: "Gemini copy, Suggest, and chat" },
  { slug: "payments", title: "Payments", icon: "/icons/wallet.svg", desc: "COD, bKash, Nagad, and SSLCommerz" },
  { slug: "store-sale", title: "Store Sale", icon: "/icons/shop-bag.svg", desc: "Walk-in checkout on your live catalog" },
  { slug: "marketing-tracking", title: "Marketing & Tracking", icon: "/icons/analytics.svg", desc: "Meta CAPI, TikTok, GTM, and GA4 events" },
  { slug: "store-analytics", title: "Store Analytics", icon: "/icons/analytics.svg", desc: "Revenue, profit, traffic, and conversion" },
  { slug: "courier", title: "Couriers", icon: "/icons/delivery.svg", desc: "Steadfast, Pathao, RedX, eCourier, and more" },
  { slug: "orders", title: "Orders", icon: "/icons/orders.svg", desc: "Search, snapshots, and print slips" },
  { slug: "customer-management", title: "Customers", icon: "/icons/user.svg", desc: "Phone-matched buyers from orders" },
  { slug: "fraud-protection", title: "Fraud Protection", icon: "/icons/lock.svg", desc: "Phone blocklist and COD rules" },
];
