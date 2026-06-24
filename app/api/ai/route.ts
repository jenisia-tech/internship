import { NextResponse } from "next/server";
import { callLLM } from "@/llm";

export async function POST(req: Request) {
  try {
    const { symptoms } = await req.json();

    const answer = await callLLM(
      `Patient symptoms: ${symptoms}. Give short safe advice.`
    );

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("LLM API Error:", error);

    return NextResponse.json(
      { error: "Failed to generate AI response" },
      { status: 500 }
    );
  }
}