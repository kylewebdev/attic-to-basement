# Legal Pages (Privacy Policy & Terms of Service) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add `/privacy` and `/terms` pages with user-provided legal content, linked from the footer.

**Architecture:** Two new Next.js App Router pages following the existing page pattern (Hero + prose content + ConsultationCTA). Footer updated with a legal links row. Metadata and sitemap entries added.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS

---

### Task 1: Add metadata entries for both legal pages

**Files:**
- Modify: `src/lib/metadata.ts`

**Step 1: Add "privacy" and "terms" to the PageKey union type**

In `src/lib/metadata.ts`, update the `PageKey` type to include the new pages, and add their entries to the `pages` record:

```typescript
type PageKey =
    | "home"
    | "estateSales"
    | "estateLiquidation"
    | "appraisals"
    | "ourPromise"
    | "reviews"
    | "contact"
    | "privacy"
    | "terms";
```

Then add to the `pages` object (after the `contact` entry):

```typescript
    privacy: {
        title: "Privacy Policy | Attic To Basement Estate Liquidators",
        description:
            "How Attic To Basement Estate Liquidators collects, uses, and protects your personal information.",
        path: "/privacy",
    },
    terms: {
        title: "Terms of Service | Attic To Basement Estate Liquidators",
        description:
            "Terms and conditions for using the Attic To Basement Estate Liquidators website.",
        path: "/terms",
    },
```

**Step 2: Verify the build still passes**

Run: `npm run build`
Expected: Build succeeds with no type errors.

**Step 3: Commit**

```bash
git add src/lib/metadata.ts
git commit -m "feat: add metadata entries for privacy and terms pages"
```

---

### Task 2: Add sitemap entries for both legal pages

**Files:**
- Modify: `src/app/sitemap.ts`

**Step 1: Add entries for /privacy and /terms**

Add these two entries to the end of the returned array in `src/app/sitemap.ts`:

```typescript
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
```

**Step 2: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add privacy and terms to sitemap"
```

---

### Task 3: Create the Privacy Policy page

**Files:**
- Create: `src/app/privacy/page.tsx`

**Step 1: Create the page file**

Create `src/app/privacy/page.tsx` with the following content. This follows the same pattern as other pages: `"use client"`, `useScrollReveal`, Hero, content sections, ConsultationCTA. The content uses `max-w-3xl` for a comfortable prose reading width. Reuse the `"our-promise"` colorScheme for the Hero (warm, subdued).

```tsx
"use client";

