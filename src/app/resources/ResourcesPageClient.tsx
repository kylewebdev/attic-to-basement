"use client";

import Link from "next/link";
import posthog from "posthog-js";
import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import Button from "@/components/ui/Button";
import type { Partner, ExternalResource } from "@/lib/data/partners";
import type { ResourcePost } from "@/lib/mdx";
import { useScrollReveal } from "@/lib/useScrollReveal";

interface GroupedPartners {
    category: string;
    label: string;
    items: Partner[];
}

interface Props {
    groupedPartners: GroupedPartners[];
    externalResources: ExternalResource[];
    posts: ResourcePost[];
}

function PartnerCard({ partner }: { partner: Partner }) {
    return (
        <a
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col rounded-xl bg-bg-card border border-border-default p-6 h-full hover:shadow-md transition-shadow duration-200"
            onClick={() =>
                posthog.capture("partner_link_clicked", {
                    partner: partner.name,
                    category: partner.category,
                    url: partner.url,
                })
            }
        >
            <div>
                <h3 className="font-serif text-xl text-text-heading mb-2">
                    {partner.name}
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm">
                    {partner.description}
                </p>
            </div>
            <span className="inline-flex items-center gap-1 mt-auto pt-4 text-sage-300 text-sm font-semibold">
                Visit website
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
            </span>
        </a>
    );
}

function ExternalArrow() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
    );
}

export default function ResourcesPageClient({
    groupedPartners,
    externalResources,
    posts,
}: Props) {
    const containerRef = useScrollReveal();

    const hasPartners = groupedPartners.length > 0;
    const hasResources = externalResources.length > 0 || posts.length > 0;

    return (
        <div ref={containerRef}>
            <Hero
                title="Resources & Partners"
                subtitle="Trusted professionals and helpful resources for families navigating estate transitions."
                colorScheme="resources"
            />

            {/* Partners */}
            {hasPartners && (
                <section className="py-16 md:py-24 bg-bg-primary">
                    <div className="max-w-5xl mx-auto px-4">
                        {groupedPartners.map((group, gi) => (
                            <div
                                key={group.category}
                                className={gi > 0 ? "mt-16" : ""}
                            >
                                <h2
                                    className="font-serif text-2xl md:text-3xl text-text-heading mb-8"
                                    data-reveal
                                >
                                    {group.label}
                                </h2>
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {group.items.map((partner, i) => (
                                        <div
                                            key={partner.name}
                                            data-reveal
                                            data-reveal-delay={i * 100}
                                        >
                                            <PartnerCard partner={partner} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Helpful Resources */}
            {hasResources && (
                <section className="py-16 md:py-24 bg-bg-alt">
                    <div className="max-w-5xl mx-auto px-4">
                        <h2
                            className="font-serif text-2xl md:text-3xl text-text-heading mb-8"
                            data-reveal
                        >
                            Helpful Resources
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {/* MDX resource posts (internal) */}
                            {posts.map((post, i) => (
                                <Link
                                    key={post.slug}
                                    href={`/resources/${post.slug}`}
                                    className="block rounded-xl bg-bg-card border border-border-default p-6 hover:shadow-md transition-shadow duration-200"
                                    data-reveal
                                    data-reveal-delay={i * 100}
                                >
                                    <h3 className="font-serif text-lg text-text-heading mb-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        {post.description}
                                    </p>
                                    <span className="inline-flex items-center gap-1 mt-3 text-sage-300 text-sm font-semibold">
                                        Read more
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </Link>
                            ))}

                            {/* External resource links */}
                            {externalResources.map((resource, i) => (
                                <a
                                    key={resource.title}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block rounded-xl bg-bg-card border border-border-default p-6 hover:shadow-md transition-shadow duration-200"
                                    data-reveal
                                    data-reveal-delay={
                                        (posts.length + i) * 100
                                    }
                                    onClick={() =>
                                        posthog.capture(
                                            "resource_link_clicked",
                                            {
                                                resource: resource.title,
                                                url: resource.url,
                                            }
                                        )
                                    }
                                >
                                    <h3 className="font-serif text-lg text-text-heading mb-2">
                                        {resource.title}
                                    </h3>
                                    <p className="text-text-secondary leading-relaxed text-sm">
                                        {resource.description}
                                    </p>
                                    <span className="inline-flex items-center gap-1 mt-3 text-sage-300 text-sm font-semibold">
                                        Learn more
                                        <ExternalArrow />
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Become a Partner */}
            <section className="py-16 md:py-24 bg-bg-primary">
                <div
                    className="max-w-2xl mx-auto px-4 text-center"
                    data-reveal
                >
                    <h2 className="font-serif text-2xl md:text-3xl text-text-heading mb-4">
                        Become a Partner
                    </h2>
                    <p className="text-text-secondary leading-relaxed mb-8">
                        We&apos;re always looking to connect with professionals
                        who share our commitment to helping families through
                        life transitions. If you&apos;d like to explore a
                        referral partnership, we&apos;d love to hear from you.
                    </p>
                    <Button href="/contact" variant="secondary">
                        Get in Touch
                    </Button>
                </div>
            </section>

            <ConsultationCTA />
        </div>
    );
}
