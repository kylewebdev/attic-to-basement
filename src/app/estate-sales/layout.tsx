import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("estateSales");

export default function EstateSalesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
