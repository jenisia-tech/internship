"use client";

import { useState } from "react";

export default function Home() {
  const [symptoms, setSymptoms] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms,
        }),
      });

      const data = await res.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("Failed to get AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-10 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        Hospital Management System
      </h1>

      <p className="mb-6">
        Manage patients, doctors, appointments, and use AI-powered symptom
        assistance.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        AI Symptom Assistant
      </h2>

      <textarea
        className="w-full border p-3 rounded"
        rows={4}
        placeholder="Enter patient symptoms..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <button
  onClick={askAI}
  disabled={loading || !symptoms.trim()}
  className="mt-4 px-4 py-2 border rounded disabled:opacity-50"
>
  {loading ? "Thinking..." : "Ask AI"}
</button>

      {loading && (
        <p className="mt-4">Generating response...</p>
      )}

      {answer && (
        <div className="mt-6 border p-4 rounded">
          <h3 className="font-semibold mb-2">AI Response</h3>
          <p>{answer}</p>
        </div>
      )}
    </main>
  );
}