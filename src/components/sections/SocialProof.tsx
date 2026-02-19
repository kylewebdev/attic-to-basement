"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";
import TestimonialCard from "@/components/ui/TestimonialCard";
import Button from "@/components/ui/Button";

const testimonials = [
  {
    quote:
      "Cortnee and her team turned what felt like an impossible task into something completely manageable. They organized my mother's entire home in just three days.",
    name: "Sarah M.",
    location: "Yelp",
    rating: 5,
  },
  {
    quote:
      "We were settling my father's estate from out of state and Cortnee handled every detail. The itemized report after the sale was incredibly thorough.",
    name: "David R.",
    location: "BBB",
    rating: 5,
  },
  {
    quote:
      "I've been to dozens of estate sales and ABE's are always the best organized. Fair prices, friendly staff, and the homes are staged beautifully.",
    name: "Linda K.",
    location: "EstateSales.org",
    rating: 5,
  },
  {
    quote:
      "Made an impossible situation manageable. We were grieving and overwhelmed, and Cortnee treated everything with such care and respect.",
    name: "James T.",
    location: "Yelp",
    rating: 5,
  },
  {
    quote:
      "Professional from start to finish. The sale brought in more than we expected, and the donation coordination afterward was a wonderful touch.",
    name: "Patricia H.",
    location: "EstateSales.org",
    rating: 4,
  },
];

const stats = [
  { value: 20, suffix: "+", label: "Years Combined Experience" },
  { value: 4.5, suffix: "", label: "Star Average Rating", decimals: 1 },
  { value: 49, suffix: "+", label: "Reviews on Yelp" },
  { value: 0, suffix: "", label: "BBB Accredited", isBadge: true },
];

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollStory();
  const { start, duration } = getSectionPosition(5);

  useGSAP(() => {
    registerSection(start, duration, (tl, s, d) => {
      if (!sectionRef.current) return;

      const headline = sectionRef.current.querySelector(
        "[data-social-headline]"
      );
      const cards = sectionRef.current.querySelectorAll("[data-social-card]");
      const statEls = sectionRef.current.querySelectorAll("[data-social-stat]");
      const statNumbers = sectionRef.current.querySelectorAll(
        "[data-stat-number]"
      );
      const footer = sectionRef.current.querySelector("[data-social-footer]");

      if (headline) {
        tl.fromTo(
          headline,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: d * 0.15, ease: "power2.out" },
          s
        );
      }

      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: d * 0.08, ease: "power2.out" },
          s + d * (0.15 + i * 0.08)
        );
      });

      statEls.forEach((stat, i) => {
        tl.fromTo(
          stat,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: d * 0.06, ease: "power2.out" },
          s + d * (0.55 + i * 0.05)
        );
      });

      // Animate counter numbers
      statNumbers.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-target") || "0");
        const decimals = parseInt(el.getAttribute("data-decimals") || "0");
        if (target > 0) {
          tl.from(
            { val: 0 },
            {
              val: target,
              duration: d * 0.2,
              ease: "power2.out",
              onUpdate: function () {
                const current = this.targets()[0].val as number;
                el.textContent = decimals > 0
                  ? current.toFixed(decimals)
                  : Math.round(current).toString();
              },
            },
            s + d * 0.55
          );
        }
      });

      if (footer) {
        tl.fromTo(
          footer,
          { opacity: 0 },
          { opacity: 1, duration: d * 0.15 },
          s + d * 0.8
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-scroll-section
      className="min-h-[200vh] bg-sage-50 py-20"
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2
          data-social-headline
          data-animate
          className="font-serif text-3xl md:text-4xl text-stone-800 text-center mb-12"
        >
          Do not take our word for it.
        </h2>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <div key={i} data-social-card data-animate>
              <TestimonialCard
                quote={t.quote}
                name={t.name}
                location={t.location}
                rating={t.rating}
              />
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-sage-200">
          {stats.map((stat, i) => (
            <div
              key={i}
              data-social-stat
              data-animate
              className="text-center"
            >
              {stat.isBadge ? (
                <div className="text-2xl md:text-3xl font-serif text-sage-600 font-bold">
                  BBB
                </div>
              ) : (
                <div className="text-2xl md:text-3xl font-serif text-sage-600 font-bold">
                  <span
                    data-stat-number
                    data-target={stat.value}
                    data-decimals={stat.decimals || 0}
                  >
                    0
                  </span>
                  {stat.suffix}
                </div>
              )}
              <p className="mt-1 text-sm text-stone-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div
          data-social-footer
          data-animate
          className="mt-10 text-center"
        >
          <Button href="/reviews" variant="secondary">
            See All Reviews
          </Button>
        </div>
      </div>
    </section>
  );
}
