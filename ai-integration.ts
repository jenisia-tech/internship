import Groq from "groq-sdk";

export async function generateSymptomAdvice(symptoms: string) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing");
  }

  const groq = new Groq({
    apiKey: apiKey,
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

  return response.choices[0]?.message?.content || "No response generated.";
}