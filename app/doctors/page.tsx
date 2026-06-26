"use client";

import React, { useState, useMemo, useCallback } from "react";

// ----------------------------------------------------------------------
// Types & Sample Data
// ----------------------------------------------------------------------

type Availability = "Available" | "Busy" | "Off Duty";
type Department =
  | "Cardiology"
  | "Neurology"
  | "Orthopedics"
  | "Pediatrics"
  | "Dermatology"
  | "General Medicine";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: Department;
  experience: number; // years
  contact: string;
  availability: Availability;
  email: string;
}

const SAMPLE_DOCTORS: Doctor[] = [
  {
    id: "DOC-1001",
    name: "Dr. Sarah Chen",
    specialization: "Cardiologist",
    department: "Cardiology",
    experience: 14,
    contact: "+1 (555) 234-1001",
    availability: "Available",
    email: "sarah.chen@medicare.com",
  },
  {
    id: "DOC-1002",
    name: "Dr. James Wilson",
    specialization: "Neurologist",
    department: "Neurology",
    experience: 19,
    contact: "+1 (555) 234-1002",
    availability: "Busy",
    email: "james.wilson@medicare.com",
  },
  {
    id: "DOC-1003",
    name: "Dr. Maria Rodriguez",
    specialization: "Orthopedic Surgeon",
    department: "Orthopedics",
    experience: 9,
    contact: "+1 (555) 234-1003",
    availability: "Available",
    email: "maria.rodriguez@medicare.com",
  },
  {
    id: "DOC-1004",
    name: "Dr. Ahmed Hassan",
    specialization: "Pediatrician",
    department: "Pediatrics",
    experience: 22,
    contact: "+1 (555) 234-1004",
    availability: "Off Duty",
    email: "ahmed.hassan@medicare.com",
  },
  {
    id: "DOC-1005",
    name: "Dr. Emily Turner",
    specialization: "Dermatologist",
    department: "Dermatology",
    experience: 6,
    contact: "+1 (555) 234-1005",
    availability: "Available",
    email: "emily.turner@medicare.com",
  },
  {
    id: "DOC-1006",
    name: "Dr. Robert Kim",
    specialization: "General Physician",
    department: "General Medicine",
    experience: 31,
    contact: "+1 (555) 234-1006",
    availability: "Available",
    email: "robert.kim@medicare.com",
  },
  {
    id: "DOC-1007",
    name: "Dr. Priya Sharma",
    specialization: "Cardiologist",
    department: "Cardiology",
    experience: 11,
    contact: "+1 (555) 234-1007",
    availability: "Busy",
    email: "priya.sharma@medicare.com",
  },
  {
    id: "DOC-1008",
    name: "Dr. Michael Brown",
    specialization: "Neurologist",
    department: "Neurology",
    experience: 16,
    contact: "+1 (555) 234-1008",
    availability: "Off Duty",
    email: "michael.brown@medicare.com",
  },
];

const DEPARTMENTS: Department[] = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "General Medicine",
];

const AVAILABILITY_OPTIONS: Availability[] = ["Available", "Busy", "Off Duty"];

// ----------------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------------

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  accent?: string; // tailwind border color e.g. border-blue-400
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, accent = "border-blue-400" }) => (
  <div
    className={`bg-white rounded-2xl border-l-4 ${accent} shadow-sm p-5 flex items-center gap-4 transition hover:shadow-md`}
  >
    <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (doctor: Omit<Doctor, "id">) => void;
}

