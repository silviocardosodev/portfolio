import type { MetadataRoute } from "next";

const siteUrl = "https://silviocardoso.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/race-telemetry`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
