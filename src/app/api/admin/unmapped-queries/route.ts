import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  try {
    // Temporarily disabled auth for development
    // TODO: Re-enable auth check in production
    // const session = await auth();
    // if (!session || session.user.role !== "ADMIN") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { queryId, reviewNotes } = await request.json();

    if (!queryId || !reviewNotes) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update the query
    const updated = await prisma.unmappedQuery.update({
      where: { id: queryId },
      data: {
        needsReview: false,
        reviewNotes,
        reviewedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, query: updated });
  } catch (error) {
    console.error("Error updating unmapped query:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
