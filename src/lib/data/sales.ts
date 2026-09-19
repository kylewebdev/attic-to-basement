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
        id: "sacramento-antlers-to-ornaments-september-2026",
        title: "ANTLERS TO ORNAMENTS",
        dates: "September 20–21st, 2026 | 9 AM – 2 PM",
        startDate: "2026-09-20",
        endDate: "2026-09-21",
        area: "Sacramento, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95816/5079273",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95816/antlers-to-ornaments-2462861",
    },
    {
        id: "sacramento-southland-park-treasures-september-2026",
        title: "SOUTHLAND PARK TREASURES!",
        dates: "September 24–26th, 2026 | 9 AM – 2 PM",
        startDate: "2026-09-24",
        endDate: "2026-09-26",
        area: "Sacramento, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95822/5072979",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95822/southland-park-treasures-2462018",
    },
];
