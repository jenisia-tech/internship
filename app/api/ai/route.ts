import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const { symptoms } = await req.json();

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful hospital assistant. Give short health advice based on symptoms. Do not diagnose diseases.",
        },
        {
          role: "user",
          content: `Patient symptoms: ${symptoms}`,
        },
      ],
    });

    const answer =
      response.choices[0]?.message?.content || "No response generated.";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Groq API Error:", error);

    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}