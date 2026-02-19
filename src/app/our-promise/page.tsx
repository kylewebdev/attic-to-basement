import { getPageMetadata } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";

export const metadata = getPageMetadata("ourPromise");

export default function OurPromisePage() {
  return (
    <>
      <Hero
        title="Our Commitment to You"
        subtitle="We understand the emotional weight of estate liquidation. Here's what you can expect from us."
      />
      <ConsultationCTA />
    </>
  );
}
