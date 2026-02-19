export interface Sale {
    id: string;
    title: string;
    dates: string;
    area: string;
    categories: string[];
    externalUrlNet?: string;
    externalUrlOrg?: string;
    imageAlt?: string;
}

export const sales: Sale[] = [
    {
        id: "roseville-march-2026",
        title: "Roseville Estate — Mid-Century Modern & Vintage Collection",
        dates: "March 7–8, 2026 | 8 AM – 3 PM",
        area: "Roseville, CA",
        categories: [
            "Mid-Century Furniture",
            "Vintage Kitchenware",
            "Art Glass",
            "Vinyl Records",
        ],
        externalUrlNet: "https://www.estatesales.net",
        externalUrlOrg: "https://www.estatesales.org",
    },
    {
        id: "sacramento-march-2026",
        title: "East Sacramento — 40-Year Family Home",
        dates: "March 14–15, 2026 | 9 AM – 4 PM",
        area: "Sacramento, CA",
        categories: ["Antique Furniture", "Fine China", "Tools", "Linens"],
        externalUrlNet: "https://www.estatesales.net",
        externalUrlOrg: "https://www.estatesales.org",
    },
    {
        id: "folsom-march-2026",
        title: "Folsom Downsizing Sale — Quality Household Goods",
        dates: "March 21–22, 2026 | 8 AM – 3 PM",
        area: "Folsom, CA",
        categories: [
            "Patio Furniture",
            "Kitchen Appliances",
            "Books",
            "Holiday Decor",
        ],
        externalUrlNet: "https://www.estatesales.net",
        externalUrlOrg: "https://www.estatesales.org",
    },
];
