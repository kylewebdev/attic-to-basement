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
        id: "sacramento-vintage-variety-may-2026",
        title: "Vintage & Variety Estate Sale",
        dates: "May 8–10th, 2026 | 9 AM – 2 PM",
        startDate: "2026-05-08",
        endDate: "2026-05-10",
        area: "Sacramento, CA",
        categories: ["Vintage", "Estate Finds", "Household"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95816/4906569",
    },
    {
        id: "roseville-may-2026",
        title: "Roseville Home Full of Beautiful Decor and More",
        dates: "May 8–10th, 2026 | 9 AM – 3 PM",
        startDate: "2026-05-08",
        endDate: "2026-05-10",
        area: "Roseville, CA",
        categories: ["Home Decor", "Household", "Estate Finds"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Roseville/95747/4907685",
    },
    {
        id: "sacramento-ming-may-2026",
        title: "Mid Century Meets Ming Dynasty",
        dates: "May 15–17th, 2026 | 9 AM – 3 PM",
        startDate: "2026-05-15",
        endDate: "2026-05-17",
        area: "Sacramento, CA",
        categories: ["Mid-Century Furniture", "Asian Antiques", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95822/4903269",
    },
];
