export interface Sale {
    id: string;
    title: string;
    dates: string;
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
        id: "sacramento-natomas-march-2026",
        title: "Nifty Natomas Sale",
        dates: "March 6–7th, 2026 | 9 AM – 2 PM",
        endDate: "2026-03-07",
        area: "Sacramento, CA",
        categories: [
            "Clothing",
            "Luggage",
            "Books",
            "Kitchen Items",
            "Jewelry",
        ],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95835/4814823",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95835/50-off-10-off-jewelry-2426361",
    },
    {
        id: "west-sacramento-march-2026",
        title: "Scent-sational Treasures",
        dates: "March 6–8th, 2026 | 9 AM – 2 PM",
        endDate: "2026-03-08",
        area: "West Sacramento, CA",
        categories: ["Trains", "Crystal", "Holiday Décor", "Clothing", "Bar Ware"],
        externalUrlNet:
            "https://www.estatesales.net/CA/West-Sacramento/95691/4823448",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/west-sacramento/95691/scentsational-treasures-2427554",
    },
    {
        id: "citrus-heights-march-2026",
        title: "Treasures From Around the Globe",
        dates: "March 6–8th, 2026 | 9 AM – 3 PM",
        endDate: "2026-03-08",
        area: "Citrus Heights, CA",
        categories: ["Collectibles", "Antiques", "Décor"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Citrus-Heights/95610/4823748",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/citrus-heights/95610/treasures-from-around-the-globe-2427749",
    },
    {
        id: "sacramento-treasures-march-2026",
        title: "70+ Years of Treasures — Lanterns, Knick-Knacks, Jewelry & More",
        dates: "March 6–8th, 2026 | 9 AM – 2 PM",
        endDate: "2026-03-08",
        area: "Sacramento, CA",
        categories: ["Lanterns", "Knick-Knacks", "Jewelry", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95820/4825929",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95820/70-years-of-treasures-lanterns-2427879",
    },
    {
        id: "placerville-march-2026",
        title: "Pickin' in Placerville — Vehicles, Equipment & More",
        dates: "March 13–15th, 2026 | 9 AM – 2 PM",
        endDate: "2026-03-15",
        area: "Placerville, CA",
        categories: ["Vehicles", "Equipment", "Outdoor", "Household"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Placerville/95667/4831455",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/placerville/95667/pickin-in-placerville-vehicles-equipment-2428669",
    },
    {
        id: "yuba-city-march-2026",
        title: "Decades of Treasures in Yuba City",
        dates: "March 13–15th, 2026 | 9 AM – 2 PM",
        endDate: "2026-03-15",
        area: "Yuba City, CA",
        categories: ["Collectibles", "Household", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Yuba-City/95991/4831467",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/yuba-city/95991/decades-of-treasures-in-yuba-2428673",
    },
    {
        id: "citrus-heights-2-march-2026",
        title: "A Little of Everything in Citrus Heights",
        dates: "March 13–15th, 2026 | 9 AM – 2 PM",
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
        dates: "March 13–15th, 2026 | 9 AM – 2 PM",
        endDate: "2026-03-15",
        area: "Sacramento, CA",
        categories: ["Clothing", "Shoes", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95823/4831485",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95823/clothes-shoes-decades-of-collecting-2428676",
    },
];
