import Groq from "groq-sdk";

const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
  throw new Error("Missing GROQ_API_KEY environment variable");
}

const groq = new Groq({
  apiKey: groqApiKey,
});

export async function callLLM(input: string) {
  const completion = await groq.chat.completions.create({
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

  return completion.choices[0].message.content;
}