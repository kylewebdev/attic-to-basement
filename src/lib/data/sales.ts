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
        id: "sacramento-pocket-march-2026",
        title: "Packed Pocket Area Estate Sale",
        dates: "March 20–22nd, 2026 | 9 AM – 2 PM",
        startDate: "2026-03-20",
        endDate: "2026-03-22",
        area: "Sacramento, CA",
        categories: ["Household", "Collectibles", "Décor"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95831/4839660",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95831/50-off-most-items-sunday-2429771",
    },
    {
        id: "roseville-march-2026",
        title: "Time Capsule in Roseville",
        dates: "March 20–22nd, 2026 | 9 AM – 2 PM",
        startDate: "2026-03-20",
        endDate: "2026-03-22",
        area: "Roseville, CA",
        categories: ["Antiques", "Vintage", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Roseville/95747/4843182",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/roseville/95678/50-off-most-items-sunday-2430255",
    },
    {
        id: "antelope-march-2026",
        title: "Timeless Treasures and Tool Trove",
        dates: "March 21–23rd, 2026 | 9 AM – 2 PM",
        startDate: "2026-03-21",
        endDate: "2026-03-23",
        area: "Antelope, CA",
        categories: ["Tools", "Collectibles", "Household"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Antelope/95843/4842525",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/antelope/95843/25-off-sunday-50-off-2430179",
    },
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
];
