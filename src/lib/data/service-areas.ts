export interface ServiceArea {
    city: string;
    slug: string;
    county: string;
    zip: string;
}

export interface ServiceType {
    name: string;
    slug: string;
    parentPaths: string[];
    description: (city: string, county: string) => string;
    metaDescription: (city: string, county: string) => string;
    keywords: (city: string, county: string) => string[];
    intro: (city: string, county: string) => string;
    benefits: string[];
    processSteps: { title: string; description: string }[];
    crossLinkText: (city: string) => string;
}

export const cities: ServiceArea[] = [
    { city: "Sacramento", slug: "sacramento", county: "Sacramento", zip: "95821" },
    { city: "Citrus Heights", slug: "citrus-heights", county: "Sacramento", zip: "95610" },
    { city: "Elk Grove", slug: "elk-grove", county: "Sacramento", zip: "95624" },
    { city: "Rancho Cordova", slug: "rancho-cordova", county: "Sacramento", zip: "95670" },
    { city: "West Sacramento", slug: "west-sacramento", county: "Yolo", zip: "95691" },
    { city: "Roseville", slug: "roseville", county: "Placer", zip: "95678" },
    { city: "Rocklin", slug: "rocklin", county: "Placer", zip: "95677" },
    { city: "Lincoln", slug: "lincoln", county: "Placer", zip: "95648" },
    { city: "Auburn", slug: "auburn", county: "Placer", zip: "95603" },
    { city: "Folsom", slug: "folsom", county: "Sacramento", zip: "95630" },
    { city: "Placerville", slug: "placerville", county: "El Dorado", zip: "95667" },
    { city: "El Dorado Hills", slug: "el-dorado-hills", county: "El Dorado", zip: "95762" },
];

export const services: ServiceType[] = [
    {
        name: "Estate Sales",
        slug: "estate-sales",
        parentPaths: ["/estate-sales", "/estate-liquidation"],
        description: (city, county) =>
            `Professional estate sale and estate liquidation services in ${city}, ${county} County. Full-service estate sales from setup to cleanup.`,
        metaDescription: (city, county) =>
            `Looking for estate sales in ${city}, CA? Attic To Basement Estate Liquidators provides full-service estate sales and liquidation in ${city} and ${county} County. Free consultation. Call (916) 521-1077.`,
        keywords: (city, county) => [
            `estate sales ${city}`,
            `estate sales in ${city}`,
            `estate sale companies ${city}`,
            `estate liquidation ${city}`,
            `estate sale services ${city}`,
            `estate sales ${county} county`,
            `estate sale company near ${city}`,
            `${city} estate sales`,
        ],
        intro: (city, county) =>
            `Attic To Basement Estate Liquidators provides professional estate sales in ${city} and throughout ${county} County. Whether you are downsizing, settling a loved one's estate, or preparing a property for sale, our team handles every detail — from organizing and pricing to marketing, sale day execution, and cleanup. We have over 20 years of combined experience helping families across Northern California, and we bring that same care and expertise to every estate sale in ${city}.`,
        benefits: [
            "Full-service estate sale management from start to finish",
            "Expert pricing based on current market values",
            "Professional marketing across multiple platforms",
            "Sale day staffing and execution",
            "Post-sale cleanup, donation coordination, and property clearing",
            "Itemized accounting of every sale",
        ],
        processSteps: [
            {
                title: "Free Consultation",
                description:
                    "We visit your property, walk through the contents, and discuss your goals and timeline. No obligation.",
            },
            {
                title: "Setup and Pricing",
                description:
                    "Our team organizes, stages, and prices every item based on current market values and our years of experience.",
            },
            {
                title: "Marketing",
                description:
                    "We list your estate sale on EstateSales.net, EstateSales.org, social media, and our own channels to maximize buyer turnout.",
            },
            {
                title: "Sale Day",
                description:
                    "Our professional staff manages every aspect of the sale — greeting buyers, handling transactions, and keeping things running smoothly.",
            },
            {
                title: "Cleanup and Closeout",
                description:
                    "After the sale, we handle remaining items through buyout, donation, or disposal. You receive a full accounting of all sales.",
            },
        ],
        crossLinkText: (city) =>
            `We also offer professional personal property appraisals in ${city}`,
    },
    {
        name: "Personal Property Appraisals",
        slug: "appraisals",
        parentPaths: ["/appraisals"],
        description: (city, county) =>
            `Professional personal property appraisals in ${city}, ${county} County. Accurate valuations for estate sales, insurance, probate, and more.`,
        metaDescription: (city, county) =>
            `Need a personal property appraisal in ${city}, CA? Attic To Basement Estate Liquidators offers expert valuations for estate sales, insurance, probate, and more in ${county} County. Call (916) 521-1077.`,
        keywords: (city, county) => [
            `personal property appraisals ${city}`,
            `estate appraisal ${city}`,
            `antique appraisal ${city}`,
            `property appraisal services ${county} county`,
            `estate sale appraisal ${city}`,
            `household goods appraisal ${city}`,
        ],
        intro: (city, county) =>
            `Attic To Basement Estate Liquidators provides accurate, professional personal property appraisals in ${city} and throughout ${county} County. Whether you need valuations for an upcoming estate sale, insurance documentation, probate proceedings, or charitable donations, our team delivers expert assessments backed by over 20 years of experience. We appraise household goods, antiques, collectibles, fine art, jewelry, and more.`,
        benefits: [
            "Accurate, market-informed valuations",
            "Coverage across all personal property categories",
            "Appraisals for estate sales, insurance, probate, and donations",
            "Over 20 years of combined experience",
            "Fully insured, bonded, and BBB accredited",
            "On-site appraisals at your property",
        ],
        processSteps: [
            {
                title: "Schedule Your Appraisal",
                description:
                    "Contact us to discuss what you need appraised and we will set up a convenient time to visit your property.",
            },
            {
                title: "On-Site Evaluation",
                description:
                    "Our appraiser visits your property to examine, photograph, and evaluate each item based on condition, provenance, and current market values.",
            },
            {
                title: "Detailed Report",
                description:
                    "You receive a comprehensive written appraisal report suitable for estate sales, insurance claims, legal proceedings, or tax purposes.",
            },
        ],
        crossLinkText: (city) =>
            `Looking for full-service estate sales in ${city}? We handle that too`,
    },
];

export function getCityBySlug(slug: string): ServiceArea | undefined {
    return cities.find((c) => c.slug === slug);
}

export function getServiceBySlug(slug: string): ServiceType | undefined {
    return services.find((s) => s.slug === slug);
}
