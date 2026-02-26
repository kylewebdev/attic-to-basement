import type { Testimonial } from "@/lib/data/testimonials";

const siteUrl = "https://abeliquidators.com";
const businessName = "Attic to Basement Estate Liquidators";
const businessId = `${siteUrl}/#business`;

const sameAs = [
    "https://www.instagram.com/abe.liquidators",
    "https://www.bbb.org",
    "https://www.yelp.com",
    "https://www.estatesales.net",
    "https://www.estatesales.org",
];

export function getLocalBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": businessId,
        name: businessName,
        url: siteUrl,
        telephone: "+19165211077",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Sacramento",
            addressRegion: "CA",
            postalCode: "95821",
            addressCountry: "US",
        },
        logo: `${siteUrl}/logo.webp`,
        image: `${siteUrl}/logo.webp`,
        sameAs,
        areaServed: {
            "@type": "GeoCircle",
            geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: 38.5816,
                longitude: -121.4944,
            },
            geoRadius: "150",
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
            "@type": "LocalBusiness",
            "@id": businessId,
        },
        areaServed: {
            "@type": "State",
            name: "California",
        },
    };
}

export function getBreadcrumbSchema(
    crumbs: { name: string; path: string }[]
) {
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

export function getReviewSchema(testimonials: Testimonial[]) {
    const total = testimonials.length;
    const avg =
        testimonials.reduce((sum, t) => sum + t.rating, 0) / total;

    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": businessId,
        name: businessName,
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: avg.toFixed(1),
            bestRating: "5",
            reviewCount: total,
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
