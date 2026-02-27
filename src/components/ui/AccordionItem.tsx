"use client";

import { useState } from "react";
import type { ReactNode } from "react";

interface AccordionItemProps {
    question: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

export default function AccordionItem({
    question,
    children,
    defaultOpen = false,
}: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-warm-100">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full py-5 text-left text-lg font-medium text-stone-200 hover:text-sage-300 transition-colors"
                aria-expanded={isOpen}
            >
                {question}
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`flex-shrink-0 ml-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                >
                    <path d="M4 6l4 4 4-4" />
                </svg>
            </button>
            {isOpen && (
                <div className="pb-5 text-stone-400 leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_li]:mb-1 [&_strong]:text-stone-300">
                    {children}
                </div>
            )}
        </div>
    );
}
