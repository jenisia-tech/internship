import { NextResponse } from "next/server";
import OpenAI from "openai";
import { dbConnect } from "@/lib/mongodb";
import { Patient } from "@/models/Patient";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new Error("Missing GROQ_API_KEY environment variable");
    }

    await dbConnect();

    const body = await req.json();
    let symptoms = body.symptoms;

    if (!symptoms) {
      const latestPatient = await Patient.findOne().sort({ createdAt: -1 });
      symptoms = latestPatient?.symptoms || "";
    }

    if (!symptoms) {
      return NextResponse.json(
        { error: "No symptoms provided or found in MongoDB." },
        { status: 400 }
      );
    }

    const client = new OpenAI({
      apiKey: apiKey,
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
          content: `Patient symptoms from hospital records: ${symptoms}`,
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