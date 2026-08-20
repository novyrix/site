import NextAuth from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export async function proxy(request: NextRequest) {
  const session = await auth();
  const isAuthenticated = Boolean(session?.user);
  const isAuthPage = request.nextUrl.pathname.startsWith("/login");

  if (isAuthPage) {
    if (isAuthenticated) {
      const destination = session?.user?.role === "CLIENT" ? "/portal" : "/admin";
      return NextResponse.redirect(new URL(destination, request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const localAdminPreview =
      process.env.VERCEL !== "1" &&
      process.env.NODE_ENV === "development" &&
      process.env.NOVYRIX_ADMIN_PREVIEW_ENABLED === "true" &&
      request.nextUrl.searchParams.get("preview") === "qa";
    if (localAdminPreview) return NextResponse.next();

    if (!isAuthenticated || session?.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login?unauthorized=true", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/portal")) {
    const localPortalPreview =
      process.env.VERCEL !== "1" &&
      process.env.NOVYRIX_PORTAL_PREVIEW_ENABLED === "true" &&
      request.nextUrl.searchParams.get("preview") === "qa";
    if (localPortalPreview) return NextResponse.next();

    if (!isAuthenticated || session?.user?.role !== "CLIENT") {
      return NextResponse.redirect(new URL("/login?portal=true", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/portal/:path*",
    "/login",
  ],
};
