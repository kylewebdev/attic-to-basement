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
        id: "fair-oaks-april-2026",
        title: "Massive Disney, Antique, Art & Collectibles Sale",
        dates: "April 24–26th, 2026 | 9 AM – 2 PM",
        startDate: "2026-04-24",
        endDate: "2026-04-26",
        area: "Fair Oaks, CA",
        categories: ["Disney", "Antiques", "Art", "Collectibles", "Depression Glass"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Fair-Oaks/95628/4884966",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/fair-oaks/95628/25-off-disney-30-off-2435935",
    },
    {
        id: "sacramento-tools-april-2026",
        title: "Tools & Computer Tech",
        dates: "April 24–26th, 2026 | 9 AM – 3 PM",
        startDate: "2026-04-24",
        endDate: "2026-04-26",
        area: "Sacramento, CA",
        categories: ["Tools", "Computer Tech", "Electronics"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95841/4886676",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95841/tools-computer-tech-2436321",
    },
    {
        id: "carmichael-april-2026",
        title: "Carmichael Clean Well Kept Beautiful Home",
        dates: "April 24–26th, 2026 | 9 AM – 2 PM",
        startDate: "2026-04-24",
        endDate: "2026-04-26",
        area: "Carmichael, CA",
        categories: ["Furniture", "Household", "Estate Finds"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Carmichael/95608/4886976",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/carmichael/95608/carmichael-clean-well-kept-beautiful-2436422",
    },
    {
        id: "sacramento-treasures-april-2026",
        title: "Decades of Treasures",
        dates: "April 24–26th, 2026 | 9 AM – 2 PM",
        startDate: "2026-04-24",
        endDate: "2026-04-26",
        area: "Sacramento, CA",
        categories: ["Vintage", "Collectibles", "Estate Finds"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95821/4887453",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95821/50-off-sunday-decades-of-2436233",
    },
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
];
