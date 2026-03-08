"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { sitePhone } from "@/lib/metadata";

interface ServiceAreaCTAProps {
  serviceSlug: string;
  cityName: string;
}

export default function ServiceAreaCTA({ serviceSlug, cityName }: ServiceAreaCTAProps) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-full bg-sage-500 text-white font-semibold px-8 py-3 hover:bg-sage-600 transition-colors min-h-11"
        onClick={() =>
          posthog.capture("service_area_cta_clicked", {
            service: serviceSlug,
            city: cityName,
          })
        }
      >
        Schedule a Free Consultation
      </Link>
      <a
        href={`tel:+1${sitePhone.replace(/\D/g, "")}`}
        className="text-sage-300 hover:text-sage-400 font-semibold transition-colors"
        onClick={() =>
          posthog.capture("service_area_phone_clicked", {
            service: serviceSlug,
            city: cityName,
          })
        }
      >
        Or call: {sitePhone}
      </a>
    </div>
  );
}
