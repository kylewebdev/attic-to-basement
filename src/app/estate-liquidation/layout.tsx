import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("estateLiquidation");

export default function EstateLiquidationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
