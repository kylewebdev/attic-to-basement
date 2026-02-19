import { getPageMetadata } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";

export const metadata = getPageMetadata("appraisals");

export default function AppraisalsPage() {
  return (
    <>
      <Hero
        title="Accurate, Professional Appraisals"
        subtitle="Knowing what your belongings are worth is the foundation of a successful estate sale."
        colorScheme="appraisals"
      />
      <ConsultationCTA />
    </>
  );
}
