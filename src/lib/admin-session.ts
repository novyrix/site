import "server-only";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireAdmin(preview = false) {
  if (preview && process.env.VERCEL !== "1") {
    return {
      user: {
        id: "novyrix-admin-preview",
        email: "spira@novyrix.com",
        name: "Edmund",
        role: "ADMIN" as const,
      },
    };
  }

  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/login");
  return session;
}
