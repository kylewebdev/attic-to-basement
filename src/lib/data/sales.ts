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
        id: "natomas-april-2026",
        title: "Farmhouse Finds in Natomas",
        dates: "April 17–19th, 2026 | 9 AM – 3 PM",
        startDate: "2026-04-17",
        endDate: "2026-04-19",
        area: "Sacramento, CA",
        categories: ["Farmhouse", "Vintage Clothing", "Leather Apparel", "Household"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95835/4869123",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95835/farmhouse-finds-in-natomas-2433660",
    },
    {
        id: "rocklin-april-2026",
        title: "Old Rocklin Charm: Antiques & Treasures",
        dates: "April 17–19th, 2026 | 9 AM – 3 PM",
        startDate: "2026-04-17",
        endDate: "2026-04-19",
        area: "Rocklin, CA",
        categories: ["Antiques", "Vintage", "Treasures", "Household"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Rocklin/95765/4874016",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/rocklin/95765/old-rocklin-charm-antiques-treasures-2434372",
    },
    {
        id: "gilroy-april-2026",
        title: "Grand Gilroy Sale — Decades of Collecting",
        dates: "April 17–19th, 2026 | 9 AM – 2 PM",
        startDate: "2026-04-17",
        endDate: "2026-04-19",
        area: "Gilroy, CA",
        categories: ["Collectibles", "Vintage", "Household"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Gilroy/95020/4877367",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/gilroy/95020/grand-gilroy-sale-decades-of-2434821",
    },
];
