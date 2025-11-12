import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Get current session on server
 */
export async function getSession() {
  return await auth();
}

/**
 * Get current user on server
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

/**
 * Require authentication - redirect to login if not authenticated
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
}

/**
 * Require admin role - redirect if not admin
 */
export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }
  return session;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const session = await getSession();
  return !!session?.user;
}

/**
 * Check if user is admin
 */
export async function isAdmin() {
  const session = await getSession();
  return session?.user?.role === "ADMIN";
}
