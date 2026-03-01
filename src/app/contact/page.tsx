"use client";

import { useEffect } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import Hero from "@/components/sections/Hero";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function ContactPage() {
    const containerRef = useScrollReveal();

    useEffect(() => {
        posthog.capture("consultation_page_viewed");
    }, []);

    return (
        <div ref={containerRef}>
            <Hero
                title="Let Us Take It From Here"
                subtitle="Schedule your free consultation or reach out with any questions. No pressure, no obligation."
                colorScheme="contact"
            />

            <section className="py-16 md:py-24 bg-bg-primary">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left: Form */}
                        <div data-reveal>
                            <h2 className="font-serif text-2xl text-text-heading mb-6">
                                Request Your Free Consultation
                            </h2>
                            <ConsultationForm />
                        </div>

                        {/* Right: Contact info */}
                        <div data-reveal data-reveal-delay="100">
                            <h2 className="font-serif text-2xl text-text-heading mb-6">
                                Get in Touch Directly
                            </h2>

                            <div className="space-y-6">
                                {/* Phone */}
                                <div>
                                    <p className="text-sm font-semibold text-text-body mb-1">
                                        Phone
                                    </p>
                                    <a
                                        href="tel:+19165211077"
                                        className="text-lg text-sage-300 hover:text-sage-400 font-semibold transition-colors"
                                        onClick={() =>
                                            posthog.capture("phone_number_clicked", {
                                                location: "contact_page",
                                            })
                                        }
                                    >
                                        (916) 521-1077
                                    </a>
                                    <p className="text-sm text-text-secondary mt-1">
                                        Available 24/7
                                    </p>
                                </div>

                                {/* Location */}
                                <div>
                                    <p className="text-sm font-semibold text-text-body mb-1">
                                        Location
                                    </p>
                                    <p className="text-text-secondary">
                                        Sacramento, CA 95821
                                    </p>
                                </div>

                                {/* Instagram */}
                                <div>
                                    <p className="text-sm font-semibold text-text-body mb-1">
                                        Instagram
                                    </p>
                                    <a
                                        href="https://www.instagram.com/abe.liquidators"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sage-300 hover:text-sage-400 font-semibold transition-colors"
                                    >
                                        @abe.liquidators
                                    </a>
                                </div>

                                {/* Service area */}
                                <div>
                                    <p className="text-sm font-semibold text-text-body mb-1">
                                        Service Area
                                    </p>
                                    <p className="text-text-secondary leading-relaxed">
                                        We serve the Bay Area, Greater
                                        Sacramento, Placer County, El Dorado
                                        County, and the Sierra foothills.
                                    </p>
                                    <p className="text-text-muted text-sm mt-2">
                                        Not sure if you are in our range? Call
                                        us. We will figure it out.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reassurance */}
                    <p
                        data-reveal
                        className="mt-12 text-center text-text-muted text-sm"
                    >
                        We typically respond within 24 hours. Your information
                        stays private, always.
                    </p>
                    <p
                        data-reveal
                        className="mt-4 text-center text-sm text-text-secondary"
                    >
                        Learn more:{" "}
                        <Link
                            href="/our-promise"
                            className="text-sage-300 underline underline-offset-2 hover:text-sage-500 transition-colors"
                        >
                            Our Promise
                        </Link>
                        {" · "}
                        <Link
                            href="/reviews"
                            className="text-sage-300 underline underline-offset-2 hover:text-sage-500 transition-colors"
                        >
                            Reviews
                        </Link>
                        {" · "}
                        <Link
                            href="/estate-sales"
                            className="text-sage-300 underline underline-offset-2 hover:text-sage-500 transition-colors"
                        >
                            Upcoming Sales
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    );
}
