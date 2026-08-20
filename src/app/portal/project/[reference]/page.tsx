import { ArrowLeft, ArrowUpRight, CheckCircle, Circle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortalInvoiceActions } from "@/components/portal/portal-invoice-actions";
import { PortalMessageForm } from "@/components/portal/portal-message-form";
import { PortalShell } from "@/components/portal/portal-shell";
import { PortalUnavailable } from "@/components/portal/portal-unavailable";
import {
  formatPortalAmount,
  formatPortalDate,
  humanizePortalStatus,
} from "@/lib/portal-format";
import { getPortalEngagement, isPortalPreview } from "@/lib/portal-api";
import { requirePortalSession } from "@/lib/portal-session";
import { PlatformApiError } from "@/lib/platform-api";

export const dynamic = "force-dynamic";

export default async function PortalProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ reference: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const [{ reference }, query] = await Promise.all([params, searchParams]);
  const preview = isPortalPreview(query.preview);
  const session = await requirePortalSession(preview);

  let engagement;
  try {
    engagement = await getPortalEngagement(reference, session.user.id, preview);
  } catch (error) {
    if (error instanceof PlatformApiError && error.status === 404) notFound();
    if (preview) notFound();
    return (
      <PortalShell
        eyebrow={`Project / ${reference}`}
        title="Project record unavailable."
        description="No project or payment data was changed."
        preview={preview}
      >
        <PortalUnavailable />
      </PortalShell>
    );
  }

  const previewQuery = preview ? "?preview=qa" : "";
  const latestInvoice = engagement.invoices[0];
  const milestoneIcon = {
    COMPLETE: CheckCircle,
    BLOCKED: WarningCircle,
    IN_PROGRESS: Circle,
    NOT_STARTED: Circle,
  };

  return (
    <PortalShell
      eyebrow={`Project / ${engagement.reference}`}
      title={engagement.proposal.serviceType}
      description={engagement.proposal.scopeSummary}
      preview={preview}
    >
      <section className="portal-shell portal-detail">
        <Link href={`/portal${previewQuery}`} className="arrow-link">
          <ArrowLeft aria-hidden="true" /> Back to dashboard
        </Link>

        <div className="portal-detail-grid">
          <article className="portal-project-brief">
            <div className="portal-project-brief__meta">
              <span className="mono">{engagement.agreementReference}</span>
              <span className={`portal-status portal-status--${engagement.status.toLowerCase()}`}>
                {humanizePortalStatus(engagement.status)}
              </span>
            </div>
            <h2>{engagement.progress}% complete against agreed milestones.</h2>
            <p>{engagement.proposal.timeline}</p>
            <div className="portal-progress portal-progress--large">
              <span style={{ width: `${engagement.progress}%` }} />
            </div>
          </article>

          <aside className="portal-ledger-card">
            <p className="eyebrow">Commercial scope</p>
            <dl>
              <div>
                <dt>Proposal</dt>
                <dd>{engagement.proposal.reference}</dd>
              </div>
              <div>
                <dt>Scope value</dt>
                <dd>{formatPortalAmount(engagement.proposal.totalAmountMinor, engagement.proposal.currency)}</dd>
              </div>
              <div>
                <dt>Agreement confirmed</dt>
                <dd>{formatPortalDate(engagement.agreementConfirmedAt)}</dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="portal-two-column">
          <section className="portal-panel">
            <div className="portal-section-heading">
              <div>
                <p className="eyebrow">Milestones</p>
                <h2>Progress that can be checked.</h2>
              </div>
            </div>
            <div className="portal-timeline">
              {engagement.milestones.map((milestone) => {
                const Icon = milestoneIcon[milestone.status];
                return (
                  <article className={`portal-milestone portal-milestone--${milestone.status.toLowerCase()}`} key={milestone.id}>
                    <Icon aria-hidden="true" weight={milestone.status === "COMPLETE" ? "fill" : "bold"} />
                    <div>
                      <span className="mono">
                        {String(milestone.position + 1).padStart(2, "0")} / {humanizePortalStatus(milestone.status)}
                      </span>
                      <h3>{milestone.title}</h3>
                      {milestone.description && <p>{milestone.description}</p>}
                      <small>Due {formatPortalDate(milestone.dueAt)}</small>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="portal-panel">
            <div className="portal-section-heading">
              <div>
                <p className="eyebrow">Deliverables</p>
                <h2>Artifacts shared for review.</h2>
              </div>
            </div>
            <div className="portal-deliverables">
              {engagement.deliverables.map((deliverable) => (
                <article key={deliverable.id}>
                  <span className="mono">{humanizePortalStatus(deliverable.status)}</span>
                  <h3>{deliverable.title}</h3>
                  {deliverable.description && <p>{deliverable.description}</p>}
                  <small>{deliverable.milestone?.title || "General project artifact"}</small>
                  {deliverable.url && (
                    <a href={deliverable.url} target="_blank" rel="noreferrer">
                      Open artifact <ArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="portal-panel portal-panel--wide">
          <div className="portal-section-heading">
            <div>
              <p className="eyebrow">Invoices</p>
              <h2>Itemized payment history.</h2>
            </div>
            <Link href={`/portal/invoices${previewQuery}`} className="arrow-link">
              Full ledger <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          {latestInvoice ? (
            <article className="portal-invoice-card portal-invoice-card--compact">
              <header className="portal-invoice-card__head">
                <div>
                  <span className="mono">Invoice reference</span>
                  <strong>{latestInvoice.reference}</strong>
                </div>
                <span className={`portal-status portal-status--${latestInvoice.status.toLowerCase()}`}>
                  {humanizePortalStatus(latestInvoice.status)}
                </span>
              </header>
              <div className="portal-invoice-card__content">
                <div className="portal-invoice-card__summary">
                  <span className="mono">Amount due</span>
                  <h3>{formatPortalAmount(latestInvoice.totalAmountMinor, latestInvoice.currency)}</h3>
                  <div className="portal-invoice-card__due">
                    <span className="mono">Due date</span>
                    <strong>{formatPortalDate(latestInvoice.dueAt)}</strong>
                  </div>
                </div>
              </div>
              <PortalInvoiceActions
                invoiceReference={latestInvoice.reference}
                status={latestInvoice.status}
                preview={preview}
                compact
              />
            </article>
          ) : (
            <p className="portal-payment-note mono">No invoices have been issued for this engagement.</p>
          )}
        </section>

        <section className="portal-panel portal-panel--wide">
          <div className="portal-section-heading">
            <div>
              <p className="eyebrow">Logged channel</p>
              <h2>Keep decisions out of scattered threads.</h2>
            </div>
            <Link href={`/portal/messages${previewQuery}`} className="arrow-link">
              Open all messages <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <PortalMessageForm engagementReference={engagement.reference} preview={preview} />
        </section>
      </section>
    </PortalShell>
  );
}
