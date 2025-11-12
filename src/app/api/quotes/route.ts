import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ServiceType, QuoteStatus } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();

    const {
      serviceType,
      // Website fields
      basePrice,
      hasBlog,
      hasGallery,
      hasBooking,
      hasEcommerce,
      hasApi,
      hostingType,
      carePlan,
      ecommercePlan,
      // Software fields
      projectType,
      projectStage,
      features,
      complexity,
      // Automation fields
      businessArea,
      currentTools,
      hoursPerWeek,
      // Totals
      oneTimeTotal,
      monthlyTotal,
      yearlyTotal,
      notes,
    } = body;

    // Validate required fields
    if (!serviceType || !oneTimeTotal) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate service type
    if (!["WEBSITE_DEVELOPMENT", "SOFTWARE_DEVELOPMENT", "WORKFLOW_AUTOMATION"].includes(serviceType)) {
      return NextResponse.json(
        { error: "Invalid service type" },
        { status: 400 }
      );
    }

    // If user is logged in, link the quote
    const userId = session?.user?.id || null;

    // Create the quote
    const quote = await prisma.quote.create({
      data: {
        userId: userId!,
        serviceType: serviceType as ServiceType,
        status: "DRAFT" as QuoteStatus,
        // Website fields
        basePrice: basePrice ? parseFloat(basePrice) : null,
        hasBlog: hasBlog || false,
        hasGallery: hasGallery || false,
        hasBooking: hasBooking || false,
        hasEcommerce: hasEcommerce || false,
        hasApi: hasApi || false,
        hostingType: hostingType || null,
        carePlan: carePlan || false,
        ecommercePlan: ecommercePlan || false,
        // Software fields
        projectType: projectType || null,
        projectStage: projectStage || null,
        features: features || null,
        complexity: complexity || null,
        // Automation fields
        businessArea: businessArea || null,
        currentTools: currentTools || null,
        hoursPerWeek: hoursPerWeek || null,
        // Totals
        oneTimeTotal: parseFloat(oneTimeTotal),
        monthlyTotal: monthlyTotal ? parseFloat(monthlyTotal) : null,
        yearlyTotal: yearlyTotal ? parseFloat(yearlyTotal) : null,
        notes: notes || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        quoteId: quote.id,
        message: "Quote saved successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving quote:", error);
    return NextResponse.json(
      { error: "Failed to save quote" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const serviceType = searchParams.get("serviceType");

    // Build filter
    const where: any = {
      userId: session.user.id,
    };

    if (status) {
      where.status = status;
    }

    if (serviceType) {
      where.serviceType = serviceType;
    }

    // Fetch quotes
    const quotes = await prisma.quote.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ quotes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}
