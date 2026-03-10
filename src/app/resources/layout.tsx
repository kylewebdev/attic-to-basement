import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata = {
    ...getPageMetadata("resources"),
    robots: { index: false, follow: false }, // Draft — remove when ready to publish
};

export default function ResourcesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd
                data={getBreadcrumbSchema([
                    { name: "Resources", path: "/resources" },
                ])}
            />
            {children}
        </>
    );
}
