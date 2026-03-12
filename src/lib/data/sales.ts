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
        id: "yuba-city-march-2026",
        title: "Decades of Treasures in Yuba City",
        dates: "March 13–15th, 2026 | 9 AM – 4 PM",
        startDate: "2026-03-13",
        endDate: "2026-03-15",
        area: "Yuba City, CA",
        categories: ["Collectibles", "Household", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Yuba-City/95991/4831467",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/yuba-city/95991/decades-of-treasures-in-yuba-2428673",
    },
    {
        id: "citrus-heights-march-2026",
        title: "A Little of Everything in Citrus Heights",
        dates: "March 13–15th, 2026 | 9 AM – 3 PM",
        startDate: "2026-03-13",
        endDate: "2026-03-15",
        area: "Citrus Heights, CA",
        categories: ["Household", "Collectibles", "Décor"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Citrus-Heights/95621/4831479",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/citrus-heights/95621/a-little-of-everything-in-2428674",
    },
    {
        id: "sacramento-collecting-march-2026",
        title: "Clothes, Shoes & Decades of Collecting",
        dates: "March 13–15th, 2026 | 9 AM – 3 PM",
        startDate: "2026-03-13",
        endDate: "2026-03-15",
        area: "Sacramento, CA",
        categories: ["Clothing", "Shoes", "Costume Jewelry", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95823/4831485",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95823/clothes-shoes-costume-jewelry-decades-2428676",
    },
    {
        id: "placerville-march-2026",
        title: "Pickin' in Placerville — Vehicles, Equipment & More",
        dates: "March 14–16th, 2026 | 9 AM – 2 PM",
        startDate: "2026-03-14",
        endDate: "2026-03-16",
        area: "Placerville, CA",
        categories: ["Vehicles", "Equipment", "Outdoor", "Household"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Placerville/95667/4831455",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/placerville/95667/pickin-in-placerville-vehicles-equipment-2428669",
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
