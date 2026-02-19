"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";

const questions = [
  "What is worth selling? What should be donated? What do you keep?",
  "How do you price a lifetime of collected things fairly?",
  "Who handles the marketing, the staging, the buyers, the cleanup?",
  "And how do you do all of this while grieving, or while managing a move, or while living 200 miles away?",
];

// Progressive text styling — each question gets heavier
const questionStyles = [
  "text-stone-400 text-lg md:text-xl",
  "text-stone-500 text-xl md:text-2xl",
  "text-stone-600 text-xl md:text-2xl font-medium",
  "text-stone-700 text-2xl md:text-3xl font-semibold",
];

export default function Tension() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(1);

  registerSection(start, duration, (tl, s, d) => {
    if (!sectionRef.current) return;

    const headline = sectionRef.current.querySelector(
      "[data-tension-headline]"
    );
    const items = sectionRef.current.querySelectorAll("[data-tension-q]");

    if (headline) {
      tl.fromTo(
        headline,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: d * 0.15, ease: "power2.out" },
        s
      );
    }

    items.forEach((item, i) => {
      const segmentStart = s + d * (0.15 + i * 0.175);
      tl.fromTo(
        item,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: d * 0.15, ease: "power2.out" },
        segmentStart
      );
    });
  });

  useGSAP(() => {}, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="min-h-[200vh] flex items-start justify-center bg-warm-white"
    >
      <div className="max-w-3xl mx-auto px-4 pt-32 md:pt-40 space-y-10">
        <h2
          data-tension-headline
          data-animate
          className="font-serif text-3xl md:text-4xl text-stone-800 text-center"
        >
          Every room tells a story. Every drawer holds a decision.
        </h2>

        <div className="space-y-8 pt-8">
          {questions.map((q, i) => (
            <p
              key={i}
              data-tension-q
              data-animate
              className={`leading-relaxed ${questionStyles[i]}`}
            >
              {q}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
