import {
  ArrowUpRight,
  CheckCircle,
  ClockCountdown,
  FileText,
  FolderOpen,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { PortalShell } from "@/components/portal/portal-shell";
import { PortalUnavailable } from "@/components/portal/portal-unavailable";
import { formatPortalAmount, formatPortalDate, humanizePortalStatus } from "@/lib/portal-format";
import { getPortalOverview, isPortalPreview } from "@/lib/portal-api";
import { requirePortalSession } from "@/lib/portal-session";

export const dynamic = "force-dynamic";

export default async function PortalPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const query = await searchParams;
  const preview = isPortalPreview(query.preview);
  const session = await requirePortalSession(preview);

  let overview;
  try {
    overview = await getPortalOverview(session.user.id, preview);
  } catch {
    return (
      <PortalShell
        eyebrow="Client workspace"
        title="Your Novyrix workspace."
        description="Track milestones, deliverables, invoices, and project decisions in one private place."
        preview={preview}
      >
        <PortalUnavailable />
      </PortalShell>
    );
  }

  const previewQuery = preview ? "?preview=qa" : "";
  const metrics = [
    { label: "Active engagements", value: overview.summary.activeEngagements, Icon: FolderOpen },
    { label: "Completed engagements", value: overview.summary.completedEngagements, Icon: CheckCircle },
    { label: "Pending invoices", value: overview.summary.pendingInvoices, Icon: ClockCountdown },
    { label: "Deliverables shared", value: overview.summary.deliverablesShared, Icon: FileText },
  ];

  return (
    <PortalShell
      eyebrow={`Workspace / ${overview.user.organizations[0]?.name || "Client"}`}
      title={`Good to see you, ${overview.user.name.split(" ")[0]}.`}
      description="Every major project action should leave a trace: what was agreed, what is moving, what was delivered, and what has been paid."
      preview={preview}
    >
      <section className="portal-shell portal-metrics" aria-label="Portal summary">
        {metrics.map(({ label, value, Icon }, index) => (
          <article key={label}>
            <span className="mono">{String(index + 1).padStart(2, "0")}</span>
            <Icon aria-hidden="true" weight="bold" />
            <strong>{value}</strong>
            <p>{label}</p>
          </article>
        ))}
      </section>

      <section className="portal-shell portal-workspace">
        <div className="portal-section-heading">
          <div>
            <p className="eyebrow">Engagements</p>
            <h2>Current work, tied to the signed scope.</h2>
          </div>
          <Link href={`/portal/invoices${previewQuery}`} className="arrow-link">
            Invoice ledger <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="portal-project-grid">
          {overview.engagements.map((engagement) => {
            const pendingInvoice = engagement.invoices.find((invoice) =>
              ["PENDING", "OVERDUE"].includes(invoice.status),
            );

            return (
              <Link
                href={`/portal/project/${engagement.reference}${previewQuery}`}
                className="portal-project-card"
                key={engagement.reference}
              >
                <div className="portal-project-card__top">
                  <span className="mono">{engagement.reference}</span>
                  <span className={`portal-status portal-status--${engagement.status.toLowerCase()}`}>
                    {humanizePortalStatus(engagement.status)}
                  </span>
                </div>
                <h3>{engagement.proposal.serviceType}</h3>
                <p>{engagement.proposal.scopeSummary}</p>
                <div className="portal-progress" aria-label={`${engagement.progress}% complete`}>
                  <span style={{ width: `${engagement.progress}%` }} />
                </div>
                <dl>
                  <div>
                    <dt>Current milestone</dt>
                    <dd>{engagement.currentMilestone?.title || "Milestones pending setup"}</dd>
                  </div>
                  <div>
                    <dt>Timeline</dt>
                    <dd>{engagement.proposal.timeline}</dd>
                  </div>
                  <div>
                    <dt>Open invoice</dt>
                    <dd>
                      {pendingInvoice
                        ? `${pendingInvoice.reference} / ${formatPortalAmount(pendingInvoice.totalAmountMinor, pendingInvoice.currency)}`
                        : "None"}
                    </dd>
                  </div>
                </dl>
                <span className="portal-card-link">
                  Open project <ArrowUpRight aria-hidden="true" />
                </span>
              </Link>
            );
          })}

          {overview.engagements.length === 0 && (
            <article className="portal-empty">
              <p className="eyebrow">No active work yet</p>
              <h2>Your portal is ready for the first signed engagement.</h2>
              <p>Once an agreement is confirmed, milestones, invoices, deliverables, and messages will appear here.</p>
            </article>
          )}
        </div>
      </section>

      {overview.engagements.length > 0 && (
        <section className="portal-shell portal-next">
          <p className="eyebrow">Next check-in</p>
          <h2>{overview.engagements[0].currentMilestone?.title || "Project setup"}</h2>
          <p>
            Target date: {formatPortalDate(overview.engagements[0].currentMilestone?.dueAt || null)}.
            Use the message log for approvals, blockers, and delivery notes.
          </p>
          <Link href={`/portal/messages${previewQuery}`} className="button button--primary">
            Open messages <ArrowUpRight aria-hidden="true" />
          </Link>
        </section>
      )}
    </PortalShell>
  );
}
