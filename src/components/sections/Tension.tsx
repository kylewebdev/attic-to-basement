"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";

const paragraph =
  "Every room tells a story. Every drawer holds a decision. " +
  "What is worth selling? What should be donated? What do you keep? " +
  "How do you price a lifetime of collected things fairly? " +
  "Who handles the marketing, the staging, the buyers, the cleanup? " +
  "And how do you do all of this while grieving, or while managing a move, " +
  "or while living 200 miles away?";

export default function Tension() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(1);

  useGSAP(() => {
    registerSection(start, duration, (tl, s, d) => {
      if (!sectionRef.current) return;

      const words = sectionRef.current.querySelectorAll("[data-word]");
      if (words.length === 0) return;

      // Stagger each word from muted to highlighted
      tl.fromTo(
        words,
        { color: "#d6d3d1" }, // stone-300
        {
          color: "#292524", // stone-800
          duration: d * 0.9,
          stagger: (d * 0.9) / words.length,
          ease: "none",
        },
        s + d * 0.05
      );
    });
  }, { scope: sectionRef });

  const words = paragraph.split(" ");

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="min-h-[200vh] bg-warm-white relative"
    >
      <div className="sticky top-0 min-h-screen flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed md:leading-relaxed lg:leading-relaxed text-center">
            {words.map((word, i) => (
              <span
                key={i}
                data-word
                data-animate
                className="inline-block mr-[0.3em] text-stone-300 transition-colors"
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
