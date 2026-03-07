import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import {
    getServiceSchema,
    getBreadcrumbSchema,
    getEventSchema,
} from "@/lib/schema";
import { sales, isSaleActive } from "@/lib/data/sales";

export const metadata = getPageMetadata("estateSales");

export default function EstateSalesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const activeSales = sales.filter(isSaleActive);

    return (
        <>
            <JsonLd
                data={getServiceSchema({
                    name: "Estate Sale Management",
                    description:
                        "Professional estate sale services from setup to cleanup. Free estimates, expert pricing, and full marketing included.",
                    path: "/estate-sales",
                })}
            />
            <JsonLd
                data={getBreadcrumbSchema([
                    { name: "Estate Sales", path: "/estate-sales" },
                ])}
            />
            {activeSales.length > 0 &&
                getEventSchema(activeSales).map((event, i) => (
                    <JsonLd key={activeSales[i].id} data={event} />
                ))}
            {children}
        </>
    );
}
