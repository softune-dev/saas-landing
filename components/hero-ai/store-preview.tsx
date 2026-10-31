"use client";

import { StoreDesktop } from "./store-desktop";
import { StoreMobile } from "./store-mobile";
import type { Locale } from "./store-data";
import type { Scenario } from "./scenarios";

/** The live canvas: the demo store drawn in code, laid out for desktop from md
 * up and for a phone below it (each in its own container-units space). */
export function StorePreview({ scenario, sent, done, locale }: { scenario: Scenario; sent: boolean; done: number; locale: Locale }) {
  return (
    <>
      <div className="@container absolute inset-0 hidden md:block">
        <StoreDesktop scenario={scenario} sent={sent} done={done} locale={locale} />
      </div>
      <div className="@container absolute inset-0 md:hidden">
        <StoreMobile scenario={scenario} sent={sent} done={done} locale={locale} />
      </div>
    </>
  );
}
