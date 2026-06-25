"use client";

import { useState } from "react";

const ECGLine = () => (
  <svg
    viewBox="0 0 800 100"
    className="absolute inset-0 w-full h-full opacity-10"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline
      points="0,50 80,50 100,50 110,10 120,90 130,50 150,50 170,50 185,30 195,70 205,50 220,50 300,50 310,5 320,95 330,50 400,50 410,20 420,80 430,50 500,50 520,50 535,15 545,85 555,50 570,50 650,50 665,25 675,75 685,50 800,50"
      fill="none"
      stroke="white"
      strokeWidth="2"
    />
  </svg>
);

const CrossPattern = () => (
  <svg
    className="absolute right-0 top-0 h-full opacity-5"
    width="300"
    viewBox="0 0 300 400"
    xmlns="http://www.w3.org/2000/svg"
  >
    {[0, 1, 2, 3, 4, 5].map((row) =>
      [0, 1, 2, 3].map((col) => (
        <g key={`${row}-${col}`} transform={`translate(${col * 70 + 10}, ${row * 70 - 10})`}>
          <rect x="25" y="10" width="12" height="36" rx="3" fill="white" />
          <rect x="10" y="25" width="36" height="12" rx="3" fill="white" />
        </g>
      ))
    )}
  </svg>
);

const statCards = [
  { label: "Active Patients", value: "1,284", delta: "+12 today", color: "text-blue-600", bg: "bg-blue-50", icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )},
  { label: "On-Duty Doctors", value: "48", delta: "6 in surgery", color: "text-emerald-600", bg: "bg-emerald-50", icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  )},
  { label: "Today's Appointments", value: "237", delta: "18 pending", color: "text-amber-600", bg: "bg-amber-50", icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )},
  { label: "AI Consultations", value: "3,902", delta: "this month", color: "text-violet-600", bg: "bg-violet-50", icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  )},
];

const featureCards = [
  {
    title: "Patient Records",
    description: "Create, view, update, and manage complete patient records including history, vitals, and treatment plans.",
    badge: "1,284 active",
    badgeColor: "bg-blue-100 text-blue-700",
    action: "Manage Patients",
    actionColor: "bg-blue-600 hover:bg-blue-700",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Doctor Profiles",
    description: "Manage physician specializations, availability schedules, ward assignments, and contact information.",
    badge: "48 on duty",
    badgeColor: "bg-emerald-100 text-emerald-700",
    action: "View Doctors",
    actionColor: "bg-emerald-600 hover:bg-emerald-700",
    icon: (
      <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: "Appointments",
    description: "Schedule, track, and manage appointments across all departments. Automated reminders keep patients informed.",
    badge: "237 today",
    badgeColor: "bg-amber-100 text-amber-700",
    action: "Open Schedule",
    actionColor: "bg-amber-600 hover:bg-amber-700",
    icon: (
      <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

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
        headers: { "Content-Type": "application/json" },
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
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── Nav ── */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.5l2 2 4-4m0 0l2-2m-2 2l-4 4M19.5 7.5l-2-2-4 4m0 0l-2 2m2-2l4-4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">MedCore HMS</span>
            <span className="hidden sm:block text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">● Systems Online</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors hidden sm:block">Reports</button>
            <button className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors hidden sm:block">Settings</button>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">DR</div>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-[#0F4C81] via-[#1565A8] to-[#2D9CDB] overflow-hidden">
        <ECGLine />
        <CrossPattern />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold tracking-widest text-blue-200 uppercase mb-4">
              Hospital Management System
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Patient-first care,<br />
              <span className="text-blue-200">powered by AI.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-xl leading-relaxed">
              One unified platform for managing patients, scheduling appointments, coordinating care teams, and getting AI-assisted clinical guidance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="px-5 py-2.5 bg-white text-blue-700 font-semibold rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-sm">
                New Patient
              </button>
              <button className="px-5 py-2.5 bg-blue-500/30 text-white font-semibold rounded-xl text-sm hover:bg-blue-500/50 transition-colors border border-blue-400/40">
                Today's Schedule
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat Bar ── */}
      <section className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">
            {statCards.map((s) => (
              <div key={s.label} className="flex items-center gap-4 px-4 py-5 sm:px-6">
                <div className={`${s.bg} ${s.color} p-2.5 rounded-xl flex-shrink-0`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 leading-none">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                  <p className={`text-xs font-medium mt-0.5 ${s.color}`}>{s.delta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* ── Feature Cards ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-900">Quick Access</h2>
            <span className="text-sm text-slate-400">Core modules</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-xl bg-slate-50">{card.icon}</div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{card.title}</h3>
                  <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{card.description}</p>
                </div>
                <button
                  className={`mt-auto w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-colors ${card.actionColor}`}
                >
                  {card.action}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── AI Assistant ── */}
        <section>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">AI Symptom Assistant</h2>
                <p className="text-sm text-violet-200">Clinical guidance in seconds — always verify with a physician</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div className="relative">
                <textarea
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none transition-shadow leading-relaxed"
                  rows={5}
                  placeholder="Describe patient symptoms in detail…&#10;Example: 38-year-old male, fever 39°C for 2 days, persistent dry cough, mild shortness of breath, no known allergies."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
                <span className="absolute bottom-3 right-3 text-xs text-slate-400">
                  {symptoms.length} chars
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={askAI}
                  disabled={loading || !symptoms.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-violet-700 hover:to-blue-700 transition-all shadow-sm"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Analyzing…
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Ask AI
                    </>
                  )}
                </button>
                {symptoms.trim() && !loading && (
                  <button
                    onClick={() => { setSymptoms(""); setAnswer(""); }}
                    className="px-4 py-2.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Loading state */}
              {loading && (
                <div className="flex items-center gap-3 text-sm text-violet-600 py-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  Generating clinical guidance…
                </div>
              )}

              {/* AI Response */}
              {answer && !loading && (
                <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-violet-800">AI Clinical Guidance</span>
                    <span className="ml-auto text-xs text-violet-500 bg-violet-100 px-2 py-0.5 rounded-full">Not a diagnosis</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{answer}</p>
                  <p className="mt-4 text-xs text-slate-400 border-t border-violet-200 pt-3">
                    ⚠️ This AI-generated guidance is for preliminary reference only. Always confirm with a licensed clinician before taking clinical action.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="text-center text-xs text-slate-400 pb-4 space-y-1">
          <p className="font-medium text-slate-500">MedCore Hospital Management System</p>
          <p>© {new Date().getFullYear()} · All patient data is encrypted and HIPAA-compliant.</p>
        </footer>
      </main>
    </div>
  );
}