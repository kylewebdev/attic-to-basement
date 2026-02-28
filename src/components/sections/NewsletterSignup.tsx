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

        (window as unknown as Record<string, unknown>)[callbackName] = (data: { result: string; msg: string }) => {
            delete (window as unknown as Record<string, unknown>)[callbackName];
            script.remove();
            resolve(data);
        };

        script.src = `${url}&c=${callbackName}`;
        script.onerror = () => {
            delete (window as unknown as Record<string, unknown>)[callbackName];
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

        const jsonpUrl = mailchimpUrl.replace("/post?", "/post-json?");

        try {
            const result = await jsonp(`${jsonpUrl}&EMAIL=${encodeURIComponent(email)}`);

            if (result.result === "success") {
                setStatus("success");
                posthog.capture("newsletter_subscribed", { location });
                form.reset();
            } else {
                setStatus("error");
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
