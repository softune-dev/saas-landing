"use client";

import { MaskIcon } from "@/components/ui/mask-icon";
import { AgentPanel } from "./agent-panel";
import { StorePreview } from "./store-preview";
import type { Scenario } from "./scenarios";

type Locale = "en" | "bn";

/** The app window under the prompt box: what the AI is doing on the left, the
 * live canvas on the right where the AI's cursor does the work. Driven by the
 * hero's clock (`sent`, `done`); this only draws one moment of it. */
export function BuildStage({ scenario, sent, done, locale }: { scenario: Scenario; sent: boolean; done: number; locale: Locale }) {
  const isBn = locale === "bn";

  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[0_30px_70px_-40px_rgba(15,15,15,0.5)]">
      <div className="flex items-center gap-3 border-b border-[var(--color-line)] bg-[var(--color-canvas)]/60 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex min-w-0 items-center gap-1.5 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-1 text-[12px] font-medium text-[var(--color-muted)]">
          <MaskIcon src="/icons/lock.svg" className="size-3 text-emerald-500" />
          <span className="truncate">veila.softunebd.com</span>
        </div>
        <span className="hidden text-[11.5px] font-semibold text-[var(--color-muted)] sm:block">{isBn ? "লাইভ প্রিভিউ" : "Live preview"}</span>
      </div>

      <div className="grid md:grid-cols-[300px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="order-2 border-t border-[var(--color-line)] md:order-1 md:border-t-0 md:border-r">
          <AgentPanel scenario={scenario} sent={sent} done={done} locale={locale} />
        </div>
        <div className="@container relative order-1 aspect-[16/10] self-start overflow-hidden md:order-2">
          <StorePreview scenario={scenario} sent={sent} done={done} locale={locale} />
        </div>
      </div>
    </div>
  );
}
