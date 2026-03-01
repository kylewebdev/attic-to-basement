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
        id: "sacramento-vintage-modern-march-2026",
        title: "Sacramento — 50% Off Sunday: Vintage & Modern Mix Estate Sale",
        dates: "February 27 & March 1, 2026 | 9 AM – 2 PM",
        area: "Sacramento, CA",
        categories: ["Vintage", "Modern Furnishings"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95826/4817208",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95826/50-off-sunday-vintage-modern-2426680",
    },
    {
        id: "rancho-cordova-march-2026",
        title: "Rancho Cordova — Atomic Age Accents & Cozy Classics",
        dates: "February 27 & March 1, 2026 | 9 AM – 2 PM",
        area: "Rancho Cordova, CA",
        categories: ["Mid-Century Modern", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Rancho-Cordova/95670/4817574",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/rancho-cordova/95670/atomic-age-accents-cozy-classics-2426719",
    },
    {
        id: "sacramento-sea-ray-march-2026",
        title: "Sacramento — 1987 Sea Ray 4.3 V6 Boat, Tools, Sporting Goods, Antiques & More",
        dates: "February 27 & March 1, 2026 | 9 AM – 2 PM",
        area: "Sacramento, CA",
        categories: [
            "Boats & Watercraft",
            "Tools",
            "Sporting Goods",
            "Antiques",
        ],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95826/4818621",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95826/1987-sea-ray-43-v6-2426855",
    },
    {
        id: "sacramento-natomas-march-2026",
        title: "Sacramento — Nifty Natomas Sale",
        dates: "March 6, 2026 | 9 AM",
        area: "Sacramento, CA",
        categories: ["Clothing", "Luggage", "Books", "Kitchen Items", "Jewelry"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95835/4814823",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95835/nifty-natomas-sale-2426361",
    },
    {
        id: "west-sacramento-march-2026",
        title: "West Sacramento — Scent-sational Treasures",
        dates: "March 6, 2026 | 9 AM",
        area: "West Sacramento, CA",
        categories: ["Home Goods", "Collectibles", "Décor"],
        externalUrlNet:
            "https://www.estatesales.net/CA/West-Sacramento/95691/4823448",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/west-sacramento-/95691/scentsational-treasures-2427554",
    },
];
