"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import { gsap, useGSAP } from "@/lib/gsap";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Estate Sales", href: "/estate-sales" },
  { label: "Our Promise", href: "/our-promise" },
  { label: "Reviews", href: "/reviews" },
];

const serviceLinks = [
  { label: "Estate Liquidation", href: "/estate-liquidation" },
  { label: "Appraisals", href: "/appraisals" },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  useGSAP({ scope: overlayRef });

  // Capture focus on open, restore on close
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Delay focus to allow drawer animation to start
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [isOpen]);

  // Escape key closes drawer
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;

      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    []
  );

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
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      onKeyDown={handleKeyDown}
    >
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Drawer */}
      <nav
        ref={drawerRef}
        className="absolute right-0 top-0 h-full w-72 bg-bg-card shadow-xl translate-x-full"
        aria-label="Mobile navigation"
      >
        <div className="flex justify-end p-4">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-heading min-h-11 min-w-11 flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="px-6 space-y-1">
          {/* Estate Sales — top level */}
          <li>
            <Link
              href="/estate-sales"
              onClick={onClose}
              className="block py-3 text-lg text-text-body hover:text-sage-300 transition-colors"
            >
              Estate Sales
            </Link>
          </li>

          {/* Services — expandable */}
          <li>
            <button
              onClick={() => setServicesExpanded(!servicesExpanded)}
              className="flex items-center justify-between w-full py-3 text-lg text-text-body hover:text-sage-300 transition-colors"
              aria-expanded={servicesExpanded}
            >
              Services
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform duration-200 ${servicesExpanded ? "rotate-180" : ""}`}
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
            {servicesExpanded && (
              <ul className="pl-4 space-y-1">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-2 text-base text-text-secondary hover:text-sage-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Remaining top-level links */}
          {navLinks.slice(1).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block py-3 text-lg text-text-body hover:text-sage-300 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="px-6 mt-6"
          onClick={() => posthog.capture("mobile_nav_cta_clicked", { destination: "/contact" })}
        >
          <Button href="/contact" variant="primary" className="w-full">
            Free Consultation
          </Button>
        </div>
      </nav>
    </div>
  );
}
