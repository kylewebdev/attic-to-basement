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
        id: "galt-may-2026",
        title: "The Great Galt Sale",
        dates: "May 1–3rd, 2026 | 9 AM – 3 PM",
        startDate: "2026-05-01",
        endDate: "2026-05-03",
        area: "Galt, CA",
        categories: ["Automobiles", "Estate Finds", "Household"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Galt/95632/4878381",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/galt/95632/the-great-galt-sale-2434951",
    },
    {
        id: "citrus-heights-may-2026",
        title: "The Nesting Hen House",
        dates: "May 1–3rd, 2026 | 9 AM – 3 PM",
        startDate: "2026-05-01",
        endDate: "2026-05-03",
        area: "Citrus Heights, CA",
        categories: ["Home Decor", "Collectibles", "Household"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Citrus-Heights/95610/4887357",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/citrus-heights/95610/the-nesting-hen-house-2436220",
    },
    {
        id: "yuba-city-may-2026",
        title: "Maticulous Marysville Home",
        dates: "May 1–3rd, 2026 | 9 AM – 3 PM",
        startDate: "2026-05-01",
        endDate: "2026-05-03",
        area: "Yuba City, CA",
        categories: ["Household", "Home Decor", "Estate Finds"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Yuba-City/95993/4898559",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/yuba-city/95993/maticulous-marysville-home-2437723",
    },
    {
        id: "placerville-may-2026",
        title: "Classic Barn Finds — Equipment & Vehicles",
        dates: "May 2–4th, 2026 | 9 AM – 3 PM",
        startDate: "2026-05-02",
        endDate: "2026-05-04",
        area: "Placerville, CA",
        categories: ["Vehicles", "Equipment", "Barn Finds"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Placerville/95667/4897821",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/placerville/95667/classic-barn-finds-equipment-vehicles-2437619",
    },
];
