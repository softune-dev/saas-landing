import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// The bare `userAgent: "*", allow: "/"` rule below already permits every
// crawler, AI ones included — these named entries are functionally
// redundant with it. They exist anyway so the intent is unambiguous in the
// file itself (a merchant or a future editor scanning robots.txt sees
// "yes, deliberately open to AI crawlers", not "happens to not be
// blocked") — see llms.txt for the actual content aimed at these crawlers.
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "cohere-ai",
];

/** The marketing site — unlike the dashboard, this one WANTS to be found. */
export default function robots(): MetadataRoute.Robots {
  const funnel = ["/verify-otp", "/basics", "/welcome"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: funnel },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: funnel,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
