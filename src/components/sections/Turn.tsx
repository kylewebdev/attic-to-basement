"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@/lib/gsap";
import { useScrollStory, getSectionPosition } from "./ScrollStory";

export default function Turn() {
    const sectionRef = useRef<HTMLElement>(null);
    const { registerSection } = useScrollStory();
    const { start, duration } = getSectionPosition(2);

    useGSAP(
        () => {
            registerSection(start, duration, (tl, s, d) => {
                // Start animations well before the section scrolls into view
                // so elements are already fading in / drifting as the user approaches.
                const earlyStart = s - d * 0.35;
                if (!sectionRef.current) return;

                const headline = sectionRef.current.querySelector(
                    "[data-turn-headline]",
                );
                const subtext = sectionRef.current.querySelector(
                    "[data-turn-subtext]",
                );
                const supporting = sectionRef.current.querySelector(
                    "[data-turn-supporting]",
                );
                const photo =
                    sectionRef.current.querySelector("[data-turn-photo]");

                if (headline) {
                    tl.fromTo(
                        headline,
                        { opacity: 0, y: 40 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: d * 0.7,
                            ease: "power1.out",
                        },
                        earlyStart,
                    );
                }
                if (subtext) {
                    tl.fromTo(
                        subtext,
                        { opacity: 0, y: 24 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: d * 0.65,
                            ease: "power1.out",
                        },
                        earlyStart + d * 0.08,
                    );
                }
                if (supporting) {
                    tl.fromTo(
                        supporting,
                        { opacity: 0, y: 24 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: d * 0.65,
                            ease: "power1.out",
                        },
                        earlyStart + d * 0.16,
                    );
                }
                if (photo) {
                    tl.fromTo(
                        photo,
                        { opacity: 0, x: 40, y: 20 },
                        {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            duration: d * 0.7,
                            ease: "power1.out",
                        },
                        earlyStart + d * 0.04,
                    );
                }
            });
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            data-scroll-section
            aria-label="How we help"
            className="min-h-[100vh] flex items-center bg-sage-50"
        >
            <div className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text */}
                <div>
                    <h2
                        data-turn-headline
                        data-animate
                        className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-200 leading-tight"
                    >
                        That is where we come in.
                    </h2>
                    <p
                        data-turn-subtext
                        data-animate
                        className="mt-6 text-lg text-stone-400 leading-relaxed"
                    >
                        Attic to Basement Estate Liquidators handles everything,
                        from the first walkthrough to the final sweep, so you do
                        not have to figure it out alone.
                    </p>
                    <p
                        data-turn-supporting
                        data-animate
                        className="mt-4 text-stone-400 leading-relaxed"
                    >
                        Over 20 years of combined experience across Northern
                        California. Hundreds of families served. Led by Cortnee
                        Beggs, who treats every home like it matters, because it
                        does.
                    </p>
                </div>

                {/* Team photo */}
                <div
                    data-turn-photo
                    data-animate
                    className="relative aspect-[1/1] rounded-xl overflow-hidden"
                >
                    <Image
                        src="/lo.jpg"
                        alt="Estate liquidation professional ready to help"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>
            </div>
        </section>
    );
}
