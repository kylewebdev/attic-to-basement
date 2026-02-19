import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("ourPromise");

export default function OurPromiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
