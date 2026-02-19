"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";

export default function Turn() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(2);

  useGSAP(() => {
    registerSection(start, duration, (tl, s, d) => {
      if (!sectionRef.current) return;

      const headline = sectionRef.current.querySelector("[data-turn-headline]");
      const subtext = sectionRef.current.querySelector("[data-turn-subtext]");
      const supporting = sectionRef.current.querySelector(
        "[data-turn-supporting]"
      );
      const photo = sectionRef.current.querySelector("[data-turn-photo]");

      if (headline) {
        tl.fromTo(
          headline,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: d * 0.35, ease: "power3.out" },
          s + d * 0.15
        );
      }
      if (subtext) {
        tl.fromTo(
          subtext,
          { opacity: 0 },
          { opacity: 1, duration: d * 0.3, ease: "power2.out" },
          s + d * 0.4
        );
      }
      if (supporting) {
        tl.fromTo(
          supporting,
          { opacity: 0 },
          { opacity: 1, duration: d * 0.3, ease: "power2.out" },
          s + d * 0.4
        );
      }
      if (photo) {
        tl.fromTo(
          photo,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: d * 0.3, ease: "power2.out" },
          s + d * 0.5
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="min-h-[100vh] flex items-center bg-sage-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2
            data-turn-headline
            data-animate
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-800 leading-tight"
          >
            That is where we come in.
          </h2>
          <p
            data-turn-subtext
            data-animate
            className="mt-6 text-lg text-stone-600 leading-relaxed"
          >
            Attic to Basement Estate Liquidators handles everything, from the
            first walkthrough to the final sweep, so you do not have to figure
            it out alone.
          </p>
          <p
            data-turn-supporting
            data-animate
            className="mt-4 text-stone-500 leading-relaxed"
          >
            Over 20 years of combined experience across Northern California.
            Hundreds of families served. Led by Cortnee Beggs, who treats every
            home like it matters, because it does.
          </p>
        </div>

        {/* Photo placeholder */}
        <div
          data-turn-photo
          data-animate
          className="aspect-[4/3] rounded-xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center"
          aria-label="Team photo placeholder"
        >
          <span className="text-sage-400 text-sm uppercase tracking-widest">
            Team Photo
          </span>
        </div>
      </div>
    </section>
  );
}
