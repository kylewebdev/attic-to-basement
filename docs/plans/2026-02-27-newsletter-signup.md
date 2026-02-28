# Newsletter Signup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a newsletter signup callout for estate sale buyers, integrated with Mailchimp, placed on the Estate Sales page.

**Architecture:** A single client component (`NewsletterSignup`) that submits to Mailchimp's `/subscribe/post-json` endpoint via JSONP (the standard CORS workaround for Mailchimp embedded forms). The component is placed on the Estate Sales page between the sale listings and the cross-sell CTA.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Mailchimp embedded forms, PostHog analytics

**Design doc:** `docs/plans/2026-02-27-newsletter-signup-design.md`

---

### Task 1: Create the NewsletterSignup component

**Files:**
- Create: `src/components/sections/NewsletterSignup.tsx`

**Reference files (read these first to match patterns):**
- `src/components/forms/ConsultationForm.tsx` — form state pattern, input styling, honeypot, PostHog events
- `src/components/sections/ConsultationCTA.tsx` — section layout pattern (bg, padding, max-width, centering)
- `src/components/ui/Button.tsx` — Button API (variant, type props)
- `src/styles/globals.css` — semantic color tokens and theme vars

**Step 1: Create the component file**

```tsx
// src/components/sections/NewsletterSignup.tsx
"use client";

import { useState, type FormEvent } from "react";
import posthog from "posthog-js";
import Button from "@/components/ui/Button";

interface NewsletterSignupProps {
    location: string;
}

function jsonp(url: string): Promise<{ result: string; msg: string }> {
    return new Promise((resolve, reject) => {
        const callbackName = `mc_callback_${Date.now()}`;
        const script = document.createElement("script");

        (window as Record<string, unknown>)[callbackName] = (data: { result: string; msg: string }) => {
            delete (window as Record<string, unknown>)[callbackName];
            script.remove();
            resolve(data);
        };

        script.src = `${url}&c=${callbackName}`;
        script.onerror = () => {
            delete (window as Record<string, unknown>)[callbackName];
            script.remove();
            reject(new Error("Network error"));
        };

        document.body.appendChild(script);
    });
}

export default function NewsletterSignup({ location }: NewsletterSignupProps) {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const mailchimpUrl = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");

        const form = e.currentTarget;
        const data = new FormData(form);
        const email = data.get("EMAIL") as string;

        if (!mailchimpUrl) {
            setStatus("error");
            setErrorMsg("Newsletter signup is not configured yet.");
            return;
        }

        // Convert Mailchimp /post URL to /post-json for JSONP
        const jsonpUrl = mailchimpUrl.replace("/post?", "/post-json?");

        try {
            const result = await jsonp(`${jsonpUrl}&EMAIL=${encodeURIComponent(email)}`);

            if (result.result === "success") {
                setStatus("success");
                posthog.capture("newsletter_subscribed", { location });
                form.reset();
            } else {
                setStatus("error");
                // Mailchimp returns "already subscribed" messages — clean them up
                const msg = result.msg.includes("already subscribed")
                    ? "You're already subscribed!"
                    : "Something went wrong. Please try again.";
                setErrorMsg(msg);
                posthog.capture("newsletter_signup_errored", {
                    location,
                    error: result.msg,
                });
            }
        } catch (err) {
            setStatus("error");
            setErrorMsg("Something went wrong. Please try again.");
            posthog.captureException(err);
            posthog.capture("newsletter_signup_errored", {
                location,
                error: "network_error",
            });
        }
    }

    if (status === "success") {
        return (
            <section className="py-12 md:py-16 bg-bg-alt">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <div role="status" aria-live="polite" className="rounded-xl bg-bg-card border border-sage-200 p-8">
                        <p className="font-serif text-2xl text-text-heading mb-2">You&apos;re in!</p>
                        <p className="text-text-secondary">
                            We&apos;ll let you know when new sales are coming up.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 md:py-16 bg-bg-alt">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="font-serif text-3xl md:text-4xl text-text-heading">
                    Never Miss a Sale
                </h2>
                <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto">
                    Get notified about upcoming estate sales, interesting finds,
                    and sale day details — straight to your inbox.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                    {/* Mailchimp honeypot — hidden from humans */}
                    <div className="hidden" aria-hidden="true">
                        <input
                            type="text"
                            name="b_honeypot"
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </div>

                    <input
                        type="email"
                        name="EMAIL"
                        required
                        placeholder="your@email.com"
                        className="flex-1 rounded-lg border border-border-default bg-bg-card px-4 py-3 text-text-heading placeholder:text-text-muted focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors"
                        aria-label="Email address"
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        aria-disabled={status === "submitting"}
                    >
                        {status === "submitting" ? "Subscribing..." : "Subscribe"}
                    </Button>
                </form>

                {status === "error" && (
                    <p role="alert" aria-live="assertive" className="mt-3 text-red-600 text-sm">
                        {errorMsg}
                    </p>
                )}
            </div>
        </section>
    );
}
```

