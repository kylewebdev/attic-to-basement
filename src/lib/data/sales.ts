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
        id: "sacramento-pocket-full-treasure-november-2026",
        title: "POCKET FULL OF TREASURE!",
        dates: "November 27–28th, 2026 | 9 AM – 2 PM",
        startDate: "2026-11-27",
        endDate: "2026-11-28",
        area: "Sacramento, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95831/5168520",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95831/pocket-full-of-treasure-2474897",
    },
    {
        id: "sacramento-flock-fabulous-finds-november-2026",
        title: "A FLOCK OF FABULOUS FINDS!",
        dates: "November 27–29th, 2026 | 9 AM – 2 PM",
        startDate: "2026-11-27",
        endDate: "2026-11-29",
        area: "Sacramento, CA",
        categories: ["Collectibles", "Antiques", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95823/5169486",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95823/a-flock-of-fabulous-finds-2475040",
    },
    {
        id: "lincoln-november-2026",
        title: "LITTLE LUXURIOUS LINCOLN SALE!",
        dates: "November 30 – December 1st, 2026 | 9 AM – 2 PM",
        startDate: "2026-11-30",
        endDate: "2026-12-01",
        area: "Lincoln, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Lincoln/95648/5173074",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/lincoln/95648/little-luxurious-lincoln-sale-2475516",
    },
];
