import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY environment variable." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const symptoms = body.symptoms?.trim();

    if (!symptoms) {
      return NextResponse.json(
        { error: "Please enter patient symptoms first." },
        { status: 400 }
      );
    }

    const client = new OpenAI({
      apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a hospital assistant. Based on the patient's symptoms, provide short, safe health advice. Do not diagnose diseases. Keep the response under 100 words. Recommend consulting a doctor if symptoms are severe.",
        },
        {
          role: "user",
          content: `Patient symptoms: ${symptoms}`,
        },
      ],
    });

    const answer =
      completion.choices[0]?.message?.content ||
      "No response generated. Please try again.";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("LLM call failed:", error);

    return NextResponse.json(
      { error: "Couldn't generate advice right now. Please try again." },
      { status: 500 }
    );
  }
}