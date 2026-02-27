import Link from "next/link";
import Image from "next/image";

const navLinks = [
    { label: "Estate Sales", href: "/estate-sales" },
    { label: "Estate Liquidation", href: "/estate-liquidation" },
    { label: "Appraisals", href: "/appraisals" },
    { label: "Our Promise", href: "/our-promise" },
    { label: "Reviews", href: "/reviews" },
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
                            className="h-24 w-auto mb-6"
                            style={{ filter: "var(--logo-footer-filter)" }}
                        />
                        <p className="text-sm text-text-secondary mt-1">
                            Sacramento, CA 95821
                        </p>
                        <a
                            href="tel:+19165211077"
                            className="inline-block mt-3 text-sage-300 hover:text-sage-400 font-semibold transition-colors"
                        >
                            (916) 521-1077
                        </a>
                        <div className="mt-4 flex items-center gap-4">
                            <a
                                href="https://www.instagram.com/abe.liquidators"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-secondary hover:text-text-heading transition-colors"
                                aria-label="Instagram"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.tiktok.com/@attic.to.basement"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-secondary hover:text-text-heading transition-colors"
                                aria-label="TikTok"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.17v-3.44a4.85 4.85 0 01-3.77-1.47V6.69h3.77z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav aria-label="Footer navigation">
                        <p className="font-semibold text-text-heading mb-3">Pages</p>
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
                        <p className="font-semibold text-text-heading mb-3">Find Us</p>
                        <ul className="space-y-2 mb-6">
                            {externalLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-text-secondary hover:text-text-heading transition-colors"
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

                <div className="mt-10 pt-6 border-t border-border-default text-center text-sm text-text-secondary">
                    &copy; {new Date().getFullYear()} Attic to Basement Estate
                    Liquidators. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
