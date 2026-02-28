"use client";

import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function TermsPage() {
    const containerRef = useScrollReveal();

    return (
        <div ref={containerRef}>
            <Hero
                title="Terms of Service"
                subtitle="Terms and conditions for using our website."
                colorScheme="contact"
            />

            <section className="py-16 md:py-24 bg-bg-primary">
                <div className="max-w-3xl mx-auto px-4">
                    <p
                        data-reveal
                        className="text-sm text-text-muted mb-8"
                    >
                        Last Updated: November 30, 2023
                    </p>

                    <div
                        data-reveal
                        className="prose-legal space-y-8"
                    >
                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                1. Acceptance of Terms
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                By accessing or using the Attic to Basement
                                Estate Liquidators website, you agree to be
                                bound by these terms and conditions. If you
                                disagree, please refrain from using the website.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                2. Use of the Website
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                You agree to use the website for lawful purposes
                                only and in a manner consistent with all
                                applicable laws and regulations.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                3. Intellectual Property
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                All content on this website, including text,
                                graphics, logos, and images, is the property of
                                Attic to Basement Estate Liquidators and is
                                protected by copyright laws. Unauthorized use of
                                any content is prohibited.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                4. Accuracy of Information
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Attic to Basement Estate Liquidators strives to
                                provide accurate and up-to-date information on
                                the website. However, we do not guarantee the
                                content&apos;s accuracy, completeness, or
                                timeliness.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                5. Privacy Policy
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Our{" "}
                                <a
                                    href="/privacy"
                                    className="text-sage-300 hover:text-sage-400 underline underline-offset-2 transition-colors"
                                >
                                    privacy policy
                                </a>{" "}
                                governs personal information collection, use,
                                and disclosure. You consent to the terms
                                outlined in our Privacy Policy by using the
                                website.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                6. Links to Third-Party Websites
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                This website may contain links to third-party
                                websites. Attic to Basement Estate Liquidators
                                is not responsible for the content or practices
                                of these websites. Use them at your own risk.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                7. Limitation of Liability
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Attic to Basement Estate Liquidators is not
                                liable for direct, indirect, incidental,
                                consequential, or punitive damages arising from
                                your access to or use of the website.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                8. Modification of Terms
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Attic to Basement Estate Liquidators reserves
                                the right to modify these terms and conditions
                                at any time. Changes will be effective
                                immediately upon posting on the website.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                9. Contact Information
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                For questions or concerns regarding these terms
                                and conditions, please contact us at{" "}
                                <a
                                    href="mailto:abeliquidators@gmail.com"
                                    className="text-sage-300 hover:text-sage-400 underline underline-offset-2 transition-colors"
                                >
                                    abeliquidators@gmail.com
                                </a>
                            </p>
                        </div>

                        <p className="text-text-secondary leading-relaxed pt-4 border-t border-border-default">
                            By using this website, you acknowledge that you have
                            read, understood, and agree to be bound by these
                            terms and conditions.
                        </p>
                    </div>
                </div>
            </section>

            <ConsultationCTA />
        </div>
    );
}
