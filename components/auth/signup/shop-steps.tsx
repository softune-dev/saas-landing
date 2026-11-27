"use client";

import { slugPreview, t, type Business, type Locale } from "./signup-copy";
import { CategoryCards } from "./signup-controls";
import { Heading, PrimaryButton, TextInput } from "./signup-ui";

type StepProps = {
  locale: Locale;
  value: Business;
  onChange: (patch: Partial<Business>) => void;
};

export function ShopStep({ locale, value, onChange, onNext }: StepProps & { onNext: () => void }) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  const name = value.shopName.trim();
  const slug = slugPreview(name);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (name) onNext();
      }}
      className="flex flex-col gap-6"
    >
      <Heading title={L("Name your shop", "দোকানের নাম দিন")} />
      <div className="flex flex-col gap-2.5">
        <TextInput label={L("Shop name", "দোকানের নাম")} required autoFocus maxLength={120} autoComplete="organization" value={value.shopName} onChange={(e) => onChange({ shopName: e.target.value })} />
        <p className="truncate text-center text-sm text-muted">
          {name && !slug ? (
            L("Add English letters to choose your web address", "ওয়েব ঠিকানার জন্য ইংরেজি অক্ষর দিন")
          ) : (
            <>
              <strong className="font-bold text-ink">{slug || "yourshop"}</strong>.softunebd.com
            </>
          )}
        </p>
      </div>
      <PrimaryButton disabled={!name}>{L("Continue", "চালিয়ে যান")}</PrimaryButton>
    </form>
  );
}

export function CategoryStep({ locale, value, onChange, onNext }: StepProps & { onNext: () => void }) {
  const L = (en: string, bn: string) => t(locale, en, bn);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.category) onNext();
      }}
      className="flex flex-col gap-5"
    >
      <Heading title={L("What do you sell?", "আপনি কী বিক্রি করেন?")} />
      <CategoryCards locale={locale} value={value.category} onChange={(category) => onChange({ category })} />
      {/* Always in reach: the grid is taller than a small phone. */}
      <div className="sticky bottom-0 -mx-5 bg-gradient-to-t from-surface from-70% to-transparent px-5 pt-4 pb-4 sm:mx-0 sm:px-0">
        <PrimaryButton disabled={!value.category}>{L("Continue", "চালিয়ে যান")}</PrimaryButton>
      </div>
    </form>
  );
}
