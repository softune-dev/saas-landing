import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { BLOG_POSTS } from "@/lib/blog-data";
import { FEATURE_PAGES } from "@/lib/features-data";
import { DOC_CATEGORIES } from "@/lib/documentation-data";
import { COMMERCIAL_PAGES } from "@/lib/commercial-pages-data";
import { INTEGRATIONS } from "@/lib/integrations-data";
import { INDUSTRY_PAGES } from "@/lib/industry-data";
import { hasBnVersion } from "@/lib/seo";

const STATIC_ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
  { path: "/features", priority: 0.85, changeFrequency: "monthly" },
  { path: "/signup", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/brandkit", priority: 0.3, changeFrequency: "yearly" },
  { path: "/careers", priority: 0.4, changeFrequency: "monthly" },
  { path: "/changelog", priority: 0.5, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
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

function parsePostDate(date: string): Date {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.flatMap((r) => {
    const enUrl = `${SITE_URL}${r.path}`;
    const entries: MetadataRoute.Sitemap = [
      {
        url: enUrl,
        lastModified: now,
        changeFrequency: r.changeFrequency,
        priority: r.priority,
      },
    ];

    if (hasBnVersion(r.path)) {
      const bnPath = `/bn${r.path === "/" ? "" : r.path}`;
      entries.push({
        url: `${SITE_URL}${bnPath}`,
        lastModified: now,
        changeFrequency: r.changeFrequency,
        priority: r.priority,
      });
    }

    return entries;
  });

  const llmsEntry: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/llms.txt`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  };

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.flatMap((post) => [
    {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: parsePostDate(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(post.image ? { images: [`${SITE_URL}${post.image}`] } : {}),
    },
    {
      url: `${SITE_URL}/bn/blog/${post.slug}`,
      lastModified: parsePostDate(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(post.image ? { images: [`${SITE_URL}${post.image}`] } : {}),
    },
  ]);

  const featureEntries: MetadataRoute.Sitemap = Object.keys(FEATURE_PAGES).flatMap(
    (slug) => [
      {
        url: `${SITE_URL}/features/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      {
        url: `${SITE_URL}/bn/features/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
    ],
  );

  const docEntries: MetadataRoute.Sitemap = DOC_CATEGORIES.flatMap((cat) =>
    cat.articles.flatMap((article) => [
      {
        url: `${SITE_URL}/support/documentation/${article.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.4,
      },
      {
        url: `${SITE_URL}/bn/support/documentation/${article.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.4,
      },
    ]),
  );

  const commercialEntries: MetadataRoute.Sitemap = Object.keys(COMMERCIAL_PAGES).map(
    (slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );
  const integrationEntries: MetadataRoute.Sitemap = Object.keys(INTEGRATIONS).map(
    (slug) => ({
      url: `${SITE_URL}/integrations/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );
  const industryEntries: MetadataRoute.Sitemap = Object.keys(INDUSTRY_PAGES).map(
    (slug) => ({
      url: `${SITE_URL}/ecommerce/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [
    llmsEntry,
    ...staticEntries,
    ...featureEntries,
    ...commercialEntries,
    ...integrationEntries,
    ...industryEntries,
    ...blogEntries,
    ...docEntries,
  ];
}
