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
        id: "roseville-downsizing-may-2026",
        title: "54 Years Same Family Downsizing",
        dates: "May 22–24th, 2026 | 9 AM – 3 PM",
        startDate: "2026-05-22",
        endDate: "2026-05-24",
        area: "Roseville, CA",
        categories: ["Family Heirlooms", "Vintage Finds", "Estate Treasures"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Roseville/95661/4919874",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/roseville/95661/54-years-same-family-downsizing-2440684",
    },
    {
        id: "penryn-barn-bash-may-2026",
        title: "Penryn Barn Bash",
        dates: "May 22–23rd, 2026 | 9 AM – 3 PM",
        startDate: "2026-05-22",
        endDate: "2026-05-23",
        area: "Penryn, CA",
        categories: ["Barn Finds", "Antiques", "Rustic Decor", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Penryn/95663/4922979",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/penryn/95663/penryn-barn-bash-2441157",
    },
    {
        id: "sacramento-toys-may-2026",
        title: "Toys & Treasures Estate Sale",
        dates: "May 22–24th, 2026 | 9 AM – 2 PM",
        startDate: "2026-05-22",
        endDate: "2026-05-24",
        area: "Sacramento, CA",
        categories: ["Toys", "Vintage Toys", "Collectibles", "Estate Finds"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95821/4925244",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95821/toys-treasures-estate-sale-2441428",
    },
    {
        id: "lincoln-cottage-core-may-2026",
        title: "50% Off Sunday Cottage-Core Estate Sale",
        dates: "May 23rd, 2026 | 9 AM",
        startDate: "2026-05-23",
        endDate: "2026-05-23",
        area: "Lincoln, CA",
        categories: ["Cottage Decor", "Vintage", "Estate Finds"],
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/lincoln/95648/50-off-sundaycottagecore-estate-sale-2440408",
    },
];
