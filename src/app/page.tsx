import { getPageMetadata } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ServicesOverview from "@/components/sections/ServicesOverview";
import HowItWorks from "@/components/sections/HowItWorks";
import ServiceArea from "@/components/sections/ServiceArea";
import TestimonialHighlight from "@/components/sections/TestimonialHighlight";
import MeetCortnee from "@/components/sections/MeetCortnee";
import ConsultationCTA from "@/components/sections/ConsultationCTA";

export const metadata = getPageMetadata("home");

export default function HomePage() {
  return (
    <>
      <Hero
        title="We handle everything so you don't have to"
        subtitle="Full-service estate sales, buyouts, cleanouts, and appraisals for Northern California families. Over 20 years of combined experience."
        primaryCTA={{ label: "Schedule a Free Consultation", href: "#consultation" }}
        secondaryCTA={{ label: "Learn How It Works", href: "/estate-sales" }}
      />
      <TrustBar />
      <ServicesOverview />
      <HowItWorks />
      <ServiceArea />
      <TestimonialHighlight />
      <MeetCortnee />
      <ConsultationCTA showForm />
    </>
  );
}
