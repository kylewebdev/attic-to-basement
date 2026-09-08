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
        id: "citrus-heights-september-2026",
        title: "MAN CAVE MAYHEM: MOVIES, TOOLS & AUDIO",
        dates: "September 10–12th, 2026 | 9 AM – 2 PM",
        startDate: "2026-09-10",
        endDate: "2026-09-12",
        area: "Citrus Heights, CA",
        categories: ["Tools", "Antiques", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Citrus-Heights/95610/5066814",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/citrus-heights/95610/man-cave-mayhem-movies-tools-2461137",
    },
    {
        id: "sacramento-packed-in-pocket-september-2026",
        title: "PACKED IN THE POCKET!",
        dates: "September 11–13th, 2026 | 9 AM – 2 PM",
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
        id: "west-sacramento-september-2026",
        title: "SACRAMENTO  HOME WITH SOMETHING FOR EVERYONE!",
        dates: "September 11–13th, 2026 | 9 AM – 3 PM",
        startDate: "2026-09-11",
        endDate: "2026-09-13",
        area: "West Sacramento, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/West-Sacramento/95691/5068722",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/west-sacramento/95691/sacramento-home-with-something-for-2461376",
    },
    {
        id: "sacramento-heirlooms-hidden-treasures-september-2026",
        title: "HEIRLOOMS AND HIDDEN TREASURES!",
        dates: "September 11–13th, 2026 | 9 AM – 2 PM",
        startDate: "2026-09-11",
        endDate: "2026-09-13",
        area: "Sacramento, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95828/5069844",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95828/heirlooms-and-hidden-treasures-2461522",
    },
    {
        id: "sacramento-garage-finds-vintage-september-2026",
        title: "GARAGE FINDS & VINTAGE TREASURES!",
        dates: "September 16–18th, 2026 | 9 AM – 2 PM",
        startDate: "2026-09-16",
        endDate: "2026-09-18",
        area: "Sacramento, CA",
        categories: ["Vintage", "Antiques", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95842/5068824",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95842/garage-finds-vintage-treasures-2461389",
    },
    {
        id: "elk-grove-september-2026",
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
