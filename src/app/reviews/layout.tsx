import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("reviews");

export default function ReviewsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
