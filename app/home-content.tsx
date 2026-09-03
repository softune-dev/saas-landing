import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Why } from "@/components/why";
import { Features } from "@/components/features";
import { Themes } from "@/components/themes";
import { Technologies } from "@/components/technologies";
import { PlatformFeatures } from "@/components/platform-features";
import { AddonsShowcase } from "@/components/addons-showcase";
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
        <Themes locale={locale} />
        <PlatformFeatures locale={locale} />
        <Features locale={locale} />
        <AddonsShowcase locale={locale} />
        <Technologies locale={locale} />
        <Pricing locale={locale} />
        <Comparison locale={locale} />
        <Faq locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
