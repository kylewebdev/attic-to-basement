export interface Sale {
    id: string;
    title: string;
    dates: string;
    area: string;
    categories: string[];
    externalUrlNet?: string;
    externalUrlOrg?: string;
    imageAlt?: string;
}

export const sales: Sale[] = [
    {
        id: "cameron-park-february-2026",
        title: "Cameron Park — Vintage & Antique Blow Out Sale",
        dates: "February 28, 2026 | 3 PM",
        area: "Cameron Park, CA",
        categories: ["Vintage", "Antiques", "Military Collectibles"],
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/cameron-park/95682/30-off-blow-out-sale-2426359",
    },
    {
        id: "sacramento-vintage-modern-march-2026",
        title: "Sacramento — Vintage & Modern Mix Estate Sale",
        dates: "March 1, 2026 | 2 PM",
        area: "Sacramento, CA",
        categories: ["Vintage", "Modern Furnishings"],
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95826/vintage-modern-mix-estate-sale-2426680",
    },
    {
        id: "rancho-cordova-march-2026",
        title: "Rancho Cordova — Atomic Age Accents & Cozy Classics",
        dates: "March 1, 2026 | 2 PM",
        area: "Rancho Cordova, CA",
        categories: ["Mid-Century Modern", "Vintage"],
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/rancho-cordova/95670/atomic-age-accents-cozy-classics-2426719",
    },
    {
        id: "sacramento-sea-ray-march-2026",
        title: "Sacramento — Sea Ray Boat, Tools, Sporting Goods & Antiques",
        dates: "March 1, 2026 | 2 PM",
        area: "Sacramento, CA",
        categories: [
            "Boats & Watercraft",
            "Tools",
            "Sporting Goods",
            "Antiques",
        ],
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95826/1987-sea-ray-43-v6-2426855",
    },
    {
        id: "sacramento-natomas-march-2026",
        title: "Sacramento — Nifty Natomas Sale",
        dates: "March 6, 2026 | 9 AM",
        area: "Sacramento, CA",
        categories: ["Clothing", "Books", "Kitchen Items", "Jewelry"],
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95835/nifty-natomas-sale-2426361",
    },
];
