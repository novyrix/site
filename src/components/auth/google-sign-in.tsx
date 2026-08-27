"use client";

import { ArrowRight, SpinnerGap } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function GoogleSignIn({ configured }: { configured: boolean }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function continueWithGoogle() {
    setError(null);
    setPending(true);
    try {
      await signIn("google", { redirectTo: "/auth/continue" });
    } catch {
      setPending(false);
      setError("Google sign-in could not open. Check your connection and try again.");
    }
  }

  return (
    <>
      <button
        className="google-sign-in"
        type="button"
        disabled={!configured || pending}
        onClick={() => void continueWithGoogle()}
      >
        <span className="google-sign-in__mark" aria-hidden="true">G</span>
        <span>{pending ? "Opening Google" : "Continue with Google"}</span>
        {pending
          ? <SpinnerGap className="payment-spinner" aria-hidden="true" />
          : <ArrowRight aria-hidden="true" />}
      </button>
      {error && <p className="admin-login__error" role="alert">{error}</p>}
    </>
  );
}
