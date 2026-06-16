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
        id: "roseville-another-amazing-home-june-2026",
        title: "Another Amazing Home in the Heart of Roseville",
        dates: "June 19–21st, 2026 | 9 AM – 3 PM",
        startDate: "2026-06-19",
        endDate: "2026-06-21",
        area: "Roseville, CA",
        categories: ["Furniture", "Home Decor", "Collectibles", "Estate Items"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Roseville/95747/4961745",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/roseville/95747/another-amazing-sale-in-the-2446446",
    },
    {
        id: "sacramento-time-to-shop-june-2026",
        title: "Time to Shop Estate Sale",
        dates: "June 19–21st, 2026 | 9 AM – 3 PM",
        startDate: "2026-06-19",
        endDate: "2026-06-21",
        area: "Sacramento, CA",
        categories: ["Furniture", "Home Decor", "Collectibles", "Estate Items"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95831/4963692",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento-/95831/time-to-shop-estate-sale-2446702",
    },
    {
        id: "sacramento-70-off-blowout-june-2026",
        title: "70% Off One Day Blow Out Sale!!!!",
        dates: "June 19th, 2026",
        startDate: "2026-06-19",
        endDate: "2026-06-19",
        area: "Sacramento, CA",
        categories: ["Furniture", "Home Decor", "Collectibles", "Clearance"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95835/4963932",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95835/70-off-one-day-blow-2446744",
    },
    {
        id: "sacramento-garage-studio-liquidation-june-2026",
        title: "Garage & Studio Liquidation Sale!",
        dates: "June 20–21st, 2026 | 9 AM – 2 PM",
        startDate: "2026-06-20",
        endDate: "2026-06-21",
        area: "Sacramento, CA",
        categories: ["Tools", "Outdoor Gear", "Trailers", "Garage Items"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95829/4962972",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95829/garage-studio-liquidation-sale-2446598",
    },
    {
        id: "auburn-outdoorsman-barbies-cottage-core-june-2026",
        title: "Outdoorsman, Barbies, Collectibles & Cottage-Core!!",
        dates: "June 21–23rd, 2026 | 8 AM – 3 PM",
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
