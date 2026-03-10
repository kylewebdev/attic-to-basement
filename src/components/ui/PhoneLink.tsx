"use client";

import { capture } from "@/lib/posthog";

export const PHONE_NUMBER = "(916) 521-1077";
export const PHONE_HREF = "tel:+19165211077";

interface PhoneLinkProps {
    children?: React.ReactNode;
    className?: string;
    location: string;
}

export default function PhoneLink({
    children,
    className = "text-sage-300 hover:text-sage-400 font-semibold transition-colors",
    location,
}: PhoneLinkProps) {
    return (
        <a
            href={PHONE_HREF}
            className={className}
            onClick={() =>
                capture("phone_number_clicked", { location })
            }
        >
            {children ?? PHONE_NUMBER}
        </a>
    );
}
