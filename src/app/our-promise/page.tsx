"use client";

import Hero from "@/components/sections/Hero";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useScrollReveal } from "@/lib/useScrollReveal";

const values = [
    {
        title: "Trust & Transparency",
        description:
            "We communicate openly at every step. Honest appraisals, clear expectations, no hidden fees or surprises.",
    },
    {
        title: "Expertise You Can Rely On",
        description:
            "Our certified team brings over 20 years of combined experience to every project. We know the market, the process, and how to get the best outcome.",
    },
    {
        title: "Confidentiality & Respect",
        description:
            "Estate work is personal. We treat your belongings, your home, and your family\u2019s privacy with the care they deserve.",
    },
    {
        title: "Efficiency Without Shortcuts",
        description:
            "We work quickly when you need us to, but we never sacrifice quality or thoroughness. Every item gets the attention it deserves.",
    },
    {
        title: "Good Neighbors",
        description:
            "We manage our sales to minimize disruption to the surrounding community. Parking, foot traffic, signage \u2014 we think about all of it.",
    },
];

const credentials = [
    {
        text: "BBB Accredited",
        href: "https://www.bbb.org/us/ca/sacramento/profile/estate-liquidators/attic-to-basement-estate-liquidators-1156-90098497",
    },
    { text: "Fully Insured & Bonded" },
    { text: "Licensed & Certified" },
];

export default function OurPromisePage() {
    const containerRef = useScrollReveal();

    return (
        <div ref={containerRef}>
            <Hero
                title="The People Behind the Promise"
                subtitle="We understand the emotional weight of estate liquidation. Here is what you can expect from us."
                colorScheme="our-promise"
            />

            {/* Cortnee's Story */}
            {/*<section className="py-16 md:py-24 bg-warm-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div
                            data-reveal
                            className="aspect-[4/5] rounded-xl bg-warm-50 border border-warm-100 flex items-center justify-center"
                        >
                            <span className="text-stone-500 text-sm">
                                Photo of Cortnee
                            </span>
                        </div>

                        <div data-reveal data-reveal-delay="200">
                            <h2 className="font-serif text-3xl text-stone-200 mb-6">
                                Meet Cortnee Beggs
                            </h2>
                            <div className="space-y-4 text-stone-400 leading-relaxed">
                                <p>
                                    Cortnee Beggs started Attic to Basement
                                    Estate Liquidators because she saw families
                                    struggling through one of the hardest parts
                                    of a major life transition &mdash; figuring
                                    out what to do with a lifetime of
                                    belongings.
                                </p>
                                <p>
                                    With over two decades of combined experience
                                    across Northern California, she has built a
                                    team that treats every home like it matters
                                    &mdash; because it does. From the first
                                    walkthrough to the final sweep, her approach
                                    is simple: handle everything with honesty,
                                    care, and the kind of thoroughness that lets
                                    families focus on what really matters.
                                </p>
                                <p>
                                    Whether you are settling an estate,
                                    downsizing, or just ready for a fresh start,
                                    Cortnee and her team are here to make the
                                    process as smooth and respectful as
                                    possible.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>*/}

            {/* Values */}
            <section className="py-16 md:py-24 bg-sage-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div data-reveal>
                        <SectionHeading
                            title="Our commitment to you"
                            subtitle="These are the principles that guide every project we take on."
                        />
                    </div>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {values.map((value, i) => (
                            <div
                                key={value.title}
                                data-reveal
                                data-reveal-delay={i * 100}
                            >
                                <Card
                                    title={value.title}
                                    description={value.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Credentials */}
            <section className="py-12 bg-warm-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div
                        data-reveal
                        className="flex flex-wrap justify-center gap-6 md:gap-10"
                    >
                        {credentials.map((credential) =>
                            credential.href ? (
                                <a
                                    key={credential.text}
                                    href={credential.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-stone-300 font-semibold text-sm md:text-base underline decoration-sage-500 underline-offset-2 hover:text-sage-300 transition-colors"
                                >
                                    {credential.text}
                                </a>
                            ) : (
                                <span
                                    key={credential.text}
                                    className="text-stone-300 font-semibold text-sm md:text-base"
                                >
                                    {credential.text}
                                </span>
                            ),
                        )}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 bg-sage-50">
                <div className="max-w-3xl mx-auto px-4 text-center" data-reveal>
                    <p className="text-lg text-stone-400 mb-6">
                        See what our clients have to say.
                    </p>
                    <Button href="/reviews" variant="primary">
                        Read Our Reviews
                    </Button>
                </div>
            </section>
        </div>
    );
}
