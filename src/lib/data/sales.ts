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
        id: "sacramento-september-2026",
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
    {
        id: "auburn-september-2026",
        title: "EVERYTHING YOU NEED IN AUBURN!!",
        dates: "September 24–26th, 2026 | 9 AM – 2 PM",
        startDate: "2026-09-24",
        endDate: "2026-09-26",
        area: "Auburn, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Auburn/95603/5087181",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/auburn/95603/everything-you-need-in-auburn-2463970",
    },
    {
        id: "shingle-springs-october-2026",
        title: "VINTAGE MEETS MODERN IN CAMERON PARK!",
        dates: "October 1–3rd, 2026 | 9 AM – 2 PM",
        startDate: "2026-10-01",
        endDate: "2026-10-03",
        area: "Shingle Springs, CA",
        categories: ["Furniture", "Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Shingle-Springs/95682/5086728",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/cameron-park/95682/vintage-meets-modern-in-cameron-2463915",
    },
];
