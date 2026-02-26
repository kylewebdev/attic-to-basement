import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/schema";

export const metadata = getPageMetadata("estateSales");

export default function EstateSalesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
            {children}
        </>
    );
}
