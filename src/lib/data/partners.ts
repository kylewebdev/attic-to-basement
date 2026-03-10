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
    // {
    //     name: "Example Law Firm",
    //     description:
    //         "Probate and estate planning attorneys serving Sacramento County.",
    //     url: "https://example.com",
    //     category: "legal",
    // },
    // --- Real Estate Professionals ---
    // {
    //     name: "Example Realty",
    //     description:
    //         "Residential real estate specialists in Northern California.",
    //     url: "https://example.com",
    //     category: "real-estate",
    // },
    // --- Senior Services ---
    // {
    //     name: "Example Senior Move Manager",
    //     description:
    //         "Full-service senior relocation and downsizing assistance.",
    //     url: "https://example.com",
    //     category: "senior-services",
    // },
    // --- Donation & Charity ---
    // {
    //     name: "Example Charity",
    //     description:
    //         "Accepting furniture, clothing, and household goods donations.",
    //     url: "https://example.com",
    //     category: "donation",
    // },
    // --- Cleanup & Hauling ---
    // {
    //     name: "Example Hauling Co.",
    //     description: "Junk removal and property cleanout services.",
    //     url: "https://example.com",
    //     category: "cleanup",
    // },
    // --- Industry Resources ---
    {
        name: "EstateSales.net",
        url: "https://www.estatesales.net",
        category: "industry",
    },
    {
        name: "EstateSales.org",
        url: "https://www.estatesales.org",
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
