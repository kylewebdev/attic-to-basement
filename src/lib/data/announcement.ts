import { sales, isSaleActive } from "@/lib/data/sales";

interface AnnouncementContent {
    text: string;
    href: string;
}

export const announcementConfig = {
    /** Set to false to hide the bar entirely. */
    enabled: true,
    /** Set to override auto-detection, e.g. { text: "Sacramento – This Weekend – View Estate Sales →", href: "/estate-sales" } */
    manualOverride: null as AnnouncementContent | null,
    fallbackText: "See Our Upcoming Estate Sales →",
    fallbackHref: "/estate-sales",
};

/** Returns announcement content or null if disabled. */
export function getAnnouncementContent(): AnnouncementContent | null {
    if (!announcementConfig.enabled) return null;
    if (announcementConfig.manualOverride) return announcementConfig.manualOverride;

    const activeSales = sales.filter(isSaleActive);
    if (activeSales.length > 0) {
        const next = activeSales[0];
        const area = next.area.replace(/, CA$/, "");
        return {
            text: `${area} – ${next.dates.split("|")[0].trim().replace(/,?\s*\d{4}$/, "")} – View Estate Sales →`,
            href: "/estate-sales",
        };
    }

    return {
        text: announcementConfig.fallbackText,
        href: announcementConfig.fallbackHref,
    };
}
