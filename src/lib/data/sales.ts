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
        id: "lincoln-october-2026",
        title: "CLEAN LINCOLN ESTATE SALE",
        dates: "October 22–24th, 2026 | 9 AM – 3 PM",
        startDate: "2026-10-22",
        endDate: "2026-10-24",
        area: "Lincoln, CA",
        categories: ["Jewelry", "Furniture", "Collectibles", "Vintage", "Art"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Lincoln/95648/5115462",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/lincoln/95648/clean-lincoln-estate-sale-2467795",
    },
    {
        id: "vacaville-october-2026",
        title: "*STARTING FRIDAY* RUSTY TO RICHES!",
        dates: "October 23–25th, 2026 | 9 AM – 2 PM",
        startDate: "2026-10-23",
        endDate: "2026-10-25",
        area: "Vacaville, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Vacaville/95687/5112324",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/vacaville/95687/starting-friday-rusty-to-riches-2467342",
    },
    {
        id: "sacramento-october-2026",
        title: "DESIGNER THREADS & ASIAN TREASURES",
        dates: "October 23–25th, 2026 | 9 AM – 2 PM",
        startDate: "2026-10-23",
        endDate: "2026-10-25",
        area: "Sacramento, CA",
        categories: ["Furniture", "Vintage", "Art"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95831/5123064",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95831/designer-threads-asian-treasures-2468866",
    },
    {
        id: "elk-grove-october-2026",
        title: "PACKED TO THE BRIM OF DECADES FROM ONE LARGE FAMILY",
        dates: "October 30 – November 1st, 2026 | 9 AM – 3 PM",
        startDate: "2026-10-30",
        endDate: "2026-11-01",
        area: "Elk Grove, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Elk-Grove/95624/5124207",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/elk-grove/95624/packed-to-the-brim-of-2469021",
    },
];
