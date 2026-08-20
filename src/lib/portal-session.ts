import "server-only";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requirePortalSession(preview = false) {
  if (preview) {
    return {
      user: {
        id: "portal-preview-user",
        email: "client@acacia.example",
        name: "Amina Njoroge",
        role: "CLIENT" as const,
      },
    };
  }

  const session = await auth();
  if (session?.user?.role !== "CLIENT") redirect("/login?portal=true");
  return session;
}
