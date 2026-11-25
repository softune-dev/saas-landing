import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Why } from "@/components/why";
import { LiveStores } from "@/components/live-stores";
import { FeatureBento } from "@/components/bento/feature-bento";
import { AddonsShowcase } from "@/components/addons-showcase";
import { AppsShowcase } from "@/components/apps-showcase";
import { Pricing } from "@/components/pricing";
import { Comparison } from "@/components/comparison";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function HomePage({ locale = "en" }: { locale?: "en" | "bn" }) {
  return (
    <>
      <Header locale={locale} />
      <main>
        <Hero locale={locale} />
        <Why locale={locale} />
        {/* Themes section hidden for now; component kept in components/themes.tsx. */}
        {/* <Themes locale={locale} /> */}
        <LiveStores locale={locale} />
        <AppsShowcase locale={locale} />
        <FeatureBento locale={locale} />
        <AddonsShowcase locale={locale} />
        <Pricing locale={locale} homepage />
        <Comparison locale={locale} />
        <Faq locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