import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function PrivacyPage() {
    const containerRef = useScrollReveal();

    return (
        <div ref={containerRef}>
            <Hero
                title="Privacy Policy"
                subtitle="How we collect, use, and protect your information."
                colorScheme="our-promise"
            />

            <section className="py-16 md:py-24 bg-bg-primary">
                <div className="max-w-3xl mx-auto px-4">
                    <p
                        data-reveal
                        className="text-sm text-text-muted mb-8"
                    >
                        Last Updated: November 30, 2023
                    </p>

                    <div
                        data-reveal
                        className="prose-legal space-y-8"
                    >
                        <p className="text-text-secondary leading-relaxed">
                            Welcome to the Attic to Basement Estate Liquidators
                            website. We respect your privacy and are committed
                            to protecting your personal information. This
                            Privacy Policy outlines how we collect, use, and
                            safeguard your information when you visit our
                            website.
                        </p>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                1. Information We Collect
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-3">
                                We may collect the following types of
                                information when you use our website:
                            </p>
                            <p className="text-text-secondary leading-relaxed mb-3">
                                <strong className="text-text-body">
                                    Personal Information:
                                </strong>{" "}
                                We may collect personal information, such as
                                names, addresses, email addresses, and phone
                                numbers, when voluntarily provided by users
                                through our website forms.
                            </p>
                            <p className="text-text-secondary leading-relaxed">
                                <strong className="text-text-body">
                                    Non-Personal Information:
                                </strong>{" "}
                                We may automatically collect non-personal
                                information, including but not limited to
                                browser type, IP address, and operating system,
                                to improve our website&apos;s functionality and
                                user experience.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                2. How We Use Your Information
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-3">
                                We use the collected information for the
                                following purposes:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
                                <li>
                                    To provide requested services and respond to
                                    inquiries.
                                </li>
                                <li>
                                    To communicate with clients and users.
                                </li>
                                <li>
                                    For statistical and analytical purposes to
                                    improve our website.
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                3. Information Sharing
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                We do not sell, trade, or otherwise transfer
                                personal information to third parties without
                                your consent, except as required by law.
                                Non-personal information may be shared with
                                trusted third parties for analytics and website
                                optimization purposes.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                4. Security
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                We implement security measures to protect
                                against unauthorized access, alteration,
                                disclosure, or destruction of personal
                                information.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                5. Cookies
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Our website may use cookies to enhance the user
                                experience. Users can control cookie settings in
                                their browsers, but disabling cookies may affect
                                website functionality.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                6. Links to Third-Party Websites
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Our website may contain links to third-party
                                websites. We are not responsible for the privacy
                                practices or content of these websites.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                7. Changes to the Privacy Policy
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                We reserve the right to update our privacy
                                policy. Any changes will be posted on this page
                                with a revised effective date.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                8. Your Consent
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                By using our website, you consent to the terms
                                outlined in this privacy policy.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                9. Contact Information
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                For questions or concerns regarding this privacy
                                policy, please contact us at{" "}
                                <a
                                    href="mailto:abeliquidators@gmail.com"
                                    className="text-sage-300 hover:text-sage-400 underline underline-offset-2 transition-colors"
                                >
                                    abeliquidators@gmail.com
                                </a>
                            </p>
                        </div>

                        <p className="text-text-secondary leading-relaxed pt-4 border-t border-border-default">
                            We appreciate your trust in Attic to Basement
                            Estate Liquidators. Thank you for visiting our
                            website.
                        </p>
                    </div>
                </div>
            </section>

            <ConsultationCTA />
        </div>
    );
}
```

**Step 2: Verify the page renders**

Run: `npm run build`
Expected: Build succeeds. Page is accessible at `/privacy`.

**Step 3: Commit**

```bash
git add src/app/privacy/page.tsx
git commit -m "feat: add privacy policy page"
```

---

### Task 4: Create the Terms of Service page

**Files:**
- Create: `src/app/terms/page.tsx`

**Step 1: Create the page file**

Create `src/app/terms/page.tsx`. Same structure as the privacy page but with terms content. Reuse `"contact"` colorScheme to differentiate visually.

```tsx
"use client";

import Hero from "@/components/sections/Hero";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function TermsPage() {
    const containerRef = useScrollReveal();

    return (
        <div ref={containerRef}>
            <Hero
                title="Terms of Service"
                subtitle="Terms and conditions for using our website."
                colorScheme="contact"
            />

            <section className="py-16 md:py-24 bg-bg-primary">
                <div className="max-w-3xl mx-auto px-4">
                    <p
                        data-reveal
                        className="text-sm text-text-muted mb-8"
                    >
                        Last Updated: November 30, 2023
                    </p>

                    <div
                        data-reveal
                        className="prose-legal space-y-8"
                    >
                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                1. Acceptance of Terms
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                By accessing or using the Attic to Basement
                                Estate Liquidators website, you agree to be
                                bound by these terms and conditions. If you
                                disagree, please refrain from using the website.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                2. Use of the Website
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                You agree to use the website for lawful purposes
                                only and in a manner consistent with all
                                applicable laws and regulations.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                3. Intellectual Property
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                All content on this website, including text,
                                graphics, logos, and images, is the property of
                                Attic to Basement Estate Liquidators and is
                                protected by copyright laws. Unauthorized use of
                                any content is prohibited.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                4. Accuracy of Information
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Attic to Basement Estate Liquidators strives to
                                provide accurate and up-to-date information on
                                the website. However, we do not guarantee the
                                content&apos;s accuracy, completeness, or
                                timeliness.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                5. Privacy Policy
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Our{" "}
                                <a
                                    href="/privacy"
                                    className="text-sage-300 hover:text-sage-400 underline underline-offset-2 transition-colors"
                                >
                                    privacy policy
                                </a>{" "}
                                governs personal information collection, use,
                                and disclosure. You consent to the terms
                                outlined in our Privacy Policy by using the
                                website.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                6. Links to Third-Party Websites
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                This website may contain links to third-party
                                websites. Attic to Basement Estate Liquidators
                                is not responsible for the content or practices
                                of these websites. Use them at your own risk.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                7. Limitation of Liability
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Attic to Basement Estate Liquidators is not
                                liable for direct, indirect, incidental,
                                consequential, or punitive damages arising from
                                your access to or use of the website.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                8. Modification of Terms
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                Attic to Basement Estate Liquidators reserves
                                the right to modify these terms and conditions
                                at any time. Changes will be effective
                                immediately upon posting on the website.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-serif text-xl md:text-2xl text-text-heading mb-3">
                                9. Contact Information
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                For questions or concerns regarding these terms
                                and conditions, please contact us at{" "}
                                <a
                                    href="mailto:abeliquidators@gmail.com"
                                    className="text-sage-300 hover:text-sage-400 underline underline-offset-2 transition-colors"
                                >
                                    abeliquidators@gmail.com
                                </a>
                            </p>
                        </div>

                        <p className="text-text-secondary leading-relaxed pt-4 border-t border-border-default">
                            By using this website, you acknowledge that you have
                            read, understood, and agree to be bound by these
                            terms and conditions.
                        </p>
                    </div>
                </div>
            </section>

            <ConsultationCTA />
        </div>
    );
}
```

**Step 2: Verify the page renders**

Run: `npm run build`
Expected: Build succeeds. Page is accessible at `/terms`.

**Step 3: Commit**

```bash
git add src/app/terms/page.tsx
git commit -m "feat: add terms of service page"
```

---

### Task 5: Add legal links to the Footer

**Files:**
- Modify: `src/components/layout/Footer.tsx`

**Step 1: Add legal links row to the footer**

In `src/components/layout/Footer.tsx`, add a `Link` import from `next/link` (already imported). Then modify the existing copyright `<div>` (the one with `className="mt-10 pt-6 border-t ..."`) to include legal links alongside the copyright notice.

Replace the existing copyright div:

```tsx
                <div className="mt-10 pt-6 border-t border-border-default text-center text-sm text-text-secondary">
                    &copy; {new Date().getFullYear()} Attic to Basement Estate
                    Liquidators. All Rights Reserved.
                </div>
