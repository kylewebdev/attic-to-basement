"use client";

import { useRef, useCallback, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

interface FilterAnimationOptions {
    /** Ref to the container element (shared with useScrollReveal) */
    containerRef: RefObject<HTMLDivElement | null>;
    /** Selector for filterable items within the container (default: "[data-filter-item]") */
    itemSelector?: string;
    /** Duration in seconds for exit animation (default: 0.35) */
    exitDuration?: number;
    /** Duration in seconds for enter animation (default: 0.4) */
    enterDuration?: number;
    /** Stagger in seconds between items (default: 0.04) */
    stagger?: number;
}

export function useFilterAnimation(options: FilterAnimationOptions) {
    const {
        containerRef,
        itemSelector = "[data-filter-item]",
        exitDuration = 0.35,
        enterDuration = 0.4,
        stagger = 0.04,
    } = options;

    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const applyFilter = useCallback(
        (shouldShow: (el: HTMLElement) => boolean) => {
            const container = containerRef.current;
            if (!container) return;

            // Kill any in-progress animation
            if (timelineRef.current) {
                timelineRef.current.kill();
                timelineRef.current = null;
            }

            const allItems = Array.from(
                container.querySelectorAll<HTMLElement>(itemSelector)
            );

            // Force-reveal any unrevealed scroll-reveal items
            allItems.forEach((el) => {
                if (el.hasAttribute("data-reveal")) {
                    el.style.opacity = "1";
                    el.style.transform = "none";
                    el.style.transitionDelay = "0ms";
                }
            });

            const exiting: HTMLElement[] = [];
            const entering: HTMLElement[] = [];
            const staying: HTMLElement[] = [];

            allItems.forEach((el) => {
                const isCurrentlyHidden =
                    el.classList.contains("filter-hidden");
                const shouldBeVisible = shouldShow(el);

                if (!shouldBeVisible && !isCurrentlyHidden) {
                    exiting.push(el);
                } else if (shouldBeVisible && isCurrentlyHidden) {
                    entering.push(el);
                } else if (shouldBeVisible) {
                    staying.push(el);
                }
            });

            // Respect prefers-reduced-motion
            const prefersReduced = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (prefersReduced) {
                exiting.forEach((el) => {
                    el.classList.add("filter-hidden");
                });
                entering.forEach((el) => {
                    el.classList.remove("filter-hidden");
                    el.style.opacity = "1";
                    el.style.height = "";
                    el.style.overflow = "";
                    el.style.paddingTop = "";
                    el.style.paddingBottom = "";
                    el.style.marginBottom = "";
                });
                return;
            }

            const tl = gsap.timeline({
                onComplete: () => {
                    timelineRef.current = null;
                },
            });
            timelineRef.current = tl;

            // Phase 1: Exit — collapse height + fade out
            if (exiting.length > 0) {
                // Capture natural heights and set overflow hidden
                exiting.forEach((el) => {
                    el.style.overflow = "hidden";
                });

                tl.to(exiting, {
                    opacity: 0,
                    height: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginBottom: 0,
                    duration: exitDuration,
                    stagger: stagger,
                    ease: "power2.in",
                    onComplete: () => {
                        exiting.forEach((el) => {
                            el.classList.add("filter-hidden");
                            // Clear inline styles so .filter-hidden takes over
                            gsap.set(el, {
                                clearProps:
                                    "opacity,height,paddingTop,paddingBottom,marginBottom,overflow",
                            });
                        });
                    },
                });
            }

            // Phase 2: Enter — expand height + fade in
            if (entering.length > 0) {
                const enterLabel = exiting.length > 0 ? ">" : 0;

                tl.call(
                    () => {
                        // Remove filter-hidden and prepare for animation
                        entering.forEach((el) => {
                            el.classList.remove("filter-hidden");
                            // Measure natural height
                            el.style.overflow = "hidden";
                            el.style.height = "auto";
                            el.style.opacity = "1";
                        });

                        // Use GSAP's from to animate from 0
                        const heights = entering.map(
                            (el) => el.offsetHeight
                        );
                        entering.forEach((el, i) => {
                            gsap.set(el, {
                                height: 0,
                                opacity: 0,
                                paddingTop: 0,
                                paddingBottom: 0,
                                marginBottom: 0,
                            });
                            // Store natural height for animation
                            el.dataset.naturalHeight = String(heights[i]);
                        });
                    },
                    [],
                    enterLabel
                );

                tl.to(
                    entering,
                    {
                        opacity: 1,
                        height: (i: number, el: HTMLElement) =>
                            Number(el.dataset.naturalHeight),
                        paddingTop: (i: number, el: HTMLElement) => {
                            el.style.paddingTop = "";
                            const val = getComputedStyle(el).paddingTop;
                            el.style.paddingTop = "0px";
                            return val;
                        },
                        paddingBottom: (i: number, el: HTMLElement) => {
                            el.style.paddingBottom = "";
                            const val = getComputedStyle(el).paddingBottom;
                            el.style.paddingBottom = "0px";
                            return val;
                        },
                        marginBottom: (i: number, el: HTMLElement) => {
                            el.style.marginBottom = "";
                            const val = getComputedStyle(el).marginBottom;
                            el.style.marginBottom = "0px";
                            return val;
                        },
                        duration: enterDuration,
                        stagger: stagger,
                        ease: "power2.out",
                        onComplete: () => {
                            entering.forEach((el) => {
                                gsap.set(el, {
                                    clearProps:
                                        "opacity,height,paddingTop,paddingBottom,marginBottom,overflow",
                                });
                                delete el.dataset.naturalHeight;
                            });
                        },
                    },
                    ">"
                );
            }
        },
        [containerRef, itemSelector, exitDuration, enterDuration, stagger]
    );

    return { applyFilter };
}
