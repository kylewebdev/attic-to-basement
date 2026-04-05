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
        id: "rio-linda-april-2026",
        title: "Rusty to Riches — A Pickers Dream, Auto, Household & More!",
        dates: "April 3–5th, 2026 | 8 AM – 1 PM",
        startDate: "2026-04-03",
        endDate: "2026-04-05",
        area: "Rio Linda, CA",
        categories: ["Automotive", "Household", "Vintage", "Tools"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Rio-Linda/95673/4857336",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/rio-linda/95673/50-off-sunday-rusty-to-2432185",
    },
    {
        id: "elk-grove-april-2026",
        title: "A Glass Act — Glass, Trinkets, Knick Knacks & More!",
        dates: "April 3–5th, 2026 | 8 AM – 1 PM",
        startDate: "2026-04-03",
        endDate: "2026-04-05",
        area: "Elk Grove, CA",
        categories: ["Art Glass", "Teacups", "Collectibles", "Figurines"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Elk-Grove/95758/4857414",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/elk-grove/95758/50-off-sunday-a-glass-2432205",
    },
    {
        id: "sacramento-april-2026",
        title: "Man Cave Mayhem Estate Sale",
        dates: "April 10–12th, 2026 | 9 AM – 2 PM",
        startDate: "2026-04-10",
        endDate: "2026-04-12",
        area: "Sacramento, CA",
        categories: ["Man Cave", "Collectibles", "Household", "Tools"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95835/4865124",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95835/man-cave-mayhem-estate-sale-2433182",
    },
];
