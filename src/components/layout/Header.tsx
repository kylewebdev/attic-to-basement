"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import MobileNav from "@/components/layout/MobileNav";

const serviceLinks = [
  { label: "Estate Liquidation", href: "/estate-liquidation" },
  { label: "Appraisals", href: "/appraisals" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          if (!headerRef.current) return;
          const scrolled = self.scroll() > 80;
          gsap.to(headerRef.current, {
            paddingTop: scrolled ? "0.5rem" : "1.25rem",
            paddingBottom: scrolled ? "0.5rem" : "1.25rem",
            boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            duration: 0.3,
          });
          if (logoRef.current) {
            gsap.to(logoRef.current, {
              height: scrolled ? 36 : 56,
              duration: 0.3,
            });
          }
        },
      });
    },
    { scope: headerRef }
  );

  function openServices() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setServicesOpen(true);
  }

  function closeServices() {
    closeTimeout.current = setTimeout(() => setServicesOpen(false), 150);
  }

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 bg-warm-white/95 backdrop-blur-sm py-5 transition-[padding]"
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="block">
            <Image
              ref={logoRef}
              src="/logo.webp"
              alt="Attic to Basement Estate Liquidators"
              width={160}
              height={120}
              className="h-14 w-auto brightness-0 invert-[.75] sepia-[.15] saturate-[3] hue-rotate-[70deg]"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            <Link
              href="/estate-sales"
              className="text-sm font-sans text-stone-400 hover:text-sage-300 transition-colors"
            >
              Estate Sales
            </Link>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={closeServices}
            >
              <button
                className="text-sm font-sans text-stone-400 hover:text-sage-300 transition-colors flex items-center gap-1"
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                >
                  <path d="M3 4.5l3 3 3-3" />
                </svg>
              </button>

              {servicesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                  onMouseEnter={openServices}
                  onMouseLeave={closeServices}
                >
                  <div className="bg-warm-50 border border-warm-100 rounded-lg shadow-lg py-2 min-w-[180px]">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-stone-400 hover:text-sage-300 hover:bg-warm-white/50 transition-colors"
                        onClick={() => setServicesOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/our-promise"
              className="text-sm font-sans text-stone-400 hover:text-sage-300 transition-colors"
            >
              Our Promise
            </Link>
            <Link
              href="/reviews"
              className="text-sm font-sans text-stone-400 hover:text-sage-300 transition-colors"
            >
              Reviews
            </Link>

            <Button href="/contact" variant="primary">
              Free Consultation
            </Button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-stone-400 hover:text-stone-200 min-h-11 min-w-11 flex items-center justify-center"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
