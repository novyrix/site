"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Button
      variant="outline"
      size="md"
      onClick={handleSignOut}
      leftIcon={<LogOut className="w-4 h-4" />}
    >
      Sign Out
    </Button>
  );
}
