import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, message, visitorId, email, action } = body;

    // Handle "Talk to Human" action
    if (action === "request_human") {
      const session = await prisma.chatSession.update({
        where: { id: sessionId },
        data: { status: "WAITING_FOR_AGENT" },
      });

      // Send email notification
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: process.env.ADMIN_EMAIL || "admin@novyrix.com",
        subject: `New Chat Request from ${session.name || "Visitor"}`,
        html: `<p>User ${session.id} is requesting a human agent.</p><p>Visitor ID: ${visitorId}</p>`,
      });

      return NextResponse.json({
        message: "Agent notified",
        systemMessage: "I've notified our team. Someone will be with you shortly. You can also leave your email or WhatsApp number so we can get back to you if we miss you."
      });
    }

    // Find or create session
    let session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      session = await prisma.chatSession.create({
        data: {
          id: sessionId,
          visitorId,
          status: "ACTIVE",
        },
      });
    }

    // Update email if provided
    if (email) {
      await prisma.chatSession.update({
        where: { id: sessionId },
        data: { email },
      });
    }

    // Save User Message
    await prisma.chatMessage.create({
      data: {
        sessionId,
        sender: "USER",
        content: message,
      },
    });

    // Logic for AI vs Human
    if (session.status === "WAITING_FOR_AGENT") {
      // Notify admin again if needed (debounce this in real app)
      // For now, just acknowledge
      return NextResponse.json({ status: "waiting" });
    }

    // AI Response (Mocked for now as requested "disable AI", or simple auto-reply)
    // The user said "disable the AI for now... let it be a chatbot".
    // I'll implement a simple rule-based bot here or call the AI if I want.
    // Let's use a simple auto-reply for now to be safe, or a very basic AI.

    // For this specific request, I'll simulate a basic bot that tries to be helpful but offers human help.
    const aiResponse = "Thanks for reaching out! I'm the Novyrix assistant. I can help with basic questions about our services. If you need specific pricing or custom quotes, please click 'Talk to Human'.";

    await prisma.chatMessage.create({
      data: {
        sessionId,
        sender: "AI",
        content: aiResponse,
      },
    });

    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID required" }, { status: 400 });
  }

  const messages = await prisma.chatMessage.findMany({
    where: { sessionId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ messages });
}
