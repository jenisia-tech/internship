"use client";

import React, { useState } from "react";
import Link from "next/link";

// ----------------------------------------------------------------------
// Types & Sample Data
// ----------------------------------------------------------------------

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  doctor: string;
  status: "Admitted" | "Discharged" | "Critical" | "Stable" | "Under Observation";
}

const RECENT_PATIENTS: Patient[] = [
  {
    id: "PAT-1001",
    name: "John Anderson",
    age: 45,
    gender: "Male",
    condition: "Cardiac Arrhythmia",
    doctor: "Dr. Sarah Chen",
    status: "Admitted",
  },
  {
    id: "PAT-1002",
    name: "Emma Thompson",
    age: 32,
    gender: "Female",
    condition: "Migraine",
    doctor: "Dr. James Wilson",
    status: "Under Observation",
  },
  {
    id: "PAT-1003",
    name: "Liam Martinez",
    age: 58,
    gender: "Male",
    condition: "Knee Replacement",
    doctor: "Dr. Maria Rodriguez",
    status: "Stable",
  },
  {
    id: "PAT-1004",
    name: "Sophia Lee",
    age: 7,
    gender: "Female",
    condition: "Pneumonia",
    doctor: "Dr. Ahmed Hassan",
    status: "Critical",
  },
  {
    id: "PAT-1005",
    name: "Oliver Garcia",
    age: 73,
    gender: "Male",
    condition: "Skin Melanoma",
    doctor: "Dr. Emily Turner",
    status: "Discharged",
  },
];

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string; // Tailwind bg class
}

// ----------------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------------

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change?: string;
  accent?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, accent = "border-blue-400" }) => (
  <div
    className={`bg-white rounded-2xl border-l-4 ${accent} shadow-sm p-5 flex items-center gap-4 transition hover:shadow-md`}
  >
    <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      {change && <p className="text-xs text-emerald-600 mt-0.5">{change}</p>}
    </div>
  </div>
);

const StatusBadge: React.FC<{ status: Patient["status"] }> = ({ status }) => {
  const base = "px-2.5 py-0.5 rounded-full text-xs font-semibold";
  switch (status) {
    case "Admitted":
      return <span className={`${base} bg-blue-50 text-blue-700`}>Admitted</span>;
    case "Discharged":
      return <span className={`${base} bg-gray-100 text-gray-600`}>Discharged</span>;
    case "Critical":
      return <span className={`${base} bg-red-50 text-red-700`}>Critical</span>;
    case "Stable":
      return <span className={`${base} bg-emerald-50 text-emerald-700`}>Stable</span>;
    case "Under Observation":
      return <span className={`${base} bg-amber-50 text-amber-700`}>Under Observation</span>;
    default:
      return null;
  }
};

// ----------------------------------------------------------------------
// Icon Helpers
// ----------------------------------------------------------------------

const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v11a1 1 0 001 1h2m12 0h2a1 1 0 001-1v-4a3 3 0 00-3-3H9a3 3 0 00-3 3v4m6-6V7m0 0h6m-6 0H9m3 4h.01" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const StethoscopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H9m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v3a3 3 0 01-3 3z" />
  </svg>
);

const UserPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8l2 2 4-4" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// ----------------------------------------------------------------------
// Quick Action Card
// ----------------------------------------------------------------------

const QuickActionCard: React.FC<QuickAction> = ({ title, description, href, icon, color }) => (
  <Link
    href={href}
    className={`${color} text-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 group cursor-pointer flex flex-col justify-between h-full`}
  >
    <div>
      <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <p className="text-sm text-white/80 leading-relaxed">{description}</p>
    </div>
    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-white/90 group-hover:gap-2 transition-all">
      <span>Open</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </div>
  </Link>
);

// ----------------------------------------------------------------------
// AI Symptom Assistant (kept exactly as provided)
// ----------------------------------------------------------------------

const COMMON_SYMPTOMS = [
  "Headache",
  "Fever",
  "Chest Pain",
  "Shortness of Breath",
  "Fatigue",
  "Nausea",
  "Dizziness",
  "Back Pain",
];

