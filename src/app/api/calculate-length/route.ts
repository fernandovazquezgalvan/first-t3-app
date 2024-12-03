import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Get the request body
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required and must be a string" },
        { status: 400 }
      );
    }

    // Calculate the length of the trimmed text
    const length = text.trim().length;

    return NextResponse.json({ length });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
} 