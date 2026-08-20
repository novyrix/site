import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { PortalInvoiceActions } from "@/components/portal/portal-invoice-actions";
import { PortalShell } from "@/components/portal/portal-shell";
import { PortalUnavailable } from "@/components/portal/portal-unavailable";
import {
  formatPortalAmount,
  formatPortalDate,
  humanizePortalStatus,
} from "@/lib/portal-format";
import { getPortalInvoices, isPortalPreview } from "@/lib/portal-api";
import { requirePortalSession } from "@/lib/portal-session";

export const dynamic = "force-dynamic";

export default async function PortalInvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string; invoice?: string; returned?: string }>;
}) {
  const query = await searchParams;
  const preview = isPortalPreview(query.preview);
  const session = await requirePortalSession(preview);

  let invoices;
  try {
    invoices = await getPortalInvoices(session.user.id, preview);
  } catch {
    return (
      <PortalShell
        eyebrow="Invoice ledger"
        title="Payment records unavailable."
        description="No payment action was taken."
        preview={preview}
      >
        <PortalUnavailable />
      </PortalShell>
    );
  }

  const previewQuery = preview ? "?preview=qa" : "";

  return (
    <PortalShell
      eyebrow="Invoice ledger"
      title="Invoices and payment records."
      description="Review line items, due dates, payment status, receipts, and available settlement routes."
      preview={preview}
    >
      <section className="portal-shell portal-invoices">
        <Link href={`/portal${previewQuery}`} className="arrow-link">
          <ArrowLeft aria-hidden="true" /> Back to dashboard
        </Link>

        {query.returned && (
          <div className="portal-return-note" role="status">
            <span className="mono">Returned from {query.returned}</span>
            <p>
              Provider settlement can take a moment to verify. Refresh this page if the invoice status has not updated yet.
            </p>
          </div>
        )}

        <div className="portal-invoice-list">
          {invoices.items.map((invoice) => (
            <article
              className={`portal-invoice-card ${query.invoice === invoice.reference ? "is-highlighted" : ""}`}
              key={invoice.reference}
            >
              <header className="portal-invoice-card__head">
                <div>
                  <span className="mono">Invoice reference</span>
                  <strong>{invoice.reference}</strong>
                </div>
                <span className={`portal-status portal-status--${invoice.status.toLowerCase()}`}>
                  {humanizePortalStatus(invoice.status)}
                </span>
              </header>

              <div className="portal-invoice-card__content">
                <div className="portal-invoice-card__summary">
                  <span className="mono">Amount due</span>
                  <h2>{formatPortalAmount(invoice.totalAmountMinor, invoice.currency)}</h2>
                  <p>{invoice.serviceType} for {invoice.organizationName}</p>
                  <div className="portal-invoice-card__due">
                    <span className="mono">Due date</span>
                    <strong>{formatPortalDate(invoice.dueAt)}</strong>
                  </div>
                </div>

                <section className="portal-line-items" aria-labelledby={`line-items-${invoice.reference}`}>
                  <div className="portal-line-items__heading">
                    <span className="mono" id={`line-items-${invoice.reference}`}>Line items</span>
                    <span className="mono">Qty / Total</span>
                  </div>
                  <div className="portal-line-table" role="table" aria-label={`${invoice.reference} line items`}>
                    {invoice.lineItems.map((item) => (
                      <div role="row" key={item.description}>
                        <span role="cell">{item.description}</span>
                        <span role="cell" className="mono">x{item.quantity}</span>
                        <strong role="cell">{formatPortalAmount(item.totalAmountMinor, invoice.currency)}</strong>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {invoice.payments.length > 0 && (
                <div className="portal-receipts">
                  {invoice.payments.map((payment) => (
                    <p key={payment.receiptReference}>
                      Receipt {payment.receiptReference} / {payment.provider} / {formatPortalDate(payment.paidAt)}
                    </p>
                  ))}
                </div>
              )}
              <PortalInvoiceActions
                invoiceReference={invoice.reference}
                status={invoice.status}
                preview={preview}
              />
            </article>
          ))}
        </div>

        {invoices.items.length === 0 && (
          <article className="portal-empty">
            <p className="eyebrow">No invoices yet</p>
            <h2>Invoices will appear after an accepted milestone or deposit request.</h2>
            <p>Each invoice will show line items, due date, payment state, and receipt history.</p>
          </article>
        )}
      </section>
    </PortalShell>
  );
}