const AddDoctorModal: React.FC<ModalProps> = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState<Omit<Doctor, "id">>({
    name: "",
    specialization: "",
    department: "General Medicine",
    experience: 0,
    contact: "",
    email: "",
    availability: "Available",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "experience" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: "",
      specialization: "",
      department: "General Medicine",
      experience: 0,
      contact: "",
      email: "",
      availability: "Available",
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">Add New Doctor</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Dr. John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
            <input
              type="text"
              name="specialization"
              required
              value={form.specialization}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Cardiologist"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
            <input
              type="number"
              name="experience"
              required
              min={0}
              value={form.experience}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              name="contact"
              required
              value={form.contact}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="doctor@hospital.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
            <select
              name="availability"
              value={form.availability}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {AVAILABILITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition shadow-sm"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Icon Helpers (inline SVGs to avoid external dependencies)
// ----------------------------------------------------------------------

const StethoscopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H9m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v3a3 3 0 01-3 3z" />
  </svg>
);

const CalendarCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8l2 2 4-4" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 3.5a7.5 7.5 0 0013.15 13.15z" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

// ----------------------------------------------------------------------
// Main Page Component
// ----------------------------------------------------------------------

const DoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(SAMPLE_DOCTORS);
  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulate loading for demonstration
  const simulateLoading = useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }, []);

  // Derived statistics
  const stats = useMemo(() => {
    return {
      total: doctors.length,
      available: doctors.filter((d) => d.availability === "Available").length,
      specialists: doctors.filter((d) => d.specialization.toLowerCase().includes("specialist") || d.specialization.toLowerCase().includes("surgeon")).length,
      departments: new Set(doctors.map((d) => d.department)).size,
    };
  }, [doctors]);

  // Filter & search
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAvailability =
        availabilityFilter === "All" || doc.availability === availabilityFilter;

      return matchesSearch && matchesAvailability;
    });
  }, [doctors, searchQuery, availabilityFilter]);

  const handleAddDoctor = (newDoc: Omit<Doctor, "id">) => {
    const id = `DOC-${1000 + doctors.length + 1}`;
    setDoctors((prev) => [...prev, { ...newDoc, id }]);
  };

  const handleDelete = (id: string) => {
    setDoctors((prev) => prev.filter((doc) => doc.id !== id));
  };

  const getAvailabilityBadge = (status: Availability) => {
    const base = "px-2.5 py-0.5 rounded-full text-xs font-semibold";
    switch (status) {
      case "Available":
        return <span className={`${base} bg-emerald-50 text-emerald-700`}>Available</span>;
      case "Busy":
        return <span className={`${base} bg-amber-50 text-amber-700`}>Busy</span>;
      case "Off Duty":
        return <span className={`${base} bg-gray-100 text-gray-600`}>Off Duty</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 1. Hero Section */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Doctor Management
          </h1>
          <p className="mt-1 text-gray-500 max-w-2xl">
            Oversee your medical staff, track availability, and manage specializations across all departments.
          </p>
        </div>

        {/* 2. Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Doctors"
            value={stats.total}
            icon={<StethoscopeIcon />}
            accent="border-blue-500"
          />
          <StatCard
            title="Available Today"
            value={stats.available}
            icon={<CalendarCheckIcon />}
            accent="border-emerald-400"
          />
          <StatCard
            title="Specialists"
            value={stats.specialists}
            icon={<StarIcon />}
            accent="border-purple-400"
          />
          <StatCard
            title="Departments"
            value={stats.departments}
            icon={<BuildingIcon />}
            accent="border-cyan-400"
          />
        </div>

        {/* 3,4,5. Search, Filter & Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* Filter Dropdown */}
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full sm:w-40 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="Off Duty">Off Duty</option>
            </select>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-xl shadow-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Doctor
          </button>
        </div>

        {/* 6. Doctor Table / Loading / Empty State */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            /* 9. Loading State */
            <div className="p-12 flex flex-col items-center justify-center text-gray-400 space-y-4">
              <svg
                className="animate-spin h-10 w-10 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <p className="text-sm font-medium">Loading doctors data...</p>
            </div>
          ) : filteredDoctors.length === 0 ? (
            /* 8. Empty State */
            <div className="p-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="h-16 w-16 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center">
                <StethoscopeIcon />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">No doctors found</h3>
              <p className="text-sm text-gray-500 max-w-md">
                {searchQuery || availabilityFilter !== "All"
                  ? "Try adjusting your search or filter criteria."
                  : "Your doctor list is empty. Click \"Add Doctor\" to register the first physician."}
              </p>
              {(searchQuery || availabilityFilter !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setAvailabilityFilter("All");
                  }}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 text-sm">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Doctor ID
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Specialization
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Experience
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Availability
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 bg-white">
                  {filteredDoctors.map((doc) => (
                    <tr key={doc.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">{doc.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">{doc.name}</td>
                      <td className="px-6 py-4 text-gray-600">{doc.specialization}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                          {doc.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{doc.experience} yrs</td>
                      <td className="px-6 py-4 text-gray-500">{doc.contact}</td>
                      <td className="px-6 py-4">{getAvailabilityBadge(doc.availability)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            title="View details"
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          >
                            <EyeIcon />
                          </button>
                          <button
                            title="Edit doctor"
                            className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                          >
                            <PencilIcon />
                          </button>
                          <button
                            title="Delete doctor"
                            onClick={() => handleDelete(doc.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 7. Add Doctor Modal */}
      <AddDoctorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddDoctor}
      />

      {/* 10. Footer */}
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

export default DoctorsPage;