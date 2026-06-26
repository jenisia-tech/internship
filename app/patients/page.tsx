"use client";

import { useState, useMemo } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
type Gender = "Male" | "Female" | "Other";
type Status = "Stable" | "Critical" | "Recovering" | "Discharged";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  contact: string;
  symptoms: string;
  status: Status;
  ward: string;
  admittedOn: string;
}

// ── Sample Data ───────────────────────────────────────────────────────────────
const SAMPLE_PATIENTS: Patient[] = [
  { id: "P-00124", name: "Arjun Mehta",       age: 45, gender: "Male",   contact: "+91 98401 23456", symptoms: "Chest pain, shortness of breath",        status: "Critical",    ward: "ICU",        admittedOn: "2025-06-20" },
  { id: "P-00125", name: "Priya Nair",        age: 32, gender: "Female", contact: "+91 94432 87654", symptoms: "Persistent cough, mild fever",            status: "Stable",      ward: "General",    admittedOn: "2025-06-21" },
  { id: "P-00126", name: "Ravi Shankar",      age: 60, gender: "Male",   contact: "+91 99001 55678", symptoms: "Dizziness, high blood pressure",         status: "Recovering",  ward: "Cardiology", admittedOn: "2025-06-18" },
  { id: "P-00127", name: "Anita Desai",       age: 28, gender: "Female", contact: "+91 87654 32190", symptoms: "Severe headache, nausea, blurred vision", status: "Critical",    ward: "Neurology",  admittedOn: "2025-06-22" },
  { id: "P-00128", name: "Karthik Subramaniam",age: 52, gender: "Male",  contact: "+91 90002 11234", symptoms: "Joint pain, swelling in knees",           status: "Stable",      ward: "Ortho",      admittedOn: "2025-06-19" },
  { id: "P-00129", name: "Meena Krishnan",    age: 41, gender: "Female", contact: "+91 81234 56789", symptoms: "Fatigue, weight loss, hair thinning",     status: "Recovering",  ward: "Endocrine",  admittedOn: "2025-06-17" },
  { id: "P-00130", name: "Suresh Patel",      age: 67, gender: "Male",   contact: "+91 77890 12345", symptoms: "Difficulty breathing, ankle swelling",    status: "Critical",    ward: "ICU",        admittedOn: "2025-06-22" },
  { id: "P-00131", name: "Deepika Rao",       age: 35, gender: "Female", contact: "+91 96543 21098", symptoms: "Abdominal pain, vomiting",                status: "Stable",      ward: "General",    admittedOn: "2025-06-23" },
  { id: "P-00132", name: "Vinod Kumar",       age: 50, gender: "Male",   contact: "+91 93210 87654", symptoms: "Back pain, tingling in legs",             status: "Recovering",  ward: "Neurology",  admittedOn: "2025-06-16" },
  { id: "P-00133", name: "Lakshmi Iyer",      age: 73, gender: "Female", contact: "+91 88876 54321", symptoms: "Confusion, memory loss, falls",           status: "Stable",      ward: "Geriatrics", admittedOn: "2025-06-21" },
  { id: "P-00134", name: "Rahul Verma",       age: 24, gender: "Male",   contact: "+91 91122 33445", symptoms: "High fever, rash, muscle aches",          status: "Recovering",  ward: "Infectious", admittedOn: "2025-06-20" },
  { id: "P-00135", name: "Sneha Pillai",      age: 38, gender: "Female", contact: "+91 80098 76543", symptoms: "Irregular heartbeat, palpitations",       status: "Discharged",  ward: "Cardiology", admittedOn: "2025-06-14" },
];

// ── Status Config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<Status, { pill: string; dot: string; border: string }> = {
  Critical:   { pill: "bg-red-100 text-red-700",      dot: "bg-red-500",    border: "border-l-red-500"    },
  Stable:     { pill: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", border: "border-l-emerald-500" },
  Recovering: { pill: "bg-amber-100 text-amber-700",  dot: "bg-amber-500",  border: "border-l-amber-500"  },
  Discharged: { pill: "bg-slate-100 text-slate-500",  dot: "bg-slate-400",  border: "border-l-slate-300"  },
};

const GENDER_COLOR: Record<Gender, string> = {
  Male:   "bg-blue-100 text-blue-700",
  Female: "bg-pink-100 text-pink-700",
  Other:  "bg-purple-100 text-purple-700",
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 0 1 2.828 0l.172.172a2 2 0 0 1 0 2.828L12 16H9v-3z" />
  </svg>
);

const ViewIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3M4 7h16" />
  </svg>
);

