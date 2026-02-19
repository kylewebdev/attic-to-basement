"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import MobileNav from "@/components/layout/MobileNav";

const navLinks = [
  { label: "Estate Sales", href: "/estate-sales" },
  { label: "Estate Liquidation", href: "/estate-liquidation" },
  { label: "Appraisals", href: "/appraisals" },
  { label: "Our Promise", href: "/our-promise" },
  { label: "Reviews", href: "/reviews" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-sans text-stone-400 hover:text-sage-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/#consultation" variant="primary">
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
