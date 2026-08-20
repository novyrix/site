import { NextResponse } from "next/server";

type InquiryPayload = {
  contactName?: string;
  contactEmail?: string;
  organizationName?: string;
  organizationType?: string;
  country?: string;
  services?: string[];
  problem?: string;
  budget?: string;
};

export async function POST(request: Request) {
  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return NextResponse.json({ error: "The inquiry payload is not valid JSON." }, { status: 400 });
  }

  const validEmail = /^\S+@\S+\.\S+$/.test(payload.contactEmail || "");
  const valid =
    Boolean(payload.contactName?.trim()) &&
    validEmail &&
    Boolean(payload.organizationName?.trim()) &&
    Boolean(payload.organizationType) &&
    Boolean(payload.country?.trim()) &&
    Boolean(payload.services?.length) &&
    (payload.problem?.trim().length || 0) >= 40;

  if (!valid) {
    return NextResponse.json({ error: "Required inquiry details are missing or invalid." }, { status: 400 });
  }

  const apiUrl = process.env.NOVYRIX_API_URL?.replace(/\/$/, "");
  const apiToken = process.env.NOVYRIX_API_TOKEN;

  if (!apiUrl || !apiToken) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Inquiry delivery is temporarily unavailable. Please email connect@novyrix.com." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        reference: `PREVIEW-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
        accepted: true,
        preview: true,
      },
      { status: 202 }
    );
  }

  if (process.env.NODE_ENV === "production" && !apiUrl.startsWith("https://")) {
    console.error("NOVYRIX_API_URL must use HTTPS in production.");
    return NextResponse.json(
      { error: "Inquiry delivery is temporarily unavailable. Please email connect@novyrix.com." },
      { status: 503 }
    );
  }

  try {
    const apiResponse = await fetch(`${apiUrl}/v1/inquiries`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const result = (await apiResponse.json()) as { reference?: string; error?: string };

    if (!apiResponse.ok || !result.reference) {
      const status = apiResponse.status === 400 ? 400 : 502;
      return NextResponse.json(
        {
          error:
            status === 400
              ? result.error || "Required inquiry details are missing or invalid."
              : "Inquiry delivery is temporarily unavailable. Please email connect@novyrix.com.",
        },
        { status }
      );
    }

    return NextResponse.json(
      { reference: result.reference, accepted: true, preview: false },
      { status: 202 }
    );
  } catch (error) {
    console.error("Novyrix inquiry API request failed", error);
    return NextResponse.json(
      { error: "Inquiry delivery is temporarily unavailable. Please email connect@novyrix.com." },
      { status: 502 }
    );
  }
}
