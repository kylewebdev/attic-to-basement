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
        id: "sacramento-november-2026",
        title: "25% OFF SUNDAY, COLLECTIBLES & ODDITIES ESTATE SALE",
        dates: "November 7–9th, 2026 | 9 AM – 3 PM",
        startDate: "2026-11-07",
        endDate: "2026-11-09",
        area: "Sacramento, CA",
        categories: ["Mid-Century Furniture", "Antiques", "Collectibles", "Vintage", "Art"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95822/5145162",
    },
    {
        id: "loomis-november-2026",
        title: "HIGH END LOOMIS ESTATE SALE",
        dates: "November 12–14th, 2026 | 9 AM – 2 PM",
        startDate: "2026-11-12",
        endDate: "2026-11-14",
        area: "Loomis, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Loomis/95650/5149587",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/loomis/95650/high-end-loomis-estate-sale-2472284",
    },
    {
        id: "citrus-heights-november-2026",
        title: "TRAILER PARK TREASURES",
        dates: "November 13–14th, 2026 | 9 AM – 2 PM",
        startDate: "2026-11-13",
        endDate: "2026-11-14",
        area: "Citrus Heights, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Citrus-Heights/95621/5123859",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/citrus-heights/95621/trailer-park-treasures-2468980",
    },
];
