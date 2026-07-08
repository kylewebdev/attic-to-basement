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
        id: "carmichael-july-2026",
        title: "CARMICHAEL CAR. MOTORCYCLE. AND MORE! PLEASE READ DETAILS ON THIS ONE APPOINTMENT ONLY",
        dates: "July 9–11th, 2026 | 9 AM – 3 PM",
        startDate: "2026-07-09",
        endDate: "2026-07-11",
        area: "Carmichael, CA",
        categories: ["Cars", "Motorcycles", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Carmichael/95608/4987929",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/carmichael/95608/carmichael-car-motorcycle-and-more-2450109",
    },
    {
        id: "sacramento-eclectic-july-2026",
        title: "ECLECTIC ESTATE ODYSSEY",
        dates: "July 10–12th, 2026 | 9 AM – 2 PM",
        startDate: "2026-07-10",
        endDate: "2026-07-12",
        area: "Sacramento, CA",
        categories: ["Eclectic", "Antiques", "Collectibles"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Sacramento/95816/4989153",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/sacramento/95816/eclectic-estate-odyssey-2450226",
    },
    {
        id: "roseville-july-2026",
        title: "ROSEVILLE GLITZ & GLAM",
        dates: "July 10–12th, 2026 | 9 AM – 2 PM",
        startDate: "2026-07-10",
        endDate: "2026-07-12",
        area: "Roseville, CA",
        categories: ["Jewelry", "Fashion", "Home Decor"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Roseville/95747/4989930",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/roseville/95747/roseville-glitz-glam-2450337",
    },
    {
        id: "lincoln-july-2026",
        title: "SUN CITY LINCOLN ESTATE SALE MID-CENTURY FURNITURE",
        dates: "July 12–13th, 2026 | 9 AM – 3 PM",
        startDate: "2026-07-12",
        endDate: "2026-07-13",
        area: "Lincoln, CA",
        categories: ["Mid-Century Furniture", "Vintage", "Home Decor"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Lincoln/95648/4991343",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/lincoln/95648/sun-city-lincoln-estate-sale-2450553",
    },
    {
        id: "oroville-july-2026",
        title: "CITY OF GOLD ESTATE SALE",
        dates: "July 17–19th, 2026 | 9 AM – 2 PM",
        startDate: "2026-07-17",
        endDate: "2026-07-19",
        area: "Oroville, CA",
        categories: ["Antiques", "Collectibles", "Vintage"],
        externalUrlNet:
            "https://www.estatesales.net/CA/Oroville/95966/4989831",
        externalUrlOrg:
            "https://estatesales.org/estate-sales/ca/oroville/95966/city-of-gold-estate-sale-2450326",
    },
    {
        id: "carmichael-extreme-collecting-july-2026",
        title: "EXTREME COLLECTING: CARMICHAEL EDITION",
        dates: "July 22–24th, 2026 | 9 AM – 3 PM",
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
