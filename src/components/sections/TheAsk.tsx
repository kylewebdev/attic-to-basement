"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";
import Button from "@/components/ui/Button";

export default function TheAsk() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(6);

  useGSAP(() => {
    registerSection(start, duration, (tl, s, d) => {
      if (!sectionRef.current) return;

      const headline = sectionRef.current.querySelector("[data-ask-headline]");
      const subtext = sectionRef.current.querySelector("[data-ask-subtext]");
      const cta = sectionRef.current.querySelector("[data-ask-cta]");
      const phone = sectionRef.current.querySelector("[data-ask-phone]");

      if (headline) {
        tl.fromTo(
          headline,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: d * 0.4, ease: "power2.out" },
          s + d * 0.2
        );
      }
      if (subtext) {
        tl.fromTo(
          subtext,
          { opacity: 0 },
          { opacity: 1, duration: d * 0.3, ease: "power2.out" },
          s + d * 0.5
        );
      }
      if (cta) {
        tl.fromTo(
          cta,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: d * 0.2, ease: "power2.out" },
          s + d * 0.5
        );
      }
      if (phone) {
        tl.fromTo(
          phone,
          { opacity: 0 },
          { opacity: 1, duration: d * 0.3 },
          s + d * 0.7
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="min-h-[100vh] flex items-center bg-warm-white relative overflow-hidden"
    >
      {/* Center glow */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse at center, color-mix(in srgb, var(--color-gold-400) 8%, var(--color-warm-50)) 0%, transparent 45%)",
          animation: "breathe 6s ease-in-out infinite",
        }}
      />
      <div className="relative max-w-2xl mx-auto px-4 text-center py-20">
        <h2
          data-ask-headline
          data-animate
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-200 leading-tight"
        >
          Ready to talk? We are ready to listen.
        </h2>
        <p
          data-ask-subtext
          data-animate
          className="mt-6 text-lg text-stone-400 leading-relaxed"
        >
          Schedule your free, no-obligation consultation. We will come to you,
          walk through your situation, and give you a clear plan. No surprises.
        </p>
        <div data-ask-cta data-animate className="mt-10">
          <Button href="/contact" variant="primary">
            Schedule Your Free Consultation
          </Button>
        </div>
        <p
          data-ask-phone
          data-animate
          className="mt-6 text-stone-400"
        >
          Prefer to call?{" "}
          <a
            href="tel:+19165211077"
            className="text-sage-300 hover:text-sage-400 font-semibold transition-colors"
          >
            (916) 521-1077
          </a>
          . We are available 24/7.
        </p>
      </div>
    </section>
  );
}
