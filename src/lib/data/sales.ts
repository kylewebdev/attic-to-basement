export interface Sale {
    id: string;
    title: string;
    dates: string;
    /** Last day of the sale in YYYY-MM-DD format (e.g. "2026-03-01"). Used to auto-hide sales after 5 PM on their final day. */
    endDate: string;
    area: string;
    categories: string[];
    externalUrlNet?: string;
    externalUrlOrg?: string;
    imageAlt?: string;
}

/** Returns true if the sale should still be displayed. Hides sales after 5 PM on their end date. */
export function isSaleActive(sale: Sale): boolean {
    const [year, month, day] = sale.endDate.split("-").map(Number);
    const cutoff = new Date(year, month - 1, day, 17, 0, 0); // 5 PM on end date
    return new Date() < cutoff;
}

export const sales: Sale[] = [
    {
        id: "sacramento-vintage-modern-march-2026",
        title: "50% Off Sunday: Vintage & Modern Mix Estate Sale",
        dates: "February 27 – March 1st, 2026 | 9 AM – 2 PM",
        endDate: "2026-03-01",
        area: "Sacramento, CA",
        categories: ["Vintage", "Modern Furnishings"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95826/4817208",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95826/50-off-sunday-vintage-modern-2426680",
    },
    {
        id: "rancho-cordova-march-2026",
        title: "50% Off Sunday: Atomic Age Accents & Cozy Classics",
        dates: "February 27 – March 1st, 2026 | 9 AM – 2 PM",
        endDate: "2026-03-01",
        area: "Rancho Cordova, CA",
        categories: ["Mid-Century Modern", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Rancho-Cordova/95670/4817574",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/rancho-cordova/95670/50-off-sunday-atomic-age-2426719",
    },
    {
        id: "sacramento-sea-ray-march-2026",
        title: "50% Off Sunday: 1987 Sea Ray 4.3 V6 Boat, Tools, Sporting Goods, Antiques & Much More",
        dates: "February 27 – March 1st, 2026 | 9 AM – 2 PM",
        endDate: "2026-03-01",
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
            "https://estatesales.org/estate-sales/ca/sacramento/95826/50-off-sunday-1987-sea-2426855",
    },
    {
        id: "sacramento-natomas-march-2026",
        title: "Nifty Natomas Sale",
        dates: "March 6–7th, 2026 | 9 AM – 3 PM",
        endDate: "2026-03-07",
        area: "Sacramento, CA",
        categories: [
            "Clothing",
            "Luggage",
            "Books",
            "Kitchen Items",
            "Jewelry",
        ],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95835/4814823",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95835/nifty-natomas-sale-2426361",
    },
    {
        id: "west-sacramento-march-2026",
        title: "Scent-sational Treasures",
        dates: "March 6–8th, 2026 | 9 AM – 2 PM",
        endDate: "2026-03-08",
        area: "West Sacramento, CA",
        categories: ["Home Goods", "Collectibles", "Décor"],
        externalUrlNet:
            "https://www.estatesales.net/CA/West-Sacramento/95691/4823448",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/west-sacramento-/95691/scentsational-treasures-2427554",
    },
    {
        id: "citrus-heights-march-2026",
        title: "Treasures From Around the Globe",
        dates: "March 6–8th, 2026 | 9 AM – 3 PM",
        endDate: "2026-03-08",
        area: "Citrus Heights, CA",
        categories: ["Collectibles", "Antiques", "Décor"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Citrus-Heights/95610/4823748",
    },
];