const AIAssistant: React.FC = () => {
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [customSymptom, setCustomSymptom] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSymptomClick = (symptom: string) => {
    setSelectedSymptom(symptom);
    setCustomSymptom("");
  };

  const analyzeSymptom = () => {
    const symptomToAnalyze = customSymptom.trim() || selectedSymptom;
    if (!symptomToAnalyze) return;

    setIsAnalyzing(true);
    setResponse(null);

    setTimeout(() => {
      const responses: Record<string, string> = {
        Headache:
          "Headaches can be caused by stress, dehydration, or eye strain. Rest, hydration, and OTC pain relievers may help. Consult a doctor if severe or persistent.",
        Fever:
          "Fever often indicates infection. Monitor temperature, stay hydrated, and rest. Seek medical attention if above 103°F (39.4°C) or lasting more than 3 days.",
        "Chest Pain":
          "⚠️ Chest pain can be serious. If accompanied by shortness of breath, sweating, or nausea, seek emergency care immediately. Could indicate cardiac issues.",
        "Shortness of Breath":
          "⚠️ Difficulty breathing may indicate respiratory or cardiac conditions. If sudden or severe, seek emergency care. Common causes include asthma, anxiety, or infection.",
        Fatigue:
          "Persistent fatigue may result from poor sleep, stress, anemia, or thyroid issues. Maintain a regular sleep schedule and consult a doctor if chronic.",
        Nausea:
          "Nausea can stem from digestive issues, medications, or pregnancy. Ginger tea or small bland meals may help. See a doctor if persistent with vomiting.",
        Dizziness:
          "Dizziness may be caused by dehydration, low blood pressure, or inner ear issues. Sit or lie down immediately. Consult a doctor if recurrent.",
        "Back Pain":
          "Back pain often results from poor posture, muscle strain, or sedentary lifestyle. Gentle stretching and proper ergonomics can help. Seek care if severe.",
      };

      setResponse(
        responses[symptomToAnalyze] ||
          `Based on "${symptomToAnalyze}": Please consult a healthcare professional for a proper diagnosis. This assistant provides general information only.`
      );
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">AI Symptom Assistant</h3>
          <p className="text-xs text-gray-500">Get instant preliminary guidance</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {COMMON_SYMPTOMS.map((symptom) => (
          <button
            key={symptom}
            onClick={() => handleSymptomClick(symptom)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedSymptom === symptom && !customSymptom
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            {symptom}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={customSymptom}
          onChange={(e) => {
            setCustomSymptom(e.target.value);
            setSelectedSymptom(null);
          }}
          placeholder="Or describe your symptom..."
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={analyzeSymptom}
          disabled={isAnalyzing || (!selectedSymptom && !customSymptom.trim())}
          className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing...
            </>
          ) : (
            "Analyze"
          )}
        </button>
      </div>

      {response && (
        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-sm text-gray-700 leading-relaxed">{response}</p>
          <p className="text-xs text-gray-400 mt-2 italic">
            ⚠️ This is AI-generated guidance. Always consult a qualified doctor.
          </p>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------
// Main Dashboard Page
// ----------------------------------------------------------------------

const DashboardPage: React.FC = () => {
  const stats = {
    totalPatients: 1284,
    appointmentsToday: 47,
    doctorsAvailable: 18,
    bedsOccupied: 86,
  };

  const quickActions: QuickAction[] = [
    {
      title: "New Patient",
      description: "Register a new patient admission",
      href: "/patients",
      icon: <UserPlusIcon />,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Manage Patients",
      description: "View and update patient records",
      href: "/patients",
      icon: <ListIcon />,
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    },
    {
      title: "View Doctors",
      description: "Check doctor availability & schedules",
      href: "/doctors",
      icon: <StethoscopeIcon />,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      title: "Open Schedule",
      description: "Manage appointments calendar",
      href: "/appointments",
      icon: <ClockIcon />,
      color: "bg-gradient-to-br from-amber-500 to-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
              Hospital Dashboard
            </h1>
            <p className="mt-1 text-gray-500 max-w-2xl">
              Welcome back! Here&apos;s what&apos;s happening at MedCare Hospital today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
              📅 {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={<UsersIcon />}
            change="+12 this week"
            accent="border-blue-500"
          />
          <StatCard
            title="Appointments Today"
            value={stats.appointmentsToday}
            icon={<CalendarIcon />}
            change="8 remaining"
            accent="border-emerald-400"
          />
          <StatCard
            title="Doctors Available"
            value={stats.doctorsAvailable}
            icon={<StethoscopeIcon />}
            accent="border-purple-400"
          />
          <StatCard
            title="Beds Occupied"
            value={`${stats.bedsOccupied}%`}
            icon={<BedIcon />}
            change="214 of 250 beds"
            accent="border-amber-400"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <QuickActionCard key={action.title} {...action} />
            ))}
          </div>
        </div>

        {/* Two-column layout: Recent Patients + AI Assistant */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Patients Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">Recent Patients</h3>
              <Link
                href="/patients"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition"
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 text-sm">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">Patient ID</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">Name</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">Age</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">Condition</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">Doctor</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {RECENT_PATIENTS.map((patient) => (
                    <tr key={patient.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">{patient.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">{patient.name}</td>
                      <td className="px-6 py-4 text-gray-600">{patient.age}</td>
                      <td className="px-6 py-4 text-gray-600">{patient.condition}</td>
                      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{patient.doctor}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={patient.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Symptom Assistant */}
          <div className="lg:col-span-1">
            <AIAssistant />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white/80 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; 2026 MedCare Hospital Management System. All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span className="hover:text-blue-600 cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-blue-600 cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-blue-600 cursor-pointer transition">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;