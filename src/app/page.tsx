import { getPageMetadata } from "@/lib/metadata";
import ScrollStory from "@/components/sections/ScrollStory";
import Hook from "@/components/sections/Hook";
import Tension from "@/components/sections/Tension";
import Turn from "@/components/sections/Turn";
import Process from "@/components/sections/Process";
import ServiceArea from "@/components/sections/ServiceArea";
import SocialProof from "@/components/sections/SocialProof";
import TheAsk from "@/components/sections/TheAsk";

export const metadata = getPageMetadata("home");

export default function HomePage() {
  return (
    <ScrollStory>
      <Hook />
      <Tension />
      <Turn />
      <Process />
      <ServiceArea />
      <SocialProof />
      <TheAsk />
    </ScrollStory>
  );
}
