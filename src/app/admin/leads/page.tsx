import { ArrowLeft, ArrowRight, ArrowUpRight, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { OperationsShell } from "@/components/admin/operations-shell";
import { OperationsUnavailable } from "@/components/admin/operations-unavailable";
import { getAdminLeads, isAdminPreview } from "@/lib/admin-api";
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

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{
    preview?: string;
    search?: string;
    fitStatus?: string;
    discoveryOutcome?: string;
    page?: string;
  }>;
}) {
  const input = await searchParams;
  const preview = isAdminPreview(input.preview);
  await requireAdmin(preview);
  const query = new URLSearchParams();
  for (const key of ["search", "fitStatus", "discoveryOutcome", "page"] as const) {
    if (input[key]) query.set(key, input[key]);
  }

  let leads;
  try {
    leads = await getAdminLeads(query, preview);
  } catch {
    return (
      <OperationsShell
        eyebrow="Lead pipeline / Fit before proposal"
        title="One inquiry. One next step."
        description="Review the operating context, record fit, and keep discovery decisions attached to the lead."
        preview={preview}
      >
        <OperationsUnavailable />
      </OperationsShell>
    );
  }

  const previewPair = preview ? "&preview=qa" : "";
  const previewQuery = preview ? "?preview=qa" : "";

  return (
    <OperationsShell
      eyebrow="Lead pipeline / Fit before proposal"
      title="One inquiry. One next step."
      description="Review the operating context, record fit, and keep discovery decisions attached to the lead."
      preview={preview}
    >
      <section className="site-shell ops-pipeline">
        <form className="ops-filters" action="/admin/leads">
          {preview && <input type="hidden" name="preview" value="qa" />}
          <label>
            <span className="mono">Search</span>
            <span className="ops-search-field">
              <MagnifyingGlass aria-hidden="true" />
              <input name="search" defaultValue={input.search} placeholder="Reference, contact, or organisation" />
            </span>
          </label>
          <label>
            <span className="mono">Fit status</span>
            <select name="fitStatus" defaultValue={input.fitStatus || ""}>
              <option value="">All</option>
              <option value="PENDING">Pending</option>
              <option value="FIT">Fit</option>
              <option value="NOT_FIT">Not fit</option>
            </select>
          </label>
          <label>
            <span className="mono">Discovery</span>
            <select name="discoveryOutcome" defaultValue={input.discoveryOutcome || ""}>
              <option value="">All</option>
              <option value="PROCEED">Proceed</option>
              <option value="FOLLOW_UP">Follow up</option>
              <option value="DECLINE">Decline</option>
            </select>
          </label>
          <button type="submit" className="button button--primary">Apply filters</button>
        </form>

        <div className="ops-pipeline__meta">
          <p><strong>{leads.total}</strong> lead{leads.total === 1 ? "" : "s"}</p>
          <Link href={`/admin${previewQuery}`} className="arrow-link"><ArrowLeft aria-hidden="true" /> Overview</Link>
        </div>

        <div className="ops-pipeline-table">
          <div className="ops-pipeline-table__head mono">
            <span>Organisation</span><span>Context</span><span>Fit</span><span>Received</span><span />
          </div>
          {leads.items.map((lead) => (
            <Link href={`/admin/leads/${lead.reference}${previewQuery}`} className="ops-pipeline-row" key={lead.reference}>
              <span>
                <strong>{lead.organization.name}</strong>
                <small>{lead.reference} / {lead.contactName}</small>
              </span>
              <span>
                <strong>{lead.servicesOfInterest.slice(0, 2).join(" / ")}</strong>
                <small>{lead.organization.country} / {lead.organization.resolvedCurrency}</small>
              </span>
              <span className={`ops-status ops-status--${lead.fitStatus.toLowerCase()}`}>
                {lead.fitStatus.replace("_", " ")}
              </span>
              <time dateTime={lead.createdAt}>{formatDate(lead.createdAt)}</time>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>

        {leads.pages > 1 && (
          <nav className="ops-pagination" aria-label="Lead pages">
            <Link
              aria-disabled={leads.page <= 1}
              href={`/admin/leads?page=${Math.max(1, leads.page - 1)}${previewPair}`}
            ><ArrowLeft aria-hidden="true" /> Previous</Link>
            <span className="mono">Page {leads.page} / {leads.pages}</span>
            <Link
              aria-disabled={leads.page >= leads.pages}
              href={`/admin/leads?page=${Math.min(leads.pages, leads.page + 1)}${previewPair}`}
            >Next <ArrowRight aria-hidden="true" /></Link>
          </nav>
        )}
      </section>
    </OperationsShell>
  );
}
