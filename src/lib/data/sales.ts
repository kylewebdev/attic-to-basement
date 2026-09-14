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
        id: "elk-grove-september-2026",
        title: "BEAUTIFUL ELK GROVE ESTATE SALE",
        dates: "September 17–19th, 2026 | 9 AM – 3 PM",
        startDate: "2026-09-17",
        endDate: "2026-09-19",
        area: "Elk Grove, CA",
        categories: ["Furniture", "Collectibles", "Antiques"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Elk-Grove/95757/5061405",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/elk-grove/95757/beautiful-elk-grove-estate-sale-2460391",
    },
    {
        id: "sacramento-garage-finds-vintage-september-2026",
        title: "GARAGE FINDS & VINTAGE TREASURES!",
        dates: "September 17–19th, 2026 | 9 AM – 2 PM",
        startDate: "2026-09-17",
        endDate: "2026-09-19",
        area: "Sacramento, CA",
        categories: ["Vintage", "Antiques", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95842/5068824",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95842/garage-finds-vintage-treasures-2461389",
    },
    {
        id: "antelope-september-2026",
        title: "TOYS, TOONS, & TREASURE HUNTS",
        dates: "September 17–19th, 2026 | 9 AM – 2 PM",
        startDate: "2026-09-17",
        endDate: "2026-09-19",
        area: "Antelope, CA",
        categories: ["Toys", "Antiques", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Antelope/95843/5077824",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/antelope/95843/toys-toons-treasure-hunts-2462705",
    },
    {
        id: "sacramento-southland-park-treasures-september-2026",
        title: "SOUTHLAND PARK TREASURES!",
        dates: "September 19–20th, 2026 | 9 AM – 2 PM",
        startDate: "2026-09-19",
        endDate: "2026-09-20",
        area: "Sacramento, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95822/5072979",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento-/95822/southland-park-treasures-2462018",
    },
];
