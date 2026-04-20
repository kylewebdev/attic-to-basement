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
        id: "fair-oaks-april-2026",
        title: "Massive Disney, Antique, Art & Collectibles Sale",
        dates: "April 23–25th, 2026 | 9 AM – 3 PM",
        startDate: "2026-04-23",
        endDate: "2026-04-25",
        area: "Fair Oaks, CA",
        categories: ["Disney", "Antiques", "Art", "Collectibles", "Depression Glass"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Fair-Oaks/95628/4884966",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/fair-oaks/95628/massive-disney-antique-art-collectibles-2435935",
    },
    {
        id: "galt-may-2026",
        title: "The Great Galt Sale",
        dates: "May 1–3rd, 2026 | 9 AM – 3 PM",
        startDate: "2026-05-01",
        endDate: "2026-05-03",
        area: "Galt, CA",
        categories: ["Automobiles", "Estate Finds", "Household"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Galt/95632/4878381",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/galt/95632/the-great-galt-sale-2434951",
    },
];
