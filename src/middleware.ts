import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const isAuth = !!session?.user;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") ||
                     req.nextUrl.pathname.startsWith("/register");

  // Redirect authenticated users away from auth pages
  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Admin routes require ADMIN role
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!isAuth || session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login?unauthorized=true", req.url));
    }
  }

  // Protected routes require authentication
  if (!isAuth) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    );
  }

  return NextResponse.next();
}

// Protect these routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/quotes/:path*",
    "/projects/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};
