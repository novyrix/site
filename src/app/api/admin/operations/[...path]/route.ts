import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PlatformApiError, requestPlatformApi } from "@/lib/platform-api";

export const dynamic = "force-dynamic";

const allowedOperations = [
  { method: "GET", pattern: /^overview$/ },
  { method: "GET", pattern: /^leads$/ },
  { method: "GET", pattern: /^leads\/[A-Za-z0-9_-]{5,40}$/ },
  { method: "GET", pattern: /^payments\/readiness$/ },
  { method: "PATCH", pattern: /^leads\/[A-Za-z0-9_-]{5,40}\/(fit|discovery)$/ },
  { method: "POST", pattern: /^(engagements|invoices)$/ },
  { method: "POST", pattern: /^portal-users$/ },
  { method: "POST", pattern: /^engagements\/[A-Za-z0-9_-]{5,40}\/(milestones|deliverables|messages)$/ },
  { method: "PATCH", pattern: /^engagements\/[A-Za-z0-9_-]{5,40}\/milestones\/[A-Za-z0-9_-]{5,80}$/ },
];

async function proxyOperation(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Origin is not allowed." }, { status: 403 });
  }

  const { path } = await context.params;
  const operation = path.join("/");
  if (!allowedOperations.some((item) => item.method === request.method && item.pattern.test(operation))) {
    return NextResponse.json({ error: "Operation not found." }, { status: 404 });
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 64 * 1024) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  let body: string | undefined;
  if (request.method !== "GET") {
    if (!request.headers.get("content-type")?.startsWith("application/json")) {
      return NextResponse.json({ error: "JSON is required." }, { status: 415 });
    }
    try {
      body = JSON.stringify(await request.json());
    } catch {
      return NextResponse.json({ error: "Request body is invalid." }, { status: 400 });
    }
  }

  try {
    const search = new URL(request.url).search;
    const result = await requestPlatformApi(`/v1/admin/${operation}${search}`, {
      method: request.method,
      body,
    });
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const upstreamStatus = error instanceof PlatformApiError ? error.status : 503;
    const status = upstreamStatus === 401 ? 503 : upstreamStatus;
    const message = error instanceof PlatformApiError
      ? error.message
      : "The operations service is temporarily unavailable.";
    return NextResponse.json({ error: message }, { status });
  }
}

export function GET(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxyOperation(request, context);
}

export function POST(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxyOperation(request, context);
}

export function PATCH(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxyOperation(request, context);
}
