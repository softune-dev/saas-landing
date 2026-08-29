import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog-data";
import { FEATURE_PAGES } from "@/lib/features-data";
import { DOC_CATEGORIES } from "@/lib/documentation-data";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/brandkit", priority: 0.3, changeFrequency: "yearly" },
  { path: "/careers", priority: 0.4, changeFrequency: "monthly" },
  { path: "/changelog", priority: 0.5, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "daily" },
  { path: "/support/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/support/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/support/community", priority: 0.4, changeFrequency: "monthly" },
  { path: "/support/tutorials", priority: 0.5, changeFrequency: "monthly" },
  { path: "/support/documentation", priority: 0.6, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/refund", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookie", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Public AI-crawler brief — not an HTML route, but search/LLM systems
  // that read sitemaps should still discover /llms.txt alongside the site.
  const llmsEntry: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/llms.txt`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  };

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const featureEntries: MetadataRoute.Sitemap = Object.keys(FEATURE_PAGES).map((slug) => ({
    url: `${SITE_URL}/features/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const docEntries: MetadataRoute.Sitemap = DOC_CATEGORIES.flatMap((cat) =>
    cat.articles.map((article) => ({
      url: `${SITE_URL}/support/documentation/${article.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  );

  return [llmsEntry, ...staticEntries, ...blogEntries, ...featureEntries, ...docEntries];
}
