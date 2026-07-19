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
        id: "oroville-july-2026",
        title: "50%  OFF SUNDAY CITY OF GOLD ESTATE SALE",
        dates: "July 17–19th, 2026 | 9 AM – 2 PM",
        startDate: "2026-07-17",
        endDate: "2026-07-19",
        area: "Oroville, CA",
        categories: ["Furniture", "Antiques", "Collectibles", "Vintage", "Vinyl Records"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Oroville/95966/4989831",
    },
    {
        id: "sacramento-50-off-sunday-july-2026",
        title: "50% off SUNDAY!! PACKED IN THE POCKET!",
        dates: "July 17–19th, 2026 | 9 AM – 2 PM",
        startDate: "2026-07-17",
        endDate: "2026-07-19",
        area: "Sacramento, CA",
        categories: ["Jewelry", "Fashion", "Furniture", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95822/4999746",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95822/50-off-sunday-packed-in-2451691",
    },
    {
        id: "sacramento-50-off-sunday-july-2026-4996497",
        title: "50% OFF SUNDAY!!!! TOOLS, TREASURES & TOYS",
        dates: "July 18–19th, 2026 | 9 AM – 2 PM",
        startDate: "2026-07-18",
        endDate: "2026-07-19",
        area: "Sacramento, CA",
        categories: ["Tools", "Toys", "Antiques"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95816/4996497",
    },
    {
        id: "carmichael-july-2026",
        title: "EXTREME COLLECTING: CARMICHAEL EDITION",
        dates: "July 22–24th, 2026 | 9 AM – 2 PM",
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
