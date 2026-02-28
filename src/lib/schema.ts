import type { Testimonial } from "@/lib/data/testimonials";

const siteUrl = "https://abeliquidators.com";
const businessName = "Attic to Basement Estate Liquidators";
const businessId = `${siteUrl}/#business`;

const sameAs = [
    "https://www.facebook.com/profile.php?id=100094393143202",
    "https://www.instagram.com/abe.liquidators/",
    "https://www.tiktok.com/@attic.to.basement",
    "https://www.yelp.com/biz/attic-to-basement-estate-liquidators-sacramento",
    "https://estatesales.org/estate-sale-companies/attic-to-basement-estate-liquidators-23935",
    "https://estatesales.net/companies/CA/Citrus-Heights/95610/156176",
];

// Yelp-wide aggregate rating — update these when the Yelp profile changes
const YELP_RATING = "4.5";
const YELP_REVIEW_COUNT = 49;

export function getLocalBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": businessId,
        name: businessName,
        alternateName: "ABE Liquidators",
        url: siteUrl,
        telephone: "+19165211077",
        priceRange: "$",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Sacramento",
            addressRegion: "CA",
            postalCode: "95821",
            addressCountry: "US",
        },
        logo: `${siteUrl}/new-logo.svg`,
        image: `${siteUrl}/new-logo.svg`,
        sameAs,
        founder: {
            "@type": "Person",
            name: "Cortnee Beggs",
            jobTitle: "Owner",
        },
        areaServed: [
            { "@type": "State", name: "California" },
            { "@type": "City", name: "Sacramento" },
            { "@type": "City", name: "Roseville" },
            { "@type": "City", name: "Elk Grove" },
            { "@type": "City", name: "Folsom" },
            { "@type": "City", name: "Citrus Heights" },
            { "@type": "City", name: "Rocklin" },
            { "@type": "AdministrativeArea", name: "Sacramento County" },
            { "@type": "AdministrativeArea", name: "Placer County" },
            { "@type": "AdministrativeArea", name: "El Dorado County" },
        ],
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ],
            opens: "00:00",
            closes: "23:59",
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Estate Liquidation Services",
            itemListElement: [
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Estate Sales",
                        description:
                            "Full-service estate sale management including setup, pricing, marketing, and cleanup.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Estate Liquidation & Cleanouts",
                        description:
                            "Complete estate liquidation, buyouts, and cleanout services for homes and properties.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Personal Property Appraisals",
                        description:
                            "Expert valuations for household goods, antiques, collectibles, and personal property.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Free Consultation",
                        description:
                            "No-obligation consultation to discuss your estate sale or liquidation needs.",
                    },
                },
            ],
        },
        // Yelp-wide aggregate rating (49 reviews across Yelp)
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: YELP_RATING,
            bestRating: "5",
            reviewCount: YELP_REVIEW_COUNT,
        },
        description:
            "Full-service estate sales, buyouts, cleanouts, and appraisals across Northern California.",
    };
}

export function getServiceSchema({
    name,
    description,
    path,
}: {
    name: string;
    description: string;
    path: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: `${siteUrl}${path}`,
        provider: {
            "@type": "ProfessionalService",
            "@id": businessId,
        },
        areaServed: {
            "@type": "State",
            name: "California",
        },
    };
}

export function getBreadcrumbSchema(crumbs: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            ...crumbs.map((crumb, i) => ({
                "@type": "ListItem" as const,
                position: i + 2,
                name: crumb.name,
                item: `${siteUrl}${crumb.path}`,
            })),
        ],
    };
}

export function getFAQSchema(items: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };
}

export function getReviewSchema(testimonials: Testimonial[]) {
    // The aggregateRating uses the Yelp-wide numbers (49 reviews, 4.5 stars)
    // to represent the business's overall rating across platforms.
    // The individual review[] array below contains the on-site testimonials
    // (currently 11) — these are a curated subset, not the full review corpus.
    return {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": businessId,
        name: businessName,
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: YELP_RATING,
            bestRating: "5",
            reviewCount: YELP_REVIEW_COUNT,
        },
        review: testimonials.map((t) => ({
            "@type": "Review",
            author: {
                "@type": "Person",
                name: t.name,
            },
            reviewRating: {
                "@type": "Rating",
                ratingValue: t.rating,
                bestRating: 5,
            },
            reviewBody: t.quote,
        })),
    };
}
