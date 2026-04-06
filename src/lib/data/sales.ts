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
