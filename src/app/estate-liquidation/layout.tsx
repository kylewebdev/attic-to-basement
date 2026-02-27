import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema } from "@/lib/schema";
import { faqPlainText } from "@/lib/data/faqs";

export const metadata = getPageMetadata("estateLiquidation");

export default function EstateLiquidationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd
                data={getServiceSchema({
                    name: "Estate Liquidation Services",
                    description:
                        "Estate sales, buyouts, and cleanouts for Northern California families. Fully insured, bonded, and experienced.",
                    path: "/estate-liquidation",
                })}
            />
            <JsonLd
                data={getBreadcrumbSchema([
                    { name: "Estate Liquidation", path: "/estate-liquidation" },
                ])}
            />
            <JsonLd data={getFAQSchema(faqPlainText)} />
            {children}
        </>
    );
}
