import Link from "next/link";

const navLinks = [
  { label: "Estate Sales", href: "/estate-sales" },
  { label: "Estate Liquidation", href: "/estate-liquidation" },
  { label: "Appraisals", href: "/appraisals" },
  { label: "Our Promise", href: "/our-promise" },
  { label: "Reviews", href: "/reviews" },
];

const externalLinks = [
  { label: "BBB", href: "https://www.bbb.org" },
  { label: "Yelp", href: "https://www.yelp.com" },
  { label: "EstateSales.net", href: "https://www.estatesales.net" },
  { label: "EstateSales.org", href: "https://www.estatesales.org" },
];

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-warm-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info */}
          <div>
            <p className="font-serif text-xl text-white mb-2">
              ABE Liquidators
            </p>
            <p className="text-sm text-warm-200">
              Attic to Basement Estate Liquidators
            </p>
            <p className="text-sm text-warm-200 mt-1">Sacramento, CA 95821</p>
            <a
              href="tel:+19165211077"
              className="inline-block mt-3 text-sage-300 hover:text-sage-200 font-semibold transition-colors"
            >
              (916) 521-1077
            </a>
            <div className="mt-2">
              <a
                href="https://www.instagram.com/abe.liquidators"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-warm-200 hover:text-white transition-colors"
              >
                @abe.liquidators
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
                    className="text-sm text-warm-200 hover:text-white transition-colors"
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
                    className="text-sm text-warm-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-sm text-warm-200">
              Serving the Bay Area, Greater Sacramento, Placer County, El Dorado
              County, and the Sierra foothills.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-700 text-center text-sm text-warm-200">
          &copy; {new Date().getFullYear()} Attic to Basement Estate
          Liquidators. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
