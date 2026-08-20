"use client";

import { SignOut } from "@phosphor-icons/react";
import { signOut } from "next-auth/react";

export function PortalSignOut() {
  return (
    <button
      type="button"
      className="portal-sign-out"
      onClick={() => void signOut({ callbackUrl: "/" })}
    >
      <SignOut aria-hidden="true" weight="bold" />
      Sign out
    </button>
  );
}
