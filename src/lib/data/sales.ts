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
        id: "carmichael-july-2026",
        title: "CARMICHAEL CAR. MOTORCYCLE. AND MORE! PLEASE READ DETAILS ON THIS ONE APPOINTMENT ONLY",
        dates: "July 9–11th, 2026 | 9 AM – 3 PM",
        startDate: "2026-07-09",
        endDate: "2026-07-11",
        area: "Carmichael, CA",
        categories: ["Cars", "Motorcycles", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Carmichael/95608/4987929",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/carmichael/95608/carmichael-car-motorcycle-and-more-2450109",
    },
    {
        id: "carmichael-extreme-collecting-july-2026",
        title: "EXTREME COLLECTING: CARMICHAEL EDITION",
        dates: "July 22–24th, 2026 | 9 AM – 3 PM",
        startDate: "2026-07-22",
        endDate: "2026-07-24",
        area: "Carmichael, CA",
        categories: ["Collectibles", "Antiques", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Carmichael/95608/4988688",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/carmichael/95608/extreme-collecting-carmichael-edition-2450167",
    },
];
