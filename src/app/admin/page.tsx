import {
  ArrowRight,
  CheckCircle,
  ClockCountdown,
  FileText,
  Pulse,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { OperationsShell } from "@/components/admin/operations-shell";
import { OperationsUnavailable } from "@/components/admin/operations-unavailable";
import { getAdminOverview, getPaymentReadiness, isAdminPreview } from "@/lib/admin-api";
import { requireAdmin } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(new Date(value));
}

export default async function AdminOperationsPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const query = await searchParams;
  const preview = isAdminPreview(query.preview);
  await requireAdmin(preview);

  let data;
  let readiness;
  try {
    [data, readiness] = await Promise.all([
      getAdminOverview(preview),
      getPaymentReadiness(preview),
    ]);
  } catch {
    return (
      <OperationsShell
        eyebrow="Operations / Live ledger"
        title="Operational ledger"
        description="A current view of inquiries, engagements, invoices, and the decisions that move work forward."
        preview={preview}
      >
        <OperationsUnavailable />
      </OperationsShell>
    );
  }

  const metrics = [
    { label: "Awaiting fit", value: data.counts.pendingLeads, Icon: ClockCountdown },
    { label: "Qualified leads", value: data.counts.fitLeads, Icon: CheckCircle },
    { label: "Active engagements", value: data.counts.activeEngagements, Icon: Pulse },
    { label: "Pending invoices", value: data.counts.pendingInvoices, Icon: FileText },
  ];
  const previewQuery = preview ? "?preview=qa" : "";

  return (
    <OperationsShell
      eyebrow="Operations / Live ledger"
      title="Operational ledger"
      description="A current view of inquiries, engagements, invoices, and the decisions that move work forward."
      preview={preview}
    >
      <section className="ops-metrics ledger-metrics" aria-label="Operations summary">
        {metrics.map(({ label, value, Icon }, index) => (
          <article key={label}>
            <div>
              <span className="mono">{String(index + 1).padStart(2, "0")}</span>
              <Icon aria-hidden="true" weight="bold" />
            </div>
            <strong>{value}</strong>
            <p>{label}</p>
          </article>
        ))}
      </section>

      <section className="ops-dashboard ledger-dashboard">
        <div className="ledger-inquiries">
          <div className="ledger-section-heading">
            <div>
              <p className="eyebrow">Pipeline / Recent</p>
              <h2>Recent inquiries</h2>
            </div>
            <Link href={`/admin/leads${previewQuery}`} className="arrow-link">
              View all inquiries <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="ledger-table" role="table" aria-label="Recent inquiries">
            <div className="ledger-table__head mono" role="row">
              <span role="columnheader">Organisation</span>
              <span role="columnheader">Service</span>
              <span role="columnheader">Received</span>
              <span role="columnheader">Status</span>
              <span role="columnheader">Next action</span>
            </div>
            {data.recentLeads.map((lead, index) => (
              <Link
                href={`/admin/leads/${lead.reference}${previewQuery}`}
                className="ledger-table__row"
                role="row"
                key={lead.reference}
              >
                <span className="ledger-organisation" role="cell">
                  <i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i>
                  <span>
                    <strong>{lead.organization.name}</strong>
                    <small>{lead.contactName} / {lead.organization.country}</small>
                  </span>
                </span>
                <span role="cell">
                  <strong>{lead.servicesOfInterest[0] || "Platform engineering"}</strong>
                  <small>{lead.organization.type.replaceAll("_", " ")}</small>
                </span>
                <time role="cell" dateTime={lead.createdAt}>{formatDate(lead.createdAt)}</time>
                <span role="cell" className={`ledger-status ledger-status--${lead.fitStatus.toLowerCase()}`}>
                  <i aria-hidden="true" />
                  {lead.fitStatus === "PENDING" ? "Awaiting fit" : lead.fitStatus.replace("_", " ")}
                </span>
                <span role="cell" className="ledger-next-action">
                  {lead.fitStatus === "PENDING" ? "Qualify inquiry" : "Review record"}
                  <ArrowRight aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <aside className="ledger-activity" aria-label="Recent activity and system status">
          <div className="ledger-activity__feed">
            <p className="eyebrow">Activity</p>
            <h2>Latest movement</h2>
            <ol>
              {data.recentLeads.slice(0, 4).map((lead) => (
                <li key={lead.reference}>
                  <time dateTime={lead.createdAt}>{formatDate(lead.createdAt)}</time>
                  <span aria-hidden="true" />
                  <div>
                    <strong>{lead.fitStatus === "PENDING" ? "Inquiry received" : "Lead qualified"}</strong>
                    <small>{lead.organization.name}</small>
                  </div>
                </li>
              ))}
              {data.counts.overdueInvoices > 0 && (
                <li className="is-warning">
                  <time>Action</time>
                  <span aria-hidden="true" />
                  <div>
                    <strong>{data.counts.overdueInvoices} overdue invoice{data.counts.overdueInvoices === 1 ? "" : "s"}</strong>
                    <small>Follow-up required</small>
                  </div>
                </li>
              )}
            </ol>
          </div>

          <div className="ledger-system-status">
            <p className="eyebrow">System status</p>
            <div className={readiness.allReady ? "is-ready" : "is-gated"}>
              {readiness.allReady
                ? <CheckCircle aria-hidden="true" weight="fill" />
                : <Warning aria-hidden="true" weight="fill" />}
              <span>
                <strong>{readiness.allReady ? "Payments ready" : "Payment gate active"}</strong>
                <small>
                  Paystack {readiness.paystack.ready ? "ready" : "pending"} / BTCPay {readiness.btcpay.ready ? "ready" : "pending"}
                </small>
              </span>
            </div>
            <p className="mono">PAYMENTS_LIVE / {readiness.paymentsLive ? "TRUE" : "FALSE"}</p>
          </div>
        </aside>
      </section>
    </OperationsShell>
  );
}
