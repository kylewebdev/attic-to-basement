"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";
import ServiceAreaMap from "./ServiceAreaMap";

export default function ServiceArea() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(true);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(4);

  useGSAP(() => {
    // Mobile: show completed map, skip scroll-scrub animation
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (isMobile) {
      setAnimated(false);
      return;
    }

    registerSection(start, duration, (tl, s, d) => {
      if (!sectionRef.current) return;

      const headline = sectionRef.current.querySelector("[data-area-headline]");
      const surroundingPaths = sectionRef.current.querySelectorAll(
        "[data-county-path]"
      );
      const servicePaths = sectionRef.current.querySelectorAll(
        "[data-service-path]"
      );
      const serviceLabels = sectionRef.current.querySelectorAll(
        "[data-service-label]"
      );
      const subtext = sectionRef.current.querySelector("[data-area-subtext]");

      if (headline) {
        tl.fromTo(
          headline,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: d * 0.15, ease: "power2.out" },
          s
        );
      }

      // Draw in surrounding counties first (subtle, fast)
      surroundingPaths.forEach((path, i) => {
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: d * 0.2,
            ease: "power1.inOut",
          },
          s + d * (0.1 + i * 0.015)
        );
      });

      // Draw in service area counties (more prominent, staggered)
      servicePaths.forEach((path, i) => {
        const countyStart = s + d * (0.35 + i * 0.1);
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: d * 0.15,
            ease: "power2.inOut",
          },
          countyStart
        );
        // Fill after drawing
        tl.to(
          path,
          {
            fill: "rgba(61, 74, 53, 0.5)", // sage-200 (now dark sage) with transparency
            stroke: "#a8b496", // sage-300 (lighter for visibility on dark)
            duration: d * 0.08,
            ease: "power2.out",
          },
          countyStart + d * 0.12
        );
      });

      // Fade in service area labels
      serviceLabels.forEach((label, i) => {
        tl.fromTo(
          label,
          { opacity: 0 },
          { opacity: 1, duration: d * 0.08, ease: "power2.out" },
          s + d * (0.5 + i * 0.08)
        );
      });

      if (subtext) {
        tl.fromTo(
          subtext,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: d * 0.15, ease: "power2.out" },
          s + d * 0.85
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="min-h-[100vh] flex items-center bg-warm-50"
    >
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2
          data-area-headline
          data-animate
          className="font-serif text-3xl md:text-4xl text-stone-200 mb-12"
        >
          Serving Northern California, from the Bay to the Foothills
        </h2>

        <ServiceAreaMap className="w-full max-w-2xl mx-auto mb-10" animated={animated} />

        <p
          data-area-subtext
          data-animate
          className="text-lg text-stone-400"
        >
          Not sure if you are in our range?{" "}
          <a
            href="tel:+19165211077"
            className="text-sage-300 hover:text-sage-400 font-semibold transition-colors"
          >
            Call us
          </a>
          . We will figure it out.
        </p>
      </div>
    </section>
  );
}
