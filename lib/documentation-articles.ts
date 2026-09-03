/**
 * Per-slug documentation article bodies. Every claim should map to a real
 * Softune dashboard surface — no invented Stripe/CSS/multi-currency features.
 */

import {
  findDocArticleMeta,
  findDocCategoryBySlug,
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
  const category = findDocCategoryBySlug(slug);
  const meta = findDocArticleMeta(slug);
  if (!category || !meta) {
    throw new Error(`Unknown documentation slug: ${slug}`);
  }
  return {
    slug,
    title: meta.title,
    category: category.title,
    categoryIcon: DOC_ICON_PATHS[category.icon as keyof typeof DOC_ICON_PATHS],
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
    "A full orientation to Softunebd’s dashboard — sidebar structure, Setup vs Menu vs Settings, and how your store stays tenant-isolated.",
    [
      {
        type: "p",
        content:
          "Softunebd is a multi-tenant ecommerce SaaS for independent merchants and small brands. You get an isolated store, a live storefront, and one dashboard for catalog, orders, themes, payments, couriers, analytics, fraud tools, and Add-Ons — without bolting together unrelated apps.",
      },
      { type: "h2", content: "What Softunebd is (and is not)" },
      {
        type: "p",
        content:
          "Softunebd is infrastructure for your own branded storefront. You own the customer relationship. Softunebd is not a marketplace that sits between you and buyers, and Softunebd does not include a point-of-sale terminal product.",
      },
      {
        type: "callout",
        content:
          "Tenant isolation is non-negotiable: your products, orders, customers, and settings stay scoped to your stores. Other Softunebd merchants cannot see them.",
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
          "While your store is incomplete, Softunebd shows a Getting Started section with a setup checklist and an “X/9 complete” badge. That section stays in the sidebar until every checklist step is done, then it goes away so daily work lives under Menu and Settings.",
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
    "Walk Softunebd’s real 9-step Getting Started checklist from first product to publish — including when the Setup section leaves the sidebar.",
    [
      {
        type: "p",
        content:
          "Softunebd’s Getting Started checklist is a concrete Setup flow in the sidebar, not a welcome email. Softunebd shows an X/9 complete badge and keeps Getting Started visible until every step is finished.",
      },
      { type: "h2", content: "The nine checklist steps" },
      {
        type: "p",
        content:
          "Complete these in roughly this order. Softunebd marks each step done when the underlying work exists in the product.",
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
          "2. Click into the incomplete step Softunebd highlights",
          "3. Finish the work in that screen (Products, Site Settings, Payments, etc.)",
          "4. Return to Getting Started and confirm the badge count increased",
          "5. Repeat until the badge reads 9/9 and Setup disappears",
        ],
      },
      { type: "h2", content: "Parallel work you can do anytime" },
      {
        type: "p",
        content:
          "You can still open Dashboard, Analytics, Fraud Protection, or Add-Ons while Setup is visible. The checklist does not lock the rest of Softunebd — it only tracks go-live readiness.",
      },
    ],
    "2 min read",
  ),

  "dashboard-tour": article(
    "dashboard-tour",
    "Run Softunebd’s Take a Tour: spotlight overlay, Skip/Back/Next, dashboard coverage, theme-editor stop, and return — launch only on click.",
    [
      {
        type: "p",
        content:
          "Take a Tour is Softunebd’s in-app guided walkthrough. It uses a spotlight overlay so you can see the real UI while Softunebd explains each stop. Controls are Skip, Back, and Next. Softunebd never auto-starts the tour.",
      },
      { type: "h2", content: "How to launch the tour" },
      {
        type: "list",
        content: [
          "1. Sign in to the Softunebd dashboard for your store",
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
          "The tour continues into the theme editor to introduce its tools rail (Brand, Colors, Header, Pages, Sections) and the live preview. After those stops, Softunebd returns you to the dashboard context.",
      },
      {
        type: "callout",
        content:
          "Softunebd remembers that you have seen the tour so it does not nag you. You can still click Take a Tour again whenever you want a refresher — including for a new teammate looking over your shoulder.",
      },
      { type: "h2", content: "When to run it again" },
      {
        type: "list",
        content: [
          "After a long break from Softunebd",
          "When onboarding staff who will use Themes or Orders",
          "After Softunebd adds new sidebar areas you have not explored",
        ],
      },
    ],
    "2 min read",
  ),

  "custom-domain": article(
    "custom-domain",
    "Connect a custom hostname in Softunebd Site Settings and watch live DNS status until the storefront is reachable on your brand URL.",
    [
      {
        type: "p",
        content:
          "Every Softunebd store can use a Softunebd-hosted hostname and, when you are ready, a custom domain you control. Custom domain configuration lives under Site Settings, with live DNS status checking so you know when the domain is actually connected.",
      },
      { type: "h2", content: "Before you start" },
      {
        type: "list",
        content: [
          "1. Decide the primary hostname customers will type (pick apex or www — stay consistent)",
          "2. Have login access to your DNS registrar (where the domain’s nameservers live)",
          "3. Keep Softunebd’s free hostname working while DNS propagates",
        ],
      },
      { type: "h2", content: "Connect the domain in Softunebd" },
      {
        type: "list",
        content: [
          "1. Open Settings → Site Settings in the sidebar",
          "2. Find the custom domain section for this store",
          "3. Enter the hostname you want Softunebd to serve",
          "4. Save and note the DNS records Softunebd instructs you to create",
          "5. At your registrar, add those DNS records exactly as shown",
          "6. Return to Site Settings and watch Softunebd’s live DNS status",
        ],
      },
      {
        type: "callout",
        content:
          "DNS changes are not instant. Softunebd’s status check is the source of truth — wait until status shows connected before sharing the custom URL widely.",
      },
      { type: "h2", content: "Verify on the live storefront" },
      {
        type: "list",
        content: [
          "1. Open the custom hostname in a private browser window",
          "2. Confirm the Softunebd storefront loads (home and a product page)",
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
    "Create Softunebd products with photos, merchant-defined variants, integer-cent pricing, stock, categories, and AI description writing with confirm-before-write.",
    [
      {
        type: "p",
        content:
          "Products is where your sellable catalog lives. Softunebd stores money as integer cents internally (never float), supports merchant-defined variant labels (not a hardcoded size/color-only model), and can draft descriptions with AI — but only after you confirm what will change.",
      },
      { type: "h2", content: "Add a product from scratch" },
      {
        type: "list",
        content: [
          "1. Open Menu → Products",
          "2. Start a new product",
          "3. Enter the title and description shoppers should see",
          "4. Attach photos from upload or the media library",
          "5. Set price (Softunebd stores it as integer cents under the hood)",
          "6. Set stock / availability fields Softunebd shows for this product",
          "7. Assign one or more Categories",
          "8. Save the product and confirm it appears in the Products list",
        ],
      },
      { type: "h2", content: "Variants with your own labels" },
      {
        type: "p",
        content:
          "When an item has options — size, color, weight, or anything you invent — add variants with the labels your customers actually use. Softunebd does not force a single fixed option vocabulary; you define the option names that fit the catalog.",
      },
      {
        type: "list",
        content: [
          "1. Open the product you want to vary",
          "2. Add variant options using your real labels (for example Size: S/M/L or Roast: Light/Dark)",
          "3. Set per-variant price or stock when Softunebd exposes those fields",
          "4. Save and preview the storefront product page so options render correctly",
        ],
      },
      { type: "h2", content: "AI-assisted descriptions (confirm first)" },
      {
        type: "list",
        content: [
          "1. Open a product with enough facts for Softunebd AI to draft from (title, key traits)",
          "2. Start AI description assistance from the product editor",
          "3. Review Softunebd’s confirm-before-write step — Softunebd shows exactly what will change",
          "4. Confirm only if the draft is accurate; otherwise edit or cancel",
          "5. Re-read the published copy on the live product page after save",
        ],
      },
      {
        type: "callout",
        content:
          "Never skip the confirm step. Softunebd’s AI assist is designed so merchants approve the exact text before it overwrites an existing description.",
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
    "Build Softunebd Categories with images and active/inactive status so storefront browsing stays clear as the catalog grows.",
    [
      {
        type: "p",
        content:
          "Categories group products for browsing. Each Softunebd category can carry its own image and an active/inactive status so you can stage structure without exposing unfinished groups on the storefront.",
      },
      { type: "h2", content: "Create a category" },
      {
        type: "list",
        content: [
          "1. Open Menu → Categories",
          "2. Create a new category",
          "3. Name it the way customers already talk (Men, Sweets, Accessories)",
          "4. Add a category image if Softunebd shows that field for your storefront",
          "5. Set status to active when you want it visible, or inactive while you prepare",
          "6. Save and confirm it appears in the Categories list",
        ],
      },
      { type: "h2", content: "Attach products" },
      {
        type: "list",
        content: [
          "1. Open a product under Products",
          "2. Assign the category (or categories) Softunebd allows on that product",
          "3. Save the product",
          "4. Spot-check the storefront category or navigation that should list it",
        ],
      },
      { type: "h3", content: "Active vs inactive" },
      {
        type: "p",
        content:
          "Use inactive while you build seasonal or wholesale groupings. Flip to active only when product assignments and imagery are ready — Softunebd’s status control is there so unfinished categories do not confuse shoppers.",
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
    "Run Softunebd Orders end to end — statuses, detail view, customer info, and immutable snapshots when products later change.",
    [
      {
        type: "p",
        content:
          "Orders is Softunebd’s fulfillment inbox. Each order carries line items, customer info, payment method (including COD when enabled), and lifecycle status. Softunebd keeps order snapshots so a past order stays accurate even if you later edit or delete the live product.",
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
          "Move the order through Softunebd’s lifecycle statuses as work progresses. Keep status honest — customers and your own analytics depend on it. When Courier is connected, use Softunebd’s courier handoff rather than retyping addresses into a separate portal.",
      },
      { type: "h2", content: "Why snapshots matter" },
      {
        type: "p",
        content:
          "Softunebd stores snapshot fields on order items (name, price, and related purchase-time data). If you rename a product or delete it next month, the historical order still shows what the customer actually bought.",
      },
      {
        type: "callout",
        content:
          "Order history is immutable on purpose. Softunebd does not “fix” past totals by joining live product prices — that is what snapshots are for.",
      },
      { type: "h2", content: "Finding older orders" },
      {
        type: "list",
        content: [
          "Use Softunebd’s search and filters on the Orders list",
          "Open the detail view for customer phone or delivery questions",
          "Cross-check Fraud Protection if a COD order looks risky before dispatch",
        ],
      },
    ],
    "2 min read",
  ),

  "working-with-customers": article(
    "working-with-customers",
    "Use Softunebd Customers to look up buyers, review order history, and support repeat outreach without leaving the dashboard.",
    [
      {
        type: "p",
        content:
          "Customers lists everyone who has ordered from your Softunebd store. Use it for support, delivery questions, and repeat outreach — always scoped to your tenant.",
      },
      { type: "h2", content: "Find a customer" },
      {
        type: "list",
        content: [
          "1. Open Menu → Customers",
          "2. Search or scan the list for the buyer",
          "3. Open their profile",
          "4. Review contact details Softunebd captured at checkout",
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
          "When Softunebd Add-Ons like Email Marketing, WhatsApp Alerts, or Review Reminder are enabled, customer lists become the audience for those tools. Keep Customers clean so outreach does not hit bad numbers.",
      },
    ],
    "2 min read",
  ),

  // ── Storefront & Themes ───────────────────────────────────────────────────
  "choosing-a-theme": article(
    "choosing-a-theme",
    "Compare Softunebd’s real themes — Fashion, Emporium, and Vault — and pick the storefront design that fits your brand before editing.",
    [
      {
        type: "p",
        content:
          "Softunebd ships three full live storefront designs: Fashion, Emporium, and Vault. Each implements Softunebd’s shared page and section contract, so switching themes changes visual design without rebuilding your product catalog from scratch.",
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
          "Theme choice is a starting skin. Softunebd’s editor — not custom CSS — is how you brand it afterward.",
      },
    ],
    "2 min read",
  ),

  "using-theme-editor": article(
    "using-theme-editor",
    "Use Softunebd’s theme editor tools rail — Brand, Colors, Header, Pages, Sections — with live preview and device toggles.",
    [
      {
        type: "p",
        content:
          "Softunebd’s theme editor is a structured visual tool. Merchants work through a tools rail (Brand, Colors, Header, Pages, Sections) beside a live preview of the real storefront. Softunebd does not expose free-form custom CSS as the primary editing path.",
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
          "Set store name, logo, tagline, and font pairing. Softunebd’s AI Suggest can propose a full brand direction you can accept or refine.",
      },
      { type: "h3", content: "Colors" },
      {
        type: "p",
        content:
          "Adjust the palette Softunebd exposes for the theme. AI Suggest can propose color directions; always check contrast on buttons and text after applying.",
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
          "Turn Softunebd storefront pages on or off. Home is always available; other pages follow what Softunebd exposes for the theme.",
      },
      { type: "h3", content: "Sections" },
      {
        type: "p",
        content:
          "Manage homepage blocks: drag to reorder, use the numbered rail to jump to a section, and Add Section when you need a new block type Softunebd supports.",
      },
      {
        type: "callout",
        content:
          "On smaller screens Softunebd’s editor supports Edit | Preview stacking so you can focus on one surface at a time.",
      },
      { type: "h2", content: "Save vs Publish" },
      {
        type: "list",
        content: [
          "Save keeps a local draft of your editor work",
          "Publish pushes changes live",
          "Softunebd notes that live updates can take 1–2 minutes to appear on the storefront after Publish",
        ],
      },
    ],
    "2 min read",
  ),

  "brand-colors-ai-suggest": article(
    "brand-colors-ai-suggest",
    "Run Softunebd AI Suggest from Brand and Colors in the theme editor — review proposals, check contrast, then Save or Publish.",
    [
      {
        type: "p",
        content:
          "AI Suggest accelerates brand decisions inside the theme editor. Softunebd can propose a full brand direction from Brand, and palette ideas from Colors. Softunebd still expects you to approve what shoppers will see.",
      },
      { type: "h2", content: "Suggest a brand direction" },
      {
        type: "list",
        content: [
          "1. Open Themes → theme editor → Brand",
          "2. Confirm name, logo, and tagline fields Softunebd shows",
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
          "AI Suggest is assistive. Softunebd does not replace your brand guidelines — always verify readability before Publish.",
      },
    ],
    "2 min read",
  ),

  "publishing-storefront": article(
    "publishing-storefront",
    "Use Softunebd Save for drafts and Publish for live — including the real 1–2 minute propagation note on the storefront.",
    [
      {
        type: "p",
        content:
          "Softunebd separates draft work from the live storefront. Save keeps editor changes as a local draft. Publish pushes them live. Softunebd surfaces a note that changes can take 1–2 minutes to appear on the live site.",
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
          "1. Click Save to store the draft in Softunebd",
          "2. Click Publish when you intend customers to see the changes",
          "3. Wait 1–2 minutes before judging the live storefront",
          "4. Open Softunebd hostname or custom domain in a private window",
          "5. Spot-check Home, a category, and a product page",
        ],
      },
      {
        type: "callout",
        content:
          "If something looks wrong after Publish, return to the editor, fix it, Save, and Publish again — Softunebd’s delay note applies each time.",
      },
      { type: "h2", content: "Getting Started completion" },
      {
        type: "p",
        content:
          "Publish your site is the final step on Softunebd’s 9-step Getting Started checklist. Completing it (with the other eight) removes the Setup section from the sidebar.",
      },
    ],
    "2 min read",
  ),

  // ── Payments & Courier ────────────────────────────────────────────────────
  "connecting-payment-gateways": article(
    "connecting-payment-gateways",
    "Connect Softunebd Payments — COD, manual bKash/Nagad, official bKash, Nagad, and SSLCommerz — and understand why Payments is included by default (not part of the 25 paid Add-Ons).",
    [
      {
        type: "p",
        content:
          "Menu → Payments is where Softunebd connects the ways customers pay. You can enable Cash on Delivery, manual wallet payments (bKash and Nagad: the shopper pays your number and submits a transaction ID), plus official bKash, Nagad, and SSLCommerz merchant accounts. Payments (with Courier) shows as Included by Default on the Add-Ons page — core infrastructure, not one of the 25 optional marketplace Add-Ons.",
      },
      { type: "h2", content: "Enable a payment method" },
      {
        type: "list",
        content: [
          "1. Open Menu → Payments",
          "2. Choose Cash on Delivery, Manual Payment, official bKash, Nagad, or SSLCommerz",
          "3. Enter the credentials Softunebd asks for (wallet number, or merchant keys for gateway connects)",
          "4. Save the method for the store",
          "5. Place a test checkout for COD or manual wallets, and confirm Softunebd records the order and any transaction ID correctly",
        ],
      },
      {
        type: "callout",
        content:
          "Softunebd does not offer Stripe or PayPal. Connect only the methods listed on Payments: COD, manual bKash/Nagad, official bKash, Nagad, and SSLCommerz.",
      },
      { type: "h2", content: "Included by Default vs Add-Ons catalog" },
      {
        type: "p",
        content:
          "On Add-Ons, Softunebd shows Payments and Courier as Included by Default. The 25-item catalog covers optional engagement, marketing, AI, and operations tools — not these core rails.",
      },
      { type: "h2", content: "Getting Started step" },
      {
        type: "p",
        content:
          "Connect a payment method is one of Softunebd’s nine Getting Started checklist items. Completing it advances the X/9 badge.",
      },
    ],
    "2 min read",
  ),

  "cash-on-delivery": article(
    "cash-on-delivery",
    "Enable Softunebd Cash on Delivery, train fulfillment on COD reality, and pair it with Fraud Protection for risky orders.",
    [
      {
        type: "p",
        content:
          "Cash on Delivery (COD) is a first-class Softunebd payment path for markets where buyers prefer to pay on delivery. Enable it from Payments alongside manual bKash/Nagad when you use wallet checkout.",
      },
      { type: "h2", content: "Enable COD" },
      {
        type: "list",
        content: [
          "1. Open Menu → Payments",
          "2. Find Cash on Delivery among Softunebd payment methods",
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
          "COD increases delivery risk. Softunebd’s Fraud Protection exists specifically for patterns Softunebd merchants see with COD-heavy catalogs.",
      },
    ],
    "2 min read",
  ),

  "connecting-courier-partners": article(
    "connecting-courier-partners",
    "Connect Softunebd Courier to Bangladesh delivery partners for order handoff — core (Included by Default), not a paid Add-On.",
    [
      {
        type: "p",
        content:
          "Menu → Couriers lists Softunebd’s Bangladesh courier partners on one screen. You can connect Steadfast, Pathao, RedX, and eCourier with your own merchant accounts today. Paperfly, Sundarban, Carrybee, SA Paribahan, and PandaGo appear on the same roster. Like Payments, Courier is Included by Default on the Add-Ons page — not one of the 25 optional Add-Ons.",
      },
      { type: "h2", content: "Connect a partner" },
      {
        type: "list",
        content: [
          "1. Open Menu → Couriers",
          "2. Choose a partner you can connect today — Steadfast, Pathao, RedX, or eCourier",
          "3. Enter the API credentials Softunebd requests",
          "4. Save and confirm Softunebd verifies and shows the partner as connected",
          "5. Keep order status in Softunebd in sync with how you fulfill outside the dashboard",
        ],
      },
      { type: "h2", content: "Day-to-day fulfillment" },
      {
        type: "list",
        content: [
          "Open the order in Orders",
          "Confirm address and phone",
          "Book or hand off with your connected courier using their tools or Softunebd’s handoff when available for that partner",
          "Update Softunebd order status honestly after the courier accepts the parcel",
        ],
      },
      {
        type: "callout",
        content:
          "Softunebd’s courier story is domestic Bangladesh logistics. Softunebd does not claim real-time public tracking or auto-booking for every partner on the roster.",
      },
      { type: "h2", content: "Getting Started step" },
      {
        type: "p",
        content:
          "Set up courier is one of the nine Getting Started checklist steps Softunebd tracks in the Setup sidebar section.",
      },
    ],
    "2 min read",
  ),

  "shipping-locations": article(
    "shipping-locations",
    "Define Softunebd shipping locations in Site Settings so checkout and courier coverage match where you actually deliver.",
    [
      {
        type: "p",
        content:
          "Site Settings → Shipping is where Softunebd stores shipping locations — the places your store serves. Keep this list aligned with Courier coverage and COD reality.",
      },
      { type: "h2", content: "Configure locations" },
      {
        type: "list",
        content: [
          "1. Open Settings → Site Settings",
          "2. Open the Shipping section",
          "3. Add locations you deliver to today",
          "4. Remove or disable areas you no longer cover",
          "5. Save Softunebd settings",
          "6. Place a test checkout for an in-coverage and out-of-coverage address if Softunebd enforces that boundary",
        ],
      },
      { type: "h2", content: "Keep Locations and Courier in sync" },
      {
        type: "p",
        content:
          "If Softunebd shows a city as shippable but your courier partner does not cover it, customers will order and you will fail delivery. Update shipping locations whenever you expand or shrink coverage.",
      },
    ],
    "2 min read",
  ),

  // ── Analytics & Reporting ─────────────────────────────────────────────────
  "reading-store-analytics": article(
    "reading-store-analytics",
    "Read Softunebd Analytics — sales trends, best sellers, category performance, and the date-range picker — then act on Orders.",
    [
      {
        type: "p",
        content:
          "Menu → Analytics summarizes store performance: sales trends, best sellers, and category performance, filtered by Softunebd’s date-range picker.",
      },
      { type: "h2", content: "Read a date range" },
      {
        type: "list",
        content: [
          "1. Open Menu → Analytics",
          "2. Set the date-range picker to the window you care about (today, last 7 days, custom)",
          "3. Review sales trends Softunebd charts for that range",
          "4. Check best sellers Softunebd lists",
          "5. Check category performance Softunebd shows",
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
          "Analytics reflects Softunebd order data. Always reconcile surprising numbers against Orders and payment/courier reality before restocking or discounting.",
      },
    ],
    "2 min read",
  ),

  "exporting-reports": article(
    "exporting-reports",
    "Use Softunebd’s Analytics export menu for CSV (Excel), PDF, or JSON — full multi-section export or a scoped table export.",
    [
      {
        type: "p",
        content:
          "Softunebd Analytics includes an export menu for CSV (Excel), PDF, and JSON. You can run a full multi-section export (summary, sales report, best sellers, category shares) or a scoped export from just one table.",
      },
      { type: "h2", content: "Full multi-section export" },
      {
        type: "list",
        content: [
          "1. Open Analytics and set the date range",
          "2. Open Softunebd’s export menu",
          "3. Choose CSV, PDF, or JSON",
          "4. Select the full export Softunebd offers (summary + sales + best sellers + category shares)",
          "5. Download and archive or share with accounting",
        ],
      },
      { type: "h2", content: "Scoped single-table export" },
      {
        type: "list",
        content: [
          "1. Focus Softunebd Analytics on the table you need (for example best sellers)",
          "2. Use the scoped export Softunebd exposes for that table",
          "3. Choose format (CSV / PDF / JSON) Softunebd allows for that scope",
          "4. Download and verify row counts match what you saw on screen",
        ],
      },
      {
        type: "callout",
        content:
          "Exports honor the date range and filters you selected. Softunebd will not silently expand the window — check the picker before downloading.",
      },
    ],
    "2 min read",
  ),

  "fraud-protection-rules": article(
    "fraud-protection-rules",
    "Configure Softunebd Fraud Protection rule-based flagging, then review held orders before courier handoff.",
    [
      {
        type: "p",
        content:
          "Settings → Fraud Protection combines rule-based flagging with a manual blocklist. Softunebd evaluates configurable rules on the current order — for example holding first-time high-value checkouts or flagging burst orders from one phone.",
      },
      { type: "h2", content: "Enable and tune rules" },
      {
        type: "list",
        content: [
          "1. Open Settings → Fraud Protection",
          "2. Review Softunebd’s available rules",
          "3. Enable only rules that match your COD risk tolerance",
          "4. Set thresholds Softunebd exposes (order value, time window, etc.)",
          "5. Save",
          "6. Place a test order that should trigger a rule and confirm Softunebd flags or holds it",
        ],
      },
      { type: "h2", content: "Operational follow-up" },
      {
        type: "list",
        content: [
          "Review flagged orders in Orders before booking a courier",
          "Call or message the customer when Softunebd holds a high-value first order",
          "Escalate repeat abusers to the phone blocklist",
        ],
      },
      {
        type: "callout",
        content:
          "Fraud rules protect margin on COD. Softunebd still expects human judgment before you refuse a legitimate buyer.",
      },
    ],
    "2 min read",
  ),

  "managing-phone-blocklist": article(
    "managing-phone-blocklist",
    "Maintain Softunebd’s manual Fraud Protection phone blocklist with notes — add after confirmed abuse, remove mistakes quickly.",
    [
      {
        type: "p",
        content:
          "Softunebd’s Fraud Protection blocklist rejects checkouts from phone numbers you mark as abusive. Softunebd supports notes so staff know why a number was blocked.",
      },
      { type: "h2", content: "Add a number" },
      {
        type: "list",
        content: [
          "1. Open Settings → Fraud Protection",
          "2. Open the blocklist Softunebd shows",
          "3. Add the phone number after confirmed abuse (not a single soft refusal)",
          "4. Write a short note for teammates",
          "5. Save and confirm Softunebd lists the entry",
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
          "Pair the blocklist with Softunebd’s rule-based flagging. Rules catch patterns; the blocklist stops known bad phones at the door.",
      },
    ],
    "2 min read",
  ),

  // ── Add-Ons ───────────────────────────────────────────────────────────────
  "browsing-addons-marketplace": article(
    "browsing-addons-marketplace",
    "Browse Softunebd’s Add-Ons page — 25 optional Add-Ons in four categories, plus Payments & Courier marked Included by Default.",
    [
      {
        type: "p",
        content:
          "Menu → Add-Ons is Softunebd’s native marketplace. Softunebd lists 25 optional Add-Ons across Customer Engagement, Marketing & Sales, AI Automation, and Operations & Insights. On the same page, Softunebd shows Payments and Courier as Included by Default because they are core — not part of the paid optional catalog.",
      },
      { type: "h2", content: "How to browse" },
      {
        type: "list",
        content: [
          "1. Open Menu → Add-Ons",
          "2. Note Payments and Courier under Included by Default",
          "3. Filter or scroll the four optional categories Softunebd shows",
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
          "Do not enable everything on day one. Softunebd’s marketplace is designed so you grow into Add-Ons as support load, catalog size, or team size demands them.",
      },
    ],
    "2 min read",
  ),

  "customer-engagement-addons": article(
    "customer-engagement-addons",
    "Enable Softunebd Customer Engagement Add-Ons — Live Chat through Size Guide — when shoppers need conversation and confidence.",
    [
      {
        type: "p",
        content:
          "Customer Engagement Add-Ons help shoppers talk to you and decide with confidence. Softunebd’s set: Live Chat, WhatsApp Alerts, SMS Updates, Product Reviews, Loyalty Points, Recently Viewed, Quick View, Product Enquiry, Product Compare, and Size Guide.",
      },
      { type: "h2", content: "Enable an engagement Add-On" },
      {
        type: "list",
        content: [
          "1. Open Menu → Add-Ons",
          "2. Filter to Customer Engagement",
          "3. Open the Add-On (for example Live Chat or WhatsApp Alerts)",
          "4. Enable it for the store",
          "5. Complete any Softunebd configuration fields that Add-On requires",
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
    "Turn on Softunebd Marketing & Sales Add-Ons — Discount Codes, referrals, wholesale tiers, and related growth tools.",
    [
      {
        type: "p",
        content:
          "Marketing & Sales Add-Ons plug into Softunebd catalog and checkout flows: Discount Codes, Email Marketing, Referral Program, Purchase Notification, Wholesale Pricing, Frequently Bought, and Review Reminder.",
      },
      { type: "h2", content: "Campaign-ready path" },
      {
        type: "list",
        content: [
          "1. Open Add-Ons → Marketing & Sales",
          "2. Enable Discount Codes before your first promo",
          "3. Configure Softunebd’s discount fields Softunebd shows for that Add-On",
          "4. Test a checkout with a valid and invalid code",
          "5. Add Review Reminder after you have reliable delivery completion",
          "6. Enable Wholesale Pricing only if you truly sell in bulk tiers",
        ],
      },
      { type: "h2", content: "Merchandising helpers" },
      {
        type: "p",
        content:
          "Frequently Bought and Purchase Notification support conversion on product pages. Enable them when Softunebd’s catalog is large enough that cross-sells and social proof help — not before you have traffic to observe.",
      },
    ],
    "2 min read",
  ),

  "ai-operations-addons": article(
    "ai-operations-addons",
    "Use Softunebd AI Automation and Operations & Insights Add-Ons — from AI Chatbot to Staff Roles, Stock Alerts, and Product Badges.",
    [
      {
        type: "p",
        content:
          "Softunebd splits back-office power into AI Automation (AI Chatbot, AI Auto-Reply, AI Ad Copy, AI Forecasting) and Operations & Insights (Staff Roles, Stock Alerts, Spam Prevention, Catalog Export, Product Badges).",
      },
      { type: "h2", content: "AI Automation" },
      {
        type: "list",
        content: [
          "1. Open Add-Ons → AI Automation",
          "2. Enable AI Chatbot if storefront FAQs dominate support time",
          "3. Enable AI Auto-Reply if inbox volume is high",
          "4. Use AI Ad Copy when you need short campaign text drafts",
          "5. Use AI Forecasting when you have enough Softunebd sales history to plan stock",
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
          "Payments and Courier remain Included by Default on this page. Softunebd’s 25 optional Add-Ons never replace those core Menu items.",
      },
    ],
  ),
};

export const DOC_ARTICLES_BN: Record<string, DocArticleContent> = {
  "intro-to-softune": {
    slug: "intro-to-softune",
    title: "Softunebd পরিচিতি ও ড্যাশবোর্ড ওভারভিউ",
    category: "শুরু করুন",
    categoryIcon: DOC_ICON_PATHS.book,
    desc: "Softunebd ড্যাশবোর্ডের সাইডবার গঠন, সেটআপ চেকলিস্ট এবং প্রতিটি স্টোরের ডাটাবেজ সুরক্ষার বিস্তারিত নির্দেশিকা।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "Softunebd কী (এবং কী নয়)",
      "সাইডবার যেভাবে সাজানো",
      "Getting Started",
      "Menu (প্রধান মেনু)",
      "Settings (সেটিংস)",
      "Take a Tour (লাইভ ট্যুর)",
      "প্রথম সপ্তাহের কাজের পরিকল্পনা",
    ],
    body: [
      {
        type: "p",
        content:
          "Softunebd হলো স্বাধীন মার্চেন্ট ও উদ্যোক্তাদের জন্য একটি পাওয়ারফুল অল-ইন-ওয়ান ই-কমার্স প্ল্যাটফর্ম। এখানে আপনার নিজস্ব কাস্টম স্টোর, লাইভ স্টোরফ্রন্ট এবং একটি সুবিন্যস্ত কেন্দ্রীয় ড্যাশবোর্ড থাকে — যেখানে ক্যাটালগ, অর্ডার, থিম, পেমেন্ট, কুরিয়ার, অ্যানালিটিক্স, ফ্রড প্রোটেকশন ও অ্যাড-অনস সব এক জায়গা থেকেই পরিচালনা করা যায়।",
      },
      { type: "h2", content: "Softunebd কী (এবং কী নয়)" },
      {
        type: "p",
        content:
          "Softunebd আপনার নিজস্ব ব্র্যান্ডেড স্টোরফ্রন্টের মূল অবকাঠামো প্রদান করে। ক্রেতার সাথে সরাসরি যোগাযোগ ও সম্পর্ক সম্পূর্ণ আপনার নিয়ন্ত্রণে থাকবে। Softunebd কোনো থার্ড-পার্টি মার্কেটপ্লেস নয় যেখানে অন্য বিক্রেতাদের প্রোডাক্টের সাথে আপনার প্রোডাক্ট বিক্রি করতে হয়।",
      },
      {
        type: "callout",
        content:
          "ডেটার সম্পূর্ণ নিরাপত্তা: আপনার প্রোডাক্ট, অর্ডার, কাস্টমার তালিকা ও সেটিংস কেবল আপনার স্টোরের ড্যাশবোর্ডে সুরক্ষিত থাকবে। অন্য কোনো মার্চেন্ট আপনার ডেটা দেখতে পাবে না।",
      },
      { type: "h2", content: "সাইডবার যেভাবে সাজানো" },
      {
        type: "p",
        content:
          "বাম পাশের নেভিগেশন সাইডবারটি মূলত ৩টি মূল অংশে বিভক্ত — Getting Started (সেটআপ), Menu (দৈনন্দিন কাজ) এবং Settings (কনফিগারেশন)।",
      },
      { type: "h3", content: "Getting Started (সেটআপ)" },
      {
        type: "p",
        content:
          "নতুন স্টোর সেটআপ চলাকালীন সাইডবারের শীর্ষে Getting Started সেকশনে ৯টি গুরুত্বপূর্ণ ধাপের চেকলিস্ট ও প্রোগ্রেস বার দেখা যায়। সব ধাপ শেষ হওয়ার পর এটি নিজে থেকেই হাইড হয়ে যায়।",
      },
      { type: "h3", content: "Menu (প্রধান মেনু)" },
      {
        type: "list",
        content: [
          "Dashboard — বিক্রয়, অর্ডার ও পারফরম্যান্সের রিয়েল-টাইম ওভারভিউ",
          "Categories — সহজে ব্রাউজিংয়ের জন্য প্রোডাক্ট ক্যাটাগরি সাজানো",
          "Products — ক্যাটালগ, ভ্যারিয়েন্ট, দাম, স্টক ও মিডিয়া ফাইলস",
          "Orders — অর্ডারের স্ট্যাটাস ট্র্যাকিং, প্রোসেসিং ও প্রিন্ট ইনভয়েস",
          "Analytics — দৈনিক বিক্রয়, ভিজিটর ও নিট প্রফিট অ্যানালিটিক্স",
          "Themes — থিম নির্বাচন ও লাইভ এডিটর দিয়ে স্টোর কাস্টমাইজেশন",
          "Customers — ক্রয়কারী কাস্টমারদের ইতিহাস ও ফোন নম্বর তালিকা",
          "Courier — Steadfast, Pathao, RedX ও eCourier কানেকশন",
          "Payments — bKash, Nagad, COD ও SSLCommerz পেমেন্ট গেটওয়ে",
          "Add-Ons — সেলস ও মার্কেটিং বৃদ্ধির ২৪+ প্রয়োজনীয় টুলস",
        ],
      },
      { type: "h3", content: "Settings (সেটিংস)" },
      {
        type: "list",
        content: [
          "Site Settings — স্টোরের তথ্য, ডোমেইন, শিপিং চার্জ, FAQ ও লিগ্যাল পেজ",
          "Fraud Protection — ফেইক অর্ডার রোধে সিকিউরিটি রুলস ও ফোন নম্বর ব্লকক্লিপ",
          "Billing — আপনার অ্যাকাউন্ট প্ল্যান, মেম্বারশিপ ও ব্যবহার হিসাব",
          "Account — আপনার প্রোফাইল ও ব্যবসা পরিচয় সংক্রান্ত তথ্য",
          "Help Desk — সহায়তা ও সাপোর্ট গাইডলাইনসমূহ",
        ],
      },
      { type: "h2", content: "Take a Tour (লাইভ ট্যুর)" },
      {
        type: "p",
        content:
          "সাইডবারের একদম নিচে Take a Tour বাটনে ক্লিক করলে ড্যাশবোর্ডের একটি ইন্টারেক্টিভ স্পটলাইট ট্যুর চালু হবে। এটি ড্যাশবোর্ড ও থিম এডিটরের প্রতিটি টুল আপনাকে শিখিয়ে দেবে। আপনি চাইলে যেকোনো সময় এটি রিস্টার্ট বা স্কিপ করতে পারেন।",
      },
      { type: "h2", content: "প্রথম সপ্তাহের কাজের পরিকল্পনা" },
      {
        type: "list",
        content: [
          "১. Getting Started সেকশনে থাকা ৯টি ধাপ পর্যায়ক্রমে সম্পন্ন করুন",
          "২. Take a Tour চালিয়ে ড্যাশবোর্ডের মেনু ও সেটিংস পরিচিত হয়ে নিন",
          "৩. Account > Business Settings থেকে সঠিক ইনভয়েস তথ্য চেক করুন",
          "৪. প্রোডাক্ট, পেমেন্ট গেটওয়ে ও কুরিয়ার সেটআপ সম্পন্ন করে স্টোর লাইভ করুন",
        ],
      },
    ],
  },
  "account-setup-checklist": {
    slug: "account-setup-checklist",
    title: "অ্যাকাউন্ট সেটআপ চেকলিস্ট",
    category: "শুরু করুন",
    categoryIcon: DOC_ICON_PATHS.book,
    desc: "নতুন স্টোর খোলার পর প্রথম বিক্রি শুরু করার ৯টি আবশ্যিক ধাপ।",
    readTime: "পড়ার সময়: ৩ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "প্রথম ৯টি প্রয়োজনীয় পদক্ষেপ",
      "চেকলিস্ট সম্পূর্ণ করার পর",
      "দক্ষতার সাথে চেকলিস্ট সম্পূর্ণ করার উপায়",
      "যেকোনো সময় আলাদাভাবে কাজ করার সুযোগ",
    ],
    body: [
      {
        type: "p",
        content:
          "Softunebd-এ নতুন অ্যাকাউন্ট খোলার পর সাইডবারে ৯টি গুরুত্বপূর্ণ পদক্ষেপ সম্বলিত Getting Started চেকলিস্ট দেখা যায়। এটি কোনো সাধারণ ইমেইল নয়, বরং একটি নির্দেশিত সেটআপ ফ্লো যা আপনার স্টোরকে সম্পূর্ণ লাইভ করার জন্য প্রস্তুত করে।",
      },
      { type: "h2", content: "প্রথম ৯টি প্রয়োজনীয় পদক্ষেপ" },
      {
        type: "p",
        content:
          "নিচের ধাপগুলো পর্যায়ক্রমে সম্পন্ন করুন। কোনো ধাপ সম্পূর্ণ হওয়ার সাথে সাথে Softunebd তা স্বয়ংক্রিয়ভাবে টিক চিহ্ন দিয়ে মার্ক করে নেবে।",
      },
      {
        type: "list",
        content: [
          "১. প্রথম প্রোডাক্ট যোগ করা — Products থেকে বিক্রিযোগ্য প্রোডাক্ট যুক্ত করুন",
          "২. ক্যাটাগরি তৈরি — Categories সেকশনে অন্তত একটি ক্যাটাগরি বানান",
          "৩. লোগো ও বিজনেস ইনফো যোগ — Site Settings থেকে ব্র্যান্ডের লোগো ও তথ্য সেট করুন",
          "৪. পেমেন্ট মেথড কানেক্ট করা — Payments থেকে COD, bKash, Nagad বা SSLCommerz অন করুন",
          "৫. কুরিয়ার কানেকশন — Couriers থেকে Steadfast, Pathao বা RedX মার্চেন্ট যুক্ত করুন",
          "৬. প্রোডাক্ট মিডিয়া আপলোড — আকর্ষণীয় প্রোডাক্টের ছবি বা ভিডিও যুক্ত করুন",
          "৭. FAQ পেজ সাজানো — Site Settings থেকে ক্রেতাদের সাধারণ প্রশ্নের উত্তর লিখুন",
          "৮. লিগ্যাল পেজ সংযুক্ত করা — Privacy Policy ও Terms & Conditions যুক্ত করুন",
          "৯. স্টোর লাইভ ও পাবলিশ — Themes সেকশন থেকে স্টোরফ্রন্ট পাবলিশ করুন",
        ],
      },
      {
        type: "callout",
        content:
          "৯টি ধাপ সম্পন্ন হওয়ার সাথে সাথে প্রোগ্রেস বার ৯/৯ দেখাবে এবং সাইডবার থেকে Getting Started অপশনটি স্বয়ংক্রিয়ভাবে সরে যাবে, যাতে প্রতিদিনের কাজে পরিষ্কার মেনু দেখা যায়।",
      },
      { type: "h2", content: "দক্ষতার সাথে চেকলিস্ট সম্পূর্ণ করার উপায়" },
      {
        type: "list",
        content: [
          "১. সাইডবার থেকে Getting Started অপশনটিতে ক্লিক করুন",
          "২. অসম্পূর্ণ অপশনে ক্লিক করলে সরাসরি সংশ্লিষ্ট সেটিংস পেজে চলে যাবেন",
          "৩. সেই পেজে প্রয়োজনীয় ডেটা বা সেটিংস সেভ করে ফিরে আসুন",
          "৪. প্রোগ্রেস বার আপডেট হওয়া নিশ্চিত করুন এবং ৯/৯ হওয়া পর্যন্ত কাজ চালান",
        ],
      },
      { type: "h2", content: "যেকোনো সময় আলাদাভাবে কাজ করার সুযোগ" },
      {
        type: "p",
        content:
          "চেকলিস্ট চলাকালীনও আপনি Dashboard, Analytics, Fraud Protection বা Add-Ons সেকশনগুলোতে অবলীলায় ভিজিট করতে পারবেন। চেকলিস্ট কেবল আপনার প্রস্তুতি ট্র্যাকিং করে, কোনো পেজ লক করে রাখে না।",
      },
    ],
  },
  "dashboard-tour": {
    slug: "dashboard-tour",
    title: "ড্যাশবোর্ড পরিচিতি ও ট্যুর",
    category: "শুরু করুন",
    categoryIcon: DOC_ICON_PATHS.book,
    desc: "ড্যাশবোর্ডের প্রধান সামারি কার্ড, সেলস ট্রেন্ড গ্রাফ এবং কুইক নেভিগেশন সুবিধা।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "ড্যাশবোর্ড ট্যুর কীভাবে চালু করবেন",
      "ট্যুরে যা যা দেখানো হয়",
      "Dashboard Menu পরিচিতি",
      "Theme Editor এর ট্যুর",
      "কখন পুনরায় ট্যুর দেওয়া উচিত",
    ],
    body: [
      {
        type: "p",
        content:
          "Take a Tour হলো Softunebd ড্যাশবোর্ডের বিল্ট-ইন ইন্টারেক্টিভ গাইড। এটি একটি লাইভ স্পটলাইট ওভারলে ব্যবহার করে প্রতিটি বাটন ও নেভিগেশনের কাজ আপনাকে ভিজ্যুয়ালি বুঝিয়ে দেয়। Skip, Back ও Next বাটনের সাহায্যে যেকোনো গতিতে ট্যুরটি দেখা যায়।",
      },
      { type: "h2", content: "ড্যাশবোর্ড ট্যুর কীভাবে চালু করবেন" },
      {
        type: "list",
        content: [
          "১. আপনার Softunebd স্টোর ড্যাশবোর্ডে লগইন করুন",
          "২. বাম পাশের সাইডবারের সবার নিচে Take a Tour বাটনে ক্লিক করুন",
          "৩. স্ক্রিন হালকা অন্ধকার হয়ে একটি নির্দিষ্ট ফিচার হাইলাইট করবে",
          "৪. Next চেপে সামনে যান, Back চেপে পেছনে যান বা Skip দিয়ে বের হয়ে আসুন",
        ],
      },
      { type: "h2", content: "ট্যুরে যা যা দেখানো হয়" },
      { type: "h3", content: "Dashboard Menu পরিচিতি" },
      {
        type: "p",
        content:
          "ট্যুরটি Dashboard থেকে শুরু করে Categories, Products, Orders, Analytics, Themes, Customers, Courier, Payments এবং Add-Ons কোথায় অবস্থান করছে তা একটি একটি করে দেখায়।",
      },
      { type: "h3", content: "Theme Editor এর ট্যুর" },
      {
        type: "p",
        content:
          "ট্যুরটি সরাসরি Theme Editor-এ নিয়ে গিয়ে Brand, Colors, Header, Pages, Sections প্যানেল এবং লাইভ প্রিভিউ প্যানেল কীভাবে কাস্টমাইজ করতে হয় তা বুঝিয়ে দেয়।",
      },
      {
        type: "callout",
        content:
          "আপনি একবার ট্যুর শেষ করলে Softunebd আপনাকে বারবার নোটিফিকেশন দেবে না। তবে যেকোনো সময় সাইডবারের Take a Tour বাটন চেপে আবার রিভিশন দিতে পারবেন।",
      },
      { type: "h2", content: "কখন পুনরায় ট্যুর দেওয়া উচিত" },
      {
        type: "list",
        content: [
          "অনেক দিন পর ড্যাশবোর্ডে লগইন করলে",
          "নতুন কোনো স্টাফ বা টিম মেম্বারকে স্টোর সামলানোর জন্য ওরিয়েন্টেশন দেওয়ার সময়",
          "Softunebd-এ নতুন ফিচার যুক্ত হলে",
        ],
      },
    ],
  },
  "custom-domain": {
    slug: "custom-domain",
    title: "কাস্টম ডোমেইন কানেক্ট করার নিয়ম",
    category: "শুরু করুন",
    categoryIcon: DOC_ICON_PATHS.book,
    desc: "আপনার নিজস্ব ডোমেইন (যেমন brand.com) Softunebd স্টোরে লিঙ্ক করার বিস্তারিত নির্দেশিকা।",
    readTime: "পড়ার সময়: ৩ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "শুরু করার আগে প্রস্তুতি",
      "Softunebd-এ ডোমেইন যোগ করার ধাপ",
      "DNS রেকর্ডের সেটিংস",
      "লাইভ স্টোরফ্রন্টে যাচাইকরণ",
    ],
    body: [
      {
        type: "p",
        content:
          "Softunebd-এ একাউন্ট খুললে প্রথমে একটি ফ্রি সাবডোমেইন পান। তবে আপনার ব্যবসাকে ব্র্যান্ড হিসেবে দাঁড় করাতে কাস্টম ডোমেইন (যেমন yourbrand.com) যোগ করা অত্যন্ত জরুরি। Site Settings থেকে সহজেই আপনি নিজস্ব ডোমেইন সেটআপ করতে পারবেন।",
      },
      { type: "h2", content: "শুরু করার আগে প্রস্তুতি" },
      {
        type: "list",
        content: [
          "১. ক্রেতারা যে ডোমেইনে ব্রাউজ করবে তা সিদ্ধান্ত নিন (www বা রুট ডোমেইন)",
          "২. আপনার ডোমেইন প্রোভাইডারের (Namecheap, GoDaddy, Domain.com.bd ইত্যাদি) লগইন অ্যাক্সেস রাখুন",
          "৩. DNS প্রপাগেশন সম্পন্ন হওয়া পর্যন্ত বর্তমান সাবডোমেইন সচল রাখুন",
        ],
      },
      { type: "h2", content: "Softunebd-এ ডোমেইন যোগ করার ধাপ" },
      {
        type: "list",
        content: [
          "১. ড্যাশবোর্ড থেকে Settings > Site Settings অপশনে যান",
          "২. Custom Domain সেকশনে গিয়ে আপনার কেনা ডোমেইন নামটি টাইপ করুন",
          "৩. সেভ বাটনে ক্লিক করুন এবং Softunebd প্রদত্ত A Record ও CNAME তথ্যগুলো কপি করুন",
          "৪. আপনার ডোমেইন প্রোভাইডারের DNS Management এ গিয়ে উক্ত A Record (IP) ও CNAME যোগ করুন",
          "৫. Softunebd-এ ফিরে এসে Live DNS Status চেক করুন",
        ],
      },
      {
        type: "callout",
        content:
          "DNS আপডেট বিশ্বব্যাপী ছড়াতে কয়েক মিনিট থেকে ২৪ ঘণ্টা সময় লাগতে পারে। Status Connected না হওয়া পর্যন্ত মার্কেটিংয়ে নতুন লিংক শেয়ার করবেন না।",
      },
      { type: "h2", content: "লাইভ স্টোরফ্রন্টে যাচাইকরণ" },
      {
        type: "list",
        content: [
          "১. ব্রাউজারের Incognito Window খুলে আপনার কাস্টম ডোমেইনে প্রবেশ করুন",
          "২. প্যাডলক আইকন দেখে SSL (HTTPS) সচল আছে কিনা চেক করুন",
          "৩. আপনার ফেসবুক পেজ, ওয়াটসঅ্যাপ বায়ো ও ভিজিটিং কার্ডে নতুন ডোমেইন আপডেট করুন",
        ],
      },
    ],
  },
  "adding-editing-products": {
    slug: "adding-editing-products",
    title: "প্রোডাক্ট যোগ ও ক্যাটালগ এডিটিং",
    category: "স্টোর পরিচালনা",
    categoryIcon: DOC_ICON_PATHS.settings,
    desc: "প্রোডাক্টের শিরোনাম, ছবি, ভ্যারিয়েন্ট, ইনভেন্টরি ও AI ডেসক্রিপশন সেটআপ নির্দেশিকা।",
    readTime: "পড়ার সময়: ৩ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "নতুন প্রোডাক্ট তৈরির ধাপ",
      "ভ্যারিয়েন্ট ও কাস্টম লেবেল",
      "AI ডেসক্রিপশন (কনফার্মেশন সহ)",
      "ইনভেন্টরি ও প্রোডাক্ট ক্লিনআপ",
    ],
    body: [
      {
        type: "p",
        content:
          "Products সেকশন হলো আপনার সমস্ত ক্যাটালগের প্রাণকেন্দ্র। এখানে আপনি আনলিমিটেড প্রোডাক্ট যুক্ত করতে পারবেন, ভ্যারিয়েন্ট বা সাইজ সেট করতে পারবেন এবং গুগলের জেমিনি AI দিয়ে এক ক্লিকে ডেসক্রিপশন লিখতে পারবেন।",
      },
      { type: "h2", content: "নতুন প্রোডাক্ট তৈরির ধাপ" },
      {
        type: "list",
        content: [
          "১. Menu > Products অপশনে যান",
          "২. Add Product বাটনে ক্লিক করুন",
          "৩. প্রোডাক্টের আকর্ষণীয় নাম ও বিস্তারিত বিবরণ লিখুন",
          "৪. উচ্চমানের প্রোডাক্টের ছবি আপলোড করুন",
          "৫. নিয়মিত মূল্য (Regular Price) এবং ছাড়ের মূল্য (Sale Price) সেট করুন",
          "৬. ইনভেন্টরি স্টক সংখ্যা ইনপুট দিন",
          "৭. উপযুক্ত Category সিলেক্ট করুন এবং সেভ দিন",
        ],
      },
      { type: "h2", content: "ভ্যারিয়েন্ট ও কাস্টম লেবেল" },
      {
        type: "p",
        content:
          "প্রোডাক্টের বিভিন্ন সাইজ (S, M, L, XL), কালার (Red, Blue) বা উপাদান থাকলে কাস্টম ভ্যারিয়েন্ট তৈরি করুন। প্রতিটি ভ্যারিয়েন্টের জন্য আলাদা দাম ও স্টক নির্ধারণ করতে পারবেন।",
      },
      {
        type: "list",
        content: [
          "১. প্রোডাক্ট এডিটরে Variants সেকশন অন করুন",
          "২. আপনার পছন্দমতো অপশনের নাম (যেমন Size বা Weight) দিন",
          "৩. ভ্যালুগুলো কমা দিয়ে আলাদা করুন (যেমন Small, Medium, Large)",
          "৪. প্রতিটি ভ্যারিয়েন্টের নির্দিষ্ট স্টক ও মূল্য সেট করে সেভ দিন",
        ],
      },
      { type: "h2", content: "AI ডেসক্রিপশন (কনফার্মেশন সহ)" },
      {
        type: "list",
        content: [
          "১. প্রোডাক্টের শিরোনাম ও কিছু কি-ওয়ার্ড লিখুন",
          "২. Write with AI বাটনে ক্লিক করুন",
          "৩. জেমিনি AI ড্রাফট তৈরি করে আপনার সামনে দেখাবে",
          "৪. আপনি রিভিউ করার পর Confirm বাটনে চাপলেই কেবল তা সেভ হবে",
        ],
      },
      {
        type: "callout",
        content:
          "AI কখনো আপনার অনুমতি ছাড়া প্রোডাক্ট ডেসক্রিপশন পরিবর্তন করে সেভ করবে না। সবসময় রিভিউ করে অ্যাপ্রুভ করুন।",
      },
      { type: "h2", content: "ইনভেন্টরি ও প্রোডাক্ট ক্লিনআপ" },
      {
        type: "list",
        content: [
          "স্টক শেষ হলে ড্যাশবোর্ডে স্টক আপডেট করুন",
          "যে প্রোডাক্ট আর বিক্রি করবেন না তা আর্কাভ বা ডিলিট করুন যাতে স্টোর ক্যাটালগ পরিষ্কার থাকে",
        ],
      },
    ],
  },
  "organizing-categories": {
    slug: "organizing-categories",
    title: "ক্যাটাগরি গুছিয়ে সাজানো",
    category: "স্টোর পরিচালনা",
    categoryIcon: DOC_ICON_PATHS.settings,
    desc: "নেভিগেশন মেনু ও স্টোরফ্রন্ট ব্রাউজিংয়ের জন্য প্রোডাক্ট ক্যাটাগরি সাজানোর নিয়ম।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "নতুন ক্যাটাগরি তৈরির ধাপ",
      "প্রোডাক্ট যুক্ত করা",
      "Active vs Inactive স্ট্যাটাস",
    ],
    body: [
      {
        type: "p",
        content:
          "ক্যাটাগরি আপনার কাস্টমারদের সহজেই কাঙ্ক্ষিত প্রোডাক্ট খুঁজে পেতে সাহায্য করে। প্রতিটি ক্যাটাগরিতে ব্যানার ইমেজ ও অ্যাক্টিভ/ইনঅ্যাক্টিভ স্ট্যাটাস যুক্ত করার সুবিধা রয়েছে।",
      },
      { type: "h2", content: "নতুন ক্যাটাগরি তৈরির ধাপ" },
      {
        type: "list",
        content: [
          "১. Menu > Categories এ যান",
          "২. Create Category সিলেক্ট করুন",
          "৩. কাস্টমারদের বোধগম্য নাম দিন (যেমন: Men's Clothing, Electronics, Shoes)",
          "৪. ক্যাটাগরি থাম্বনেইল বা ব্যানার আপলোড করুন",
          "৫. স্ট্যাটাস Active রাখুন এবং সেভ করুন",
        ],
      },
      { type: "h2", content: "প্রোডাক্ট যুক্ত করা" },
      {
        type: "list",
        content: [
          "১. Products সেকশনে গিয়ে যেকোনো প্রোডাক্ট খুলুন",
          "২. Category ড্রপডাউন থেকে নির্দিষ্ট ক্যাটাগরি সিলেক্ট করুন",
          "৩. সেভ করুন এবং লাইভ স্টোরে ক্যাটাগরি ফিল্টারিং চেক করুন",
        ],
      },
      { type: "h3", content: "Active vs Inactive স্ট্যাটাস" },
      {
        type: "p",
        content:
          "উৎসবের স্পেশাল কালেকশন বা আপকামিং প্রোডাক্টের ক্যাটাগরি আগে থেকেই তৈরি করে ইনঅ্যাক্টিভ করে রাখতে পারেন। প্রস্তুতি শেষ হলে এক ক্লিকে অ্যাক্টিভ করে লাইভ করুন।",
      },
      {
        type: "callout",
        content:
          "Getting Started চেকলিস্টে 'Create a category' হলো অন্যতম একটি ধাপ। শুরুতেই ভালো ক্যাটাগরি কাঠামো তৈরি করলে স্টোর সাজানো সহজ হয়।",
      },
    ],
  },
  "managing-orders": {
    slug: "managing-orders",
    title: "অর্ডার প্রক্রিয়াকরণ ও শিপিং",
    category: "স্টোর পরিচালনা",
    categoryIcon: DOC_ICON_PATHS.settings,
    desc: "অর্ডারের স্ট্যাটাস আপডেট, মেমো প্রিন্ট ও কুরিয়ার বুকিং পরিচালনা।",
    readTime: "পড়ার সময়: ৩ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "নতুন অর্ডার রিভিউ করার উপায়",
      "অর্ডার স্ট্যাটাসের ধাপসমূহ",
      "ইমিউটেবল স্ল্যাপশটের গুরুত্ব",
      "অর্ডার ফিল্টার ও ইনভয়েস প্রিন্ট",
    ],
    body: [
      {
        type: "p",
        content:
          "Menu > Orders হলো আপনার প্রতিদিনের ইনভয়েস ও কাস্টমার শিপিং পরিচালনার মূল জায়গা। এখান থেকে অর্ডার কনফার্ম করা, অ্যাড্রেস চেক করা, মেমো প্রিন্ট এবং এক ক্লিকে কুরিয়ারে পার্সেল বুক করা যায়।",
      },
      { type: "h2", content: "নতুন অর্ডার রিভিউ করার উপায়" },
      {
        type: "list",
        content: [
          "১. Menu > Orders এ প্রবেশ করুন",
          "২. নতুন আসা Pending অর্ডারটিতে ক্লিক করে ডিটেইলস খুলুন",
          "৩. কাস্টমারের ফোন নম্বর, শিপিং ঠিকানা ও অর্ডারের আইটেমগুলো যাচাই করুন",
          "৪. কাস্টমারকে ফোন করে কনফার্ম করার পর স্ট্যাটাস Processing সেট করুন",
        ],
      },
      { type: "h2", content: "অর্ডার স্ট্যাটাসের ধাপসমূহ" },
      {
        type: "p",
        content:
          "অর্ডারকে পর্যায়ক্রমে Pending -> Processing -> Shipped -> Delivered স্ট্যাটাসে আপডেট করুন। ক্যান্সেল হলে Cancelled এবং রিটার্ন আসলে Returned স্ট্যাটাস সিলেক্ট করুন।",
      },
      { type: "h2", content: "ইমিউটেবল স্ল্যাপশটের গুরুত্ব" },
      {
        type: "p",
        content:
          "Softunebd প্রতিটি অর্ডারের সময় প্রোডাক্টের নাম, দাম ও ভ্যারিয়েন্টের একটি স্থায়ী 'স্ন্যাপশট' রেখে দেয়। ভবিষ্যতে আপনি প্রোডাক্টের দাম বা নাম পাল্টালেও পুরনো অর্ডারের মেমোতে গ্রাহকের কেনা আসল দামই প্রদর্শিত হবে।",
      },
      {
        type: "callout",
        content:
          "স্ন্যাপশট ডেটা কখনো পরিবর্তন হয় না। ফলে বিগত মাসগুলোর অ্যাকাউন্ট ও হিসাব নিখুঁত থাকে।",
      },
      { type: "h2", content: "অর্ডার ফিল্টার ও ইনভয়েস প্রিন্ট" },
      {
        type: "list",
        content: [
          "তারিখ, স্ট্যাটাস বা পেমেন্ট মেথড অনুযায়ী অর্ডার ফিল্টার করুন",
          "Print Invoice বাটনে ক্লিক করে এক ক্লিকে কাস্টমার মেমো প্যাকের সাথে যুক্ত করুন",
          "Steadfast, Pathao বা RedX কানেক্ট থাকলে সোজাসুজি Send to Courier বাটনে প্রেস করুন",
        ],
      },
    ],
  },
  "working-with-customers": {
    slug: "working-with-customers",
    title: "কাস্টমার ম্যানেজমেন্ট ও তথ্য",
    category: "স্টোর পরিচালনা",
    categoryIcon: DOC_ICON_PATHS.settings,
    desc: "ফোন নম্বর ম্যাচিংয়ের মাধ্যমে অটোমেটিক কাস্টমার হিস্ট্রি ও স্পেন্ড দেখার নির্দেশিকা।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "কাস্টমার খোঁজার পদ্ধতি",
      "সাপোর্ট ও ডেলিভারি নিশ্চিতকরণ",
      "রিপিট কাস্টমার ও মার্কেটিং",
    ],
    body: [
      {
        type: "p",
        content:
          "Menu > Customers তালিকায় আপনার স্টোর থেকে অর্ডার দেওয়া প্রতিটি কাস্টমারের নাম, ফোন নম্বর, মোট অর্ডারের সংখ্যা ও মোট কেনাকাটার পরিমাণ অটোমেটিক সংরক্ষিত থাকে।",
      },
      { type: "h2", content: "কাস্টমার খোঁজার পদ্ধতি" },
      {
        type: "list",
        content: [
          "১. Menu > Customers সেকশনে যান",
          "২. সার্চ বারে কাস্টমারের ফোন নম্বর বা নাম লিখুন",
          "৩. কাস্টমারের প্রোফাইল ওপেন করে তার পূর্বের সমস্ত অর্ডার হিস্ট্রি দেখুন",
        ],
      },
      { type: "h2", content: "সাপোর্ট ও ডেলিভারি নিশ্চিতকরণ" },
      {
        type: "list",
        content: [
          "বারবার অর্ডার দেওয়া বিশ্বস্ত কাস্টমারদের রিটার্ন কাস্টমার হিসেবে চিহ্নিত করুন",
          "কোনো কাস্টমার ফেইক অর্ডার দিলে তার নম্বর Fraud Protection ব্লকক্লিপে যুক্ত করুন",
        ],
      },
      {
        type: "callout",
        content:
          "কাস্টমার ডেটা অত্যন্ত সংবেদনশীল। এটি সম্পূর্ণ সুরক্ষিত থাকে এবং অন্য কোনো মার্চেন্ট আপনার কাস্টমার তালিকা দেখতে পারে না।",
      },
      { type: "h2", content: "রিপিট কাস্টমার ও মার্কেটিং" },
      {
        type: "p",
        content:
          "WhatsApp Alerts, SMS Updates বা Review Reminder এর মতো অ্যাড-অনগুলো চালু থাকলে এই কাস্টমার তালিকার মাধ্যমেই তাদের কাছে প্রোমোশন ও রিভিউ রিকোয়েস্ট পাঠানো সম্ভব হয়।",
      },
    ],
  },
  "choosing-a-theme": {
    slug: "choosing-a-theme",
    title: "Softunebd থিম নির্বাচন",
    category: "স্টোরফ্রন্ট ও থিম",
    categoryIcon: DOC_ICON_PATHS.paintbrush,
    desc: "Fashion, Emporium ও Vault থিমের মধ্যে আপনার ব্যবসার জন্য সঠিক থিম বেছে নিন।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "Softunebd-এর ৩টি রেডি থিম",
      "Fashion থিম",
      "Emporium থিম",
      "Vault থিম",
      "সঠিক থিম বেছে নেওয়ার উপায়",
    ],
    body: [
      {
        type: "p",
        content:
          "Softunebd-এ রয়েছে ৩টি বিশ্বমানের রেডিমেড থিম — Fashion, Emporium এবং Vault। প্রতিটি থিমই অত্যন্ত দ্রুতগতির, রেসপন্সিভ এবং যেকোনো ডিভাইসে দেখার উপযোগী।",
      },
      { type: "h2", content: "Softunebd-এর ৩টি রেডি থিম" },
      { type: "h3", content: "Fashion থিম" },
      {
        type: "p",
        content:
          "ক্লথিং, জুয়েলারি, শু ও ফ্যাশন মার্চেন্টদের জন্য বিশেষভাবে তৈরি। এতে রয়েছে বড় ও আকর্ষণীয় প্রোডাক্ট ব্যানার ও গ্যালারি ভিজ্যুয়াল।",
      },
      { type: "h3", content: "Emporium থিম" },
      {
        type: "p",
        content:
          "মাল্টি-ক্যাটাগরি, গ্যাজেট, কসমোটিক্স বা গ্রোসারি স্টোরের জন্য পারফেক্ট। যেখানে প্রচুর প্রোডাক্ট এক সাথে সুন্দর গ্রিডে প্রদর্শন করা যায়।",
      },
      { type: "h3", content: "Vault থিম" },
      {
        type: "p",
        content:
          "ডিজিটাল প্রোডাক্ট, কোর্স, সফটওয়্যার ও প্রিমিয়াম সিঙ্গেল-প্রোডাক্ট ব্র্যাণ্ডের জন্য তৈরি অতি আধুনিক লুক।",
      },
      { type: "h2", content: "সঠিক থিম বেছে নেওয়ার উপায়" },
      {
        type: "list",
        content: [
          "১. Menu > Themes অপশনে যান",
          "২. প্রতিটি থিমের Live Preview দেখে নিন",
          "৩. আপনার প্রোডাক্টের ধরনের সাথে যেটি সবচেয়ে মানানসই মনে হবে সেটি Activate করুন",
          "৪. থিম পরিবর্তন করলে আপনার কোনো প্রোডাক্ট বা অর্ডার মুছে যাবে না",
        ],
      },
      {
        type: "callout",
        content:
          "থিম বেছে নেওয়া মাত্রই প্রথম ধাপ। এরপর Theme Editor দিয়ে লোগো, কালার ও ফন্ট পরিবর্তন করে স্টোরকে নিজের মনমতো সাজিয়ে নিতে পারবেন।",
      },
    ],
  },
  "using-theme-editor": {
    slug: "using-theme-editor",
    title: "Theme Editor ব্যবহার করার নিয়ম",
    category: "স্টোরফ্রন্ট ও থিম",
    categoryIcon: DOC_ICON_PATHS.paintbrush,
    desc: "লাইভ প্রিভিউ দেখে লোগো, কালার, ফন্ট ও হোমপেজ সেকশন ড্র্যাগ-অ্যান্ড-ড্রপ করার উপায়।",
    readTime: "পড়ার সময়: ৩ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "Theme Editor ওপেন করার নিয়ম",
      "টুলস প্যানেলের বিভিন্ন অপশন",
      "Save vs Publish",
    ],
    body: [
      {
        type: "p",
        content:
          "Softunebd Theme Editor হলো একটি নো-কোড ভিজ্যুয়াল এডিটর। বাম পাশে কাস্টমাইজেশন প্যানেল এবং ডান পাশে ডেসক্টর, ট্যাবলেট ও মোবাইলের রিয়েল-টাইম লাইভ প্রিভিউ দেখে সহজে কাজ করা যায়।",
      },
      { type: "h2", content: "Theme Editor ওপেন করার নিয়ম" },
      {
        type: "list",
        content: [
          "১. Menu > Themes অপশনে প্রবেশ করুন",
          "২. Customize বাটনে ক্লিক করে এডিটর ইন্টারফেসে যান",
          "৩. উপরে ডেসক্টর/মোবাইল আইকন চেপে ভিউ চেঞ্জ করুন",
        ],
      },
      { type: "h2", content: "টুলস প্যানেলের বিভিন্ন অপশন" },
      { type: "h3", content: "Brand" },
      {
        type: "p",
        content:
          "লোগো, ফেভিকন, স্টোরের নাম, ট্যাগলাইন ও টাইপোগ্রাফি ফন্ট নির্বাচন করুন।",
      },
      { type: "h3", content: "Colors" },
      {
        type: "p",
        content:
          "আপনার ব্র্যাণ্ড প্রাইমারি কালার, বাটন কালার ও ব্যাকগ্রাউন্ড শেড কাস্টমাইজ করুন।",
      },
      { type: "h3", content: "Header & Footer" },
      {
        type: "p",
        content:
          "টপ অ্যানাউন্সমেন্ট বার, নেভিগেশন লিংক ও ফুটারের সোশ্যাল আইকন সাজান।",
      },
      { type: "h3", content: "Sections" },
      {
        type: "p",
        content:
          "হোমপেজের ব্যানার, হিরো স্লাইডার, ফিচারড ক্যাটাগরি, প্রোডাক্ট গ্রিড ও টেস্টোমেনিয়াল সেকশন ড্র্যাগ করে রি-অর্ডার বা নতুন সেকশন যোগ করুন।",
      },
      {
        type: "callout",
        content:
          "মোবাইল স্ক্রিনে এডিটর ব্যবহারের জন্য Edit ও Preview ট্যাব আলাদা করে সুন্দরভাবে সাজানো রয়েছে।",
      },
      { type: "h2", content: "Save vs Publish" },
      {
        type: "list",
        content: [
          "Save বাটনে চাপলে আপনার কাজ ড্রাফট হিসেবে সেভ থাকে",
          "Publish বাটনে চাপলে পরিবর্তনগুলো লাইভ স্টোরফ্রন্টে প্রকাশিত হয় (যা ১-২ মিনিট সময় নিতে পারে)",
        ],
      },
    ],
  },
  "brand-colors-ai-suggest": {
    slug: "brand-colors-ai-suggest",
    title: "AI Suggest দিয়ে ব্র্যান্ড কালার ও ফন্ট",
    category: "স্টোরফ্রন্ট ও থিম",
    categoryIcon: DOC_ICON_PATHS.paintbrush,
    desc: "Google Gemini AI-কে ব্র্যান্ড ভাইব বলে কালার প্লেট ও ফন্ট পেয়ারিং জেনারেট করার নিয়ম।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "ব্র্যান্ড ডিরেকশন জেনারেট করা",
      "কালার প্যালেট নির্বাচন",
      "রিভিউ ও পাবলিশ",
    ],
    body: [
      {
        type: "p",
        content:
          "আপনার কি কোনো ডিজাইনার নেই? চিন্তার কিছু নেই! Theme Editor-এ থাকা AI Suggest ফিচার ব্যবহার করে যেকোনো কাস্টম ব্র্যান্ডের কালার প্যালেট ও ফন্ট পেয়ারিং নিমেষেই জেনারেট করে নিতে পারেন।",
      },
      { type: "h2", content: "ব্র্যান্ড ডিরেকশন জেনারেট করা" },
      {
        type: "list",
        content: [
          "১. Theme Editor > Brand প্যানেলে যান",
          "২. AI Suggest বাটনে ক্লিক করুন",
          "৩. আপনার ব্র্যাণ্ডের ক্যাটাগরি বা ভাইব বলুন (যেমন: Luxe Fashion বা Organic Food)",
          "৪. AI প্রস্তাবিত ফন্ট ও ট্যাগলাইন প্রিভিউ দেখে পছন্দ হলে Apply করুন",
        ],
      },
      { type: "h2", content: "কালার প্যালেট নির্বাচন" },
      {
        type: "list",
        content: [
          "১. Theme Editor > Colors প্যানেলে যান",
          "২. AI Suggest বাটনে ট্যাপ করুন",
          "৩. বিভিন্ন কালার কম্বিনেশন লাইভ স্টোরে টেস্ট করে দেখুন",
          "৪. টেক্সট ও বাটনের কন্ট্রাস্ট স্পষ্ট বোঝা যাচ্ছে কিনা তা নিশ্চিত করুন",
        ],
      },
      {
        type: "callout",
        content:
          "AI Suggest আপনার সহায়তার জন্য তৈরি। স্টোরে পাবলিশ করার আগে সবসময় নিজের চোখে টেক্সট পড়ার সুবিধা যাচাই করে নিন।",
      },
    ],
  },
  "publishing-storefront": {
    slug: "publishing-storefront",
    title: "স্টোরফ্রন্ট লাইভ ও পাবলিশ করা",
    category: "স্টোরফ্রন্ট ও থিম",
    categoryIcon: DOC_ICON_PATHS.paintbrush,
    desc: "থিম কাস্টমাইজেশন রিভিউ শেষে স্টোরফ্রন্ট ক্রেতাদের জন্য উন্মুক্ত করা।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "পাবলিশ করার আগের চেকলিস্ট",
      "ড্রাফট সেভ ও পাবলিশের ধাপ",
      "পাবলিশ পরবর্তী যাচাই",
    ],
    body: [
      {
        type: "p",
        content:
          "আপনার স্টোরের এডিটিং ও কাস্টমাইজেশন শেষ হলে চূড়ান্তভাবে পাবলিশ করে গ্রাহকদের কেনাকাটার জন্য লাইভ করে দিন।",
      },
      { type: "h2", content: "পাবলিশ করার আগের চেকলিস্ট" },
      {
        type: "list",
        content: [
          "১. ডেসক্টর ও মোবাইল উভয়েই হোমপেজের ডিজাইন ও প্রোডাক্ট ছবি চেক করুন",
          "২. পেমেন্ট অপশন (COD বা bKash) সচল থাকা নিশ্চিত করুন",
          "৩. অন্তত ১টি টেস্ট প্রোডাক্ট ও শিপিং ফি সঠিকভাবে দেওয়া আছে কিনা দেখুন",
        ],
      },
      { type: "h2", content: "ড্রাফট সেভ ও পাবলিশের ধাপ" },
      {
        type: "list",
        content: [
          "১. Theme Editor-এর উপরে ডানপাশে Save Draft চাপুন",
          "২. সব কিছু ঠিক থাকলে Publish বাটনে প্রেস করুন",
          "৩. স্ক্রিনে প্রকাশিত নিশ্চিতকরণ বার্তা দেখুন",
        ],
      },
      {
        type: "callout",
        content:
          "পাবলিশ করার পর গ্লোবাল সিডিএন ও ক্যাশে আপডেটের জন্য লাইভ ওয়েবসাইটে পরিবর্তনগুলো পুরোপুরি দেখাতে ১ থেকে ২ মিনিট সময় লাগতে পারে।",
      },
      { type: "h2", content: "পাবলিশ পরবর্তী যাচাই" },
      {
        type: "p",
        content:
          "ব্রাউজারে নতুন একটি প্রাইভেট ট্যাব খুলে আপনার ডোমেইনে ঢুকে একটি পরীক্ষামূলক অর্ডারের ফ্লো চেক করে নিন।",
      },
    ],
  },
  "connecting-payment-gateways": {
    slug: "connecting-payment-gateways",
    title: "পেমেন্ট মেথড গেটওয়ে সেটআপ",
    category: "পেমেন্ট ও কুরিয়ার",
    categoryIcon: DOC_ICON_PATHS.payments,
    desc: "bKash, Nagad, SSLCommerz ও ম্যানুয়াল ওয়ালেট পেমেন্ট সেটআপ করার নিয়ম।",
    readTime: "পড়ার সময়: ৩ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "সমর্থিত পেমেন্ট গেটওয়েসমূহ",
      "পেমেন্ট মেথড চালুর নিয়ম",
      "Included by Default কি?",
    ],
    body: [
      {
        type: "p",
        content:
          "Menu > Payments সেকশনে বাংলাদেশের জনপ্রিয় সব পেমেন্ট অপশন একই সাথে কানেক্ট করার সুবিধা দেওয়া হয়েছে। কাস্টমাররা ক্যাশ অন ডেলিভারি, বিকাশ, নগদ কিংবা ক্রেডিট কার্ডের মাধ্যমে পেমেন্ট করতে পারবে।",
      },
      { type: "h2", content: "সমর্থিত পেমেন্ট গেটওয়েসমূহ" },
      {
        type: "list",
        content: [
          "Cash on Delivery (COD) — কাস্টমার পণ্য হাতে পেয়ে টাকা দেবে",
          "Manual Wallet (bKash/Nagad) — কাস্টমার আপনার মার্চেন্ট বা পার্সোনাল নম্বরে টাকা পাঠাবে এবং Transaction ID সাবমিট করবে",
          "Official bKash / Nagad Direct Merchant Integration — অটোমেটিক পেমেন্ট ভেরিফিকেশন",
          "SSLCommerz — মাস্টারকার্ড, ভিসা কার্ড, ইন্টারনেট ব্যাংকিং ও মোবাইল ওয়ালেট গেটওয়ে",
        ],
      },
      { type: "h2", content: "পেমেন্ট মেথড চালুর নিয়ম" },
      {
        type: "list",
        content: [
          "১. Menu > Payments এ প্রবেশ করুন",
          "২. যে মেথড চালু করতে চান তার পাশের Enable বাটনে ক্লিক করুন",
          "৩. বিকাশ/নগদ নম্বর বা SSLCommerz মার্চেন্ট ক্রেডেনশিয়াল দিন",
          "৪. সেভ করুন এবং চেকআউটে অপশনটি আসে কিনা চেক করুন",
        ],
      },
      {
        type: "callout",
        content:
          "Softunebd-এ পেমেন্ট ও কুরিয়ার অপশন একদম মূল প্ল্যাটফর্মের সাথে ফ্রী অন্তর্ভুক্ত (Included by Default)। এটি কোনো পেইড বা আলাদা ২৪টি অ্যাড-অনসের অংশ নয়।",
      },
    ],
  },
  "cash-on-delivery": {
    slug: "cash-on-delivery",
    title: "ক্যাশ অন ডেলিভারি (COD) নির্দেশিকা",
    category: "পেমেন্ট ও কুরিয়ার",
    categoryIcon: DOC_ICON_PATHS.payments,
    desc: "ক্যাশ অন ডেলিভারি অপশন অন করা এবং অপশনাল ডেলিভারি চার্জ সেট করার নিয়ম।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "COD চালু করার নিয়ম",
      "নিরাপদে COD ব্যবসা পরিচালনার উপায়",
    ],
    body: [
      {
        type: "p",
        content:
          "বাংলাদেশে অনলাইন কেনাকাটায় ক্যাশ অন ডেলিভারি (COD) সবচেয়ে জনপ্রিয় পেমেন্ট মাধ্যম। Softunebd-এ অতি সহজেই COD চালু রাখা যায়।",
      },
      { type: "h2", content: "COD চালু করার নিয়ম" },
      {
        type: "list",
        content: [
          "১. Menu > Payments এ যান",
          "২. Cash on Delivery সুইচটি Active করুন",
          "৩. প্রয়োজন অনুযায়ী অগ্রিম ডেলিভারি চার্জ সংক্রান্ত কোনো নোট থাকলে তা লিখে দিন",
          "৪. সেভ করুন",
        ],
      },
      { type: "h2", content: "নিরাপদে COD ব্যবসা পরিচালনার উপায়" },
      {
        type: "list",
        content: [
          "বড় টাকার নতুন অর্ডারের ক্ষেত্রে কাস্টমারকে ফোন দিয়ে নিশ্চিত হয়ে শিপিং করুন",
          "ফেইক অর্ডার রোধ করতে Fraud Protection থেকে ফোন ব্লকক্লিপ ও হাই-ভ্যালু রুলস ব্যবহার করুন",
        ],
      },
      {
        type: "callout",
        content:
          "COD অর্ডারে কাস্টমার পণ্য না নিলে রিটার্ন চার্জের ঝুঁকি থাকে। তাই ফ্রড প্রোটেকশন টুল ব্যবহার করা বুদ্ধিমানের কাজ।",
      },
    ],
  },
  "connecting-courier-partners": {
    slug: "connecting-courier-partners",
    title: "কুরিয়ার পার্টনার্স ইন্টিগ্রেশন",
    category: "পেমেন্ট ও কুরিয়ার",
    categoryIcon: DOC_ICON_PATHS.payments,
    desc: "Steadfast, Pathao, RedX ও eCourier মার্চেন্ট অ্যাকাউন্ট যুক্ত করার নিয়ম।",
    readTime: "পড়ার সময়: ৩ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "কানেক্টেড কুরিয়ার পার্টনারস",
      "কুরিয়ার এপিআই কানেক্ট করার নিয়ম",
      "এক ক্লিকে পার্সেল বুকিং",
    ],
    body: [
      {
        type: "p",
        content:
          "Menu > Couriers সেকশন থেকে বাংলাদেশের শীর্ষস্থানীয় ডেলিভারি কোম্পানিগুলোর মার্চেন্ট একাউন্ট ড্যাশবোর্ডে কানেক্ট করা যায়।",
      },
      { type: "h2", content: "কানেক্টেড কুরিয়ার পার্টনারস" },
      {
        type: "list",
        content: [
          "Steadfast Courier — এপিআই দিয়ে সরাসরি বুকিং",
          "Pathao Courier — মার্চেন্ট ক্রেডেনশিয়াল কানেক্টেড",
          "RedX Logistics — ইনভয়েস সঙ্ক্রান্ত অটো এন্ট্রি",
          "eCourier — সহজ শিপিং হোপ পার্টনার",
          "এছাড়াও লিস্টে থাকা Paperfly, Sundarban, Carrybee ও PandaGo তথ্য দেখা যায়",
        ],
      },
      { type: "h2", content: "কুরিয়ার এপিআই কানেক্ট করার নিয়ম" },
      {
        type: "list",
        content: [
          "১. Menu > Couriers অপশনে যান",
          "২. আপনার পছন্দমতো কুরিয়ারের (যেমন Steadfast) Connect বাটনে চাপুন",
          "৩. কুরিয়ার থেকে প্রাপ্ত API Key ও Secret Key ইনপুট দিন",
          "৪. সেভ দিন এবং ভেরিফায়েড কানেকশন নিশ্চিত করুন",
        ],
      },
      {
        type: "callout",
        content:
          "কুরিয়ার পার্টনারশিপ সম্পূর্ণ দেশীয় লজিস্টিকসের ওপর নির্ভরশীল। ডেলিভারি এন্ট্রি দিতে ম্যানুয়ালি আলাদা পোর্টালে টাইপ করার প্রয়োজন নেই।",
      },
      { type: "h2", content: "এক ক্লিকে পার্সেল বুকিং" },
      {
        type: "p",
        content:
          "অর্ডার পেজে গিয়ে কাস্টমারের অ্যাড্রেস দেখার পর সোজাসুজি Send to Courier এ চাপলেই পার্সেল আইডি তৈরি হয়ে যাবে।",
      },
    ],
  },
  "shipping-locations": {
    slug: "shipping-locations",
    title: "ডেলিভারি লোকেশন ও শিপিং চার্জ",
    category: "পেমেন্ট ও কুরিয়ার",
    categoryIcon: DOC_ICON_PATHS.payments,
    desc: "ঢাকার ভেতরে ও বাহিরে আলাদা আলাদা শিপিং চার্জ নির্ধারণ করার উপায়।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "শিপিং লোকেশন কনফিগারেশন",
      "কুরিয়ারের সাথে লোকেশন মেলানো",
    ],
    body: [
      {
        type: "p",
        content:
          "Site Settings > Shipping Locations থেকে আপনার কাস্টমারদের জন্য ডেলিভারি এলাকা ও রেট নির্ধারণ করা যায়।",
      },
      { type: "h2", content: "শিপিং লোকেশন কনফিগারেশন" },
      {
        type: "list",
        content: [
          "১. Site Settings > Shipping Locations এ যান",
          "২. 'Inside Dhaka' (যেমন ৮০ টাকা) এবং 'Outside Dhaka' (যেমন ১৫০ টাকা) রেট সেট করুন",
          "৩. কোনো এলাকায় ফ্রি ডেলিভারি দিতে চাইলে নির্দিষ্ট টাকার ওপরে বিনামূল্যে শিপিং রুল সেট করুন",
          "৪. সেভ করুন",
        ],
      },
      { type: "h2", content: "কুরিয়ারের সাথে লোকেশন মেলানো" },
      {
        type: "p",
        content:
          "আপনার কুরিয়ার যেসকল এলাকায় হোম ডেলিভারি দেয় না, কাস্টমারদের সুবিধার্থে সেই এলাকাগুলোর শিপিং চার্জ আগে থেকেই স্পষ্ট রাখুন।",
      },
    ],
  },
  "reading-store-analytics": {
    slug: "reading-store-analytics",
    title: "স্টোর অ্যানালিটিক্স রিপোর্ট দেখা",
    category: "অ্যানালিটিক্স ও রিপোর্ট",
    categoryIcon: DOC_ICON_PATHS.analytics,
    desc: "রেভিনিউ, ভিজিটর, কনভার্সন রেট ও নিট প্রফিট অ্যানালিটিক্স বিশ্লেষণ করার নিয়ম।",
    readTime: "পড়ার সময়: ৩ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "অ্যানালিটিক্স ড্যাশবোর্ড দেখা",
      "প্রধান রিপোর্ট মেট্রিকেলসমূহ",
      "সিদ্ধান্ত গ্রহণে অ্যানালিটিক্স",
    ],
    body: [
      {
        type: "p",
        content:
          "Menu > Analytics হলো আপনার ব্যবসার আসল পারফরম্যান্স দেখার সেরা জায়গা। এখান থেকে দৈনিক আয়, সবচেয়ে বেশি বিক্রি হওয়া প্রোডাক্ট এবং কাস্টমার কনভার্সন ট্র্যাকিং দেখা যায়।",
      },
      { type: "h2", content: "অ্যানালিটিক্স ড্যাশবোর্ড দেখা" },
      {
        type: "list",
        content: [
          "১. Menu > Analytics এ প্রবেশ করুন",
          "২. ডানে থাকা ডেট ফিল্টার থেকে আজকের, গত ৭ দিনের বা যেকোনো কাস্টম তারিখ নির্বাচন করুন",
          "৩. বিক্রয় গ্রাফ ও চার্টের ওঠানামা পর্যবেক্ষণ করুন",
        ],
      },
      { type: "h2", content: "প্রধান রিপোর্ট মেট্রিকেলসমূহ" },
      {
        type: "list",
        content: [
          "Total Sales — নির্দিষ্ট সময়ে মোট টাকার বিক্রি",
          "Total Orders — সফলভাবে সম্পন্ন ও পেন্ডিং অর্ডার সংখ্যা",
          "Top Selling Products — সবচেয়ে বেশি পছন্দের প্রোডাক্টের তালিকা",
          "Category Performance — কোন ক্যাটাগরি থেকে কেমন রেভিনিউ আসছে",
        ],
      },
      {
        type: "callout",
        content:
          "অ্যানালিটিক্সের তথ্য সরাসরি আসল অর্ডারের ওপর ভিত্তি করে তৈরি হয়। তাই হিসাব সবসময় নির্ভুল থাকে।",
      },
    ],
  },
  "exporting-reports": {
    slug: "exporting-reports",
    title: "সেলস ও ফাইনান্সিয়াল রিপোর্ট এক্সপোর্ট",
    category: "অ্যানালিটিক্স ও রিপোর্ট",
    categoryIcon: DOC_ICON_PATHS.analytics,
    desc: "অর্ডার ও কাস্টমার ডেটা CSV বা PDF আকারে ডাউনলোড করার নির্দেশিকা।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "ফুল মাল্টি-সেকশন এক্সপোর্ট",
      "নির্দিষ্ট টেবিল এক্সপোর্ট",
      "ডেটা ফিল্টারিং ও ব্যাকআপ",
    ],
    body: [
      {
        type: "p",
        content:
          "Softunebd Analytics থেকে আপনি ১-ক্লিকে সমস্ত হিসাব-নিকাশ CSV (Excel), PDF বা JSON ফাইল হিসেবে ডাউনলোড করতে পারবেন।",
      },
      { type: "h2", content: "ফুল মাল্টি-সেকশন এক্সপোর্ট" },
      {
        type: "p",
        content:
          "সামারি, সেলস রিপোর্ট, সেরা বিক্রীত প্রোডাক্ট ও ক্যাটাগরি শেয়ার সহ পুরো রিপোর্টের একটি কমপ্লিট ফাইল এক্সপোর্ট করার নিয়ম:",
      },
      {
        type: "list",
        content: [
          "১. Menu > Analytics-এ গিয়ে ডেট রেঞ্জ সিলেক্ট করুন",
          "২. Export বাটনে ক্লিক করে Full Report নির্বাচন করুন",
          "৩. ফরম্যাট হিসেবে CSV (Excel) বা PDF বেছে নিয়ে ডেসক্টোবে সেভ করুন",
          "৪. এই ফাইলটি আপনার হিসাবরক্ষক বা ট্যাক্স ফাইলিংয়ের জন্য ব্যবহার করতে পারেন",
        ],
      },
      { type: "h2", content: "নির্দিষ্ট টেবিল এক্সপোর্ট" },
      {
        type: "p",
        content:
          "যদি কেবল নির্দিষ্ট কোনো টেবিল (যেমন: শুধু বেস্ট সেলিং প্রোডাক্টের তালিকা) নামাতে চান, তবে ওই টেবিলের কোণায় থাকা Export Table বাটনে চাপুন।",
      },
      {
        type: "callout",
        content:
          "এক্সপোর্ট করা ফাইলের তথ্য আপনার ফিল্টার করা তারিখের সাথে হুবহু মিলে যাবে। ফাইল ডাউনলোড করার আগে সঠিক ডেট রেঞ্জ সিলেক্ট আছে কিনা তা নিশ্চিত করুন।",
      },
    ],
  },
  "fraud-protection-rules": {
    slug: "fraud-protection-rules",
    title: "ফ্রড প্রোটেকশন সিকিউরিটি রুলস",
    category: "অ্যানালিটিক্স ও রিপোর্ট",
    categoryIcon: DOC_ICON_PATHS.analytics,
    desc: "ফেইক COD অর্ডার আটকানোর রুলস অন-অফ করার নিয়ম।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "সিকিউরিটি রুলস সেটআপ",
      "হোল্ড হওয়া অর্ডার রিভিউ",
    ],
    body: [
      {
        type: "p",
        content:
          "Settings > Fraud Protection থেকে আপনি ক্ষতিকারক ফেইক ও ভুয়া অর্ডার প্রতিরোধে বিভিন্ন সিকিউরিটি রুলস চালু রাখতে পারেন।",
      },
      { type: "h2", content: "সিকিউরিটি রুলস সেটআপ" },
      {
        type: "list",
        content: [
          "১. Settings > Fraud Protection এ প্রবেশ করুন",
          "২. High-Value Order Hold রুল চালু করে টাকার সীমা (যেমন: ৫,০০০ টাকা) দিন",
          "৩. Burst Order Detection চালু করে নির্দিষ্ট সময়ে একই ফোন থেকে একাধিক অর্ডার আটকান",
          "৪. সেভ করুন",
        ],
      },
      { type: "h2", content: "হোল্ড হওয়া অর্ডার রিভিউ" },
      {
        type: "p",
        content:
          "রুলসের কারণে কোনো অর্ডার ফ্ল্যাগ হলে তা Orders পেজে সতর্কবার্তাসহ আটকে থাকবে। আপনি ফোন করে কাস্টমার আসল কিনা নিশ্চিত হয়ে অর্ডার প্রসেস করতে পারবেন।",
      },
      {
        type: "callout",
        content:
          "ফ্রড রুলস আপনার রিটার্ন পার্সেলজনিত লোকসান অর্ধেকেরও বেশি কমিয়ে আনে।",
      },
    ],
  },
  "managing-phone-blocklist": {
    slug: "managing-phone-blocklist",
    title: "ফোন নম্বর ব্লকক্লিপ পরিচালনা",
    category: "অ্যানালিটিক্স ও রিপোর্ট",
    categoryIcon: DOC_ICON_PATHS.analytics,
    desc: "ক্ষতিকর ফোন নম্বর ব্লকক্লিপে যোগ বা রিমুভ করার পদ্ধতি।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "ফোন নম্বর ব্লক করার উপায়",
      "ভুলবশত ব্লক রিমুভ করা",
    ],
    body: [
      {
        type: "p",
        content:
          "যদি কোনো কাস্টমার বারবার পণ্য অর্ডার করে পার্সেল রিসিভ না করে রিটার্ন পাঠায়, তবে তার ফোন নম্বরটি ব্লকক্লিপে ঢুকিয়ে রাখা যায়।",
      },
      { type: "h2", content: "ফোন নম্বর ব্লক করার উপায়" },
      {
        type: "list",
        content: [
          "১. Settings > Fraud Protection > Phone Blocklist এ যান",
          "২. Add Phone Number চাপুন এবং মোবাইল নম্বরটি দিন",
          "৩. সহকর্মীদের জানার জন্য ব্লকের কারণ সংক্ষেপে নোটে লিখুন",
          "৪. সেভ করুন। এরপর ওই ফোন নম্বর দিয়ে চেকআউটে চেষ্টা করলে অর্ডার সম্পূর্ণ হবে না",
        ],
      },
      { type: "h2", content: "ভুলবশত ব্লক রিমুভ করা" },
      {
        type: "p",
        content:
          "কোনো ভালো কাস্টমারের নম্বর ভুলবশত ব্লক হয়ে গেলে তালিকা থেকে সার্চ করে Unblock বাটনে ক্লিক করলেই তিনি আবার কেনাকাটা করতে পারবেন।",
      },
    ],
  },
  "browsing-addons-marketplace": {
    slug: "browsing-addons-marketplace",
    title: "অ্যাড-অনস মার্কেটপ্লেস ব্রাউজিং",
    category: "অ্যাড-অনস মার্কেটপ্লেস",
    categoryIcon: DOC_ICON_PATHS.addons,
    desc: "Softunebd-এর ২৬+ শক্তিশালী অ্যাড-অন ব্রাউজ ও এনাবল করার উপায়।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "মার্কেটপ্লেস ওভারভিউ",
      "৪টি প্রধান ক্যাটাগরি (২৪টি অ্যাড-অন)",
      "অ্যাড-অন চালু করার উপায়",
    ],
    body: [
      {
        type: "p",
        content:
          "Menu > Add-Ons সেকশনটি হলো আপনার স্টোরের কার্যক্ষমতা দ্বিগুণ করার জন্য একটি সমৃদ্ধ মার্কেটপ্লেস। এখানে বিভিন্ন কাজের জন্য ২৪টিরও বেশি কাজের প্লাগইন রয়েছে।",
      },
      { type: "h2", content: "মার্কেটপ্লেস ওভারভিউ" },
      {
        type: "p",
        content:
          "উল্লেখ্য যে, পেমেন্ট গেটওয়ে এবং কুরিয়ার পার্টনার্স সম্পূর্ণ ফ্রিতে প্ল্যাটফর্মে অন্তর্ভুক্ত (Included by Default)। বাকি ২৪টি টুলস নিচে উল্লেখিত ৪টি ক্যাটাগরিতে বিভক্ত:",
      },
      { type: "h2", content: "৪টি প্রধান ক্যাটাগরি (২৪টি অ্যাড-অন)" },
      {
        type: "list",
        content: [
          "Customer Engagement — Live Chat, WhatsApp Alerts, SMS Updates, Product Reviews, Loyalty Points, Quick View, Size Guide ইত্যাদি",
          "Marketing & Sales — Discount Codes, Email Marketing, Referral Program, Purchase Notification, Wholesale Pricing, Frequently Bought, Review Reminder",
          "AI Automation — AI Chatbot, AI Auto-Reply, AI Ad Copy, AI Forecasting",
          "Operations & Insights — Staff Roles, Stock Alerts, Spam Prevention, Catalog Export, Product Badges",
        ],
      },
      { type: "h2", content: "অ্যাড-অন চালু করার উপায়" },
      {
        type: "list",
        content: [
          "১. Menu > Add-Ons এ যান",
          "২. আপনার কাঙ্ক্ষিত প্লাগইনটিতে ক্লিক করুন",
          "৩. Enable সুইচ অন করুন এবং প্রয়োজনীয় সেটিংস সেভ করুন",
        ],
      },
      {
        type: "callout",
        content:
          "প্রথম দিনেই সব অ্যাড-অন চালু করার প্রয়োজন নেই। ব্যবসার প্রসারের সাথে সাথে প্রয়োজন অনুযায়ী একে একে চালু করুন।",
      },
    ],
  },
  "customer-engagement-addons": {
    slug: "customer-engagement-addons",
    title: "কাস্টমার এনগেজমেন্ট অ্যাড-অনস",
    category: "অ্যাড-অনস মার্কেটপ্লেস",
    categoryIcon: DOC_ICON_PATHS.addons,
    desc: "WhatsApp Chat, Live SMS ও কাস্টমার রিভিউ সম্পর্কিত অ্যাড-অনস।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "এনগেজমেন্ট প্লাগইনসমূহ",
      "চালু করার সঠিক পর্যায়",
    ],
    body: [
      {
        type: "p",
        content:
          "কাস্টমারদের সাথে সুসম্পর্ক গড়ে তুলতে এবং প্রোডাক্টের ওপর ভরসা বাড়াতে Customer Engagement অ্যাড-অনস ব্যবহার করুন।",
      },
      { type: "h2", content: "এনগেজমেন্ট প্লাগইনসমূহ" },
      {
        type: "list",
        content: [
          "WhatsApp Alerts — অর্ডার কনফার্মেশন ও ট্র্যাকিং মেসেজ সরাসরি কাস্টমারের ওয়াটসঅ্যাপে পাঠানো",
          "Live Chat — কাস্টমারের প্রশ্নের তাৎক্ষণিক উত্তর দিতে ওয়াটসঅ্যাপ বা চ্যাট বাটন",
          "Product Reviews — ক্রেতাদের রিভিউ ও রেটিং ছবিসহ প্রদর্শন করা",
          "Size Guide — কাপড়ের সঠিক সাইজ বেছে নেওয়ার সুবিধার্থে প্রোডাক্ট পেজে সাইজ চার্ট",
        ],
      },
      { type: "h2", content: "চালু করার সঠিক পর্যায়" },
      {
        type: "p",
        content:
          "শুরুতেই Live Chat ও WhatsApp অন করুন। কিছু সফল অর্ডারের পর কাস্টমারদের রিভিউ সংগ্রহ করতে Product Reviews প্লাগইন চালু করুন।",
      },
    ],
  },
  "marketing-sales-addons": {
    slug: "marketing-sales-addons",
    title: "মার্কেটিং ও সেলস বুস্টিং অ্যাড-অনস",
    category: "অ্যাড-অনস মার্কেটপ্লেস",
    categoryIcon: DOC_ICON_PATHS.addons,
    desc: "Countdown Timer, Sales Popups ও Promo Banners দিয়ে বিক্রি বাড়ানোর কৌশল।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "সেলস বুস্টিং টুলস",
      "ডিসকাউন্ট ও প্রোমোশন",
    ],
    body: [
      {
        type: "p",
        content:
          "আপনার স্টোরের সেলস ও কনভার্সন রেট দ্রুত বৃদ্ধি করতে Marketing & Sales অ্যাড-অনস ব্যবহার করুন।",
      },
      { type: "h2", content: "সেলস বুস্টিং টুলস" },
      {
        type: "list",
        content: [
          "Discount Codes — কুপন কোড (যেমন: EID20) তৈরি করে কাস্টমারদের ছাড় দেওয়ার ব্যবস্থা",
          "Purchase Notification — লাইভ কাস্টমাররা কে কি কিনছে তার পপ-আপ সোশ্যাল প্রুফ দেখানো",
          "Frequently Bought — একসাথে কয়েকটি প্রোডাক্ট কিনলে বিশেষ ছাড়ের অফার বানানো",
          "Review Reminder — ডেলিভারির পর স্বয়ংক্রিয়ভাবে রিভিউ চাওয়ার মেসেজ পাঠানো",
        ],
      },
      { type: "h2", content: "ডিসকাউন্ট ও প্রোমোশন" },
      {
        type: "p",
        content:
          "Add-Ons > Discount Codes সেকশন থেকে নির্দিষ্ট টাকার ওপর বা পার্সেন্টেজ ডিসকাউন্ট কুপন সহজেই চালু করতে পারবেন।",
      },
    ],
  },
  "ai-operations-addons": {
    slug: "ai-operations-addons",
    title: "AI অটোমেশন ও অপারেশনস অ্যাড-অনস",
    category: "অ্যাড-অনস মার্কেটপ্লেস",
    categoryIcon: DOC_ICON_PATHS.addons,
    desc: "AI প্রোডাক্ট কপি, থিম সাজেশন ও অটোমেশন সম্পর্কিত অ্যাড-অনস।",
    readTime: "পড়ার সময়: ২ মিনিট",
    updated: "আগস্ট ২০, ২০২৬",
    toc: [
      "AI অটোমেশন প্লাগইনস",
      "অপারেশনস ও টিম ম্যানেজমেন্ট",
    ],
    body: [
      {
        type: "p",
        content:
          "ব্যবসার দৈনন্দিন ব্যাক-অফিস অপারেশন সহজ করতে AI Automation এবং Operations & Insights অ্যাড-অনস অত্যন্ত কার্যকরী।",
      },
      { type: "h2", content: "AI অটোমেশন প্লাগইনস" },
      {
        type: "list",
        content: [
          "AI Chatbot — গুগলের জেমিনি AI কাস্টমারদের প্রশ্নের উত্তর স্বয়ংক্রিয়ভাবে দেবে",
          "AI Auto-Reply — ইনবক্সের মেসেজের স্মার্ট ও দ্রুত উত্তর ড্রাফট করবে",
          "AI Ad Copy — ফেসবুক ও গুগলের অ্যাড ক্যাম্পেইনের জন্য আকর্ষণীয় টেক্সট জেনারেট করবে",
        ],
      },
      { type: "h2", content: "অপারেশনস ও টিম ম্যানেজমেন্ট" },
      {
        type: "list",
        content: [
          "Staff Roles — টিমের কর্মচারীদের জন্য ড্যাশবোর্ডে নির্দিষ্ট পারমিশন দিয়ে রোল সেট করা",
          "Stock Alerts — স্টক কমলেই ইমেইল বা ড্যাশবোর্ড নোটিফিকেশন পাওয়া",
          "Product Badges — প্রোডাক্টের ওপর New, Bestseller বা Hot সেলস ব্যাজ যুক্ত করা",
        ],
      },
      {
        type: "callout",
        content:
          "AI টুলসগুলো সবসময় আপনার আদেশের অধীনে কাজ করে — কোনো সিদ্ধান্ত কনফার্ম করার আগে তা আপনার সামনে প্রদর্শিত হয়।",
      },
    ],
  },
};

/** Resolve article content or return undefined for unknown slugs. */
export function getDocArticle(slug: string, locale: "en" | "bn" = "en"): DocArticleContent | undefined {
  if (locale === "bn") {
    return DOC_ARTICLES_BN[slug] || DOC_ARTICLES[slug];
  }
  return DOC_ARTICLES[slug];
}

/** All known article slugs (useful for static generation if added later). */
export function getAllDocSlugs(): string[] {
  return Object.keys(DOC_ARTICLES);
}

