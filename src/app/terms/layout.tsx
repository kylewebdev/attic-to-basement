import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata = getPageMetadata("terms");

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd
                data={getBreadcrumbSchema([
                    { name: "Terms of Service", path: "/terms" },
                ])}
            />
            {children}
        </>
    );
}
