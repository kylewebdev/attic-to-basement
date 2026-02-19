import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("appraisals");

export default function AppraisalsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
