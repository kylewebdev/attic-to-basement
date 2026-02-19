"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";

export default function Hook() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(0);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const headline = sectionRef.current.querySelector("[data-hook-headline]");
    const subtext = sectionRef.current.querySelector("[data-hook-subtext]");
    const arrow = sectionRef.current.querySelector("[data-hook-arrow]");

    // Page-load entrance animation (not scroll-driven)
    const loadTl = gsap.timeline({ delay: 0.2 });
    if (headline) {
      loadTl.from(headline, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
      });
    }
    if (subtext) {
      loadTl.from(
        subtext,
        { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );
    }
    if (arrow) {
      loadTl.from(
        arrow,
        { opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    }

    // Only background zoom and arrow fade on the scrub timeline
    registerSection(start, duration, (tl, s, d) => {
      if (!sectionRef.current) return;

      const bg = sectionRef.current.querySelector("[data-hook-bg]");
      const scrollArrow = sectionRef.current.querySelector("[data-hook-arrow]");

      if (bg) {
        tl.fromTo(
          bg,
          { scale: 1 },
          { scale: 1.05, duration: d * 0.5, ease: "none" },
          s
        );
      }
      if (scrollArrow) {
        tl.to(scrollArrow, { opacity: 0, duration: d * 0.3 }, s + d * 0.3);
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="relative min-h-[115vh] overflow-hidden"
    >
      {/* Background image */}
      <div
        data-hook-bg
        className="absolute inset-0"
        aria-hidden="true"
      >
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Base overlay for text readability */}
        <div className="absolute inset-0 bg-warm-white/[0.78]" />
        {/* Edge fade — bottom dissolves into next section */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, var(--color-warm-white) 100%)",
          }}
        />
        {/* Edge fade — top softens the header boundary */}
        <div
          className="absolute inset-x-0 top-0 h-24"
          style={{
            background:
              "linear-gradient(to top, transparent 0%, var(--color-warm-white) 100%)",
          }}
        />
        {/* Edge fade — left */}
        <div
          className="absolute inset-y-0 left-0 w-1/4"
          style={{
            background:
              "linear-gradient(to left, transparent 0%, var(--color-warm-white) 100%)",
          }}
        />
        {/* Edge fade — right */}
        <div
          className="absolute inset-y-0 right-0 w-1/4"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, var(--color-warm-white) 100%)",
          }}
        />
      </div>

      <div className="sticky top-0 min-h-screen flex items-center justify-center relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1
            data-hook-headline
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-800 leading-tight"
          >
            A lifetime of memories. One decision to make.
          </h1>
          <p
            data-hook-subtext
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
      </div>
    </section>
  );
}
