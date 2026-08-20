"use client";

import { ArrowUpRight, Plus, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import type { AdminLeadDetail, PaymentReadiness } from "@/lib/admin-types";

type EditableLine = {
  id: string;
  description: string;
  quantity: string;
  amount: string;
};

function newLine(): EditableLine {
  return { id: crypto.randomUUID(), description: "", quantity: "1", amount: "" };
}

function amountToMinor(value: string) {
  const normalized = value.replace(/,/g, "").trim();
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) throw new Error("Use an amount with up to two decimals.");
  const [whole, fraction = ""] = normalized.split(".");
  const minor = `${whole}${fraction.padEnd(2, "0")}`.replace(/^0+(?=\d)/, "");
  if (minor === "0") throw new Error("Line-item amounts must be greater than zero.");
  return minor;
}

async function mutate(path: string, method: "POST" | "PATCH", body: unknown) {
  const response = await fetch(`/api/admin/operations/${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = (await response.json()) as Record<string, unknown> & { error?: string };
  if (!response.ok) throw new Error(result.error || "The operation could not be completed.");
  return result;
}

function LineEditor({
  lines,
  setLines,
  currency,
}: {
  lines: EditableLine[];
  setLines: (lines: EditableLine[]) => void;
  currency: string;
}) {
  function update(id: string, field: keyof EditableLine, value: string) {
    setLines(lines.map((line) => (line.id === id ? { ...line, [field]: value } : line)));
  }

  return (
    <div className="ops-line-editor">
      {lines.map((line, index) => (
        <div className="ops-line-editor__row" key={line.id}>
          <label>
            <span>Description {index + 1}</span>
            <input
              value={line.description}
              onChange={(event) => update(line.id, "description", event.target.value)}
              required
              minLength={2}
              maxLength={240}
            />
          </label>
          <label>
            <span>Qty</span>
            <input
              type="number"
              min="1"
              max="1000"
              value={line.quantity}
              onChange={(event) => update(line.id, "quantity", event.target.value)}
              required
            />
          </label>
          <label>
            <span>{currency} amount</span>
            <input
              inputMode="decimal"
              value={line.amount}
              onChange={(event) => update(line.id, "amount", event.target.value)}
              placeholder="0.00"
              required
            />
          </label>
          <button
            type="button"
            aria-label={`Remove line item ${index + 1}`}
            onClick={() => setLines(lines.filter((item) => item.id !== line.id))}
            disabled={lines.length === 1}
          >
            <Trash aria-hidden="true" />
          </button>
        </div>
      ))}
      <button type="button" className="ops-add-line" onClick={() => setLines([...lines, newLine()])}>
        <Plus aria-hidden="true" /> Add line item
      </button>
    </div>
  );
}

export function LeadOperations({
  lead,
  readiness,
  preview = false,
}: {
  lead: AdminLeadDetail;
  readiness: PaymentReadiness;
  preview?: boolean;
}) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const [discoveryOutcome, setDiscoveryOutcome] = useState(lead.discoveryOutcome || "PROCEED");
  const [discoveryNotes, setDiscoveryNotes] = useState(lead.discoveryNotes || "");
  const [engagementLines, setEngagementLines] = useState<EditableLine[]>([newLine()]);
  const [invoiceLines, setInvoiceLines] = useState<EditableLine[]>([newLine()]);
  const engagement = lead.proposals.find((proposal) => proposal.engagement)?.engagement || null;

  async function run(
    label: string,
    operation: () => Promise<unknown>,
    successMessage?: (result: unknown) => string,
  ) {
    setPending(label);
    setError(null);
    setMessage(null);
    if (preview) {
      setPending(null);
      setMessage("Preview mode shows the workflow without writing data.");
      return;
    }
    try {
      const result = await operation();
      setMessage(successMessage ? successMessage(result) : `${label} completed.`);
      router.refresh();
    } catch (operationError) {
      setError(operationError instanceof Error ? operationError.message : "The operation failed.");
    } finally {
      setPending(null);
    }
  }

  function linePayload(lines: EditableLine[]) {
    return lines.map((line) => ({
      description: line.description.trim(),
      quantity: Number(line.quantity),
      unitAmountMinor: amountToMinor(line.amount),
    }));
  }

  async function submitDiscovery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await run("Discovery outcome", () =>
      mutate(`leads/${lead.reference}/discovery`, "PATCH", {
        outcome: discoveryOutcome,
        notes: discoveryNotes,
      }),
    );
  }

  async function submitEngagement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await run("Engagement record", () =>
      mutate("engagements", "POST", {
        leadReference: lead.reference,
        serviceType: form.get("serviceType"),
        scopeSummary: form.get("scopeSummary"),
        timeline: form.get("timeline"),
        engagementType: form.get("engagementType"),
        agreementConfirmed: true,
        agreementReference: form.get("agreementReference"),
        lineItems: linePayload(engagementLines),
      }),
    );
  }

  async function submitInvoice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!engagement) return;
    const form = new FormData(event.currentTarget);
    const dueDate = new Date(`${String(form.get("dueDate"))}T12:00:00+03:00`);
    await run(
      "Invoice delivery",
      () => mutate("invoices", "POST", {
        engagementReference: engagement.reference,
        dueAt: dueDate.toISOString(),
        lineItems: linePayload(invoiceLines),
      }),
      (result) => {
        if (result && typeof result === "object" && "paymentUrl" in result) {
          const paymentUrl = result.paymentUrl;
          if (typeof paymentUrl === "string") return `Invoice created: ${paymentUrl}`;
        }
        return "Invoice delivery completed.";
      },
    );
  }

  async function submitPortalUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!engagement) return;
    const form = new FormData(event.currentTarget);
    await run("Portal access", () =>
      mutate("portal-users", "POST", {
        engagementReference: engagement.reference,
        name: form.get("name"),
        email: form.get("email"),
      }),
    );
  }

  async function submitMilestone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!engagement) return;
    const form = new FormData(event.currentTarget);
    const dueDate = String(form.get("dueDate") || "");
    const position = String(form.get("position") || "").trim();
    await run("Portal milestone", () =>
      mutate(`engagements/${engagement.reference}/milestones`, "POST", {
        title: form.get("title"),
        description: form.get("description"),
        status: form.get("status"),
        dueAt: dueDate ? new Date(`${dueDate}T12:00:00+03:00`).toISOString() : undefined,
        position: position ? Number(position) : undefined,
      }),
    );
  }

  async function updateMilestoneStatus(milestoneId: string, status: string) {
    if (!engagement) return;
    await run("Milestone update", () =>
      mutate(`engagements/${engagement.reference}/milestones/${milestoneId}`, "PATCH", { status }),
    );
  }

  async function submitDeliverable(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!engagement) return;
    const form = new FormData(event.currentTarget);
    const milestoneId = String(form.get("milestoneId") || "");
    await run("Portal deliverable", () =>
      mutate(`engagements/${engagement.reference}/deliverables`, "POST", {
        title: form.get("title"),
        description: form.get("description"),
        url: form.get("url") || undefined,
        status: form.get("status"),
        milestoneId: milestoneId || undefined,
      }),
    );
  }

  async function submitAdminMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!engagement) return;
    const form = event.currentTarget;
    const body = String(new FormData(form).get("body") || "").trim();
    await run(
      "Portal message",
      () => mutate(`engagements/${engagement.reference}/messages`, "POST", { body }),
      () => "Portal message recorded.",
    );
    if (!preview) form.reset();
  }

  return (
    <div className="ops-workflow">
      <section className="ops-workflow__panel">
        <div className="ops-panel-heading">
          <span className="mono">01 / Fit decision</span>
          <h2>Record the fit call.</h2>
        </div>
        <div className="ops-fit-actions">
          <button
            type="button"
            className={lead.fitStatus === "FIT" ? "is-active" : undefined}
            disabled={Boolean(pending)}
            onClick={() => void run("Fit decision", () =>
              mutate(`leads/${lead.reference}/fit`, "PATCH", { fitStatus: "FIT" }))}
          >
            Fit
          </button>
          <button
            type="button"
            className={lead.fitStatus === "NOT_FIT" ? "is-active" : undefined}
            disabled={Boolean(pending)}
            onClick={() => void run("Fit decision", () =>
              mutate(`leads/${lead.reference}/fit`, "PATCH", { fitStatus: "NOT_FIT" }))}
          >
            Not fit
          </button>
        </div>
      </section>

      <section className="ops-workflow__panel">
        <div className="ops-panel-heading">
          <span className="mono">02 / Discovery</span>
          <h2>Log what was decided.</h2>
        </div>
        <form className="ops-form" onSubmit={(event) => void submitDiscovery(event)}>
          <label>
            <span>Outcome</span>
            <select value={discoveryOutcome} onChange={(event) => setDiscoveryOutcome(event.target.value as typeof discoveryOutcome)}>
              <option value="PROCEED">Proceed</option>
              <option value="FOLLOW_UP">Follow up</option>
              <option value="DECLINE">Decline</option>
            </select>
          </label>
          <label>
            <span>Call notes</span>
            <textarea
              value={discoveryNotes}
              onChange={(event) => setDiscoveryNotes(event.target.value)}
              rows={5}
              maxLength={5000}
              placeholder="Decision, constraints, stakeholders, and next action."
            />
          </label>
          <button className="button button--ghost" type="submit" disabled={Boolean(pending)}>
            Save discovery <ArrowUpRight aria-hidden="true" />
          </button>
        </form>
      </section>

      {!engagement && (
        <section className="ops-workflow__panel ops-workflow__panel--wide">
          <div className="ops-panel-heading">
            <span className="mono">03 / Agreement and engagement</span>
            <h2>Turn an accepted scope into accountable work.</h2>
          </div>
          <form className="ops-form ops-form--grid" onSubmit={(event) => void submitEngagement(event)}>
            <label>
              <span>Service</span>
              <input name="serviceType" required minLength={2} maxLength={160} />
            </label>
            <label>
              <span>Engagement model</span>
              <select name="engagementType" defaultValue="FIXED_SCOPE">
                <option value="FIXED_SCOPE">Fixed scope</option>
                <option value="RETAINER">Retainer</option>
                <option value="DAY_RATE_ADVISORY">Day-rate advisory</option>
              </select>
            </label>
            <label className="ops-form__full">
              <span>Scope summary</span>
              <textarea name="scopeSummary" required minLength={20} maxLength={5000} rows={5} />
            </label>
            <label>
              <span>Timeline</span>
              <input name="timeline" required minLength={2} maxLength={240} />
            </label>
            <label>
              <span>Signed agreement reference</span>
              <input name="agreementReference" required minLength={3} maxLength={240} />
            </label>
            <div className="ops-form__full">
              <LineEditor lines={engagementLines} setLines={setEngagementLines} currency={lead.organization.resolvedCurrency} />
            </div>
            <button
              className="button button--primary"
              type="submit"
              disabled={Boolean(pending) || lead.fitStatus !== "FIT"}
            >
              Record accepted engagement <ArrowUpRight aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      {engagement && (
        <section className="ops-workflow__panel ops-workflow__panel--wide">
          <div className="ops-panel-heading">
            <span className="mono">03 / Invoice</span>
            <h2>Create and send an itemized payment request.</h2>
            <p>Engagement {engagement.reference}. Both payment rails must be ready before delivery.</p>
          </div>
          {!readiness.allReady && (
            <div className="ops-gate">
              <span className="mono">Activation gate closed</span>
              <p>Paystack and BTCPay credentials are not both verified. Invoice delivery remains disabled.</p>
            </div>
          )}
          <form className="ops-form" onSubmit={(event) => void submitInvoice(event)}>
            <label>
              <span>Due date</span>
              <input name="dueDate" type="date" required />
            </label>
            <LineEditor lines={invoiceLines} setLines={setInvoiceLines} currency={lead.organization.resolvedCurrency} />
            <button
              className="button button--primary"
              type="submit"
              disabled={Boolean(pending) || !readiness.allReady}
            >
              Create and send invoice <ArrowUpRight aria-hidden="true" />
            </button>
          </form>
        </section>
      )}

      {engagement && (
        <section className="ops-workflow__panel ops-workflow__panel--wide ops-portal-panel">
          <div className="ops-panel-heading">
            <span className="mono">04 / Client portal</span>
            <h2>Provision access and keep the workspace useful.</h2>
            <p>
              Client access, milestones, deliverables, and official project messages all stay tied to
              engagement {engagement.reference}.
            </p>
          </div>

          <div className="ops-portal-grid">
            <form className="ops-form" onSubmit={(event) => void submitPortalUser(event)}>
              <div className="ops-panel-heading ops-panel-heading--compact">
                <span className="mono">Portal access</span>
                <h3>Invite the client contact.</h3>
              </div>
              <label>
                <span>Name</span>
                <input name="name" defaultValue={lead.contactName} required minLength={2} maxLength={120} />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" defaultValue={lead.contactEmail} required />
              </label>
              <p className="ops-auth-note">
                This email becomes the access allowlist. The client signs in with the matching verified Google account.
              </p>
              <button className="button button--ghost" type="submit" disabled={Boolean(pending)}>
                Allow Google access <ArrowUpRight aria-hidden="true" />
              </button>
            </form>

            <form className="ops-form" onSubmit={(event) => void submitMilestone(event)}>
              <div className="ops-panel-heading ops-panel-heading--compact">
                <span className="mono">Milestones</span>
                <h3>Add checkable progress.</h3>
              </div>
              <label>
                <span>Title</span>
                <input name="title" required minLength={2} maxLength={160} />
              </label>
              <label>
                <span>Description</span>
                <textarea name="description" rows={4} maxLength={2000} />
              </label>
              <div className="ops-form ops-form--grid">
                <label>
                  <span>Status</span>
                  <select name="status" defaultValue="NOT_STARTED">
                    <option value="NOT_STARTED">Not started</option>
                    <option value="IN_PROGRESS">In progress</option>
                    <option value="BLOCKED">Blocked</option>
                    <option value="COMPLETE">Complete</option>
                  </select>
                </label>
                <label>
                  <span>Due date</span>
                  <input name="dueDate" type="date" />
                </label>
                <label>
                  <span>Position</span>
                  <input name="position" type="number" min="0" max="200" placeholder="Auto" />
                </label>
              </div>
              <button className="button button--ghost" type="submit" disabled={Boolean(pending)}>
                Add milestone <ArrowUpRight aria-hidden="true" />
              </button>
            </form>
          </div>

          {engagement.milestones.length > 0 && (
            <div className="ops-record-list">
              {engagement.milestones.map((milestone) => (
                <article key={milestone.id}>
                  <span className="mono">
                    {String(milestone.position + 1).padStart(2, "0")} / {milestone.status.replaceAll("_", " ")}
                  </span>
                  <strong>{milestone.title}</strong>
                  {milestone.description && <small>{milestone.description}</small>}
                  <div className="ops-record-actions">
                    <button type="button" disabled={Boolean(pending)} onClick={() => void updateMilestoneStatus(milestone.id, "IN_PROGRESS")}>
                      In progress
                    </button>
                    <button type="button" disabled={Boolean(pending)} onClick={() => void updateMilestoneStatus(milestone.id, "BLOCKED")}>
                      Blocked
                    </button>
                    <button type="button" disabled={Boolean(pending)} onClick={() => void updateMilestoneStatus(milestone.id, "COMPLETE")}>
                      Complete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="ops-portal-grid ops-portal-grid--bottom">
            <form className="ops-form" onSubmit={(event) => void submitDeliverable(event)}>
              <div className="ops-panel-heading ops-panel-heading--compact">
                <span className="mono">Deliverables</span>
                <h3>Share an artifact or link.</h3>
              </div>
              <label>
                <span>Title</span>
                <input name="title" required minLength={2} maxLength={160} />
              </label>
              <label>
                <span>Description</span>
                <textarea name="description" rows={4} maxLength={2000} />
              </label>
              <label>
                <span>URL</span>
                <input name="url" type="url" maxLength={1000} placeholder="https://..." />
              </label>
              <div className="ops-form ops-form--grid">
                <label>
                  <span>Milestone</span>
                  <select name="milestoneId" defaultValue="">
                    <option value="">General</option>
                    {engagement.milestones.map((milestone) => (
                      <option value={milestone.id} key={milestone.id}>{milestone.title}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Status</span>
                  <select name="status" defaultValue="SHARED">
                    <option value="DRAFT">Draft</option>
                    <option value="SHARED">Shared</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="SUPERSEDED">Superseded</option>
                  </select>
                </label>
              </div>
              <button className="button button--ghost" type="submit" disabled={Boolean(pending)}>
                Add deliverable <ArrowUpRight aria-hidden="true" />
              </button>
            </form>

            <form className="ops-form" onSubmit={(event) => void submitAdminMessage(event)}>
              <div className="ops-panel-heading ops-panel-heading--compact">
                <span className="mono">Message log</span>
                <h3>Write as Novyrix.</h3>
              </div>
              <label>
                <span>Message</span>
                <textarea name="body" rows={7} minLength={1} maxLength={5000} required />
              </label>
              <button className="button button--primary" type="submit" disabled={Boolean(pending)}>
                Record message <ArrowUpRight aria-hidden="true" />
              </button>
            </form>
          </div>

          {(engagement.deliverables.length > 0 || engagement.portalMessages.length > 0) && (
            <div className="ops-record-list ops-record-list--split">
              {engagement.deliverables.map((deliverable) => (
                <article key={deliverable.id}>
                  <span className="mono">Deliverable / {deliverable.status}</span>
                  <strong>{deliverable.title}</strong>
                  {deliverable.description && <small>{deliverable.description}</small>}
                </article>
              ))}
              {engagement.portalMessages.map((portalMessage) => (
                <article key={portalMessage.id}>
                  <span className="mono">Message / {portalMessage.sender}</span>
                  <strong>{portalMessage.authorName}</strong>
                  <small>{portalMessage.body}</small>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {message && <p className="ops-feedback" role="status">{message}</p>}
      {error && <p className="ops-feedback ops-feedback--error" role="alert">{error}</p>}
    </div>
  );
}
