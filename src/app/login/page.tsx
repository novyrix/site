import { ArrowLeft, LockKey } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { GoogleSignIn } from "@/components/auth/google-sign-in";

const authErrors: Record<string, string> = {
  AccessDenied: "This Google account is not on the Novyrix access list.",
  Configuration: "Google sign-in is temporarily unavailable.",
  OAuthCallbackError: "Google could not confirm this sign-in. Please try again.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; portal?: string; unauthorized?: string }>;
}) {
  const query = await searchParams;
  const configured = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  const error = query.error ? authErrors[query.error] || "Sign-in could not be completed." : null;
  const portalIntent = query.portal === "true";

  return (
    <main id="main-content" className="admin-login ledger-login">
      <section className="admin-login__brand ledger-login__brand">
        <Link href="/" className="brand-lockup" aria-label="Novyrix home">
          <Image src="/brand/novyrix-icon.svg" width={40} height={40} alt="" priority />
          <span>Novyrix</span>
        </Link>

        <div className="ledger-login__statement">
          <p className="eyebrow">Private workspace / Verified access</p>
          <h1>Work, decisions, and payments in one record.</h1>
          <p>
            Novyrix keeps each engagement tied to its scope, delivery record, invoice history, and project conversation.
          </p>
        </div>

        <div className="ledger-login__index mono" aria-hidden="true">
          <span>01 / Identity</span>
          <span>02 / Membership</span>
          <span>03 / Workspace</span>
        </div>
      </section>

      <section className="admin-login__form ledger-login__form">
        <div className="admin-login__form-inner">
          <div className="ledger-login__icon"><LockKey aria-hidden="true" weight="bold" /></div>
          <p className="eyebrow">Authorised access</p>
          <h2>{portalIntent ? "Open your client workspace." : "Sign in to Novyrix."}</h2>
          <p>
            Use the Google account attached to your Novyrix admin or client access record.
          </p>

          <GoogleSignIn configured={configured} />

          {!configured && (
            <p className="admin-login__error" role="status">
              Google sign-in is not configured in this local environment.
            </p>
          )}
          {error && <p className="admin-login__error" role="alert">{error}</p>}

          <div className="ledger-login__assurance">
            <span className="mono">Access rule</span>
            <p>No account is created at sign-in. Your email must already be approved by Novyrix.</p>
          </div>

          <Link href="/" className="ledger-login__back">
            <ArrowLeft aria-hidden="true" /> Back to novyrix.com
          </Link>
        </div>
      </section>
    </main>
  );
}
