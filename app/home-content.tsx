import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { LogoCloud } from "@/components/logo-cloud";
import { Why } from "@/components/why";
import { Features } from "@/components/features";
import { Themes } from "@/components/themes";
import { Technologies } from "@/components/technologies";
import { PlatformFeatures } from "@/components/platform-features";
import { AddonsShowcase } from "@/components/addons-showcase";
import { Testimonial } from "@/components/testimonial";
import { Pricing } from "@/components/pricing";
import { Comparison } from "@/components/comparison";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

/**
 * Softune marketing homepage — structure inspired by clean SaaS landings
 * (e.g. taito.ai): minimal chrome, editorial type, soft motion, product-first
 * sections. Brand + copy are Softune only.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoCloud />
        <Why />
        <Themes />
        <PlatformFeatures />
        <Features />
        <AddonsShowcase />
        <Technologies />
        <Pricing />
        <Comparison />
        <Testimonial />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
