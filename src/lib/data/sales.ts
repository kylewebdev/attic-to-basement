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
        id: "orangevale-july-2026",
        title: "ORANGEVALE CHARM ESTATE SALE",
        dates: "July 25–26th, 2026 | 9 AM – 2 PM",
        startDate: "2026-07-25",
        endDate: "2026-07-26",
        area: "Orangevale, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Orangevale/95662/5008032",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/orangevale/95662/orangevale-charm-estate-sale-2452863",
    },
    {
        id: "rio-linda-july-2026",
        title: "TOOLS, TUNES & TREASURES!",
        dates: "July 25–26th, 2026 | 7 AM – 12 PM",
        startDate: "2026-07-25",
        endDate: "2026-07-26",
        area: "Rio Linda, CA",
        categories: ["Tools", "Antiques", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Rio-Linda/95673/5008089",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/rio-linda/95673/tools-tunes-treasures-2452870",
    },
    {
        id: "sacramento-july-2026",
        title: "MECHANIC & COLLECTOR ESTATE SALE!!!",
        dates: "July 26–28th, 2026 | 9 AM – 2 PM",
        startDate: "2026-07-26",
        endDate: "2026-07-28",
        area: "Sacramento, CA",
        categories: ["Collectibles", "Antiques", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95841/5010273",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95841/mechanic-collector-estate-sale-2453163",
    },
    {
        id: "elk-grove-july-2026",
        title: "HIGH END MASSIVE ESTATE IN RURAL ELK GROVE",
        dates: "July 31 – August 2nd, 2026 | 9 AM – 3 PM",
        startDate: "2026-07-31",
        endDate: "2026-08-02",
        area: "Elk Grove, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Elk-Grove/95624/5008431",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/elk-grove/95624/high-end-massive-estate-in-2452896",
    },
];
