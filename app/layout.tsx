import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Instrument_Serif, Manrope, DM_Sans, Plus_Jakarta_Sans, Niconne, Noto_Sans_Bengali } from "next/font/google";
import { Analytics, AnalyticsNoscript } from "@/components/analytics";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TawkWidget } from "@/components/tawk-widget";
import { StructuredData } from "@/components/structured-data";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { DEFAULT_TITLE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["700", "800"],
  display: "swap",
});

const niconne = Niconne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-niconne",
  display: "swap",
  preload: false,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
  preload: false,
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
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  // Base every page's relative canonical/OG url (see lib/seo.ts) resolves
  // against — without this, Next can't turn "/pricing" into a real absolute
  // URL for the <link rel="canonical"> and og:url tags.
  metadataBase: new URL(SITE_URL),
  // Fallback only — every real route overrides this via lib/seo.ts's
  // pageSeo(). Kept as a sane default for any page that doesn't.
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "ecommerce software",
  authors: [{ name: "Kamrul Hasan", url: "https://kamrulhasan.site" }],
  creator: "Kamrul Hasan",
  publisher: SITE_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  other: {
    "geo.region": "BD",
    "geo.placename": "Bangladesh",
  },
};

// Browser chrome color (mobile Safari/Chrome address bar, PWA splash) —
// separate from `metadata` since Next 14+ moved viewport-related tags out
// of the Metadata type into their own export.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ff5a36" },
    { media: "(prefers-color-scheme: dark)", color: "#181a1b" },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headerList = await headers();
  const lang = headerList.get("x-locale") || "en";

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${manrope.variable} ${instrument.variable} ${dmSans.variable} ${plusJakarta.variable} ${niconne.variable} ${notoSansBengali.variable}`}
    >
      <head>
        <link rel="describedby" href="/llms.txt" />
        <link
          rel="preload"
          as="image"
          href="/dashboard-d-mobile.webp"
          type="image/webp"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="image"
          href="/dashboard-d.webp"
          type="image/webp"
          media="(min-width: 768px)"
        />
        <Analytics />
      </head>
      <body className="min-h-screen antialiased bg-[var(--color-canvas)] text-[var(--color-ink)] transition-colors duration-200">
        <AnalyticsNoscript />
        {/* Sitewide entity schema — every page carries these two so an AI
            crawler or answer engine landing on ANY page (not just "/")
            still knows what Softunebd is. Page-specific schema (Article,
            FAQPage, BreadcrumbList, pricing Offers) lives in each route's
            own page.tsx. */}
        <StructuredData data={organizationSchema()} />
        <StructuredData data={websiteSchema()} />
        <ThemeProvider>{children}</ThemeProvider>
        <TawkWidget />
      </body>
    </html>
  );
}
