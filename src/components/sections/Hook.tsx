"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";

export default function Hook() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(0);

  useGSAP(() => {
    registerSection(start, duration, (tl, s, d) => {
      if (!sectionRef.current) return;

      const headline = sectionRef.current.querySelector("[data-hook-headline]");
      const subtext = sectionRef.current.querySelector("[data-hook-subtext]");
      const bg = sectionRef.current.querySelector("[data-hook-bg]");
      const arrow = sectionRef.current.querySelector("[data-hook-arrow]");

      if (headline) {
        tl.fromTo(
          headline,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: d * 0.3, ease: "power2.out" },
          s
        );
      }
      if (subtext) {
        tl.fromTo(
          subtext,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: d * 0.4, ease: "power2.out" },
          s + d * 0.2
        );
      }
      if (bg) {
        tl.fromTo(
          bg,
          { scale: 1 },
          { scale: 1.05, duration: d * 0.3, ease: "none" },
          s + d * 0.5
        );
      }
      if (arrow) {
        tl.to(arrow, { opacity: 0, duration: d * 0.3 }, s + d * 0.7);
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="relative min-h-[150vh] flex items-start justify-center overflow-hidden"
    >
      {/* Background placeholder */}
      <div
        data-hook-bg
        data-animate
        className="absolute inset-0 bg-gradient-to-b from-warm-white to-warm-50"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-40 md:pt-52">
        <h1
          data-hook-headline
          data-animate
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-800 leading-tight"
        >
          A lifetime of memories. One decision to make.
        </h1>
        <p
          data-hook-subtext
          data-animate
          className="mt-8 text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed"
        >
          Whether you are downsizing, settling an estate, or simply ready for a
          fresh start, the weight of sorting through a home full of belongings
          can feel impossible. You do not have to carry it alone.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        data-hook-arrow
        data-animate
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-stone-400 animate-bounce"
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