**Step 2: Verify it builds**

Run: `npm run build`
Expected: Build succeeds (component isn't imported yet, but no syntax errors)

**Step 3: Commit**

```bash
git add src/components/sections/NewsletterSignup.tsx
git commit -m "feat: add NewsletterSignup component with Mailchimp JSONP integration"
```

---

### Task 2: Add NewsletterSignup to the Estate Sales page

**Files:**
- Modify: `src/app/estate-sales/page.tsx`

**Reference files:**
- `src/app/estate-sales/page.tsx` — current page structure (read before modifying)
- `src/components/sections/NewsletterSignup.tsx` — component API

**Step 1: Add the import and component**

In `src/app/estate-sales/page.tsx`, add the import at the top:

```tsx
import NewsletterSignup from "@/components/sections/NewsletterSignup";
```

Then insert `<NewsletterSignup location="estate_sales_page" />` between the sale listings section (closing `</section>`) and the cross-sell section (`{/* Cross-sell */}`). The result should be:

```tsx
            </section>

            <NewsletterSignup location="estate_sales_page" />

            {/* Cross-sell */}
```

**Step 2: Verify in dev server**

Run: `npm run dev`
Check: Visit `/estate-sales` — the newsletter callout should appear between the listings and the "Have a home that needs an estate sale?" section. Verify:
- Headline and subtext render correctly
- Email input and Subscribe button are on one row (desktop) or stacked (mobile)
- Without `NEXT_PUBLIC_MAILCHIMP_URL` set, submitting shows the "not configured yet" error
- Responsive layout looks correct at mobile/tablet/desktop

**Step 3: Commit**

```bash
git add src/app/estate-sales/page.tsx
git commit -m "feat: add newsletter signup callout to estate sales page"
```

---

### Task 3: Add env var and documentation

**Files:**
- Modify: `.env.local` (or create if it doesn't exist) — add `NEXT_PUBLIC_MAILCHIMP_URL`
- Modify: `.env.example` (or create if it doesn't exist) — document the var

**Step 1: Add to .env.example**

```bash
# Mailchimp embedded form URL (from Mailchimp → Audience → Signup forms → Embedded forms)
# Format: https://YOURDOMAIN.usX.list-manage.com/subscribe/post?u=USERID&id=AUDIENCEID
NEXT_PUBLIC_MAILCHIMP_URL=
```

**Step 2: Commit**

```bash
git add .env.example
git commit -m "docs: add NEXT_PUBLIC_MAILCHIMP_URL to env example"
```

---

### Task 4: Final verification

**Step 1: Production build check**

Run: `npm run build`
Expected: Build succeeds with no errors or warnings

**Step 2: Lint check**

Run: `npm run lint`
Expected: No new lint errors

**Step 3: Manual QA checklist**

Run: `npm run dev` and verify on `/estate-sales`:
- [ ] Component renders between listings and cross-sell CTA
- [ ] Headline "Never Miss a Sale" displays in serif font
- [ ] Email input has correct placeholder and focus ring
- [ ] Subscribe button matches site's primary button style
- [ ] Form stacks vertically on mobile, inline on desktop
- [ ] Without env var: shows "not configured yet" error on submit
- [ ] Success state shows "You're in!" confirmation card
- [ ] Error state shows inline error message
- [ ] Section background alternates correctly with surrounding sections
