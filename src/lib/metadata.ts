import type { Metadata } from "next";

const siteUrl = "https://abeliquidators.com";
const siteName = "ABE Liquidators";

type PageKey =
  | "home"
  | "estateSales"
  | "estateLiquidation"
  | "appraisals"
  | "ourPromise"
  | "reviews"
  | "contact";

const pages: Record<PageKey, { title: string; description: string; path: string }> = {
  home: {
    title: "Estate Sale Services Sacramento | ABE Liquidators",
    description:
      "Full-service estate sales, buyouts, cleanouts, and appraisals across Northern California. Free consultation. 20+ years experience.",
    path: "",
  },
  estateSales: {
    title: "Estate Sale Management | ABE Liquidators",
    description:
      "Professional estate sale services from setup to cleanup. Free estimates, expert pricing, and full marketing included.",
    path: "/estate-sales",
  },
  estateLiquidation: {
    title: "Estate Liquidation Services | ABE Liquidators",
    description:
      "Estate sales, buyouts, and cleanouts for Northern California families. Fully insured, bonded, and experienced.",
    path: "/estate-liquidation",
  },
  appraisals: {
    title: "Personal Property Appraisals | ABE Liquidators",
    description:
      "Accurate appraisals for household goods, antiques, collectibles, and more. Expert valuations backed by 20+ years of experience.",
    path: "/appraisals",
  },
  ourPromise: {
    title: "Our Commitment to You | ABE Liquidators",
    description:
      "Transparent, respectful, and professional estate liquidation. Learn about ABE's values and client-centered approach.",
    path: "/our-promise",
  },
  reviews: {
    title: "Client Reviews and Testimonials | ABE Liquidators",
    description:
      "See what families across Northern California say about working with ABE Liquidators. 4.5 stars across review platforms.",
    path: "/reviews",
  },
  contact: {
    title: "Contact Us | Free Consultation | ABE Liquidators",
    description:
      "Schedule a free, no-obligation estate sale consultation. Call (916) 521-1077 or fill out our contact form. Available 24/7.",
    path: "/contact",
  },
};

export function getPageMetadata(page: PageKey): Metadata {
  const { title, description, path } = pages[page];
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