```

With:

```tsx
                <div className="mt-10 pt-6 border-t border-border-default text-center text-sm text-text-secondary">
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-2">
                        <Link
                            href="/privacy"
                            className="hover:text-text-heading transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <span aria-hidden="true">&middot;</span>
                        <Link
                            href="/terms"
                            className="hover:text-text-heading transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                    &copy; {new Date().getFullYear()} Attic to Basement Estate
                    Liquidators. All Rights Reserved.
                </div>
```

**Step 2: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds. Footer shows legal links on all pages.

**Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: add privacy and terms links to footer"
```

---

### Task 6: Add layout files with metadata and breadcrumb schema

**Files:**
- Create: `src/app/privacy/layout.tsx`
- Create: `src/app/terms/layout.tsx`

**Context:** Existing pages use `"use client"` in `page.tsx`, so metadata is exported from a sibling `layout.tsx` (server component). Each layout also includes a breadcrumb JSON-LD schema. Follow the exact pattern used in `src/app/our-promise/layout.tsx`.

**Step 1: Create `src/app/privacy/layout.tsx`**

```typescript
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata = getPageMetadata("privacy");

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd
                data={getBreadcrumbSchema([
                    { name: "Privacy Policy", path: "/privacy" },
                ])}
            />
            {children}
        </>
    );
}
```

**Step 2: Create `src/app/terms/layout.tsx`**

```typescript
import { getPageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbSchema } from "@/lib/schema";

export const metadata = getPageMetadata("terms");

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <JsonLd
                data={getBreadcrumbSchema([
                    { name: "Terms of Service", path: "/terms" },
                ])}
            />
            {children}
        </>
    );
}
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds. Pages have correct `<title>` and meta description tags.

**Step 4: Commit**

```bash
git add src/app/privacy/layout.tsx src/app/terms/layout.tsx
git commit -m "feat: add SEO metadata and breadcrumbs for legal pages"
```

---

### Task 7: Final verification

**Step 1: Full build check**

Run: `npm run build`
Expected: Build succeeds with no errors or warnings.

**Step 2: Lint check**

Run: `npm run lint`
Expected: No lint errors.

**Step 3: Visual check (optional)**

Run: `npm run dev`
Navigate to:
- `http://localhost:3000/privacy` — Privacy Policy page renders with all 9 sections
- `http://localhost:3000/terms` — Terms of Service page renders with all 9 sections
- Check footer on any page — "Privacy Policy" and "Terms of Service" links visible
- Click both footer links — they navigate correctly
