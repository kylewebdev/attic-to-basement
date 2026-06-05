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
        id: "rocklin-faith-books-treasures-june-2026",
        title: "Faith, Books & Treasures Estate Sale!",
        dates: "June 5–7th, 2026 | 9 AM – 3 PM",
        startDate: "2026-06-05",
        endDate: "2026-06-07",
        area: "Rocklin, CA",
        categories: ["Books", "Religious Items", "Estate Treasures"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Rocklin/95677/4944396",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/rocklin/95677/faith-books-treasures-estate-sale-2443944",
    },
    {
        id: "carmichael-unique-tour-items-june-2026",
        title: "Carmichael Home Filled With Unique Items Collected While On Tour",
        dates: "June 5–7th, 2026 | 9 AM – 3 PM",
        startDate: "2026-06-05",
        endDate: "2026-06-07",
        area: "Carmichael, CA",
        categories: ["Unique Collectibles", "Travel Finds", "Estate Treasures"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Carmichael/95608/4946076",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/carmichael/95608/carmichael-home-full-of-unique-2444154",
    },
    {
        id: "rancho-cordova-gold-river-june-2026",
        title: "Glamorous Gold River Sale",
        dates: "June 5–7th, 2026 | 9 AM – 2 PM",
        startDate: "2026-06-05",
        endDate: "2026-06-07",
        area: "Rancho Cordova, CA",
        categories: ["Glamorous Decor", "Home Furnishings", "Estate Finds"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Rancho-Cordova/95670/4946085",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/rancho-cordova/95670/glamorous-gold-river-sale-2444151",
    },
    {
        id: "sacramento-lladro-crystal-christmas-june-2026",
        title: "Lladro, Crystal, Christmas & Much More!",
        dates: "June 12–14th, 2026 | 9 AM – 3 PM",
        startDate: "2026-06-12",
        endDate: "2026-06-14",
        area: "Sacramento, CA",
        categories: ["Lladro Figurines", "Crystal", "Christmas Decor", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95835/4944393",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95835/lladro-crystal-christmas-much-more-2443943",
    },
];
