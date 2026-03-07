import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    cities,
    services,
    getCityBySlug,
    getServiceBySlug,
} from "@/lib/data/service-areas";
import { siteUrl, siteName, sitePhone } from "@/lib/metadata";
import {
    getServiceAreaSchema,
    getServiceAreaBreadcrumbSchema,
} from "@/lib/schema";

interface PageProps {
    params: Promise<{ city: string; service: string }>;
}

export async function generateStaticParams() {
    return cities.flatMap((city) =>
        services.map((service) => ({
            city: city.slug,
            service: service.slug,
        }))
    );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { city: citySlug, service: serviceSlug } = await params;
    const city = getCityBySlug(citySlug);
    const service = getServiceBySlug(serviceSlug);

    if (!city || !service) return {};

    const title = `${service.name} in ${city.city}, CA | ${siteName}`;
    const description = service.metaDescription(city.city, city.county);
    const url = `${siteUrl}/services/${city.slug}/${service.slug}`;

    return {
        title,
        description,
        keywords: service.keywords(city.city, city.county),
        robots: "index, follow, max-snippet:-1, max-image-preview:large",
        alternates: { canonical: url },
        other: {
            "geo.region": "US-CA",
            "geo.placename": city.city,
            "geo.position": "",
            ICBM: "",
        },
        openGraph: {
            title,
            description,
            url,
            siteName,
            type: "website",
            images: [
                {
                    url: `${siteUrl}/og-image.jpg`,
                    width: 1200,
                    height: 630,
                    alt: `${service.name} in ${city.city}, CA — ${siteName}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${siteUrl}/og-image.jpg`],
        },
    };
}

export default async function ServiceAreaPage({ params }: PageProps) {
    const { city: citySlug, service: serviceSlug } = await params;
    const city = getCityBySlug(citySlug);
    const service = getServiceBySlug(serviceSlug);

    if (!city || !service) notFound();

    const otherService = services.find((s) => s.slug !== service.slug);
    const otherServicePath = otherService
        ? `/services/${city.slug}/${otherService.slug}`
        : null;

    const breadcrumbs = [
        { name: service.name, path: service.parentPaths[0] },
        { name: city.city, path: `/services/${city.slug}/${service.slug}` },
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        getServiceAreaSchema({
                            serviceName: service.name,
                            description: service.description(
                                city.city,
                                city.county
                            ),
                            path: `/services/${city.slug}/${service.slug}`,
                            city: city.city,
                            county: city.county,
                        })
                    ),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        getServiceAreaBreadcrumbSchema(breadcrumbs)
                    ),
                }}
            />

            {/* Hero */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-bg-alt border-b border-border-default">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h1 className="font-serif text-4xl md:text-5xl text-text-heading">
                        {service.name} in {city.city}, CA
                    </h1>
                    <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto">
                        {service.description(city.city, city.county)}
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="py-16 md:py-24 bg-bg-primary">
                <div className="max-w-3xl mx-auto px-4">
                    <p className="text-lg text-text-body leading-relaxed">
                        {service.intro(city.city, city.county)}
                    </p>
                </div>
            </section>

            {/* What's Included */}
            <section className="py-16 md:py-24 bg-bg-alt">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="font-serif text-3xl md:text-4xl text-text-heading text-center">
                        {service.slug === "estate-sales"
                            ? `What Our Estate Sales in ${city.city} Include`
                            : `Our Appraisal Services in ${city.city}`}
                    </h2>
                    <ul className="mt-12 grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
                        {service.benefits.map((benefit) => (
                            <li
                                key={benefit}
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
                                    {benefit}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Process */}
            <section className="py-16 md:py-24 bg-bg-primary">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="font-serif text-3xl md:text-4xl text-text-heading text-center">
                        {service.slug === "estate-sales"
                            ? "How Our Estate Sale Process Works"
                            : "How Our Appraisal Process Works"}
                    </h2>
                    <div className="mt-12 space-y-8">
                        {service.processSteps.map((step, i) => (
                            <div key={step.title} className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-500 text-white flex items-center justify-center font-semibold text-sm">
                                    {i + 1}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-text-heading">
                                        {step.title}
                                    </h3>
                                    <p className="mt-1 text-text-secondary">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service Area Context */}
            <section className="py-16 md:py-24 bg-bg-alt">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="font-serif text-3xl md:text-4xl text-text-heading">
                        Serving {city.city} and {city.county} County
                    </h2>
                    <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto">
                        Attic To Basement Estate Liquidators is proud to serve
                        families in {city.city} and the surrounding{" "}
                        {city.county} County communities. We are fully insured,
                        bonded, and{" "}
                        <a
                            href="https://www.bbb.org/us/ca/sacramento/profile/estate-liquidators/attic-to-basement-estate-liquidators-1156-90098497"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sage-300 underline underline-offset-2 hover:text-sage-500 transition-colors"
                        >
                            BBB accredited
                        </a>
                        , with over 20 years of combined experience.
                    </p>
                </div>
            </section>

            {/* Trust strip */}
            <section className="py-8 bg-bg-primary border-y border-border-default">
                <div className="max-w-3xl mx-auto px-4 text-center text-sm text-text-secondary font-semibold tracking-wide">
                    Fully Insured &amp; Bonded{" · "}BBB Accredited
                    {" · "}20+ Years Combined Experience
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24 bg-bg-alt">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="font-serif text-3xl md:text-4xl text-text-heading">
                        {service.slug === "estate-sales"
                            ? `Schedule Your Free Estate Sale Consultation`
                            : `Schedule Your Free Appraisal Consultation`}
                    </h2>
                    <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto">
                        Ready to get started? Contact us for a free,
                        no-obligation consultation. We respond to inquiries 7
                        days a week.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full bg-sage-500 text-white font-semibold px-8 py-3 hover:bg-sage-600 transition-colors min-h-11"
                        >
                            Schedule a Free Consultation
                        </Link>
                        <a
                            href={`tel:+1${sitePhone.replace(/\D/g, "")}`}
                            className="text-sage-300 hover:text-sage-400 font-semibold transition-colors"
                        >
                            Or call: {sitePhone}
                        </a>
                    </div>

                    {/* Cross-links */}
                    <div className="mt-8 space-y-2 text-sm text-text-secondary">
                        {otherService && otherServicePath && (
                            <p>
                                {service.crossLinkText(city.city)}.{" "}
                                <Link
                                    href={otherServicePath}
                                    className="text-sage-300 underline underline-offset-2 hover:text-sage-500 transition-colors"
                                >
                                    Learn more
                                </Link>
                            </p>
                        )}
                        <p>
                            <Link
                                href={service.parentPaths[0]}
                                className="text-sage-300 underline underline-offset-2 hover:text-sage-500 transition-colors"
                            >
                                View our {service.name.toLowerCase()} page
                            </Link>
                            {" · "}
                            <Link
                                href="/reviews"
                                className="text-sage-300 underline underline-offset-2 hover:text-sage-500 transition-colors"
                            >
                                Read client reviews
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
