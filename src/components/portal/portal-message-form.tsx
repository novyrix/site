"use client";

import { PaperPlaneRight, SpinnerGap } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { type FormEvent, startTransition, useState } from "react";

type PortalMessageFormProps = {
  engagementReference: string;
  preview?: boolean;
};

export function PortalMessageForm({
  engagementReference,
  preview = false,
}: PortalMessageFormProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = String(new FormData(form).get("body") || "").trim();
    if (!body) return;

    if (preview) {
      setMessage("Preview mode only. The message was not saved.");
      form.reset();
      return;
    }

    setPending(true);
    setMessage(null);
    try {
      const response = await fetch("/api/portal/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ engagementReference, body }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Message could not be sent.");
      form.reset();
      startTransition(() => router.refresh());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Message could not be sent.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="portal-message-form" onSubmit={(event) => void submit(event)}>
      <label>
        <span className="mono">Add a project note</span>
        <textarea
          name="body"
          rows={4}
          maxLength={5000}
          placeholder="Write a clear update, question, approval note, or blocker..."
          required
        />
      </label>
      <button type="submit" className="button button--primary" disabled={pending}>
        {pending ? <SpinnerGap className="payment-spinner" aria-hidden="true" /> : <PaperPlaneRight aria-hidden="true" />}
        {pending ? "Sending" : "Send message"}
      </button>
      {message && <p className="portal-feedback" role="status">{message}</p>}
    </form>
  );
}
