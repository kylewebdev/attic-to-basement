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
        id: "elk-grove-lovely-estate-sale-june-2026",
        title: "Lovely Elk Grove Estate Sale",
        dates: "June 27–28th, 2026 | 9 AM – 3 PM",
        startDate: "2026-06-27",
        endDate: "2026-06-28",
        area: "Elk Grove, CA",
        categories: ["Furniture", "Home Decor", "Kitchenware", "Barware"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Elk-Grove/95758/4970424",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/elk-grove/95758/lovely-elk-grove-estate-sale-2447694",
    },
    {
        id: "sacramento-back-in-sac-june-2026",
        title: "Back in Sac, With Tons of Fun",
        dates: "June 27–28th, 2026 | 9 AM – 3 PM",
        startDate: "2026-06-27",
        endDate: "2026-06-28",
        area: "Sacramento, CA",
        categories: ["Furniture", "Home Decor", "Collectibles", "Estate Items"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95834/4974015",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento-/95834/back-and-sac-with-tons-2448152",
    },
    {
        id: "sacramento-carmichael-jam-packed-june-2026",
        title: "Jam Packed Sacramento/Carmichael Home!!",
        dates: "June 30 – July 2nd, 2026 | 9 AM – 2 PM",
        startDate: "2026-06-30",
        endDate: "2026-07-02",
        area: "Sacramento, CA",
        categories: ["Bedroom Set", "Vinyl Records", "Vintage Christmas", "Uranium Glass"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95821/4955628",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95821/dates-changed-jam-packed-sacramentocarmichael-2445535",
    },
];
