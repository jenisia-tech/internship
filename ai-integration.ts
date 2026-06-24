import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      throw new Error("Missing GROQ_API_KEY environment variable");
    }

    const { symptoms } = await req.json();

    const groqClient = new Groq({
      apiKey: groqApiKey,
    });

    const completion = await groqClient.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a hospital assistant. Give concise, safe, non-diagnostic guidance.",
        },
        {
          role: "user",
          content: `Patient symptoms: ${symptoms}`,
        },
      ],
    });

    const answer =
      completion.choices[0]?.message?.content || "No response generated.";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("LLM call failed:", error);

    return NextResponse.json(
      { error: "Failed to generate AI response" },
      { status: 500 }
    );
  }
}