"use client";

import { useState, type FormEvent } from "react";
import posthog from "posthog-js";
import Button from "@/components/ui/Button";

export default function ConsultationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        posthog.capture("consultation_form_submitted", {
          situation: data.get("situation") as string | null,
          contact_method: data.get("contact_method") as string | null,
          has_city: Boolean(data.get("city")),
          has_phone: Boolean(data.get("phone")),
        });
        form.reset();
      } else {
        setStatus("error");
        posthog.capture("consultation_form_errored", {
          error_type: "server_error",
          status_code: response.status,
        });
      }
    } catch (err) {
      setStatus("error");
      posthog.captureException(err);
      posthog.capture("consultation_form_errored", {
        error_type: "network_error",
      });
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-xl bg-bg-alt border border-sage-200 p-8 text-center">
        <p className="font-serif text-2xl text-text-heading mb-2">Thank you!</p>
        <p className="text-text-secondary">
          We&apos;ve received your message and will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from humans, catches bots */}
      <input
        type="text"
        name="_gotcha"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-text-body mb-1">
          Name <span className="text-sage-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-border-default bg-bg-card px-4 py-3 text-text-heading placeholder:text-text-muted focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors"
          placeholder="Your full name"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-text-body mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full rounded-lg border border-border-default bg-bg-card px-4 py-3 text-text-heading placeholder:text-text-muted focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors"
            placeholder="(555) 555-5555"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-text-body mb-1">
            Email <span className="text-sage-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-lg border border-border-default bg-bg-card px-4 py-3 text-text-heading placeholder:text-text-muted focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-semibold text-text-body mb-1">
          City or Zip Code
        </label>
        <input
          type="text"
          id="city"
          name="city"
          className="w-full rounded-lg border border-border-default bg-bg-card px-4 py-3 text-text-heading placeholder:text-text-muted focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors"
          placeholder="Sacramento, 95821, etc."
        />
      </div>

      <div>
        <label htmlFor="situation" className="block text-sm font-semibold text-text-body mb-1">
          What best describes your situation?
        </label>
        <select
          id="situation"
          name="situation"
          className="w-full rounded-lg border border-border-default bg-bg-card px-4 py-3 text-text-heading focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors"
          defaultValue=""
        >
          <option value="" disabled>Select one...</option>
          <option value="settling">Settling an estate</option>
          <option value="downsizing">Downsizing</option>
          <option value="cleanout">Property cleanout</option>
          <option value="appraisal">Appraisal needed</option>
          <option value="buying">Buying at a sale</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-text-body mb-1">
          How can we help? <span className="text-sage-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          className="w-full rounded-lg border border-border-default bg-bg-card px-4 py-3 text-text-heading placeholder:text-text-muted focus:border-sage-500 focus:ring-1 focus:ring-sage-500 transition-colors resize-y"
          placeholder="Tell us briefly about your situation..."
        />
      </div>

      <fieldset>
        <legend className="block text-sm font-semibold text-text-body mb-2">
          Preferred contact method
        </legend>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="contact_method"
              value="phone"
              defaultChecked
              className="text-sage-500 focus:ring-sage-500"
            />
            <span className="text-sm text-text-body">Phone</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="contact_method"
              value="email"
              className="text-sage-500 focus:ring-sage-500"
            />
            <span className="text-sm text-text-body">Email</span>
          </label>
        </div>
      </fieldset>

      {status === "error" && (
        <p role="alert" aria-live="assertive" className="text-red-600 text-sm">
          Something went wrong. Please try again or call us at{" "}
          <a href="tel:+19165211077" className="underline">(916) 521-1077</a>.
        </p>
      )}

      <Button type="submit" variant="primary" className="w-full sm:w-auto" aria-disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Schedule a Free Consultation"}
      </Button>
    </form>
  );
}
