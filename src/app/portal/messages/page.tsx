import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { PortalMessageForm } from "@/components/portal/portal-message-form";
import { PortalShell } from "@/components/portal/portal-shell";
import { PortalUnavailable } from "@/components/portal/portal-unavailable";
import { formatPortalDateTime } from "@/lib/portal-format";
import { getPortalMessages, getPortalOverview, isPortalPreview } from "@/lib/portal-api";
import { requirePortalSession } from "@/lib/portal-session";

export const dynamic = "force-dynamic";

export default async function PortalMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string; engagement?: string }>;
}) {
  const query = await searchParams;
  const preview = isPortalPreview(query.preview);
  const session = await requirePortalSession(preview);

  let overview;
  let messages;
  try {
    overview = await getPortalOverview(session.user.id, preview);
    const selectedReference = query.engagement || overview.engagements[0]?.reference;
    messages = await getPortalMessages(session.user.id, selectedReference, preview);
  } catch {
    return (
      <PortalShell
        eyebrow="Project messages"
        title="Message log unavailable."
        description="No message was saved."
        preview={preview}
      >
        <PortalUnavailable />
      </PortalShell>
    );
  }

  const previewQuery = preview ? "?preview=qa" : "";
  const selectedReference = query.engagement || overview.engagements[0]?.reference;

  return (
    <PortalShell
      eyebrow="Project messages"
      title="One thread for decisions."
      description="Use this log for approvals, blockers, clarifications, and delivery notes that should survive beyond email and chat apps."
      preview={preview}
    >
      <section className="portal-shell portal-messages">
        <Link href={`/portal${previewQuery}`} className="arrow-link">
          <ArrowLeft aria-hidden="true" /> Back to dashboard
        </Link>

        {overview.engagements.length > 1 && (
          <div className="portal-thread-switcher">
            {overview.engagements.map((engagement) => (
              <Link
                key={engagement.reference}
                href={`/portal/messages?engagement=${engagement.reference}${preview ? "&preview=qa" : ""}`}
                className={engagement.reference === selectedReference ? "is-active" : undefined}
              >
                {engagement.proposal.serviceType}
              </Link>
            ))}
          </div>
        )}

        <div className="portal-thread">
          {messages.items.map((message) => (
            <article
              className={`portal-message portal-message--${message.sender.toLowerCase()}`}
              key={message.id}
            >
              <div>
                <strong>{message.authorName}</strong>
                <time dateTime={message.createdAt}>{formatPortalDateTime(message.createdAt)}</time>
              </div>
              <p>{message.body}</p>
            </article>
          ))}

          {messages.items.length === 0 && (
            <article className="portal-empty">
              <p className="eyebrow">No messages yet</p>
              <h2>This channel is ready for the first project note.</h2>
              <p>Use it for decisions, approvals, blockers, and handover context.</p>
            </article>
          )}
        </div>

        {selectedReference && (
          <PortalMessageForm engagementReference={selectedReference} preview={preview} />
        )}
      </section>
    </PortalShell>
  );
}