// ── Add Patient Modal ─────────────────────────────────────────────────────────
function AddPatientModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Modal header */}
        <div className="bg-gradient-to-r from-[#0F4C81] to-[#2D9CDB] px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Add New Patient</h2>
            <p className="text-xs text-blue-200 mt-0.5">Fill in the patient details below</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name</label>
              <input type="text" placeholder="e.g. Priya Nair" className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Age</label>
              <input type="number" placeholder="e.g. 34" className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Gender</label>
              <select className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Contact Number</label>
              <input type="tel" placeholder="+91 98400 00000" className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Ward</label>
              <select className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
                <option value="">Select ward</option>
                <option>ICU</option>
                <option>General</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Ortho</option>
                <option>Endocrine</option>
                <option>Infectious</option>
                <option>Geriatrics</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Status</label>
              <select className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50">
                <option>Stable</option>
                <option>Critical</option>
                <option>Recovering</option>
                <option>Discharged</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Symptoms</label>
              <textarea rows={3} placeholder="Describe presenting symptoms…" className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 resize-none" />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#0F4C81] to-[#2D9CDB] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm">
              Save Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [showModal, setShowModal] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return SAMPLE_PATIENTS.filter((p) => {
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.symptoms.toLowerCase().includes(q) ||
        p.ward.toLowerCase().includes(q);
      const matchStatus = statusFilter === "All" || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  const counts = useMemo(
    () => ({
      All:        SAMPLE_PATIENTS.length,
      Stable:     SAMPLE_PATIENTS.filter((p) => p.status === "Stable").length,
      Critical:   SAMPLE_PATIENTS.filter((p) => p.status === "Critical").length,
      Recovering: SAMPLE_PATIENTS.filter((p) => p.status === "Recovering").length,
      Discharged: SAMPLE_PATIENTS.filter((p) => p.status === "Discharged").length,
    }),
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── Nav ── */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
              </svg>
            </a>
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <a href="/" className="hover:text-blue-600 font-medium transition-colors">MedCore HMS</a>
              <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="font-semibold text-slate-800">Patients</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">● Systems Online</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">DR</div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Patient Records</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {SAMPLE_PATIENTS.length} total patients · last updated today
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#0F4C81] to-[#2D9CDB] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm self-start sm:self-auto"
          >
            <PlusIcon />
            Add Patient
          </button>
        </div>

        {/* ── Stat Chips ── */}
        <div className="flex flex-wrap gap-2">
          {(["All", "Stable", "Critical", "Recovering", "Discharged"] as const).map((s) => {
            const active = statusFilter === s;
            const cfg = s !== "All" ? STATUS_CONFIG[s] : null;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  active
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {cfg && <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-white" : cfg.dot}`} />}
                {s}
                <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                  {counts[s]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Search + Table Card ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Search bar */}
          <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, ID, symptom, ward…"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                Clear
              </button>
            )}
            <span className="ml-auto text-xs text-slate-400 hidden sm:block">
              {filtered.length} of {SAMPLE_PATIENTS.length} shown
            </span>
          </div>

          {/* ── Desktop Table ── */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {["Patient ID", "Name", "Age", "Gender", "Contact Number", "Symptoms", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm font-medium">No patients match your search</p>
                        <button onClick={() => { setSearch(""); setStatusFilter("All"); }} className="text-xs text-blue-600 hover:underline">
                          Clear filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => {
                    const cfg = STATUS_CONFIG[p.status];
                    return (
                      <tr
                        key={p.id}
                        className={`border-l-4 ${cfg.border} hover:bg-slate-50/70 transition-colors group`}
                      >
                        <td className="px-5 py-3.5 font-mono text-xs font-semibold text-blue-700 whitespace-nowrap">{p.id}</td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <div className="font-semibold text-slate-800">{p.name}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{p.ward} ward · {p.admittedOn}</div>
                        </td>
                        <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap">{p.age} yrs</td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${GENDER_COLOR[p.gender]}`}>{p.gender}</span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-600 whitespace-nowrap font-mono text-xs">{p.contact}</td>
                        <td className="px-5 py-3.5 max-w-[220px]">
                          <p className="text-slate-600 text-xs truncate" title={p.symptoms}>{p.symptoms}</p>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.pill}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {p.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                            <button title="View" className="p-1.5 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                              <ViewIcon />
                            </button>
                            <button title="Edit" className="p-1.5 rounded-lg text-slate-500 hover:bg-amber-50 hover:text-amber-600 transition-colors">
                              <EditIcon />
                            </button>
                            <button title="Delete" className="p-1.5 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                              <DeleteIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ── Mobile Cards ── */}
          <div className="md:hidden divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p className="text-sm font-medium">No patients match your search</p>
                <button onClick={() => { setSearch(""); setStatusFilter("All"); }} className="text-xs text-blue-600 hover:underline mt-1">
                  Clear filters
                </button>
              </div>
            ) : (
              filtered.map((p) => {
                const cfg = STATUS_CONFIG[p.status];
                return (
                  <div key={p.id} className={`p-4 border-l-4 ${cfg.border}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{p.name}</p>
                        <p className="font-mono text-xs text-blue-600 mt-0.5">{p.id}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${cfg.pill}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {p.status}
                      </span>
                    </div>
                    <div className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-500">
                      <span><span className="font-semibold text-slate-700">Age:</span> {p.age} yrs</span>
                      <span><span className="font-semibold text-slate-700">Gender:</span> {p.gender}</span>
                      <span className="col-span-2"><span className="font-semibold text-slate-700">Contact:</span> {p.contact}</span>
                      <span className="col-span-2"><span className="font-semibold text-slate-700">Ward:</span> {p.ward} · {p.admittedOn}</span>
                      <span className="col-span-2"><span className="font-semibold text-slate-700">Symptoms:</span> {p.symptoms}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors">View</button>
                      <button className="flex-1 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-amber-50 hover:text-amber-600 transition-colors">Edit</button>
                      <button className="flex-1 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-red-50 hover:text-red-600 transition-colors">Delete</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ── Table Footer ── */}
          <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            <p className="text-xs text-slate-400">
              Showing <span className="font-semibold text-slate-600">{filtered.length}</span> of <span className="font-semibold text-slate-600">{SAMPLE_PATIENTS.length}</span> patients
            </p>
            <div className="flex items-center gap-1">
              <button disabled className="px-2.5 py-1.5 text-xs font-medium text-slate-400 border border-slate-200 rounded-lg disabled:opacity-50">← Prev</button>
              <button className="px-2.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg">1</button>
              <button disabled className="px-2.5 py-1.5 text-xs font-medium text-slate-400 border border-slate-200 rounded-lg disabled:opacity-50">Next →</button>
            </div>
          </div>
        </div>
      </main>

      {/* ── Add Patient Modal ── */}
      {showModal && <AddPatientModal onClose={() => setShowModal(false)} />}
    </div>
  );
}