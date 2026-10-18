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
        id: "sacramento-50-off-sunday-october-2026",
        title: "50% OFF SUNDAY COLLECTIBLES IN LEMON HILL",
        dates: "October 16–18th, 2026 | 9 AM – 3 PM",
        startDate: "2026-10-16",
        endDate: "2026-10-18",
        area: "Sacramento, CA",
        categories: ["Collectibles", "Antiques", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95824/5115456",
    },
    {
        id: "roseville-october-2026",
        title: "50% OFF SUNDAY - ART, ATTIRE & EVERYTHING IN BETWEEN!",
        dates: "October 16–18th, 2026 | 9 AM – 2 PM",
        startDate: "2026-10-16",
        endDate: "2026-10-18",
        area: "Roseville, CA",
        categories: ["Art", "Antiques", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Roseville/95747/5116968",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/roseville/95747/50-off-sunday-art-attire-2467969",
    },
    {
        id: "vacaville-october-2026",
        title: "RUSTY TO RICHES!",
        dates: "October 22–24th, 2026 | 9 AM – 2 PM",
        startDate: "2026-10-22",
        endDate: "2026-10-24",
        area: "Vacaville, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Vacaville/95687/5112324",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/vacaville/95687/rusty-to-riches-2467342",
    },
    {
        id: "lincoln-october-2026",
        title: "CLEAN LINCOLN ESTATE SALE",
        dates: "October 22–24th, 2026 | 9 AM – 3 PM",
        startDate: "2026-10-22",
        endDate: "2026-10-24",
        area: "Lincoln, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Lincoln/95648/5115462",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/lincoln/95648/clean-lincoln-estate-sale-2467795",
    },
    {
        id: "citrus-heights-october-2026",
        title: "TRAILER PARK TREASURES",
        dates: "October 22–24th, 2026 | 9 AM – 2 PM",
        startDate: "2026-10-22",
        endDate: "2026-10-24",
        area: "Citrus Heights, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Citrus-Heights/95621/5123859",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/citrus-heights/95621/trailer-park-treasures-2468980",
    },
    {
        id: "sacramento-designer-threads-asian-october-2026",
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
];
