import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AuthContinuePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  redirect(session.user.role === "CLIENT" ? "/portal" : "/admin");
}
