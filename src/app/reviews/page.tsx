import { getPageMetadata } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";

export const metadata = getPageMetadata("reviews");

export default function ReviewsPage() {
  return (
    <>
      <Hero
        title="What Our Clients Say"
        subtitle="The best measure of our work is the experience of the families we serve."
        colorScheme="reviews"
      />
      <ConsultationCTA />
    </>
  );
}
