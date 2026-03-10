"use client";

import Image from "next/image";
import Link from "next/link";
import { capture } from "@/lib/posthog";
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

function PartnerLink({ partner }: { partner: Partner }) {
    return (
        <a
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 py-3 first:pt-0 last:pb-0"
            onClick={() =>
                capture("partner_link_clicked", {
                    partner: partner.name,
                    category: partner.category,
                    url: partner.url,
                })
            }
        >
            <div className="min-w-0 flex-1">
                <span className="font-serif text-base text-text-heading group-hover:text-sage-300 transition-colors duration-150">
                    {partner.name}
                </span>
                {partner.description && (
                    <p className="text-text-secondary text-sm leading-snug mt-0.5">
                        {partner.description}
                    </p>
                )}
            </div>
            <svg
                className="shrink-0 mt-1 text-sage-200 group-hover:text-sage-300 transition-colors duration-150"
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
        </a>
    );
}

function CategoryCard({ group }: { group: GroupedPartners }) {
    return (
        <div className="rounded-xl bg-bg-card border border-border-default p-6 h-full">
            <h3 className="font-serif text-lg text-text-heading mb-4 pb-3 border-b border-border-default">
                {group.label}
            </h3>
            <div className="divide-y divide-border-default">
                {group.items.map((partner) => (
                    <PartnerLink key={partner.name} partner={partner} />
                ))}
            </div>
        </div>
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

            {/* Helpful Resources */}
            {hasResources && (
                <section className="py-16 md:py-24 bg-bg-primary">
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
                                    className="group flex flex-col rounded-xl bg-bg-card border border-border-default overflow-hidden hover:shadow-md transition-shadow duration-200 h-full"
                                    data-reveal
                                    data-reveal-delay={i * 100}
                                >
                                    {post.image && (
                                        <div className="relative aspect-[16/9] bg-sage-50">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 100vw, 50vw"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6 flex flex-col flex-1 justify-between">
                                        <div>
                                            <h3 className="font-serif text-lg text-text-heading mb-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-text-secondary leading-relaxed text-sm">
                                                {post.description}
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center gap-1 mt-4 text-sage-300 text-sm font-semibold">
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
                                    </div>
                                </Link>
                            ))}

                            {/* External resource links */}
                            {externalResources.map((resource, i) => (
                                <a
                                    key={resource.title}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col rounded-xl bg-bg-card border border-border-default p-6 hover:shadow-md transition-shadow duration-200 h-full"
                                    data-reveal
                                    data-reveal-delay={
                                        (posts.length + i) * 100
                                    }
                                    onClick={() =>
                                        capture(
                                            "resource_link_clicked",
                                            {
                                                resource: resource.title,
                                                url: resource.url,
                                            }
                                        )
                                    }
                                >
                                    <div className="flex-1">
                                        <h3 className="font-serif text-lg text-text-heading mb-2">
                                            {resource.title}
                                        </h3>
                                        <p className="text-text-secondary leading-relaxed text-sm">
                                            {resource.description}
                                        </p>
                                    </div>
                                    <span className="inline-flex items-center gap-1 mt-4 text-sage-300 text-sm font-semibold">
                                        Learn more
                                        <ExternalArrow />
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Partners Directory */}
            {hasPartners && (
                <section className="py-16 md:py-24 bg-bg-alt">
                    <div className="max-w-5xl mx-auto px-4">
                        <h2
                            className="font-serif text-2xl md:text-3xl text-text-heading mb-4"
                            data-reveal
                        >
                            Trusted Partners
                        </h2>
                        <p
                            className="text-text-secondary leading-relaxed mb-10 max-w-2xl"
                            data-reveal
                        >
                            Local professionals we trust and recommend to the families we work with.
                        </p>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {groupedPartners.map((group, gi) => (
                                <div
                                    key={group.category}
                                    data-reveal
                                    data-reveal-delay={gi * 80}
                                >
                                    <CategoryCard group={group} />
                                </div>
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
