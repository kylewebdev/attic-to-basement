"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

interface ScrollStoryContextValue {
  timeline: gsap.core.Timeline | null;
  registerSection: (
    position: number,
    duration: number,
    callback: (tl: gsap.core.Timeline, start: number, dur: number) => void
  ) => void;
}

const ScrollStoryContext = createContext<ScrollStoryContextValue>({
  timeline: null,
  registerSection: () => {},
});

export function useScrollStory() {
  return useContext(ScrollStoryContext);
}

// Section heights in vh units, matching the storyboard
const SECTION_HEIGHTS = [150, 200, 100, 300, 100, 200, 100]; // 7 sections, 1250vh total

function getSectionPosition(index: number): { start: number; duration: number } {
  const total = SECTION_HEIGHTS.reduce((sum, h) => sum + h, 0);
  let offset = 0;
  for (let i = 0; i < index; i++) {
    offset += SECTION_HEIGHTS[i];
  }
  return { start: offset / total, duration: SECTION_HEIGHTS[index] / total };
}

export { getSectionPosition, SECTION_HEIGHTS };

export default function ScrollStory({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const registrations = useRef<
    Array<{
      position: number;
      duration: number;
      callback: (tl: gsap.core.Timeline, start: number, dur: number) => void;
    }>
  >([]);

  const registerSection = (
    position: number,
    duration: number,
    callback: (tl: gsap.core.Timeline, start: number, dur: number) => void
  ) => {
    registrations.current.push({ position, duration, callback });
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      // Check for mobile — use intersection reveals instead of scrub
      const isMobile = window.matchMedia("(max-width: 639px)").matches;

      if (isMobile) {
        // Mobile: simple intersection-based reveals for each section
        const sections = containerRef.current.querySelectorAll("[data-scroll-section]");
        sections.forEach((section) => {
          const targets = section.querySelectorAll("[data-animate]");
          if (targets.length === 0) return;

          gsap.set(targets, { opacity: 0, y: 30 });

          ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            onEnter: () => {
              gsap.to(targets, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
              });
            },
            once: true,
          });
        });
        return;
      }

      // Desktop: monolithic scrubbed timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      timelineRef.current = tl;

      // Process all registered sections
      registrations.current.forEach(({ position, duration, callback }) => {
        callback(tl, position, duration);
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <ScrollStoryContext.Provider
      value={{ timeline: null, registerSection }}
    >
      <div ref={containerRef}>{children}</div>
    </ScrollStoryContext.Provider>
  );
}
