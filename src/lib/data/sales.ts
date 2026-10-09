export interface Sale {
    id: string;
    title: string;
    dates: string;
    /** First day of the sale in YYYY-MM-DD format (e.g. "2026-03-01"). */
    startDate: string;
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
        id: "rancho-cordova-october-2026",
        title: "GOLD RIVER WORLD TRAVELER HIGH-END COLLECTOR METICULOUS HOME OF TREASURES",
        dates: "October 8–10th, 2026 | 9 AM – 3 PM",
        startDate: "2026-10-08",
        endDate: "2026-10-10",
        area: "Rancho Cordova, CA",
        categories: ["Collectibles", "Antiques", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Rancho-Cordova/95670/5090682",
    },
    {
        id: "lincoln-october-2026",
        title: "LUXURIOUS LINCOLN HILLS ESTATE!",
        dates: "October 8–10th, 2026 | 9 AM – 2 PM",
        startDate: "2026-10-08",
        endDate: "2026-10-10",
        area: "Lincoln, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Lincoln/95648/5107116",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/lincoln/95648/luxurious-lincoln-hills-estate-2466620",
    },
    {
        id: "sacramento-radiant-rosemont-estate-october-2026",
        title: "RADIANT ROSEMONT ESTATE SALE",
        dates: "October 9–11th, 2026 | 9 AM – 3 PM",
        startDate: "2026-10-09",
        endDate: "2026-10-11",
        area: "Sacramento, CA",
        categories: ["Furniture", "Vintage", "Vinyl Records", "Books"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95826/5101404",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95826/radiant-rosemont-estate-sale-2465890",
    },
    {
        id: "sacramento-workshop-clowns-holiday-october-2026",
        title: "WORKSHOP, CLOWNS AND HOLIDAY DECOR!",
        dates: "October 9–11th, 2026 | 9 AM – 2 PM",
        startDate: "2026-10-09",
        endDate: "2026-10-11",
        area: "Sacramento, CA",
        categories: ["Tools", "Home Decor", "Antiques"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95822/5107410",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento-/95822/workshop-clowns-and-holiday-decor-2466651",
    },
    {
        id: "sacramento-high-end-mancave-october-2026",
        title: "HIGH END MANCAVE!",
        dates: "October 10–11th, 2026 | 9 AM – 2 PM",
        startDate: "2026-10-10",
        endDate: "2026-10-11",
        area: "Sacramento, CA",
        categories: ["Collectibles", "Tools", "Outdoors"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95829/5109324",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95829/high-end-mancave-2466901",
    },
    {
        id: "sacramento-asian-meets-modern-october-2026",
        title: "ASIAN MEETS MODERN IN SACRAMENTO/NATOMAS",
        dates: "October 15–17th, 2026 | 9 AM – 2 PM",
        startDate: "2026-10-15",
        endDate: "2026-10-17",
        area: "Sacramento, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95834/5109321",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95834/asian-meets-modern-in-sacramentonatomas-2466900",
    },
    {
        id: "vacaville-october-2026",
        title: "RUSTY TO RICHES!",
        dates: "October 22–24th, 2026 | 9 AM – 2 PM",
        startDate: "2026-10-22",
        endDate: "2026-10-24",
        area: "Vacaville, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Vacaville/95687/5112324",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/vacaville/95687/rusty-to-riches-2467342",
    },
];
