import Link from "next/link";

export function OperationsUnavailable() {
  return (
    <section className="site-shell ops-unavailable">
      <p className="eyebrow">Operations service / Unavailable</p>
      <h2>The control plane could not be reached.</h2>
      <p>
        No data was changed. Check the platform API health and server environment, then try again.
      </p>
      <Link href="/admin" className="button button--ghost">Retry overview</Link>
    </section>
  );
}
