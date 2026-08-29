import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, DM_Sans, Outfit, Niconne, Noto_Sans_Bengali } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { StructuredData } from "@/components/structured-data";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "700", "800", "900"],
});

const niconne = Niconne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-niconne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

// Manrope has no Bengali glyphs — this is a per-glyph CSS fallback (see
// globals.css's --font-sans), same idea as the dashboard's own Bangla
// support: Latin text stays in Manrope untouched, only Bangla characters
// (blog posts) fall through to this. Noto Sans Bengali is Google's actual
// public font for Bengali script, same font family Bazaar/the dashboard
// already use for this exact purpose.
const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bn",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  // Base every page's relative canonical/OG url (see lib/seo.ts) resolves
  // against — without this, Next can't turn "/pricing" into a real absolute
  // URL for the <link rel="canonical"> and og:url tags.
  metadataBase: new URL(SITE_URL),
  // Fallback only — every real route overrides this via lib/seo.ts's
  // pageSeo(). Kept as a sane default for any page that doesn't.
  title: "Softune — Launch beautiful stores that sell",
  description:
    "Multi-tenant ecommerce SaaS for agencies and merchants. Themes, products, orders, and AI — one platform to build, publish, and grow storefronts.",
  // Bare /favicon.ico comes from app/favicon.ico (file convention, immune to
  // metadataBase). The rest of the real favicon set (from public/favicon/)
  // is wired explicitly here for the sizes/devices the file convention
  // alone doesn't cover — browsers picking a sharper 32x32 over the .ico,
  // iOS home-screen bookmarks, and Android/PWA "Add to Home Screen".
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

// Browser chrome color (mobile Safari/Chrome address bar, PWA splash) —
// separate from `metadata` since Next 14+ moved viewport-related tags out
// of the Metadata type into their own export.
export const viewport: Viewport = {
  themeColor: "#ff5a36",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${instrument.variable} ${dmSans.variable} ${outfit.variable} ${niconne.variable} ${notoSansBengali.variable}`}
    >
      <body className="min-h-screen antialiased bg-[var(--color-canvas)] text-[var(--color-ink)] transition-colors duration-200">
        {/* Sitewide entity schema — every page carries these two so an AI
            crawler or answer engine landing on ANY page (not just "/")
            still knows what Softune is. Page-specific schema (Article,
            FAQPage, BreadcrumbList, pricing Offers) lives in each route's
            own page.tsx. */}
        <StructuredData data={organizationSchema()} />
        <StructuredData data={websiteSchema()} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
