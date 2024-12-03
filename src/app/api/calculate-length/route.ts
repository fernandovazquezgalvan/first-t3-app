import { NextResponse } from "next/server";

interface RequestBody {
  text: string;
}

export async function POST(request: Request) {
  try {
    // Get the request body with type assertion
    const body = (await request.json()) as RequestBody;
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
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || "Invalid request" },
      { status: 400 }
    );
  }
} 