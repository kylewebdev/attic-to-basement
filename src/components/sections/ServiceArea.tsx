"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";
import ServiceAreaMap from "./ServiceAreaMap";

export default function ServiceArea() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(4);

  registerSection(start, duration, (tl, s, d) => {
    if (!sectionRef.current) return;

    const headline = sectionRef.current.querySelector("[data-area-headline]");
    const regionPaths = sectionRef.current.querySelectorAll(
      "[data-region-path]"
    );
    const regionLabels = sectionRef.current.querySelectorAll(
      "[data-region-label]"
    );
    const subtext = sectionRef.current.querySelector("[data-area-subtext]");

    if (headline) {
      tl.fromTo(
        headline,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: d * 0.2, ease: "power2.out" },
        s
      );
    }

    // Animate each region sequentially
    regionPaths.forEach((path, i) => {
      const regionStart = s + d * (0.2 + i * 0.12);
      tl.to(
        path,
        {
          fill: "#d1d7c7", // sage-200
          stroke: "#5c7a45", // sage-500
          duration: d * 0.1,
          ease: "power2.out",
        },
        regionStart
      );
      if (regionLabels[i]) {
        tl.fromTo(
          regionLabels[i],
          { opacity: 0 },
          { opacity: 1, duration: d * 0.08 },
          regionStart + d * 0.02
        );
      }
    });

    if (subtext) {
      tl.fromTo(
        subtext,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: d * 0.2, ease: "power2.out" },
        s + d * 0.8
      );
    }
  });

  useGSAP(() => {}, { scope: sectionRef });

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
          className="font-serif text-3xl md:text-4xl text-stone-800 mb-12"
        >
          Serving Northern California, from the Bay to the Foothills
        </h2>

        <ServiceAreaMap className="w-full max-w-lg mx-auto text-stone-400 mb-10" />

        <p
          data-area-subtext
          data-animate
          className="text-lg text-stone-500"
        >
          Not sure if you are in our range?{" "}
          <a
            href="tel:+19165211077"
            className="text-sage-600 hover:text-sage-700 font-semibold transition-colors"
          >
            Call us
          </a>
          . We will figure it out.
        </p>
      </div>
    </section>
  );
}
