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
        id: "loomis-november-2026",
        title: "25% off FRIDAY!! HIGH END LOOMIS ESTATE SALE",
        dates: "November 12–14th, 2026 | 9 AM – 2 PM",
        startDate: "2026-11-12",
        endDate: "2026-11-14",
        area: "Loomis, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Loomis/95650/5149587",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/loomis/95650/25-off-friday-high-end-2472284",
    },
    {
        id: "citrus-heights-november-2026",
        title: "50% OFF SATURDAY - TRAILER PARK TREASURES",
        dates: "November 13–14th, 2026 | 9 AM – 2 PM",
        startDate: "2026-11-13",
        endDate: "2026-11-14",
        area: "Citrus Heights, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Citrus-Heights/95621/5123859",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/citrus-heights/95621/50-off-saturday-trailer-park-2468980",
    },
    {
        id: "sacramento-november-2026",
        title: "ECLECTIC ESTATE IN TAHOE PARK!!",
        dates: "November 19–20th, 2026 | 9 AM – 2 PM",
        startDate: "2026-11-19",
        endDate: "2026-11-20",
        area: "Sacramento, CA",
        categories: ["Eclectic", "Antiques", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95820/5155701",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95820/eclectic-estate-in-tahoe-park-2473101",
    },
    {
        id: "roseville-november-2026",
        title: "GLASS & CLASS",
        dates: "November 20–22nd, 2026 | 9 AM – 2 PM",
        startDate: "2026-11-20",
        endDate: "2026-11-22",
        area: "Roseville, CA",
        categories: ["Furniture", "Collectibles", "Vintage", "Glassware", "Home Decor"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Roseville/95678/5157759",
    },
    {
        id: "auburn-november-2026",
        title: "CONSIGNMENT WAREHOUSE CLEARANCE",
        dates: "November 21–22nd, 2026 | 9 AM – 2 PM",
        startDate: "2026-11-21",
        endDate: "2026-11-22",
        area: "Auburn, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Auburn/95603/5159241",
    },
];
