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
        id: "sacramento-50-off-sunday-october-2026",
        title: "50% OFF SUNDAY - LIFETIME COLLECTION! LOTS OF EVERYTHING!",
        dates: "October 2–4th, 2026 | 9 AM – 2 PM",
        startDate: "2026-10-02",
        endDate: "2026-10-04",
        area: "Sacramento, CA",
        categories: ["Collectibles", "Antiques", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95821/5097882",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95821/50-off-sunday-lifetime-collection-2465437",
    },
    {
        id: "rancho-cordova-october-2026",
        title: "GOLD RIVER METICULOUS HOME OF TREASURES",
        dates: "October 8–10th, 2026 | 9 AM – 3 PM",
        startDate: "2026-10-08",
        endDate: "2026-10-10",
        area: "Rancho Cordova, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Rancho-Cordova/95670/5090682",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/gold-river/95670/gold-river-meticulous-home-of-2464413",
    },
    {
        id: "sacramento-radiant-rosemont-estate-october-2026",
        title: "RADIANT ROSEMONT ESTATE SALE",
        dates: "October 9–11th, 2026 | 9 AM – 3 PM",
        startDate: "2026-10-09",
        endDate: "2026-10-11",
        area: "Sacramento, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95826/5101404",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95826/radiant-rosemont-estate-sale-2465890",
    },
];
