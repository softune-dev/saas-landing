export interface AlternatingItem {
  pillText: string;
  pillIcon: string;
  titleStart: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  bullets: string[];
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
    pillText: "Storefront Design",
    titleStart: "Three Storefront",
    titleHighlight: "Themes",
    titleEnd: "To Start From",
    description:
      "Aurora, Bazaar, and Sweets — three built storefront themes you can customize and publish under your own domain. Pick the one closest to your brand and make it yours.",
    introTitle: "Edit your storefront with a live preview, not a guess",
    introDesc:
      "The theme editor shows your changes on a real desktop and mobile preview as you make them, so what you see while editing is what your customers will see when you publish.",
    alternating: [
      {
        pillText: "Live Preview",
        pillIcon: "/icons/themes.svg",
        titleStart: "See Changes on Desktop and",
        titleHighlight: "Mobile",
        titleEnd: "At Once",
        description:
          "Edit colors, fonts, and section content in a two-pane editor with a live preview beside it, so you're never editing blind.",
        bullets: [
          "Side-by-side desktop and mobile preview",
          "Edits apply instantly in the preview",
          "Nothing goes live until you publish",
        ],
      },
      {
        pillText: "Section Control",
        pillIcon: "/icons/color.svg",
        titleStart: "Rearrange Your Homepage",
        titleHighlight: "Sections",
        titleEnd: "",
        description:
          "Drag and drop the sections on your storefront's pages into the order that fits your store, without touching code.",
        bullets: [
          "Drag-and-drop section reordering",
          "Per-section content editing",
          "Same editor across all three themes",
        ],
      },
      {
        pillText: "Publish on Demand",
        pillIcon: "/icons/zap.svg",
        titleStart: "Publish When You're",
        titleHighlight: "Ready",
        titleEnd: "",
        description:
          "Changes stay in draft until you choose to publish, so you can build out a new look without customers seeing a half-finished store.",
        bullets: [
          "Draft and publish are separate steps",
          "Your own subdomain or a custom domain",
          "Switch themes without losing your data",
        ],
      },
    ],
    extraTitle: "Pick a theme, make it yours",
    extraDesc:
      "Each theme covers the same page and section contract, so switching between them later doesn't mean rebuilding your store.",
    extraCards: [
      { title: "Aurora", desc: "A clean, editorial layout built for general retail.", icon: "/icons/themes.svg" },
      { title: "Bazaar", desc: "A denser, catalog-first layout for larger inventories.", icon: "/icons/color.svg" },
      { title: "Sweets", desc: "A warm, product-photo-led layout for food and gift stores.", icon: "/icons/zap.svg" },
    ],
  },
  "ai-assistant": {
    slug: "ai-assistant",
    pillText: "AI Tools",
    titleStart: "AI That Writes and",
    titleHighlight: "Suggests",
    titleEnd: "— You Approve",
    description:
      "Softune's AI writes product descriptions and proposes theme changes from a plain-English prompt. It never edits your store directly — every suggestion comes back as a change you review and approve.",
    introTitle: "AI drafts the first pass, you stay in control of what ships",
    introDesc:
      "Every AI output — a product description, a theme color patch, a proposed product edit — goes through the same review step a manual edit would. Nothing reaches your live store without you approving it.",
    alternating: [
      {
        pillText: "Product Copy",
        pillIcon: "/icons/ai-pencil.svg",
        titleStart: "Write Product",
        titleHighlight: "Descriptions",
        titleEnd: "in One Click",
        description:
          "Generate a first-draft description for any product, then edit it like you would any other field before saving.",
        bullets: [
          "One click from the product editor",
          "Fully editable after generating",
          "Uses your product's existing details",
        ],
      },
      {
        pillText: "AI Suggest",
        pillIcon: "/icons/themes.svg",
        titleStart: "Describe a Look, Get a Theme",
        titleHighlight: "Patch",
        titleEnd: "",
        description:
          "Type something like \"make it feel like a coffee shop\" and AI Suggest proposes colors, typography, and copy — shown as a patch you approve before it touches your live site.",
        bullets: [
          "Prompts turn into color, font, and copy suggestions",
          "Every suggestion is a reviewable patch, not an auto-apply",
          "Uses the same fields the manual editor uses",
        ],
      },
      {
        pillText: "AI Chat",
        pillIcon: "/icons/chat.svg",
        titleStart: "Ask About Your Store's",
        titleHighlight: "Numbers",
        titleEnd: "",
        description:
          "Ask the AI assistant about your business overview, products, orders, or sales summary, and it looks up the real answer from your store's own data.",
        bullets: [
          "Reads your real business overview, products, and orders",
          "Can propose a new product, a category change, or a product edit",
          "Proposed changes still need your confirmation before saving",
        ],
      },
    ],
    extraTitle: "Built with limits, on purpose",
    extraDesc:
      "AI in Softune only ever proposes a change through the same paths a manual edit uses — there's no path from a prompt straight to your live store.",
    extraCards: [
      { title: "Review Before Apply", desc: "Every AI suggestion is a patch you approve, never an auto-apply.", icon: "/icons/lock.svg" },
      { title: "Scoped Actions", desc: "AI chat can propose specific product or category changes — nothing broader.", icon: "/icons/ai-pencil.svg" },
      { title: "Daily Request Limits", desc: "Usage is capped per day based on your plan, shown right on your dashboard.", icon: "/icons/wallet.svg" },
    ],
  },
  "fraud-protection": {
    slug: "fraud-protection",
    pillText: "Order Safety",
    titleStart: "Keep a Blocklist, Set Your",
    titleHighlight: "Rules",
    titleEnd: "",
    description:
      "Block known bad phone numbers automatically at checkout, and configure thresholds for high-value first orders and repeat-order bursts — all from one screen, no separate fraud tool to sign up for.",
    introTitle: "Your own blocklist, stored with your store",
    introDesc:
      "Fraud Protection lives in your Softune dashboard next to Orders. Add numbers to a blocklist and set the thresholds that match how your store actually gets abused.",
    alternating: [
      {
        pillText: "Phone Blocklist",
        pillIcon: "/icons/lock.svg",
        titleStart: "Maintain a Blocklist of Known Bad",
        titleHighlight: "Numbers",
        titleEnd: "",
        description:
          "Add a number to your store's blocklist and it's rejected automatically at checkout — not just flagged for later review.",
        bullets: [
          "Enforced live at checkout, not just logged",
          "Optional notes so your team has context",
          "Scoped to your store, not shared across tenants",
        ],
      },
      {
        pillText: "Configurable Rules",
        pillIcon: "/icons/orders.svg",
        titleStart: "Set Thresholds for High-Value and",
        titleHighlight: "Burst",
        titleEnd: "Orders",
        description:
          "Configure a threshold for first-time high-value orders and a window for detecting repeat orders from the same number — these save with your store today, ready for checkout enforcement as it rolls out.",
        bullets: [
          "High-value order threshold, first-time buyers",
          "Burst-order detection window",
          "Each rule can be toggled independently",
        ],
      },
      {
        pillText: "Per-Site Settings",
        pillIcon: "/icons/domain.svg",
        titleStart: "Rules Saved With Your",
        titleHighlight: "Store",
        titleEnd: "",
        description:
          "Fraud settings live in your site's own settings, so each storefront you run can carry a different configuration.",
        bullets: [
          "Per-site rule storage",
          "No separate fraud SaaS to connect",
          "Same tenant isolation as the rest of Softune",
        ],
      },
    ],
    extraTitle: "Built around COD reality",
    extraDesc:
      "This is a blocklist and a set of thresholds you control — not automated card-fraud scoring. It's built for how Softune merchants actually get burned.",
    extraCards: [
      { title: "Your Numbers, Your Rules", desc: "Nothing forced on by default — enable only what you need.", icon: "/icons/zap.svg" },
      { title: "Team Notes", desc: "Blocklist entries can carry a note so staff know the context.", icon: "/icons/book.svg" },
      { title: "No Extra Signup", desc: "Configured from the same dashboard as your orders and site settings.", icon: "/icons/delivery.svg" },
    ],
  },
  "courier": {
    slug: "courier",
    pillText: "Delivery",
    titleStart: "Connect Your Own",
    titleHighlight: "Courier",
    titleEnd: "Account",
    description:
      "Connect your Steadfast courier account to Softune with your own API credentials — Softune verifies them and keeps them stored securely for your store.",
    introTitle: "Your courier account, connected to your store",
    introDesc:
      "Courier connections use your own account credentials, not a shared Softune account, so bookings and billing stay under your name with your courier.",
    alternating: [
      {
        pillText: "Steadfast Integration",
        pillIcon: "/icons/delivery.svg",
        titleStart: "Connect Your",
        titleHighlight: "Steadfast",
        titleEnd: "Account",
        description:
          "Enter your Steadfast API key and secret, and Softune verifies the connection directly against Steadfast before saving it.",
        bullets: [
          "Uses your own Steadfast account, not a shared one",
          "Credentials verified on connect",
          "Credentials stored encrypted",
        ],
      },
      {
        pillText: "More Providers Coming",
        pillIcon: "/icons/zap.svg",
        titleStart: "Pathao and RedX Are",
        titleHighlight: "On the Way",
        titleEnd: "",
        description:
          "Steadfast is live today; Pathao and RedX connections are on our roadmap for the courier settings screen.",
        bullets: [
          "One connections screen for all your couriers",
          "Same credential-verification approach for each",
          "No change to your workflow when new ones land",
        ],
      },
    ],
    extraTitle: "Simple, verified connections",
    extraDesc:
      "Courier integration today is about connecting and verifying your own account — booking, label, and rate automation are on our roadmap, not live yet.",
    extraCards: [
      { title: "Your Account Stays Yours", desc: "Softune never books or bills on your behalf without your own credentials.", icon: "/icons/lock.svg" },
      { title: "Verified on Connect", desc: "We check your credentials against the courier's own API before saving.", icon: "/icons/zap.svg" },
      { title: "Encrypted Storage", desc: "Courier credentials are encrypted at rest, same as payment credentials.", icon: "/icons/domain.svg" },
    ],
  },
  "store-analytics": {
    slug: "store-analytics",
    pillText: "Store Analytics",
    titleStart: "See Revenue, Orders, and",
    titleHighlight: "Trends",
    titleEnd: "",
    description:
      "Track revenue, order count, average order value, and refund rate — each compared to the previous period — plus a weekly revenue trend, top categories, and your best-selling products.",
    introTitle: "Your own numbers, not a generic dashboard",
    introDesc:
      "Analytics run on your store's real orders — pick a window from 1 to 26 weeks and see how revenue, orders, and refunds moved period over period.",
    alternating: [
      {
        pillText: "Revenue & Orders",
        pillIcon: "/icons/analytics.svg",
        titleStart: "Track Revenue, Orders, and",
        titleHighlight: "AOV",
        titleEnd: "",
        description:
          "See revenue, order count, average order value, and refund rate for your chosen window, each with a period-over-period change.",
        bullets: [
          "Configurable 1–26 week window",
          "Period-over-period percent change on every metric",
          "A weekly revenue trend chart",
        ],
      },
      {
        pillText: "Categories & Best Sellers",
        pillIcon: "/icons/color.svg",
        titleStart: "See What's",
        titleHighlight: "Actually Selling",
        titleEnd: "",
        description:
          "A breakdown of revenue by your top categories, plus your top 5 best-selling products by quantity, for the same window.",
        bullets: [
          "Top 8 categories by revenue share",
          "Top 5 products by quantity sold",
          "Same window as your revenue numbers",
        ],
      },
      {
        pillText: "Weekly Report Table",
        pillIcon: "/icons/themes.svg",
        titleStart: "A Week-by-Week Sales",
        titleHighlight: "Report",
        titleEnd: "",
        description:
          "A table breaking down orders, customers, revenue, and refunds by week, so you can see the shape of your sales, not just a total.",
        bullets: [
          "Orders, customers, revenue, and refunds per week",
          "Net revenue after refunds",
          "Same data that powers the charts above",
        ],
      },
    ],
    extraTitle: "What this doesn't do — yet",
    extraDesc:
      "This is order-based analytics, not visitor tracking. Softune doesn't record site visits, so there's no funnel, cohort, or campaign-attribution data here.",
    extraCards: [
      { title: "Order-Based, Not Visitor-Based", desc: "Numbers come from real orders — there's no traffic or session tracking.", icon: "/icons/analytics.svg" },
      { title: "One Dashboard Screen", desc: "No separate analytics tool to connect or configure.", icon: "/icons/zap.svg" },
      { title: "Your Store Only", desc: "Every number here is scoped to your own tenant.", icon: "/icons/lock.svg" },
    ],
  },
  "orders": {
    slug: "orders",
    pillText: "Order Management",
    titleStart: "Orders That Stay",
    titleHighlight: "Accurate",
    titleEnd: "Over Time",
    description:
      "Search, filter, and update orders from one screen — and every order keeps a permanent snapshot of what was actually sold, so editing a product later never rewrites a past sale.",
    introTitle: "Your order history doesn't change when your catalog does",
    introDesc:
      "Every order item stores its own name, SKU, price, and quantity at the moment of sale. Edit or even delete the product later, and the order still shows exactly what the customer bought.",
    alternating: [
      {
        pillText: "Search & Filter",
        pillIcon: "/icons/orders.svg",
        titleStart: "Find Any Order by Number or",
        titleHighlight: "Customer",
        titleEnd: "",
        description:
          "Search by order number or customer details, and filter by status, to get to the order you're looking for quickly.",
        bullets: [
          "Search by order number or customer info",
          "Filter by order status",
          "Up to 500 orders per page",
        ],
      },
      {
        pillText: "Immutable History",
        pillIcon: "/icons/lock.svg",
        titleStart: "Past Orders Stay",
        titleHighlight: "Accurate",
        titleEnd: "",
        description:
          "Order line items snapshot the product's name, SKU, and price at time of sale — editing or deleting that product afterward never changes what the order record shows.",
        bullets: [
          "Name, SKU, and price locked in at time of sale",
          "Deleting a product doesn't break its past orders",
          "Server-priced from your catalog, not client-submitted",
        ],
      },
      {
        pillText: "Print Delivery Slips",
        pillIcon: "/icons/themes.svg",
        titleStart: "Print an Invoice or Delivery",
        titleHighlight: "Slip",
        titleEnd: "",
        description:
          "Print a delivery slip or invoice for any order in one click, straight from the order detail screen.",
        bullets: [
          "One-click print from any order",
          "Includes order number, date, and items",
          "No separate document tool needed",
        ],
      },
    ],
    extraTitle: "What this doesn't do — yet",
    extraDesc:
      "Order status and notes can be updated today; refunds, bulk order actions, and packing-slip barcodes aren't built yet.",
    extraCards: [
      { title: "Status & Notes", desc: "Update an order's status and notes as it moves through fulfillment.", icon: "/icons/zap.svg" },
      { title: "Server-Priced Totals", desc: "Totals are calculated from your catalog, not trusted from the request.", icon: "/icons/wallet.svg" },
      { title: "Tenant-Scoped", desc: "Every order belongs to one store — no cross-store visibility.", icon: "/icons/lock.svg" },
    ],
  },
  "payments": {
    slug: "payments",
    pillText: "Payments",
    titleStart: "Cash on Delivery and",
    titleHighlight: "Manual Payments",
    titleEnd: "Today",
    description:
      "Accept cash on delivery, or let customers pay to your own bKash, Nagad, or Rocket number and submit a transaction ID for you to verify — the payment methods that actually work at checkout right now.",
    introTitle: "Built for how COD-first stores actually take payment",
    introDesc:
      "Cash on delivery and manual mobile-wallet payments are live at checkout today. Gateway connections for automated card and wallet processing can be configured, ready for when live checkout support ships.",
    alternating: [
      {
        pillText: "Cash on Delivery",
        pillIcon: "/icons/wallet.svg",
        titleStart: "Accept Cash on",
        titleHighlight: "Delivery",
        titleEnd: "",
        description:
          "Turn on COD with an optional fee, no account or credentials required to set up.",
        bullets: [
          "No credentials needed to enable",
          "Optional COD fee configuration",
          "Live at checkout today",
        ],
      },
      {
        pillText: "Manual Wallet Payments",
        pillIcon: "/icons/billing.svg",
        titleStart: "Take bKash, Nagad, or Rocket",
        titleHighlight: "Manually",
        titleEnd: "",
        description:
          "Customers send payment to your own number and submit a transaction ID at checkout, which you verify from your dashboard.",
        bullets: [
          "Customer pays your own wallet number directly",
          "Transaction ID submitted with the order",
          "You verify it manually before fulfilling",
        ],
      },
      {
        pillText: "Gateway Connections",
        pillIcon: "/icons/lock.svg",
        titleStart: "Store Gateway Credentials for",
        titleHighlight: "What's Next",
        titleEnd: "",
        description:
          "Connect and store credentials for bKash, Nagad, SSLCommerz, or Rocket gateway accounts now — automated checkout support for these is on our roadmap, not live yet.",
        bullets: [
          "Credentials stored encrypted",
          "Ready ahead of automated checkout support",
          "No automated processing through these yet",
        ],
      },
    ],
    extraTitle: "What this doesn't do — yet",
    extraDesc:
      "There's no BNPL, no saved cards, no multi-currency, and no automated fraud scoring on payments today — this is a COD- and manual-payment-first setup.",
    extraCards: [
      { title: "COD-First", desc: "Built around cash-on-delivery, the dominant payment method for these stores.", icon: "/icons/wallet.svg" },
      { title: "Manual Verification", desc: "You confirm manual wallet payments yourself before fulfilling.", icon: "/icons/lock.svg" },
      { title: "Encrypted Credentials", desc: "Any gateway credentials you connect are encrypted at rest.", icon: "/icons/domain.svg" },
    ],
  },
  "customer-management": {
    slug: "customer-management",
    pillText: "Real Customers",
    titleStart: "Know Who's",
    titleHighlight: "Buying Again",
    titleEnd: "",
    description:
      "Every order is automatically linked to a real customer record by phone number, so you can finally tell a first-time buyer from your fifth-time regular — with their full order history, total spend, and last order date in one place.",
    introTitle: "A customer record, not just an order form",
    introDesc:
      "The first time a phone number checks out, Softune creates a customer record for it. The next order from that same number — however it's typed — links to the same record, building real history instead of disconnected orders.",
    alternating: [
      {
        pillText: "Automatic Matching",
        pillIcon: "/icons/user.svg",
        titleStart: "Created Automatically From",
        titleHighlight: "Real Orders",
        titleEnd: "",
        description:
          "No customer form to fill out — a record is created the first time a phone number places an order, and every later order from that number links to the same one.",
        bullets: [
          "No manual data entry required",
          "Matches phone numbers across formats automatically",
          "Works from both storefront checkout and manual orders",
        ],
      },
      {
        pillText: "Order History",
        pillIcon: "/icons/orders.svg",
        titleStart: "See Every Order, Total Spend, and",
        titleHighlight: "Last Visit",
        titleEnd: "",
        description:
          "Open a customer and see their order count, total spent, last order date, and every linked order in one screen.",
        bullets: [
          "Order count and total spend, computed live",
          "Full linked order history in one view",
          "Search and filter your customer list",
        ],
      },
      {
        pillText: "Export & Contact",
        pillIcon: "/icons/wallet.svg",
        titleStart: "Export Your List, Edit",
        titleHighlight: "Contact Info",
        titleEnd: "",
        description:
          "Export your customer list to CSV any time, and edit a customer's name or email directly from their profile.",
        bullets: [
          "One-click CSV export",
          "Edit name and email per customer",
          "Copy phone and email straight from the profile",
        ],
      },
    ],
    extraTitle: "What this doesn't do — yet",
    extraDesc:
      "This is real customer tracking, not a full CRM — there's no loyalty points, no segmentation, and no SMS/email campaign tool built on top of it yet.",
    extraCards: [
      { title: "Phone-First", desc: "Built for COD stores where phone, not email, is the reliable identifier.", icon: "/icons/wallet.svg" },
      { title: "Only Forward-Looking", desc: "Orders placed before this shipped aren't retroactively linked.", icon: "/icons/lock.svg" },
      { title: "Per-Store", desc: "Customer records are scoped to your storefront, not shared across accounts.", icon: "/icons/domain.svg" },
    ],
  },
};

export const FEATURES_LIST = [
  { slug: "multiple-themes", title: "Multiple Themes", icon: "/icons/themes.svg", desc: "Aurora, Bazaar, and Sweets" },
  { slug: "ai-assistant", title: "AI Assistant", icon: "/icons/ai-pencil.svg", desc: "AI descriptions and theme suggestions" },
  { slug: "fraud-protection", title: "Fraud Protection", icon: "/icons/lock.svg", desc: "Phone blocklist and order rules" },
  { slug: "courier", title: "Courier Integration", icon: "/icons/delivery.svg", desc: "Connect your Steadfast account" },
  { slug: "store-analytics", title: "Store Analytics", icon: "/icons/analytics.svg", desc: "Revenue, orders, and trends" },
  { slug: "customer-management", title: "Customers", icon: "/icons/user.svg", desc: "Real customer records, built from orders" },
  { slug: "orders", title: "Orders Management", icon: "/icons/orders.svg", desc: "Search, filter, and immutable history" },
  { slug: "payments", title: "Payments", icon: "/icons/wallet.svg", desc: "COD and manual wallet payments" },
];
