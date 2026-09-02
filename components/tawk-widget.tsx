"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TAWK_SRC = "https://embed.tawk.to/6a946dd1c3c46c3445876165/1k19spvhd";

function isAuthPath(pathname: string) {
  return pathname === "/signup" || pathname.startsWith("/signup/");
}

type TawkApi = {
  onLoad?: () => void;
  onChatMaximized?: () => void;
  minimize?: () => void;
  hideWidget?: () => void;
  showWidget?: () => void;
};

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

/** Loads Tawk once, keeps it minimized on marketing pages, and hides it
 * entirely on the trial signup wizard so it can't auto-pop over the form. */
export function TawkWidget() {
  const pathname = usePathname();
  const hide = isAuthPath(pathname);

  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = window.Tawk_LoadStart || new Date();
    if (document.querySelector(`script[src="${TAWK_SRC}"]`)) return;

    const inject = () => {
      if (document.querySelector(`script[src="${TAWK_SRC}"]`)) return;
      const s1 = document.createElement("script");
      s1.async = true;
      s1.src = TAWK_SRC;
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      const s0 = document.getElementsByTagName("script")[0];
      s0.parentNode?.insertBefore(s1, s0);
    };

    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(inject);
      return () => cancelIdleCallback(id);
    }
    const t = window.setTimeout(inject, 1);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const apply = () => {
      const api = window.Tawk_API;
      if (!api) return;
      if (hide) {
        api.hideWidget?.();
      } else {
        api.showWidget?.();
        api.minimize?.();
      }
    };

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.onLoad = apply;
    window.Tawk_API.onChatMaximized = () => {
      if (isAuthPath(window.location.pathname)) {
        window.Tawk_API?.hideWidget?.();
      }
    };
    apply();
  }, [hide]);

  return null;
}
