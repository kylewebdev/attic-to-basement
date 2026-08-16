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
        id: "rancho-cordova-august-2026",
        title: "50% OFF SUNDAY - LIFETIME COLLECTION: COINS, ART & HOLIDAY TREASURES",
        dates: "August 14–16th, 2026 | 9 AM – 2 PM",
        startDate: "2026-08-14",
        endDate: "2026-08-16",
        area: "Rancho Cordova, CA",
        categories: ["Collectibles", "Art", "Glassware", "Coins"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Rancho-Cordova/95670/5030841",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/rancho-cordova/95670/50-off-sunday-lifetime-collection-2456101",
    },
    {
        id: "sacramento-college-glen-estate-august-2026",
        title: "COLLEGE/GLEN ESTATE SALE",
        dates: "August 20–22nd, 2026 | 9 AM – 3 PM",
        startDate: "2026-08-20",
        endDate: "2026-08-22",
        area: "Sacramento, CA",
        categories: ["Fashion", "Antiques", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95826/5025621",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95826/collegeglen-estate-sale-2455406",
    },
    {
        id: "sacramento-full-home-treasures-august-2026",
        title: "FULL HOME OF TREASURES!",
        dates: "August 20–22nd, 2026 | 9 AM – 2 PM",
        startDate: "2026-08-20",
        endDate: "2026-08-22",
        area: "Sacramento, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95819/5041365",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95819/full-home-of-treasures-2457534",
    },
    {
        id: "sacramento-fashion-furniture-august-2026",
        title: "SACRAMENTO FASHION & FURNITURE",
        dates: "August 27–29th, 2026 | 9 AM – 3 PM",
        startDate: "2026-08-27",
        endDate: "2026-08-29",
        area: "Sacramento, CA",
        categories: ["Fashion", "Furniture", "Vinyl Records"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95820/5041263",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95820/sacramento-fashion-furniture-2457521",
    },
];
