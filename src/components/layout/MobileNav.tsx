"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Estate Sales", href: "/estate-sales" },
  { label: "Estate Liquidation", href: "/estate-liquidation" },
  { label: "Appraisals", href: "/appraisals" },
  { label: "Our Promise", href: "/our-promise" },
  { label: "Reviews", href: "/reviews" },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useGSAP({ scope: overlayRef });

  useEffect(() => {
    if (!overlayRef.current || !drawerRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { opacity: 1, visibility: "visible", duration: 0.3 });
      gsap.to(drawerRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(drawerRef.current, { x: "100%", duration: 0.3, ease: "power3.in" });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.visibility = "hidden";
          document.body.style.overflow = "";
        },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 opacity-0 invisible"
      aria-hidden={!isOpen}
    >
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close menu"
      />

      {/* Drawer */}
      <nav
        ref={drawerRef}
        className="absolute right-0 top-0 h-full w-72 bg-warm-white shadow-xl translate-x-full"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 text-stone-600 hover:text-stone-800 min-h-11 min-w-11 flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="px-6 space-y-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block py-3 text-lg text-stone-700 hover:text-sage-600 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="px-6 mt-6">
          <Button href="/#consultation" variant="primary" className="w-full">
            Free Consultation
          </Button>
        </div>
      </nav>
    </div>
  );
}
