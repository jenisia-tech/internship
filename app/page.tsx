"use client";

import { useState } from "react";

export default function Home() {
  const [symptoms, setSymptoms] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!symptoms.trim()) {
      setAnswer("Please enter patient symptoms first.");
      return;
    }

    try {
      setLoading(true);
      setAnswer("");

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms }),
      });

      const data = await res.json();
      setAnswer(data.answer || data.error || "No response generated.");
    } catch {
      setAnswer("Failed to get AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <section className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Hospital Management System
          </h1>
          <p className="mt-3 text-gray-600">
            Manage patients, doctors, appointments, and use AI-powered symptom
            assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold text-lg">Patients</h2>
            <p className="text-gray-600 text-sm mt-2">
              Create, view, update, and delete patient records.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold text-lg">Doctors</h2>
            <p className="text-gray-600 text-sm mt-2">
              Manage doctor profiles, specializations, and availability.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold text-lg">Appointments</h2>
            <p className="text-gray-600 text-sm mt-2">
              Track appointments between doctors and patients.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            AI Symptom Assistant
          </h2>

          <p className="text-gray-600 mt-2">
            Enter patient symptoms and get short, safe AI-generated guidance.
          </p>

          <textarea
            className="w-full border border-gray-300 p-4 rounded-xl mt-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder="Example: Fever, headache, cough for two days..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />

          <button
            onClick={askAI}
            disabled={loading || !symptoms.trim()}
            className="mt-4 px-5 py-3 rounded-xl bg-blue-600 text-white font-medium disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>

          {loading && (
            <p className="mt-4 text-blue-600">Generating response...</p>
          )}

          {answer && (
            <div className="mt-6 border rounded-xl p-5 bg-gray-50">
              <h3 className="font-semibold mb-2">AI Response</h3>
              <p className="text-gray-700 whitespace-pre-line">{answer}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}