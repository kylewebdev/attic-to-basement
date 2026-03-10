import type { MetadataRoute } from "next";
import { cities, services } from "@/lib/data/service-areas";
import { getPublishedResourcePosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://abeliquidators.com";

    const serviceAreaPages: MetadataRoute.Sitemap = cities.flatMap((city) =>
        services.map((service) => ({
            url: `${baseUrl}/services/${city.slug}/${service.slug}`,
            lastModified: "2026-03-07",
            changeFrequency: "monthly" as const,
            priority: service.slug === "estate-sales" ? 0.7 : 0.5,
        }))
    );

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
        {
            url: `${baseUrl}/privacy`,
            lastModified: "2026-02-27",
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: "2026-02-27",
            changeFrequency: "yearly",
            priority: 0.3,
        },
        ...serviceAreaPages,
        ...getPublishedResourcePosts().map((post) => ({
            url: `${baseUrl}/resources/${post.slug}`,
            lastModified: post.publishedAt,
            changeFrequency: "monthly" as const,
            priority: 0.6,
        })),
    ];
}
