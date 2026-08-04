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
    {
        id: "rescue-august-2026",
        title: "LET’S GO TO OMA’S HOUSE!",
        dates: "August 7–9th, 2026 | 9 AM – 2 PM",
        startDate: "2026-08-07",
        endDate: "2026-08-09",
        area: "Rescue, CA",
        categories: ["Collectibles", "Antiques", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Rescue/95672/5025561",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/cameron-park/95672/lets-go-to-omas-house-2455397",
    },
    {
        id: "sacramento-cool-80-s-august-2026",
        title: "COOL 80'S CLOTHES, FIRE KING WIDE CABINETS, BIKES, AND SO MUCH MORE",
        dates: "August 8–9th, 2026 | 9 AM – 3 PM",
        startDate: "2026-08-08",
        endDate: "2026-08-09",
        area: "Sacramento, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95864/5025594",
    },
    {
        id: "sacramento-college-glen-estate-august-2026",
        title: "COLLEGE/GLEN ESTATE SALE",
        dates: "August 20–22nd, 2026 | 9 AM – 3 PM",
        startDate: "2026-08-20",
        endDate: "2026-08-22",
        area: "Sacramento, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95826/5025621",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95826/collegeglen-estate-sale-2455406",
    },
];
