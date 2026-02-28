"use client";

import posthog from "posthog-js";
import Hero from "@/components/sections/Hero";
import SectionHeading from "@/components/ui/SectionHeading";
import SaleCard from "@/components/ui/SaleCard";
import Button from "@/components/ui/Button";
import { sales } from "@/lib/data/sales";
import NewsletterSignup from "@/components/sections/NewsletterSignup";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function EstateSalesPage() {
    const containerRef = useScrollReveal();

    return (
        <div ref={containerRef}>
            <Hero
                title="Upcoming Estate Sales"
                subtitle="Browse our current and upcoming sales. Addresses are posted at 6 AM on sale day."
                colorScheme="estate-sales"
            />

            {/* Sale listings */}
            <section className="py-16 md:py-24 bg-bg-primary">
                <div className="max-w-6xl mx-auto px-4">
                    {sales.length > 0 ? (
                        <>
                            <div data-reveal>
                                <SectionHeading
                                    title="Current & Upcoming Sales"
                                    subtitle="Check back often — new sales are added regularly."
                                />
                            </div>
                            <div className="mt-12 grid gap-6">
                                {sales.map((sale, i) => (
                                    <div
                                        key={sale.id}
                                        data-reveal
                                        data-reveal-delay={i * 100}
                                    >
                                        <SaleCard sale={sale} />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div data-reveal className="text-center py-12">
                            <p className="text-lg text-text-secondary mb-2">
                                No upcoming sales right now.
                            </p>
                            <p className="text-text-muted mb-6">
                                Follow us on Instagram for the latest updates
                                and sale announcements.
                            </p>
                            <a
                                href="https://www.instagram.com/abe.liquidators/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sage-300 hover:text-sage-400 font-semibold transition-colors"
                                onClick={() =>
                                    posthog.capture("instagram_link_clicked", {
                                        location: "estate_sales_page",
                                    })
                                }
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Follow @abe.liquidators on Instagram
                            </a>
                        </div>
                    )}
                </div>
            </section>

            <NewsletterSignup />

            {/* Cross-sell */}
            <section className="py-16 md:py-24 bg-bg-alt">
                <div className="max-w-3xl mx-auto px-4 text-center" data-reveal>
                    <h2 className="font-serif text-3xl md:text-4xl text-text-heading">
                        Have a home that needs an estate sale?
                    </h2>
                    <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto">
                        We handle everything from start to finish — organizing,
                        staging, pricing, marketing, and cleanup. Let us take it
                        from here.
                    </p>
                    <div className="mt-8">
                        <Button href="/contact" variant="primary">
                            Schedule a Free Consultation
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
