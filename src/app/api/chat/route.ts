import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import OpenAI from "openai";

const resend = new Resend(process.env.RESEND_API_KEY);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, message, visitorId, email, action } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    // Handle "Talk to Human" action
    if (action === "request_human") {
      // Ensure session exists first
      const existingSession = await prisma.chatSession.findUnique({
        where: { id: sessionId },
      });

      if (!existingSession) {
         // Create it if it doesn't exist (edge case)
         await prisma.chatSession.create({
            data: {
              id: sessionId,
              visitorId: visitorId || "unknown",
              status: "WAITING_FOR_AGENT",
            },
         });
      } else {
        await prisma.chatSession.update({
            where: { id: sessionId },
            data: { status: "WAITING_FOR_AGENT" },
        });
      }

      // Send email notification
      try {
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
            to: process.env.ADMIN_EMAIL || "admin@novyrix.com",
            subject: `New Chat Request from Visitor`,
            html: `<p>User ${sessionId} is requesting a human agent.</p><p>Visitor ID: ${visitorId}</p>`,
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
      }

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
          visitorId: visitorId || "unknown",
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
    if (message) {
        await prisma.chatMessage.create({
            data: {
                sessionId,
                sender: "USER",
                content: message,
            },
        });
    }

    // Logic for AI vs Human
    if (session.status === "WAITING_FOR_AGENT") {
      return NextResponse.json({ status: "waiting" });
    }

    // Fetch conversation history for context
    const history = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: "asc" },
      take: 10, // Limit context window
    });

    const messages = history.map((msg) => ({
      role: msg.sender === "USER" ? "user" : "assistant",
      content: msg.content,
    }));

    // Generate AI Response with Context
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are Novy, the AI assistant for Novyrix Digital. 
          You are helpful, professional, and concise.
          Novyrix provides custom web development, workflow automation, and software solutions in Kenya.
          If you don't know an answer, suggest they click "Talk to Human".
          Keep responses under 3 sentences unless detailed info is requested.`
        },
        ...messages as any
      ],
    });

    const aiResponse = completion.choices[0].message.content || "I'm sorry, I couldn't generate a response. Please try again.";

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
