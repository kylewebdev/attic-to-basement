"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MobileNav from "@/components/layout/MobileNav";

const serviceLinks = [
  { label: "Estate Liquidation", href: "/estate-liquidation" },
  { label: "Appraisals", href: "/appraisals" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
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
              scale: scrolled ? 0.75 : 1,
              transformOrigin: "left center",
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-sage-500 focus:text-white focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 bg-warm-white/95 backdrop-blur-sm py-5 transition-[padding]"
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef}>
            <Logo />
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            <Link
              href="/estate-sales"
              className="text-sm font-sans text-text-secondary hover:text-sage-300 transition-colors"
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
                className="text-sm font-sans text-text-secondary hover:text-sage-300 transition-colors flex items-center gap-1"
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
                  <div className="bg-bg-card border border-border-default rounded-lg shadow-lg py-2 min-w-[180px]">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-text-secondary hover:text-sage-300 hover:bg-bg-primary/50 transition-colors"
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
              className="text-sm font-sans text-text-secondary hover:text-sage-300 transition-colors"
            >
              Our Promise
            </Link>
            <Link
              href="/reviews"
              className="text-sm font-sans text-text-secondary hover:text-sage-300 transition-colors"
            >
              Reviews
            </Link>

            <ThemeToggle />

            <Button href="/contact" variant="primary">
              Free Consultation
            </Button>
          </nav>

          {/* Mobile: theme toggle + hamburger */}
          <div className="lg:hidden flex items-center">
            <ThemeToggle />
            <button
              className="p-2 text-text-secondary hover:text-text-heading min-h-11 min-w-11 flex items-center justify-center"
            onClick={() => {
              setMobileNavOpen(true);
              posthog.capture("mobile_nav_opened");
            }}
            aria-label="Open menu"
          >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
