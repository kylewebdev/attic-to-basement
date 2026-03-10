export type PartnerCategory =
    | "legal"
    | "real-estate"
    | "senior-services"
    | "donation"
    | "cleanup"
    | "industry";

export interface Partner {
    name: string;
    description: string;
    url: string;
    category: PartnerCategory;
}

export interface ExternalResource {
    title: string;
    description: string;
    url: string;
}

export const categoryLabels: Record<PartnerCategory, string> = {
    legal: "Estate & Probate Attorneys",
    "real-estate": "Real Estate Professionals",
    "senior-services": "Senior Services",
    donation: "Donation & Charity",
    cleanup: "Cleanup & Hauling",
    industry: "Industry Resources",
};

// Order determines display order on the page
export const categoryOrder: PartnerCategory[] = [
    "legal",
    "real-estate",
    "senior-services",
    "donation",
    "cleanup",
    "industry",
];

export const partners: Partner[] = [
    // --- Estate & Probate Attorneys ---
    {
        name: "Meyers Law Group",
        description:
            "Probate, trust administration, and estate planning for Sacramento County families.",
        url: "https://www.meyerslawgroup.com",
        category: "legal",
    },
    {
        name: "Weintraub Tobin",
        description:
            "Full-service estate and trust litigation attorneys serving Northern California.",
        url: "https://www.weintraub.com",
        category: "legal",
    },
    // --- Real Estate Professionals ---
    {
        name: "Lyon Real Estate",
        description:
            "Sacramento's largest independent brokerage, specializing in residential sales and estate properties.",
        url: "https://www.golyon.com",
        category: "real-estate",
    },
    {
        name: "Coldwell Banker Sacramento",
        description:
            "Trusted real estate professionals helping families with estate home sales and transitions.",
        url: "https://www.coldwellbanker.com",
        category: "real-estate",
    },
    // --- Senior Services ---
    {
        name: "Caring Transitions of Sacramento",
        description:
            "Senior relocation, downsizing, and estate clearing services.",
        url: "https://www.caringtransitions.com",
        category: "senior-services",
    },
    {
        name: "A Place for Mom",
        description:
            "Free senior living referral service for families exploring care options.",
        url: "https://www.aplaceformom.com",
        category: "senior-services",
    },
    // --- Donation & Charity ---
    {
        name: "Goodwill Sacramento Valley",
        description:
            "Accepting furniture, clothing, and household goods. Free pickup available for large donations.",
        url: "https://www.goodwill.org",
        category: "donation",
    },
    {
        name: "Sacramento SPCA Thrift Store",
        description:
            "Donate household items and furniture to support local animal welfare programs.",
        url: "https://www.sspca.org",
        category: "donation",
    },
    {
        name: "Habitat for Humanity ReStore",
        description:
            "Accepts furniture, appliances, and building materials. Proceeds fund affordable housing.",
        url: "https://www.habitat.org/restores",
        category: "donation",
    },
    // --- Cleanup & Hauling ---
    {
        name: "College Hunks Hauling Junk",
        description:
            "Full-service junk removal and property cleanout for estates and homes.",
        url: "https://www.collegehunkshaulingjunk.com",
        category: "cleanup",
    },
    {
        name: "1-800-GOT-JUNK?",
        description:
            "On-demand junk removal and post-estate-sale cleanup services.",
        url: "https://www.1800gotjunk.com",
        category: "cleanup",
    },
    // --- Industry Resources ---
    {
        name: "EstateSales.net",
        description:
            "Browse upcoming estate sales and find liquidators nationwide.",
        url: "https://www.estatesales.net",
        category: "industry",
    },
    {
        name: "EstateSales.org",
        description:
            "Estate sale listings and company reviews across the country.",
        url: "https://www.estatesales.org",
        category: "industry",
    },
    {
        name: "American Society of Estate Liquidators",
        description:
            "Professional standards and education for the estate liquidation industry.",
        url: "https://www.aselonline.com",
        category: "industry",
    },
];

export const externalResources: ExternalResource[] = [
    // {
    //     title: "California Probate Code Overview",
    //     description:
    //         "Official California legislature resources on probate law and estate administration.",
    //     url: "https://example.com",
    // },
];
