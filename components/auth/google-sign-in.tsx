"use client";

import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/lib/api";

/**
 * Google's own "Continue with Google" button (Google Identity Services).
 * Asks the backend whether Google sign-in is on (GET /auth/providers) and
 * renders nothing when it isn't, so the button never shows broken. Google
 * hands back a signed ID token, which the parent posts to our backend.
 */

type Gsi = {
  accounts: {
    id: {
      initialize: (o: Record<string, unknown>) => void;
      renderButton: (el: HTMLElement, o: Record<string, unknown>) => void;
    };
  };
};

declare global {
  interface Window {
    google?: Gsi;
  }
}

let scriptPromise: Promise<void> | null = null;
function loadGsi(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve();
  scriptPromise ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error("Google sign-in couldn't load"));
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

let clientIdPromise: Promise<string | null> | null = null;
function googleClientId(): Promise<string | null> {
  clientIdPromise ??= fetch(`${API_URL}/auth/providers`)
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => (d?.google_client_id as string) || null)
    .catch(() => {
      clientIdPromise = null;
      return null;
    });
  return clientIdPromise;
}

export function GoogleSignIn({
  onCredential,
  text = "continue_with",
  orLabel = "or",
}: {
  onCredential: (credential: string) => void;
  orLabel?: string;
  text?: "signin_with" | "continue_with" | "signup_with";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cb = useRef(onCredential);
  cb.current = onCredential;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const clientId = await googleClientId();
      if (!clientId || cancelled) return;
      try {
        await loadGsi();
      } catch {
        return;
      }
      if (cancelled || !ref.current || !window.google) return;
      setEnabled(true);
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (res: { credential?: string }) => {
          if (res.credential) cb.current(res.credential);
        },
        ux_mode: "popup",
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      const width = Math.min(Math.max(ref.current.offsetWidth || 320, 200), 400);
      window.google.accounts.id.renderButton(ref.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        shape: "pill",
        text,
        logo_alignment: "center",
        width,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <div className={enabled ? "flex flex-col gap-3" : "hidden"}>
      <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-wider text-white/40">
        <span className="h-px flex-1 bg-white/10" />
        {orLabel}
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <div ref={ref} className="flex min-h-11 w-full justify-center" />
    </div>
  );
}
