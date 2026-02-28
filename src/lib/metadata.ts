import type { Metadata } from "next";

export const siteUrl = "https://abeliquidators.com";
export const siteName = "Attic To Basement Estate Liquidators";
export const sitePhone = "(916) 521-1077";
export const siteOwner = "Cortnee Beggs";

type PageKey =
    | "home"
    | "estateSales"
    | "estateLiquidation"
    | "appraisals"
    | "ourPromise"
    | "reviews"
    | "contact"
    | "privacy"
    | "terms";

interface PageConfig {
    title: string;
    description: string;
    path: string;
    keywords: string[];
    robots?: string;
}

const noIndexRobots = "noindex, nofollow";

const pages: Record<PageKey, PageConfig> = {
    home: {
        title: "Estate Sale Services in Sacramento & Northern CA | Attic To Basement Estate Liquidators",
        description: `Full-service estate sales, cleanouts, and appraisals across Northern California. Call ${sitePhone} for a free consultation. 20+ years experience.`,
        path: "",
        keywords: [
            "estate sales Sacramento",
            "estate liquidation Northern California",
            "estate sale company near me",
            "estate cleanout Sacramento",
            "estate appraisals Sacramento",
        ],
    },
    estateSales: {
        title: "Professional Estate Sale Management in Sacramento | Attic To Basement Estate Liquidators",
        description:
            "Professional estate sale services from setup to cleanup. Free estimates, expert pricing, and full marketing included. Serving Sacramento and Northern CA.",
        path: "/estate-sales",
        keywords: [
            "estate sale company Sacramento",
            "professional estate sale services",
            "estate sale management",
            "estate sale pricing",
            "Sacramento estate sales",
        ],
    },
    estateLiquidation: {
        title: "Estate Liquidation & Cleanout Services Sacramento | Attic To Basement Estate Liquidators",
        description:
            "Complete estate liquidation and cleanouts for Northern California families. Fully insured, bonded, and experienced.",
        path: "/estate-liquidation",
        keywords: [
            "estate liquidation Sacramento",
            "estate cleanout services",
            "estate buyout Northern California",
            "house cleanout Sacramento",
            "full-service estate liquidation",
        ],
    },
    appraisals: {
        title: "Personal Property Appraisals | Attic To Basement Estate Liquidators",
        description:
            "Accurate appraisals for household goods, antiques, collectibles, and more. Expert valuations backed by 20+ years of experience.",
        path: "/appraisals",
        keywords: [
            "personal property appraisal Sacramento",
            "estate appraisal services",
            "antique appraisal Northern California",
            "household goods appraisal",
            "estate valuation Sacramento",
        ],
    },
    ourPromise: {
        title: "Our Promise to You | Attic To Basement Estate Liquidators",
        description:
            "Transparent, respectful, and professional estate liquidation. Learn about ABE's values and client-centered approach.",
        path: "/our-promise",
        keywords: [
            "trusted estate sale company",
            "respectful estate liquidation",
            "estate sale company values",
        ],
    },
    reviews: {
        title: "Client Reviews and Testimonials | Attic To Basement Estate Liquidators",
        description:
            "See what families across Northern California say about working with Attic To Basement Estate Liquidators. 4.5 stars across review platforms.",
        path: "/reviews",
        keywords: [
            "estate sale reviews Sacramento",
            "estate liquidator reviews",
            "Attic to Basement reviews",
            "estate sale testimonials",
        ],
    },
    contact: {
        title: "Contact Us | Free Consultation | Attic To Basement Estate Liquidators",
        description: `Schedule a free, no-obligation estate sale consultation. Call ${sitePhone} or fill out our contact form. Available 24/7.`,
        path: "/contact",
        keywords: [
            "estate sale consultation Sacramento",
            "free estate sale estimate",
            "contact estate liquidator",
        ],
    },
    privacy: {
        title: "Privacy Policy | Attic To Basement Estate Liquidators",
        description:
            "How Attic To Basement Estate Liquidators collects, uses, and protects your personal information.",
        path: "/privacy",
        keywords: [],
        robots: noIndexRobots,
    },
    terms: {
        title: "Terms of Service | Attic To Basement Estate Liquidators",
        description:
            "Terms and conditions for using the Attic To Basement Estate Liquidators website.",
        path: "/terms",
        keywords: [],
        robots: noIndexRobots,
    },
};

export function getPageMetadata(page: PageKey): Metadata {
    const { title, description, path, keywords, robots } = pages[page];
    const url = `${siteUrl}${path}`;

    return {
        title,
        description,
        keywords: keywords.length > 0 ? keywords : undefined,
        robots:
            robots ?? "index, follow, max-snippet:-1, max-image-preview:large",
        alternates: { canonical: url },
        other: {
            "geo.region": "US-CA",
            "geo.placename": "Sacramento",
        },
        openGraph: {
            title,
            description,
            url,
            siteName,
            type: "website",
            images: [
                {
                    url: `${siteUrl}/og-image.jpg`,
                    width: 1200,
                    height: 630,
                    alt: "Attic To Basement Estate Liquidators — Estate Sales & Liquidation Services",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${siteUrl}/og-image.jpg`],
        },
    };
}
