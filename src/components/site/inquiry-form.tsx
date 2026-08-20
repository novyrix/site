"use client";

import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";
import Link from "next/link";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { liveServices } from "@/lib/site-data";

type InquiryState = {
  contactName: string;
  contactEmail: string;
  organizationName: string;
  organizationType: string;
  country: string;
  services: string[];
  problem: string;
  budget: string;
};

const initialState: InquiryState = {
  contactName: "",
  contactEmail: "",
  organizationName: "",
  organizationType: "",
  country: "",
  services: [],
  problem: "",
  budget: "",
};

const stepNames = ["Contact", "Organisation", "Scope"];

export function InquiryForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState<{ reference: string; preview: boolean } | null>(null);
  const previousStep = useRef(step);
  const stepHeadingRef = useRef<HTMLElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (previousStep.current !== step) stepHeadingRef.current?.focus();
    previousStep.current = step;
  }, [step]);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const update = (field: keyof InquiryState, value: string | string[]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const validateStep = () => {
    if (step === 0 && (!form.contactName.trim() || !/^\S+@\S+\.\S+$/.test(form.contactEmail))) {
      setError("Add your name and a valid email address to continue.");
      return false;
    }
    if (
      step === 1 &&
      (!form.organizationName.trim() || !form.organizationType || !form.country.trim())
    ) {
      setError("Organisation name, type, and location are required.");
      return false;
    }
    if (step === 2 && (form.services.length === 0 || form.problem.trim().length < 40)) {
      setError("Select at least one service and describe the problem in 40 characters or more.");
      return false;
    }
    return true;
  };

  const next = () => {
    if (validateStep()) setStep((current) => Math.min(current + 1, 2));
  };

  const toggleService = (slug: string) => {
    const selected = form.services.includes(slug)
      ? form.services.filter((item) => item !== slug)
      : [...form.services, slug];
    update("services", selected);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep()) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        reference?: string;
        error?: string;
        preview?: boolean;
      };

      if (!response.ok || !result.reference) {
        throw new Error(result.error || "The inquiry could not be validated.");
      }

      setSubmission({ reference: result.reference, preview: Boolean(result.preview) });
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "The inquiry could not be validated. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submission) {
    return (
      <div className="inquiry-success" role="status">
        <span className="inquiry-success__icon">
          <Check aria-hidden="true" weight="bold" />
        </span>
        <p className="eyebrow">{submission.preview ? "Local preview" : "Inquiry received"}</p>
        <h2>{submission.preview ? "The form is working locally." : "We have the context we need."}</h2>
        {submission.preview ? (
          <p>
            Preview reference <strong>{submission.reference}</strong>. No lead or email was created
            from this local design preview.
          </p>
        ) : (
          <p>
            Your inquiry reference is <strong>{submission.reference}</strong>. We will review the
            context and reply from connect@novyrix.com.
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      className="inquiry-form"
      onSubmit={submit}
      noValidate
      aria-busy={submitting}
      aria-describedby={error ? "inquiry-form-error" : undefined}
    >
      <div className="inquiry-progress" role="list" aria-label={`Step ${step + 1} of 3`}>
        {stepNames.map((name, index) => (
          <div
            key={name}
            role="listitem"
            className={index <= step ? "is-active" : undefined}
            aria-current={index === step ? "step" : undefined}
          >
            <span className="mono">0{index + 1}</span>
            <span>{name}</span>
          </div>
        ))}
      </div>

      <div className="inquiry-step">
        {step === 0 ? (
          <fieldset>
            <legend>
              <span className="eyebrow">First, you.</span>
              <strong ref={stepHeadingRef} tabIndex={-1}>Who should we speak with?</strong>
            </legend>
            <div className="field-grid">
              <label>
                Your name
                <input
                  name="contactName"
                  value={form.contactName}
                  onChange={(event) => update("contactName", event.target.value)}
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(error && !form.contactName.trim())}
                />
              </label>
              <label>
                Work email
                <input
                  name="contactEmail"
                  type="email"
                  value={form.contactEmail}
                  onChange={(event) => update("contactEmail", event.target.value)}
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(error && !/^\S+@\S+\.\S+$/.test(form.contactEmail))}
                />
              </label>
            </div>
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset>
            <legend>
              <span className="eyebrow">The operating context.</span>
              <strong ref={stepHeadingRef} tabIndex={-1}>Tell us about the organisation.</strong>
            </legend>
            <div className="field-grid">
              <label>
                Organisation name
                <input
                  name="organizationName"
                  value={form.organizationName}
                  onChange={(event) => update("organizationName", event.target.value)}
                  autoComplete="organization"
                  required
                  aria-invalid={Boolean(error && !form.organizationName.trim())}
                />
              </label>
              <label>
                Organisation type
                <select
                  name="organizationType"
                  value={form.organizationType}
                  onChange={(event) => update("organizationType", event.target.value)}
                  required
                  aria-invalid={Boolean(error && !form.organizationType)}
                >
                  <option value="">Select one</option>
                  <option value="ngo">NGO / development programme</option>
                  <option value="bitcoin_fintech">Bitcoin / fintech company</option>
                  <option value="startup">Startup</option>
                  <option value="gov_adjacent">Government-adjacent</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="field-grid__wide">
                Country / location
                <input
                  name="country"
                  value={form.country}
                  onChange={(event) => update("country", event.target.value)}
                  autoComplete="country-name"
                  required
                  aria-invalid={Boolean(error && !form.country.trim())}
                />
                <small>This determines the proposal currency once, after submission.</small>
              </label>
            </div>
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset>
            <legend>
              <span className="eyebrow">The system.</span>
              <strong ref={stepHeadingRef} tabIndex={-1}>What needs to change?</strong>
            </legend>
            <div className="service-selector" role="group" aria-label="Services of interest">
              {liveServices.map((service) => {
                const selected = form.services.includes(service.slug);
                return (
                  <button
                    key={service.slug}
                    type="button"
                    className={selected ? "is-selected" : undefined}
                    onClick={() => toggleService(service.slug)}
                    aria-pressed={selected}
                  >
                    <span className="mono">{service.number}</span>
                    <span>{service.title}</span>
                    {selected ? <Check aria-hidden="true" weight="bold" /> : null}
                  </button>
                );
              })}
            </div>
            <label>
              Problem description
              <textarea
                name="problem"
                value={form.problem}
                onChange={(event) => update("problem", event.target.value)}
                placeholder="Describe the current system, where it breaks down, and what a better outcome would make possible."
                rows={6}
                required
                aria-invalid={Boolean(error && form.problem.trim().length < 40)}
              />
            </label>
            <label>
              Rough budget range <span className="muted">(optional)</span>
              <select
                name="budget"
                value={form.budget}
                onChange={(event) => update("budget", event.target.value)}
              >
                <option value="">Prefer to discuss after scope</option>
                <option value="exploratory">Exploratory / architecture first</option>
                <option value="focused">Focused implementation</option>
                <option value="substantial">Substantial platform investment</option>
                <option value="ongoing">Ongoing engineering capacity</option>
              </select>
            </label>
            <p className="inquiry-privacy">
              By submitting, you ask Novyrix to review this context and reply about the inquiry.
              See the <Link href="/privacy">Privacy Notice</Link>.
            </p>
          </fieldset>
        ) : null}
      </div>

      {error ? (
        <p
          id="inquiry-form-error"
          ref={errorRef}
          className="form-error"
          role="alert"
          tabIndex={-1}
        >
          {error}
        </p>
      ) : null}

      <div className="inquiry-actions">
        {step > 0 ? (
          <button type="button" className="button button--ghost" onClick={() => setStep(step - 1)}>
            <ArrowLeft aria-hidden="true" weight="bold" />
            Back
          </button>
        ) : <span />}
        {step < 2 ? (
          <button type="button" className="button button--primary" onClick={next}>
            Continue
            <ArrowRight aria-hidden="true" weight="bold" />
          </button>
        ) : (
          <button type="submit" className="button button--primary" disabled={submitting}>
            {submitting ? "Validating..." : "Submit inquiry"}
            <ArrowRight aria-hidden="true" weight="bold" />
          </button>
        )}
      </div>
    </form>
  );
}
