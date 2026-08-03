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
        id: "sacramento-august-2026",
        title: "EVENING BLOW OUT SALE!!!",
        dates: "August 3rd, 2026 | 4 PM – 8 PM",
        startDate: "2026-08-03",
        endDate: "2026-08-03",
        area: "Sacramento, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95841/5021373",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95841/evening-blow-out-sale-2454858",
    },
    {
        id: "roseville-august-2026",
        title: "A BLAST FROM THE PAST - TOYS & MORE!",
        dates: "August 6–8th, 2026 | 9 AM – 3 PM",
        startDate: "2026-08-06",
        endDate: "2026-08-08",
        area: "Roseville, CA",
        categories: ["Toys", "Antiques", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Roseville/95678/5020950",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/roseville/95678/a-blast-from-the-past-2454763",
    },
];
