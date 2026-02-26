import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata = getPageMetadata("ourPromise");

export default function OurPromiseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd
                data={getBreadcrumbSchema([
                    { name: "Our Promise", path: "/our-promise" },
                ])}
            />
            {children}
        </>
    );
}
