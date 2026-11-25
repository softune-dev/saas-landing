/**
 * Rows for the plan comparison table. Same source of truth as pricing-data.ts:
 * app/plans.py. `true` means included, `false` means not in that plan.
 */

import type { PlanKey } from "./pricing-data";

type Text = { en: string; bn: string };
export type Cell = boolean | string | Text;
export type CompareRow = { label: Text; cells: Record<PlanKey, Cell> };
export type CompareGroup = { title: Text; rows: CompareRow[] };

/** Cells in plan order: Free, Starter, Growth, Business. */
function row(en: string, bn: string, free: Cell, starter: Cell, growth: Cell, business: Cell): CompareRow {
  return { label: { en, bn }, cells: { free, starter, growth, business } };
}

const unlimited = { en: "Unlimited", bn: "আনলিমিটেড" };
const full = { en: "Full", bn: "সম্পূর্ণ" };
const allCouriers = { en: "Steadfast, Pathao, RedX, eCourier", bn: "Steadfast, Pathao, RedX, eCourier" };
const every = (en: string, bn: string) => row(en, bn, true, true, true, true);
const paid = (en: string, bn: string) => row(en, bn, false, true, true, true);

export const COMPARE_GROUPS: CompareGroup[] = [
  {
    title: { en: "Store limits", bn: "স্টোরের সীমা" },
    rows: [
      row("Products", "প্রোডাক্ট", "10", "50", "500", unlimited),
      row("Orders a month", "মাসিক অর্ডার", "50", unlimited, unlimited, unlimited),
      row("Media storage", "মিডিয়া স্টোরেজ", "100MB", "500MB", "2GB", "3GB"),
      row("Stores", "স্টোর", "1", "1", "1", "2"),
      row("Sale events", "সেল ইভেন্ট", "3", "3", "10", "25"),
      every("0% commission on orders", "অর্ডারে 0% কমিশন"),
    ],
  },
  {
    title: { en: "AI", bn: "AI" },
    rows: [
      row("AI credits a day", "দিনে AI ক্রেডিট", false, "30", "100", "150"),
      every("AI store setup and 5 images at sign-up", "সাইন-আপে AI স্টোর সেটআপ ও 5টি ছবি"),
      paid("AI agent and Write with AI", "AI এজেন্ট ও Write with AI"),
      paid("ChatGPT connector (beta)", "ChatGPT কানেক্টর (বেটা)"),
      every("Chat assistant on your store", "স্টোরে চ্যাট অ্যাসিস্ট্যান্ট"),
    ],
  },
  {
    title: { en: "Storefront and marketing", bn: "স্টোরফ্রন্ট ও মার্কেটিং" },
    rows: [
      paid("Custom domain", "কাস্টম ডোমেইন"),
      paid("Switch themes any time", "যেকোনো সময় থিম বদলান"),
      paid("SoftuneBD badge removed", "SoftuneBD ব্যাজ ছাড়া"),
      every("Automatic page titles and sitemap", "অটোমেটিক পেজ টাইটেল ও সাইটম্যাপ"),
      paid("SEO editing", "SEO এডিটিং"),
      paid("Pixels and Meta Conversions API", "পিক্সেল ও Meta Conversions API"),
    ],
  },
  {
    title: { en: "Selling and customers", bn: "বিক্রি ও কাস্টমার" },
    rows: [
      row("Analytics", "অ্যানালিটিক্স", { en: "Last 7 days", bn: "শেষ 7 দিন" }, full, full, full),
      paid("Customer records", "কাস্টমার রেকর্ড"),
      paid("Store Sale (POS)", "স্টোর সেল (POS)"),
      every("Basic fake order blocking", "বেসিক ফেক অর্ডার ব্লকিং"),
      paid("Fraud controls", "ফ্রড কন্ট্রোল"),
    ],
  },
  {
    title: { en: "Payments and delivery", bn: "পেমেন্ট ও ডেলিভারি" },
    rows: [
      every("Cash on Delivery and manual payments", "ক্যাশ অন ডেলিভারি ও ম্যানুয়াল পেমেন্ট"),
      every("Softune Pay", "Softune Pay"),
      row("bKash, Nagad and SSLCommerz gateways", "bKash, Nagad ও SSLCommerz গেটওয়ে", false, false, true, true),
      row("Couriers", "কুরিয়ার", "Steadfast", "Steadfast, eCourier", allCouriers, allCouriers),
    ],
  },
  {
    title: { en: "Support", bn: "সাপোর্ট" },
    rows: [
      row("Priority email support", "প্রায়োরিটি ইমেইল সাপোর্ট", false, false, true, true),
      row("Account Manager", "অ্যাকাউন্ট ম্যানেজার", false, false, false, true),
    ],
  },
];
