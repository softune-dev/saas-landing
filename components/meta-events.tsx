"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution, trackMeta, trackMetaOnce } from "@/lib/meta";

/**
 * Site-wide Meta mid-funnel events (lib/meta.ts does the production check):
 *  - keeps the visitor's utm_* / fbclid for the signup later on
 *  - ViewContent when the signup page opens
 *  - Contact when someone taps WhatsApp, call or email
 */
export function MetaEvents() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
    if (pathname === "/signup" || pathname === "/bn/signup") {
      trackMetaOnce("ViewContent", `view:${pathname}`, { content_name: "Signup" });
    }
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") || "";
      const method = /^https?:\/\/(wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)/i.test(href)
        ? "whatsapp"
        : href.startsWith("tel:")
          ? "phone"
          : href.startsWith("mailto:")
            ? "email"
            : null;
      if (method) trackMeta("Contact", { content_name: method });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
