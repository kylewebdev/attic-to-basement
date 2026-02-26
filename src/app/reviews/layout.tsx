import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { getReviewSchema, getBreadcrumbSchema } from "@/lib/schema";
import { testimonials } from "@/lib/data/testimonials";

export const metadata = getPageMetadata("reviews");

export default function ReviewsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd data={getReviewSchema(testimonials)} />
            <JsonLd
                data={getBreadcrumbSchema([
                    { name: "Reviews", path: "/reviews" },
                ])}
            />
            {children}
        </>
    );
}
