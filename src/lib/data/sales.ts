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
        id: "east-sacramento-march-2026",
        title: "Revved Up Relics in East Sacramento",
        dates: "March 27–29th, 2026 | 9 AM – 2 PM",
        startDate: "2026-03-27",
        endDate: "2026-03-29",
        area: "Sacramento, CA",
        categories: ["Automotive", "Vintage", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95819/4836036",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95819/revved-up-relics-in-east-2429237",
    },
    {
        id: "elk-grove-march-2026",
        title: "Holiday Treasures (Jim Shore & More) & Other Beautiful Finds!",
        dates: "March 28–29th, 2026 | 9 AM – 3 PM",
        startDate: "2026-03-28",
        endDate: "2026-03-29",
        area: "Elk Grove, CA",
        categories: ["Holiday Decor", "Jim Shore", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Elk-Grove/95757/4851429",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/elk-grove/95757/holiday-treasures-jim-shore-more-2431363",
    },
    {
        id: "rio-linda-april-2026",
        title: "Rusty to Riches — A Pickers Dream, Auto, Household & More!",
        dates: "April 3–5th, 2026 | 9 AM – 3 PM",
        startDate: "2026-04-03",
        endDate: "2026-04-05",
        area: "Rio Linda, CA",
        categories: ["Automotive", "Household", "Vintage", "Tools"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Rio-Linda/95673/4857336",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/rio-linda/95673/rusty-to-riches-a-pickers-2432185",
    },
    {
        id: "elk-grove-april-2026",
        title: "A Glass Act — Glass, Trinkets, Knick Knacks & More!",
        dates: "April 3–5th, 2026 | 9 AM – 3 PM",
        startDate: "2026-04-03",
        endDate: "2026-04-05",
        area: "Elk Grove, CA",
        categories: ["Art Glass", "Teacups", "Collectibles", "Figurines"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Elk-Grove/95758/4857414",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/elk-grove/95758/a-glass-act-glass-trinkets-2432205",
    },
];
