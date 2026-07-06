import type { MetadataRoute } from "next";
import { getBlogPosts } from "app/blog/utils";

export const baseUrl = "https://www.junnjiee.com";

const staticRoutes = ["", "/blog", "/side-quests"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
