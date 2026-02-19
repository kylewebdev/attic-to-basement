"use client";

import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { useScrollReveal } from "@/lib/useScrollReveal";

const appraisalCategories = [
    {
        title: "Household Goods",
        description:
            "Furniture, kitchenware, linens, decor, and everyday items assessed for fair market value.",
    },
    {
        title: "Antiques",
        description:
            "Period furniture, vintage items, and historical pieces evaluated with expert knowledge of current markets.",
    },
    {
        title: "Collectibles",
        description:
            "Coins, stamps, sports memorabilia, figurines, and specialty collections priced accurately.",
    },
    {
        title: "Furniture",
        description:
            "From mid-century modern to traditional hardwood pieces, we know what buyers are looking for.",
    },
    {
        title: "Fine Art",
        description:
            "Paintings, prints, sculptures, and decorative art appraised based on artist, condition, and provenance.",
    },
    {
        title: "Jewelry & Accessories",
        description:
            "Costume and fine jewelry, watches, and accessories evaluated for resale or insurance purposes.",
    },
];

const appraisalReasons = [
    "Estate sale preparation",
    "Insurance documentation",
    "Legal and probate proceedings",
    "Divorce settlements",
    "Charitable donation valuation",
];

const credentials = [
    {
        title: "Certified Appraisals",
        description: "Accurate, market-informed valuations",
    },
    {
        title: "20+ Years Experience",
        description: "Deep knowledge across all categories",
    },
    {
        title: "Trusted & Professional",
        description: "Insured, bonded, and BBB accredited",
    },
];

export default function AppraisalsPage() {
    const containerRef = useScrollReveal();

    return (
        <div ref={containerRef}>
            <Hero
                title="Accurate, Professional Appraisals"
                subtitle="Knowing what your belongings are worth is the foundation of a successful estate sale."
                colorScheme="appraisals"
            />

            {/* What we appraise */}
            <section className="py-16 md:py-24 bg-warm-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div data-reveal>
                        <SectionHeading
                            title="What we appraise"
                            subtitle="From everyday household items to rare collectibles, we provide accurate valuations across a wide range of categories."
                        />
                    </div>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {appraisalCategories.map((category, i) => (
                            <div
                                key={category.title}
                                data-reveal
                                data-reveal-delay={i * 100}
                            >
                                <Card
                                    title={category.title}
                                    description={category.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* When you need an appraisal */}
            <section className="py-16 md:py-24 bg-sage-50">
                <div className="max-w-4xl mx-auto px-4">
                    <div data-reveal>
                        <SectionHeading title="When you need an appraisal" />
                    </div>
                    <ul className="mt-12 grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
                        {appraisalReasons.map((reason, i) => (
                            <li
                                key={reason}
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
                                <span className="text-stone-300 text-lg">
                                    {reason}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Credentials */}
            <section className="py-16 md:py-24 bg-warm-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid gap-6 md:grid-cols-3">
                        {credentials.map((credential, i) => (
                            <div
                                key={credential.title}
                                data-reveal
                                data-reveal-delay={i * 100}
                            >
                                <Card
                                    title={credential.title}
                                    description={credential.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ConsultationCTA />
        </div>
    );
}
