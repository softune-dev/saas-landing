import { Check, Minus } from "lucide-react";
import { Fragment } from "react";
import { BILLING_MONTHS, getPlans, periodPrice, type BillingMonths, type PaidPlanKey, type PlanKey } from "@/lib/pricing-data";
import { COMPARE_GROUPS, type Cell } from "@/lib/plan-compare-data";
import { FREE_PLAN_LIVE } from "@/lib/site";

const COPY = {
  en: {
    title: "Compare plans",
    lead: "Every limit and feature side by side, with the price for each billing period.",
    prices: "Price by billing period",
    period: { 1: "1 month", 3: "3 months", 6: "6 months", 12: "12 months" },
    perMonth: "/mo",
    total: "total",
    save: "Save",
    free: "Free",
    yes: "Included",
    no: "Not included",
    feature: "Feature",
  },
  bn: {
    title: "প্ল্যান তুলনা করুন",
    lead: "সব সীমা ও ফিচার পাশাপাশি, প্রতিটি বিলিং মেয়াদের দামসহ।",
    prices: "বিলিং মেয়াদ অনুযায়ী দাম",
    period: { 1: "1 মাস", 3: "3 মাস", 6: "6 মাস", 12: "12 মাস" },
    perMonth: "/মাস",
    total: "মোট",
    save: "সাশ্রয়",
    free: "ফ্রি",
    yes: "আছে",
    no: "নেই",
    feature: "ফিচার",
  },
} as const;

const money = (n: number) => `৳${n.toLocaleString("en-US")}`;
const DIGITS = { fontFamily: "var(--font-heading), sans-serif" };

/* Each row is a grid. On a phone the label takes a line of its own above the
 * plan values; from md up it becomes the first column. */
const GRID = FREE_PLAN_LIVE
  ? "grid grid-cols-4 md:grid-cols-[minmax(0,1.5fr)_repeat(4,minmax(0,1fr))]"
  : "grid grid-cols-3 md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]";
const LABEL = "col-span-full px-4 pt-3 text-[13px] font-semibold text-[var(--color-ink)] md:col-span-1 md:px-6 md:py-3.5 md:text-[14.5px]";
const VALUE = "flex flex-col items-center justify-center px-1.5 py-3 text-center md:px-3 md:py-3.5";
const FEATURED = "bg-[var(--color-brand)]/[0.06]";

export function PlanComparison({ locale = "en" }: { locale?: "en" | "bn" }) {
  const c = COPY[locale];
  const paid = getPlans(locale);
  const columns: { key: PlanKey; name: string; popular?: boolean }[] = [
    ...(FREE_PLAN_LIVE ? [{ key: "free" as const, name: "Free" }] : []),
    ...paid.map((p) => ({ key: p.key, name: p.name, popular: p.popular })),
  ];
  const tint = (popular?: boolean) => (popular ? FEATURED : "");

  const show = (cell: Cell) => {
    if (cell === true)
      return (
        <span className="flex size-6 items-center justify-center rounded-full bg-[var(--color-brand)]/14">
          <Check className="size-3.5 text-[var(--color-brand)]" strokeWidth={3.2} aria-hidden />
          <span className="sr-only">{c.yes}</span>
        </span>
      );
    if (cell === false)
      return (
        <>
          <Minus className="size-4 text-[var(--color-muted-soft)]" strokeWidth={2.5} aria-hidden />
          <span className="sr-only">{c.no}</span>
        </>
      );
    return (
      <span className="text-[12.5px] leading-snug font-semibold text-balance text-[var(--color-ink-soft)] md:text-[14px]">
        {typeof cell === "string" ? cell : cell[locale]}
      </span>
    );
  };

  const price = (key: PlanKey, months: BillingMonths) => {
    if (key === "free") return <span className="text-[15px] font-bold text-[var(--color-ink)] md:text-[17px]">{money(0)}</span>;
    const p = periodPrice(key as PaidPlanKey, months);
    return (
      <>
        <span className="text-[15px] leading-tight font-bold tracking-tight text-[var(--color-ink)] tabular-nums md:text-[19px]" style={DIGITS}>
          {money(p.perMonth)}
          <span className={`text-[10.5px] font-semibold text-[var(--color-muted)] md:text-[12px] ${columns.length === 4 ? "block md:inline" : ""}`}>{c.perMonth}</span>
        </span>
        {months > 1 ? (
          <>
            <span className="mt-0.5 text-[11px] leading-snug font-medium text-[var(--color-muted)] tabular-nums md:text-[12.5px]">
              {money(p.total)} {c.total}
            </span>
            <span className="text-[11px] leading-snug font-bold text-[var(--color-brand)] tabular-nums md:text-[12.5px]">
              {c.save} {money(p.saving)}
            </span>
          </>
        ) : null}
      </>
    );
  };

  return (
    <section id="compare-plans" className="border-b border-[var(--color-line)] bg-[var(--color-canvas)] py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-3 sm:px-5 md:px-8">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-3xl leading-tight tracking-tight text-[var(--color-ink)] md:text-5xl">{c.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-[14px] font-medium text-[var(--color-muted)] md:text-[16px]">{c.lead}</p>
        </div>

        {/* No overflow clipping here: it would stop the plan names from sticking. */}
        <div role="table" aria-label={c.title} className="rounded-[24px] border border-[var(--color-line)] bg-[var(--color-surface)]">
          {/* Plan names stay in view under the site header. */}
          <div role="row" className={`${GRID} sticky top-[56px] z-20 md:top-[80px] rounded-t-[23px] border-b border-[var(--color-line)] bg-[var(--color-surface)]`}>
            <span role="columnheader" className="hidden px-6 py-4 text-[13px] font-semibold text-[var(--color-muted)] md:block">
              {c.feature}
            </span>
            {columns.map((col) => (
              <span
                key={col.key}
                role="columnheader"
                className={`${VALUE} !py-3.5 text-[14px] font-bold text-[var(--color-ink)] md:text-[17px] ${tint(col.popular)} ${col.popular ? "!text-[var(--color-brand)]" : ""}`}
              >
                {col.name}
              </span>
            ))}
          </div>

          <h3 className="border-b border-[var(--color-line)] px-4 pt-6 pb-2.5 text-[17px] text-[var(--color-ink)] md:px-6 md:text-[20px]">{c.prices}</h3>
          {BILLING_MONTHS.map((months) => (
            <div key={months} role="row" className={`${GRID} border-b border-[var(--color-line)]`}>
              <span role="rowheader" className={`${LABEL} md:flex md:items-center`}>
                {c.period[months]}
              </span>
              {columns.map((col) => (
                <span key={col.key} role="cell" className={`${VALUE} ${tint(col.popular)}`}>
                  {price(col.key, months)}
                </span>
              ))}
            </div>
          ))}

          {COMPARE_GROUPS.map((group) => (
            <Fragment key={group.title.en}>
              <h3 className="border-b border-[var(--color-line)] px-4 pt-7 pb-2.5 text-[17px] text-[var(--color-ink)] md:px-6 md:text-[20px]">
                {group.title[locale]}
              </h3>
              {group.rows.map((row) => (
                <div key={row.label.en} role="row" className={`${GRID} border-b border-[var(--color-line)] last:border-b-0`}>
                  <span role="rowheader" className={`${LABEL} md:flex md:items-center`}>
                    {row.label[locale]}
                  </span>
                  {columns.map((col) => (
                    <span key={col.key} role="cell" className={`${VALUE} ${tint(col.popular)}`}>
                      {show(row.cells[col.key])}
                    </span>
                  ))}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
