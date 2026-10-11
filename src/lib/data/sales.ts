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
        id: "sacramento-october-2026",
        title: "ASIAN MEETS MODERN IN SACRAMENTO/NATOMAS",
        dates: "October 15–17th, 2026 | 9 AM – 2 PM",
        startDate: "2026-10-15",
        endDate: "2026-10-17",
        area: "Sacramento, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95834/5109321",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95834/asian-meets-modern-in-sacramentonatomas-2466900",
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
];
