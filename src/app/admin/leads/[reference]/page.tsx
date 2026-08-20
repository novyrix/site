import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadOperations } from "@/components/admin/lead-operations";
import { OperationsShell } from "@/components/admin/operations-shell";
import { OperationsUnavailable } from "@/components/admin/operations-unavailable";
import { getAdminLead, getPaymentReadiness, isAdminPreview } from "@/lib/admin-api";
import { requireAdmin } from "@/lib/admin-session";
import { PlatformApiError } from "@/lib/platform-api";

export const dynamic = "force-dynamic";

function formatAmount(value: string, currency: string) {
  return new Intl.NumberFormat("en-KE", { style: "currency", currency }).format(Number(BigInt(value)) / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(new Date(value));
}

export default async function AdminLeadPage({
  params,
  searchParams,
}: {
  params: Promise<{ reference: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const [{ reference }, query] = await Promise.all([params, searchParams]);
  const preview = isAdminPreview(query.preview);
  await requireAdmin(preview);

  let lead;
  let readiness;
  try {
    [lead, readiness] = await Promise.all([
      getAdminLead(reference, preview),
      getPaymentReadiness(preview),
    ]);
  } catch (error) {
    if (error instanceof PlatformApiError && error.status === 404) notFound();
    if (preview && error instanceof Error && error.message === "lead_not_found") notFound();
    return (
      <OperationsShell
        eyebrow={`Lead record / ${reference}`}
        title="The lead record is unavailable."
        description="No data was changed."
        preview={preview}
      ><OperationsUnavailable /></OperationsShell>
    );
  }

  const previewQuery = preview ? "?preview=qa" : "";

  return (
    <OperationsShell
      eyebrow={`Lead record / ${lead.reference}`}
      title={lead.organization.name}
      description={`${lead.contactName} / ${lead.organization.country} / ${lead.organization.resolvedCurrency}`}
      preview={preview}
    >
      <section className="site-shell ops-lead-detail">
        <Link href={`/admin/leads${previewQuery}`} className="arrow-link">
          <ArrowLeft aria-hidden="true" /> Back to pipeline
        </Link>

        <div className="ops-context-grid">
          <article className="ops-context-main">
            <p className="eyebrow">Operating problem</p>
            <h2>{lead.problemDescription}</h2>
          </article>
          <aside>
            <div><span className="mono">Organisation type</span><strong>{lead.organization.type.replaceAll("_", " ")}</strong></div>
            <div><span className="mono">Services</span><strong>{lead.servicesOfInterest.join(" / ")}</strong></div>
            <div><span className="mono">Budget context</span><strong>{lead.budgetRange || "Not provided"}</strong></div>
            <div><span className="mono">Received</span><strong>{formatDate(lead.createdAt)}</strong></div>
          </aside>
        </div>

        <LeadOperations lead={lead} readiness={readiness} preview={preview} />

        {lead.proposals.length > 0 && (
          <section className="ops-history">
            <div className="ops-section-heading">
              <div><p className="eyebrow">Commercial history</p><h2>What was agreed and billed.</h2></div>
            </div>
            {lead.proposals.map((proposal) => (
              <article className="ops-history__proposal" key={proposal.reference}>
                <div className="ops-history__heading">
                  <div>
                    <span className="mono">{proposal.reference} / {proposal.status}</span>
                    <h3>{proposal.serviceType}</h3>
                    <p>{proposal.timeline}</p>
                  </div>
                  <strong>{formatAmount(proposal.totalAmountMinor, proposal.currency)}</strong>
                </div>
                {proposal.engagement?.invoices.map((invoice) => (
                  <div className="ops-invoice-row" key={invoice.reference}>
                    <span className="mono">{invoice.reference}</span>
                    <span><strong>{invoice.status}</strong><small>Due {formatDate(invoice.dueAt)}</small></span>
                    <strong>{formatAmount(invoice.totalAmountMinor, invoice.currency)}</strong>
                    <small>{invoice.notificationStatus === "SENT" ? "Delivered" : invoice.notificationStatus}</small>
                  </div>
                ))}
              </article>
            ))}
          </section>
        )}
      </section>
    </OperationsShell>
  );
}
