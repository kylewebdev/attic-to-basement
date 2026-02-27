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
        <footer className="bg-warm-50 text-stone-300 py-12 border-t border-warm-100">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company info */}
                    <div>
                        <Image
                            src="/logo.webp"
                            alt="Attic to Basement Estate Liquidators"
                            width={160}
                            height={120}
                            className="h-12 w-auto mb-2 invert"
                        />
                        <p className="text-sm text-stone-400 mt-1">
                            Sacramento, CA 95821
                        </p>
                        <a
                            href="tel:+19165211077"
                            className="inline-block mt-3 text-sage-300 hover:text-sage-400 font-semibold transition-colors"
                        >
                            (916) 521-1077
                        </a>
                        <div className="mt-2">
                            <a
                                href="https://www.instagram.com/abe.liquidators"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-stone-400 hover:text-white transition-colors"
                            >
                                @abe.liquidators
                            </a>
                        </div>
                        <div className="mt-2">
                            <a
                                href="https://www.tiktok.com/@attic.to.basement"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-stone-400 hover:text-white transition-colors"
                            >
                                @attic.to.basement
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav aria-label="Footer navigation">
                        <p className="font-semibold text-white mb-3">Pages</p>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-stone-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* External links + service area */}
                    <div>
                        <p className="font-semibold text-white mb-3">Find Us</p>
                        <ul className="space-y-2 mb-6">
                            {externalLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-stone-400 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-stone-400">
                            Serving the Greater Sacramento, Placer County, El
                            Dorado County, Bay Area, and the Sierra foothills.
                        </p>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-warm-100 text-center text-sm text-stone-400">
                    &copy; {new Date().getFullYear()} Attic to Basement Estate
                    Liquidators. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
