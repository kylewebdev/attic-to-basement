"use client";

import { useState } from "react";
import posthog from "posthog-js";
import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { testimonials, type Testimonial } from "@/lib/data/testimonials";
import { useScrollReveal } from "@/lib/useScrollReveal";

type FilterCategory = "all" | Testimonial["category"];

const filters: { label: string; value: FilterCategory }[] = [
    { label: "All", value: "all" },
    { label: "Settling an Estate", value: "settling" },
    { label: "Downsizing", value: "downsizing" },
    { label: "Buyer Experience", value: "buyer" },
];

const platformLinks = [
    { label: "Yelp", href: "https://www.yelp.com/biz/attic-to-basement-estate-liquidators-sacramento" },
    { label: "BBB", href: "https://www.bbb.org/us/ca/sacramento/profile/estate-liquidators/attic-to-basement-estate-liquidators-1156-90098497" },
    { label: "EstateSales.org", href: "https://estatesales.org/estate-sale-companies/attic-to-basement-estate-liquidators-23935" },
    { label: "EstateSales.net", href: "https://www.estatesales.net/companies/CA/Sacramento/95821/156176" },
];

export default function ReviewsPage() {
    const containerRef = useScrollReveal();
    const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

    const filtered =
        activeFilter === "all"
            ? testimonials
            : testimonials.filter((t) => t.category === activeFilter);

    return (
        <div ref={containerRef}>
            <Hero
                title="What Families Are Saying"
                subtitle="4.5 out of 5 stars across review platforms. Here is what our clients and buyers have to say."
                colorScheme="reviews"
            />

            <section className="py-16 md:py-24 bg-bg-primary">
                <div className="max-w-5xl mx-auto px-4">
                    {/* Filter tabs */}
                    <div
                        data-reveal
                        className="flex flex-wrap gap-2 justify-center mb-10"
                    >
                        {filters.map((f) => (
                            <button
                                key={f.value}
                                onClick={() => {
                                    setActiveFilter(f.value);
                                    posthog.capture("review_filter_selected", {
                                        filter_value: f.value,
                                        filter_label: f.label,
                                    });
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors min-h-11 ${
                                    activeFilter === f.value
                                        ? "bg-sage-500 text-white"
                                        : "bg-bg-card text-text-secondary hover:bg-border-default border border-border-default"
                                }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    {/* Testimonial grid — CSS columns for masonry effect */}
                    <div className="columns-1 md:columns-2 gap-6 space-y-6">
                        {filtered.map((t, i) => (
                            <div
                                key={i}
                                className="break-inside-avoid"
                                data-reveal
                                data-reveal-delay={i * 50}
                            >
                                <TestimonialCard
                                    quote={t.quote}
                                    name={t.name}
                                    location={t.source}
                                    rating={t.rating}
                                />
                            </div>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <p className="text-center text-text-secondary py-12">
                            No reviews in this category yet. Try selecting a
                            different filter.
                        </p>
                    )}
                </div>
            </section>

            {/* External platform links */}
            <section className="py-12 bg-bg-alt">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <p
                        className="font-serif text-xl text-text-heading mb-6"
                        data-reveal
                    >
                        Read more reviews on these platforms
                    </p>
                    <div
                        className="flex flex-wrap justify-center gap-4"
                        data-reveal
                        data-reveal-delay="100"
                    >
                        {platformLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-5 py-2.5 rounded-lg border-2 border-sage-500 text-sage-300 hover:bg-bg-alt font-semibold text-sm transition-colors min-h-11"
                                onClick={() =>
                                    posthog.capture("external_review_platform_clicked", {
                                        platform: link.label,
                                        url: link.href,
                                    })
                                }
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <ConsultationCTA />
        </div>
    );
}
