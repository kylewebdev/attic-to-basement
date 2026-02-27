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

// Reading pace weights — pause longer after sentence-ending punctuation
function getWordWeight(word: string): number {
  if (word.endsWith(".") || word.endsWith("?")) return 2.5;
  if (word.endsWith(",")) return 1.6;
  return 1;
}

export default function Tension() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(1);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const rootStyle = getComputedStyle(document.documentElement);
    const headingColor = rootStyle.getPropertyValue("--text-heading").trim();
    const dimColor = rootStyle.getPropertyValue("--text-dim").trim();

    // Mobile: show text at final color, skip scroll-scrub animation
    const isMobile = window.matchMedia("(max-width: 639px)").matches;
    if (isMobile) {
      const words = sectionRef.current.querySelectorAll("[data-word]");
      words.forEach((w) => {
        (w as HTMLElement).style.color = headingColor;
      });
      return;
    }

    registerSection(start, duration, (tl, s, d) => {
      if (!sectionRef.current) return;

      const words = sectionRef.current.querySelectorAll("[data-word]");
      if (words.length === 0) return;

      // Calculate total weight for natural reading rhythm
      const wordTexts = paragraph.split(/\s+/);
      const weights = wordTexts.map(getWordWeight);
      const totalWeight = weights.reduce((sum, w) => sum + w, 0);

      // Place each word's tween at a weighted position on the timeline
      const revealDuration = d * 0.9;
      let weightOffset = 0;

      words.forEach((word, i) => {
        const wordStart = s + d * 0.05 + (weightOffset / totalWeight) * revealDuration;
        const wordDur = (weights[i] / totalWeight) * revealDuration * 0.3;

        tl.fromTo(
          word,
          { color: dimColor },
          { color: headingColor, duration: wordDur, ease: "power1.out" },
          wordStart
        );

        weightOffset += weights[i];
      });
    });
  }, { scope: sectionRef });

  const words = paragraph.split(/\s+/);

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      aria-label="The challenge of estate liquidation"
      className="min-h-screen sm:min-h-[200vh] bg-bg-primary relative"
    >
      <div className="sm:sticky sm:top-0 min-h-screen flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed md:leading-relaxed lg:leading-relaxed text-center text-text-dim">
            {words.map((word, i) => (
              <span key={i} data-word data-animate className="inline">
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
