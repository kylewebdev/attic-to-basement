import { getPageMetadata } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";

export const metadata = getPageMetadata("estateSales");

export default function EstateSalesPage() {
  return (
    <>
      <Hero
        title="Full-Service Estate Sales, Start to Finish"
        subtitle="We handle every aspect of your estate sale with care and expertise."
      />
      <ConsultationCTA />
    </>
  );
}
