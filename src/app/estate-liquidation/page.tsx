import { getPageMetadata } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";

export const metadata = getPageMetadata("estateLiquidation");

export default function EstateLiquidationPage() {
  return (
    <>
      <Hero
        title="Comprehensive Estate Liquidation Solutions"
        subtitle="Not every situation calls for a traditional sale. We offer multiple paths tailored to your needs."
        colorScheme="estate-liquidation"
      />
      <ConsultationCTA />
    </>
  );
}
