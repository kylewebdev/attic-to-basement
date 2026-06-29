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
        id: "sacramento-carmichael-jam-packed-july-2026",
        title: "Jam Packed Sacramento/Carmichael Home!!",
        dates: "July 1–3rd, 2026 | 9 AM – 4 PM",
        startDate: "2026-07-01",
        endDate: "2026-07-03",
        area: "Sacramento, CA",
        categories: ["Bedroom Set", "Vinyl Records", "Vintage Christmas", "Uranium Glass"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95821/4955628",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95821/dates-changed-jam-packed-sacramentocarmichael-2445535",
    },
];
