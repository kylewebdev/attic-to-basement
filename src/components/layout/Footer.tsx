"use client";

import Link from "next/link";
import Image from "next/image";
import { capture } from "@/lib/analytics";
import PhoneLink from "@/components/ui/PhoneLink";

const navLinks = [
    { label: "Estate Sales", href: "/estate-sales" },
    { label: "Estate Liquidation", href: "/estate-liquidation" },
    { label: "Appraisals", href: "/appraisals" },
    { label: "Our Promise", href: "/our-promise" },
    { label: "Reviews", href: "/reviews" },
    // { label: "Resources", href: "/resources" }, // Draft — re-enable when ready to publish
];

const externalLinks = [
    {
        label: "BBB",
        href: "https://www.bbb.org/us/ca/sacramento/profile/estate-liquidators/attic-to-basement-estate-liquidators-1156-90098497",
    },
    {
        label: "Yelp",
        href: "https://www.yelp.com/biz/attic-to-basement-estate-liquidators-sacramento",
    },
    {
        label: "EstateSales.net",
        href: "https://www.estatesales.net/companies/CA/Sacramento/95821/156176",
    },
    {
        label: "EstateSales.org",
        href: "https://estatesales.org/estate-sale-companies/attic-to-basement-estate-liquidators-23935",
    },
];

const socialLinks = [
    {
        label: "Instagram",
        href: "https://www.instagram.com/abe.liquidators/",
        path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=100094393143202",
        path: "M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.438H7.078v-3.489h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.974h-1.513c-1.49 0-1.956.931-1.956 1.887v2.26h3.328l-.532 3.489h-2.796V24C19.612 23.094 24 18.1 24 12.073z",
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@abeliquidators",
        path: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.17v-3.44a4.85 4.85 0 01-3.77-1.47V6.69h3.77z",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/cortnee-beggs",
        path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM3.555 20.452h3.564V9H3.555v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/channel/UCpjAUP5CTfaCRy-cl172TeA",
        path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
];

const auburnGoogleBusinessProfile =
    "https://www.google.com/maps/place/Attic+To+Basement+Estate+Liquidators/data=!4m2!3m1!1s0x0:0xfb929a50e6a0072a?sa=X&ved=1t:2428&hl=en&ictx=111";

export default function Footer() {
    return (
        <footer className="bg-bg-card text-text-body py-12 border-t border-border-default">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company info */}
                    <div>
                        <Image
                            src="/logo.webp"
                            alt="Attic to Basement Estate Liquidators"
                            width={160}
                            height={120}
                            className="h-24 w-auto mb-6 invert"
                        />
                        <p className="text-sm text-text-secondary mt-1">
                            Professional estate sales, liquidation, and
                            appraisal services across Sacramento and Northern
                            California.
                        </p>
                        <p className="text-sm text-text-secondary mt-1">
                            Sacramento, CA 95821
                        </p>
                        <PhoneLink
                            className="inline-block mt-3 text-sage-300 hover:text-sage-400 font-semibold transition-colors"
                            location="footer"
                        />
                        <div className="mt-4 flex flex-wrap items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-secondary hover:text-text-heading transition-colors"
                                    aria-label={`${social.label} (opens in a new tab)`}
                                    onClick={() =>
                                        capture("social_link_clicked", {
                                            platform: social.label,
                                            location: "footer",
                                        })
                                    }
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d={social.path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav aria-label="Footer navigation">
                        <h2 className="font-sans text-base font-semibold text-text-heading mb-3">Pages</h2>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-text-secondary hover:text-text-heading transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* External links + service area */}
                    <div>
                        <h2 className="font-sans text-base font-semibold text-text-heading mb-3">Find Us</h2>
                        <ul className="space-y-2 mb-6">
                            {externalLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-text-secondary hover:text-text-heading transition-colors"
                                        onClick={() =>
                                            capture("external_review_platform_clicked", {
                                                platform: link.label,
                                                location: "footer",
                                                url: link.href,
                                            })
                                        }
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-text-secondary">
                            Serving the Greater Sacramento, Placer County, El
                            Dorado County, Bay Area, and the Sierra foothills.
                        </p>
                    </div>
                </div>

                <section
                    className="mt-10 pt-8 border-t border-border-default"
                    aria-labelledby="google-business-profiles-heading"
                >
                    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-6 items-stretch">
                        <div className="flex flex-col justify-center">
                            <h2
                                id="google-business-profiles-heading"
                                className="font-sans text-base font-semibold text-text-heading mb-3"
                            >
                                Google Business Profile
                            </h2>
                            <p className="text-sm text-text-secondary mb-4">
                                Find our Auburn location on Google Maps for
                                directions and business information.
                            </p>
                            <a
                                href={auburnGoogleBusinessProfile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-11 w-fit items-center text-sm font-semibold text-sage-300 hover:text-sage-400 transition-colors"
                                onClick={() =>
                                    capture("google_business_profile_clicked", {
                                        location: "Auburn",
                                        placement: "footer",
                                    })
                                }
                            >
                                View Auburn on Google Maps
                                <span aria-hidden="true" className="ml-1">
                                    ↗
                                </span>
                            </a>
                        </div>
                        <iframe
                            title="Attic to Basement Estate Liquidators Auburn location on Google Maps"
                            src="https://www.google.com/maps?q=Attic%20To%20Basement%20Estate%20Liquidators%20Auburn%20CA&output=embed"
                            className="h-56 w-full rounded-xl border border-border-default"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </section>

                <div className="mt-10 pt-6 border-t border-border-default text-center text-sm text-text-secondary">
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-2">
                        <Link
                            href="/privacy"
                            className="hover:text-text-heading transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <span aria-hidden="true">&middot;</span>
                        <Link
                            href="/terms"
                            className="hover:text-text-heading transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                    &copy; {new Date().getFullYear()} Attic to Basement Estate
                    Liquidators. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
