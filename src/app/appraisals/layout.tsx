import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/schema";

export const metadata = getPageMetadata("appraisals");

export default function AppraisalsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd
                data={getServiceSchema({
                    name: "Personal Property Appraisals",
                    description:
                        "Accurate appraisals for household goods, antiques, collectibles, and more. Expert valuations backed by 20+ years of experience.",
                    path: "/appraisals",
                })}
            />
            <JsonLd
                data={getBreadcrumbSchema([
                    { name: "Appraisals", path: "/appraisals" },
                ])}
            />
            {children}
        </>
    );
}
