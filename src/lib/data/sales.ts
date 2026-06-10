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
        id: "sacramento-lladro-crystal-christmas-june-2026",
        title: "Lladro, Crystal, Christmas & Much More!",
        dates: "June 12–14th, 2026 | 9 AM – 3 PM",
        startDate: "2026-06-12",
        endDate: "2026-06-14",
        area: "Sacramento, CA",
        categories: ["Lladro Figurines", "Crystal", "Christmas Decor", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95835/4944393",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95835/lladro-crystal-christmas-much-more-2443943",
    },
    {
        id: "rancho-cordova-tech-tools-treasures-june-2026",
        title: "Tech, Tools and Treasures!",
        dates: "June 12–14th, 2026 | 9 AM – 2 PM",
        startDate: "2026-06-12",
        endDate: "2026-06-14",
        area: "Rancho Cordova, CA",
        categories: ["Tech", "Tools", "Estate Treasures"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Rancho-Cordova/95742/4951899",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/rancho-cordova/95742/tech-tools-and-treasures-2445049",
    },
    {
        id: "el-dorado-hills-estate-june-2026",
        title: "El Dorado Estate Sale",
        dates: "June 12–14th, 2026 | 9 AM – 2 PM",
        startDate: "2026-06-12",
        endDate: "2026-06-14",
        area: "El Dorado Hills, CA",
        categories: ["Furniture", "Home Decor", "Collectibles", "Estate Items"],
        externalUrlNet:
            "https://www.estatesales.net/CA/El-Dorado-Hills/95762/4952148",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/el-dorado-hills/95762/el-dorado-estate-sale-2445069",
    },
    {
        id: "sacramento-arden-arcade-quality-june-2026",
        title: "Quality in Arden-Arcade!!",
        dates: "June 18–20th, 2026 | 9 AM – 3 PM",
        startDate: "2026-06-18",
        endDate: "2026-06-20",
        area: "Sacramento, CA",
        categories: ["Furniture", "Home Decor", "Collectibles", "Quality Estate"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95864/4955712",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95864/quality-in-ardenarcade-2445538",
    },
    {
        id: "auburn-outdoorsman-barbies-cottage-core-june-2026",
        title: "Outdoorsman, Barbies, Collectibles & Cottage-Core!!",
        dates: "June 21–23rd, 2026 | 9 AM – 3 PM",
        startDate: "2026-06-21",
        endDate: "2026-06-23",
        area: "Auburn, CA",
        categories: ["Outdoorsman Gear", "Barbies", "Collectibles", "Cottage-Core"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Auburn/95603/4955721",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/auburn/95603/outdoorsman-barbies-collectibles-cottagecore-2445545",
    },
    {
        id: "sacramento-carmichael-jam-packed-june-2026",
        title: "Jam Packed Sacramento/Carmichael Home!!",
        dates: "June 24–26th, 2026 | 9 AM – 3 PM",
        startDate: "2026-06-24",
        endDate: "2026-06-26",
        area: "Sacramento, CA",
        categories: ["Bedroom Set", "Vinyl Records", "Vintage Christmas", "Uranium Glass"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95821/4955628",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95821/jam-packed-sacramentocarmichael-home-2445535",
    },
];
