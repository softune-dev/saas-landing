"use client";

import { useEffect, useState } from "react";
import {
  getProvisionStatus,
  listTrialSites,
  type TrialTokensOut,
} from "@/lib/trial";

export const BUILD_LABELS = [
  "Setting up your account",
  "Creating your store",
  "Applying your theme",
  "Adding your pages",
  "Publishing your store",
  "Connecting your domain",
] as const;

/** Last label is the real Vercel attach poll. The rest are already done by
 * the time POST /trial/complete resolves — staggered locally so the list
 * doesn't tick all at once. */
export const DOMAIN_INDEX = BUILD_LABELS.length - 1;

const POLL_MS = 1500;
const POLL_CAP_MS = 15_000;
const STAGGER_MS = 380;
const EXIT_PAUSE_MS = 500;

/** Survives React Strict Mode remounts so we don't assign the dashboard
 * URL twice after the same successful complete. */
let didHandoff = false;

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function waitForDomain(
  accessToken: string,
  isCancelled: () => boolean,
): Promise<void> {
  const deadline = Date.now() + POLL_CAP_MS;
  let siteId: string | undefined;
  try {
    const page = await listTrialSites(accessToken);
    siteId = page.items[0]?.id;
  } catch {
    return;
  }
  if (!siteId) return;

  while (!isCancelled() && Date.now() < deadline) {
    try {
      const status = await getProvisionStatus(accessToken, siteId);
      if (status.domain_attached !== false) return;
    } catch {
      // Keep polling until the cap — a single failed check isn't a stop.
    }
    const wait = Math.min(POLL_MS, deadline - Date.now());
    if (wait <= 0) return;
    await sleep(wait);
  }
}

/**
 * Drives the "building your store" checklist AND the visual art panel from
 * one shared state, so the two can never drift out of sync.
 *
 * `pending` is the in-flight POST /trial/complete promise, created by the
 * caller the INSTANT it fires the request — not awaited first. That's the
 * fix for the real bug this replaces: the old version waited for tokens
 * (i.e. for the network round trip to finish) before starting the local
 * stagger animation at all, so the whole screen sat frozen on step one
 * until the response came back, then burst through every step at once.
 * Here the stagger starts the moment the request goes out, in parallel
 * with it — the only step actually gated on the real response is the last
 * one (domain attach), which is the only step that's genuinely uncertain.
 */
export function useTrialBuild(
  pending: Promise<TrialTokensOut> | null,
  onHandoff: (access: string, refresh: string) => void,
) {
  const [done, setDone] = useState<boolean[]>(() => BUILD_LABELS.map(() => false));

  useEffect(() => {
    if (!pending || didHandoff) return;
    const request = pending;
    let cancelled = false;

    function mark(index: number) {
      setDone((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
    }

    async function run() {
      for (let i = 0; i < DOMAIN_INDEX; i++) {
        if (cancelled) return;
        mark(i);
        await sleep(STAGGER_MS);
      }
      let pair: TrialTokensOut;
      try {
        pair = await request;
      } catch {
        return; // caller's own catch handles the error UI + step revert
      }
      if (cancelled) return;
      await waitForDomain(pair.access_token, () => cancelled);
      if (cancelled) return;
      mark(DOMAIN_INDEX);
      await sleep(EXIT_PAUSE_MS);
      if (cancelled || didHandoff) return;
      didHandoff = true;
      onHandoff(pair.access_token, pair.refresh_token);
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [pending, onHandoff]);

  const doneCount = done.filter(Boolean).length;
  const pct = pending ? Math.round((doneCount / BUILD_LABELS.length) * 100) : 0;

  return { done, doneCount, pct };
}
