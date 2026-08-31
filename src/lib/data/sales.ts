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
        id: "elk-grove-august-2026",
        title: "HODGE PODGE GARAGE & BACKYARD!",
        dates: "August 30 – September 1st, 2026 | 9 AM – 2 PM",
        startDate: "2026-08-30",
        endDate: "2026-09-01",
        area: "Elk Grove, CA",
        categories: ["Collectibles", "Antiques", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Elk-Grove/95758/5049819",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/elk-grove/95758/hodge-podge-garage-backyard-2458827",
    },
    {
        id: "carmichael-september-2026",
        title: "CARMICHAEL 1980'S TIMECAPSULE REVEALED LIMITED PARKING SO BEST TO MAKE APPOINTMENT THANKS",
        dates: "September 3–5th, 2026 | 8 AM – 2 PM",
        startDate: "2026-09-03",
        endDate: "2026-09-05",
        area: "Carmichael, CA",
        categories: ["Cars", "Motorcycles", "Antiques"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Carmichael/95608/5046924",
    },
    {
        id: "elk-grove-september-2026",
        title: "ELK GROVE COLLECTORS MENAGERIE",
        dates: "September 3–5th, 2026 | 9 AM – 2 PM",
        startDate: "2026-09-03",
        endDate: "2026-09-05",
        area: "Elk Grove, CA",
        categories: ["Collectibles", "Antiques", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Elk-Grove/95624/5057130",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/elk-grove/95624/elk-grove-collectors-menagerie-2459830",
    },
    {
        id: "folsom-september-2026",
        title: "FURNITURE, FASHION & FINDS!",
        dates: "September 4–6th, 2026 | 9 AM – 2 PM",
        startDate: "2026-09-04",
        endDate: "2026-09-06",
        area: "Folsom, CA",
        categories: ["Fashion", "Furniture", "Antiques"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Folsom/95630/5060964",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/folsom/95630/furniture-fashion-finds-2460338",
    },
];
