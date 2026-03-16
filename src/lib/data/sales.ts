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
        id: "placerville-march-2026",
        title: "Pickin' in Placerville — Vehicles, Equipment & More",
        dates: "March 14–16th, 2026 | 9 AM – 1 PM",
        startDate: "2026-03-14",
        endDate: "2026-03-16",
        area: "Placerville, CA",
        categories: ["Vehicles", "Equipment", "Outdoor", "Household"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Placerville/95667/4831455",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/placerville/95667/50-off-monday-pickin-in-2428669",
    },
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
            "https://estatesales.org/estate-sales/ca/sacramento/95831/packed-pocket-area-estate-sale-2429771",
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
