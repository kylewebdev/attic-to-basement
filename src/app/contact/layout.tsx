import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata = getPageMetadata("contact");

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd
                data={getBreadcrumbSchema([
                    { name: "Contact", path: "/contact" },
                ])}
            />
            {children}
        </>
    );
}
