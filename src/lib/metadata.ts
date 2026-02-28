import type { Metadata } from "next";

const siteUrl = "https://abeliquidators.com";
const siteName = "Attic To Basement Estate Liquidators";

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

const pages: Record<
    PageKey,
    { title: string; description: string; path: string }
> = {
    home: {
        title: "Estate Sale Services Sacramento | Attic To Basement Estate Liquidators",
        description:
            "Full-service estate sales, cleanouts, and appraisals across Northern California. Free consultation. 20+ years experience.",
        path: "",
    },
    estateSales: {
        title: "Estate Sale Management | Attic To Basement Estate Liquidators",
        description:
            "Professional estate sale services from setup to cleanup. Free estimates, expert pricing, and full marketing included.",
        path: "/estate-sales",
    },
    estateLiquidation: {
        title: "Estate Liquidation Services | Attic To Basement Estate Liquidators",
        description:
            "Estate sales, and cleanouts for Northern California families. Fully insured, bonded, and experienced.",
        path: "/estate-liquidation",
    },
    appraisals: {
        title: "Personal Property Appraisals | Attic To Basement Estate Liquidators",
        description:
            "Accurate appraisals for household goods, antiques, collectibles, and more. Expert valuations backed by 20+ years of experience.",
        path: "/appraisals",
    },
    ourPromise: {
        title: "Our Commitment to You | Attic To Basement Estate Liquidators",
        description:
            "Transparent, respectful, and professional estate liquidation. Learn about ABE's values and client-centered approach.",
        path: "/our-promise",
    },
    reviews: {
        title: "Client Reviews and Testimonials | Attic To Basement Estate Liquidators",
        description:
            "See what families across Northern California say about working with Attic To Basement Estate Liquidators. 4.5 stars across review platforms.",
        path: "/reviews",
    },
    contact: {
        title: "Contact Us | Free Consultation | Attic To Basement Estate Liquidators",
        description:
            "Schedule a free, no-obligation estate sale consultation. Call (916) 521-1077 or fill out our contact form. Available 24/7.",
        path: "/contact",
    },
    privacy: {
        title: "Privacy Policy | Attic To Basement Estate Liquidators",
        description:
            "How Attic To Basement Estate Liquidators collects, uses, and protects your personal information.",
        path: "/privacy",
    },
    terms: {
        title: "Terms of Service | Attic To Basement Estate Liquidators",
        description:
            "Terms and conditions for using the Attic To Basement Estate Liquidators website.",
        path: "/terms",
    },
};

export function getPageMetadata(page: PageKey): Metadata {
    const { title, description, path } = pages[page];
    const url = `${siteUrl}${path}`;

    return {
        title,
        description,
        alternates: { canonical: url },
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
