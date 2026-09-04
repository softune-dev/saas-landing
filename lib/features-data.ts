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
      "Protect Cash on Delivery sales with a phone blocklist, site-wide IP blocking, device checkout rules, and a Suspicious Orders review queue — all controlled from one Softunebd screen.",
    heroImage: { light: "/feature/fraud-l.webp", dark: "/feature/fraud-d.webp" },
    introTitle: "Built for COD abuse, not card scoring",
    introDesc:
      "Fraud Protection sits next to Orders. Block bad phones and IPs, stop repeat checkout attempts from the same device, and review flagged orders before you ship — all tuned to match how your store gets burned.",
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

export const FEATURE_PAGES_BN: Record<string, FeatureData> = {
  "multiple-themes": {
    slug: "multiple-themes",
    pillText: "থিম এডিটর",
    titleStart: "স্টোর ডিজাইন করুন",
    titleHighlight: "লাইভ",
    titleEnd: "",
    description:
      "Softunebd আপনার ব্র্যান্ড আইডেন্টিটিকে প্রাধান্য দেয়। Theme Editor দিয়ে লোগো, কালার, ফন্ট ও সেকশন কাস্টমাইজ করুন — লাইভ প্রিভিউ দেখে পছন্দমত পাবলিশ করুন।",
    introTitle: "আপনার নিজস্ব ব্র্যান্ড আইডেন্টিটি",
    introDesc:
      "প্রতিটি শপ যেন মার্চেন্টের নিজস্ব ব্র্যান্ডের স্টাইলে দেখা যায়। ডেস্কটপ, ট্যাবলেট ও মোবাইলে লাইভ প্রিভিউ দেখে সম্পাদন করুন।",
    alternating: [
      {
        pillText: "লাইভ প্রিভিউ",
        pillIcon: "/icons/themes.svg",
        titleStart: "যেকোনো স্ক্রিনে",
        titleHighlight: "লাইভ দেখুন",
        titleEnd: "",
        description:
          "স্টোরফ্রন্ট প্রিভিউয়ের সাথে সরাসরি কাজ করুন। ডেস্কটপ, ট্যাবলেট ও মোবাইল ভিউতে আপনার কাস্টমাইজেশন তৎক্ষণাৎ দেখে নিন।",
        bullets: [
          "থিম টেমপ্লেটের লাইভ প্রিভিউ",
          "ডেস্কটপ, ট্যাবলেট ও মোবাইল সাইজ সাপোর্ট",
          "প্রিভিউ স্ক্রিনের ভেতর সরাসরি পেজ নেভিগেশন",
        ],
        image: { light: "/feature/theme/t1-l.webp", dark: "/feature/theme/t1-d.webp" },
      },
      {
        pillText: "ব্র্যান্ড ও সেকশন",
        pillIcon: "/icons/color.svg",
        titleStart: "নিজের স্টাইল,",
        titleHighlight: "নিজে ডিজাইন করুন",
        titleEnd: "",
        description:
          "লোগো, ব্র্যান্ড কালার, ফন্ট ও বাটন সহজে সেট করুন। কোডিং ছাড়াই ড্র্যাগ-অ্যান্ড-ড্রপ করে হোমপেজ সেকশন রি-অর্ডার করুন।",
        bullets: [
          "লোগো, টাইটেল, কালার ও ফন্ট পেয়ারিং",
          "কোড ছাড়াই সেকশন যোগ ও সরানোর সুবিধা",
          "হেডার লিংক, ব্যানার ও কন্টেন্ট এক জায়গায়",
        ],
        image: { light: "/feature/theme/t2-l.webp", dark: "/feature/theme/t2-d.webp" },
      },
      {
        pillText: "AI সাজেশন",
        pillIcon: "/icons/ai-pencil.svg",
        titleStart: "AI-কে বলুন,",
        titleHighlight: "অ্যাপ্লাই করুন",
        titleEnd: "",
        description:
          "আপনি শুধু আপনার কাঙ্ক্ষিত স্টাইল বা ভাইব বলুন, Softunebd-এর AI Suggest কালার ও ফন্ট প্রস্তাব করবে। রিভিউ করে সহজেই অ্যাপ্লাই করুন।",
        bullets: [
          "সহজ ভাষায় কালার ও ফন্টের জন্য AI প্রম্পট",
          "অ্যাপ্লাই করার আগে প্রতিটি সাজেশন রিভিউ করুন",
          "পাবলিশ করার আগে কোনো চেঞ্জ লাইভ হবে না",
        ],
        image: { light: "/feature/theme/t3-l.webp", dark: "/feature/theme/t3-d.webp" },
      },
    ],
    extraTitle: "উপযুক্ত থিম দিয়ে শুরু করুন",
    extraDesc:
      "Fashion, Emporium ও Vault থিমগুলো একই সহজ এডিটর ব্যবহার করে — তাই যেকোনো নিশে মানানসই স্টোর তৈরি করা সহজ।",
    extraCards: [
      { title: "Fashion", desc: "ফ্যাশন, জুয়েলারি ও ক্লথিং ব্র্যান্ডের জন্য এডিটোরিয়াল ডিজাইন।", icon: "/icons/themes.svg" },
      { title: "Emporium", desc: "অনেক প্রোডাক্ট ক্যাটাগরি ও বড় ক্যাটালগের জন্য পারফেক্ট।", icon: "/icons/color.svg" },
      { title: "Vault", desc: "ডিজিটাল কন্টেন্ট, সফটওয়্যার ও কোর্সের জন্য সেরা থিম।", icon: "/icons/zap.svg" },
    ],
  },
  "ai-assistant": {
    slug: "ai-assistant",
    pillText: "AI অ্যাসিস্ট্যান্ট",
    titleStart: "স্মার্ট AI সাহায্য,",
    titleHighlight: "আপনার নিয়ন্ত্রণে",
    titleEnd: "",
    description:
      "গুগল জেমিনি চালিত AI প্রোডাক্ট ডেসক্রিপশন ড্রাফট করে, থিম সাজেশন দেয় এবং ড্যাশবোর্ড ডেটা থেকে প্রশ্নের উত্তর দেয়। সব চেঞ্জ অ্যাপ্লাইয়ের আগে রিভিউ করার পূর্ণ স্বাধীনতা পাবেন।",
    introTitle: "জেমিনি ড্রাফট করবে, আপনি অ্যাপ্রুভ করবেন",
    introDesc:
      "প্রোডাক্ট ডেসক্রিপশন থেকে শুরু করে চ্যাটবট — আপনার অনুমতি ছাড়া AI কখনোই লাইভ স্টোরে সরাসরি কিছু সেভ করবে না।",
    alternating: [
      {
        pillText: "প্রোডাক্ট কপি",
        pillIcon: "/icons/ai-pencil.svg",
        titleStart: "এক ক্লিকে,",
        titleHighlight: "ডেসক্রিপশন তৈরি",
        titleEnd: "",
        description:
          "প্রোডাক্ট ফর্ম থেকেই এক ক্লিকে আকর্ষণীয় ডেসক্রিপশন জেনারেট করুন, প্রয়োজনে পুনরায় রি-জেনারেট করুন এবং এডিট করে সেভ করুন।",
        bullets: [
          "প্রোডাক্ট এডিটর থেকে ১-ক্লিকে জেনারেট",
          "পছন্দ না হওয়া পর্যন্ত রি-জেনারেট করার সুযোগ",
          "সেভ করার আগে সম্পূর্ণ এডিটযোগ্য",
        ],
        image: { light: "/feature/ai/a1-l.webp", dark: "/feature/ai/a1-d.webp" },
      },
      {
        pillText: "AI সাজেস্ট",
        pillIcon: "/icons/themes.svg",
        titleStart: "স্টোর লুক পছন্দ করুন,",
        titleHighlight: "অ্যাপ্লাই করুন",
        titleEnd: "",
        description:
          "Theme Editor-এ কেমন লুক চান বলুন, Gemini অটোমেটিক কালার, ফন্ট ও কন্টেন্ট সাজেস্ট করবে। অ্যাপ্লাই করে থিম পাবলিশ করুন।",
        bullets: [
          "ব্র্যান্ড স্টাইলের জন্য সাধারণ বাংলায় নির্দেশনার সুবিধা",
          "অ্যাপ্লাই করার পূর্বে প্রতিটি ফিল্ড চেক করুন",
          "লাইভ করতে সরাসরি পাবলিশ বাটন প্রেস করুন",
        ],
        image: { light: "/feature/ai/a2-l.webp", dark: "/feature/ai/a2-d.webp" },
      },
      {
        pillText: "AI চ্যাটবট",
        pillIcon: "/icons/chat.svg",
        titleStart: "প্রশ্ন করুন,",
        titleHighlight: "ইনস্ট্যান্ট উত্তর",
        titleEnd: "",
        description:
          "প্রোডাক্ট, সেলস ও অর্ডার নিয়ে ড্যাশবোর্ডে চ্যাট করুন। আপনার আসল স্টোর ডেটা বিশ্লেষণ করে AI সঠিক নির্দেশনা দেবে।",
        bullets: [
          "Google Gemini চালিত শক্তিশালী AI",
          "আপনার আসল অর্ডার ও প্রোডাক্ট ডেটা থেকে উত্তর",
          "যেকোনো অটোমেশন অ্যাকশন আপনার কনফার্মেশন সাপেক্ষ",
        ],
        image: { light: "/feature/theme/t3-l.webp", dark: "/feature/theme/t3-d.webp" },
      },
    ],
    extraTitle: "সম্পূর্ণ নিরাপদ আর্কিটেকচার",
    extraDesc:
      "AI কেবল প্রস্তাব করবে — আপনার ম্যানুয়াল চেঞ্জের মতোই সব সিদ্ধান্ত আপনার হাতে থাকবে।",
    extraCards: [
      { title: "রিভিউ ফাস্ট", desc: "সাজেশনগুলো প্রথমে আপনাকে দেখানো হয়, অটো-রাইট হয় না।", icon: "/icons/lock.svg" },
      { title: "নিরাপদ অ্যাকশন", desc: "স্পেসিফিক প্রোডাক্ট বা ক্যাটাগরি চেঞ্জের সুযোগ।", icon: "/icons/ai-pencil.svg" },
      { title: "দৈনিক লিমিট", desc: "প্ল্যান অনুযায়ী ডেইলি AI ব্যবহারের পরিষ্কার হিসাব।", icon: "/icons/wallet.svg" },
    ],
  },
  "fraud-protection": {
    slug: "fraud-protection",
    pillText: "ফ্রড প্রোটেকশন",
    titleStart: "ফেইক COD অর্ডার",
    titleHighlight: "বন্ধ করুন",
    titleEnd: "",
    description:
      "ক্যাশ অন ডেলিভারি (COD) ফেইক অর্ডার রোধ করতে ফোন নম্বর ব্লকক্লিপ ও সিকিউরিটি রুলস ব্যবহার করুন — যা এক স্ক্রিন থেকেই নিয়ন্ত্রণ করা যায়।",
    heroImage: { light: "/feature/fraud-l.webp", dark: "/feature/fraud-d.webp" },
    introTitle: "COD জালিয়াতি প্রতিরোধের বিশেষ ব্যবস্থা",
    introDesc:
      "খারাপ নম্বর ব্লক করুন, টিমের নোট রাখুন এবং আপনার ব্যবসার ধরন অনুযায়ী সিকিউরিটি রুলস কাস্টমাইজ করুন।",
    alternating: [
      {
        pillText: "ফোন ব্লকক্লিপ",
        pillIcon: "/icons/lock.svg",
        titleStart: "ফেইক নম্বর",
        titleHighlight: "ব্লক করুন",
        titleEnd: "",
        description:
          "যেকোনো সন্দেহজনক ফোন নম্বর ব্লকক্লিপে যোগ করুন। চেকআউটে ওই নম্বর দিলে সিস্টেম স্বয়ংক্রিয়ভাবে অর্ডার আটকে দেবে।",
        bullets: [
          "চেকআউটে রিয়েল-টাইমে কার্যকর",
          "টিমের জন্য বিশেষ নোট রাখার সুযোগ",
          "শুধুমাত্র আপনার স্টোরের জন্য নির্দিষ্ট",
          "যেকোনো সময় নম্বর যোগ বা রিমুভ করার সুবিধা",
          "অন্যান্য ফ্রড সিকিউরিটি রুলসের সাথে একত্রে কাজ করে",
        ],
      },
      {
        pillText: "ফ্রড সিকিউরিটি রুলস",
        pillIcon: "/icons/orders.svg",
        titleStart: "রুলস সেট",
        titleHighlight: "করুন",
        titleEnd: "",
        description:
          "বড় টাকার ফার্স্ট অর্ডার হোল্ড বা দ্রুত বারবার অর্ডার আটকানোর সিকিউরিটি রুলস সহজেই অন-অফ করুন।",
        bullets: [
          "হাই-ভ্যালু ফার্স্ট অর্ডার ফ্লাগিং",
          "শর্ট-টাইম বার্স্ট অর্ডার ডিটেকশন উইন্ডো",
          "যেকোনো রুল স্বাধীনভাবে অন/অফ করার সুবিধা",
          "আপনি নিজেই অ্যামাউন্ট থ্রেশহোল্ড সেট করবেন",
          "চেকআউটে স্বয়ংক্রিয়ভাবে প্রযোজ্য হয়",
        ],
      },
      {
        pillText: "স্টোর ভিত্তিক",
        pillIcon: "/icons/domain.svg",
        titleStart: "নিরাপদ ও",
        titleHighlight: "আইসোলেটেড",
        titleEnd: "",
        description:
          "ফ্রড সেটিংস আপনার স্টোরের জন্য আলাদা থাকবে, যাতে অন্যান্য স্টোরের সাথে কোনো কনফ্লিক্ট না হয়।",
        bullets: [
          "প্রতিটি সাইটের জন্য স্বাধীন ব্লকক্লিপ ও রুলস",
          "বাড়তি কোনো ফ্রড SaaS অ্যাপ কেনার দরকার নেই",
          "অর্ডারের মতোই সম্পূর্ণ সেপারেট ডাটাবেজ নিরাপত্তা",
          "ফ্রড প্রোটেকশন স্ক্রিন থেকেই সরাসরি নিয়ন্ত্রণযোগ্য",
          "আলাদা আলাদা স্টোরে ভিন্ন ভিন্ন রুলস চালানোর সুযোগ",
        ],
      },
    ],
    extraTitle: "COD নিরাপত্তার জন্য তৈরি",
    extraDesc:
      "Softunebd ব্লকক্লিপ ক্ষতিকর নম্বর রিজেক্ট করে এবং নিরাপত্তা নিশ্চিত করে।",
    extraCards: [
      { title: "আপনার কন্ট্রোল", desc: "আপনি সিদ্ধান্ত নেবেন কোনটা ব্লক করবেন।", icon: "/icons/zap.svg" },
      { title: "টিম নোটস", desc: "স্টাফদের জন্য নম্বরের হিস্ট্রি লিখে রাখা যায়।", icon: "/icons/book.svg" },
      { title: "এক ড্যাশবোর্ড", desc: "অর্ডার ও সাইট সেটিংসের পাশেই অবস্থিত।", icon: "/icons/delivery.svg" },
    ],
  },
  "courier": {
    slug: "courier",
    pillText: "কুরিয়ার ডেলিভারি",
    titleStart: "লোকাল কুরিয়ারে",
    titleHighlight: "সহজ শিপিং",
    titleEnd: "",
    description:
      "Steadfast, Pathao, RedX এবং eCourier আপনার নিজস্ব মার্চেন্ট অ্যাকাউন্ট দিয়ে সরাসরি কানেক্ট করুন। একই সাথে Paperfly, Sundarban, Carrybee ও অন্যান্য কুরিয়ার সুবিধা উপভোগ করুন।",
    heroImage: { light: "/feature/courier-l.webp", dark: "/feature/courier-d.webp" },
    introTitle: "বাংলাদেশের সব জনপ্রিয় কুরিয়ার এক প্ল্যাটফর্মে",
    introDesc:
      "Softunebd কোনো শেয়ার্ড অ্যাকাউন্ট ব্যবহার করে না। আপনার নিজস্ব কুরিয়ার মার্চেন্ট আইডি ও কি দিয়ে সরাসরি কানেক্ট করতে পারবেন।",
    alternating: [
      {
        pillText: "কুরিয়ার পার্টনার্স",
        pillIcon: "/icons/delivery.svg",
        titleStart: "সব কুরিয়ার,",
        titleHighlight: "এক স্ক্রিনে",
        titleEnd: "",
        description:
          "আলাদা আলাদা ড্যাশবোর্ডে লগইন না করে Softunebd-এর এক স্ক্রিন থেকেই সব কুরিয়ারের তথ্য পাবেন।",
        bullets: [
          "Steadfast — আজই সরাসরি কানেক্ট করুন",
          "Pathao Courier — আজই সরাসরি কানেক্ট করুন",
          "RedX — আজই সরাসরি কানেক্ট করুন",
          "eCourier — আজই সরাসরি কানেক্ট করুন",
          "Paperfly, Sundarban, Carrybee, SA Paribahan, PandaGo — একই প্যানেলে যুক্ত",
        ],
      },
      {
        pillText: "ইনস্ট্যান্ট সংযোগ",
        pillIcon: "/icons/zap.svg",
        titleStart: "মার্চেন্ট অ্যাকাউন্ট,",
        titleHighlight: "সরাসরি লিঙ্ক",
        titleEnd: "",
        description:
          "আপনার নিজস্ব মার্চেন্ট ক্রেডেনশিয়াল ব্যবহার করে কানেক্ট করুন। Steadfast কি ভ্যালিডেট করে নিরাপদ কানেকশন তৈরি করে।",
        bullets: [
          "Steadfast API Key ও Secret ভ্যালিডেশন সহ যুক্ত",
          "Pathao Merchant Client ID, Secret, Username ও Password ইন্টিগ্রেশন",
          "RedX Access Token সরাসরি লিঙ্ক করার সুযোগ",
          "eCourier Username ও Password দিয়ে কানেক্ট",
          "সম্পূর্ণ নিজস্ব মার্চেন্ট অ্যাকাউন্ট — কোনো শেয়ার্ড লগইন নয়",
        ],
      },
      {
        pillText: "নিরাপদ সেটআপ",
        pillIcon: "/icons/lock.svg",
        titleStart: "আপনার কি,",
        titleHighlight: "সুরক্ষিত ডেটা",
        titleEnd: "",
        description:
          "কুরিয়ার ক্রেডেনশিয়াল আপনার স্টোরের জন্য ইনক্রিপ্ট করে সেভ রাখা হয়।",
        bullets: [
          "ইনক্রিপ্টেড ক্রেডেনশিয়াল স্টোরেজ",
          "প্রতিটি স্টোরের জন্য আলাদা কুরিয়ার সেটিংস",
          "কোনো সাধারণ শেয়ার্ড কুরিয়ার অ্যাকাউন্ট নয়",
          "এক স্ক্রিন থেকেই সম্পূর্ণ পার্টনার লিস্ট দেখার সুবিধা",
          "পেমেন্টের মতোই সর্বোচ্চ এনক্রিপশন নিরাপত্তা",
        ],
      },
    ],
    extraTitle: "বাংলাদেশি লজিস্টিকসের জন্য পারফেক্ট",
    extraDesc:
      "Steadfast, Pathao, RedX ও eCourier কানেক্ট করে আজই আপনার শিপিং পরিচালনা শুরু করুন।",
    extraCards: [
      { title: "সরাসরি পার্টনারশিপ", desc: "নিজের মার্চেন্ট আইডি দিয়ে সরাসরি শিপিং বুক করুন।", icon: "/icons/delivery.svg" },
      { title: "API ভ্যালিডেশন", desc: "সেভ করার সময় API কি সাথে সাথে যাচাই করে নেয়।", icon: "/icons/zap.svg" },
      { title: "ইনক্রিপ্টেড", desc: "ক্রেডেনশিয়াল ডাটাবেজে সম্পূর্ণ সুরক্ষিত থাকে।", icon: "/icons/lock.svg" },
    ],
  },
  "store-analytics": {
    slug: "store-analytics",
    pillText: "স্টোর অ্যানালিটিক্স",
    titleStart: "স্টোরের সঠিক",
    titleHighlight: "হিসাব রাখুন",
    titleEnd: "",
    description:
      "রেভিনিউ, ভিজিটর ট্রাফিক, কনভার্সন রেট এবং নেট প্রফিট লাইভ ট্র্যাক করুন। যেকোনো সময় CSV বা PDF রিপোর্ট ডাউনলোড করুন।",
    heroImage: { light: "/feature/analytics-l.webp", dark: "/feature/analytics-d.webp" },
    introTitle: "সেলস, ট্রাফিক ও প্রফিট এক জায়গায়",
    introDesc:
      "১ থেকে ২৬ সপ্তাহের টাইমলাইন সিলেক্ট করুন। কস্ট প্রাইস দেওয়া থাকলে রেভিনিউ, অর্ডার, রিফান্ড ও নেট প্রফিট এক নজরে দেখতে পাবেন।",
    alternating: [
      {
        pillText: "সেলস মেট্রিক্স",
        pillIcon: "/icons/analytics.svg",
        titleStart: "রেভিনিউ,",
        titleHighlight: "অর্ডার ও AOV",
        titleEnd: "",
        description:
          "আপনার সিলেক্ট করা সময়ে রেভিনিউ, মোট অর্ডার, গড় অর্ডার ভ্যালু ও রিফান্ড রেট রিয়েল-টাইমে দেখুন।",
        bullets: [
          "১ থেকে ২৬ সপ্তাহের ফিল্টারিং উইন্ডো",
          "আগের সময়ের সাথে তুলনামূলক বৃদ্ধির গ্রাফ",
          "সাপ্তাহিক রেভিনিউ ট্রেন্ড ও বেস্ট সেলিং প্রোডাক্টস",
          "রিপোর্টের জন্য যেকোনো সময় CSV, JSON বা PDF এক্সপোর্ট",
          "আসল চেকআউট ডেটা থেকে রিয়েল-টাইম মেট্রিক্স",
        ],
      },
      {
        pillText: "ভিজিটর ট্রাফিক",
        pillIcon: "/icons/zap.svg",
        titleStart: "ইউনিক ভিজিটর ও",
        titleHighlight: "কনভার্সন রেট",
        titleEnd: "",
        description:
          "স্টোরের ইউনিক ভিজিটর সংখ্যা ট্র্যাক করে কত শতাংশ কাস্টমার কেনাকাটা করছে তা সহজে জেনে নিন।",
        bullets: [
          "লাইভ স্টোরফ্রন্টের আসল ইউনিক ভিজিটর কাউন্ট",
          "কনভার্সন রেট = মোট অর্ডার ÷ ইউনিক ভিজিটর",
          "রেভিনিউয়ের সাথে ট্রাফিক ও কনভার্সনের সরাসরি তুলনা",
          "বিল্ট-ইন অ্যানালিটিক্স, বাড়তি কোনো ট্যাগের প্রয়োজন নেই",
          "ভিজিটর ও অর্ডারের নিখুঁত কাস্টমার ফানেল",
        ],
      },
      {
        pillText: "প্রফিট ট্র্যাকিং",
        pillIcon: "/icons/wallet.svg",
        titleStart: "আসল প্রফিট",
        titleHighlight: "হিসাব করুন",
        titleEnd: "",
        description:
          "প্রোডাক্টের কেনা দাম (Cost Price) ইনপুট দিয়ে রাখলে মোট বিক্রির পর আপনার আসল লাভ হিসাব করে দেখাবে।",
        bullets: [
          "প্রোডাক্ট এডিটরে পণ্য কেনা দাম (Cost Price) ইনপুট সুবিধা",
          "প্রফিট = বিক্রয়মূল্য থেকে আসল কেনা দাম বাদ দিয়ে হিসাব",
          "রেভিনিউয়ের পাশেই স্পষ্ট নিট প্রফিট সামারি প্রদর্শন",
          "কেনা দাম না দেওয়া থাকলে রেভিনিউ ঠিক রেখে প্রফিটের জন্য অপেক্ষা করে",
          "প্রতিটি অর্ডারের লাভ-ক্ষতির বাস্তবসম্মত স্বচ্ছতা",
        ],
      },
    ],
    extraTitle: "আসল তথ্যের ভিত্তিতে তৈরি",
    extraDesc:
      "Softunebd অ্যানালিটিক্স আপনার আসল চেকআউট ও ভিজিটর ডেটা প্রকাশ করে।",
    extraCards: [
      { title: "অর্ডার বেসড", desc: "রিয়েল চেকআউট থেকে আসা অর্ডারের হিসাব।", icon: "/icons/analytics.svg" },
      { title: "আসল ট্রাফিক", desc: "লাইভ কাস্টমার ভিজিটের ওপর কনভার্সন রেট।", icon: "/icons/zap.svg" },
      { title: "সঠিক লাভ", desc: "কেনা দামের ওপর ভিত্তি করে নিট প্রফিট মার্জিন।", icon: "/icons/wallet.svg" },
    ],
  },
  "orders": {
    slug: "orders",
    pillText: "অর্ডার ম্যানেজমেন্ট",
    titleStart: "সহজে অর্ডার",
    titleHighlight: "ম্যানেজ করুন",
    titleEnd: "",
    description:
      "এক স্ক্রিন থেকে অর্ডার সার্চ, ফিল্টার, স্ট্যাটাস আপডেট ও ক্যাশ রসিদ প্রিন্ট করুন। প্রতিটি অর্ডারের স্ন্যাপশট সেভ থাকে, তাই পরে ক্যাটালগ এডিট করলেও ইতিহাস বদলাবে না।",
    heroImage: { light: "/feature/order-l.webp", dark: "/feature/order-d.webp" },
    introTitle: "অর্ডারের তথ্য থাকবে নিখুঁত ও অপরিবর্তিত",
    introDesc:
      "অর্ডারের সময় প্রোডাক্টের নাম, মূল্য ও SKU লক হয়ে যায়, যাতে ক্যাটালগ পরিবর্তন করলেও পুরানো অর্ডারে কোনো সমস্যা না হয়।",
    alternating: [
      {
        pillText: "দ্রুত ফিল্টার",
        pillIcon: "/icons/orders.svg",
        titleStart: "যেকোনো অর্ডার",
        titleHighlight: "খুঁজে পান",
        titleEnd: "",
        description:
          "অর্ডার নম্বর বা কাস্টমারের নাম/ফোন দিয়ে দ্রুত সার্চ করুন এবং স্ট্যাটাস অনুযায়ী ফিল্টার করুন।",
        bullets: [
          "অর্ডার নম্বর বা কাস্টমার দিয়ে দ্রুত সার্চ",
          "অর্ডার স্ট্যাটাস অনুযায়ী সহজ ফিল্টারিং",
          "দৈনিক ডেলিভারি অপারেশনের জন্য পরিষ্কার তালিকা",
          "স্প্রেডশিটে সময় নষ্ট না করে সরাসরি ব্যবস্থাপনা",
          "দৈনন্দিন ফুলফিলমেন্ট কাজের জন্য বিশেষভাবে তৈরি",
        ],
      },
      {
        pillText: "অর্ডার স্ন্যাপশট",
        pillIcon: "/icons/lock.svg",
        titleStart: "নিরাপদ ও নির্ভুল",
        titleHighlight: "হিস্ট্রি",
        titleEnd: "",
        description:
          "বিক্রির সময়ের মূল্য ডাটাবেজে লক থাকে, তাই পরে প্রোডাক্ট ডিলিট করলেও পুরানো অর্ডারের মোট দাম একই থাকে।",
        bullets: [
          "বিক্রির সময় নাম, SKU ও দাম ডাটাবেজে লক থাকে",
          "প্রোডাক্ট ডিলিট করলেও পুরানো অর্ডারের তথ্য অপরিবর্তিত থাকে",
          "সার্ভার সাইডে অটোমেটিক নিখুঁত টোটাল প্রাইস হিসাব",
          "রিফান্ড ও হিসাবের খাতা থাকে সবসময় নির্ভুল",
          "অডিটিং ও কাস্টমার সাপোর্টের জন্য নির্ভরযোগ্য হিস্ট্রি",
        ],
      },
      {
        pillText: "প্রিন্ট ও স্ট্যাটাস",
        pillIcon: "/icons/doc.svg",
        titleStart: "রসিদ প্রিন্ট ও",
        titleHighlight: "স্ট্যাটাস আপডেট",
        titleEnd: "",
        description:
          "১-ক্লিকে ইনভয়েস বা ডেলিভারি স্লিপ প্রিন্ট করুন এবং Pending, Paid, Fulfilled ইত্যাদি স্ট্যাটাস চেঞ্জ করুন।",
        bullets: [
          "১-ক্লিকে ডেলিভারি ইনভয়েস বা মেমো প্রিন্ট",
          "প্রোডাক্ট শিপিংয়ের সাথে স্ট্যাটাস আপডেট",
          "টিমের অভ্যন্তরীণ যোগাযোগের জন্য ইন্টারনাল নোটস",
          "প্রতিটি ধাপে অর্ডারের অগ্রগতি পর্যবেক্ষণ",
          "অর্ডারের শুরু থেকে শেষ পর্যন্ত এক জায়গায় সমাধান",
        ],
      },
    ],
    extraTitle: "দৈনিক অপারেশনের জন্য প্রস্তুত",
    extraDesc:
      "অর্ডার সামলানো এবং মেমো প্রিন্ট করা এখন একদম সহজ।",
    extraCards: [
      { title: "স্ট্যাটাস ফ্লো", desc: "Pending থেকে Delivered পর্যন্ত সহজ ট্র্যাকিং।", icon: "/icons/zap.svg" },
      { title: "সার্ভার টোটাল", desc: "সার্ভার সাইডে অটোমেটিক টোটাল প্রাইস হিসাব।", icon: "/icons/wallet.svg" },
      { title: "স্টোর আইসোলেশন", desc: "অর্ডারের তথ্য সম্পূর্ণ নিরাপদ।", icon: "/icons/lock.svg" },
    ],
  },
  "payments": {
    slug: "payments",
    pillText: "পেমেন্ট গেটওয়ে",
    titleStart: "সব পেমেন্ট সল্যুশন,",
    titleHighlight: "এক জায়গায়",
    titleEnd: "",
    description:
      "Cash on Delivery, ম্যানুয়াল bKash/Nagad এবং অফিশিয়াল bKash, Nagad ও SSLCommerz পেমেন্ট গেটওয়ে সেন্ট্রালি কানেক্ট করুন।",
    heroImage: { light: "/feature/paymet-l.webp", dark: "/feature/paymet-d.webp" },
    introTitle: "বাংলাদেশের সব পেমেন্ট সিস্টেম এক স্ক্রিনে",
    introDesc:
      "ক্যাশ অন ডেলিভারি, ম্যানুয়াল ওয়ালেট বা অফিশিয়াল পেমেন্ট গেটওয়ে — আপনার মার্চেন্ট একাউন্ট দিয়ে এক ড্যাশবোর্ড থেকেই সেটআপ করুন।",
    alternating: [
      {
        pillText: "bKash & Nagad",
        pillIcon: "/icons/billing.svg",
        titleStart: "bKash ও",
        titleHighlight: "Nagad",
        titleEnd: "",
        description:
          "অফিশিয়াল মার্চেন্ট চেকআউট বা ম্যানুয়াল ওয়ালেট পেমেন্ট সেটআপ করুন। ম্যানুয়ালে কাস্টমার Transaction ID দিয়ে অর্ডার করবে এবং আপনি ভেরিফাই করে ডেলিভারি দেবেন।",
        bullets: [
          "অফিশিয়াল bKash মার্চেন্ট চেকআউট (App Key, Secret, Username & Password)",
          "Nagad মার্চেন্ট API (Merchant ID & RSA Keys)",
          "ম্যানুয়াল bKash ও Nagad নম্বরে Transaction ID ভেরিফিকেশন",
          "বাড়তি প্লাগইন ছাড়াই একই পেমেন্ট প্যানেল",
          "ক্যাশ অন ডেলিভারি ও SSLCommerz-এর সাথে একত্রে কাজ করে",
        ],
      },
      {
        pillText: "ক্যাশ অন ডেলিভারি",
        pillIcon: "/icons/wallet.svg",
        titleStart: "COD সুবিধা",
        titleHighlight: "যোগ করুন",
        titleEnd: "",
        description:
          "ক্যাশ অন ডেলিভারি অন করুন এবং প্রয়োজনে আলাদা ডেলিভারি ফি সেট করুন।",
        bullets: [
          "ওয়ালেট পেমেন্টের পাশাপাশি সহজেই COD চালু করার সুবিধা",
          "অপশনাল COD চার্জ যুক্ত করার সুযোগ",
          "bKash, Nagad ও SSLCommerz-এর একই পেমেন্ট স্ক্রিন",
          "স্টোর শুরু করতে কোনো কার্ড গেটওয়ের দরকার নেই",
          "বাংলাদেশি কাস্টমারদের সবথেকে পছন্দের পেমেন্ট অপশন",
        ],
      },
      {
        pillText: "এক স্ক্রিনে সব",
        pillIcon: "/icons/lock.svg",
        titleStart: "সহজ সেটিংস,",
        titleHighlight: "সুরক্ষিত ক্রেডেনশিয়াল",
        titleEnd: "",
        description:
          "সব পেমেন্ট মেথড এক জায়গা থেকেই কনফিগার করুন এবং ক্রেডেনশিয়াল সম্পূর্ণ ইনক্রিপ্টেড রাখুন।",
        bullets: [
          "এক কেন্দ্রীয় ড্যাশবোর্ডে সব পেমেন্ট টুলস",
          "COD, ম্যানুয়াল ওয়ালেট, অফিশিয়াল bKash, Nagad ও SSLCommerz",
          "ইনক্রিপ্টেড ডাটাবেজে সম্পূর্ণ সুরক্ষিত কি সেভ",
          "চেকআউট না বদলে যেকোনো সময় পেমেন্ট মেথড সুইচের সুযোগ",
          "সব পেমেন্ট মেথড অডিট ও রিভিউ করার এক জায়গা",
        ],
      },
    ],
    extraTitle: "আসল বিক্রেতাদের জন্য তৈরি",
    extraDesc:
      "COD, bKash, Nagad ও SSLCommerz — বাংলাদেশি ক্রেতাদের সব পছন্দের পেমেন্ট মাধ্যম।",
    extraCards: [
      { title: "bKash ও Nagad", desc: "মার্চেন্ট গেটওয়ে এবং ম্যানুয়াল Transaction ID পেমেন্ট।", icon: "/icons/billing.svg" },
      { title: "SSLCommerz", desc: "কার্ড, মোবাইল ব্যাংকিং ও নেটব্যাংকিংয়ের সম্পূর্ণ সুবিধা।", icon: "/icons/wallet.svg" },
      { title: "COD", desc: "পণ্য হাতে পেয়ে পেমেন্ট করার কাস্টমার ফ্রেন্ডলি অপশন।", icon: "/icons/zap.svg" },
    ],
  },
  "customer-management": {
    slug: "customer-management",
    pillText: "কাস্টমার ম্যানেজমেন্ট",
    titleStart: "রিপিট কাস্টমারদের",
    titleHighlight: "ট্র্যাক করুন",
    titleEnd: "",
    description:
      "অর্ডার থেকে ফোন নম্বর ম্যাচিং করে কাস্টমারের পারচেজ হিস্ট্রি ও টোটাল স্পেন্ড দেখুন।",
    heroImage: { light: "/feature/customer-l.webp", dark: "/feature/customer-d.webp" },
    introTitle: "অটোমেটিক কাস্টমার প্রোফাইল তৈরি",
    introDesc:
      "চেকআউটের সময় প্রথমবার ফোন নম্বর দিলে Softunebd অটোমেটিক কাস্টমার প্রোফাইল বানিয়ে ফেলে। পরবর্তীতে ওই নম্বরের সব অর্ডার একই প্রোফাইলে যুক্ত হয়।",
    alternating: [
      {
        pillText: "অটো ম্যাচিং",
        pillIcon: "/icons/user.svg",
        titleStart: "অর্ডার থেকে",
        titleHighlight: "প্রোফাইল",
        titleEnd: "",
        description:
          "আলাদা সাইন-আপ ফর্ম ছাড়াই ফোন নম্বরের ওপর ভিত্তি করে গ্রাহকের আলাদা হিস্ট্রি তৈরি হয়।",
        bullets: [
          "চেকআউট অর্ডার থেকে স্বয়ংক্রিয় প্রোফাইল তৈরি",
          "বিভিন্ন ফরম্যাটের ফোন নম্বর নিখুঁত ম্যাচিং",
          "অনলাইন ও কাউন্টার উভয় অর্ডারের জন্য কার্যকর",
          "কাস্টমারের জন্য জটিল সাইন-আপ ফর্ম তৈরির ঝামেলা নেই",
          "গেস্ট চেকআউট করলেও বার বার একই প্রোফাইলে যুক্ত হয়",
        ],
      },
      {
        pillText: "অর্ডার হিস্ট্রি",
        pillIcon: "/icons/orders.svg",
        titleStart: "টোটাল স্পেন্ড ও",
        titleHighlight: "অর্ডার তথ্য",
        titleEnd: "",
        description:
          "একজন কাস্টমার কত টাকার কেনাকাটা করেছেন এবং কতগুলো অর্ডার দিয়েছেন তা প্রোফাইল খুললেই দেখতে পাবেন।",
        bullets: [
          "মোট কেনাকাটার পরিমাণ (Total Spend) ও অর্ডার সংখ্যা",
          "গ্রাহকের আগের সব অর্ডারের সম্পূর্ণ হিস্ট্রি",
          "কাস্টমার লিস্ট সহজে সার্চ ও ফিল্টারিং",
          "সবচেয়ে বেশি কেনাকাটা করা টপ বাইয়ারদের শনাক্ত করুন",
          "সাপোর্ট কথোপকথনে কাস্টমারের পূর্ব ইতিহাস দেখার সুবিধা",
        ],
      },
      {
        pillText: "এক্সপোর্ট",
        pillIcon: "/icons/doc.svg",
        titleStart: "CSV এক্সপোর্ট",
        titleHighlight: "করুন",
        titleEnd: "",
        description:
          "কাস্টমার লিস্ট যেকোনো সময় CSV ফাইলে এক্সপোর্ট করে আপনার মার্কেটিং কাজে ব্যবহার করুন।",
        bullets: [
          "১-ক্লিকে কাস্টমার লিস্ট CSV ফাইল এক্সপোর্ট",
          "প্রতিটি কাস্টমারের নাম ও ইমেইল সম্পাদন করার সুযোগ",
          "প্রোফাইল থেকে সরাসরি ফোন নম্বর বা ইমেইল কপি",
          "আপনার নিজস্ব CRM বা এক্সেল ফাইলে ইনপোর্ট করার সুবিধা",
          "কাস্টমার ডেটা সম্পূর্ণ আপনার নিয়ন্ত্রণে, কোনো লকিং নেই",
        ],
      },
    ],
    extraTitle: "আসল কাস্টমার ডেটা",
    extraDesc:
      "কারা আপনার সেরা কাস্টমার তা জানা এখন আরও সহজ।",
    extraCards: [
      { title: "ফোন নম্বর ফার্স্ট", desc: "বাংলাদেশি মার্কেটের জন্য ফোন নম্বরই আসল আইডি।", icon: "/icons/wallet.svg" },
      { title: "ক্লিয়ার হিস্ট্রি", desc: "যেকোনো গ্রাহকের মোট খরচের সঠিক হিসাব।", icon: "/icons/orders.svg" },
      { title: "নিরাপদ ডেটা", desc: "কাস্টমার লিস্ট থাকবে শুধুমাত্র আপনার কাছে।", icon: "/icons/domain.svg" },
    ],
  },
  "marketing-tracking": {
    slug: "marketing-tracking",
    pillText: "মার্কেটিং & ট্র্যাকিং",
    titleStart: "পাওয়ারফুল",
    titleHighlight: "ইভেন্ট ট্র্যাকিং",
    titleEnd: "",
    description:
      "Meta Pixel, TikTok Pixel, GTM ও GA4 ইভেন্টস সহ Meta CAPI সুবিধা, যাতে ব্রাউজার ব্লকার থাকলেও ট্র্যাকিং মিস না হয়।",
    heroImage: { light: "/feature/marketing-l.webp", dark: "/feature/marketing-d.webp" },
    introTitle: "সার্ভার-সাইড ট্র্যাকিং দিয়ে নিখুঁত ক্যাটালগ অ্যানালিটিক্স",
    introDesc:
      "ViewContent, AddToCart, InitiateCheckout ও Purchase — সব ইভেন্ট রিয়েল-টাইমে পিক্সেলে সেন্ড করা হয়। Meta Conversions API (CAPI) সার্ভার থেকে ডেটা পাঠায়, তাই iOS বা অ্যাড-ব্লকার হলেও ট্র্যাকিং মিস হয় না।",
    alternating: [
      {
        pillText: "Meta & TikTok পিক্সেলে",
        pillIcon: "/icons/analytics.svg",
        titleStart: "আসল ইভেন্ট,",
        titleHighlight: "সঠিক ট্র্যাকিং",
        titleEnd: "",
        description:
          "শুধু PageView নয় — ViewContent, AddToCart, InitiateCheckout এবং Purchase সম্পূর্ণ ইভেন্ট ফায়ার করে।",
        bullets: [
          "ViewContent, AddToCart, InitiateCheckout ও Purchase ইভেন্টস",
          "Facebook/Meta Pixel — সম্পূর্ণ ই-কমার্স ইভেন্ট ট্র্যাকিং",
          "TikTok Pixel — একই সম্পূর্ণ ইভেন্ট সেট সাপোর্ট",
          "ড্যাশবোর্ডের ইন্টিগ্রেশন স্ক্রিন থেকে Pixel ID যুক্ত করার সুবিধা",
          "কোনো কাস্টম কোডিং বা জটিল ট্যাগ সেটআপ ছাড়া প্রস্তুত",
        ],
      },
      {
        pillText: "GTM & GA4",
        pillIcon: "/icons/analytics.svg",
        titleStart: "আপনার GTM,",
        titleHighlight: "সহজে কানেক্ট",
        titleEnd: "",
        description:
          "Google Tag Manager (GTM) Container ID বসিয়ে আপনার নিজস্ব ট্যাগ ও কাস্টম ইভেন্ট পরিচালনা করুন। Google Analytics 4 (GA4) সাপোর্টও অন্তর্ভুক্ত।",
        bullets: [
          "Google Tag Manager — আপনার কন্টেইনার ID দিয়ে যুক্ত করুন",
          "GTM-এর ভেতর স্বাভাবিকভাবে সব ট্যাগ পরিচালনা করুন",
          "GA4 — আসল ই-কমার্স ইভেন্ট অটোমেটিক ফায়ার করে",
          "Meta ও TikTok পিক্সেলের পাশাপাশি GTM ও GA4 একসাথে চলে",
          "এক ইন্টিগ্রেশন স্ক্রিন থেকেই সব ট্র্যাকিং সংযোগ নিয়ন্ত্রণ",
        ],
      },
      {
        pillText: "Meta Conversions API",
        pillIcon: "/icons/lock.svg",
        titleStart: "সার্ভার-সাইড",
        titleHighlight: "CAPI ট্র্যাকিং",
        titleEnd: "",
        description:
          "Meta Conversions API ব্রাউজারের বদলে সরাসরি সার্ভার থেকে Purchase ইভেন্ট পাঠায়। ফলে অ্যাড-ব্লকার বা iOS প্রাইভেসি সেটিংস থাকা সত্ত্বেও ট্র্যাকিং ১০০% সঠিক থাকে এবং অটো-ডিডুপ্লিকেশনে ডাবল কাউন্টিং হয় না।",
        bullets: [
          "কাস্টমারের ব্রাউজারের বদলে সরাসরি সার্ভার থেকে Purchase ডেটা প্রেরণ",
          "অ্যাড-ব্লকার ও iOS প্রাইভেসি সেটিংস থাকলেও ট্র্যাকিং মিস হয় না",
          "ব্রাউজার পিক্সেলের সাথে অটোমেটিক ডিডুপ্লিকেশন (Duplicate হবে না)",
          "কোনো ডাবল কাউন্টিং নেই — প্রতি বিক্রির হিসাব একবারই পাঠানো হয়",
          "সাধারণ ব্রাউজার পিক্সেলের চেয়ে বহুগুণ শক্তিশালী ও নিখুঁত",
        ],
      },
    ],
    extraTitle: "বাস্তবসম্মত ই-কমার্স ট্র্যাকিং",
    extraDesc:
      "মার্কেটিং বাজেটের সঠিক রিটার্ন (ROAS) পরিমাপের জন্য সার্ভার-সাইড ট্র্যাকিং।",
    extraCards: [
      { title: "সম্পূর্ণ ইভেন্ট সেট", desc: "পণ্য দেখা থেকে কেনা পর্যন্ত প্রতি ধাপের হিসাব।", icon: "/icons/analytics.svg" },
      { title: "সার্ভার-সাইড CAPI", desc: "অ্যাড-ব্লকার সত্ত্বেও সঠিক সেলস কাউন্টিং।", icon: "/icons/lock.svg" },
      { title: "নো ডাবল-কাউন্ট", desc: "পিক্সেল ও CAPI ডেটা নিখুঁতভাবে সিঙ্ক থাকে।", icon: "/icons/zap.svg" },
    ],
  },
  "store-sale": {
    slug: "store-sale",
    pillText: "স্টোর সেল (POS)",
    titleStart: "দোকানে সরাসরি",
    titleHighlight: "কাউন্টার সেল",
    titleEnd: "",
    description:
      "অনলাইন ক্যাটালগ থেকেই দোকানের সরাসরি বিক্রি সম্পাদন করুন ও থার্মাল রসিদ প্রিন্ট করুন — আলাদা কোনো POS সফটওয়্যার ছাড়াই।",
    heroImage: { light: "/feature/pos-l.webp", dark: "/feature/pos-d.webp" },
    introTitle: "অনলাইন স্টক ও শোরুমের ইনভেন্টরি এক জায়গায়",
    introDesc:
      "দোকানের কাউন্টারে বিক্রি হলে অনলাইনের প্রোডাক্ট স্টক অটোমেটিক আপডেট হয়ে যাবে।",
    alternating: [
      {
        pillText: "দ্রুত ক্যাটালগ",
        pillIcon: "/icons/shop-bag.svg",
        titleStart: "প্রোডাক্ট দ্রুত",
        titleHighlight: "খুঁজে নিন",
        titleEnd: "",
        description:
          "নাম বা SKU দিয়ে সার্চ করুন, ক্যাটাগরি ফিল্টার করুন এবং সহজেই আইটেম কার্টে যোগ করুন। বনি বা বারকোড স্ক্যানার দিয়েও স্ক্যান করা যায়।",
        bullets: [
          "ক্যাটাগরি চিপস দিয়ে সমস্ত বা নির্দিষ্ট প্রোডাক্ট দেখার সুবিধা",
          "মূল্য ও রিয়েল-টাইম স্টক সহ কম্প্যাক্ট প্রোডাক্ট সারি",
          "বড় ক্যাটালগ সহজে ব্রাউজ করার জন্য পেজিনেশন",
          "অনলাইনের একই লাইভ ক্যাটালগ ব্যবহার করে, আলাদা ক্যাটালগ লাগে না",
          "USB বারকোড স্ক্যানার দিয়ে সরাসরি স্ক্যান ও সার্চের সুবিধা",
        ],
      },
      {
        pillText: "কাউন্টার কার্ট",
        pillIcon: "/icons/cart.svg",
        titleStart: "কার্ট বানান,",
        titleHighlight: "বিল করুন",
        titleEnd: "",
        description:
          "পরিমাণ কমান-বাড়ান, কাস্টমারের নাম/ফোন লিখুন এবং ক্যাশ, কার্ড বা মোবাইল ব্যাংকিং মেথডে বিল কমপ্লিট করুন।",
        bullets: [
          "সহজ কোয়ান্টিটি স্ট্যাপার ও সাবটোটাল প্রাইস হিসাব",
          "কাস্টমারের নাম ও মোবাইল নম্বর যুক্ত করার সুযোগ",
          "ক্যাশ, কার্ড বা মোবাইল ব্যাংকিং মেথড অর্ডারে সেভ থাকে",
          "বিক্রি সম্পন্ন হলে রিয়েল Softunebd অর্ডার তৈরি হয়",
          "রিপোর্টিংয়ের জন্য স্বয়ংক্রিয়ভাবে POS চ্যানেল ট্যাগ যুক্ত হয়",
        ],
      },
      {
        pillText: "মেমো ও হিস্ট্রি",
        pillIcon: "/icons/orders.svg",
        titleStart: "ক্যাশ রসিদ ও",
        titleHighlight: "সেলস হিস্ট্রি",
        titleEnd: "",
        description:
          "বিক্রি শেষে শপ নেম, ডেট ও আইটেম লিস্ট সহ থার্মাল বা নরমাল মেমো প্রিন্ট করুন এবং কাউন্টার বিক্রির হিস্ট্রি পর্যালোচনা করুন।",
        bullets: [
          "দোকানের নাম, তারিখ, সময় ও মোট দাম সহ প্রিন্টযোগ্য মেমো",
          "কাউন্টার বিক্রির জন্য ফিল্টার করা রিসেন্ট সেলস লিস্ট",
          "পুরানো বিক্রি ওপেন করে অর্ডারের আইটেম ও স্ট্যাটাস রিভিউ",
          "এক নজরে বিক্রি সংক্রান্ত সব ডিটেইলস দেখার সুবিধা",
          "বাড়তি মেমো বই ছাড়াই শোরুমের ক্যাশ রসিদ গোছানো রাখে",
        ],
      },
    ],
    extraTitle: "একই ইনভেন্টরি, ডাবল সেলস",
    extraDesc:
      "আপনার অনলাইন ও শোরুমের সব বিক্রি একসাথে পরিচালনা করুন।",
    extraCards: [
      { title: "লাইভ ক্যাটালগ", desc: "অনলাইন শপের একই স্টক ও দাম কাউন্টারে কাজ করবে।", icon: "/icons/shop-bag.svg" },
      { title: "প্রিন্ট মেমো", desc: "ব্রাউজার থেকে সরাসরি থার্মাল প্রিন্টারে রসিদ প্রিন্ট।", icon: "/icons/doc.svg" },
      { title: "রিসেন্ট সেলস", desc: "কাউন্টারের সব বিক্রির তাত্ক্ষণিক রেকর্ড।", icon: "/icons/orders.svg" },
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

export function getFeaturePage(slug: string, locale: "en" | "bn" = "en"): FeatureData | undefined {
  if (locale === "bn") {
    return FEATURE_PAGES_BN[slug] || FEATURE_PAGES[slug];
  }
  return FEATURE_PAGES[slug];
}

