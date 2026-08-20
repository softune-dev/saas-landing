import type { Metadata } from "next";
import { Instrument_Serif, Manrope, DM_Sans, Outfit, Niconne } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
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

export const metadata: Metadata = {
  title: "Softune — Launch beautiful stores that sell",
  description:
    "Multi-tenant ecommerce SaaS for agencies and merchants. Themes, products, orders, and AI — one platform to build, publish, and grow storefronts.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${instrument.variable} ${dmSans.variable} ${outfit.variable} ${niconne.variable}`}
    >
      <body className="min-h-screen antialiased bg-[var(--color-canvas)] text-[var(--color-ink)] transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
