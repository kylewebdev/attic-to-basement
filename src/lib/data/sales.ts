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
        id: "elk-grove-october-2026",
        title: "25% OFF SATURDAY!!!! PACKED TO THE BRIM OF DECADES FROM ONE LARGE FAMILY CLOTHES, TOOLS, ETC.",
        dates: "October 30 – November 1st, 2026 | 9 AM – 3 PM",
        startDate: "2026-10-30",
        endDate: "2026-11-01",
        area: "Elk Grove, CA",
        categories: ["Fashion", "Tools", "Antiques"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Elk-Grove/95624/5124207",
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
