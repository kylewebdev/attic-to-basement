"use client";

import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import AccordionItem from "@/components/ui/AccordionItem";
import { faq } from "@/lib/data/faqs";
import { useScrollReveal } from "@/lib/useScrollReveal";

const services = [
    {
        title: "Estate Sales",
        description:
            "Full-service estate sale management. We organize, stage, price, market, execute, and clean up. You receive an itemized accounting of every sale. Remaining items are handled through buyout, donation, or disposal. One team, start to finish.",
    },
    {
        title: "Estate Buyouts",
        description:
            "Need to move faster than a traditional sale allows? We make a fair offer on the entire contents of a home. Quick, clean, and straightforward — ideal when speed matters more than maximizing individual item value.",
    },
    {
        title: "Cleanouts",
        description:
            "After a sale, after a buyout, or on their own. We clear out and clean up the property so it is ready for sale, rental, or whatever comes next. Donations are coordinated with the nonprofit of your choice.",
    },
];

const differentiators = [
    "Fully insured and bonded",
    "All necessary certifications and licenses",
    "Over 20 years of combined experience",
    "Tailored plans for every timeline and situation",
    "Post-sale donation coordination included",
];

export default function EstateLiquidationPage() {
    const containerRef = useScrollReveal();

    return (
        <div ref={containerRef}>
            <Hero
                title="Comprehensive Estate Liquidation Solutions"
                subtitle="Not every situation calls for a traditional sale. We offer multiple paths tailored to your needs."
                colorScheme="estate-liquidation"
            />

            {/* Service blocks */}
            <section className="py-16 md:py-24 bg-bg-primary">
                <div className="max-w-6xl mx-auto px-4">
                    <div data-reveal>
                        <SectionHeading
                            title="Services tailored to your situation"
                            subtitle="Every estate is different. We offer a range of services to match your timeline, goals, and comfort level."
                        />
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {services.map((service, i) => (
                            <div
                                key={service.title}
                                data-reveal
                                data-reveal-delay={i * 100}
                            >
                                <Card
                                    title={service.title}
                                    description={service.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Differentiators */}
            <section className="py-16 md:py-24 bg-bg-alt">
                <div className="max-w-4xl mx-auto px-4">
                    <div data-reveal>
                        <SectionHeading title="What makes us different" />
                    </div>
                    <ul className="mt-12 grid gap-4 sm:grid-cols-2">
                        {differentiators.map((item, i) => (
                            <li
                                key={item}
                                data-reveal
                                data-reveal-delay={i * 100}
                                className="flex items-start gap-3"
                            >
                                <span className="mt-0.5 flex-shrink-0 text-sage-500">
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                                <span className="text-text-body text-lg">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p
                        className="mt-10 text-center text-sm text-text-secondary"
                        data-reveal
                    >
                        See our reviews on{" "}
                        <a
                            href="https://www.yelp.com/biz/attic-to-basement-estate-liquidators-sacramento"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sage-300 underline underline-offset-2 hover:text-sage-500 transition-colors"
                        >
                            Yelp
                        </a>
                        {" · "}
                        Browse our sales on{" "}
                        <a
                            href="https://www.estatesales.net/companies/CA/Sacramento/95821/156176"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sage-300 underline underline-offset-2 hover:text-sage-500 transition-colors"
                        >
                            EstateSales.net
                        </a>
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 md:py-24 bg-bg-primary">
                <div className="max-w-3xl mx-auto px-4">
                    <div data-reveal>
                        <SectionHeading title="Frequently Asked Questions" />
                    </div>
                    <div className="mt-12" data-reveal data-reveal-delay={100}>
                        {faq.map((item) => (
                            <AccordionItem
                                key={item.question}
                                question={item.question}
                            >
                                {item.answer}
                            </AccordionItem>
                        ))}
                    </div>
                </div>
            </section>

            <ConsultationCTA />
        </div>
    );
}
