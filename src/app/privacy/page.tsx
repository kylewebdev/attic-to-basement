"use client";

import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function PrivacyPage() {
    const containerRef = useScrollReveal();

    return (
        <div ref={containerRef}>
            <Hero
                title="Privacy Policy"
                subtitle="How we collect, use, and protect your information."
                colorScheme="our-promise"
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
                        <p className="text-text-secondary leading-relaxed">
                            Welcome to the Attic to Basement Estate Liquidators
                            website. We respect your privacy and are committed
                            to protecting your personal information. This
                            Privacy Policy outlines how we collect, use, and
                            safeguard your information when you visit our
                            website.
                        </p>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                1. Information We Collect
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-3">
                                We may collect the following types of
                                information when you use our website:
                            </p>
                            <p className="text-text-secondary leading-relaxed mb-3">
                                <strong className="text-text-body">
                                    Personal Information:
                                </strong>{" "}
                                We may collect personal information, such as
                                names, addresses, email addresses, and phone
                                numbers, when voluntarily provided by users
                                through our website forms.
                            </p>
                            <p className="text-text-secondary leading-relaxed">
                                <strong className="text-text-body">
                                    Non-Personal Information:
                                </strong>{" "}
                                We may automatically collect non-personal
                                information, including but not limited to
                                browser type, IP address, and operating system,
                                to improve our website&apos;s functionality and
                                user experience.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                2. How We Use Your Information
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-3">
                                We use the collected information for the
                                following purposes:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
                                <li>
                                    To provide requested services and respond to
                                    inquiries.
                                </li>
                                <li>
                                    To communicate with clients and users.
                                </li>
                                <li>
                                    For statistical and analytical purposes to
                                    improve our website.
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                3. Information Sharing
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                We do not sell, trade, or otherwise transfer
                                personal information to third parties without
                                your consent, except as required by law.
                                Non-personal information may be shared with
                                trusted third parties for analytics and website
                                optimization purposes.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                4. Security
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                We implement security measures to protect
                                against unauthorized access, alteration,
                                disclosure, or destruction of personal
                                information.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                5. Cookies
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Our website may use cookies to enhance the user
                                experience. Users can control cookie settings in
                                their browsers, but disabling cookies may affect
                                website functionality.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                6. Links to Third-Party Websites
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Our website may contain links to third-party
                                websites. We are not responsible for the privacy
                                practices or content of these websites.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                7. Changes to the Privacy Policy
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                We reserve the right to update our privacy
                                policy. Any changes will be posted on this page
                                with a revised effective date.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                8. Your Consent
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                By using our website, you consent to the terms
                                outlined in this privacy policy.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                9. Contact Information
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                For questions or concerns regarding this privacy
                                policy, please contact us at{" "}
                                <a
                                    href="mailto:abeliquidators@gmail.com"
                                    className="text-sage-300 hover:text-sage-400 underline underline-offset-2 transition-colors"
                                >
                                    abeliquidators@gmail.com
                                </a>
                            </p>
                        </div>

                        <p className="text-text-secondary leading-relaxed pt-4 border-t border-border-default">
                            We appreciate your trust in Attic to Basement
                            Estate Liquidators. Thank you for visiting our
                            website.
                        </p>
                    </div>
                </div>
            </section>

            <ConsultationCTA />
        </div>
    );
}
