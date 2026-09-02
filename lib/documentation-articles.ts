/**
 * Per-slug documentation article bodies. Every claim should map to a real
 * Softune dashboard surface — no invented Stripe/CSS/multi-currency features.
 */

import {
  findDocArticleMeta,
  DOC_ICON_PATHS,
} from "./documentation-data";

export type DocBodyBlock =
  | { type: "h2"; content: string }
  | { type: "h3"; content: string }
  | { type: "p"; content: string }
  | { type: "quote"; content: string }
  | { type: "callout"; content: string }
  | { type: "list"; content: string[] };

export type DocArticleContent = {
  slug: string;
  title: string;
  category: string;
  categoryIcon: string;
  desc: string;
  readTime: string;
  updated: string;
  toc: string[];
  body: DocBodyBlock[];
};

function tocFromBody(body: DocBodyBlock[]): string[] {
  return body.filter((b) => b.type === "h2").map((b) => b.content as string);
}

function article(
  slug: string,
  desc: string,
  body: DocBodyBlock[],
  readTime = "2 min read",
  updated = "Aug 20, 2026",
): DocArticleContent {
  const meta = findDocArticleMeta(slug);
  if (!meta) {
    throw new Error(`Unknown documentation slug: ${slug}`);
  }
  return {
    slug,
    title: meta.article.title,
    category: meta.category.title,
    categoryIcon: DOC_ICON_PATHS[meta.category.icon],
    desc,
    readTime,
    updated,
    toc: tocFromBody(body),
    body,
  };
}

