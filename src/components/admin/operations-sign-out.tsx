"use client";

import { SignOut } from "@phosphor-icons/react";
import { signOut } from "next-auth/react";

export function OperationsSignOut() {
  return (
    <button
      type="button"
      className="ops-sign-out"
      onClick={() => void signOut({ callbackUrl: "/" })}
    >
      <SignOut aria-hidden="true" weight="bold" />
      Sign out
    </button>
  );
}
