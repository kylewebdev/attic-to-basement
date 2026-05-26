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
        id: "gilroy-second-round-may-2026",
        title: "Second Round in Gilroy!!",
        dates: "May 29–31st, 2026 | 9 AM – 3 PM",
        startDate: "2026-05-29",
        endDate: "2026-05-31",
        area: "Gilroy, CA",
        categories: ["Estate Treasures", "Vintage Finds", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Gilroy/95020/4932828",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/gilroy/95020/second-round-in-gilroy-2442374",
    },
    {
        id: "winters-super-clean-may-2026",
        title: "Wonderful Winters Home Super Clean",
        dates: "May 29–31st, 2026 | 9 AM – 3 PM",
        startDate: "2026-05-29",
        endDate: "2026-05-31",
        area: "Winters, CA",
        categories: ["Home Furnishings", "Estate Finds", "Vintage Treasures"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Winters/95694/4933215",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/winters/95694/wonderful-winters-home-super-clean-2442442",
    },
    {
        id: "sacramento-parkways-may-2026",
        title: "Picking in the Parkways",
        dates: "May 29–31st, 2026 | 9 AM – 3 PM",
        startDate: "2026-05-29",
        endDate: "2026-05-31",
        area: "Sacramento, CA",
        categories: ["Collections", "Vintage Finds", "Estate Treasures"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95833/4933278",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95823/picking-in-the-parkways-2442450",
    },
];
