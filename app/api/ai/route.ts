import { NextResponse } from "next/server";
import { generateSymptomAdvice } from "@/ai-integration";

export async function POST(req: Request) {
  try {
    const { symptoms } = await req.json();

    const answer = await generateSymptomAdvice(symptoms);

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Groq API Error:", error);

    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}