import Groq from "groq-sdk";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function callGroqLLM(input: string) {
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY environment variable is missing");
  }

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are a hospital assistant. Give concise, safe, non-diagnostic guidance.",
      },
      {
        role: "user",
        content: input,
      },
    ],
  });

  return response.choices[0]?.message?.content || "No response generated.";
}