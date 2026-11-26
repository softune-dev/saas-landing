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
const full = { en: "Full, with profit and export", bn: "সম্পূর্ণ, প্রফিট ও এক্সপোর্টসহ" };
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
      every("0% commission on orders", "অর্ডারে 0% কমিশন"),
    ],
  },
  {
    title: { en: "Your online store", bn: "আপনার অনলাইন স্টোর" },
    rows: [
      every("Free web address (yourshop.softunebd.com)", "ফ্রি ওয়েব ঠিকানা (yourshop.softunebd.com)"),
      every("Theme editor with live desktop and mobile preview", "ডেস্কটপ ও মোবাইল লাইভ প্রিভিউসহ থিম এডিটর"),
      every("Variants with their own price and stock", "আলাদা দাম ও স্টকসহ ভ্যারিয়েন্ট"),
      every("Sale events with popups", "পপআপসহ সেল ইভেন্ট"),
      every("Dashboard in English and Bangla, installable on your phone", "বাংলা ও ইংরেজি ড্যাশবোর্ড, ফোনে ইনস্টল করা যায়"),
    ],
  },
  {
    title: { en: "AI", bn: "AI" },
    rows: [
      row("AI requests", "AI রিকোয়েস্ট", "300 (10/day)", "900 (30/day)", "3,000 (100/day)", "4,500 (150/day)"),
      every("AI store setup and 5 images at sign-up", "সাইন-আপে AI স্টোর সেটআপ ও 5টি ছবি"),
      every("AI agent and Write with AI", "AI এজেন্ট ও Write with AI"),
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
      every("Order alerts on your phone", "ফোনে অর্ডার নোটিফিকেশন"),
      every("Print invoices and delivery slips", "ইনভয়েস ও ডেলিভারি স্লিপ প্রিন্ট"),
      paid("Customer records and risk score", "কাস্টমার রেকর্ড ও রিস্ক স্কোর"),
      paid("Abandoned checkouts", "অ্যাবানডন্ড চেকআউট"),
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
      paid("bKash, Nagad and SSLCommerz checkout", "bKash, Nagad ও SSLCommerz চেকআউট"),
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
