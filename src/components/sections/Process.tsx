"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";

const steps = [
  {
    number: 1,
    title: "Free Consultation",
    description:
      "You call or fill out a form. We come to you, walk through the property, and talk through your goals. No cost, no pressure, no obligation.",
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
  },
  {
    number: 2,
    title: "Planning and Appraisal",
    description:
      "We evaluate everything in the home. Our certified team prices items accurately based on current market value, not guesswork. Together, we build a plan tailored to your timeline and needs.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  },
  {
    number: 3,
    title: "Organizing and Staging",
    description:
      "We transform the space. Items are sorted, cleaned, displayed, and arranged for maximum buyer appeal.",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
  {
    number: 4,
    title: "Marketing and Promotion",
    description:
      "Your sale gets listed on EstateSales.net, EstateSales.org, and promoted across our channels. Addresses go live at 6 AM on sale day. We bring the buyers to you.",
    icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
  },
  {
    number: 5,
    title: "Sale Day Execution",
    description:
      "We run the entire sale: managing foot traffic, answering questions, handling transactions, and keeping everything organized and secure. You can be there or not. We have it covered.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    number: 6,
    title: "Post-Sale Resolution",
    description:
      "After the sale, we handle remaining items through buyout, cleanout, or coordinated donation to a nonprofit of your choice. You get an itemized list of everything sold. The home is left clean and ready for its next chapter.",
    icon: "M5 13l4 4L19 7",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(3);

  useGSAP(() => {
    registerSection(start, duration, (tl, s, d) => {
      if (!sectionRef.current) return;

      const headline = sectionRef.current.querySelector(
        "[data-process-headline]"
      );
      const progressLine = sectionRef.current.querySelector(
        "[data-process-line]"
      );
      const stepEls = sectionRef.current.querySelectorAll("[data-process-step]");

      if (headline) {
        tl.fromTo(
          headline,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: d * 0.1, ease: "power2.out" },
          s
        );
      }

      if (progressLine) {
        tl.fromTo(
          progressLine,
          { scaleY: 0 },
          { scaleY: 1, duration: d * 0.85, ease: "none" },
          s + d * 0.1
        );
      }

      stepEls.forEach((step, i) => {
        const stepStart = s + d * (0.1 + i * 0.15);
        const icon = step.querySelector("[data-step-icon]");
        const text = step.querySelector("[data-step-text]");

        if (icon) {
          tl.fromTo(
            icon,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: d * 0.08, ease: "back.out(1.7)" },
            stepStart
          );
        }
        if (text) {
          tl.fromTo(
            text,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: d * 0.1, ease: "power2.out" },
            stepStart + d * 0.03
          );
        }

        // Fade previous step's text
        if (i > 0) {
          const prevText = stepEls[i - 1].querySelector("[data-step-text]");
          if (prevText) {
            tl.to(
              prevText,
              { opacity: 0.4, duration: d * 0.08 },
              stepStart
            );
          }
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="min-h-[300vh] bg-warm-white relative"
    >
      <div className="sticky top-0 min-h-screen flex items-center py-32 md:py-40">
        <div className="max-w-3xl mx-auto px-4">
          <h2
            data-process-headline
            data-animate
            className="font-serif text-3xl md:text-4xl text-stone-200 text-center mb-16"
          >
            From attic to basement. Here is how it works.
          </h2>

          <div className="relative">
            {/* Progress line */}
            <div
              data-process-line
              className="absolute left-5 md:left-6 top-0 bottom-0 w-0.5 bg-sage-200 origin-top"
              aria-hidden="true"
            />

            <div className="space-y-16">
              {steps.map((step) => (
                <div
                  key={step.number}
                  data-process-step
                  className="relative flex gap-6 md:gap-8"
                >
                  {/* Icon circle */}
                  <div
                    data-step-icon
                    data-animate
                    className="relative z-10 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-sage-500 text-white flex items-center justify-center"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d={step.icon} />
                    </svg>
                  </div>

                  {/* Text */}
                  <div data-step-text data-animate className="pt-1">
                    <h3 className="font-serif text-xl md:text-2xl text-stone-200 mb-2">
                      Step {step.number}: {step.title}
                    </h3>
                    <p className="text-stone-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
