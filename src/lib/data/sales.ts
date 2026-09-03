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
        id: "carmichael-september-2026",
        title: "CARMICHAEL 1980'S TIMECAPSULE LIMITED PARKING  READ DETAILS IN DESCRIPTION \"VERY IMPORTANT \" THANKS",
        dates: "September 3–5th, 2026 | 8 AM – 2 PM",
        startDate: "2026-09-03",
        endDate: "2026-09-05",
        area: "Carmichael, CA",
        categories: ["Cars", "Motorcycles", "Antiques"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Carmichael/95608/5046924",
    },
    {
        id: "elk-grove-collectors-menagerie-september-2026",
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
    {
        id: "el-dorado-hills-september-2026",
        title: "EL DORADO HILLS ESTATE SALE",
        dates: "September 5–6th, 2026 | 9 AM – 2 PM",
        startDate: "2026-09-05",
        endDate: "2026-09-06",
        area: "El Dorado Hills, CA",
        categories: ["Vintage", "Tools", "Books", "Glassware", "Home Decor"],
        externalUrlNet:
            "https://www.estatesales.net/CA/El-Dorado-Hills/95762/5061426",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/el-dorado-hills/95762/el-dorado-hills-estate-sale-2460392",
    },
    {
        id: "sacramento-september-2026",
        title: "PACKED IN THE POCKET!",
        dates: "September 11–13th, 2026 | 9 AM – 3 PM",
        startDate: "2026-09-11",
        endDate: "2026-09-13",
        area: "Sacramento, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95831/5064450",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95831/packed-in-the-pocket-2460764",
    },
    {
        id: "elk-grove-beautiful-estate-sale-september-2026",
        title: "BEAUTIFUL ELK GROVE ESTATE SALE",
        dates: "September 17–19th, 2026 | 9 AM – 3 PM",
        startDate: "2026-09-17",
        endDate: "2026-09-19",
        area: "Elk Grove, CA",
        categories: ["Furniture", "Collectibles", "Antiques"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Elk-Grove/95757/5061405",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/elk-grove/95757/beautiful-elk-grove-estate-sale-2460391",
    },
];
