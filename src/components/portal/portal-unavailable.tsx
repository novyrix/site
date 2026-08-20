export function PortalUnavailable() {
  return (
    <section className="portal-shell portal-empty">
      <p className="eyebrow">Portal service / Temporarily unavailable</p>
      <h2>We could not load this workspace.</h2>
      <p>
        No project or payment data was changed. Please try again shortly, or contact
        {" "}<a href="mailto:connect@novyrix.com">connect@novyrix.com</a>.
      </p>
    </section>
  );
}
