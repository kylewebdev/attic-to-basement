import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://abeliquidators.com";

    return [
        {
            url: baseUrl,
            lastModified: "2026-02-27",
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/estate-sales`,
            lastModified: "2026-02-27",
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/estate-liquidation`,
            lastModified: "2026-02-27",
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/appraisals`,
            lastModified: "2026-02-27",
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/our-promise`,
            lastModified: "2026-02-27",
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/reviews`,
            lastModified: "2026-02-27",
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: "2026-02-27",
            changeFrequency: "monthly",
            priority: 0.9,
        },
    ];
}
