"use client";

import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLeadToken, updateLeadProfile } from "@/lib/leads";
import { AuthShell, fieldClass, primaryBtnClass } from "./auth-shell";
import { CategoryDropdown } from "./category-dropdown";

// Same rule the backend enforces (app/schemas.py's LeadProfileUpdate) — all
// 7 real BD mobile operator prefixes, 11 digits, leading 0 kept (the +88
// chip is purely visual; what's typed here is the local number as people
// actually write it, e.g. "01712345678").
const BD_PHONE_RE = /^01[3-9]\d{8}$/;

const CATEGORIES = [
  "Fashion & Apparel",
  "Electronics & Gadgets",
  "Grocery & Food",
  "Beauty & Cosmetics",
  "Home & Living",
  "Furniture & Decor",
  "Jewelry & Accessories",
  "Footwear & Bags",
  "Baby & Kids",
  "Health & Wellness",
  "Sports & Fitness",
  "Books & Stationery",
  "Toys & Games",
  "Automotive & Tools",
  "Agriculture & Gardening",
  "Pet Supplies",
  "Digital Goods & Services",
  "Handicrafts & Gifts",
  "B2B / Wholesale",
  "Other",
];

export function BasicsForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopCategory, setShopCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!getLeadToken()) router.replace("/signup");
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (phone && !BD_PHONE_RE.test(phone)) {
      setError("Enter a valid Bangladeshi mobile number (e.g. 01XXXXXXXXX).");
      return;
    }
    setBusy(true);
    try {
      await updateLeadProfile({
        phone: phone.trim() || undefined,
        shop_name: shopName.trim() || undefined,
        shop_category: shopCategory || undefined,
      });
      router.push("/welcome");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save details");
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Tell us about your shop"
      subtitle="Just the essentials — we'll use this to set up your demo and get in touch about your store."
    >
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-2.5">
          <label htmlFor="basics-phone" className="text-sm font-medium text-foreground">
            Phone
          </label>
          <div className="relative flex items-stretch">
            <span className="flex shrink-0 items-center gap-1.5 rounded-l-lg border border-r-0 border-border bg-search-bg px-3 text-sm text-foreground">
              <span aria-hidden="true">🇧🇩</span>
              <span className="text-muted">+88</span>
            </span>
            <input
              id="basics-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              autoFocus
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
              className="h-11 w-full rounded-r-lg border border-border bg-search-bg px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-soft focus:border-primary focus:bg-surface"
            />
          </div>
          {phone && !BD_PHONE_RE.test(phone) ? (
            <p className="text-xs text-rose-500">
              Enter a valid Bangladeshi mobile number (e.g. 01XXXXXXXXX).
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="basics-shop" className="text-sm font-medium text-foreground">
            Shop name
          </label>
          <div className="relative">
            <Building2
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
              strokeWidth={2}
            />
            <input
              id="basics-shop"
              type="text"
              placeholder="Your shop"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label
            htmlFor="basics-category"
            className="text-sm font-medium text-foreground"
          >
            Shop category
          </label>
          <CategoryDropdown
            id="basics-category"
            value={shopCategory}
            onChange={setShopCategory}
            options={CATEGORIES}
          />
        </div>

        {error ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-400">
            {error}
          </div>
        ) : null}

        <button type="submit" disabled={busy} className={primaryBtnClass}>
          {busy ? (
            <>
              <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Saving...
            </>
          ) : (
            "Continue"
          )}
        </button>
      </form>
    </AuthShell>
  );
}
