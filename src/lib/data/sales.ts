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
        id: "sacramento-october-2026",
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
