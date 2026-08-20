import { NextResponse } from "next/server";

export function retiredRoute() {
  return NextResponse.json(
    {
      error: "This legacy endpoint has been retired.",
      next: "/api/inquiry",
    },
    {
      status: 410,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