export const DOC_ARTICLES: Record<string, DocArticleContent> = {
  // ── Getting Started ───────────────────────────────────────────────────────
  "intro-to-softune": article(
    "intro-to-softune",
    "A full orientation to Softune’s dashboard — sidebar structure, Setup vs Menu vs Settings, and how your store stays tenant-isolated.",
    [
      {
        type: "p",
        content:
          "Softune is a multi-tenant ecommerce SaaS for independent merchants and small brands. You get an isolated store, a live storefront, and one dashboard for catalog, orders, themes, payments, couriers, analytics, fraud tools, and Add-Ons — without bolting together unrelated apps.",
      },
      { type: "h2", content: "What Softune is (and is not)" },
      {
        type: "p",
        content:
          "Softune is infrastructure for your own branded storefront. You own the customer relationship. Softune is not a marketplace that sits between you and buyers, and Softune does not include a point-of-sale terminal product.",
      },
      {
        type: "callout",
        content:
          "Tenant isolation is non-negotiable: your products, orders, customers, and settings stay scoped to your stores. Other Softune merchants cannot see them.",
      },
      { type: "h2", content: "How the sidebar is organized" },
      {
        type: "p",
        content:
          "The left sidebar is split into three sections. Learning that structure first makes every later guide easier to follow.",
      },
      { type: "h3", content: "Getting Started" },
      {
        type: "p",
        content:
          "While your store is incomplete, Softune shows a Getting Started section with a setup checklist and an “X/9 complete” badge. That section stays in the sidebar until every checklist step is done, then it goes away so daily work lives under Menu and Settings.",
      },
      { type: "h3", content: "Menu" },
      {
        type: "list",
        content: [
          "Dashboard — live snapshot of sales and activity",
          "Categories — organize products for browsing",
          "Products — catalog, variants, pricing, stock, media",
          "Orders — order lifecycle and fulfillment",
          "Analytics — trends, best sellers, exports",
          "Themes — open the theme editor for your storefront",
          "Customers — buyers who have ordered from you",
          "Courier — connect delivery partners",
          "Payments — COD, bKash, Nagad, and SSLCommerz",
          "Add-Ons — native marketplace extensions",
        ],
      },
      { type: "h3", content: "Settings" },
      {
        type: "list",
        content: [
          "Site Settings — business info, domain, shipping locations, FAQs, legal pages, SEO",
          "Fraud Protection — rules and phone blocklist",
          "Billing — plan and usage",
          "Account — profile and business identity details",
          "Help Desk — support resources",
        ],
      },
      { type: "h2", content: "Take a Tour (on demand)" },
      {
        type: "p",
        content:
          "At the bottom of the sidebar, Take a Tour launches a guided walkthrough with a spotlight overlay and Skip / Back / Next controls. It covers the main dashboard and continues into the theme editor to explain its tools, then returns you to the dashboard. The tour never starts automatically — only when you click.",
      },
      { type: "h2", content: "Recommended first week" },
      {
        type: "list",
        content: [
          "1. Open Getting Started and work the 9-step checklist in order",
          "2. Click Take a Tour once so Menu and Settings feel familiar",
          "3. Confirm Account → Business details for tax/invoicing identity",
          "4. Publish only after products, payments, and courier basics are ready",
        ],
      },
    ],
    "2 min read",
  ),

  "account-setup-checklist": article(
    "account-setup-checklist",
    "Walk Softune’s real 9-step Getting Started checklist from first product to publish — including when the Setup section leaves the sidebar.",
    [
      {
        type: "p",
        content:
          "Softune’s Getting Started checklist is a concrete Setup flow in the sidebar, not a welcome email. Softune shows an X/9 complete badge and keeps Getting Started visible until every step is finished.",
      },
      { type: "h2", content: "The nine checklist steps" },
      {
        type: "p",
        content:
          "Complete these in roughly this order. Softune marks each step done when the underlying work exists in the product.",
      },
      {
        type: "list",
        content: [
          "1. Add your first product — create a sellable item under Products",
          "2. Create a category — open Categories and add at least one group",
          "3. Add logo & business info — Site Settings / Account business details so the store looks like your brand",
          "4. Connect a payment method — Payments (COD, manual wallets, bKash, Nagad, or SSLCommerz)",
          "5. Set up courier — Couriers screen (Steadfast, Pathao, RedX, or eCourier)",
          "6. Upload product/store photos — media for products and brand assets",
          "7. Add FAQs — Site Settings FAQs shoppers can read",
          "8. Add legal pages — Privacy and Terms in Site Settings legal docs",
          "9. Publish your site — push the storefront live from Themes / publish flow",
        ],
      },
      {
        type: "callout",
        content:
          "Until all nine are complete, Getting Started stays in the sidebar with the X/9 badge. When the last step finishes, that Setup section leaves so daily navigation is only Menu + Settings.",
      },
      { type: "h2", content: "How to work the checklist efficiently" },
      {
        type: "list",
        content: [
          "1. Open Getting Started from the sidebar and expand the checklist",
          "2. Click into the incomplete step Softune highlights",
          "3. Finish the work in that screen (Products, Site Settings, Payments, etc.)",
          "4. Return to Getting Started and confirm the badge count increased",
          "5. Repeat until the badge reads 9/9 and Setup disappears",
        ],
      },
      { type: "h2", content: "Parallel work you can do anytime" },
      {
        type: "p",
        content:
          "You can still open Dashboard, Analytics, Fraud Protection, or Add-Ons while Setup is visible. The checklist does not lock the rest of Softune — it only tracks go-live readiness.",
      },
    ],
    "2 min read",
  ),

  "dashboard-tour": article(
    "dashboard-tour",
    "Run Softune’s Take a Tour: spotlight overlay, Skip/Back/Next, dashboard coverage, theme-editor stop, and return — launch only on click.",
    [
      {
        type: "p",
        content:
          "Take a Tour is Softune’s in-app guided walkthrough. It uses a spotlight overlay so you can see the real UI while Softune explains each stop. Controls are Skip, Back, and Next. Softune never auto-starts the tour.",
      },
      { type: "h2", content: "How to launch the tour" },
      {
        type: "list",
        content: [
          "1. Sign in to the Softune dashboard for your store",
          "2. Find Take a Tour at the bottom of the left sidebar",
          "3. Click Take a Tour once — the spotlight overlay appears",
          "4. Use Next to advance, Back to revisit, or Skip to exit early",
        ],
      },
      { type: "h2", content: "What the tour covers" },
      { type: "h3", content: "Dashboard Menu stops" },
      {
        type: "p",
        content:
          "The tour walks the main Menu items — Dashboard through Add-Ons — so you know where Categories, Products, Orders, Analytics, Themes, Customers, Courier, and Payments live without memorizing a map.",
      },
      { type: "h3", content: "Theme editor stop" },
      {
        type: "p",
        content:
          "The tour continues into the theme editor to introduce its tools rail (Brand, Colors, Header, Pages, Sections) and the live preview. After those stops, Softune returns you to the dashboard context.",
      },
      {
        type: "callout",
        content:
          "Softune remembers that you have seen the tour so it does not nag you. You can still click Take a Tour again whenever you want a refresher — including for a new teammate looking over your shoulder.",
      },
      { type: "h2", content: "When to run it again" },
      {
        type: "list",
        content: [
          "After a long break from Softune",
          "When onboarding staff who will use Themes or Orders",
          "After Softune adds new sidebar areas you have not explored",
        ],
      },
    ],
    "2 min read",
  ),

  "custom-domain": article(
    "custom-domain",
    "Connect a custom hostname in Softune Site Settings and watch live DNS status until the storefront is reachable on your brand URL.",
    [
      {
        type: "p",
        content:
          "Every Softune store can use a Softune-hosted hostname and, when you are ready, a custom domain you control. Custom domain configuration lives under Site Settings, with live DNS status checking so you know when the domain is actually connected.",
      },
      { type: "h2", content: "Before you start" },
      {
        type: "list",
        content: [
          "1. Decide the primary hostname customers will type (pick apex or www — stay consistent)",
          "2. Have login access to your DNS registrar (where the domain’s nameservers live)",
          "3. Keep Softune’s free hostname working while DNS propagates",
        ],
      },
      { type: "h2", content: "Connect the domain in Softune" },
      {
        type: "list",
        content: [
          "1. Open Settings → Site Settings in the sidebar",
          "2. Find the custom domain section for this store",
          "3. Enter the hostname you want Softune to serve",
          "4. Save and note the DNS records Softune instructs you to create",
          "5. At your registrar, add those DNS records exactly as shown",
          "6. Return to Site Settings and watch Softune’s live DNS status",
        ],
      },
      {
        type: "callout",
        content:
          "DNS changes are not instant. Softune’s status check is the source of truth — wait until status shows connected before sharing the custom URL widely.",
      },
      { type: "h2", content: "Verify on the live storefront" },
      {
        type: "list",
        content: [
          "1. Open the custom hostname in a private browser window",
          "2. Confirm the Softune storefront loads (home and a product page)",
          "3. Spot-check that HTTPS and branding look correct",
          "4. Update marketing links, WhatsApp bios, and packaging QR codes to the new host",
        ],
      },
    ],
    "2 min read",
  ),

  // ── Store Management ──────────────────────────────────────────────────────
  "adding-editing-products": article(
    "adding-editing-products",
    "Create Softune products with photos, merchant-defined variants, integer-cent pricing, stock, categories, and AI description writing with confirm-before-write.",
    [
      {
        type: "p",
        content:
          "Products is where your sellable catalog lives. Softune stores money as integer cents internally (never float), supports merchant-defined variant labels (not a hardcoded size/color-only model), and can draft descriptions with AI — but only after you confirm what will change.",
      },
      { type: "h2", content: "Add a product from scratch" },
      {
        type: "list",
        content: [
          "1. Open Menu → Products",
          "2. Start a new product",
          "3. Enter the title and description shoppers should see",
          "4. Attach photos from upload or the media library",
          "5. Set price (Softune stores it as integer cents under the hood)",
          "6. Set stock / availability fields Softune shows for this product",
          "7. Assign one or more Categories",
          "8. Save the product and confirm it appears in the Products list",
        ],
      },
      { type: "h2", content: "Variants with your own labels" },
      {
        type: "p",
        content:
          "When an item has options — size, color, weight, or anything you invent — add variants with the labels your customers actually use. Softune does not force a single fixed option vocabulary; you define the option names that fit the catalog.",
      },
      {
        type: "list",
        content: [
          "1. Open the product you want to vary",
          "2. Add variant options using your real labels (for example Size: S/M/L or Roast: Light/Dark)",
          "3. Set per-variant price or stock when Softune exposes those fields",
          "4. Save and preview the storefront product page so options render correctly",
        ],
      },
      { type: "h2", content: "AI-assisted descriptions (confirm first)" },
      {
        type: "list",
        content: [
          "1. Open a product with enough facts for Softune AI to draft from (title, key traits)",
          "2. Start AI description assistance from the product editor",
          "3. Review Softune’s confirm-before-write step — Softune shows exactly what will change",
          "4. Confirm only if the draft is accurate; otherwise edit or cancel",
          "5. Re-read the published copy on the live product page after save",
        ],
      },
      {
        type: "callout",
        content:
          "Never skip the confirm step. Softune’s AI assist is designed so merchants approve the exact text before it overwrites an existing description.",
      },
      { type: "h2", content: "Editing and cleanup" },
      {
        type: "list",
        content: [
          "Update prices and stock as inventory changes",
          "Replace photos when packaging improves",
          "Remove or deactivate products you no longer sell so storefront browsing stays honest",
        ],
      },
    ],
    "2 min read",
  ),

  "organizing-categories": article(
    "organizing-categories",
    "Build Softune Categories with images and active/inactive status so storefront browsing stays clear as the catalog grows.",
    [
      {
        type: "p",
        content:
          "Categories group products for browsing. Each Softune category can carry its own image and an active/inactive status so you can stage structure without exposing unfinished groups on the storefront.",
      },
      { type: "h2", content: "Create a category" },
      {
        type: "list",
        content: [
          "1. Open Menu → Categories",
          "2. Create a new category",
          "3. Name it the way customers already talk (Men, Sweets, Accessories)",
          "4. Add a category image if Softune shows that field for your storefront",
          "5. Set status to active when you want it visible, or inactive while you prepare",
          "6. Save and confirm it appears in the Categories list",
        ],
      },
      { type: "h2", content: "Attach products" },
      {
        type: "list",
        content: [
          "1. Open a product under Products",
          "2. Assign the category (or categories) Softune allows on that product",
          "3. Save the product",
          "4. Spot-check the storefront category or navigation that should list it",
        ],
      },
      { type: "h3", content: "Active vs inactive" },
      {
        type: "p",
        content:
          "Use inactive while you build seasonal or wholesale groupings. Flip to active only when product assignments and imagery are ready — Softune’s status control is there so unfinished categories do not confuse shoppers.",
      },
      {
        type: "callout",
        content:
          "Getting Started counts “create a category” as one of the nine Setup steps. Completing this early unlocks clearer storefront navigation for everything you add next.",
      },
    ],
    "2 min read",
  ),

  "managing-orders": article(
    "managing-orders",
    "Run Softune Orders end to end — statuses, detail view, customer info, and immutable snapshots when products later change.",
    [
      {
        type: "p",
        content:
          "Orders is Softune’s fulfillment inbox. Each order carries line items, customer info, payment method (including COD when enabled), and lifecycle status. Softune keeps order snapshots so a past order stays accurate even if you later edit or delete the live product.",
      },
      { type: "h2", content: "Review a new order" },
      {
        type: "list",
        content: [
          "1. Open Menu → Orders",
          "2. Select a new order from the list",
          "3. Read the order detail view — items, quantities, totals, and customer contact",
          "4. Confirm stock still covers what the customer bought",
          "5. Advance status as you pack and prepare handoff",
        ],
      },
      { type: "h2", content: "Status through fulfillment" },
      {
        type: "p",
        content:
          "Move the order through Softune’s lifecycle statuses as work progresses. Keep status honest — customers and your own analytics depend on it. When Courier is connected, use Softune’s courier handoff rather than retyping addresses into a separate portal.",
      },
      { type: "h2", content: "Why snapshots matter" },
      {
        type: "p",
        content:
          "Softune stores snapshot fields on order items (name, price, and related purchase-time data). If you rename a product or delete it next month, the historical order still shows what the customer actually bought.",
      },
      {
        type: "callout",
        content:
          "Order history is immutable on purpose. Softune does not “fix” past totals by joining live product prices — that is what snapshots are for.",
      },
      { type: "h2", content: "Finding older orders" },
      {
        type: "list",
        content: [
          "Use Softune’s search and filters on the Orders list",
          "Open the detail view for customer phone or delivery questions",
          "Cross-check Fraud Protection if a COD order looks risky before dispatch",
        ],
      },
    ],
    "2 min read",
  ),

  "working-with-customers": article(
    "working-with-customers",
    "Use Softune Customers to look up buyers, review order history, and support repeat outreach without leaving the dashboard.",
    [
      {
        type: "p",
        content:
          "Customers lists everyone who has ordered from your Softune store. Use it for support, delivery questions, and repeat outreach — always scoped to your tenant.",
      },
      { type: "h2", content: "Find a customer" },
      {
        type: "list",
        content: [
          "1. Open Menu → Customers",
          "2. Search or scan the list for the buyer",
          "3. Open their profile",
          "4. Review contact details Softune captured at checkout",
          "5. Open related orders when you need line-item or status context",
        ],
      },
      { type: "h2", content: "Support workflows that work" },
      {
        type: "list",
        content: [
          "Confirm identity with phone or order details before discussing delivery",
          "Use order snapshots when arguing about past prices or product names",
          "Note abusive phones in Fraud Protection’s blocklist after confirmed abuse",
        ],
      },
      {
        type: "callout",
        content:
          "Customer records are tenant-isolated business data. Only share them with staff who need them for fulfillment or support.",
      },
      { type: "h2", content: "Repeat outreach" },
      {
        type: "p",
        content:
          "When Softune Add-Ons like Email Marketing, WhatsApp Alerts, or Review Reminder are enabled, customer lists become the audience for those tools. Keep Customers clean so outreach does not hit bad numbers.",
      },
    ],
    "2 min read",
  ),

  // ── Storefront & Themes ───────────────────────────────────────────────────
  "choosing-a-theme": article(
    "choosing-a-theme",
    "Compare Softune’s real themes — Fashion, Emporium, and Vault — and pick the storefront design that fits your brand before editing.",
    [
      {
        type: "p",
        content:
          "Softune ships three full live storefront designs: Fashion, Emporium, and Vault. Each implements Softune’s shared page and section contract, so switching themes changes visual design without rebuilding your product catalog from scratch.",
      },
      { type: "h2", content: "The three themes" },
      { type: "h3", content: "Fashion" },
      {
        type: "p",
        content:
          "Fashion suits fashion and editorial brands — photography-forward layouts that keep the catalog feeling premium.",
      },
      { type: "h3", content: "Emporium" },
      {
        type: "p",
        content:
          "Emporium fits shops that sell across many categories — dense catalogs, bold category browsing, and marketplace-style grids.",
      },
      { type: "h3", content: "Vault" },
      {
        type: "p",
        content:
          "Vault is for digital goods — courses, templates, software, and downloads — with a product focus that feels instant to buy.",
      },
      { type: "h2", content: "How to choose" },
      {
        type: "list",
        content: [
          "1. Open Menu → Themes",
          "2. Preview Fashion, Emporium, and Vault against your real products",
          "3. Pick the theme whose homepage rhythm matches how customers shop you",
          "4. Continue into the theme editor to set Brand, Colors, Header, Pages, and Sections",
        ],
      },
      {
        type: "callout",
        content:
          "Theme choice is a starting skin. Softune’s editor — not custom CSS — is how you brand it afterward.",
      },
    ],
    "2 min read",
  ),

  "using-theme-editor": article(
    "using-theme-editor",
    "Use Softune’s theme editor tools rail — Brand, Colors, Header, Pages, Sections — with live preview and device toggles.",
    [
      {
        type: "p",
        content:
          "Softune’s theme editor is a structured visual tool. Merchants work through a tools rail (Brand, Colors, Header, Pages, Sections) beside a live preview of the real storefront. Softune does not expose free-form custom CSS as the primary editing path.",
      },
      { type: "h2", content: "Open the editor" },
      {
        type: "list",
        content: [
          "1. Open Menu → Themes",
          "2. Enter the theme editor for the active storefront",
          "3. Orient yourself: tools rail on one side, live preview on the other",
          "4. Use the device toggle (desktop / tablet / mobile) while you edit",
        ],
      },
      { type: "h2", content: "Tools rail panels" },
      { type: "h3", content: "Brand" },
      {
        type: "p",
        content:
          "Set store name, logo, tagline, and font pairing. Softune’s AI Suggest can propose a full brand direction you can accept or refine.",
      },
      { type: "h3", content: "Colors" },
      {
        type: "p",
        content:
          "Adjust the palette Softune exposes for the theme. AI Suggest can propose color directions; always check contrast on buttons and text after applying.",
      },
      { type: "h3", content: "Header" },
      {
        type: "p",
        content:
          "Configure nav layout, header links, and the announcement bar customers see at the top of the storefront.",
      },
      { type: "h3", content: "Pages" },
      {
        type: "p",
        content:
          "Turn Softune storefront pages on or off. Home is always available; other pages follow what Softune exposes for the theme.",
      },
      { type: "h3", content: "Sections" },
      {
        type: "p",
        content:
          "Manage homepage blocks: drag to reorder, use the numbered rail to jump to a section, and Add Section when you need a new block type Softune supports.",
      },
      {
        type: "callout",
        content:
          "On smaller screens Softune’s editor supports Edit | Preview stacking so you can focus on one surface at a time.",
      },
      { type: "h2", content: "Save vs Publish" },
      {
        type: "list",
        content: [
          "Save keeps a local draft of your editor work",
          "Publish pushes changes live",
          "Softune notes that live updates can take 1–2 minutes to appear on the storefront after Publish",
        ],
      },
    ],
    "2 min read",
  ),

  "brand-colors-ai-suggest": article(
    "brand-colors-ai-suggest",
    "Run Softune AI Suggest from Brand and Colors in the theme editor — review proposals, check contrast, then Save or Publish.",
    [
      {
        type: "p",
        content:
          "AI Suggest accelerates brand decisions inside the theme editor. Softune can propose a full brand direction from Brand, and palette ideas from Colors. Softune still expects you to approve what shoppers will see.",
      },
      { type: "h2", content: "Suggest a brand direction" },
      {
        type: "list",
        content: [
          "1. Open Themes → theme editor → Brand",
          "2. Confirm name, logo, and tagline fields Softune shows",
          "3. Run AI Suggest for a full brand direction",
          "4. Preview how typography and voice feel on the live preview pane",
          "5. Keep, tweak, or discard before moving on",
        ],
      },
      { type: "h2", content: "Suggest colors" },
      {
        type: "list",
        content: [
          "1. Switch to Colors on the tools rail",
          "2. Run AI Suggest for palette proposals",
          "3. Apply a candidate and toggle desktop/tablet/mobile preview",
          "4. Check button text, links, and announcement bar contrast",
          "5. Save the draft; Publish when ready for the live site",
        ],
      },
      {
        type: "callout",
        content:
          "AI Suggest is assistive. Softune does not replace your brand guidelines — always verify readability before Publish.",
      },
    ],
    "2 min read",
  ),

  "publishing-storefront": article(
    "publishing-storefront",
    "Use Softune Save for drafts and Publish for live — including the real 1–2 minute propagation note on the storefront.",
    [
      {
        type: "p",
        content:
          "Softune separates draft work from the live storefront. Save keeps editor changes as a local draft. Publish pushes them live. Softune surfaces a note that changes can take 1–2 minutes to appear on the live site.",
      },
      { type: "h2", content: "Pre-publish checklist" },
      {
        type: "list",
        content: [
          "1. Preview Home and a product page on desktop and mobile",
          "2. Confirm Header links and announcement bar copy are correct",
          "3. Confirm featured products are in stock and priced correctly",
          "4. Confirm Payments and Courier match how you actually fulfill",
          "5. Confirm FAQs and legal pages from Site Settings if the checklist required them",
        ],
      },
      { type: "h2", content: "Save, then Publish" },
      {
        type: "list",
        content: [
          "1. Click Save to store the draft in Softune",
          "2. Click Publish when you intend customers to see the changes",
          "3. Wait 1–2 minutes before judging the live storefront",
          "4. Open Softune hostname or custom domain in a private window",
          "5. Spot-check Home, a category, and a product page",
        ],
      },
      {
        type: "callout",
        content:
          "If something looks wrong after Publish, return to the editor, fix it, Save, and Publish again — Softune’s delay note applies each time.",
      },
      { type: "h2", content: "Getting Started completion" },
      {
        type: "p",
        content:
          "Publish your site is the final step on Softune’s 9-step Getting Started checklist. Completing it (with the other eight) removes the Setup section from the sidebar.",
      },
    ],
    "2 min read",
  ),

  // ── Payments & Courier ────────────────────────────────────────────────────
  "connecting-payment-gateways": article(
    "connecting-payment-gateways",
    "Connect Softune Payments — COD, manual bKash/Nagad, official bKash, Nagad, and SSLCommerz — and understand why Payments is included by default (not part of the 25 paid Add-Ons).",
    [
      {
        type: "p",
        content:
          "Menu → Payments is where Softune connects the ways customers pay. You can enable Cash on Delivery, manual wallet payments (bKash and Nagad: the shopper pays your number and submits a transaction ID), plus official bKash, Nagad, and SSLCommerz merchant accounts. Payments (with Courier) shows as Included by Default on the Add-Ons page — core infrastructure, not one of the 25 optional marketplace Add-Ons.",
      },
      { type: "h2", content: "Enable a payment method" },
      {
        type: "list",
        content: [
          "1. Open Menu → Payments",
          "2. Choose Cash on Delivery, Manual Payment, official bKash, Nagad, or SSLCommerz",
          "3. Enter the credentials Softune asks for (wallet number, or merchant keys for gateway connects)",
          "4. Save the method for the store",
          "5. Place a test checkout for COD or manual wallets, and confirm Softune records the order and any transaction ID correctly",
        ],
      },
      {
        type: "callout",
        content:
          "Softune does not offer Stripe or PayPal. Connect only the methods listed on Payments: COD, manual bKash/Nagad, official bKash, Nagad, and SSLCommerz.",
      },
      { type: "h2", content: "Included by Default vs Add-Ons catalog" },
      {
        type: "p",
        content:
          "On Add-Ons, Softune shows Payments and Courier as Included by Default. The 25-item catalog covers optional engagement, marketing, AI, and operations tools — not these core rails.",
      },
      { type: "h2", content: "Getting Started step" },
      {
        type: "p",
        content:
          "Connect a payment method is one of Softune’s nine Getting Started checklist items. Completing it advances the X/9 badge.",
      },
    ],
    "2 min read",
  ),

  "cash-on-delivery": article(
    "cash-on-delivery",
    "Enable Softune Cash on Delivery, train fulfillment on COD reality, and pair it with Fraud Protection for risky orders.",
    [
      {
        type: "p",
        content:
          "Cash on Delivery (COD) is a first-class Softune payment path for markets where buyers prefer to pay on delivery. Enable it from Payments alongside manual bKash/Nagad when you use wallet checkout.",
      },
      { type: "h2", content: "Enable COD" },
      {
        type: "list",
        content: [
          "1. Open Menu → Payments",
          "2. Find Cash on Delivery among Softune payment methods",
          "3. Enable COD for the store",
          "4. Place a test order selecting COD and confirm it appears under Orders",
          "5. Train staff on how cash is collected with your courier partner",
        ],
      },
      { type: "h2", content: "Operate COD safely" },
      {
        type: "list",
        content: [
          "Review high-value first-time COD orders carefully",
          "Use Fraud Protection rules and the phone blocklist for repeat abusers",
          "Confirm phone and address quality before dispatching expensive shipments",
        ],
      },
      {
        type: "callout",
        content:
          "COD increases delivery risk. Softune’s Fraud Protection exists specifically for patterns Softune merchants see with COD-heavy catalogs.",
      },
    ],
    "2 min read",
  ),

  "connecting-courier-partners": article(
    "connecting-courier-partners",
    "Connect Softune Courier to Bangladesh delivery partners for order handoff — core (Included by Default), not a paid Add-On.",
    [
      {
        type: "p",
        content:
          "Menu → Couriers lists Softune’s Bangladesh courier partners on one screen. You can connect Steadfast, Pathao, RedX, and eCourier with your own merchant accounts today. Paperfly, Sundarban, Carrybee, SA Paribahan, and PandaGo appear on the same roster. Like Payments, Courier is Included by Default on the Add-Ons page — not one of the 25 optional Add-Ons.",
      },
      { type: "h2", content: "Connect a partner" },
      {
        type: "list",
        content: [
          "1. Open Menu → Couriers",
          "2. Choose a partner you can connect today — Steadfast, Pathao, RedX, or eCourier",
          "3. Enter the API credentials Softune requests",
          "4. Save and confirm Softune verifies and shows the partner as connected",
          "5. Keep order status in Softune in sync with how you fulfill outside the dashboard",
        ],
      },
      { type: "h2", content: "Day-to-day fulfillment" },
      {
        type: "list",
        content: [
          "Open the order in Orders",
          "Confirm address and phone",
          "Book or hand off with your connected courier using their tools or Softune’s handoff when available for that partner",
          "Update Softune order status honestly after the courier accepts the parcel",
        ],
      },
      {
        type: "callout",
        content:
          "Softune’s courier story is domestic Bangladesh logistics. Softune does not claim real-time public tracking or auto-booking for every partner on the roster.",
      },
      { type: "h2", content: "Getting Started step" },
      {
        type: "p",
        content:
          "Set up courier is one of the nine Getting Started checklist steps Softune tracks in the Setup sidebar section.",
      },
    ],
    "2 min read",
  ),

  "shipping-locations": article(
    "shipping-locations",
    "Define Softune shipping locations in Site Settings so checkout and courier coverage match where you actually deliver.",
    [
      {
        type: "p",
        content:
          "Site Settings → Shipping is where Softune stores shipping locations — the places your store serves. Keep this list aligned with Courier coverage and COD reality.",
      },
      { type: "h2", content: "Configure locations" },
      {
        type: "list",
        content: [
          "1. Open Settings → Site Settings",
          "2. Open the Shipping section",
          "3. Add locations you deliver to today",
          "4. Remove or disable areas you no longer cover",
          "5. Save Softune settings",
          "6. Place a test checkout for an in-coverage and out-of-coverage address if Softune enforces that boundary",
        ],
      },
      { type: "h2", content: "Keep Locations and Courier in sync" },
      {
        type: "p",
        content:
          "If Softune shows a city as shippable but your courier partner does not cover it, customers will order and you will fail delivery. Update shipping locations whenever you expand or shrink coverage.",
      },
    ],
    "2 min read",
  ),

  // ── Analytics & Reporting ─────────────────────────────────────────────────
  "reading-store-analytics": article(
    "reading-store-analytics",
    "Read Softune Analytics — sales trends, best sellers, category performance, and the date-range picker — then act on Orders.",
    [
      {
        type: "p",
        content:
          "Menu → Analytics summarizes store performance: sales trends, best sellers, and category performance, filtered by Softune’s date-range picker.",
      },
      { type: "h2", content: "Read a date range" },
      {
        type: "list",
        content: [
          "1. Open Menu → Analytics",
          "2. Set the date-range picker to the window you care about (today, last 7 days, custom)",
          "3. Review sales trends Softune charts for that range",
          "4. Check best sellers Softune lists",
          "5. Check category performance Softune shows",
          "6. Open Orders if a spike or dip needs operational explanation",
        ],
      },
      { type: "h2", content: "Questions Analytics answers well" },
      {
        type: "list",
        content: [
          "Which products moved this week?",
          "Which categories carry revenue?",
          "Did a campaign day outperform the week before?",
        ],
      },
      {
        type: "callout",
        content:
          "Analytics reflects Softune order data. Always reconcile surprising numbers against Orders and payment/courier reality before restocking or discounting.",
      },
    ],
    "2 min read",
  ),

  "exporting-reports": article(
    "exporting-reports",
    "Use Softune’s Analytics export menu for CSV (Excel), PDF, or JSON — full multi-section export or a scoped table export.",
    [
      {
        type: "p",
        content:
          "Softune Analytics includes an export menu for CSV (Excel), PDF, and JSON. You can run a full multi-section export (summary, sales report, best sellers, category shares) or a scoped export from just one table.",
      },
      { type: "h2", content: "Full multi-section export" },
      {
        type: "list",
        content: [
          "1. Open Analytics and set the date range",
          "2. Open Softune’s export menu",
          "3. Choose CSV, PDF, or JSON",
          "4. Select the full export Softune offers (summary + sales + best sellers + category shares)",
          "5. Download and archive or share with accounting",
        ],
      },
      { type: "h2", content: "Scoped single-table export" },
      {
        type: "list",
        content: [
          "1. Focus Softune Analytics on the table you need (for example best sellers)",
          "2. Use the scoped export Softune exposes for that table",
          "3. Choose format (CSV / PDF / JSON) Softune allows for that scope",
          "4. Download and verify row counts match what you saw on screen",
        ],
      },
      {
        type: "callout",
        content:
          "Exports honor the date range and filters you selected. Softune will not silently expand the window — check the picker before downloading.",
      },
    ],
    "2 min read",
  ),

  "fraud-protection-rules": article(
    "fraud-protection-rules",
    "Configure Softune Fraud Protection rule-based flagging, then review held orders before courier handoff.",
    [
      {
        type: "p",
        content:
          "Settings → Fraud Protection combines rule-based flagging with a manual blocklist. Softune evaluates configurable rules on the current order — for example holding first-time high-value checkouts or flagging burst orders from one phone.",
      },
      { type: "h2", content: "Enable and tune rules" },
      {
        type: "list",
        content: [
          "1. Open Settings → Fraud Protection",
          "2. Review Softune’s available rules",
          "3. Enable only rules that match your COD risk tolerance",
          "4. Set thresholds Softune exposes (order value, time window, etc.)",
          "5. Save",
          "6. Place a test order that should trigger a rule and confirm Softune flags or holds it",
        ],
      },
      { type: "h2", content: "Operational follow-up" },
      {
        type: "list",
        content: [
          "Review flagged orders in Orders before booking a courier",
          "Call or message the customer when Softune holds a high-value first order",
          "Escalate repeat abusers to the phone blocklist",
        ],
      },
      {
        type: "callout",
        content:
          "Fraud rules protect margin on COD. Softune still expects human judgment before you refuse a legitimate buyer.",
      },
    ],
    "2 min read",
  ),

  "managing-phone-blocklist": article(
    "managing-phone-blocklist",
    "Maintain Softune’s manual Fraud Protection phone blocklist with notes — add after confirmed abuse, remove mistakes quickly.",
    [
      {
        type: "p",
        content:
          "Softune’s Fraud Protection blocklist rejects checkouts from phone numbers you mark as abusive. Softune supports notes so staff know why a number was blocked.",
      },
      { type: "h2", content: "Add a number" },
      {
        type: "list",
        content: [
          "1. Open Settings → Fraud Protection",
          "2. Open the blocklist Softune shows",
          "3. Add the phone number after confirmed abuse (not a single soft refusal)",
          "4. Write a short note for teammates",
          "5. Save and confirm Softune lists the entry",
        ],
      },
      { type: "h2", content: "Remove a mistake" },
      {
        type: "list",
        content: [
          "1. Find the entry in the blocklist",
          "2. Remove it if a legitimate customer was blocked",
          "3. Ask the customer to retry checkout",
          "4. Apologize and fulfill if the order succeeds",
        ],
      },
      {
        type: "callout",
        content:
          "Pair the blocklist with Softune’s rule-based flagging. Rules catch patterns; the blocklist stops known bad phones at the door.",
      },
    ],
    "2 min read",
  ),

  // ── Add-Ons ───────────────────────────────────────────────────────────────
  "browsing-addons-marketplace": article(
    "browsing-addons-marketplace",
    "Browse Softune’s Add-Ons page — 25 optional Add-Ons in four categories, plus Payments & Courier marked Included by Default.",
    [
      {
        type: "p",
        content:
          "Menu → Add-Ons is Softune’s native marketplace. Softune lists 25 optional Add-Ons across Customer Engagement, Marketing & Sales, AI Automation, and Operations & Insights. On the same page, Softune shows Payments and Courier as Included by Default because they are core — not part of the paid optional catalog.",
      },
      { type: "h2", content: "How to browse" },
      {
        type: "list",
        content: [
          "1. Open Menu → Add-Ons",
          "2. Note Payments and Courier under Included by Default",
          "3. Filter or scroll the four optional categories Softune shows",
          "4. Open an Add-On card to read its short description",
          "5. Enable only what solves a current bottleneck",
        ],
      },
      { type: "h2", content: "The four optional categories (25 Add-Ons)" },
      {
        type: "list",
        content: [
          "Customer Engagement — Live Chat, WhatsApp Alerts, SMS Updates, Product Reviews, Loyalty Points, Recently Viewed, Quick View, Product Enquiry, Product Compare, Size Guide",
          "Marketing & Sales — Discount Codes, Email Marketing, Referral Program, Purchase Notification, Wholesale Pricing, Frequently Bought, Review Reminder",
          "AI Automation — AI Chatbot, AI Auto-Reply, AI Ad Copy, AI Forecasting",
          "Operations & Insights — Staff Roles, Stock Alerts, Spam Prevention, Catalog Export, Product Badges",
        ],
      },
      {
        type: "callout",
        content:
          "Do not enable everything on day one. Softune’s marketplace is designed so you grow into Add-Ons as support load, catalog size, or team size demands them.",
      },
    ],
    "2 min read",
  ),

  "customer-engagement-addons": article(
    "customer-engagement-addons",
    "Enable Softune Customer Engagement Add-Ons — Live Chat through Size Guide — when shoppers need conversation and confidence.",
    [
      {
        type: "p",
        content:
          "Customer Engagement Add-Ons help shoppers talk to you and decide with confidence. Softune’s set: Live Chat, WhatsApp Alerts, SMS Updates, Product Reviews, Loyalty Points, Recently Viewed, Quick View, Product Enquiry, Product Compare, and Size Guide.",
      },
      { type: "h2", content: "Enable an engagement Add-On" },
      {
        type: "list",
        content: [
          "1. Open Menu → Add-Ons",
          "2. Filter to Customer Engagement",
          "3. Open the Add-On (for example Live Chat or WhatsApp Alerts)",
          "4. Enable it for the store",
          "5. Complete any Softune configuration fields that Add-On requires",
          "6. Preview the storefront to confirm the widget or flow appears",
        ],
      },
      { type: "h2", content: "Suggested order" },
      {
        type: "list",
        content: [
          "Start with messaging channels customers already use (WhatsApp Alerts / Live Chat)",
          "Add Product Reviews once you have delivered enough orders for social proof",
          "Add Size Guide / Product Compare when hesitation comes from fit or option overload",
        ],
      },
    ],
    "2 min read",
  ),

  "marketing-sales-addons": article(
    "marketing-sales-addons",
    "Turn on Softune Marketing & Sales Add-Ons — Discount Codes, referrals, wholesale tiers, and related growth tools.",
    [
      {
        type: "p",
        content:
          "Marketing & Sales Add-Ons plug into Softune catalog and checkout flows: Discount Codes, Email Marketing, Referral Program, Purchase Notification, Wholesale Pricing, Frequently Bought, and Review Reminder.",
      },
      { type: "h2", content: "Campaign-ready path" },
      {
        type: "list",
        content: [
          "1. Open Add-Ons → Marketing & Sales",
          "2. Enable Discount Codes before your first promo",
          "3. Configure Softune’s discount fields Softune shows for that Add-On",
          "4. Test a checkout with a valid and invalid code",
          "5. Add Review Reminder after you have reliable delivery completion",
          "6. Enable Wholesale Pricing only if you truly sell in bulk tiers",
        ],
      },
      { type: "h2", content: "Merchandising helpers" },
      {
        type: "p",
        content:
          "Frequently Bought and Purchase Notification support conversion on product pages. Enable them when Softune’s catalog is large enough that cross-sells and social proof help — not before you have traffic to observe.",
      },
    ],
    "2 min read",
  ),

  "ai-operations-addons": article(
    "ai-operations-addons",
    "Use Softune AI Automation and Operations & Insights Add-Ons — from AI Chatbot to Staff Roles, Stock Alerts, and Product Badges.",
    [
      {
        type: "p",
        content:
          "Softune splits back-office power into AI Automation (AI Chatbot, AI Auto-Reply, AI Ad Copy, AI Forecasting) and Operations & Insights (Staff Roles, Stock Alerts, Spam Prevention, Catalog Export, Product Badges).",
      },
      { type: "h2", content: "AI Automation" },
      {
        type: "list",
        content: [
          "1. Open Add-Ons → AI Automation",
          "2. Enable AI Chatbot if storefront FAQs dominate support time",
          "3. Enable AI Auto-Reply if inbox volume is high",
          "4. Use AI Ad Copy when you need short campaign text drafts",
          "5. Use AI Forecasting when you have enough Softune sales history to plan stock",
        ],
      },
      { type: "h2", content: "Operations & Insights" },
      {
        type: "list",
        content: [
          "1. Open Add-Ons → Operations & Insights",
          "2. Enable Staff Roles before inviting teammates who should not see Billing",
          "3. Enable Stock Alerts when stockouts hurt COD trust",
          "4. Enable Spam Prevention if storefront forms attract bots",
          "5. Use Catalog Export for wholesale handoffs",
          "6. Use Product Badges to highlight New / Bestseller / Low Stock consistently",
        ],
      },
      {
        type: "callout",
        content:
          "Payments and Courier remain Included by Default on this page. Softune’s 25 optional Add-Ons never replace those core Menu items.",
      },
    ],
    "2 min read",
  ),
};

/** Resolve article content or return undefined for unknown slugs. */
export function getDocArticle(slug: string): DocArticleContent | undefined {
  return DOC_ARTICLES[slug];
}

/** All known article slugs (useful for static generation if added later). */
export function getAllDocSlugs(): string[] {
  return Object.keys(DOC_ARTICLES);
}
